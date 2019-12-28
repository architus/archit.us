import { StoreSlice, Reducer } from "Store/types";
import { scopeReducer } from "./base";
import {
  GUILD_COUNT_NAMESPACE,
  GuildCountAction,
  GUILD_COUNT_LOAD
} from "Store/actions";

/**
 * Stores static guild count metadata about the bot
 */
export type GuildCount = { guildCount: number; userCount: number };

// ? ====================
// ? Reducer exports
// ? ====================

const initial: GuildCount = { guildCount: 0, userCount: 0 };

const reducer: Reducer<GuildCount> = scopeReducer(
  GUILD_COUNT_NAMESPACE,
  (_: GuildCount, action: GuildCountAction): GuildCount => {
    switch (action.type) {
      case GUILD_COUNT_LOAD:
        return action.payload;
    }
  }
);

const slice: StoreSlice<GuildCount> = { initial, reducer };
export default slice;
