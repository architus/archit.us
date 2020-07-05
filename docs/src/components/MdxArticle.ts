import { styled } from "linaria/react";

import Article from "@design/components/Article";
import { mode, ColorMode, shadow, gap, scrollBarAuto } from "@design/theme";

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

  .gatsby-resp-image-wrapper {
    box-shadow: ${shadow("z0")};
    border-radius: 8px;
    overflow: hidden;
  }
`;

export default MdxArticle;
