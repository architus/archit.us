import { PayloadAction, createAction, AnyAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse, CancelToken } from "axios";
import { Either, isLeft } from "fp-ts/lib/Either";
import { Errors } from "io-ts";
import { failure } from "io-ts/lib/PathReporter";
import { CANCEL } from "redux-saga";

import {
  ApiError,
  DecodeError,
  RouteArgs,
  ApiResponse,
  SagaCancellablePromise,
  RestDispatch,
  RestSuccess,
  RestFailure,
  RestStart,
  ApiRequest,
} from "@app/store/api/rest/types";
import {
  HttpVerbs,
  API_BASE,
  isDefined,
  toJSON,
  log,
  warn,
} from "@app/utility";
import { Omitted, OrEmpty } from "@app/utility/types";
import { Option, Some, None } from "@architus/lib/option";

export const restDispatch = createAction<RestDispatch>("api/restDispatch");
export const restStart = createAction<RestStart>("api/restStart");
export const restSuccess = createAction<RestSuccess>("api/restSuccess");
export const restFailure = createAction<RestFailure>("api/restFailure");

/**
 * Rest API Route object, with two usable methods: `route.fetch(...)` for a
 * promise-based wrapper around the Axios library, and `route(...)` for a
 * redux/saga-based granular fetch flow via actions
 */
export interface Route<
  TLabel extends string = string,
  TDecoded = unknown,
  TData extends Record<string, unknown> | Omitted = Omitted,
  TResponse = object,
  TRouteData = Omitted,
  TRequestMetadata = Omitted
> {
  label: TLabel;
  // Direct callable action creator
  (args: RouteArgs<TData, TRouteData, TRequestMetadata>): PayloadAction<
    RestDispatch
  >;
  /**
   * Promise-based API
   * @param args - Route arguments (data, route data, and request metadata)
   */
  fetch: (
    args: RouteArgs<TData, TRouteData, TRequestMetadata>
  ) => Promise<ApiResponse<TDecoded>>;
  /**
   * Resolves the correct final relative route string
   */
  route: (routeData: TRouteData) => string;
  matchDispatch: (
    action: AnyAction
  ) => action is PayloadAction<
    RestDispatch<OrEmpty<TData>, TRouteData, TRequestMetadata>
  >;
  match: (
    action: AnyAction
  ) => action is PayloadAction<
    RestSuccess<TResponse, OrEmpty<TData>, TRouteData, TRequestMetadata>
  >;
  matchError: (
    action: AnyAction
  ) => action is PayloadAction<
    RestFailure<OrEmpty<TData>, TRouteData, TRequestMetadata>
  >;
  decode: (
    action: RestSuccess<TResponse, OrEmpty<TData>, TRouteData, TRequestMetadata>
  ) => Option<TDecoded>;
}

function resolveData(
  obj: Record<string, unknown> | void
): Record<string, unknown> {
  if (typeof obj === "object") return obj;
  return {};
}

export interface RouteConfig<
  TLabel extends string,
  TRouteData,
  TResponse,
  TDecoded,
  TRequestMetadata
> {
  route: ((args: TRouteData) => string) | string;
  label: TLabel;
  method: HttpVerbs;
  decode?: (resp: TResponse) => Either<Errors, TDecoded>;
  headers?: Record<string, string>;
  auth?: boolean;
  onSuccess?: (
    result: TDecoded,
    metadata: TRequestMetadata
  ) => AnyAction | [AnyAction] | void;
  onFailure?: (
    error: ApiError | DecodeError,
    metadata: TRequestMetadata
  ) => AnyAction | [AnyAction] | void;
}

/**
 * Consumes an axios error object, transforming it into an ApiError object
 * depending on why it occurred
 * @param error - The incoming axios error
 */
export function consumeAxiosError(axiosError: AxiosError): ApiError {
  let logMessage: string;
  let error: ApiError;
  const method = (axiosError.config.method || "GET").toUpperCase() as HttpVerbs;
  const request = {
    url: axiosError.config.url || "",
    method,
    data: axiosError.config[dataOrParams(method)] as Record<string, unknown>,
    headers: (axiosError.config.headers as Record<string, string>) || {},
  };

  if (isDefined(axiosError.response)) {
    // Server error
    const { data, status, statusText, headers } = axiosError.response;
    const asText = Option.from(data)
      .flatMap<string>((o) => toJSON(o))
      .getOrElse(axiosError.toString());

    logMessage = `${status} Error: ${asText}\n${axiosError.message}`;
    error = {
      type: "api",
      reason: "server",
      data,
      status,
      statusText,
      headers,
      request,
      message: `An API error ocurred (status code ${status} - ${statusText}): ${asText}`,
    };
  } else if (isDefined(axiosError.request)) {
    // Network error
    const { request: requestObj } = axiosError;
    const asText = Option.from(requestObj)
      .flatMap<string>((o) => toJSON(o))
      .getOrElse(axiosError.toString());

    logMessage = `Network Error: ${asText}`;
    error = {
      type: "api",
      reason: "network",
      message: "Could not make request. Check network connectivity",
      request,
    };
  } else {
    // Client error
    logMessage = `Client Error: ${axiosError.message}`;
    error = {
      type: "api",
      reason: "client",
      message: axiosError.message,
      request,
    };
  }

  log(logMessage);
  return error;
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    isDefined(error) &&
    "type" in error &&
    (error as ApiError).type === "api"
  );
}

export function isDecodeError(error: unknown): error is DecodeError {
  return (
    typeof error === "object" &&
    isDefined(error) &&
    "type" in error &&
    (error as DecodeError).type === "decode"
  );
}

export function dataOrParams(method: HttpVerbs): "params" | "data" {
  return [HttpVerbs.GET, HttpVerbs.DELETE].includes(method) ? "params" : "data";
}

export function apiFetch<TResponse>({
  route,
  method,
  data,
  headers,
  auth,
}: ApiRequest): SagaCancellablePromise<ApiResponse<TResponse>> {
  type Response = ApiResponse<TResponse>;
  async function fetchInner(cancelToken: CancelToken): Promise<Response> {
    try {
      const result: AxiosResponse<TResponse> = await axios.request<TResponse>({
        url: `${API_BASE}${route}`,
        method,
        headers,
        [dataOrParams(method)]: data,
        cancelToken,
        withCredentials: auth,
      });
      return {
        data: result.data,
        status: result.status,
        statusText: result.statusText,
        headers: result.headers as Record<string, string>,
        request: {
          url: result.config.url || "",
          headers: (result.config.headers as Record<string, string>) || {},
        },
      };
    } catch (e) {
      const error: AxiosError = e;
      throw consumeAxiosError(error);
    }
  }

  // Attach cancel token for saga cancellation
  const source = axios.CancelToken.source();
  const promise = fetchInner(source.token) as SagaCancellablePromise<Response>;
  promise[CANCEL] = (): void => source.cancel();
  return promise;
}

/**
 * Constructs a new route object.
 * Must be called as a curried function
 * @example
 * makeRoute()(config)
 */
export function makeRoute<
  TData extends Record<string, unknown> | Omitted = Omitted
>(): <
  TLabel extends string,
  TRouteData = Omitted,
  TResponse = object,
  TDecoded = TResponse,
  TRequestMetadata = Omitted
>(
  config: RouteConfig<TLabel, TRouteData, TResponse, TDecoded, TRequestMetadata>
) => Route<TLabel, TDecoded, TData, TResponse, TRouteData, TRequestMetadata> {
  return <
    TLabel extends string,
    TRouteData = Omitted,
    TResponse = object,
    TDecoded = Response,
    TRequestMetadata = Omitted
  >({
    route: rawRoute,
    label,
    method,
    decode: decodeFunc,
    headers,
    auth,
  }: RouteConfig<
    TLabel,
    TRouteData,
    TResponse,
    TDecoded,
    TRequestMetadata
  >): Route<
    TLabel,
    TDecoded,
    TData,
    TResponse,
    TRouteData,
    TRequestMetadata
  > => {
    type Response = ApiResponse<TDecoded>;
    function fetch(
      args: RouteArgs<TData, TRouteData, TRequestMetadata>
    ): SagaCancellablePromise<Response> {
      const { data: rawData, routeData } = extractArgs(args);
      const data = resolveData(rawData);
      const config: ApiRequest = {
        route: route(routeData),
        data,
        method,
        headers: { ...headers },
        auth: !!auth,
      };

      async function fetchInner(
        request: Promise<ApiResponse<TResponse>>
      ): Promise<Response> {
        const result = await request;
        let response: Response;

        if (isDefined(decodeFunc)) {
          let decodeResult: Either<Errors, TDecoded>;
          try {
            decodeResult = decodeFunc(result.data);
          } catch (e) {
            const error: DecodeError = {
              type: "decode",
              original: result.data,
              message: `An error ocurred while decoding: ${e.toString()}`,
              error: e,
            };
            throw error;
          }

          if (isLeft(decodeResult)) {
            const errors = decodeResult.left;
            const message: string[] = failure(errors);
            const error: DecodeError = {
              type: "decode",
              original: result.data,
              message: `Errors ocurred while parsing server response:`,
              error: message.toString(),
            };
            throw error;
          }

          response = {
            ...result,
            data: decodeResult.right,
          };
        } else {
          // Unsafe: decode function omitted
          response = (result as unknown) as Response;
        }

        return response;
      }

      const originalPromise = apiFetch<TResponse>(config);
      const cancel = originalPromise[CANCEL];
      const promise = fetchInner(originalPromise) as SagaCancellablePromise<
        Response
      >;
      promise[CANCEL] = cancel;
      return promise;
    }

    function route(routeData: TRouteData): string {
      if (typeof rawRoute === "string") return rawRoute;
      return rawRoute(routeData);
    }

    function dispatch(
      args: RouteArgs<TData, TRouteData, TRequestMetadata>
    ): PayloadAction<RestDispatch> {
      const { data: rawData, routeData, metadata } = extractArgs(args);
      const data = resolveData(rawData);
      return restDispatch({
        label,
        route: route(routeData),
        routeData,
        data,
        metadata,
        method,
        auth: !!auth,
        headers: { ...headers },
      });
    }

    function match(
      action: AnyAction
    ): action is PayloadAction<
      RestSuccess<TResponse, OrEmpty<TData>, TRouteData, TRequestMetadata>
    > {
      return restSuccess.match(action) && action.payload.label === label;
    }

    function decode(
      action: RestSuccess<
        TResponse,
        OrEmpty<TData>,
        TRouteData,
        TRequestMetadata
      >
    ): Option<TDecoded> {
      if (isDefined(decodeFunc)) {
        const decodeResult: Either<Errors, TDecoded> = decodeFunc(
          action.response
        );

        if (isLeft(decodeResult)) {
          const errors = decodeResult.left;
          const message: string[] = failure(errors);
          warn(
            `Errors ocurred while parsing server response: ${message.toString}`,
            errors
          );
          return None;
        }

        return Some(decodeResult.right);
      }

      // Unsafe: decode function omitted
      return (Some(action.response) as unknown) as Option<TDecoded>;
    }

    function matchError(
      action: AnyAction
    ): action is PayloadAction<
      RestFailure<OrEmpty<TData>, TRouteData, TRequestMetadata>
    > {
      return restFailure.match(action) && action.payload.label === label;
    }

    function matchDispatch(
      action: AnyAction
    ): action is PayloadAction<
      RestDispatch<OrEmpty<TData>, TRouteData, TRequestMetadata>
    > {
      return restDispatch.match(action) && action.payload.label === label;
    }

    dispatch.label = label;
    dispatch.fetch = fetch;
    dispatch.route = route;
    dispatch.match = match;
    dispatch.decode = decode;
    dispatch.matchError = matchError;
    dispatch.matchDispatch = matchDispatch;
    return dispatch;
  };
}

type ExtractedArgs<D, R, M> = { data: D; routeData: R; metadata: M };
function extractArgs<D, R, M>(
  args: RouteArgs<D, R, M>
): ExtractedArgs<D, R, M> {
  const base = ({
    data: undefined,
    routeData: undefined,
    metadata: undefined,
  } as unknown) as ExtractedArgs<D, R, M>;
  if (typeof args === "undefined") return base;
  return { ...base, ...args };
}
