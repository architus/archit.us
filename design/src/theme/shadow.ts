import { color } from "./color";

/**
 * Elevation of component compared to its background
 */
export enum Elevation {
  Z0 = "z0",
  Z1 = "z1",
  Z2 = "z2",
  Z3 = "z3",
}

const shadows: Record<Elevation, string> = {
  [Elevation.Z0]: [
    `0 3px 6px ${color("shadowLight")}`,
    `0 3px 6px ${color("shadowMedium")}`,
  ].join(","),
  [Elevation.Z1]: [
    `0 6px 12px ${color("shadowLight")}`,
    `0 4px 5px ${color("shadowMedium")}`,
  ].join(","),
  [Elevation.Z2]: [
    `0 10px 20px ${color("shadowMedium")}`,
    `0 6px 6px ${color("shadowMedium")}`,
  ].join(","),
  [Elevation.Z3]: [
    `0 14px 28px ${color("shadowBold")}`,
    `0 10px 10px ${color("shadowMedium")}`,
  ].join(","),
};

/**
 * Extracts a CSS expression for a shadow
 * @param elevation - Elevation of component compared to its background
 */
export function shadow(elevation: Elevation): string {
  return shadows[elevation];
}
