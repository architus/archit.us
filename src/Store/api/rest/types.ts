import { ConditionalWrap, Omitted } from "Utility/types";
import { HttpVerbs } from "Utility";
import * as t from "io-ts";

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

export interface SagaCancellablePromise<T> extends Promise<T> {
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
  readonly message: string;
};

interface ApiErrorBase extends ErrorContents {
  readonly type: "api";
  request: {
    url: string;
    method: HttpVerbs;
    data: Record<string, unknown>;
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
 * Rest dispatch action payload
 */
export interface RestDispatch<
  TData extends Record<string, unknown> = Record<string, unknown>,
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
 * Rest start action payload
 */
export interface RestStart<
  TData extends Record<string, unknown> = Record<string, unknown>,
  TRouteData = unknown,
  TRequestMetadata = unknown
> extends RestDispatch<TData, TRouteData, TRequestMetadata> {
  timing: {
    start: number;
  };
}

/**
 * Rest success action payload
 */
export interface RestSuccess<
  TResponse = unknown,
  TData extends Record<string, unknown> = Record<string, unknown>,
  TRouteData = unknown,
  TRequestMetadata = unknown
> extends RestDispatch<TData, TRouteData, TRequestMetadata> {
  response: TResponse;
  timing: {
    duration: number;
    start: number;
    end: number;
  };
}

/**
 * Rest success action payload
 */
export interface RestFailure<
  TData extends Record<string, unknown> = Record<string, unknown>,
  TRouteData = unknown,
  TRequestMetadata = unknown
> extends RestDispatch<TData, TRouteData, TRequestMetadata> {
  error: ApiError;
  timing: {
    duration: number;
    start: number;
    end: number;
  };
}

export interface ApiRequest {
  route: string;
  method: HttpVerbs;
  data: Record<string, unknown>;
  headers: Record<string, string>;
}
