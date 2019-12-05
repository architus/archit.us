import {
  getUrlParameter,
  clearUrlQueries,
  log,
  isDefined,
  isRemote,
  getLocalStorage,
  setLocalStorage
} from "Utility/index";
import { User, DateFromString } from "Utility/types";
import { Option, Some, None } from "Utility/option";
import { StoreSlice, Reducer, ActionBase } from "Store/types";
import { scopeReducer } from "./base";
import { isRight } from "fp-ts/lib/Either";
import * as t from "io-ts";

// ? ====================
// ? Actions & Types
// ? ====================

export const LOCAL_STORAGE_KEY = "session";

export const SESSION_NAMESPACE = "session";
export const SESSION_SIGN_OUT = "signOut";
export const SESSION_LOAD = "load";

type SessionBase<T> = ActionBase<T, typeof SESSION_NAMESPACE>;
export type SessionAction = SessionSignOutAction | SessionLoadAction;

interface SessionSignOutAction extends SessionBase<typeof SESSION_SIGN_OUT> {
  readonly payload: void;
}

interface SessionLoadAction extends SessionBase<typeof SESSION_LOAD> {
  readonly payload: {
    readonly user: User;
    readonly access: Access;
  };
}

/**
 * Tagged union ADT representing the current session state. `Session.state` can either be
 * `"none"` (unauthenticated), `"connected"` (directly between Oauth return and token
 * exchange with API), or `"authenticated" `(after token exchange/local storage session
 * restoration).
 *
 * For more information on authentication,
 * @see https://docs.archit.us/internal/api-reference/auth/
 */
export type Session = NoneSession | ConnectedSession | AuthenticatedSession;
export interface NoneSession {
  readonly state: "none";
}
export interface ConnectedSession {
  readonly state: "connected";
  readonly discordAuthCode: string;
}
export interface AuthenticatedSession {
  readonly state: "authenticated";
  readonly access: Access;
  readonly this?: User;
}

const TAccess = t.intersection([
  t.partial({
    expiresAt: DateFromString
  }),
  t.type({
    token: t.string
  })
]);

/**
 * Represents archit.us session access and expiration metadata
 */
export type Access = t.TypeOf<typeof TAccess>;

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

  return (
    storage
      .filter(value => value !== "")
      // Parse local storage data
      .flatMap<Access>(rawValue => {
        const result = TAccess.decode(rawValue);
        if (isRight(result)) return Some(result.right);
        else return None;
      })
      // Process expires at
      .flatMap<Session>(({ expiresAt, token }) => {
        if (isDefined(expiresAt) && expiresAt.getTime() - Date.now() < 0) {
          log("Session has expired; clearing");
          setLocalStorage(LOCAL_STORAGE_KEY, "");
          return None;
        } else {
          return Some({
            state: "authenticated",
            access: {
              expiresAt,
              token
            }
          });
        }
      })
  );
}
