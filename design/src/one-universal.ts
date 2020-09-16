import { css } from "linaria";
import { lighten } from "polished";

import { dynamicColor, ColorMode, mode, color } from "./theme/color";

export const oneUniversalGlobal = css`
  :global() {
    body {
      --code-bg: ${lighten(0.02, dynamicColor("bg+10", ColorMode.Dark))};
    }

    ${mode(ColorMode.Light)} {
      --code-bg: ${lighten(0.01, dynamicColor("bg-10", ColorMode.Light))};
    }

    pre[class*="language-"] {
      color: #abb2bf;
      ${mode(ColorMode.Light)} {
        color: #383a42;
      }

      background: none;
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      word-wrap: normal;
      line-height: 1.5;
      tab-size: 4;
      hyphens: none;
    }

    pre[class*="language-"]::-moz-selection,
    pre[class*="language-"]::-moz-selection,
    pre[class*="language-"]::selection,
    pre[class*="language-"]::selection {
      background-color: ${color("bg+10")};
      ${mode(ColorMode.Light)} {
        background-color: ${color("bg-30")};
      }

      text-shadow: none;
    }

    @media print {
      code[class*="language-"],
      pre[class*="language-"] {
        text-shadow: none;
      }
    }

    /* Code blocks */
    pre[class*="language-"] {
      padding: 1em;
      margin: 0.5em 0;
      overflow: auto;
    }

    pre[class*="language-"] {
      background-color: var(--code-bg);
    }

    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: #5c6370;
      ${mode(ColorMode.Light)} {
        color: #a0a1a7;
      }
    }

    .token.punctuation {
      color: #abb2bf;
      ${mode(ColorMode.Light)} {
        color: #383a42;
      }
    }

    .token.selector,
    .token.tag {
      color: #e06c75;
      ${mode(ColorMode.Light)} {
        color: #e2574e;
      }
    }

    .token.property,
    .token.boolean,
    .token.number,
    .token.constant,
    .token.symbol,
    .token.attr-name,
    .token.deleted {
      color: #d19a66;
      ${mode(ColorMode.Light)} {
        color: #976715;
      }
    }

    .token.string,
    .token.char,
    .token.attr-value,
    .token.builtin,
    .token.inserted {
      color: #98c379;
      ${mode(ColorMode.Light)} {
        color: #53a053;
      }
    }

    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string {
      color: #56b6c2;
      ${mode(ColorMode.Light)} {
        color: #1485ba;
      }
    }

    .token.atrule,
    .token.keyword {
      color: #c678dd;
      ${mode(ColorMode.Light)} {
        color: #a42ea2;
      }
    }

    .token.function {
      color: #61afef;
      ${mode(ColorMode.Light)} {
        color: #447bef;
      }
    }

    .token.regex,
    .token.important,
    .token.variable {
      color: #c678dd;
      ${mode(ColorMode.Light)} {
        color: #a42ea2;
      }
    }

    .token.important,
    .token.bold {
      font-weight: bold;
    }

    .token.italic {
      font-style: italic;
    }

    .token.entity {
      cursor: help;
    }

    pre.line-numbers {
      position: relative;
      padding-left: 3.8em;
      counter-reset: linenumber;
    }

    pre.line-numbers > code {
      position: relative;
    }

    .line-numbers .line-numbers-rows {
      position: absolute;
      pointer-events: none;
      top: 0;
      font-size: 100%;
      left: -3.8em;
      width: 3em; /* works for line-numbers below 1000 lines */
      letter-spacing: -1px;
      border-right: 0;

      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .line-numbers-rows > span {
      pointer-events: none;
      display: block;
      counter-increment: linenumber;
    }

    .line-numbers-rows > span:before {
      content: counter(linenumber);
      color: #5c6370;
      display: block;
      padding-right: 0.8em;
      text-align: right;
    }
  }
`;
