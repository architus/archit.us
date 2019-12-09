import {
  getUrlParameter,
  clearUrlQueries,
  log,
  isRemote,
  getLocalStorage,
  setLocalStorage,
  warn
} from "Utility";
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
  SESSION_DISCARD_NONCE,
  SESSION_ATTACH_LISTENER,
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
  | AuthenticatedSession
  | GatewayAuthenticatedSession;

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
interface NotifySession {
  readonly signOutListeners: Array<() => void>;
}
export interface PendingSession extends LoggedInSession {
  readonly state: "pending";
}
export interface AuthenticatedSession extends LoggedInSession, NotifySession {
  readonly state: "authenticated";
}
export interface GatewayAuthenticatedSession
  extends LoggedInSession,
    NotifySession {
  readonly state: "gateway";
  readonly nonce: string;
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
  (prev: Session, action: SessionAction): Session => {
    switch (action.type) {
      case SESSION_SIGN_OUT:
        return signOut(prev);

      case SESSION_LOAD:
        const { user, access } = action.payload;
        switch (action.payload.mode) {
          case "identify":
            return {
              state: "authenticated",
              this: user,
              access,
              signOutListeners: []
            };

          case "tokenExchange":
            return {
              state: "gateway",
              this: user,
              access,
              nonce: action.payload.nonce,
              signOutListeners: []
            };
        }

      case SESSION_DISCARD_NONCE: {
        if (prev.state === "gateway") {
          return {
            state: "authenticated",
            this: prev.this,
            access: prev.access,
            signOutListeners: prev.signOutListeners
          };
        } else {
          const message = `Invalid transition ${SESSION_DISCARD_NONCE} in Session state ${prev.state}. Terminating session.`;
          warn(message);
          return signOut(prev);
        }
      }

      case SESSION_ATTACH_LISTENER: {
        if (prev.state === "gateway" || prev.state === "authenticated") {
          return {
            ...prev,
            signOutListeners: [...prev.signOutListeners, action.payload]
          };
        } else {
          const message = `Invalid transition ${SESSION_ATTACH_LISTENER} in Session state ${prev.state}. Terminating session.`;
          warn(message);
          return signOut(prev);
        }
      }
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

/**
 * Returns the session state to the initial one and notifies listeners
 */
function signOut(prev: Session): Session {
  if (prev.state === "gateway" || prev.state === "authenticated") {
    // Execute listeners
    prev.signOutListeners.forEach(fn => fn());
  }
  return initialState;
}
