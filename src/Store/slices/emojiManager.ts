import { createSlice } from "@reduxjs/toolkit";
import { emojis } from "Store/routes";
import { restSuccess } from "Store/api/rest";
import { Emoji } from "Utility/types";

export interface EmojiManager {
  [key: string]: Emoji[] | undefined;
}

// ? ====================
// ? Reducer exports
// ? ====================

const initialState: EmojiManager = {};
const slice = createSlice({
  name: "EmojiManager",
  initialState,
  reducers: {},
  extraReducers: {
    [restSuccess.type]: (state, action): EmojiManager => {
      if (emojis.match(action)) {
        const decoded = emojis.decode(action.payload);
        if (decoded.isDefined()) {
          state[action.payload.routeData] = decoded.get.emojis;
          return state;
        }
      }
      return state;
    },
  },
});

export default slice.reducer;
