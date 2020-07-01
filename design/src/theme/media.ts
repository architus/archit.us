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
  xxl: 1600,
} as const;

export type BreakpointKey = keyof typeof breakpoints;

const breakpointMin = (key: BreakpointKey): number | null =>
  breakpoints[key] === 0 ? null : breakpoints[key];
const breakpointMax = (key: BreakpointKey): number | null =>
  breakpoints[key] === 0 ? null : breakpoints[key] - 0.02;

export const mediaMinWidth = (value: string): string =>
  `@media (min-width: ${value})`;
export const mediaMaxWidth = (value: string | Nil): string =>
  `@media (max-width: ${value})`;
export const mediaBetweenWidth = (min: string, max: string): string =>
  `@media (min-width: ${min}) and (max-width: ${max})`;

/**
 * Extracts a CSS expression for a breakpoint
 * @param key - DDesired breakpoint key
 */
export function breakpoint(key: BreakpointKey): string {
  return `${breakpoints[key]}px`;
}

/**
 * Creates a responsive media query that only is active
 * if the device screen width is greater than the given breakpoint.
 * See https://github.com/smooth-code/xstyled/blob/951a2b84073160d298582a2c6bcf833310292f6e/packages/system/src/breakpoints.js.
 * @param key - breakpoint key to use as the minimum screen width
 */
export function up(key: BreakpointKey): string {
  const breakpointValue = breakpointMin(key);
  if (breakpointValue === null) return "&";
  return mediaMinWidth(`${breakpointValue}px`);
}

/**
 * Creates a responsive media query that only is active
 * if the device screen width is less than the given breakpoint.
 * See https://github.com/smooth-code/xstyled/blob/951a2b84073160d298582a2c6bcf833310292f6e/packages/system/src/breakpoints.js.
 * @param key - breakpoint key to use as the maximum screen width
 */
export function down(key: BreakpointKey): string {
  const breakpointValue = breakpointMax(key);
  if (breakpointValue === null) return "&.__unused";
  return mediaMaxWidth(`${breakpointValue}px`);
}

/**
 * Creates a responsive media query that only is active
 * if the device screen width is between the given breakpoints.
 * See https://github.com/smooth-code/xstyled/blob/951a2b84073160d298582a2c6bcf833310292f6e/packages/system/src/breakpoints.js.
 * @param lower - breakpoint key to use as the minimum screen width
 * @param upper - breakpoint key to use as the maximum screen width
 */
export function between(lower: BreakpointKey, upper: BreakpointKey): string {
  const min = breakpointMin(lower);
  const max = breakpointMax(upper);
  if (max === null) return up(lower);
  if (min === null) return down(upper);
  return mediaBetweenWidth(`${min}px`, `${max}px`);
}
