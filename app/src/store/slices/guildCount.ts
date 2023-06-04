import { createSlice } from "@reduxjs/toolkit";

import { restSuccess } from "@app/store/api/rest";
import { guildCount } from "@app/store/routes";
import { Nil } from "@app/utility/types";

/**
 * Stores static guild count metadata about the bot
 */
export interface GuildCount {
  guildCount: number | Nil;
  userCount: number | Nil;
}

// ? ====================
// ? Reducer exports
// ? ====================

const initialState: GuildCount = { guildCount: null, userCount: null };
const slice = createSlice({
  name: "guildCount",
  initialState,
  reducers: {},
  extraReducers: {
    [restSuccess.type]: (state, action): GuildCount => {
      if (guildCount.match(action)) {
        const decoded = guildCount.decode(action.payload);
        if (decoded.isDefined()) {
          return {
            guildCount: decoded.get.guild_count,
            userCount: decoded.get.user_count,
          };
        }
      }
      return state;
    },
  },
});

export default slice.reducer;
