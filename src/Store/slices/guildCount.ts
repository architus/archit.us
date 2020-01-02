import { createSlice } from "@reduxjs/toolkit";
import { guildCount } from "Store/routes";
import { restSuccess } from "Store/api/rest";

/**
 * Stores static guild count metadata about the bot
 */
export interface GuildCount {
  guildCount: number;
  userCount: number;
}

// ? ====================
// ? Reducer exports
// ? ====================

const initialState: GuildCount = { guildCount: 0, userCount: 0 };
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
    }
  }
});

export default slice.reducer;
