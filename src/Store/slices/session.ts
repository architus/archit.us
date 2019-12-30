import {
  getUrlParameter,
  clearUrlQueries,
  log,
  isRemote,
  getLocalStorage,
  setLocalStorage,
  warn,
  assertUnreachable
} from "Utility";
import {
  User,
  PersistentSession,
  TPersistentSession,
  Access,
  MapDiscriminatedUnion
} from "Utility/types";
import { Option, Some, None } from "Utility/option";
import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
  Slice
} from "@reduxjs/toolkit";
import {
  IdentifySessionResponse,
  TokenExchangeResponse
} from "Store/api/rest/types";

// ? ====================
// ? Types
// ? ====================

/**
 * Tagged union ADT representing the current session state.
 *
 * @remarks `Session.state` can either be
 * `"none"` (unauthenticated), `"connected"` (directly between Oauth return and token
 * exchange with API), `"pending" `(after local storage session restoration),
 * `"authenticated"` (after token exchange/identify), or `"gateway"` (after token
 * exchange and before gateway initialization)
 * For more information on authentication, see the
 * {@link https://docs.archit.us/internal/api-reference/auth/ | Architus API docs}
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

interface IdentifyLoad extends IdentifySessionResponse {
  mode: "identify";
}

interface TokenExchangeLoad extends TokenExchangeResponse {
  mode: "tokenExchange";
  nonce: string;
}

type SessionLoad = IdentifyLoad | TokenExchangeLoad;

// ? ====================
// ? Reducer exports
// ? ====================

const initialState: Session = tryLoadSession().getOrElse({ state: "none" });
const slice = createSlice({
  name: "session",
  initialState,
  reducers: {
    signOut: (state, _: PayloadAction<{}>): Session => signOutState(state),
    attachSignOutListener: guardedTransitions(
      ["gateway", "authenticated"],
      (state, action: PayloadAction<() => void>) => ({
        ...state,
        signOutListeners: [...state.signOutListeners, action.payload]
      })
    ),
    refreshSession: guardedTransition(
      "authenticated",
      (state, action: PayloadAction<Access>) => ({
        ...state,
        access: action.payload
      })
    ),
    discardNonce: guardedTransition(
      "gateway",
      (state, _: PayloadAction<{}>) => ({
        state: "authenticated",
        this: state.this,
        access: state.access,
        signOutListeners: state.signOutListeners
      })
    ),
    loadSession(state: Session, action: PayloadAction<SessionLoad>): Session {
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

        default:
          assertUnreachable(action.payload);
          return signOutState(state);
      }
    }
  }
});

export const {
  signOut,
  attachSignOutListener,
  refreshSession,
  discardNonce,
  loadSession
} = slice.actions;
export default slice.reducer;

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
      }
      return Some({
        state: "pending",
        this: session.user,
        access: session.access
      });
    });
}

/**
 * Returns the session state to the initial one and notifies listeners
 */
function signOutState(prev: Session): Session {
  if (prev.state === "gateway" || prev.state === "authenticated") {
    // Execute listeners
    prev.signOutListeners.forEach(fn => fn());
  }
  return initialState;
}

/**
 * Guards an action type against invalid state machine states
 * @param desiredState - Valid state machine state
 * @param state - Current state coming into the reducer
 * @param action - Current action coming into the reducer
 * @param func - Function to apply if the state passes
 */
type StateMap = MapDiscriminatedUnion<Session, "state">;
function guardedTransition<S extends Session["state"], P>(
  desiredState: S,
  actionReducer: (prev: StateMap[S], action: PayloadAction<P>) => Session
): (prev: Session, action: PayloadAction<P>) => Session {
  return guardedTransitions([desiredState] as const, actionReducer);
}

/**
 * Guards an action type against invalid state machine states
 * @param desiredState - Array of valid state machine states
 * @param state - Current state coming into the reducer
 * @param action - Current action coming into the reducer
 * @param func - Function to apply if the state passes
 */
function guardedTransitions<S extends Session["state"], P>(
  desiredState: readonly S[],
  actionReducer: (
    prev: StateMap[typeof desiredState[number]],
    action: PayloadAction<P>
  ) => Session
): (prev: Session, action: PayloadAction<P>) => Session {
  return (prev, action: PayloadAction<P>): Session => {
    const { state } = prev;
    if (desiredState.includes(state as S)) {
      return actionReducer(
        prev as StateMap[typeof desiredState[number]],
        action
      );
    }
    const message = `Invalid transition ${action.type} in Session state ${prev.state}. Terminating session.`;
    warn(message);
    return signOutState(prev);
  };
}

// ? =====================
// ? Higher order reducers
// ? =====================

/**
 * Acts as a middleware for the the reducer to reset its state upon a sign out
 *
 * @param name - Slice name
 * @param initialState - Initial state to use upon logout
 * @param reducers - Reducers to apply otherwise
 */
export function createSessionAwareState<
  T,
  Reducers extends SliceCaseReducers<T>
>({
  name = "",
  initialState: initial,
  reducers
}: {
  name: string;
  initialState: T;
  reducers: ValidateSliceCaseReducers<T, Reducers>;
}): Slice<T, Reducers> {
  return createSlice({
    name,
    initialState: initial,
    reducers: {
      [signOut.type]: (): T => initial,
      ...reducers
    }
  });
}
