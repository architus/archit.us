import { takeEvery, put, fork, select as sagaSelect } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import {
  delay,
  SelectEffect,
  apply,
  take,
  race,
  call
} from "@redux-saga/core/effects";
import { LOCAL_STORAGE_KEY, refreshSession } from "Store/slices/session";
import { log, warn, setLocalStorage, toJSON, isDefined } from "Utility";
import { PersistentSession } from "Utility/types";
import { Option } from "Utility/option";
import { navigate } from "@reach/router";
import {
  hideNotification,
  showToast,
  signOut,
  loadSession,
  showNotification
} from "Store/actions";
import {
  identify,
  tokenExchange,
  sessionEnd,
  sessionRefresh
} from "Store/routes";
import { Store } from "Store";
import { Gateway } from "./api/gateway/middleware";

/**
 * Same as `redux-saga/effects.select(selector)`, but automatically types
 * correctly based on the overall Store shape
 * @param selector - Selector function
 */
function* select<T>(selector: (store: Store) => T): Generator<SelectEffect, T> {
  const store = yield sagaSelect(selector);
  return store as T;
}

/**
 * Holds all async sagas dispatched from store actions
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
function* handleSignOut(): SagaIterator {
  navigate("/");
  setLocalStorage(LOCAL_STORAGE_KEY, "");
  yield put(showToast({ message: "Signed out" }));
}

/**
 * Saves the session token/metadata to local storage upon logging in
 * @param action - The load session action dispatched upon token exchange success
 */
function storeNewSession(action: LoadSessionAction): void {
  const { user, access } = action.payload;
  const session: PersistentSession = { user, access };
  const serialized: Option<string> = toJSON(session);
  const result: boolean = serialized
    .map<boolean>(s => setLocalStorage(LOCAL_STORAGE_KEY, s))
    .getOrElse(false);
  if (result) {
    const { expiresAt } = session.access;
    log(`Saved session data that expires at ${expiresAt.toString()}`);
  } else {
    warn("Could not save session token to local storage");
  }
}

type LoadSessionAction = ReturnType<typeof loadSession>;

function* sessionFlow(): SagaIterator {
  let session = yield* select(store => store.session);

  if (session.state === "connected" || session.state === "pending") {
    if (session.state === "connected") {
      // Initialize token exchange if coming back from discord auth
      log("Initiating token exchange with backend API");
      yield put(tokenExchange(session.discordAuthCode));
    } else {
      // Identify session if coming back from session restoration
      log("Identifying existing session");
      yield put(identify());
    }

    // Wait for either a sign out (failure) or session load (success)
    const { success } = yield race({
      failure: take(signOut.type),
      success: take(loadSession.type)
    });

    if (isDefined(success)) {
      log("Loading session into local storage");
      yield call(storeNewSession, success as LoadSessionAction);
    }
  }

  // Above actions could have failed, test again for being authenticated
  session = yield* select(store => store.session);
  while (session.state === "authenticated") {
    const {
      access: { refreshIn }
    } = session;

    // Start refresh, or wait for sign out
    const { refreshTimer, failure } = yield race({
      signOutResult: take(signOut.type),
      refreshTimer: delay(refreshIn)
    });

    if (isDefined(refreshTimer)) {
      // Try to refresh session
      yield put(sessionRefresh());
      yield race({
        failure: take(signOut.type),
        success: take(refreshSession.type)
      });
    }

    if (isDefined(failure)) {
      // Signed out during refresh interval
      yield put(sessionEnd());
    }

    // Get most up to date access info
    session = yield* select(store => store.session);
  }
}

function* gatewayFlow(): SagaIterator {
  const initialState = yield* select(store => store.session.state);
  let wasElevated = false;
  let initializedWithNonce = false;

  if (initialState === "connected") {
    // Wait for (successful) token exchange to finish and then use nonce to
    // initialize gateway connection
    const { success, timeout } = yield race({
      success: take(loadSession.type),
      failure: take(signOut.type),
      timeout: delay(3000)
    });

    if (isDefined(success)) {
      if (success.payload.mode === "tokenExchange") {
        const { nonce } = success.payload;
        yield apply(Gateway, Gateway.authenticate, [nonce]);
        wasElevated = true;
        initializedWithNonce = true;
      }
    } else if (isDefined(timeout)) {
      yield put(signOut());
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
