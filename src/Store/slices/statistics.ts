import { createSlice } from "@reduxjs/toolkit";
import { stats } from "Store/routes";
import { restSuccess, statsSuccess } from "Store/api/rest";
import { Nil, Snowflake } from "Utility/types";
import { isDefined } from "Utility";

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

interface GuildStatistics {
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
