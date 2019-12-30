export const TOKEN_EXCHANGE = "tokenExchange";
export const IDENTIFY_SESSION = "identifySession";
export const SESSION_REFRESH = "sessionRefresh";
export const SESSION_END = "sessionEnd";
export const GET_GUILD_COUNT = "getGuildCount";
export const ADD_RESPONSE = "addResponse";
export const EDIT_RESPONSE = "editResponse";
export const DELETE_RESPONSE = "deleteResponse";

export type RestLabel =
  | typeof TOKEN_EXCHANGE
  | typeof IDENTIFY_SESSION
  | typeof SESSION_REFRESH
  | typeof SESSION_END
  | typeof GET_GUILD_COUNT
  | typeof ADD_RESPONSE
  | typeof EDIT_RESPONSE
  | typeof DELETE_RESPONSE;
