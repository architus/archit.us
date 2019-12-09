import {
  getUrlParameter,
  clearUrlQueries,
  log,
  isRemote,
  getLocalStorage,
  setLocalStorage
} from "Utility/index";
import {
  User,
  PersistentSession,
  TPersistentSession,
  Access
} from "Utility/types";
import { Option, Some, None } from "Utility/option";
import { StoreSlice, Reducer } from "Store/types";
import { scopeReducer } from "Store/slices/base";

import {
  SESSION_NAMESPACE,
  SESSION_LOAD,
  SESSION_SIGN_OUT,
  SessionAction
} from "Store/actions/session";

// ? ====================
// ? Types
// ? ====================

/**
 * Tagged union ADT representing the current session state. `Session.state` can either be
 * `"none"` (unauthenticated), `"connected"` (directly between Oauth return and token
 * exchange with API), `"pending" `(after local storage session restoration), or
 * `"authenticated"` (after token exchange/identify)
 * For more information on authentication,
 * @see https://docs.archit.us/internal/api-reference/auth/
 */
export type Session =
  | NoneSession
  | ConnectedSession
  | PendingSession
  | AuthenticatedSession;

export interface NoneSession {
  readonly state: "none";
}
export interface ConnectedSession {
  readonly state: "connected";
  readonly discordAuthCode: string;
}
interface LoggedInSession {
  readonly access: Access;
  readonly this: User;
}
export interface PendingSession extends LoggedInSession {
  readonly state: "pending";
}
export interface AuthenticatedSession extends LoggedInSession {
  readonly state: "authenticated";
}

// ? ====================
// ? Reducer exports
// ? ====================

const initialState: Session = { state: "none" };
const initial: () => Session = () => {
  const result: Option<Session> = tryLoadSession();
  return result.getOrElse(initialState);
};

const reducer: Reducer<Session> = scopeReducer(
  SESSION_NAMESPACE,
  (_: Session, action: SessionAction): Session => {
    switch (action.type) {
      case SESSION_SIGN_OUT:
        return initialState;

      case SESSION_LOAD:
        const { user, access } = action.payload;
        return {
          state: "authenticated",
          this: user,
          access
        };
    }
  }
);

const slice: StoreSlice<Session> = { initial, reducer };
export default slice;

// ? ====================
// ? State initialization
// ? ====================

const authPathNames = ["/app", "/app/"];
export const LOCAL_STORAGE_KEY = "session";

/**
 * Attempts to load session from either a. the browser's window location or b.
 * local storage
 */
function tryLoadSession(): Option<Session> {
  // Skip when building statically
  if (isRemote) return None;

  // URL param from Discord oauth Redirect URI
  const urlCode: Option<string> = getUrlParameter("code");
  if (urlCode.isDefined() && authPathNames.includes(window.location.pathname)) {
    clearUrlQueries();
    log("Loaded authorization code from discord oauth");
    // State will initiate token exchange when /app is loaded
    return Some({
      state: "connected",
      discordAuthCode: urlCode.get
    });
  }

  // Attempt to load session from local storage
  const storage = getLocalStorage(LOCAL_STORAGE_KEY);
  return storage
    .filter(value => value !== "")
    .flatMap<PersistentSession>(rawValue =>
      Option.drop(TPersistentSession.decode(rawValue))
    )
    .flatMap<Session>(session => {
      if (session.access.expiresAt.getTime() - Date.now() < 0) {
        log("Session has expired. Clearing");
        setLocalStorage(LOCAL_STORAGE_KEY, "");
        return None;
      } else {
        return Some({
          state: "pending",
          this: session.user,
          access: session.access
        });
      }
    });
}
