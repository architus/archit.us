import { styled } from "linaria/react";
import { transparentize, darken } from "polished";

import {
  gap,
  dynamicColor,
  ColorMode,
  color,
  mode,
  down,
  staticColor,
  scrollBarAuto,
  shadow,
  ZIndex,
  primaryLink,
} from "@design/theme";

/**
 * HTML styled article component as a wrapper for long-form Markdown-like content
 * with block-level flow and inline styling.
 */
const Article = styled.article`
  & > * + * {
    margin-top: ${gap.flow};
    margin-bottom: 0;
  }

  & > p + p {
    margin-top: calc(0.7 * ${gap.flow});
  }

  a {
    ${primaryLink}
  }

  ul,
  ol {
    opacity: 0.95;

    li > p:last-child {
      margin-bottom: 0;
    }

    li:not(:last-of-type) {
      margin-bottom: 0.4rem;
    }

    ul {
      margin: 0.5rem 0 0;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    position: relative;
    color: ${color("textStrong")};
  }

  h1 {
    font-weight: 600;
    font-size: 2.5rem;
    color: ${color("textStrong")};
    ${down("sm")} {
      font-size: 2.2rem;
    }
  }

  h2 {
    font-size: 1.8rem;
    margin-top: 1.75rem;
    ${down("sm")} {
      font-size: 1.7rem;
    }
  }

  h3 {
    font-size: 1.4rem;
    margin-top: 1.7rem;
  }

  h4 {
    font-size: 1.15rem;
    margin-top: 1.6rem;
  }

  h5 {
    font-size: 0.95rem;
    margin-top: 1.75rem;
    margin-bottom: 1.25rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 700;
    color: ${color("textFade")};
  }

  h6 {
    display: flex;
    align-items: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    z-index: ${ZIndex.TableHeader};
    margin: ${gap.micro} 0 0;
    padding-left: ${gap.nano};
    font-size: 1.125rem;
    font-weight: 600;
    height: 44px;

    color: ${color("text")};
    border: 1px solid ${color("contrastBorder")};
    border-bottom: none !important;
    ${mode(ColorMode.Dark)} {
      background-color: ${darken(0.02, dynamicColor("bg+20", ColorMode.Dark))};
    }
    ${mode(ColorMode.Light)} {
      background-color: ${darken(0.03, dynamicColor("bg-10", ColorMode.Light))};
    }
  }

  blockquote {
    --line-color: ${transparentize(0.9, staticColor("dark"))};
    ${mode(ColorMode.Dark)} {
      --line-color: ${transparentize(0.9, staticColor("light"))};
    }

    border-left: 0.4rem solid var(--line-color);
    padding: 0 0 0 ${gap.micro};
    p {
      margin-bottom: 0;
    }
  }

  .gatsby-highlight {
    background-color: var(--code-bg);

    ${mode(ColorMode.Dark)} {
      box-shadow: ${shadow("z0")};
    }

    ${mode(ColorMode.Light)} {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    }

    overflow: auto;
    border-radius: 8px;
    padding: 0 ${gap.pico};
    white-space: pre-line;

    pre {
      ${scrollBarAuto(0.125)}
      padding: ${gap.micro};

      & > code {
        font-size: 0.875rem;
      }
    }
  }

  *:not(pre) > code {
    font-size: 1rem;
    padding: 0.1em 0.2em;
    border: none;
    border-radius: 0;
    background-color: var(--code-bg);
    color: ${color("primary-10")};
    ${mode(ColorMode.Dark)} {
      color: ${color("primary+20")};
    }

    text-align: left;
    word-spacing: normal;
    word-break: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
    white-space: normal;
  }
`;

export default Article;
