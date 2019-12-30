import { restDispatch } from "Store/api/rest/actions";
import {
  IdentifySessionResponse,
  TIdentifySessionResponse,
  TokenExchangeResponse,
  TTokenExchangeResponse,
  GuildCountLoadResponse,
  TGuildCountLoadResponse,
  SessionRefreshResponse,
  TSessionRefreshResponse
} from "Store/api/rest/types";
import {
  IDENTIFY_SESSION,
  TOKEN_EXCHANGE,
  GET_GUILD_COUNT,
  SESSION_REFRESH,
  SESSION_END
} from "Store/api/rest/labels";
import { Option } from "Utility/option";
import * as t from "io-ts";
import { either } from "fp-ts/lib/Either";
import { HttpVerbs } from "Utility";
import { loadGuildCount, loadSession } from "Store/actions";
import { refreshSession, signOut } from "./slices/session";

type RestDispatchAction = ReturnType<typeof restDispatch>;

/**
 * GET /session/identify
 */
export function identify(): RestDispatchAction {
  return restDispatch<IdentifySessionResponse>({
    route: "/session/identify",
    label: IDENTIFY_SESSION,
    onSuccess: (response: IdentifySessionResponse) =>
      loadSession({ ...response, mode: "identify" }),
    onFailure: () => signOut(),
    decode: response =>
      Option.drop(
        either.chain(t.object.decode(response), TIdentifySessionResponse.decode)
      )
  });
}

/**
 * POST /session/token-exchange
 */
export function tokenExchange(discordAuthCode: string): RestDispatchAction {
  return restDispatch<TokenExchangeResponse>({
    route: "/session/token-exchange",
    label: TOKEN_EXCHANGE,
    method: HttpVerbs.POST,
    data: { code: discordAuthCode },
    onSuccess: (response: TokenExchangeResponse) =>
      loadSession({ ...response, mode: "tokenExchange" }),
    onFailure: () => signOut(),
    decode: response =>
      Option.drop(
        either.chain(t.object.decode(response), TTokenExchangeResponse.decode)
      )
  });
}

/**
 * POST /session/refresh
 */
export function sessionRefresh(): RestDispatchAction {
  return restDispatch<SessionRefreshResponse>({
    route: "/session/refresh",
    label: SESSION_REFRESH,
    method: HttpVerbs.POST,
    onSuccess: (response: SessionRefreshResponse) =>
      refreshSession(response.access),
    onFailure: () => signOut(),
    decode: response =>
      Option.drop(
        either.chain(t.object.decode(response), TSessionRefreshResponse.decode)
      )
  });
}

/**
 * POST /session/end
 */
export function sessionEnd(): RestDispatchAction {
  return restDispatch<void>({
    route: "/session/end",
    label: SESSION_END,
    method: HttpVerbs.POST
  });
}

/**
 * GET /guild-count
 */
export function guildCount(): RestDispatchAction {
  return restDispatch<GuildCountLoadResponse>({
    route: "/guild-count",
    label: GET_GUILD_COUNT,
    onSuccess: (response: GuildCountLoadResponse) => loadGuildCount(response),
    decode: response =>
      Option.drop(
        either.chain(t.object.decode(response), TGuildCountLoadResponse.decode)
      )
  });
}
