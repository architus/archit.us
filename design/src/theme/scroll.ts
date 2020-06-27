import { transparentize } from "polished";

import { ColorMode, staticColor } from "./color";

/**
 * Utility mixin to add a nice-looking custom scroll-bar
 * that overlays well onto content.
 * @param mode - Color scheme for the scrollbar
 */
export function scrollBar(mode: ColorMode): string {
  const oppositeFg = staticColor(mode === ColorMode.Light ? "dark" : "light");
  return `
    scrollbar-face-color: #646464;
    scrollbar-base-color: #646464;
    scrollbar-3dlight-color: #646464;
    scrollbar-highlight-color: #646464;
    scrollbar-track-color: #000;
    scrollbar-arrow-color: #000;
    scrollbar-shadow-color: #646464;
    scrollbar-dark-shadow-color: #646464;

    --scroll-thumb: ${transparentize(0.75, oppositeFg)};
    --scroll-thumb-hover: ${transparentize(0.65, oppositeFg)};
    --scroll-thumb-active ${transparentize(0.5, oppositeFg)};

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
}

/**
 * Utility mixin to add a nice-looking custom scroll-bar
 * that overlays well onto content.
 * Automatically displays depending on the current color mode.
 */
export function scrollBarAuto(): string {
  // TODO implement
  throw new Error("unimplemented");
}
