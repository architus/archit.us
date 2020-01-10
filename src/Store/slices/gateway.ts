import { createSlice } from "@reduxjs/toolkit";
import {
  gatewayConnect,
  gatewayDisconnect,
  gatewayReconnect,
  gatewayInitialize
} from "Store/api/gateway";

/**
 * Current state of the gateway (whether it is connected or not)
 */
export type GatewayStatus =
  | NoConnection
  | Initializing
  | Established
  | Disconnected;

export interface NoConnection {
  readonly state: "noConnection";
}

export interface Initializing {
  readonly state: "initializing";
  readonly isElevated: boolean;
}

export interface Established {
  readonly state: "established";
  readonly isElevated: boolean;
}

export interface Disconnected {
  readonly state: "disconnected";
  readonly isElevated: boolean;
}

// ? ====================
// ? Reducer exports
// ? ====================

const initialState: GatewayStatus = { state: "noConnection" };
const slice = createSlice({
  name: "gateway",
  initialState: initialState as GatewayStatus,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(gatewayInitialize, (_, action) => ({
        state: "initializing",
        isElevated: action.payload.isElevated
      }))
      .addCase(gatewayConnect, state => {
        if (state.state === "initializing") {
          return { state: "established", isElevated: state.isElevated };
        }
        return { state: "noConnection" };
      })
      .addCase(gatewayDisconnect, state => {
        if (state.state === "established") {
          return { state: "disconnected", isElevated: state.isElevated };
        }
        return { state: "noConnection" };
      })
      .addCase(gatewayReconnect, state => {
        if (state.state === "disconnected") {
          return { state: "established", isElevated: state.isElevated };
        }
        return { state: "noConnection" };
      })
});

export default slice.reducer;
