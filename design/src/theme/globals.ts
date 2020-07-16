import { css } from "linaria";

import { injectColorGlobals, color } from "./color";
import { injectMixinGlobals } from "./mixins";
import { injectTypographyGlobals } from "./typography";

// From https://hankchizljaw.com/wrote/a-modern-css-reset/
export const globals = css`
  :global() {
    ${injectColorGlobals()}
    ${injectTypographyGlobals()}
    ${injectMixinGlobals()}

    // Box sizing rules
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    // Remove default padding
    ul[class],
    ol[class] {
      padding: 0;
    }

    // Remove default margin
    body,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    ul,
    ol,
    li,
    figure,
    figcaption,
    blockquote,
    dl,
    dd {
      margin: 0;
    }

    // Set core body defaults
    body {
      margin: 0;
      min-height: 100vh;
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeSpeed;

      line-height: 1.5;
      color: ${color("text")};
      background-color: ${color("bg")};
    }

    // Remove list styles on ul, ol elements with a class attribute
    ul[class],
    ol[class] {
      list-style: none;
    }

    // Inherit fonts for inputs and buttons
    input,
    button,
    textarea,
    select {
      font: inherit;
    }

    // Remove all animations and transitions for people that prefer not to see them
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  }
`;
