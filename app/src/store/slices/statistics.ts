import { createSlice } from "@reduxjs/toolkit";

import { restSuccess } from "@app/store/api/rest";
import { fetchStats } from "@app/store/routes";
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
    [restSuccess.type]: (state, action): Statistics => {
      if (fetchStats.match(action)) {
        const { guildId } = action.payload.routeData;
        const decoded = fetchStats.decode(action.payload);
        if (decoded.isDefined()) {
          if (isDefined(state.statistics)) {
            state.statistics[guildId as string] = decoded.get;
          } else {
            return { statistics: { [guildId]: decoded.get } };
          }
        }
      }
      return state;
    },
  },
});

export default slice.reducer;
