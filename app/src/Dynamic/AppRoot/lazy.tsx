import React from "react";

import { AppPageProps } from "./types";
import { TabPath } from "@app/dynamic/AppRoot/tabs";
import AutoResponses from "@app/dynamic/AutoResponses";
import EmojiManager from "@app/dynamic/EmojiManager";
import Logs from "@app/dynamic/Logs";
import MusicQueue from "@app/dynamic/MusicQueue";
import Settings from "@app/dynamic/Settings";
import Statistics from "@app/dynamic/Statistics";
import { Guild } from "@app/utility/types";

const tabComponents: Record<TabPath, React.ComponentType<AppPageProps>> = {
  stats: Statistics,
  emoji: EmojiManager,
  queue: MusicQueue,
  responses: AutoResponses,
  logs: Logs,
  settings: Settings,
};

type LazyPageRendererProps = {
  tab: TabPath;
  guild: Guild;
};

const LazyPageRenderer: React.FC<LazyPageRendererProps> = ({ tab, guild }) => {
  const Component = tabComponents[tab];
  return <Component guild={guild} />;
};

export default LazyPageRenderer;
