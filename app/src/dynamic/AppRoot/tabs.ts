import { AppTab } from "./types";
import chartSvg from "@app/assets/chart.inline.svg";
import cogsSvg from "@app/assets/cogs.inline.svg";
import emojiSvg from "@app/assets/emoji.inline.svg";
import musicSvg from "@app/assets/music.inline.svg";
import responsesSvg from "@app/assets/responses.inline.svg";
import scrollSvg from "@app/assets/scroll.inline.svg";

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
