import { SagaIterator, EventChannel, eventChannel } from "@redux-saga/core";
import { take, race, call, put, fork } from "@redux-saga/core/effects";
import { isDefined, GATEWAY_API_BASE } from "Utility";
import { signOut, loadSession } from "Store/actions";
import { select } from "Store/saga/utility";
import {
  gatewayInitialize,
  gatewayConnect,
  gatewayDisconnect,
  gatewayReconnect
} from "Store/api/gateway/actions";
import { AnyAction } from "redux";
import io from "socket.io-client";

type LoadSessionAction = ReturnType<typeof loadSession>;
type Socket = SocketIOClient.Socket;

/**
 * Handles the main gateway connection, usage, and termination state throughout the entire
 * application lifecycle as a forked saga
 */
export default function* gatewayFlow(): SagaIterator {
  // Initialize socket.io connection
  const { socket, wasElevated } = yield call(initializeConnection);
  yield put(gatewayInitialize({ wasElevated, url: GATEWAY_API_BASE }));

  // Attach all listeners
  const eventChannel = yield call(createGatewayEventChannel, socket);
  yield fork(gatewayEventHandler, eventChannel);

  // Fork sign out handler
  if (wasElevated) {
    yield fork(demoteOnSignout, socket);
  }
}

/**
 * Puts all incoming actions created from the gateway event channel
 * @param channel Gateway event channel
 */
function* gatewayEventHandler(channel: EventChannel<AnyAction>) {
  while (true) {
    const action = yield take(channel) as AnyAction;
    yield put(action);
  }
}

/**
 * Demotes the socket upon signout
 * @param socket Socket instance
 */
function* demoteOnSignout(socket: Socket): SagaIterator {
  yield take(signOut.type);

  // TODO implement
}

/**
 * Creates a gateway action event channel
 * @param socket Socket.IO socket instance
 */
function createGatewayEventChannel(socket: Socket): EventChannel<AnyAction> {
  return eventChannel(emitter => {
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

    return () => {
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
  const initialState = yield* select(store => store.session.state);
  if (initialState === "connected") {
    // Wait for (successful) token exchange to finish and then use nonce to
    // initialize gateway connection
    const { success } = yield race({
      success: take(loadSession.type),
      failure: take(signOut.type)
    });

    if (isDefined(success)) {
      const { payload } = success as LoadSessionAction;
      if (payload.mode === "tokenExchange") {
        const { gatewayNonce } = payload;
        return {
          socket: io(`${GATEWAY_API_BASE}/?nonce=${gatewayNonce}`),
          wasElevated: true
        };
      }
    }
  }

  const currentState = yield* select(store => store.session.state);
  return {
    socket: io(GATEWAY_API_BASE),
    // If initialized from anything but `none`, then there should be a valid
    // token/session
    wasElevated: currentState !== "none"
  };
}
