import { createSlice } from "@reduxjs/toolkit";

// TODO implement
interface InterpretResponse {}

/**
 * Stores incoming responses from the Gateway interpret API
 */
export interface Interpret {
  responseQueue: InterpretResponse[];
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
  // TODO implement as direct reducer or extraReducers
  reducers: {}
});

export default slice.reducer;
