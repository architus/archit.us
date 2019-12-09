import { restDispatch } from "Store/api/rest/actions";
import {
  IdentifySessionResponse,
  TIdentifySessionResponse,
  TokenExchangeResponse,
  TTokenExchangeResponse,
  GuildCountLoadResponse,
  TGuildCountLoadResponse
} from "Store/api/rest/types";
import {
  IDENTIFY_SESSION,
  TOKEN_EXCHANGE,
  GET_GUILD_COUNT
} from "Store/api/rest/labels";
import { Option } from "Utility/option";
import { loadSession } from "Store/actions";
import * as t from "io-ts";
import { either } from "fp-ts/lib/Either";
import { HttpVerbs } from "Utility";
import { loadGuildCount } from "Store/actions";

/**
 * GET /identify
 */
export function identify() {
  return restDispatch<IdentifySessionResponse>({
    route: "/identify",
    label: IDENTIFY_SESSION,
    onSuccess: (response: IdentifySessionResponse) => loadSession(response),
    decode: response =>
      Option.drop(
        either.chain(t.object.decode(response), TIdentifySessionResponse.decode)
      )
  });
}

/**
 * POST /token-exchange
 */
export function tokenExchange(discordAuthCode: string) {
  return restDispatch<TokenExchangeResponse>({
    route: "/token-exchange",
    label: TOKEN_EXCHANGE,
    method: HttpVerbs.POST,
    data: { code: discordAuthCode },
    onSuccess: (response: TokenExchangeResponse) => loadSession(response),
    decode: response =>
      Option.drop(
        either.chain(t.object.decode(response), TTokenExchangeResponse.decode)
      )
  });
}

/**
 * GET /guild-count
 */
export function guildCount() {
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
