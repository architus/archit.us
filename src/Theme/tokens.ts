/* eslint-disable @typescript-eslint/camelcase */

/**
 * Creates named properties on an array to add string aliases to array values
 * @param base - Base values
 * @param aliases - Array of string aliases that correspond to the values
 * in the same positions
 */
function withAliases<T, R extends string>(
  base: readonly T[],
  aliases: readonly R[]
): T[] & { [k in R]: T } {
  const folded = [...base];
  for (let i = 0; i < base.length; ++i) {
    const alias = aliases[i];
    const value = base[i];
    ((folded as unknown) as Record<R, T>)[alias] = value;
  }
  return folded as T[] & { [k in R]: T };
}

const sansSerif =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";

/**
 * Xstyled color mode definitions
 */
export enum ColorMode {
  Dark = "dark",
  Light = "light",
}

const theme = {
  initialColorModeName: ColorMode.Dark,
  defaultColorModeName: ColorMode.Dark,
  useColorSchemeMediaQuery: false,
  fonts: {
    body: sansSerif,
    heading: `'Renner*', ${sansSerif}`,
    code:
      "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  space: withAliases(
    [0, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610],
    [
      "zero",
      "atto",
      "femto",
      "pico",
      "nano",
      "micro",
      "milli",
      "centi",
      "kilo",
      "mega",
      "giga",
      "tera",
      "peta",
    ]
  ),
  sizes: withAliases(
    [0, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610],
    [
      "zero",
      "atto",
      "femto",
      "pico",
      "nano",
      "micro",
      "milli",
      "centi",
      "kilo",
      "mega",
      "giga",
      "tera",
      "peta",
    ]
  ),
  shadows: {
    0: `0 3px 6px var(--xstyled-colors-shadow_light), 0 3px 6px var(--xstyled-colors-shadow_medium)`,
    1: `0 6px 12px var(--xstyled-colors-shadow_light), 0 4px 5px var(--xstyled-colors-shadow_light)`,
    2: `0 10px 20px var(--xstyled-colors-shadow_medium), 0 6px 6px var(--xstyled-colors-shadow_medium)`,
    3: `0 14px 28px var(--xstyled-colors-shadow_heavy), 0 10px 10px var(--xstyled-colors-shadow_medium)`,
    inner: `inset 0 0 16px var(--xstyled-colors-shadow_heavy)`,
  },
  breakpoints: {
    xs: 0,
    vs: 400,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
  colors: {
    // Global colors
    tertiary: "#453e3e",
    info: "#73a3ba",
    warning: "#e3c75b",
    success: "#5da161",
    danger: "#e6584d",
    light: "rgb(232, 234, 235)",
    dark: "rgb(22, 24, 30)",
    // Overlays are mode-agnostic, adjusts depend on theme to lighten/darken
    light_overlay: "rgba(255, 255, 255, 0.1)",
    dark_overlay_strong: "rgba(0, 0, 0, 0.5)",

    // Theme colors
    text: "rgba(246, 248, 249, 0.85)",
    text_strong: "rgb(246, 248, 249)",
    text_fade: "rgba(246, 248, 249, 0.7)",
    foreground_fade: "rgba(246, 248, 249, 0.4)",
    b_000: "hsl(220, 19%, 2%)",
    b_100: "hsl(220, 17%, 5%)",
    b_200: "hsl(220, 18%, 10%)",
    b_300: "hsl(220, 15%, 13%)",
    b_400: "hsl(220, 13%, 18%)",
    b_500: "hsl(220, 13%, 22%)",
    b_600: "hsl(220, 13%, 28%)",
    primary: "hsl(209, 45%, 65%)",
    secondary: "hsl(38, 52%, 62%)",
    border: "rgba(246, 248, 249, 0.09)",
    border_light: "rgba(246, 248, 249, 0.075)",
    contrast_border: "transparent",
    shadow_light: "rgba(0, 0, 0, 0.07)",
    shadow_medium: "rgba(0, 0, 0, 0.12)",
    shadow_heavy: "rgba(0, 0, 0, 0.18)",
    shadow_extraheavy: "rgba(0, 0, 0, 0.5)",
    light_adjust: "rgba(255, 255, 255, 0.08)",
    light_adjust_slight: "rgba(255, 255, 255, 0.02)",
    dark_adjust: "rgba(0, 0, 0, 0.25)",
    dark_adjust_slight: "rgba(0, 0, 0, 0.125)",
    contrast_overlay: "rgba(255, 255, 255, 0.023)",
    input_focus_border: "transparent",
    // Same as `dark.b_100`
    tooltip: "rgba(11, 12, 15, 0.95)",
    // Same as `dark.b_400`
    footer: "hsl(220, 13%, 18%)",

    modes: {
      [ColorMode.Light]: {
        text: "rgba(33, 33, 33, 0.85)",
        text_strong: "rgb(33, 33, 33)",
        text_fade: "rgba(33, 33, 33, 0.7)",
        foreground_fade: "rgba(33, 33, 33, 0.4)",
        b_000: "hsl(200, 20%, 75%)",
        b_100: "hsl(200, 20%, 80%)",
        b_200: "hsl(200, 20%, 85%)",
        b_300: "hsl(200, 20%, 93%)",
        b_400: "hsl(200, 20%, 97%)",
        b_500: "hsl(200, 20%, 100%)",
        b_600: "hsl(200, 20%, 100%)",
        primary: "hsl(209, 45%, 55%)",
        secondary: "hsl(38, 52%, 58%)",
        border: "rgba(194, 207, 214, 0.8)",
        border_light: "rgba(194, 207, 214, 0.45)",
        contrast_border: "rgba(194, 207, 214, 0.9)",
        shadow_light: "rgba(0, 0, 0, 0.06)",
        shadow_medium: "rgba(0, 0, 0, 0.075)",
        shadow_heavy: "rgba(0, 0, 0, 0.09)",
        shadow_extraheavy: "rgba(0, 0, 0, 0.3)",
        light_adjust: "rgba(255, 255, 255, 0.45)",
        light_adjust_slight: "rgba(255, 255, 255, 0.3)",
        dark_adjust: "rgba(0, 0, 0, 0.1)",
        dark_adjust_slight: "rgba(0, 0, 0, 0.05)",
        contrast_overlay: "rgba(0, 0, 0, 0.04)",
        input_focus_border: "hsl(209, 45%, 55%)",
        // Same as `dark.b_400`
        tooltip: "rgba(40, 44, 52, 0.95)",
        // Same as `dark.b_600`
        footer: "hsl(220, 13%, 28%)",
      },
    },
  },
};

// Additional colors used in SEO:
export const applicationThemeColor = "#6496C4";
export const safariTabColor = "#6192be";
export const windowsTileColor = "#ffc40d";

export function color(colorKey: string): string {
  return `var(--xstyled-colors-${colorKey})`;
}

export type Theme = typeof theme;
export type Space = number | Exclude<keyof Theme["space"], keyof never[]>;
export type ColorKey = Exclude<keyof Theme["colors"], "modes">;
export default theme;

export enum Breakpoint {
  // Extra small
  XS = "xs",
  // Very small
  VS = "vs",
  // Small
  SM = "sm",
  // Medium
  MD = "md",
  // Large
  LG = "lg",
  // Extra large
  XL = "xl",
}

export type BreakpointObject<ArgType> = {
  [Key in Breakpoint]?: ArgType;
};

/**
 * Augments a type to be Type | BreakpointObject<Type>,
 * in other words, allow a property to be `1` or `{ xs: 1, sm: 2 }`
 */
export type WithBreakpointArgs<Props> = {
  [Key in keyof Props]?: Props[Key] | BreakpointObject<Props[Key]>;
};
