import { svgDataUrl } from "../svg";
import { Color } from "./color";

// Removes excess space from a multiline SVG source string
const trimSvg = (src: string): string =>
  src
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .join(" ");

const patterns = {
  // Constructs a "dot grid" pattern similar to those used on GitHub.com
  // See https://github.com/features/actions
  dotGrid: (
    color: string,
    {
      radius = 1.5,
      spacingX = 15,
      spacingY = 15,
    }: {
      radius?: number;
      spacingX?: number;
      spacingY?: number;
    } = {}
  ): string => {
    // Not using hex does some weird things to stylis
    const hex = Color(color).toHex8String();
    // Make circle at least ${radius} in from the edges
    const rawSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='${spacingX}'
      height='${spacingY}'>
      <circle fill='${hex}' cx='${radius}' cy='${radius}' r='${radius}'/>
    </svg>`;
    return svgDataUrl(trimSvg(rawSvg));
  },
  // Tiling cube background used as the background of jumbotrons
  cube: (color: string, { size = 125 }: { size?: number } = {}): string => {
    // Not using hex does some weird things to stylis
    const hex = Color(color).toHex8String();
    const width = (72 / 125) * size;
    const height = size;
    const rawSvg = `<svg xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 144 250' width='${width}' height='${height}'>
      <path fill='${hex}' d='m142 38l-65.7-38h-8.7l-65.6 38v-38h-2v127l68.1
      39.4-68.1 39.4v44.2h2v-1.1-1.1-38.6l68-39.4v78.8l-2.4 1.4h8.7l-2.4-1.4
      v-78.8l68.1 39.4v39.6 1.2h2v-44.2l-68.1-39.4 68.1-39.4v-127h-2v38zm-140
      85.6v-78.8l68 39.4v78.8l-68-39.4zm1.9-82.2l68.1-39.4 68.1 39.4-68.1 39.4
      -68.1-39.4zm138.1 82.2l-68 39.4v-78.8l68-39.4v78.8z'/>
    </svg>`;
    return svgDataUrl(trimSvg(rawSvg));
  },
} as const;

export type PatternKey = keyof typeof patterns;

/**
 * Gets SVG background image URLs (or factories) that correspond to patterns
 * @param key - pattern key
 */
export function pattern<K extends PatternKey>(key: K): typeof patterns[K] {
  return patterns[key];
}
