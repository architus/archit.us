export const LOAD_AUTH_TOKEN = "LOAD_AUTH_TOKEN";
export const SIGN_OUT = "SIGN_OUT";
export const API = "API";

export function loadAuthToken(authToken) {
  return {
    type: LOAD_AUTH_TOKEN,
    authToken
  };
}

export function signOut() {
  return {
    type: SIGN_OUT
  };
}
