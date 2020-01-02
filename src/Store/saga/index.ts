import { takeEvery, put, fork } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import { delay, apply, take, race } from "@redux-saga/core/effects";
import { LOCAL_STORAGE_KEY } from "Store/slices/session";
import { setLocalStorage, isDefined } from "Utility";
import { navigate } from "@reach/router";
import {
  hideNotification,
  showToast,
  signOut,
  loadSession,
  showNotification
} from "Store/actions";
import { Gateway } from "Store/api/gateway/middleware";
import sessionFlow from "Store/saga/session";
import { select } from "Store/saga/utility";

type LoadSessionAction = ReturnType<typeof loadSession>;

/**
 * Root saga
 */
export default function* saga(): SagaIterator {
  yield fork(gatewayFlow);
  yield fork(sessionFlow);

  yield takeEvery(signOut.type, handleSignOut);
  yield takeEvery(showNotification.type, autoHideNotification);
}

/**
 * Sets a timeout to automatically hide a notification after its `duration` parameter
 * has elapsed
 * @param action - The show notification action dispatched upon notification display
 */
function* autoHideNotification(
  action: ReturnType<typeof showNotification>
): SagaIterator {
  const { type, duration, id } = action.payload;
  if (duration > 0) {
    yield delay(duration);
    yield put(hideNotification({ type, id }));
  }
}

/**
 * Upon sign out, clears session storage, shows a toast, and navigates to the home
 */
function* handleSignOut(action: ReturnType<typeof signOut>): SagaIterator {
  navigate("/");
  setLocalStorage(LOCAL_STORAGE_KEY, "");
  if (action.payload.silent) yield put(showToast({ message: "Signed out" }));
}

function* gatewayFlow(): SagaIterator {
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

  // Wait for a sign out
  yield take(signOut.type);
  if (wasElevated) {
    yield apply(Gateway, Gateway.demote, []);
  }
}
