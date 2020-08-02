import { parseToRgb } from "polished";
import React from "react";
import tinycolor, { Instance } from "tinycolor2";

// Re-export tinycolor for convenience
export const Color = tinycolor;
export type ColorInstance = Instance;

/**
 * Page-wide color mode (light/dark)
 */
export enum ColorMode {
  Dark = "dark",
  Light = "light",
}

export const defaultMode: ColorMode = ColorMode.Dark;

export type ColorModeContext = {
  mode: ColorMode;
  setMode: (newMode: ColorMode) => void;
};

export const ColorModeContext = React.createContext<ColorModeContext>({
  mode: defaultMode,
  setMode: () => null,
});

// Dynamic colors that change depending on the theme
const colors = {
  [ColorMode.Light]: {
    // Foreground colors
    text: "rgba(33, 33, 33, 0.7)",
    textStrong: "rgba(33, 33, 33, 0.85)",
    textFade: "rgba(33, 33, 33, 0.6)",
    textLight: "rgba(33, 33, 33, 0.4)",
    textReverse: "rgba(244, 246, 249, 0.7)",
    textOverlay: "rgba(33, 33, 33, 0.1)",
    // Background colors
    "bg-40": "hsl(200, 20%, 75%)",
    "bg-30": "hsl(200, 20%, 80%)",
    "bg-20": "hsl(200, 20%, 85%)",
    "bg-10": "hsl(200, 19%, 91%)",
    bg: "hsl(200, 20%, 97%)",
    "bg+10": "hsl(200, 20%, 100%)",
    "bg+20": "hsl(200, 20%, 100%)",
    // Accent colors & tints/shades
    // https://maketintsandshades.com/#7ea7ce
    "primary-40": "#121c26",
    "primary-30": "#24394d",
    "primary-20": "#355573",
    "primary-10": "#47729a",
    primary: "#598ec0",
    "primary+10": "#7aa5cd",
    "primary+20": "#9bbbd9",
    "primary+30": "#bdd2e6",
    "primary+40": "#dee8f2",
    // https://maketintsandshades.com/#d0ac6c
    "secondary-40": "#292112",
    "secondary-30": "#524125",
    "secondary-20": "#7a6237",
    "secondary-10": "#a3824a",
    secondary: "#cca35c",
    "secondary+10": "#d6b57d",
    "secondary+20": "#e0c89d",
    "secondary+30": "#ebdabe",
    "secondary+40": "#f5edde",
    // Semantic component colors
    contrastBorder: "rgba(194, 207, 214, 0.9)",
    border: "rgba(194, 207, 214, 0.8)",
    inputFocusBorder: "hsl(209, 45%, 55%)",
    shadowLight: "rgba(0, 0, 0, 0.06)",
    shadowMedium: "rgba(0, 0, 0, 0.075)",
    shadowBold: "rgba(0, 0, 0, 0.09)",
    shadowHeavy: "rgba(0, 0, 0, 0.3)",
    // Same as `dark.bg+20` but a shade lighter
    tooltip: "hsl(220, 15%, 35%)",
    // Same as `dark.bg+20`
    footer: "hsl(220, 13%, 28%)",
    modalOverlay: "rgba(255, 255, 255, 0.7)",
    hoverOverlay: "rgba(33, 33, 33, 0.05)",
    activeOverlay: "rgba(33, 33, 33, 0.1)",
    contrastOverlay: "rgba(0, 0, 0, 0.04)",
  },
  [ColorMode.Dark]: {
    // Foreground colors
    text: "rgba(201, 213, 219, 0.85)",
    textStrong: "rgba(244, 246, 249, 0.9)",
    textFade: "rgba(201, 213, 219, 0.7)",
    textLight: "rgba(201, 213, 219, 0.4)",
    textReverse: "rgba(0, 0, 0, 0.5)",
    textOverlay: "rgba(201, 213, 219, 0.1)",
    // Background colors
    "bg-40": "hsl(220, 19%, 2%)",
    "bg-30": "hsl(220, 17%, 5%)",
    "bg-20": "hsl(220, 18%, 10%)",
    "bg-10": "hsl(220, 15%, 13%)",
    bg: "hsl(220, 13%, 18%)",
    "bg+10": "hsl(220, 13%, 22%)",
    "bg+20": "hsl(220, 13%, 28%)",
    // Accent colors & tints/shades
    // https://maketintsandshades.com/#7ea7ce
    "primary-40": "#151f28",
    "primary-30": "#2a3e50",
    "primary-20": "#3f5d79",
    "primary-10": "#547ca1",
    primary: "#699bc9",
    "primary+10": "#87afd4",
    "primary+20": "#a5c3df",
    "primary+30": "#c3d7e9",
    "primary+40": "#e1ebf4",
    // https://maketintsandshades.com/#d0ac6c
    "secondary-40": "#2a2216",
    "secondary-30": "#53452b",
    "secondary-20": "#7d6741",
    "secondary-10": "#a68a56",
    secondary: "#d0ac6c",
    "secondary+10": "#d9bd89",
    "secondary+20": "#e3cda7",
    "secondary+30": "#ecdec4",
    "secondary+40": "#f6eee2",
    // Semantic component colors
    contrastBorder: "transparent",
    border: "rgba(246, 248, 249, 0.09)",
    inputFocusBorder: "transparent",
    shadowLight: "rgba(0, 0, 0, 0.08)",
    shadowMedium: "rgba(0, 0, 0, 0.12)",
    shadowBold: "rgba(0, 0, 0, 0.18)",
    shadowHeavy: "rgba(0, 0, 0, 0.5)",
    // Same as `dark.bg-30`
    tooltip: "rgb(11, 12, 15)",
    // Same as `dark.bg`
    footer: "hsl(220, 13%, 18%)",
    modalOverlay: "rgba(0, 0, 0, 0.7)",
    hoverOverlay: "rgba(201, 213, 219, 0.05)",
    activeOverlay: "rgba(201, 213, 219, 0.1)",
    contrastOverlay: "rgba(255, 255, 255, 0.023)",
  },
};

// Static colors that don't change depending on the theme
const staticColors = {
  tertiary: "#453e3e",
  info: "#73a3ba",
  warning: "#e3c75b",
  success: "#5da161",
  danger: "#e6584d",
  light: "rgb(232, 234, 235)",
  dark: "rgb(22, 24, 30)",
};

// Other colors
export const themeColor = "#6496c4";
export const themeBgColor = "#496D8F";
export const msTileColor = "#2b5797";

/**
 * Bootstrap-like variant, using colors injected from the theme.
 * See https://getbootstrap.com/docs/4.0/content/tables/#contextual-classes
 */
export type Variant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "light"
  | "dark";

// Additional colors used in SEO:
export const applicationThemeColor = "#6496C4";
export const safariTabColor = "#6192be";
export const windowsTileColor = "#ffc40d";

type DynamicColorTable = typeof colors[keyof typeof colors];
export type DynamicColorKey = keyof DynamicColorTable;
export type StaticColorKey = keyof typeof staticColors;
export type ColorKey = DynamicColorKey | StaticColorKey;

// Themes must contain same keys.
// If there is a type error in this block, then check the theme definitions
type ThemeDifference<A extends ColorMode, B extends ColorMode> = Exclude<
  typeof colors[A],
  typeof colors[B]
>;
type MustBeEmpty1 = ThemeDifference<ColorMode.Light, ColorMode.Dark>;
type MustBeEmpty2 = ThemeDifference<ColorMode.Dark, ColorMode.Light>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const n1: never = null as MustBeEmpty1;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const n2: never = null as MustBeEmpty2;

// Variant should only contain keys from the theme
// If there is a type error in this block, then check the definition of `Variant`
type MustBeEmpty3 = Exclude<Variant, ColorKey>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const n3: never = null as MustBeEmpty3;

export function toVariable(key: string): string {
  return `--c-${key.replace("+", "_plus_")}`;
}

/**
 * Extracts a CSS expression to use a design system color
 * @param key - color key to use
 */
export function color(key: ColorKey): string {
  if (key in staticColors) {
    return staticColors[key as StaticColorKey];
  }
  return `var(${toVariable(key)})`;
}

/**
 * Creates variable definition statements for all dynamic colors in a color mode
 * @param map - source theme/color map
 * @param colorMode - desired color mode from which to use colors
 */
export function makeVariableDefinitions(
  map: Record<ColorMode, Record<string, string>>,
  colorMode: ColorMode
): string {
  return Object.entries(map[colorMode])
    .map(([key, value]) => `${toVariable(key as ColorKey)}: ${value};`)
    .join("");
}

/**
 * Gets the css for use in the global CSS root
 * @param map - source theme/color map
 */
export function makeRootDefinitions(
  map: Record<ColorMode, Record<string, string>>
): string {
  return (
    makeVariableDefinitions(map, defaultMode) +
    Object.values(ColorMode)
      .filter((colorMode) => defaultMode !== colorMode)
      .map(
        (colorMode) =>
          `&.${colorMode} { ${makeVariableDefinitions(map, colorMode)} }`
      )
      .join(" ")
  );
}

/**
 * Gets the css for use in the global CSS root
 */
export function injectColorGlobals(): string {
  return `body { ${makeRootDefinitions(colors)} }`;
}

/**
 * Gets the (unchanging) raw string value of the given static color key
 * @param key - static color key to get the color for
 */
export function staticColor(key: StaticColorKey): string {
  return staticColors[key];
}

/**
 * Gets the (unchanging) raw string value of the given dynamic color key
 * under the given color mode (uses `defaultMode` as a fallback).
 * **Will not be reactive to the app's theme**.
 * To use a reactive version, see `color` for CSS
 * and `useColorMode` + `hybridColor` for JavaScript
 * @param key - dynamic color key to get the color for
 * @param colorMode - color mode to use when looking up actual value
 */
export function dynamicColor(
  key: DynamicColorKey,
  colorMode: ColorMode = defaultMode
): string {
  return colors[colorMode][key];
}

/**
 * Creates a selector for the given color mode
 * @param colorMode - desired color mode
 */
export function mode(colorMode: ColorMode): string {
  return `body.${colorMode} &`;
}

/**
 * Splits a color into a "r, g, b" string for use in opacity-enabled variables.
 * See https://blog.jim-nielsen.com/2019/generating-shades-of-color-using-css-variables/
 * @param baseColor - base color string
 */
export function splitColor(baseColor: string): string {
  const { red, green, blue } = parseToRgb(baseColor);
  return `${red}, ${green}, ${blue}`;
}

/**
 * Gets the (unchanging) raw string value of the given color key
 * under the given color mode (uses `defaultMode` as a fallback).
 * **Will not be reactive to the app's theme**.
 * To use a reactive version, see `color` for CSS
 * and include `useColorMode` for JavaScript
 * @param key - dynamic color key to get the color for
 * @param colorMode - color mode to use when looking up actual value
 */
export function hybridColor(
  key: ColorKey,
  colorMode: ColorMode = defaultMode
): string {
  if (key in staticColors) {
    return staticColors[key as StaticColorKey];
  }
  return (colors[colorMode] ?? colors[defaultMode])[key as DynamicColorKey];
}
