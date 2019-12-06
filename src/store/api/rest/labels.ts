export const TOKEN_EXCHANGE = "tokenExchange";
export const IDENTIFY_SESSION = "identifySession";
export const GET_GUILDS = "getGuilds";
export const GET_GUILD_COUNT = "getGuildCount";
export const GET_RESPONSES = "getResponses";
export const ADD_RESPONSE = "addResponse";
export const EDIT_RESPONSE = "editResponse";
export const DELETE_RESPONSE = "deleteResponse";

export type RestLabel =
  | typeof TOKEN_EXCHANGE
  | typeof IDENTIFY_SESSION
  | typeof GET_GUILD_COUNT
  | typeof ADD_RESPONSE
  | typeof EDIT_RESPONSE
  | typeof DELETE_RESPONSE;
