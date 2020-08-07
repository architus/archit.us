import { useContext, useMemo } from "react";

import { ColorMode, ColorModeContext } from "./theme/color";
import {
  BreakpointKey,
  breakpoint,
  maxWidth,
  minWidth,
  betweenWidth,
} from "./theme/media";
import { useMedia } from "@architus/lib/hooks";

/**
 * Gets the current active color mode.
 * **Note**: care should be taken when using this to render on the server,
 * as there may be a flash upon initially rendering
 */
export function useColorMode(): ColorMode {
  return useContext(ColorModeContext).mode;
}

/**
 * Determines if the current screen size is larger than the given breakpoint
 * @param b - breakpoint key
 */
export function useUp(b: BreakpointKey): boolean {
  const breakpoints = useMemo(() => [minWidth(breakpoint(b))], [b]);
  const values = useMemo(() => [true], []);
  return useMedia(breakpoints, values, false);
}

/**
 * Determines if the current screen size is smaller than the given breakpoint
 * @param b - breakpoint key
 */
export function useDown(b: BreakpointKey): boolean {
  const breakpoints = useMemo(() => [maxWidth(breakpoint(b))], [b]);
  const values = useMemo(() => [true], []);
  return useMedia(breakpoints, values, false);
}

/**
 * Determines if the current screen size is between the two given breakpoints
 * @param a - lower breakpoint key
 * @param b - upper breakpoint key
 */
export function useBetween(a: BreakpointKey, b: BreakpointKey): boolean {
  const breakpoints = useMemo(
    () => [betweenWidth(breakpoint(a), breakpoint(b))],
    [a, b]
  );
  const values = useMemo(() => [true], []);
  return useMedia(breakpoints, values, false);
}
