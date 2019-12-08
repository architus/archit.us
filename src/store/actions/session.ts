import { log } from "Utility";
import { User } from "Utility/types";
import { ActionBase, ActionFactory } from "Store/types";
import { TokenExchangeResponse } from "Store/api/rest/types";

// ? ====================
// ? Actions & Types
// ? ====================

export const SESSION_NAMESPACE = "session";
export const SESSION_SIGN_OUT = "session:signOut";
export const SESSION_LOAD = "session:load";

type SessionBase<T> = ActionBase<T, typeof SESSION_NAMESPACE>;
export type SessionAction = SessionSignOutAction | SessionLoadAction;

export interface SessionSignOutAction
  extends SessionBase<typeof SESSION_SIGN_OUT> {}

export interface SessionLoadAction extends SessionBase<typeof SESSION_LOAD> {
  payload: {
    user: User;
    access: {
      token: string;
      expiresIn?: number;
    };
  };
}

// ? ====================
// ? Factories
// ? ====================

export const signOut: ActionFactory<SessionSignOutAction, never> = () => {
  log("Signed out");
  return {
    namespace: SESSION_NAMESPACE,
    type: SESSION_SIGN_OUT
  };
};

export const loadSession: ActionFactory<
  SessionLoadAction,
  [TokenExchangeResponse]
> = (response: TokenExchangeResponse) => {
  log("Loading session data from network");

  const { user, access } = response;
  return {
    namespace: SESSION_NAMESPACE,
    type: SESSION_LOAD,
    payload: {
      user,
      access
    }
  };
};
