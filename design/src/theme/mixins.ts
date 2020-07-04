import { transparentize } from "polished";

import { dynamicColor, ColorMode, mode } from "./color";
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
