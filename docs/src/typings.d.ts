/* eslint-disable import/no-duplicates */
declare module "gatsby-plugin-dark-mode" {
  import React from "react";

  export const ThemeToggler: React.FC<{
    children: (args: {
      theme: string;
      toggleTheme: (newTheme: string) => void;
    }) => React.ReactNode;
  }>;
}

declare module "unist-util-find" {
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { Node } from "unist";

  const find: (node: Node, pattern: string) => Node | undefined;
  export default find;
}

declare module "*.inline.svg" {
  import React from "react";

  const content: React.FC<React.HTMLProps<SVGElement>>;
  export default content;
}

declare module "*.woff" {
  const content: string;
  export default content;
}

declare module "*.woff2" {
  const content: string;
  export default content;
}
