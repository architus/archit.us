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

  export const jsx: typeof jsx;
  export const css: typeof css;
  export const ThemeProvider: React.ComponentType<{ theme: object }>;
  export default styled;
}
