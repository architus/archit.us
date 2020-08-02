/**
 * Turns raw SVG content into a data Url to use in CSS background-images
 * @param svg - Normal, unescaped SVG text
 */
export function svgDataUrl(svg: string): string {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}");`;
}
