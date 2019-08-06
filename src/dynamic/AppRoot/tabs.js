import Settings from "dynamic/Settings";
import AutoResponses from "dynamic/AutoResponses";
import EmojiManager from "dynamic/EmojiManager";
import Logs from "dynamic/Logs";
import MusicQueue from "dynamic/MusicQueue";
import Statistics from "dynamic/Statistics";

import chartSvg from "assets/chart.inline.svg";
import cogsSvg from "assets/cogs.inline.svg";
import emojiSvg from "assets/emoji.inline.svg";
import musicSvg from "assets/music.inline.svg";
import responsesSvg from "assets/responses.inline.svg";
import scrollSvg from "assets/scroll.inline.svg";

const tabs = [
  {
    icon: chartSvg,
    name: "Statistics",
    path: "stats",
    component: Statistics
  },
  {
    icon: cogsSvg,
    name: "Settings",
    path: "settings",
    component: Settings
  },
  {
    icon: emojiSvg,
    name: "Emoji Manager",
    path: "emoji",
    component: EmojiManager
  },
  {
    icon: musicSvg,
    name: "Music Queue",
    path: "queue",
    component: MusicQueue
  },
  {
    icon: responsesSvg,
    name: "Auto Responses",
    path: "responses",
    component: AutoResponses,
    contentClass: "no-scroll"
  },
  {
    icon: scrollSvg,
    name: "Logs",
    path: "logs",
    component: Logs
  }
];

export const DEFAULT_TAB = tabs.length > 0 ? tabs[0].path : "";
export { tabs };
