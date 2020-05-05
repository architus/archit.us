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

const theme = {
  initialColorModeName: "light",
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
  colors: {
    text: "rgba(33, 33, 33, 0.85)",
    light: "rgb(246, 248, 249)",
    "text.strong": "rgb(33, 33, 33)",
    "text.fade": "rgba(33, 33, 33, 0.7)",
    "b.100": "hsl(200, 20%, 80%)",
    "b.200": "hsl(200, 20%, 85%)",
    "b.300": "hsl(200, 20%, 93%)",
    "b.400": "hsl(200, 20%, 95%)",
    "b.500": "hsl(200, 20%, 97%)",
    "b.600": "hsl(200, 20%, 100%)",
    primary: "hsl(209, 45%, 55%)",
    secondary: "hsl(38, 52%, 58%)",
    tertiary: "#453e3e",
    info: "#73a3ba",
    warning: "#e3c75b",
    success: "#5da161",
    danger: "#e6584d",
    modes: {
      dark: {
        text: "rgba(246, 248, 249, 0.85)",
        "text.strong": "rgb(246, 248, 249)",
        "text.fade": "rgba(246, 248, 249, 0.7)",
        "b.100": "hsl(0, 0%, 5%)",
        "b.200": "hsl(0, 0%, 10%)",
        "b.300": "hsl(0, 0%, 15%)",
        "b.400": "hsl(0, 0%, 20%)",
        "b.500": "hsl(0, 0%, 24%)",
        "b.600": "hsl(0, 0%, 30%)",
        primary: "hsl(209, 45%, 65%)",
        secondary: "hsl(38, 52%, 62%)",
      },
    },
  },
};

export type Theme = typeof theme;
export default theme;
