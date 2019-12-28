import { log } from "Utility";
import { ActionBase, ActionFactory } from "Store/types";
import { GuildCountLoadResponse } from "Store/api/rest/types";

// ? ====================
// ? Actions & Types
// ? ====================

export const GUILD_COUNT_NAMESPACE = "guildCount";
export const GUILD_COUNT_LOAD = "guildCount:load";

type GuildCountBase<T> = ActionBase<T, typeof GUILD_COUNT_NAMESPACE>;
export type GuildCountAction = GuildCountLoadAction;

export interface GuildCountLoadAction
  extends GuildCountBase<typeof GUILD_COUNT_LOAD> {
  payload: GuildCountLoadResponse;
}

// ? ====================
// ? Factories
// ? ====================

export const loadGuildCount: ActionFactory<
  GuildCountLoadAction,
  [GuildCountLoadResponse]
> = response => {
  log("Loading guild count from most recent data");
  return {
    namespace: GUILD_COUNT_NAMESPACE,
    type: GUILD_COUNT_LOAD,
    payload: response
  };
};
