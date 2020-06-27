/**
 * Page-wide color mode (light/dark)
 */
export enum ColorMode {
  Dark = "dark",
  Light = "light",
}

export const defaultMode: ColorMode = ColorMode.Dark;

// Dynamic colors that change depending on the theme
const colors = {
  [ColorMode.Light]: {
    // Foreground colors
    text: "rgba(33, 33, 33, 0.85)",
    textStrong: "rgb(33, 33, 33)",
    textFade: "rgba(33, 33, 33, 0.7)",
    textLight: "rgba(33, 33, 33, 0.4)",
    // Background colors
    "bg-40": "hsl(200, 20%, 75%)",
    "bg-30": "hsl(200, 20%, 80%)",
    "bg-20": "hsl(200, 20%, 85%)",
    "bg-10": "hsl(200, 20%, 93%)",
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
    shadowLight: "rgba(0, 0, 0, 0.06)",
    shadowMedium: "rgba(0, 0, 0, 0.075)",
    shadowBold: "rgba(0, 0, 0, 0.09)",
    shadowHeavy: "rgba(0, 0, 0, 0.3)",
    // Same as `dark.bg+20`
    tooltip: "hsl(220, 13%, 28%)",
    // Same as `dark.bg+20`
    footer: "hsl(220, 13%, 28%)",
  },
  [ColorMode.Dark]: {
    // Foreground colors
    text: "rgba(246, 248, 249, 0.85)",
    textStrong: "rgb(246, 248, 249)",
    textFade: "rgba(246, 248, 249, 0.7)",
    textLight: "rgba(246, 248, 249, 0.4)",
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
    shadowLight: "rgba(0, 0, 0, 0.08)",
    shadowMedium: "rgba(0, 0, 0, 0.12)",
    shadowBold: "rgba(0, 0, 0, 0.18)",
    shadowHeavy: "rgba(0, 0, 0, 0.5)",
    // Same as `dark.bg-30`
    tooltip: "rgb(11, 12, 15)",
    // Same as `dark.bg`
    footer: "hsl(220, 13%, 18%)",
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

function toVariable(key: ColorKey): string {
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
 * @param colorMode - desired color mode from which to use colors
 */
function makeVariableDefinitions(colorMode: ColorMode): string {
  return Object.entries(colors[colorMode])
    .map(([key, value]) => `${toVariable(key as ColorKey)}: ${value};`)
    .join("");
}

/**
 * Gets the css for use in the global CSS root
 */
export function injectColorGlobals(): string {
  const definitions =
    makeVariableDefinitions(defaultMode) +
    Object.values(ColorMode)
      .filter((colorMode) => defaultMode !== colorMode)
      .map(
        (colorMode) =>
          `&.${colorMode} { ${makeVariableDefinitions(colorMode)} }`
      )
      .join(" ");
  return `body { ${definitions} }`;
}

/**
 * Gets the (unchanging) string value of the given static color key
 * @param key - static color key to get the color for
 */
export function staticColor(key: StaticColorKey): string {
  return staticColors[key];
}

/**
 * Gets the (unchanging) string value of the given dynamic color key
 * under the given color mode (uses `defaultMode` as a fallback).
 * **Will not be reactive to the app's theme**.
 * To use a reactive version, see `color` for CSS
 * and `useThemeColor` (implementation specific) for JavaScript
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
 * Scopes the given CSS content to the given color mode
 * @param colorMode - desired color mode
 * @param css - inner CSS content (wrapped with selector)
 */
export function mode(colorMode: ColorMode, css: string): string {
  return `body.${colorMode} & { ${css} }`;
}
