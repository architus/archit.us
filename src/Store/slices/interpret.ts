import { createSlice } from "@reduxjs/toolkit";
import { MockBotEvent, mockBotEvent } from "Store/gatewayRoutes";
import { gatewayEvent } from "Store/api/gateway";

/**
 * Stores incoming responses from the Gateway interpret API
 */
export interface Interpret {
  responseQueue: MockBotEvent[];
}

export const SLICING_THRESHOLD = 100;
export const SLICED_LENGTH = 5;

// ? ====================
// ? Reducer exports
// ? ====================

const initialState: Interpret = { responseQueue: [] };
const slice = createSlice({
  name: "interpret",
  initialState,
  reducers: {},
  extraReducers: {
    [gatewayEvent.type]: (state, action): Interpret => {
      if (mockBotEvent.match(action)) {
        const { responseQueue } = state;
        state.responseQueue =
          // If the array has grown to 100, slice off all but the last 5 elements
          [
            ...(responseQueue.length >= SLICING_THRESHOLD
              ? responseQueue.slice(-SLICED_LENGTH)
              : responseQueue),
            action.payload
          ];
      }
      return state;
    }
  }
});

export default slice.reducer;
