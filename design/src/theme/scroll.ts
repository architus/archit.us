import { transparentize } from "polished";

import { ColorMode, staticColor, mode } from "./color";

const scrollBase = `
  scrollbar-face-color: #646464;
  scrollbar-base-color: #646464;
  scrollbar-3dlight-color: #646464;
  scrollbar-highlight-color: #646464;
  scrollbar-track-color: #000;
  scrollbar-arrow-color: #000;
  scrollbar-shadow-color: #646464;
  scrollbar-dark-shadow-color: #646464;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--scroll-thumb);
    border-radius: 1000px;

    &:hover {
      background-color: var(--scroll-thumb-hover);
    }

    &:active {
      background-color: var(--scroll-thumb-active);
    }
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

/**
 * Utility mixin to add a nice-looking custom scroll-bar
 * that overlays well onto content.
 * @param colorMode - Color scheme for the scrollbar
 */
export function scrollBar(colorMode: ColorMode): string {
  const oppositeFg = staticColor(
    colorMode === ColorMode.Light ? "dark" : "light"
  );
  return `
    --scroll-thumb: ${transparentize(0.75, oppositeFg)};
    --scroll-thumb-hover: ${transparentize(0.65, oppositeFg)};
    --scroll-thumb-active ${transparentize(0.5, oppositeFg)};
    ${scrollBase}
  `;
}

/**
 * Utility mixin to add a nice-looking custom scroll-bar
 * that overlays well onto content.
 * Automatically displays depending on the current color mode.
 */
export function scrollBarAuto(opacity = 0.25): string {
  const lightFg = staticColor("dark");
  const darkFg = staticColor("light");
  const transparency = 1 - opacity;
  return `
    ${mode(ColorMode.Light)} {
      --scroll-thumb: ${transparentize(transparency, lightFg)};
      --scroll-thumb-hover: ${transparentize(transparency * 0.75, lightFg)};
      --scroll-thumb-active ${transparentize(transparency * 0.5, lightFg)};
    }
    ${mode(ColorMode.Dark)} {
      --scroll-thumb: ${transparentize(transparency, darkFg)};
      --scroll-thumb-hover: ${transparentize(transparency * 0.75, darkFg)};
      --scroll-thumb-active ${transparentize(transparency * 0.5, darkFg)};
    }
    ${scrollBase}
  `;
}
