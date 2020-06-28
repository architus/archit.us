import React, { useMemo } from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import AutoLink from "@docs/components/AutoLink";
import Overview from "@docs/components/Overview";
import { createHeading } from "@docs/components/Heading";

type MdxProps = {
  content: string;
  components?: Record<string, React.ComponentType<unknown>>;
  className?: string;
  style?: React.CSSProperties;
} & Partial<React.ComponentProps<typeof MDXRenderer>>;

// Shortcodes available to documentation content
export const shortcodes = {
  Overview,
} as const;

// React components that replace HTML components in the markdown
export const overrides = {
  a: AutoLink,
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
