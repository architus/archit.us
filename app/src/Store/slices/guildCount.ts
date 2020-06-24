import { createSlice } from "@reduxjs/toolkit";
import { guildCount } from "Store/routes";
import { restSuccess } from "Store/api/rest";
import { Nil } from "Utility/types";

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
          return decoded.get;
        }
      }
      return state;
    },
  },
});

export default slice.reducer;
