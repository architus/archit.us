import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React, { useMemo } from "react";

import Alert from "@architus/facade/components/Alert";
import Article from "@architus/facade/components/Article";
import AutoLink from "@architus/facade/components/AutoLink";
import { gap } from "@architus/facade/theme/spacing";
import {
  withoutLeading,
  withoutTrailing,
  isExternal,
} from "@architus/lib/path";
import { trimPrefix } from "@architus/lib/utility";
import CodeBlock from "@docs/components/CodeBlock";
import Collapse from "@docs/components/Collapse";
import Demo from "@docs/components/Demo";
import ExternalSnippet from "@docs/components/ExternalSnippet";
import { createHeading } from "@docs/components/Heading";
import HorizontalRule from "@docs/components/HorizontalRule";
import Iframe from "@docs/components/Iframe";
import InlineSpoilerMockup from "@docs/components/InlineSpoilerMockup";
import Overview from "@docs/components/Overview";
import RestRoute from "@docs/components/RestRoute";
import Table from "@docs/components/Table";
import { usePathPrefix } from "@docs/data/path-prefix";

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
  Route: RestRoute,
  GatewayRoute: () => (
    <Alert type="danger">
      <h4>
        Not implemented <strong>(GatewayRoute)</strong>
      </h4>
      <p style={{ marginTop: gap.pico }}>
        The GatewayRoute component is in the middle of a proposed redesign that
        uses{" "}
        <AutoLink href="https://www.gatsbyjs.org/packages/@commercetools-docs/gatsby-transformer-mdx-introspection/">
          the gatsby-transformer-mdx-introspection plugin
        </AutoLink>{" "}
        to parse structured data with the MDX and create references across the
        text. See{" "}
        <AutoLink href="https://github.com/architus/docs.archit.us/pull/2">
          this PR
        </AutoLink>{" "}
        on the old repo for more information. This would allow us to include
        route information within the text, in addition to having an
        &ldquo;Index&rdquo; page that includes all routes.
      </p>
    </Alert>
  ),
  ExternalSnippet,
  InlineSpoilerMockup,
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
  hr: HorizontalRule,
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
