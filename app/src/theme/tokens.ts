/* eslint-disable @typescript-eslint/camelcase */

import { ColorMode } from "@architus/facade/theme/color";

// Legacy tokens used from xstyled
const theme = {
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
    tooltip: "rgb(11, 12, 15)",
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
        // Same as `dark.b_600`
        tooltip: "hsl(220, 13%, 28%)",
        // Same as `dark.b_600`
        footer: "hsl(220, 13%, 28%)",
      },
    },
  },
};

export default theme;
