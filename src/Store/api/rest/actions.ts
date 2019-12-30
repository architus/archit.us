import { AnyAction } from "redux";
import { HttpVerbs } from "Utility";
import { Option } from "Utility/option";
import { MakeOptional } from "Utility/types";
import { RestLabel } from "Store/api/rest/labels";
import { ApiError, apiStart, apiEnd, apiError } from "Store/api/actions";
import { ApiRequest } from "Store/api/rest/types";
import { createAction } from "@reduxjs/toolkit";

// ? ====================
// ? Dispatch Actions & Types
// ? ====================

export interface RestDispatch<R> extends ApiRequest {
  label: RestLabel;
  decode?: (result: unknown) => Option<R>;
  onSuccess?: (result: R) => AnyAction | undefined;
  onFailure?: (error: ApiError) => AnyAction | undefined;
}

// ? ====================
// ? Dispatch Factories
// ? ====================

/**
 * Type unsafe rest dispatch action creater. **Do not use to create new
 * actions** (only use to match/get type for restDispatch action)
 */
export const restDispatchUnsafe = createAction<RestDispatch<unknown>>(
  "api/restDispatch"
);

/**
 * Type safe rest dispatch action creater
 * @param options - Rest Dispatch options object
 */
export function restDispatch<R>({
  route,
  label,
  method = HttpVerbs.GET,
  data = {},
  headers = {},
  decode,
  onSuccess,
  onFailure
}: MakeOptional<RestDispatch<R>, "data" | "headers" | "method">): ReturnType<
  typeof restDispatchUnsafe
> {
  return restDispatchUnsafe({
    route,
    label,
    method,
    data,
    headers,
    decode,
    onSuccess,
    onFailure
  } as RestDispatch<unknown>);
}

// ? ====================
// ? Rest Action Factories
// ? ====================

export const restStart = (label: RestLabel): ReturnType<typeof apiStart> =>
  apiStart({ label, mode: "rest" });

export const restEnd = (label: RestLabel): ReturnType<typeof apiEnd> =>
  apiEnd({ label, mode: "rest" });

export const restError = (
  label: RestLabel,
  error: ApiError
): ReturnType<typeof apiError> => apiError({ label, ...error, mode: "rest" });
