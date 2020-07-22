import { SagaIterator } from "@redux-saga/core";
import { delay, take, race, call } from "@redux-saga/core/effects";
import { put } from "redux-saga/effects";

import { showToast, signOut, loadSession } from "@app/store/actions";
import { isApiError, isDecodeError } from "@app/store/api/rest";
import { ApiResponse } from "@app/store/api/rest/types";
import {
  identify,
  tokenExchange,
  sessionEnd,
  sessionRefresh,
  TokenExchangeResponse,
  IdentifySessionResponse,
} from "@app/store/routes";
import { select } from "@app/store/saga/utility";
import {
  LOCAL_STORAGE_KEY,
  refreshSession,
  SessionLoad,
} from "@app/store/slices/session";
import {
  log,
  warn,
  setLocalStorage,
  toJSON,
  isDefined,
  error,
} from "@app/utility";
import { PersistentSession, expiresAt } from "@app/utility/types";
import { Option } from "@architus/lib/option";

type LoadSessionAction = ReturnType<typeof loadSession>;
const TIMEOUT = 3000;

/**
 * Handles the main session flow state machine throughout the entire lifecycle
 * as a forked saga
 */
export default function* sessionFlow(): SagaIterator {
  const initial = yield* select((store) => store.session);

  if (initial.state === "connected" || initial.state === "pending") {
    if (initial.state === "connected") {
      // Initialize token exchange if coming back from discord auth
      log("Initiating token exchange with backend API");
      yield call(exchangeToken, initial.discordAuthCode);
    } else {
      // Identify session if coming back from session restoration
      log("Identifying existing session");
      yield call(identifySession);
    }
  }

  // Above actions could have failed, test again for being authenticated
  let session = yield* select((store) => store.session);
  while (session.state === "authenticated") {
    const { access } = session;

    // Start refresh, or wait for sign out
    const { refreshTimer, failure } = yield race({
      signOutResult: take(signOut.type),
      refreshTimer: delay(expiresAt(access).getTime() - Date.now()),
    });

    if (isDefined(refreshTimer)) {
      // Try to refresh session
      yield put(sessionRefresh());
      yield race({
        failure: take(signOut.type),
        success: take(refreshSession.type),
      });
    }

    if (isDefined(failure)) {
      // Signed out during refresh interval
      yield put(sessionEnd());
    }

    // Get most up to date access info
    session = yield* select((store) => store.session);
  }
}

/**
 * Saves the session token/metadata to local storage upon logging in
 * @param action - The load session action dispatched upon token exchange success
 */
function storeNewSession(action: LoadSessionAction): void {
  const { user, access } = action.payload;
  const session: PersistentSession = { user, access };
  const serialized: Option<string> = toJSON(PersistentSession.encode(session));
  const result: boolean = serialized
    .map<boolean>((s) => setLocalStorage(LOCAL_STORAGE_KEY, s))
    .getOrElse(false);
  if (result) {
    log(
      `Saved session data that expires at ${expiresAt(
        session.access
      ).toString()}`
    );
  } else {
    warn("Could not save session token to local storage");
  }
}

function* signOutAndWarn(message: string): SagaIterator {
  yield put(signOut({ silent: true }));
  warn(message);
  yield put(
    showToast({
      message,
      variant: "warning",
    })
  );
}

/**
 * Loads a session from an API response
 * @param mode - Mode to load the session from (tokenExchange/identify)
 * @param result - The API response from a session load route
 */
function* sessionLoad<T extends SessionLoad>(
  mode: T["mode"],
  result: ApiResponse<Omit<T, "mode">>
): SagaIterator {
  const { data } = result;
  const action: LoadSessionAction = loadSession({
    mode,
    ...data,
  } as T);
  yield put(action);
  log("Loading session into local storage");
  yield call(storeNewSession, action);
}

/**
 * Sub-saga that exchanges a token with the server for a full architus session
 * @param code - Discord authorization code from oauth
 */
function* exchangeToken(code: string): SagaIterator {
  try {
    const { timeout, success } = yield race({
      timeout: delay(TIMEOUT),
      signOut: take(signOut.type),
      success: call(tokenExchange.fetch, { data: { code } }),
    });

    if (isDefined(success))
      yield call(
        sessionLoad,
        "tokenExchange",
        success as ApiResponse<TokenExchangeResponse>
      );
    else if (isDefined(timeout))
      yield call(
        signOutAndWarn,
        "Token exchange timed out. Check network connection and try again"
      );
    // Else, user signed out manually
  } catch (e) {
    const message = isApiError(e) || isDecodeError(e) ? e.message : String(e);
    error(e);
    yield call(
      signOutAndWarn,
      `An error ocurred during token exchange: ${message}`
    );
  }
}

/**
 * Sub-saga that identifies a user's identity
 */
function* identifySession(): SagaIterator {
  try {
    const { timeout, success } = yield race({
      timeout: delay(TIMEOUT),
      signOut: take(signOut.type),
      success: call(identify.fetch),
    });

    if (isDefined(success)) {
      yield call(
        sessionLoad,
        "identify",
        success as ApiResponse<IdentifySessionResponse>
      );
    } else if (isDefined(timeout)) {
      yield call(
        signOutAndWarn,
        "Session identification timed out. Check network connection and try again"
      );
    }
    // Else, user signed out manually
  } catch (e) {
    const message = isApiError(e) ? e.message : String(e);
    error(e);
    yield call(
      signOutAndWarn,
      `An error ocurred during session identification: ${message}`
    );
  }
}
