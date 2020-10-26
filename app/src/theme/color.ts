import {
  ColorMode,
  toVariable,
  makeRootDefinitions,
} from "@architus/facade/theme/color";

/**
 * Collection of other colors used in the dashboard
 */
export const OtherColors = {
  Discord: "#7289da",
  DiscordFg: "#dcddde",
  DiscordBg: "#36393f",
  DiscordChromeBg: "#202225",
  DiscordMention: "#faa61a",
  DiscordLinkFg: "#0096cf",
  DiscordEmbedBg: "#2f3136",
  DiscordCodeFg: "#c2c4c6",
  DiscordCodeBg: "#2f3136",
  DiscordCodeBorder: "#2b2c31",
  DiscordEmbedColors: ["#7289da", "#5da161", "#e3c75b", "#e6584d", "#673ab7"],
  DiscordReactionBg: "#3e4147",
  DiscordReactionActiveBg: "#42485c",
  DiscordScrollThumb: "#202225",
  DiscordScrollTrack: "#2f3136",
  DiscordMessageDivider: "#3e4147",
  DiscordInputBg: "#484c52",
} as const;

const appColors = {
  [ColorMode.Light]: { placeholder: "" },
  [ColorMode.Dark]: { placeholder: "" },
} as const;

export type AppColorKey = keyof typeof appColors[ColorMode.Dark] &
  keyof typeof appColors[ColorMode.Light];

/**
 * Extracts a CSS expression to use an app color
 * @param key - color key to use
 */
export function appColor(key: AppColorKey): string {
  return `var(${toVariable(key)})`;
}

/**
 * Gets the css for use in the global CSS root
 */
export function injectColorGlobals(): string {
  return `body { ${makeRootDefinitions(appColors)} }`;
}
