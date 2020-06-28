import React, { useMemo } from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import AutoLink from "@docs/components/AutoLink";

type MdxProps = {
  content: string;
  components?: Record<string, React.ComponentType<unknown>>;
} & Partial<React.ComponentProps<typeof MDXRenderer>>;

// Shortcodes available to documentation content
export const shortcodes = {} as const;

// React components that replace HTML components in the markdown
export const overrides = {
  a: AutoLink,
} as const;

/**
 * MDX Renderer, including shortcodes used when writing documentation
 */
const Mdx: React.FC<MdxProps> = ({
  content,
  components,
  children,
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
