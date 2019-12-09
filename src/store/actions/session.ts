import { log } from "Utility";
import { ActionBase, ActionFactory } from "Store/types";
import {
  TokenExchangeResponse,
  IdentifySessionResponse
} from "Store/api/rest/types";

// ? ====================
// ? Actions & Types
// ? ====================

export const SESSION_NAMESPACE = "session";
export const SESSION_SIGN_OUT = "session:signOut";
export const SESSION_LOAD = "session:load";
export const SESSION_DISCARD_NONCE = "session:discardNonce";
export const SESSION_ATTACH_LISTENER = "session:attachListener";

type SessionBase<T> = ActionBase<T, typeof SESSION_NAMESPACE>;
export type SessionAction =
  | SessionSignOutAction
  | SessionLoadAction
  | SessionDiscardNonceAction
  | SessionAttachListenerAction;

export interface SessionSignOutAction
  extends SessionBase<typeof SESSION_SIGN_OUT> {}

export interface SessionDiscardNonceAction
  extends SessionBase<typeof SESSION_DISCARD_NONCE> {}

export interface SessionAttachListenerAction
  extends SessionBase<typeof SESSION_ATTACH_LISTENER> {
  payload: () => void;
}

export interface SessionLoadAction extends SessionBase<typeof SESSION_LOAD> {
  payload: SessionLoad;
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
// ? Factories
// ? ====================

export const signOut: ActionFactory<SessionSignOutAction, never> = () => {
  log("Signed out");
  return {
    namespace: SESSION_NAMESPACE,
    type: SESSION_SIGN_OUT
  };
};

export const loadSession: ActionFactory<SessionLoadAction, [SessionLoad]> = (
  load: SessionLoad
) => {
  if (load.mode === "identify") {
    log("Refreshing session data from network");
  } else {
    log("Loading session data from network");
  }
  return {
    namespace: SESSION_NAMESPACE,
    type: SESSION_LOAD,
    payload: load
  };
};

export const discardNonce: ActionFactory<
  SessionDiscardNonceAction,
  []
> = () => {
  log("Discarding gateway elevation nonce");
  return {
    namespace: SESSION_NAMESPACE,
    type: SESSION_DISCARD_NONCE
  };
};

export const attachListener: ActionFactory<
  SessionAttachListenerAction,
  [() => void]
> = func => {
  return {
    namespace: SESSION_NAMESPACE,
    type: SESSION_ATTACH_LISTENER,
    payload: func
  };
};
