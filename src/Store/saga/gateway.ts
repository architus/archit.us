import { SagaIterator } from "@redux-saga/core";
import { apply, take, race, call } from "@redux-saga/core/effects";
import { isDefined } from "Utility";
import {
  signOut,
  loadSession} from "Store/actions";
import { Gateway } from "Store/api/gateway/middleware";
import { select } from "Store/saga/utility";

type LoadSessionAction = ReturnType<typeof loadSession>;

/**
 * Handles the main gateway connection, usage, and termination state throughout the entire
 * application lifecycle as a forked saga
 */
export default function* gatewayFlow(): SagaIterator {
  const wasElevated = yield call(initialize);

  // Wait for a sign out
  yield take(signOut.type);
  if (wasElevated) {
    yield apply(Gateway, Gateway.demote, []);
  }
}

function* initialize(): SagaIterator<boolean> {
  const initialState = yield* select(store => store.session.state);
  let wasElevated = false;
  let initializedWithNonce = false;

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
        yield apply(Gateway, Gateway.authenticate, [gatewayNonce]);
        wasElevated = true;
        initializedWithNonce = true;
      }
    }
  }

  const currentState = yield* select(store => store.session.state);
  if (!initializedWithNonce) {
    yield apply(Gateway, Gateway.initialize, []);

    // If initialized from anything but `none`, then there should be a valid
    // token/session
    wasElevated = currentState !== "none";
  }

  return wasElevated;
}
