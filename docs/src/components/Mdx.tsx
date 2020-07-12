import React, { useMemo } from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import { createHeading } from "@docs/components/Heading";
import AutoLink from "@design/components/AutoLink";
import Overview from "@docs/components/Overview";
import Iframe from "@docs/components/Iframe";
import Collapse from "@docs/components/Collapse";
import Demo from "@docs/components/Demo";
import Article from "@design/components/Article";
import Alert from "@design/components/Alert";
import Table from "@docs/components/Table";
import CodeBlock from "@docs/components/CodeBlock";
import { usePathPrefix } from "@docs/data/path";
import {
  withoutLeading,
  withoutTrailing,
  trimPrefix,
  isExternal,
} from "@lib/utility";

export type MdxProps = {
  content: string;
  components?: Record<string, React.ComponentType<unknown>>;
  className?: string;
  style?: React.CSSProperties;
} & Partial<React.ComponentProps<typeof MDXRenderer>>;

// Shortcodes available to documentation content
export const shortcodes = {
  Overview,
  Iframe,
  Collapse,
  Demo,
  Article,
  Alert,
  Link: AutoLink,
  // TODO implement
  Route: () => (
    <Alert type="danger">
      Not implemented <strong>(Route)</strong>
    </Alert>
  ),
  // TODO implement
  GatewayRoute: () => (
    <Alert type="danger">
      Not implemented <strong>(GatewayRoute)</strong>
    </Alert>
  ),
  // TODO implement
  ExternalSnippet: () => (
    <Alert type="danger">
      Not implemented <strong>(ExternalSnippet)</strong>
    </Alert>
  ),
} as const;

// React components that replace HTML components in the markdown
export const overrides = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const prefix = usePathPrefix();
    return prefix.match({
      None: () => <AutoLink {...props} href={props.href ?? ""} />,
      Some: (path) => {
        // Fix `pathPrefix` being applied twice, first in MDX transformation
        // and then in the `<Link />` component
        let href = props.href ?? "";
        if (!isExternal(href)) {
          const withoutAround = withoutLeading(withoutTrailing(path));
          if (withoutAround.length !== 0) {
            const base = `/${withoutAround}`;
            const trimmed = trimPrefix(props.href ?? "", base, -1);
            href = `/${withoutLeading(trimmed)}`;
          }
        }
        return <AutoLink {...props} href={href} />;
      },
    });
  },
  table: Table,
  pre: CodeBlock,
  h1: createHeading({ component: "h1" }),
  h2: createHeading({ component: "h2" }),
  h3: createHeading({ component: "h3" }),
  h4: createHeading({ component: "h4" }),
  h5: createHeading({ component: "h5" }),
  h6: createHeading({ component: "h6", right: true }),
} as const;

/**
 * MDX Renderer, including shortcodes used when writing documentation
 */
const Mdx: React.FC<MdxProps> = ({
  content,
  components,
  children,
  className,
  style,
  ...props
}) => (
  <MDXProvider
    components={useMemo(
      () => ({ ...shortcodes, ...overrides, ...components }),
      [components]
    )}
  >
    <MDXRenderer {...props}>{content}</MDXRenderer>
  </MDXProvider>
);

export default Mdx;
