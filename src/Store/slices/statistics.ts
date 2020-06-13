import { createSlice } from "@reduxjs/toolkit";
import { stats } from "Store/routes";
import { restSuccess, statsSuccess } from "Store/api/rest";
import { Nil, Snowflake } from "Utility/types";

/**
 * Stores statistics for the guilds
 */
interface MemberCount {
  count: number;
}
interface MessageCount {
  count: number;
  channels: Record<Snowflake, number>;
  members: Record<Snowflake, number>;
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
        return { statistics: { [guildId]: response } };
      }
      return state;
    },
  },
});

export default slice.reducer;
