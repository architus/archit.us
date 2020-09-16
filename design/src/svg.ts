/**
 * Turns raw SVG content into a data Url to use in CSS background-images
 * @param svg - Normal, unescaped SVG text
 */
export const svgDataUrl = (svg: string): string =>
  `url("data:image/svg+xml,${encodeURIComponent(svg)}");`;

/**
 * Removes excess space from a multiline SVG source string
 * @param src - SOurce multiline string
 */
export const trimSvg = (src: string): string =>
  src
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .join(" ");
