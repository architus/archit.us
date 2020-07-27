import EmojiManagerIcon from "@app/assets/images/tabs/emoji.svg";
import LogsIcon from "@app/assets/images/tabs/logs.svg";
import MusicQueueIcon from "@app/assets/images/tabs/music.svg";
// import AutoResponsesIcon from "@app/assets/images/tabs/responses.svg";
import SettingsIcon from "@app/assets/images/tabs/settings.svg";
import StatisticsIcon from "@app/assets/images/tabs/stats.svg";
// import AutoResponses from "@app/tabs/AutoResponses";
import EmojiManager from "@app/tabs/EmojiManager";
import Logs from "@app/tabs/Logs";
import MusicQueue from "@app/tabs/MusicQueue";
import Settings from "@app/tabs/Settings";
import Statistics from "@app/tabs/Statistics";
import { TabDefinition } from "@app/tabs/types";

/**
 * Each major app tab, in the order that they are shown
 * on the secondary navigation pane to the left
 */
const definitions: TabDefinition[] = [
  // {
  //   path: "responses",
  //   name: "Auto Responses",
  //   icon: AutoResponsesIcon,
  //   component: AutoResponses,
  // },
  {
    path: "emoji",
    name: "Emoji Manager",
    icon: EmojiManagerIcon,
    component: EmojiManager,
  },
  {
    path: "stats",
    name: "Statistics",
    icon: StatisticsIcon,
    component: Statistics,
  },
  {
    path: "logs",
    name: "Logs",
    icon: LogsIcon,
    component: Logs,
  },
  {
    path: "settings",
    name: "Settings",
    icon: SettingsIcon,
    component: Settings,
  },
  {
    path: "music",
    name: "Music Queue",
    icon: MusicQueueIcon,
    component: MusicQueue,
  },
];

export default definitions;
