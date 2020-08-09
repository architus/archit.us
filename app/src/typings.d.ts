/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */

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

declare module "shallow-equal" {
  export function shallowEqualArrays<T extends unknown[] = unknown[]>(
    a: T,
    b: T
  ): boolean;
  export function shallowEqualObjects<
    T extends Record<unknown, unknown> = Record<unknown, unknown>
  >(a: T, b: T): boolean;
}

declare module "unist-util-find" {
  import React from "react";
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { Node } from "unist";

  const find: (node: Node, pattern: string) => Node | undefined;
  export default find;
}

declare module "*.inline.svg" {
  const content: string;
  export default content;
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

declare module "@packtracker/webpack-plugin" {
  export default class PacktrackerPlugin {
    constructor(args: {
      project_token: string;
      upload: boolean;
      fail_build: boolean;
    });
  }
}
