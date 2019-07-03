import Settings from "dynamic/Settings";
import Begin from "dynamic/Begin";

import chartSvg from "./chart.inline.svg";
import cogsSvg from "./cogs.inline.svg";
import emojiSvg from "./emoji.inline.svg";
import musicSvg from "./music.inline.svg";
import responsesSvg from "./responses.inline.svg";
import scrollSvg from "./scroll.inline.svg";

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
