import Settings from "dynamic/Settings";
import Begin from "dynamic/Begin";

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
    component: Begin
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
    component: Begin
  },
  {
    icon: musicSvg,
    name: "Music Queue",
    path: "queue",
    component: Begin
  },
  {
    icon: responsesSvg,
    name: "Auto Responses",
    path: "responses",
    component: Begin
  },
  {
    icon: scrollSvg,
    name: "Logs",
    path: "logs",
    component: Begin
  }
];

export const DEFAULT_TAB = tabs.length > 0 ? tabs[0].path : "";
export { tabs };
