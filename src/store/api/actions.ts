import { warn } from "Utility";
import { ApiError } from "Utility/types";
import { ActionBase, ActionFactory } from "Store/types";
import { RestLabel } from "Store/api/rest/labels";
import { GatewayLabel } from "Store/api/gateway/labels";
import { RestDispatchAction } from "./rest/actions";

// ? ====================
// ? Status Actions & Types
// ? ====================

export const API_NAMESPACE = "api";
export const API_START = "api:start";
export const API_END = "api:end";
export const API_ERROR = "api:error";

type ApiStatusActionBase<T> = ActionBase<T, typeof API_NAMESPACE>;
export type ApiStatusAction = ApiStartAction | ApiEndAction | ApiErrorAction;

export interface ApiStartAction extends ApiStatusActionBase<typeof API_START> {
  readonly payload: ApiMeta;
}

export interface ApiEndAction extends ApiStatusActionBase<typeof API_END> {
  readonly payload: ApiMeta;
}

export interface ApiErrorAction extends ApiStatusActionBase<typeof API_ERROR> {
  readonly payload: ApiMeta & ApiError;
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
export type ApiAction = ApiStatusAction | RestDispatchAction<any>;

// ? ====================
// ? Status Factories
// ? ====================

export const apiStart: ActionFactory<ApiStartAction, [ApiMeta]> = meta => {
  return {
    namespace: API_NAMESPACE,
    type: API_START,
    payload: meta
  };
};

export const apiEnd: ActionFactory<ApiEndAction, [ApiMeta]> = meta => {
  return {
    namespace: API_NAMESPACE,
    type: API_END,
    payload: meta
  };
};

export const apiError: ActionFactory<ApiErrorAction, [ApiMeta, ApiError]> = (
  meta,
  error
) => {
  warn(error);
  return {
    namespace: API_NAMESPACE,
    type: API_ERROR,
    payload: {
      ...meta,
      ...error
    }
  };
};
