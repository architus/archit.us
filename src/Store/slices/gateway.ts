import { createSlice } from "@reduxjs/toolkit";
import {
  gatewayConnect,
  gatewayDisconnect,
  gatewayReconnect,
  gatewayInitialize
} from "Store/api/gateway/actions";

/**
 * Current state of the gateway (whether it is connected or not)
 */
export interface GatewayStatus {
  isConnected: boolean;
  isInitialized: boolean;
}

// ? ====================
// ? Reducer exports
// ? ====================

const initialState: GatewayStatus = {
  isConnected: false,
  isInitialized: false
};
const slice = createSlice({
  name: "gateway",
  initialState,
  reducers: {},
  extraReducers: {
    [gatewayInitialize.type]: (state): GatewayStatus => ({
      ...state,
      isInitialized: true
    }),
    [gatewayConnect.type]: (state): GatewayStatus => ({
      ...state,
      isConnected: true
    }),
    [gatewayReconnect.type]: (state): GatewayStatus => ({
      ...state,
      isConnected: true
    }),
    [gatewayDisconnect.type]: (state): GatewayStatus => ({
      ...state,
      isConnected: false
    })
  }
});

export default slice.reducer;
