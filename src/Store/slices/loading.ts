import { createSlice } from "@reduxjs/toolkit";

import * as ApiLabels from "Store/api/rest/labels";
import { mapEntries } from "Utility";
import { apiStart, apiEnd, apiError } from "Store/api/actions";

/**
 * Stores loading status for each request =\> response API request type
 */
export type Loading = { [key in ApiLabels.RestLabel]: boolean };

// ? ====================
// ? Reducer exports
// ? ====================

const initialState: Loading = mapEntries(ApiLabels, (_, v) => [v, false]);
const slice = createSlice({
  name: "loading",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(apiStart, (state, action) => ({
        ...state,
        [action.payload.label]: true
      }))
      .addCase(apiEnd, finishLoading)
      .addCase(apiError, finishLoading)
});

export default slice.reducer;

const finishLoading = (
  state: Loading,
  action: ReturnType<typeof apiEnd | typeof apiError>
): Loading => ({
  ...state,
  [action.payload.label]: false
});
