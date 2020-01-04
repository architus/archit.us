import Settings from "Dynamic/Settings";
import AutoResponses from "Dynamic/AutoResponses";
import EmojiManager from "Dynamic/EmojiManager";
import Logs from "Dynamic/Logs";
import MusicQueue from "Dynamic/MusicQueue";
import Statistics from "Dynamic/Statistics";
import chartSvg from "Assets/chart.inline.svg";
import cogsSvg from "Assets/cogs.inline.svg";
import emojiSvg from "Assets/emoji.inline.svg";
import musicSvg from "Assets/music.inline.svg";
import responsesSvg from "Assets/responses.inline.svg";
import scrollSvg from "Assets/scroll.inline.svg";
import { AppPageProps, AppTab } from "./types";

// Type helper function
const tab = <P extends AppPageProps>(t: AppTab<P>): AppTab<P> => t;

const tabs = {
  stats: tab({
    icon: chartSvg,
    name: "Statistics",
    component: Statistics
  }),
  emoji: tab({
    icon: emojiSvg,
    name: "Emoji Manager",
    component: EmojiManager
  }),
  queue: tab({
    icon: musicSvg,
    name: "Music Queue",
    component: MusicQueue
  }),
  responses: tab({
    icon: responsesSvg,
    name: "Auto Responses",
    component: AutoResponses,
    contentClass: "no-scroll"
  }),
  logs: tab({
    icon: scrollSvg,
    name: "Logs",
    component: Logs
  }),
  settings: tab({
    icon: cogsSvg,
    name: "Settings",
    component: Settings
  })
};

export type TabPath = keyof typeof tabs;
export const tabPaths: TabPath[] = Object.keys(tabs) as TabPath[];
export const DEFAULT_TAB: TabPath =
  tabPaths.length > 0 ? tabPaths[0] : ("" as TabPath);
export { tabs };
