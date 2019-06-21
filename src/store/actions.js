import { HttpVerbs, pick } from "../util";
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
  onSuccess = () => {},
  onFailure = () => {},
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
      rest
    }
  };
}

function authApiAction({ headers, accessToken, ...rest }) {
  return apiAction({
    headers: { ...headers, Authorization: accessToken },
    ...rest
  });
}

// ? =======
// ? Actions
// ? =======

export function signOut(history) {
  return {
    type: SIGN_OUT,
    payload: history
  };
}

export function exchangeTokens(authCode) {
  return apiAction({
    url: `https://api.aut-bot.com/token_exchange`,
    method: HttpVerbs.POST,
    data: {
      code: authCode
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    onSuccess: data => loadSession({ ...data, newToken: true }),
    onFailure: signOut,
    label: TOKEN_EXCHANGE
  });
}

export function identifySession(accessToken) {
  return authApiAction({
    url: "https://api.aut-bot.com/identify",
    accessToken,
    onSuccess: data => loadSession({ ...data, newToken: false }),
    onFailure: signOut,
    label: IDENTIFY_SESSION
  });
}

export function loadSession(data) {
  const payload = pick(data, [
    "accessToken",
    "expiresIn",
    "newToken",
    "username",
    "discriminator",
    "avatar",
    "id"
  ]);
  return {
    type: LOAD_SESSION,
    payload
  };
}
