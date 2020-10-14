import { createSlice } from "@reduxjs/toolkit";

import { statsSuccess } from "@app/store/api/rest";
import { Nil } from "@architus/lib/types";
import { isDefined } from "@architus/lib/utility";
import { HoarFrost } from "src/utility/types";

/**
 * Stores statistics for the guilds
 */

export interface GuildStatistics {
  memberCount: number;
  messageCount: number;
  architusCount: number;
  commonWords: Array<[string, number]>;
  mentionCounts: Record<string, number>;
  memberCounts: Record<string, number>;
  channelCounts: Record<string, number>;
  timeMemberCounts: Record<string, Record<string, number>>;
  upToDate: boolean;
  forbidden: boolean;
  lastActivity: string;
  popularEmojis: Array<HoarFrost>;
}

export interface Statistics {
  statistics: Record<string, GuildStatistics> | Nil;
}

// ? ====================
// ? Reducer exports
// ? ====================

const initialState: Statistics = { statistics: null };
const slice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: {
    [statsSuccess.type]: (state, action): Statistics => {
      if (statsSuccess.match(action)) {
        const { guildId, response } = action.payload;
        if (isDefined(state.statistics)) {
          state.statistics[guildId as string] = response;
        } else {
          return { statistics: { [guildId]: response } };
        }
      }
      return state;
    },
  },
});

export default slice.reducer;
