import chartSvg from "Assets/chart.inline.svg";
import cogsSvg from "Assets/cogs.inline.svg";
import emojiSvg from "Assets/emoji.inline.svg";
import musicSvg from "Assets/music.inline.svg";
import responsesSvg from "Assets/responses.inline.svg";
import scrollSvg from "Assets/scroll.inline.svg";
import { AppTab } from "./types";

// Type helper function
const tab = (t: AppTab): AppTab => t;

const tabs = {
  stats: tab({
    icon: chartSvg,
    name: "Statistics",
  }),
  emoji: tab({
    icon: emojiSvg,
    name: "Emoji Manager",
    contentClass: "no-scroll",
  }),
  queue: tab({
    icon: musicSvg,
    name: "Music Queue",
  }),
  responses: tab({
    icon: responsesSvg,
    name: "Auto Responses",
    contentClass: "no-scroll",
  }),
  logs: tab({
    icon: scrollSvg,
    name: "Logs",
  }),
  settings: tab({
    icon: cogsSvg,
    name: "Settings",
  }),
};

export type TabPath = keyof typeof tabs;
export const tabPaths: TabPath[] = Object.keys(tabs) as TabPath[];
export const DEFAULT_TAB: TabPath =
  tabPaths.length > 0 ? tabPaths[0] : ("" as TabPath);
export { tabs };
