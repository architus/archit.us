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

  yield takeEvery(signOut.type, onSignOut);
  yield takeEvery(showNotification.type, autoHideNotification);
}

/**
 * Upon sign out, clears session storage, shows a toast, and navigates to the home
 */
function* onSignOut(): SagaIterator {
  navigate("/");
  setLocalStorage(LOCAL_STORAGE_KEY, "");
  yield put(showToast({ message: "Signed out" }));
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
 * Saves the session token/metadata to local storage upon logging in
 * @param action - The load session action dispatched upon token exchange success
 */
function loadNewSession(action: LoadSessionAction): void {
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
      put(tokenExchange(session.discordAuthCode));
    } else {
      // Identify session if coming back from session restoration
      yield put(identify());
    }

    // Wait for either a sign out (failure) or session load (success)
    const { success } = yield race({
      failure: take(signOut.type),
      success: take(loadSession.type)
    });

    if (isDefined(success)) {
      yield call(loadNewSession, success as LoadSessionAction);
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
  const session = yield* select(store => store.session);
  let elevated = false;

  if (session.state === "connected") {
    // Use nonce to initialize gateway connection
    const action: LoadSessionAction = yield take(loadSession.type);
    const { payload } = action;
    if (payload.mode === "tokenExchange") {
      const { nonce } = payload;
      yield apply(Gateway, Gateway.authenticate, [nonce]);
      elevated = true;
    }
  } else {
    // Initialize gateway without nonce
    elevated = session.state !== "none";
    yield apply(Gateway, Gateway.initialize, []);
  }

  // Wait for a sign out before de-elevating
  yield take(signOut.type);
  if (elevated) {
    // Only demote if the connection was previously elevated
    yield apply(Gateway, Gateway.demote, []);
  }
}
