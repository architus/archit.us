import React from "react";

import Settings from "Dynamic/Settings";
import AutoResponses from "Dynamic/AutoResponses";
import EmojiManager from "Dynamic/EmojiManager";
import Logs from "Dynamic/Logs";
import MusicQueue from "Dynamic/MusicQueue";
import Statistics from "Dynamic/Statistics";

import { Guild } from "Utility/types";
import { TabPath } from "Dynamic/AppRoot/tabs";
import { AppPageProps } from "./types";

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
