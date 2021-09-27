import { createSlice } from "@reduxjs/toolkit";

import { restSuccess } from "@app/store/api/rest";
import { cacheCustomEmoji, loadCustomEmoji } from "@app/store/routes";
import { Nil } from "@architus/lib/types";
import { isDefined } from "@architus/lib/utility";
import { HoarFrost } from "src/utility/types";



// ? ====================
// ? Reducer exports
// ? ====================

const initialState: any = { };
const slice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: {
    [restSuccess.type]: (state, action) => {
      if (loadCustomEmoji.match(action)) {
        const { guildId, emojiId } = action.payload.routeData;
        const decoded = loadCustomEmoji.decode(action.payload);
        if (decoded.isDefined()) {
          if (isDefined(state.pools.specific[guildId as string].customEmoji[emojiId as string])) {
            state.pools.specific[guildId as string].customEmoji[emojiId] = decoded.get;
          } else {
            return { };
          }
        }
      }
      return state;
    },
  },
});

//export default slice.reducer;
