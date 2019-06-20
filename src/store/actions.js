export const LOAD_AUTH_TOKEN = "LOAD_AUTH_TOKEN";

export function loadAuthToken(authToken) {
  return {
    type: LOAD_AUTH_TOKEN,
    authToken
  };
}
