import { HttpVerbs, pick, log } from "utility";
import { TOKEN_EXCHANGE, IDENTIFY_SESSION, GET_GUILDS } from "store/api/labels";
import { connect, send } from "@giantmachines/redux-websocket";

export const SIGN_OUT = "SIGN_OUT";
export const API = "API";
export const LOAD_SESSION = "LOAD_SESSION";
export const LOAD_GUILDS = "LOAD_GUILDS";

export const SOCKET = {
  CONNECT: "REDUX_WEBSOCKET::CONNECT",
  DISCONNECT: "REDUX_WEBSOCKET::DISCONNECT",
  SEND: "REDUX_WEBSOCKET::SEND",
  OPEN: "REDUX_WEBSOCKET::OPEN",
  CLOSED: "REDUX_WEBSOCKET::CLOSED",
  MESSAGE: "REDUX_WEBSOCKET::MESSAGE",
  BROKEN: "REDUX_WEBSOCKET::BROKEN",
  BEGIN_RECONNECT: "REDUX_WEBSOCKET::BEGIN_RECONNECT",
  RECONNECT_ATTEMPT: "REDUX_WEBSOCKET::RECONNECT_ATTEMPT",
  RECONNECTED: "REDUX_WEBSOCKET::RECONNECTED",
  ERROR: "REDUX_WEBSOCKET::ERROR"
};

// ? ========
// ? Defaults
// ? ========

function apiAction({
  url = "",
  method = HttpVerbs.GET,
  data = null,
  onSuccess = () => null,
  onFailure = () => null,
  label = "",
  ...rest
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      onSuccess,
      onFailure,
      label,
      ...rest
    }
  };
}

function authApiAction(accessToken, { headers, ...rest }) {
  return apiAction({
    headers: { ...headers, Authorization: accessToken },
    ...rest
  });
}

// ? =======
// ? Actions
// ? =======

export function signOut(history) {
  log("Signed out");
  return {
    type: SIGN_OUT,
    payload: history
  };
}

export function exchangeTokens(authCode) {
  log("Initiating token exchange");
  return apiAction({
    url: `https://api.aut-bot.com/token_exchange`,
    method: HttpVerbs.POST,
    data: {
      code: authCode
    },
    onSuccess: data => loadSession({ ...data, newToken: true }),
    // onFailure: signOut,
    label: TOKEN_EXCHANGE
  });
}

export function identifySession(accessToken) {
  log("Identifying session");
  return authApiAction(accessToken, {
    url: "https://api.aut-bot.com/identify",
    onSuccess: data => loadSession({ ...data, newToken: false }),
    // TODO re-enable
    // onFailure: signOut,
    label: IDENTIFY_SESSION
  });
}

export function getGuildList(accessToken) {
  log("Getting guild list");
  return authApiAction(accessToken, {
    url: "https://api.aut-bot.com/guilds",
    onSuccess: data => loadGuilds(data),
    label: GET_GUILDS
  });
}

export function loadSession(data) {
  log("Loading session data from network");
  const { access_token, expires_in, ...rest } = pick(data, [
    "access_token",
    "expires_in",
    "newToken",
    "username",
    "discriminator",
    "avatar",
    "id"
  ]);
  return {
    type: LOAD_SESSION,
    payload: {
      ...rest,
      accessToken: access_token,
      expiresIn: expires_in
    }
  };
}

export function loadGuilds(data) {
  log("Loading guilds");
  return {
    type: LOAD_GUILDS,
    payload: {
      guildList: data
    }
  };
}

export function websocketConnect() {
  return connect("wss://api.aut-bot.com:8300");
}

export function sendMessage(module, content) {
  return send({ _module: module, ...content });
}
