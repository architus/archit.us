import { HttpVerbs, pick, log } from "../util";
import { TOKEN_EXCHANGE, IDENTIFY_SESSION } from "./api/labels";

export const SIGN_OUT = "SIGN_OUT";
export const API = "API";
export const LOAD_SESSION = "LOAD_SESSION";

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
    onFailure: signOut,
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
