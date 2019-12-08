import { warn, HttpVerbs } from "Utility";
import { ApiError, Token } from "Utility/types";
import { Action, ActionBase, ActionFactory } from "Store/types";
import { RestLabel } from "Store/api/rest/labels";

// ? ====================
// ? Status Actions & Types
// ? ====================

export const REST_NAMESPACE = "rest";
export const REST_START = "rest:start";
export const REST_END = "rest:end";
export const REST_ERROR = "rest:error";

type RestStatusActionBase<T> = ActionBase<T, typeof REST_NAMESPACE>;
export type RestStatusAction =
  | RestStartAction
  | RestEndAction
  | RestErrorAction;

interface RestStartAction extends RestStatusActionBase<typeof REST_START> {
  readonly payload: {
    label: RestLabel;
  };
}

interface RestEndAction extends RestStatusActionBase<typeof REST_END> {
  readonly payload: {
    label: RestLabel;
  };
}

interface RestErrorAction extends RestStatusActionBase<typeof REST_ERROR> {
  readonly payload: {
    label: RestLabel;
  } & ApiError;
}

// ? ====================
// ? Status Factories
// ? ====================

export const apiStart: ActionFactory<RestStartAction, [RestLabel]> = label => {
  return {
    namespace: REST_NAMESPACE,
    type: REST_START,
    payload: {
      label
    }
  };
};

export const apiEnd: ActionFactory<RestEndAction, [RestLabel]> = label => {
  return {
    namespace: REST_NAMESPACE,
    type: REST_END,
    payload: {
      label
    }
  };
};

export const apiError: ActionFactory<RestErrorAction, [RestLabel, ApiError]> = (
  label,
  error
) => {
  warn(error);
  return {
    namespace: REST_NAMESPACE,
    type: REST_ERROR,
    payload: {
      label,
      ...error
    }
  };
};

// ? ====================
// ? Dispatch Actions & Types
// ? ====================

export const REST_DISPATCH = "rest:dispatch";

export interface RestDispatchAction<R>
  extends ActionBase<typeof REST_DISPATCH, typeof REST_NAMESPACE> {
  readonly payload: RestDispatch<R>;
}

interface RestDispatch<R> {
  route: string;
  label: RestLabel;
  method: HttpVerbs;
  data: Record<string, any>;
  headers: Record<string, string>;
  validate: (result: unknown) => result is R;
  onSuccess?: ((result: R) => Action | undefined);
  onFailure?: ((error: ApiError) => Action | undefined);
}

// ? ====================
// ? Dispatch Factories
// ? ====================

export function restDispatch<R>({
  route,
  label,
  method = HttpVerbs.GET,
  data = {},
  headers = {},
  validate,
  onSuccess,
  onFailure = (e: ApiError) => undefined
}: RestDispatch<R>): RestDispatchAction<R> {
  return {
    namespace: REST_NAMESPACE,
    type: REST_DISPATCH,
    payload: {
      route,
      label,
      method,
      data,
      headers,
      validate,
      onSuccess,
      onFailure
    }
  };
}

export function authRestDispatch<R>(
  token: Token,
  {
    route,
    label,
    method = HttpVerbs.GET,
    data = {},
    headers = {},
    validate,
    onSuccess,
    onFailure
  }: RestDispatch<R>
): RestDispatchAction<R> {

  return {} as RestDispatchAction<R>;
}
