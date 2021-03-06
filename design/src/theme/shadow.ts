import { transparentize } from "polished";

import { color } from "./color";

const shadows = {
  z0: [
    `0 3px  6px  ${color("shadowLight")}`,
    `0 3px  6px  ${color("shadowMedium")}`,
  ].join(","),
  z1: [
    `0 6px  12px ${color("shadowLight")}`,
    `0 4px   5px ${color("shadowMedium")}`,
  ].join(","),
  z2: [
    `0 10px 20px ${color("shadowMedium")}`,
    `0 6px  6px  ${color("shadowMedium")}`,
  ].join(","),
  z3: [
    `0 14px 28px ${color("shadowBold")}`,
    `0 10px 10px ${color("shadowMedium")}`,
  ].join(","),
  innerTop: `inset 0 11px 8px -10px ${color("shadowMedium")}`,
  inner: (c: string) =>
    `inset 0 11px 15px -12px ${c}, inset 0 -11px 15px -12px ${c}`,
  highlight: (glowColor: string, opacity = 1) =>
    `0 0 0 0.2rem ${transparentize(1 - 0.4 * opacity, glowColor)}`,
  contrast: [
    `0 6px 12px ${color("textReverse")}`,
    `0 4px  5px ${color("textReverse")}`,
  ].join(","),
  inset: (c: string, opacity = 1) =>
    `inset 0 3px 7px ${transparentize(1 - 0.125 * opacity, c)}`,
} as const;

/**
 * Shadow type
 */
export type ShadowKey = keyof typeof shadows;

/**
 * Extracts a CSS expression for a shadow
 * @param key - Shadow type
 */
export function shadow<K extends ShadowKey>(key: K): typeof shadows[K] {
  return shadows[key];
}
