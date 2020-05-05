declare module "*.svg" {
  const cssString: string;
  export default cssString;
}

declare module "*.inline.svg" {
  const content: string;
  export default content;
}

declare module "@xstyled/emotion" {
  import React from "react";
  import { jsx, css } from "emotion";
  import styled from "@emotion/styled";
  import { Theme } from "Theme/tokens";

  export const jsx: typeof jsx;
  export const css: typeof css;
  export const up: (breakpoint: string, css: string) => string;
  export const down: (breakpoint: string, css: string) => string;
  export const ThemeProvider: React.ComponentType<{ theme: object }>;
  export const ColorModeProvider: React.ComponentType<{}>;
  export const useColorMode: () => [string, (newMode: str) => void];
  export type Space = number | Exclude<keyof Theme["space"], keyof never[]>;
  export interface BoxProps {
    // Spacing props
    margin?: Space;
    m?: Space;
    marginTop?: Space;
    mt?: Space;
    marginRight?: Space;
    mr?: Space;
    marginBottom?: Space;
    mb?: Space;
    marginLeft?: Space;
    ml?: Space;
    mx?: Space;
    my?: Space;
    padding?: Space;
    p?: Space;
    paddingTop?: Space;
    pt?: Space;
    paddingRight?: Space;
    pr?: Space;
    paddingBottom?: Space;
    pb?: Space;
    paddingLeft?: Space;
    pl?: Space;
    px?: Space;
    py?: Space;
    space?: Space;
    children?: React.ReactNode;
    display?:
      | "block"
      | "inline-block"
      | "inline"
      | "flex"
      | "grid"
      | "none"
      | "inherit"
      | "initial";
    textAlign?: "left" | "right" | "center" | "justify" | "initial" | "inherit";
    alignItems?:
      | "stretch"
      | "center"
      | "flex-start"
      | "flex-end"
      | "baseline"
      | "initial"
      | "inherit";
  }
  export const Box: React.ComponentType<BoxProps>;

  export default styled;
}

declare module "preval.macro" {
  export default function apply(code: string | TemplateStringsArray): string;
}
