import { transparentize } from "polished";

import { color, dynamicColor, ColorMode, mode } from "./color";
import { transition } from "./motion";

const linkColor = `--link-color`;
const linkColorFade = `--link-color-fade`;

/**
 * Gets the css for use in the global CSS root
 */
export function injectMixinGlobals(): string {
  return `
    body {
      ${linkColor}: ${color("primary")};
      ${linkColorFade}: ${transparentize(
    0.6,
    dynamicColor("primary", ColorMode.Light)
  )};
    }

    ${mode(ColorMode.Dark)} {
      ${linkColor}: ${color("primary+10")};
      ${linkColorFade}: ${transparentize(
    0.6,
    dynamicColor("primary+10", ColorMode.Dark)
  )};
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
