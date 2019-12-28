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
