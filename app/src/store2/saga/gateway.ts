import { SagaIterator, EventChannel, eventChannel } from "@redux-saga/core";
import { take, race, call, put, fork } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { isRight, Either, either } from "fp-ts/lib/Either";
import * as t from "io-ts";
import { Errors } from "io-ts";
import { failure } from "io-ts/lib/PathReporter";
import { AnyAction } from "redux";
import io from "socket.io-client";

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
} from "@app/store/api/gateway";
import * as events from "@app/store/routes/events";
import { select } from "@app/store/saga/utility";
import { isDefined, GATEWAY_API_BASE, warn } from "@app/utility";

type LoadSessionAction = ReturnType<typeof loadSession>;
type Socket = SocketIOClient.Socket;

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
      socket.emit(event, data);
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
    socket.on("connect", () => {
      emitter(gatewayConnect());
    });

    socket.on("disconnect", () => {
      emitter(gatewayDisconnect());
    });

    socket.on("reconnect", () => {
      emitter(gatewayReconnect());
    });

    // Handle gateway error events with their own action
    socket.on("error", (data: unknown) => {
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

    // Subscribe to each known event
    Object.values(events).forEach((eventExport) => {
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
    });

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
  const initialState = yield* select((store) => store.session.state);
  if (initialState === "connected") {
    // Wait for (successful) token exchange to finish and then use nonce to
    // initialize gateway connection
    const { success } = yield race({
      success: take(loadSession.type),
      failure: take(signOut.type),
    });

    if (isDefined(success)) {
      const { payload } = success as LoadSessionAction;
      if (payload.mode === "tokenExchange") {
        const { gatewayNonce } = payload;
        return {
          socket: io(`${GATEWAY_API_BASE}/?nonce=${gatewayNonce}`),
          wasElevated: true,
        };
      }
    }
  }

  const currentState = yield* select((store) => store.session.state);
  return {
    socket: io(GATEWAY_API_BASE),
    // If initialized from anything but `none`, then there should be a valid
    // token/session
    wasElevated: currentState !== "none",
  };
}
