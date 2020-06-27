// Font files (copied to site upon build)
// https://www.gatsbyjs.org/docs/importing-assets-into-files/
import rennerBold from "../assets/renner/renner-bold-webfont.woff";
import rennerBold2 from "../assets/renner/renner-bold-webfont.woff2";
import rennerBoldItalic from "../assets/renner/renner-bolditalic-webfont.woff";
import rennerBoldItalic2 from "../assets/renner/renner-bolditalic-webfont.woff2";
import rennerBook from "../assets/renner/renner-book-webfont.woff";
import rennerBook2 from "../assets/renner/renner-book-webfont.woff2";
import rennerBookItalic from "../assets/renner/renner-bookitalic-webfont.woff";
import rennerBookItalic2 from "../assets/renner/renner-bookitalic-webfont.woff2";
import rennerLight from "../assets/renner/renner-light-webfont.woff";
import rennerLight2 from "../assets/renner/renner-light-webfont.woff2";
import rennerLightItalic from "../assets/renner/renner-lightitalic-webfont.woff";
import rennerLightItalic2 from "../assets/renner/renner-lightitalic-webfont.woff2";
import rennerMedium from "../assets/renner/renner-medium-webfont.woff";
import rennerMedium2 from "../assets/renner/renner-medium-webfont.woff2";
import rennerMediumItalic from "../assets/renner/renner-mediumitalic-webfont.woff";
import rennerMediumItalic2 from "../assets/renner/renner-mediumitalic-webfont.woff2";

// Based off Bootstrap 4's body font stack
const baseFontStack =
  `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, ` +
  `'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', ` +
  `'Segoe UI Emoji', 'Segoe UI Symbol'`;

const fonts = {
  body: baseFontStack,
  headings: `'Renner*', ${baseFontStack}`,
  monospace:
    `SFMono-Regular, Menlo, Monaco, Consolas, ` +
    `'Liberation Mono', 'Courier New', monospace`,
} as const;

export type FontKey = keyof typeof fonts;

/**
 * Extracts a CSS expression to use a design system font
 * @param key - color key to use
 */
export function font(key: FontKey): string {
  return fonts[key];
}

/**
 * Gets the css for use in the global CSS root
 */
export function injectTypographyGlobals(): string {
  const rennerBase = {
    name: "Renner*",
    display: "swap",
  };
  return `
    ${fontFace({
      ...rennerBase,
      weight: 300,
      woff: rennerLight,
      woff2: rennerLight2,
      woffItalic: rennerLightItalic,
      woff2Italic: rennerLightItalic2,
    })}
    ${fontFace({
      ...rennerBase,
      weight: 400,
      woff: rennerBook,
      woff2: rennerBook2,
      woffItalic: rennerBookItalic,
      woff2Italic: rennerBookItalic2,
    })}
    ${fontFace({
      ...rennerBase,
      weight: 500,
      woff: rennerMedium,
      woff2: rennerMedium2,
      woffItalic: rennerMediumItalic,
      woff2Italic: rennerMediumItalic2,
    })}
    ${fontFace({
      ...rennerBase,
      weight: 700,
      woff: rennerBold,
      woff2: rennerBold2,
      woffItalic: rennerBoldItalic,
      woff2Italic: rennerBoldItalic2,
    })}

    body {
      font-family: ${font("body")};
      font-weight: 400;
      font-size: 1rem;

      h1, h2, h3, h4, h5, h6 {
        font-family: ${font("headings")};
        font-weight: 500;
      }
    }
  `;
}

// Used to add external font faces
type FontConfig = {
  name: string;
  display: string;
  weight: number;
  woff: string;
  woff2: string;
  woffItalic: string;
  woff2Italic: string;
};

/**
 * Builds the font face (and correspondign italics font face) for the given weight for
 * the given external font
 * @param config - Paths to each version of the font
 * @param weightText - Weight text included on the font face file
 * @param weight - Actual CSS weight
 */
function fontFace({
  name,
  display,
  weight,
  woff,
  woff2,
  woffItalic,
  woff2Italic,
}: FontConfig): string {
  return `
    @font-face {
        font-family: "${name}";
        font-display: ${display};
        src: url("${woff2}") format("woff2"),
             url("${woff}") format("woff");
        font-weight: ${weight};
        font-style: normal;
    }
    @font-face {
        font-family: "${name}";
        font-display: ${display};
        src: url("${woff2Italic}") format("woff2"),
             url("${woffItalic}") format("woff");
        font-weight: ${weight};
        font-style: italic;
    }
  `;
}
