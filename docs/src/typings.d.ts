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
