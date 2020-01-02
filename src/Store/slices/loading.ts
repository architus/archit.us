import { createSlice } from "@reduxjs/toolkit";
import { restStart, restSuccess, restFailure, Route } from "Store/api/rest";
import { Store } from "Store";

/**
 * Stores loading status for each request =\> response API request type
 */
export type Loading = { [key: string]: boolean };

// ? ====================
// ? Reducer exports
// ? ====================

const finishLoading = (
  state: Loading,
  action: ReturnType<typeof restSuccess | typeof restFailure>
): Loading => ({
  ...state,
  [action.payload.label]: false
});

const initialState: Loading = {};
const slice = createSlice({
  name: "loading",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(restStart, (state, action) => ({
        ...state,
        [action.payload.label]: true
      }))
      .addCase(restSuccess, finishLoading)
      .addCase(restFailure, finishLoading)
});

export default slice.reducer;

export function isLoading(store: Store, route: string | Route): boolean {
  let label: string;
  if (typeof route === "string") label = route;
  else label = route.label;
  return !!store.loading[label];
}
