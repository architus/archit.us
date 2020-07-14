import { styled } from "linaria/react";
import { darken } from "polished";

import { color, mode, ColorMode, dynamicColor } from "@design/theme/color";
import { down } from "@design/theme/media";
import { primaryLink } from "@design/theme/mixins";
import { ZIndex } from "@design/theme/order";
import { gap } from "@design/theme/spacing";

export const tableHeaderSidePadding = gap.nano;

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
    ${down("sm")} {
      font-size: 1.7rem;
    }
  }

  h3 {
    font-size: 1.4rem;
  }

  h4 {
    font-size: 1.15rem;
  }

  h5 {
    font-size: 0.95rem;
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
    padding-left: ${tableHeaderSidePadding};
    padding-right: ${tableHeaderSidePadding};
    font-size: 1.125rem;
    font-weight: 600;
    height: 44px;

    color: ${color("text")};
    border: 1px solid ${color("contrastBorder")};
    border-bottom: none !important;
    ${mode(ColorMode.Dark)} {
      background-color: ${color("bg+20")};
    }
    ${mode(ColorMode.Light)} {
      background-color: ${darken(0.06, dynamicColor("bg-10", ColorMode.Light))};
    }
  }

  blockquote {
    --line-color: ${color("textOverlay")};
    border-left: 0.4rem solid var(--line-color);
    padding: 0 0 0 ${gap.micro};
    p {
      margin-bottom: 0;
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

export type ArticleProps = React.ComponentProps<typeof Article>;

export default Article;
