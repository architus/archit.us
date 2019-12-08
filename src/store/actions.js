import { HttpVerbs, log, API_BASE, WS_API_BASE, isDefined } from "Utility";
import {
  TOKEN_EXCHANGE,
  IDENTIFY_SESSION,
  GET_GUILDS,
  GET_GUILD_COUNT,
  GET_RESPONSES,
  ADD_RESPONSE,
  EDIT_RESPONSE,
  DELETE_RESPONSE
} from "Store/api/rest/labels";
import { connect, send } from "@giantmachines/redux-websocket";
import { pick } from "lodash";
import { batchActions } from "redux-batched-actions";

export const SIGN_OUT = "SIGN_OUT";
export const API = "API";
export const LOAD_SESSION = "LOAD_SESSION";
export const LOAD_GUILDS = "LOAD_GUILDS";
export const LOAD_RESPONSES = "LOAD_RESPONSES";
export const LOAD_GUILD_COUNT = "LOAD_GUILD_COUNT";
export const LOCAL_ADD_RESPONSE = "LOCAL_ADD_RESPONSE";
export const LOCAL_EDIT_RESPONSE = "LOCAL_EDIT_RESPONSE";
export const LOCAL_DELETE_RESPONSE = "LOCAL_DELETE_RESPONSE";

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
  onFailure = error => showAlert(error.toString()),
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

// ? ===================
// ? Actions
// ? ===================

export function localAddResponse(guildId, { trigger, response }, session) {
  return {
    type: LOCAL_ADD_RESPONSE,
    payload: {
      guildId,
      response: {
        trigger,
        response
      },
      session
    }
  };
}

export function localEditResponse(guildId, response, key, newValue) {
  return {
    type: LOCAL_EDIT_RESPONSE,
    payload: {
      guildId,
      response,
      key,
      newValue
    }
  };
}

export function localDeleteResponse(guildId, response) {
  return {
    type: LOCAL_DELETE_RESPONSE,
    payload: {
      guildId,
      response
    }
  };
}

// ? ===================
// ? API Actions
// ? ===================

export function exchangeTokens(authCode) {
  log("Initiating token exchange");
  return apiAction({
    url: `${API_BASE}/token_exchange`,
    method: HttpVerbs.POST,
    data: {
      code: authCode
    },
    onSuccess: data => loadSession({ ...data, newToken: true }),
    onFailure: batchActions,
    label: TOKEN_EXCHANGE
  });
}

export function identifySession(accessToken) {
  log("Identifying session");
  return authApiAction(accessToken, {
    url: `${API_BASE}/identify`,
    onSuccess: data => loadSession({ ...data, newToken: false }),
    onFailure: error => batchActions([signOut(), showAlert(error.toString())]),
    label: IDENTIFY_SESSION
  });
}

export function getGuildList(accessToken) {
  log("Getting guild list");
  return authApiAction(accessToken, {
    url: `${API_BASE}/guilds`,
    onSuccess: data => loadGuilds(data),
    onFailure: error => batchActions([signOut(), showAlert(error.toString())]),
    label: GET_GUILDS
  });
}

export function getGuildCount() {
  log("Getting guild count");
  return apiAction({
    url: `${API_BASE}/guild_count`,
    onSuccess: data => loadGuildCount(data),
    label: GET_GUILD_COUNT
  });
}

export function getResponses(accessToken, guildId) {
  log(`Getting auto responses for ${guildId}`);
  return authApiAction(accessToken, {
    url: `${API_BASE}/responses/${guildId}`,
    onSuccess: data => loadResponseData(data, guildId),
    label: GET_RESPONSES
  });
}

export function addResponse(accessToken, guildId, { trigger, response }) {
  log(`Adding new auto-response ${guildId}/${trigger}=>${response}`);
  return authApiAction(accessToken, {
    url: `${API_BASE}/responses/${guildId}`,
    label: ADD_RESPONSE,
    method: HttpVerbs.POST,
    data: {
      trigger,
      response
    }
  });
}

export function editResponse(
  accessToken,
  guildId,
  oldTrigger,
  { trigger, response }
) {
  log(`Editing auto-response ${guildId}/${trigger}=>${response}`);
  return authApiAction(accessToken, {
    url: `${API_BASE}/responses/${guildId}`,
    label: EDIT_RESPONSE,
    method: HttpVerbs.PATCH,
    data: {
      oldTrigger,
      trigger,
      response
    }
  });
}

export function deleteResponse(accessToken, guildId, { trigger }) {
  log(`Deleting auto-response ${guildId}/${trigger}`);
  return authApiAction(accessToken, {
    url: `${API_BASE}/responses/${guildId}`,
    label: DELETE_RESPONSE,
    method: HttpVerbs.DELETE,
    data: {
      trigger
    }
  });
}

// ? ===================
// ? API Success Actions
// ? ===================

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
  if (isDefined(data) && Array.isArray(data))
    return {
      type: LOAD_GUILDS,
      payload: {
        guildList: data
      }
    };
  else
    return showAlert(
      `Error loading guild list: server responded with ${JSON.stringify(data)}`
    );
}

export function loadGuildCount(data) {
  log("Loading guild count");
  return {
    type: LOAD_GUILD_COUNT,
    payload: {
      guildCount: data
    }
  };
}

export function loadResponseData(data, guildId) {
  log(`Loading auto responses for ${guildId}`);
  return {
    type: LOAD_RESPONSES,
    payload: {
      ...data,
      guildId
    }
  };
}

// ? ===================
// ? WebSocket Actions
// ? ===================

export function websocketConnect() {
  return connect(`${WS_API_BASE}`);
}

export function sendMessage(module, content) {
  return send({ _module: module, ...content });
}
