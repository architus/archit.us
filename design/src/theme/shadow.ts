import { color } from "./color";

const shadows = {
  z0: [
    `0 3px 6px ${color("shadowLight")}`,
    `0 3px 6px ${color("shadowMedium")}`,
  ].join(","),
  z1: [
    `0 6px 12px ${color("shadowLight")}`,
    `0 4px 5px ${color("shadowMedium")}`,
  ].join(","),
  z2: [
    `0 10px 20px ${color("shadowMedium")}`,
    `0 6px 6px ${color("shadowMedium")}`,
  ].join(","),
  z3: [
    `0 14px 28px ${color("shadowBold")}`,
    `0 10px 10px ${color("shadowMedium")}`,
  ].join(","),
} as const;

/**
 * Elevation of component compared to its background
 */
export type Elevation = keyof typeof shadows;

/**
 * Extracts a CSS expression for a shadow
 * @param elevation - Elevation of component compared to its background
 */
export function shadow(elevation: Elevation): string {
  return shadows[elevation];
}
