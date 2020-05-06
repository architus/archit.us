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
  initialColorModeName: ColorMode.Light,
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
      "none",
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
    [0, 3, 5, 13, 21, 34, 55, 89, 144, 233, 377, 610],
    [
      "none",
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
    1: `0 10px 20px var(--xstyled-colors-shadow_medium), 0 6px 6px var(--xstyled-colors-shadow_medium)`,
    2: `0 14px 28px var(--xstyled-colors-shadow_heavy), 0 10px 10px var(--xstyled-colors-shadow_medium)`,
  },
  colors: {
    text: "rgba(33, 33, 33, 0.85)",
    text_strong: "rgb(33, 33, 33)",
    text_fade: "rgba(33, 33, 33, 0.7)",
    foreground_fade: "rgba(33, 33, 33, 0.4)",
    light: "rgb(246, 248, 249)",
    b_100: "hsl(200, 20%, 80%)",
    b_200: "hsl(200, 20%, 85%)",
    b_300: "hsl(200, 20%, 93%)",
    b_400: "hsl(200, 20%, 97%)",
    b_500: "hsl(200, 20%, 100%)",
    b_600: "hsl(200, 20%, 100%)",
    primary: "hsl(209, 45%, 55%)",
    secondary: "hsl(38, 52%, 58%)",
    tertiary: "#453e3e",
    info: "#73a3ba",
    warning: "#e3c75b",
    success: "#5da161",
    danger: "#e6584d",
    border: "rgba(33, 33, 33, 0.7)",
    contrast_border: "rgba(194, 207, 214, 0.6)",
    shadow_light: "rgba(0, 0, 0, 0.06)",
    shadow_medium: "rgba(0, 0, 0, 0.08)",
    shadow_heavy: "rgba(0, 0, 0, 0.11)",
    light_overlay: "rgba(255, 255, 255, 0.25)",
    light_overlay_slight: "rgba(255, 255, 255, 0.125)",
    dark_overlay: "rgba(0, 0, 0, 0.1)",
    dark_overlay_slight: "rgba(0, 0, 0, 0.05)",
    modes: {
      [ColorMode.Dark]: {
        text: "rgba(246, 248, 249, 0.85)",
        text_strong: "rgb(246, 248, 249)",
        text_fade: "rgba(246, 248, 249, 0.7)",
        foreground_fade: "rgba(246, 248, 249, 0.4)",
        b_100: "hsl(0, 0%, 5%)",
        b_200: "hsl(0, 0%, 10%)",
        b_300: "hsl(0, 0%, 14%)",
        b_400: "hsl(0, 0%, 18%)",
        b_500: "hsl(0, 0%, 24%)",
        b_600: "hsl(0, 0%, 28%)",
        primary: "hsl(209, 45%, 65%)",
        secondary: "hsl(38, 52%, 62%)",
        border: "rgba(246, 248, 249, 0.7)",
        contrast_border: "transparent",
        shadow_light: "rgba(0, 0, 0, 0.07)",
        shadow_medium: "rgba(0, 0, 0, 0.12)",
        shadow_heavy: "rgba(0, 0, 0, 0.16)",
        light_overlay: "rgba(255, 255, 255, 0.1)",
        light_overlay_slight: "rgba(255, 255, 255, 0.05)",
        dark_overlay: "rgba(0, 0, 0, 0.25)",
        dark_overlay_slight: "rgba(0, 0, 0, 0.125)",
      },
    },
  },
};

export type Theme = typeof theme;
export type Space = number | Exclude<keyof Theme["space"], keyof never[]>;
export default theme;
