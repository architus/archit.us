import { Either, isLeft } from "fp-ts/lib/Either";
import { HttpVerbs, API_BASE, isDefined, toJSON, log } from "Utility";
import { PayloadAction, createAction, AnyAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse, CancelToken } from "axios";
import { Option } from "Utility/option";
import { failure } from "io-ts/lib/PathReporter";
import { CANCEL } from "redux-saga";
import * as t from "io-ts";
import { ConditionalWrap, Omitted } from "Utility/types";

export type Errors = t.Errors;

/**
 * Constructs a hybrid route argument object, where keys only appear if they
 * resolve to a non-`Omitted` type
 */
type ConstructRouteArgs<TData, TRouteData, TRequestMetadata> = ConditionalWrap<
  "data",
  TData
> &
  ConditionalWrap<"routeData", TRouteData> &
  ConditionalWrap<"metadata", TRequestMetadata>;

/**
 * Constructs a route args object that includes each non-`Omitted` argument,
 * but defaults to `Omitted` if all arguments are set to `Omitted`
 */
export type RouteArgs<
  TData,
  TRouteData,
  TRequestMetadata
> = TData extends unknown
  ? {} extends ConstructRouteArgs<TData, TRouteData, TRequestMetadata>
    ? Omitted
    : ConstructRouteArgs<TData, TRouteData, TRequestMetadata>
  : never;

/**
 * Rest dispatch action payload
 */
export interface RestDispatch<
  TData = unknown,
  TRouteData = unknown,
  TRequestMetadata = unknown
> {
  route: string;
  label: string;
  method: HttpVerbs;
  headers: Record<string, string>;
  data: TData;
  routeData: TRouteData;
  metadata: TRequestMetadata;
}

/**
 * Rest success action payload
 */
export interface RestSuccess<
  TDecoded = unknown,
  TData = unknown,
  TRouteData = unknown,
  TRequestMetadata = unknown
> {
  route: string;
  label: string;
  method: HttpVerbs;
  headers: Record<string, string>;
  data: TData;
  routeData: TRouteData;
  metadata: TRequestMetadata;
  decoded: TDecoded;
}

/**
 * Rest success action payload
 */
export interface RestFailure<
  TData = unknown,
  TRouteData = unknown,
  TRequestMetadata = unknown
> {
  route: string;
  label: string;
  method: HttpVerbs;
  headers: Record<string, string>;
  data: TData;
  routeData: TRouteData;
  metadata: TRequestMetadata;
  error: ApiError | DecodeError;
}

const restDispatch = createAction<RestDispatch>("api/restDispatch");
const restSuccess = createAction<RestSuccess>("api/restSuccess");
const restFailure = createAction<RestFailure>("api/restFailure");

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
 * Rest API Route object, with two usable methods: `route.fetch(...)` for a
 * promise-based wrapper around the Axios library, and `route(...)` for a
 * redux/saga-based granular fetch flow via actions
 */
export interface Route<
  TLabel extends string,
  TData,
  TRouteData,
  TDecoded,
  TRequestMetadata
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
}

type ExtractedArgs<D, R, M> = { data: D; routeData: R; metadata: M };
function extractArgs<D, R, M>(
  args: RouteArgs<D, R, M>
): ExtractedArgs<D, R, M> {
  const base = ({
    data: undefined,
    routeData: undefined,
    metadata: undefined
  } as unknown) as ExtractedArgs<D, R, M>;
  if (typeof args === "undefined") return base;
  return { ...base, ...args };
}

function resolveData(
  obj: Record<string, unknown> | void
): Record<string, unknown> {
  if (typeof obj === "object") return obj;
  return {};
}

interface SagaCancellablePromise<T> extends Promise<T> {
  [key: string]: () => void;
}

export interface ApiResponse<D> {
  data: D;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  request: {
    url: string;
    headers: Record<string, string>;
  };
}

/**
 * Common error contents with message and optional more detailed object
 * object/string
 */
type ErrorContents = {
  readonly error?: object | string;
  readonly message?: string;
};

interface ApiErrorBase extends ErrorContents {
  readonly type: "api";
  request: {
    url: string;
    headers: Record<string, string>;
  };
}

export interface ServerError extends ApiErrorBase {
  readonly reason: "server";
  data: unknown;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

/**
 * Error that occurs when the request was made but no response was received
 */
export interface NetworkError extends ApiErrorBase {
  readonly reason: "network";
}

/**
 * Error that occurred during setting up a request
 */
export interface ClientError extends ApiErrorBase {
  readonly reason: "client";
}

/**
 * Resolved Axios error resulting from an API action
 */
export type ApiError = ServerError | NetworkError | ClientError;

/**
 * Error due to failed decoding
 */
export interface DecodeError extends ErrorContents {
  readonly type: "decode";
  readonly original: unknown;
}

/**
 * Consumes an axios error object, transforming it into an ApiError object
 * depending on why it occurred
 * @param error - The incoming axios error
 */
export function consumeAxiosError(axiosError: AxiosError): ApiError {
  let logMessage: string;
  let error: ApiError;
  const request = {
    url: axiosError.config.url || "",
    headers: (axiosError.config.headers as Record<string, string>) || {}
  };

  if (isDefined(axiosError.response)) {
    // Server error
    const { data, status, statusText, headers } = axiosError.response;
    const asText = Option.from(data)
      .flatMap<string>(o => toJSON(o))
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
      message: `An API error ocurred (status code ${status} - ${statusText}): ${asText}`
    };
  } else if (isDefined(axiosError.request)) {
    // Network error
    const { request: requestObj } = axiosError;
    const asText = Option.from(requestObj)
      .flatMap<string>(o => toJSON(o))
      .getOrElse(axiosError.toString());

    logMessage = `Network Error: ${asText}`;
    error = {
      type: "api",
      reason: "network",
      message: "Could not make request. Check network connectivity",
      request
    };
  } else {
    // Client error
    logMessage = `Client Error: ${axiosError.message}`;
    error = {
      type: "api",
      reason: "client",
      message: axiosError.message,
      request
    };
  }

  log(logMessage);
  return error;
}

export function apiFetch<TResponse>({
  route,
  method,
  data,
  headers
}: ApiRequest): SagaCancellablePromise<ApiResponse<TResponse>> {
  type Response = ApiResponse<TResponse>;
  async function fetchInner(cancelToken: CancelToken): Promise<Response> {
    const dataOrParams = [HttpVerbs.GET, HttpVerbs.DELETE].includes(method)
      ? "params"
      : "data";

    try {
      const result: AxiosResponse<TResponse> = await axios.request<TResponse>({
        url: `${API_BASE}${route}`,
        method,
        headers,
        [dataOrParams]: data,
        cancelToken
      });
      return {
        data: result.data,
        status: result.status,
        statusText: result.statusText,
        headers: result.headers as Record<string, string>,
        request: {
          url: result.config.url || "",
          headers: (result.config.headers as Record<string, string>) || {}
        }
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

export interface ApiRequest {
  route: string;
  method: HttpVerbs;
  data: Record<string, unknown>;
  headers: Record<string, string>;
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
) => Route<TLabel, TData, TRouteData, TDecoded, TRequestMetadata> {
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
    decode,
    headers
  }: RouteConfig<
    TLabel,
    TRouteData,
    TResponse,
    TDecoded,
    TRequestMetadata
  >): Route<TLabel, TData, TRouteData, TDecoded, TRequestMetadata> => {
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
        headers: { ...headers }
      };

      async function fetchInner(
        request: Promise<ApiResponse<TResponse>>
      ): Promise<Response> {
        const result = await request;
        let response: Response;

        if (isDefined(decode)) {
          let decodeResult: Either<Errors, TDecoded>;
          try {
            decodeResult = decode(result.data);
          } catch (e) {
            const error: DecodeError = {
              type: "decode",
              original: result.data,
              message: `An error ocurred while decoding: ${e.toString()}`,
              error: e
            };
            throw error;
          }

          if (isLeft(decodeResult)) {
            const errors = decodeResult.left;
            const message: string[] = failure(errors);
            const error: DecodeError = {
              type: "decode",
              original: result.data,
              message: `Errors ocurred while parsing server response: ${message.toString}`,
              error: errors
            };
            throw error;
          }

          response = {
            ...result,
            data: decodeResult.right
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
        headers: { ...headers }
      });
    }

    function match(
      action: AnyAction
    ): action is PayloadAction<
      RestSuccess<TDecoded, TData, TRouteData, TRequestMetadata>
    > {
      return restSuccess.match(action) && action.payload.label === label;
    }

    function matchError(
      action: AnyAction
    ): action is PayloadAction<
      RestFailure<TData, TRouteData, TRequestMetadata>
    > {
      return restFailure.match(action) && action.payload.label === label;
    }

    dispatch.label = label;
    dispatch.fetch = fetch;
    dispatch.route = route;
    dispatch.match = match;
    dispatch.matchError = matchError;
    return dispatch;
  };
}
