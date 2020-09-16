import { createAction, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { Either } from "fp-ts/lib/Either";
import * as t from "io-ts";
import { Errors } from "io-ts";

import { isDefined } from "@app/utility";
import { ErrorContents, Omitted } from "@app/utility/types";
import { option } from "@architus/lib/option";

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
  data: unknown;
}

export type GatewayErrorEvent = t.TypeOf<typeof GatewayErrorEvent>;
export const GatewayErrorEvent = t.interface({
  message: t.string,
  human: option(t.string),
  details: option(t.string),
  context: option(t.unknown),
  _id: option(t.number),
  code: t.number,
});

export interface GatewayError extends GatewayErrorEvent {
  timestamp: number;
}

export interface GatewaySend extends GatewayDispatch {
  timestamp: number;
}

export const gatewayInitialize = createAction<GatewayInitialize>(
  "gateway/initialize"
);
export const gatewayConnect = createAction("gateway/connect");
export const gatewayDisconnect = createAction("gateway/disconnect");
export const gatewayReconnect = createAction("gateway/reconnect");
export const gatewayEvent = createAction<GatewayEventAction>("gateway/event");
export const gatewayError = createAction<GatewayError>("gateway/error");
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
  type: "gatewayEvent";
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
    type: "gatewayEvent",
    event: config.event,
    decode: config.decode,
    match: (
      action: AnyAction
    ): action is PayloadAction<GatewayEventAction<TDecoded>> =>
      gatewayEvent.match(action) && action.payload.event === config.event,
    matchMalformed: (
      action: AnyAction
    ): action is PayloadAction<GatewayMalformed> =>
      gatewayMalformed.match(action) && action.payload.event === config.event,
  };
}

export function isGatewayEvent(test: unknown): test is GatewayEvent {
  return (
    typeof test === "object" &&
    isDefined(test) &&
    isDefined((test as GatewayEvent).type) &&
    (test as GatewayEvent).type === "gatewayEvent"
  );
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
}

export interface GatewayRouteConfig<TEvent extends string = string> {
  event: TEvent;
  elevated: boolean;
}

export function makeGatewayRoute<TPayload extends {} | Omitted = Omitted>(): <
  TEvent extends string = string
>(
  config: GatewayRouteConfig<TEvent>
) => GatewayRoute<TEvent, TPayload> {
  return <TEvent extends string = string>({
    event,
    elevated,
  }: GatewayRouteConfig<TEvent>): GatewayRoute<TEvent, TPayload> => {
    function dispatch(args: TPayload): PayloadAction<GatewayDispatch> {
      return gatewayDispatch({ data: args, event, elevated });
    }

    dispatch.event = event;
    return dispatch;
  };
}

let currentId = 1;
export const generateRequestId: () => number = () => {
  currentId += 2;
  return currentId;
};
