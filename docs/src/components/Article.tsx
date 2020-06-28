import { styled } from "linaria/react";

import {
  gap,
  transition,
  dynamicColor,
  ColorMode,
  color,
  mode,
  down,
  staticColor,
} from "@design/theme";
import { transparentize } from "polished";

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

  --link-color: ${color("primary")};
  --link-color-fade: ${transparentize(
    0.6,
    dynamicColor("primary", ColorMode.Light)
  )};
  ${mode(ColorMode.Dark)} {
    --link-color: ${color("primary+10")};
    --link-color-fade: ${transparentize(
      0.6,
      dynamicColor("primary+10", ColorMode.Dark)
    )};
  }

  a {
    color: var(--link-color);
    text-decoration: none;
    ${transition(["border-bottom-color"])};
    border-bottom: 1px solid var(--link-color-fade);

    &:hover,
    &:focus {
      border-bottom-color: var(--link-color);
    }
  }

  ul,
  ol {
    opacity: 0.95;

    li > p::last-child {
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
    margin-top: 2rem;
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
`;

export default Article;
