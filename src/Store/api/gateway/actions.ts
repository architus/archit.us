import { createAction } from "@reduxjs/toolkit";

interface GatewayInitialize {
  wasElevated: boolean;
  url: string;
}

export const gatewayInitialize = createAction<GatewayInitialize>(
  "gateway/initialize"
);

export const gatewayConnect = createAction("gateway/connect");
export const gatewayDisconnect = createAction("gateway/disconnect");
export const gatewayReconnect = createAction("gateway/reconnect");
