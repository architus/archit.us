import { createSlice } from "@reduxjs/toolkit";

/**
 * Current state of the gateway (whether it is connected or not)
 */
export interface GatewayStatus {
  isConnected: boolean;
}

// ? ====================
// ? Reducer exports
// ? ====================

const initialState: GatewayStatus = { isConnected: false };
const slice = createSlice({
  name: "gateway",
  initialState,
  reducers: {
    connect: (): GatewayStatus => ({ isConnected: true }),
    disconnect: (): GatewayStatus => ({ isConnected: false })
  }
});

export const { connect, disconnect } = slice.actions;
export default slice.reducer;
