import { createSlice } from "@reduxjs/toolkit";

import { statsSuccess } from "@app/store/api/rest";
import { Nil } from "@architus/lib/types";
import { isDefined } from "@architus/lib/utility";

/**
 * Stores statistics for the guilds
 */
interface MemberCount {
  count: number;
}
interface MessageCount {
  count: number;
  channels: Record<string, number>;
  members: Record<string, number>;
  times: Record<number, number>;
}

export interface GuildStatistics {
  members: MemberCount;
  messages: MessageCount;
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
