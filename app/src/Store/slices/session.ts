import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  Slice,
  CreateSliceOptions,
} from "@reduxjs/toolkit";
import { shallowEqual } from "react-redux";

import { Store } from "@app/store";
import { useSelector } from "@app/store/hooks";
import {
  IdentifySessionResponse,
  TokenExchangeResponse,
} from "@app/store/routes";
import {
  getUrlParameter,
  clearUrlQueries,
  log,
  isRemote,
  getLocalStorage,
  setLocalStorage,
  warn,
  isNil,
  withBasePath,
} from "@app/utility";
import { Option, Some, None } from "@app/utility/option";
import {
  User,
  PersistentSession,
  MapDiscriminatedUnion,
  Access,
  expiresAt,
} from "@app/utility/types";

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

interface IdentifyLoad extends IdentifySessionResponse {
  mode: "identify";
}

interface TokenExchangeLoad extends TokenExchangeResponse {
  mode: "tokenExchange";
  gatewayNonce: number;
}

export type SessionLoad = IdentifyLoad | TokenExchangeLoad;

// ? ====================
// ? State initialization
// ? ====================

const authPathNames = [withBasePath("/app"), withBasePath("/app/")];
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
      discordAuthCode: urlCode.get,
    });
  }

  // Attempt to load session from local storage
  const storage = getLocalStorage(LOCAL_STORAGE_KEY);
  return storage
    .filter((value) => value !== "")
    .flatMap<PersistentSession>((rawValue) =>
      Option.drop(PersistentSession.decode(JSON.parse(rawValue)))
    )
    .flatMap<Session>((session) => {
      if (expiresAt(session.access).getTime() - Date.now() < 0) {
        log("Session has expired. Clearing");
        setLocalStorage(LOCAL_STORAGE_KEY, "");
        return None;
      }
      return Some({
        state: "pending",
        this: session.user,
        access: session.access,
      });
    });
}

/**
 * Returns the session state to the initial one and notifies listeners
 */
function signOutState(): Session {
  return { state: "none" };
}

// ? ====================
// ? Reducer exports
// ? ====================

const initialState: Session = tryLoadSession().getOrElse({ state: "none" });
const slice = createSlice({
  name: "session",
  initialState,
  reducers: {
    // Silent payload prop is used in saga side effect for displaying toast
    signOut: (_1: Session, _2: PayloadAction<{ silent?: boolean }>): Session =>
      signOutState(),
    refreshSession: guardedTransition(
      "authenticated",
      (state, action: PayloadAction<Access>) => ({
        ...state,
        access: action.payload,
      })
    ),
    loadSession(_: Session, action: PayloadAction<SessionLoad>): Session {
      const { user, access } = action.payload;
      return {
        state: "authenticated",
        this: user,
        access,
      };
    },
  },
});

export const { signOut, refreshSession, loadSession } = slice.actions;
export default slice.reducer;

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
    return signOutState();
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
  initialState: initial,
  extraReducers,
  ...rest
}: CreateSliceOptions<T, Reducers>): Slice<T, Reducers> {
  return createSlice({
    ...rest,
    initialState: initial,
    extraReducers: {
      [signOut.type]: (): T => initial,
      ...extraReducers,
    },
  });
}

// ? ==============
// ? Selector hooks
// ? ==============

/**
 * Gets the current user, or None if there is none
 */
export function useCurrentUser(): Option<User> {
  return useSelector(
    (store) => {
      const { session } = store;
      if (session.state === "authenticated" || session.state === "pending") {
        return Some(session.this);
      }
      return None;
    },
    // Perform equality check on options
    (left, right): boolean => left.equals(right, shallowEqual)
  );
}

/**
 * @remarks
 * `isSigningIn` counts as any stage other than `NoneSession`.
 * `isSignedIn` counts as any stage with access/this and that is confirmed
 * (not `PendingSession`)
 * @returns a tuple containing [isSignedIn, isSigningIn, session.state]
 */
export function useSessionStatus(): {
  isSignedIn: boolean;
  isSigningIn: boolean;
  state: string;
} {
  return useSelector((store) => {
    if (isNil(store.session)) {
      return { isSignedIn: false, isSigningIn: false, state: "none" };
    }
    const {
      session: { state },
    } = store;
    const isSigningIn = state !== "none";
    const isSignedIn = state === "authenticated";
    return { isSignedIn, isSigningIn, state };
  }, shallowEqual);
}

/**
 * Selector function that selects the Discord auth code if it exists,
 * or `None`
 * @param store - Current store state
 */
export function selectAuthCode(store: Store): Option<string> {
  const { session } = store;
  if (session.state === "connected") return Some(session.discordAuthCode);
  return None;
}
