// Implementation similar to xstyled
// See https://xstyled.dev/docs/responsive/

import { Nil } from "@lib/types";

const breakpoints = {
  xs: 0,
  vs: 400,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

export type BreakpointKey = keyof typeof breakpoints;

const breakpointMin = (key: BreakpointKey): number | null =>
  breakpoints[key] === 0 ? null : breakpoints[key];
const breakpointMax = (key: BreakpointKey): number | null =>
  breakpoints[key] === 0 ? null : breakpoints[key] - 0.02;

export const mediaMinWidth = (value: string | Nil): string | null =>
  value ? `@media (min-width: ${value})` : null;
export const mediaMaxWidth = (value: string | Nil): string | null =>
  value ? `@media (max-width: ${value})` : null;
export const mediaBetweenWidth = (min: string, max: string): string =>
  `@media (min-width: ${min}) and (max-width: ${max})`;

/**
 * Creates a responsive section of CSS that only is active
 * if the device screen width is greater than the given breakpoint.
 * See https://github.com/smooth-code/xstyled/blob/951a2b84073160d298582a2c6bcf833310292f6e/packages/system/src/breakpoints.js.
 * @param key - breakpoint key to use as the minimum screen width
 * @param css - CSS content (object or string supported)
 */
export function up<T extends string | object>(key: BreakpointKey, css: T): T {
  const breakpoint = breakpointMin(key);
  if (breakpoint === null) return css;

  const selector = mediaMinWidth(`${breakpoint}px`);
  if (typeof css === "string") return `${selector} { ${css} }` as T;
  return {
    selector: css,
  } as T;
}

/**
 * Creates a responsive section of CSS that only is active
 * if the device screen width is less than the given breakpoint.
 * See https://github.com/smooth-code/xstyled/blob/951a2b84073160d298582a2c6bcf833310292f6e/packages/system/src/breakpoints.js.
 * @param key - breakpoint key to use as the maximum screen width
 * @param css - CSS content (object or string supported)
 */
export function down<T extends string | object>(key: BreakpointKey, css: T): T {
  const breakpoint = breakpointMax(key);
  if (breakpoint === null) return (typeof css === "string" ? "" : {}) as T;

  const selector = mediaMaxWidth(`${breakpoint}px`);
  if (typeof css === "string") return `${selector} { ${css} }` as T;
  return {
    selector: css,
  } as T;
}

/**
 * Creates a responsive section of CSS that only is active
 * if the device screen width is between the given breakpoints.
 * See https://github.com/smooth-code/xstyled/blob/951a2b84073160d298582a2c6bcf833310292f6e/packages/system/src/breakpoints.js.
 * @param lower - breakpoint key to use as the minimum screen width
 * @param upper - breakpoint key to use as the maximum screen width
 * @param css - CSS content (object or string supported)
 */
export function between<T extends string | object>(
  lower: BreakpointKey,
  upper: BreakpointKey,
  css: T
): T {
  const min = breakpointMin(lower);
  const max = breakpointMax(upper);

  if (max === null) return up(lower, css);
  if (min === null) return down(upper, css);

  const selector = mediaBetweenWidth(`${min}px`, `${max}px`);
  if (typeof css === "string") return `${selector} { ${css} }` as T;
  return {
    selector: css,
  } as T;
}
