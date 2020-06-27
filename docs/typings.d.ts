declare module "gatsby-plugin-dark-mode" {
  import React from "react";

  export const ThemeToggler: React.FC<{
    children: (args: {
      theme: string;
      toggleTheme: (newTheme: string) => void;
    }) => React.ReactNode;
  }>;
}

declare module "react-svg-morph" {
  export const MorphReplace: React.FC<{ width: number; height: number }>;
}
