import { HttpVerbs, warn } from "Utility";
import { ApiError } from "Utility/types";
import { Action, ActionBase, ActionFactory } from "Store/types";
import { Option } from "Utility/option";
import { RestLabel } from "Store/api/rest/labels";
import {
  API_START,
  API_END,
  API_ERROR,
  API_NAMESPACE,
  ApiStartAction,
  ApiEndAction,
  ApiErrorAction
} from "Store/api/actions";

// ? ====================
// ? Dispatch Actions & Types
// ? ====================

export const API_REST_DISPATCH = "api:rest-dispatch";

export interface RestDispatchAction<R>
  extends ActionBase<typeof API_REST_DISPATCH, typeof API_NAMESPACE> {
  readonly payload: RestDispatch<R>;
}

interface RestDispatch<R> {
  route: string;
  label: RestLabel;
  method: HttpVerbs;
  data: Record<string, any>;
  headers: Record<string, string>;
  decode?: (result: unknown) => Option<R>;
  onSuccess?: (result: R) => Action | undefined;
  onFailure?: (error: ApiError) => Action | undefined;
}

// ? ====================
// ? Dispatch Factories
// ? ====================

type optionalRestDispatchParams = "data" | "headers" | "method";
export function restDispatch<R>({
  route,
  label,
  method = HttpVerbs.GET,
  data = {},
  headers = {},
  decode,
  onSuccess,
  onFailure = () => undefined
}: Omit<RestDispatch<R>, optionalRestDispatchParams> &
  Partial<
    Pick<RestDispatch<R>, optionalRestDispatchParams>
  >): RestDispatchAction<R> {
  return {
    namespace: API_NAMESPACE,
    type: API_REST_DISPATCH,
    payload: {
      route,
      label,
      method,
      data,
      headers,
      decode,
      onSuccess,
      onFailure
    }
  };
}

// ? ====================
// ? Rest Action Factories
// ? ====================

export const restStart: ActionFactory<ApiStartAction, [RestLabel]> = label => {
  return {
    namespace: API_NAMESPACE,
    type: API_START,
    payload: {
      mode: "rest",
      label
    }
  };
};

export const restEnd: ActionFactory<ApiEndAction, [RestLabel]> = label => {
  return {
    namespace: API_NAMESPACE,
    type: API_END,
    payload: {
      mode: "rest",
      label
    }
  };
};

export const restError: ActionFactory<ApiErrorAction, [RestLabel, ApiError]> = (
  label,
  error
) => {
  warn(error);
  return {
    namespace: API_NAMESPACE,
    type: API_ERROR,
    payload: {
      mode: "rest",
      label,
      ...error
    }
  };
};
