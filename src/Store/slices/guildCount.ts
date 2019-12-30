import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GuildCountLoadResponse } from "Store/api/rest/types";

/**
 * Stores static guild count metadata about the bot
 */
export type GuildCount = { guildCount: number; userCount: number };

// ? ====================
// ? Reducer exports
// ? ====================

const initialState: GuildCount = { guildCount: 0, userCount: 0 };
const slice = createSlice({
  name: "guildCount",
  initialState,
  reducers: {
    loadGuildCount: (
      _,
      action: PayloadAction<GuildCountLoadResponse>
    ): GuildCount => action.payload
  }
});

export const { loadGuildCount } = slice.actions;
export default slice.reducer;
