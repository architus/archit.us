import { SagaIterator, EventChannel, eventChannel } from "@redux-saga/core";
import { take, race, call, put, fork } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { isRight, Either, either, isLeft } from "fp-ts/lib/Either";
import * as t from "io-ts";
import { Errors } from "io-ts";
import { failure } from "io-ts/lib/PathReporter";
import { AnyAction } from "redux";

import { GATEWAY_API_BASE } from "@app/api";
import { signOut, loadSession } from "@app/store/actions";
import {
  gatewayInitialize,
  gatewayConnect,
  gatewayDisconnect,
  gatewayReconnect,
  gatewayEvent,
  gatewayMalformed,
  gatewayDispatch,
  GatewayDispatch,
  gatewaySend,
  isGatewayEvent,
  GatewayErrorEvent,
  gatewayError,
  GatewayUnknownEvent,
} from "@app/store/api/gateway";
import * as events from "@app/store/routes/events";
import { select } from "@app/store/saga/utility";
import { isDefined, warn } from "@app/utility";
import {
  ExponentialBackoff,
  Websocket,
  WebsocketBuilder,
  WebsocketEvents,
} from "websocket-ts";

type LoadSessionAction = ReturnType<typeof loadSession>;
type Socket = Websocket;

/**
 * Handles the main gateway connection, usage, and termination state throughout the entire
 * application lifecycle as a forked saga
 */
export default function* gatewayFlow(): SagaIterator {
  // Initialize socket.io connection
  const { socket, wasElevated } = yield call(initializeConnection);
  yield put(
    gatewayInitialize({ isElevated: wasElevated, url: GATEWAY_API_BASE })
  );

  // Attach all listeners
  const gatewayEventChannel = yield call(createGatewayEventChannel, socket);
  yield fork(gatewayEventHandler, gatewayEventChannel);

  // Dispatch sends
  yield fork(dispatchHandler, socket);

  // Fork sign out handler
  if (wasElevated) {
    yield fork(demoteOnSignout, socket);
  }
}

/**
 * Puts all incoming actions created from the gateway event channel
 * @param channel - Gateway event channel
 */
function* gatewayEventHandler(channel: EventChannel<AnyAction>): SagaIterator {
  while (true) {
    const action = (yield take(channel)) as AnyAction;
    yield put(action);
  }
}

/**
 * Demotes the socket upon signout
 * @param socket - Socket instance
 */
function* demoteOnSignout(socket: Socket): SagaIterator {
  yield take(signOut.type);

  // TODO implement
}

/**
 * Dispatches each incoming dispatch request
 * @param socket - Socket instance
 */
function* dispatchHandler(socket: Socket): SagaIterator {
  while (true) {
    const {
      payload: { event, data, elevated },
    } = (yield take(gatewayDispatch)) as PayloadAction<GatewayDispatch>;
    const isConnected = yield* select(
      (store) => store.gateway.state === "established"
    );

    if (!isConnected) {
      // Wait until connected to continue with dispatch
      yield race({
        connect: take(gatewayConnect),
        reconnect: take(gatewayReconnect),
      });
    }
    const isElevated = yield* select(
      (store) =>
        store.gateway.state !== "noConnection" && store.gateway.isElevated
    );

    if (elevated && !isElevated) {
      warn(
        "A route marked as elevated was dispatched without elevation! Skipping."
      );
    } else {
      socket.send(JSON.stringify({ _event: event, ...(data as object) }));
      yield put(
        gatewaySend({ event, data, timestamp: performance.now(), elevated })
      );
    }
  }
}

/**
 * Creates a gateway action event channel
 * @param socket - Socket.IO socket instance
 */
function createGatewayEventChannel(socket: Socket): EventChannel<AnyAction> {
  return eventChannel((emitter) => {
    // Basic lifecycle events
    socket.addEventListener(WebsocketEvents.open, () => {
      emitter(gatewayConnect());
    });

    socket.addEventListener(WebsocketEvents.close, () => {
      emitter(gatewayDisconnect());
    });

    socket.addEventListener(WebsocketEvents.retry, () => {
      // TODO(johny) retry != reconnect
      emitter(gatewayReconnect());
    });

    // Handle gateway error events with their own action
    // TODO(johny) this event handler will never produce a valid gateway error
    socket.addEventListener(WebsocketEvents.error, (_, data) => {
      const decodeResult = either.chain(
        t.object.decode(data),
        GatewayErrorEvent.decode
      );
      if (isRight(decodeResult)) {
        emitter(
          gatewayError({
            ...decodeResult.right,
            timestamp: performance.now(),
          })
        );
      } else {
        const errors = decodeResult.left;
        const message: string[] = failure(errors);
        emitter(
          gatewayMalformed({
            event: "error",
            timestamp: performance.now(),
            error: {
              message: `Errors ocurred while parsing server error`,
              error: JSON.stringify({ message, errors }),
              original: data,
            },
          })
        );
      }
    });

    const gatewayEvents = Object.values(events).filter((eventExport) =>
      isGatewayEvent(eventExport)
    );
    const eventDecodes = new Map(
      gatewayEvents.map((eventExport) => {
        const { _event, decode } = eventExport;
        return [_event, decode];
      })
    );
    console.log(eventDecodes);

    socket.addEventListener(
      WebsocketEvents.message,
      (_, e) => {
        const data = JSON.parse(e.data);
        console.log("Websocket message", data);
        const decodeResult = GatewayUnknownEvent.decode(data);
        console.log(decodeResult);
        if (isRight(decodeResult)) {
          const eventType = decodeResult.right._event;
          const decode = eventDecodes.get(eventType);
          if (decode) {
            const decodeResult = decode(data) as Either<Errors, unknown>;
            if (isRight(decodeResult)) {
              console.log("success!");
              emitter(
                gatewayEvent({
                  event: eventType,
                  data: decodeResult.right,
                  timestamp: performance.now(),
                })
              );
            } else {
              console.error("malformed", eventType, decodeResult.left);
            }
          } else {
            console.error("unknown event");
          }
        } else {
          console.error("this could be parsed");
          console.error(decodeResult.left);
        }
      }
      //events.
      //const decodeResult = decode(e) as Either<Errors, unknown>;
    );

    // Subscribe to each known event
    /*Object.values(events).forEach((eventExport) => {
      // Filter only gateway events (and not, for example, io-ts types)
      if (isGatewayEvent(eventExport)) {
        const { event, decode } = eventExport;
        socket.on(event, (data: unknown) => {
          const decodeResult = decode(data) as Either<Errors, unknown>;
          if (isRight(decodeResult)) {
            emitter(
              gatewayEvent({
                event,
                data: decodeResult.right,
                timestamp: performance.now(),
              })
            );
          } else {
            const errors = decodeResult.left;
            const message: string[] = failure(errors);
            emitter(
              gatewayMalformed({
                event,
                timestamp: performance.now(),
                error: {
                  message: `Errors ocurred while parsing server response`,
                  error: JSON.stringify(message),
                  original: data,
                },
              })
            );
          }
        });
      }
    });*/

    return (): void => {
      socket.close();
    };
  });
}

/**
 * Bootstraps the initial connection with the gateway server.
 * @returns the socket instance and a boolean flag indicating whether the gateway is currently
 * elevated
 */
function* initializeConnection(): SagaIterator<{
  socket: Socket;
  wasElevated: boolean;
}> {
  return {
    socket: new WebsocketBuilder(`${GATEWAY_API_BASE}/authenticated`)
      .withBackoff(new ExponentialBackoff(100, 7))
      .build(),
    // If initialized from anything but `none`, then there should be a valid
    // token/session
    wasElevated: true,
  };
}
