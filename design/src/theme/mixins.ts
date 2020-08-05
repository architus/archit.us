import { transparentize, lighten, darken } from "polished";

import { dynamicColor, ColorMode, mode, staticColor } from "./color";
import { transition } from "./motion";

const linkColor = `--link-color`;
const linkColorFade = `--link-color-fade`;

/**
 * Sets the link color for a DOM tree by automatically setting the CSS variables
 * @param resolvedColor - Resolved CSS color (hex/rgba)
 */
export function setLinkColor(resolvedColor: string): string {
  return `
    ${linkColor}: ${resolvedColor};
    ${linkColorFade}: ${transparentize(0.6, resolvedColor)}
  `;
}

/**
 * Gets the css for use in the global CSS root
 */
export function injectMixinGlobals(): string {
  return `
    body {
      ${setLinkColor(dynamicColor("primary", ColorMode.Light))}
    }

    ${mode(ColorMode.Dark)} {
      ${setLinkColor(dynamicColor("primary+10", ColorMode.Dark))}
    }
  `;
}

/**
 * Mixin used to give a pretty styling to links
 */
export const primaryLink = `
  color: var(--link-color);
  text-decoration: none;
  ${transition(["border-bottom-color"])};
  border-bottom: 1px solid var(--link-color-fade);

  &:hover,
  &:focus {
    border-bottom-color: var(--link-color);
  }
`;

export function blankButton(): string {
  return `
    background-color: transparent;
    border: none;
    outline: none !important;
    cursor: pointer;
  `;
}

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

/**
 * Creates a Discord-style scrollbar using a linear gradient
 * to make the appearance of a wide padding on the track/thumb
 *
 * **Note**: doesn't really work as a horizontal scrollbar
 * without adjusting the gradient
 */
export function discordScrollbar({
  background,
  thumb,
  track,
  invert = false,
}: {
  background: string;
  thumb: string;
  track: string;
  invert?: boolean;
}): string {
  return `
    &::-webkit-scrollbar {
      width: 17px;
      height: 17px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${thumb};
      border-radius: 100rem;
      border: 4px solid ${background};
      margin: 4px;

      &:hover {
        background: ${invert ? lighten(0.05, thumb) : darken(0.05, thumb)};
      }

      &:active {
        background: ${invert ? lighten(0.1, thumb) : darken(0.1, thumb)};
      }
    }

    &::-webkit-scrollbar-corner {
      background-color: transparent;
      display: none;
    }

    &::-webkit-scrollbar-track {
      border-radius: 100rem;
      background: linear-gradient(
        to right,
        ${background} 0%,
        ${background} 23%,
        ${track} 24%,
        ${track} 76%,
        ${background} 77%,
        ${background} 100%
      );
    }
  `;
}

/**
 * Mixin to allow scrolling but have the scroll-bar be hidden
 */
export function hiddenScrollbar(): string {
  return `
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
        /* WebKit */
        width: 0;
        height: 0;
    }
  `;
}
