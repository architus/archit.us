import { createAction, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { ErrorContents, Omitted } from "Utility/types";
import { Errors } from "io-ts";
import { Either } from "fp-ts/lib/Either";

// ? ==================
// ? Actions
// ? ==================

export interface GatewayInitialize {
  isElevated: boolean;
  url: string;
}

export interface GatewayEventAction<T = unknown> {
  event: string;
  data: T;
  timestamp: number;
}

export interface DecodeError extends ErrorContents {
  readonly original: unknown;
}

export interface GatewayMalformed {
  event: string;
  timestamp: number;
  error: DecodeError;
}

export interface GatewayDispatch {
  event: string;
  elevated: boolean;
  payload: unknown;
}

export interface GatewaySend extends GatewayDispatch {
  timestamp: number;
  elevated: boolean;
}

export const gatewayInitialize = createAction<GatewayInitialize>(
  "gateway/initialize"
);
export const gatewayConnect = createAction("gateway/connect");
export const gatewayDisconnect = createAction("gateway/disconnect");
export const gatewayReconnect = createAction("gateway/reconnect");
export const gatewayEvent = createAction<GatewayEventAction>("gateway/event");
export const gatewayMalformed = createAction<GatewayMalformed>(
  "gateway/malformed"
);
export const gatewaySend = createAction<GatewaySend>("gateway/send");
export const gatewayDispatch = createAction<GatewayDispatch>(
  "gateway/dispatch"
);

// ? ==================
// ? Gateway events
// ? ==================

export interface GatewayEvent<
  TEvent extends string = string,
  TDecoded = unknown,
  TResponse = object
> {
  event: TEvent;
  match: (
    action: AnyAction
  ) => action is PayloadAction<GatewayEventAction<TDecoded>>;
  matchMalformed: (
    action: AnyAction
  ) => action is PayloadAction<GatewayMalformed>;
  decode: (response: TResponse) => Either<Errors, TDecoded>;
}

export interface GatewayEventConfig<
  TEvent extends string = string,
  TDecoded = unknown,
  TResponse = object
> {
  event: TEvent;
  decode: (response: TResponse) => Either<Errors, TDecoded>;
}

export function makeGatewayEvent<
  TEvent extends string = string,
  TDecoded = unknown,
  TResponse = object
>(
  config: GatewayEventConfig<TEvent, TDecoded, TResponse>
): GatewayEvent<TEvent, TDecoded, TResponse> {
  return {
    event: config.event,
    decode: config.decode,
    match: (
      action: AnyAction
    ): action is PayloadAction<GatewayEventAction<TDecoded>> =>
      gatewayEvent.match(action) && action.payload.event === config.event,
    matchMalformed: (
      action: AnyAction
    ): action is PayloadAction<GatewayMalformed> =>
      gatewayMalformed.match(action) && action.payload.event === config.event
  };
}

// ? ==================
// ? Gateway routes
// ? ==================

export interface GatewayRoute<
  TEvent extends string = string,
  TPayload extends Record<string, unknown> | Omitted = Omitted
> {
  event: TEvent;
  (args: TPayload): PayloadAction<GatewayDispatch>;
  // TODO investigate callbacks/saga
}

export interface GatewayRouteConfig<TEvent extends string = string> {
  event: TEvent;
  elevated: boolean;
}

export function makeGatewayRoute<
  TPayload extends Record<string, unknown> | Omitted = Omitted
>(): <TEvent extends string = string>(
  config: GatewayRouteConfig<TEvent>
) => GatewayRoute<TEvent, TPayload> {
  return <TEvent extends string = string>({
    event,
    elevated
  }: GatewayRouteConfig<TEvent>) => {
    function dispatch(args: TPayload): PayloadAction<GatewayDispatch> {
      return gatewayDispatch({ payload: args, event });
    }

    dispatch.event = event;
    return dispatch;
  };
}
