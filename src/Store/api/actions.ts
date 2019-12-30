import { createAction } from "@reduxjs/toolkit";
import { RestLabel } from "Store/api/rest/labels";
import { GatewayLabel } from "Store/api/gateway/labels";

// ? ====================
// ? Status Actions & Types
// ? ====================

export interface ApiError {
  readonly message: string;
  readonly error?: object | string;
}

export interface RestMeta {
  mode: "rest";
  label: RestLabel;
}

export interface GatewayMeta {
  mode: "gateway";
  label: GatewayLabel;
}

export type ApiMeta = RestMeta | GatewayMeta;

// ? ====================
// ? Status Factories
// ? ====================

export const apiStart = createAction<ApiMeta>("api/start");
export const apiEnd = createAction<ApiMeta>("api/end");
export const apiError = createAction<ApiMeta & ApiError>("api/error");
