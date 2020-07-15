/* eslint-disable import/no-duplicates */
declare module "gatsby-plugin-dark-mode" {
  // eslint-disable-next-line import/order
  import React from "react";

  export const ThemeToggler: React.FC<{
    children: (args: {
      theme: string;
      toggleTheme: (newTheme: string) => void;
    }) => React.ReactNode;
  }>;
}

declare module "unist-util-find" {
  import React from "react";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { Node } from "unist";

  const find: (node: Node, pattern: string) => Node | undefined;
  export default find;
}

declare module "*.svg" {
  const content: React.FC<React.SVGAttributes<SVGElement>>;
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
