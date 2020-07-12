import { styled } from "linaria/react";

import Article from "@design/components/Article";
import {
  mode,
  ColorMode,
  shadow,
  gap,
  scrollBarAuto,
  staticColor,
} from "@design/theme";
import { anchorClass } from "@docs/components/Heading";
import { transparentize } from "polished";

/**
 * Contains styling modifications to `<Article />`
 * that add styled designed for use with docs content,
 * such as images and code blocks
 */
const MdxArticle = styled(Article)`
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

  .${anchorClass("h6")} + .gatsby-highlight {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    margin-top: 0;

    ${mode(ColorMode.Light)} {
      border-top: 1px solid ${transparentize(0.8, staticColor("dark"))};
    }
    ${mode(ColorMode.Dark)} {
      border-top: 1px solid ${transparentize(0.6, staticColor("dark"))};
    }

    & > * {
      margin-top: 0;
    }
  }

  .gatsby-resp-image-wrapper {
    box-shadow: ${shadow("z0")};
    border-radius: 8px;
    overflow: hidden;
  }
`;

export type MdxArticleProps = React.ComponentProps<typeof MdxArticle>;

export default MdxArticle;
