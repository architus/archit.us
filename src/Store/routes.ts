import { TUser, TAccess } from "Utility/types";
import * as t from "io-ts";
import { makeRoute, Errors } from "Store/api/rest";
import { Either, either } from "fp-ts/lib/Either";
import { HttpVerbs } from "Utility";

export type IdentifySessionResponse = t.TypeOf<typeof TIdentifySessionResponse>;
export const TIdentifySessionResponse = t.interface({
  user: TUser,
  access: TAccess
});

/**
 * GET /session/identify
 */
export const identify = makeRoute()({
  label: "session/identify",
  route: "/session/identify",
  method: HttpVerbs.GET,
  decode: (response: unknown): Either<Errors, IdentifySessionResponse> =>
    either.chain(t.object.decode(response), TIdentifySessionResponse.decode)
});

export type TokenExchangeResponse = t.TypeOf<typeof TTokenExchangeResponse>;
export const TTokenExchangeResponse = t.interface({
  user: TUser,
  access: TAccess,
  nonce: t.string
});

/**
 * POST /session/token-exchange
 */
export const tokenExchange = makeRoute<{ code: string }>()({
  label: "session/tokenExchange",
  route: "/session/token-exchange ",
  method: HttpVerbs.POST,
  decode: (response: unknown): Either<Errors, TokenExchangeResponse> =>
    either.chain(t.object.decode(response), TTokenExchangeResponse.decode)
});

export type SessionRefreshResponse = t.TypeOf<typeof TSessionRefreshResponse>;
export const TSessionRefreshResponse = t.interface({
  access: TAccess
});

/**
 * POST /session/refresh
 */
export const refresh = makeRoute()({
  label: "session/refresh",
  route: "/session/refresh",
  method: HttpVerbs.POST,
  decode: (response: unknown): Either<Errors, SessionRefreshResponse> =>
    either.chain(t.object.decode(response), TSessionRefreshResponse.decode)
});

/**
 * POST /session/end
 */
export const sessionEnd = makeRoute()({
  label: "session/end",
  route: "/session/end",
  method: HttpVerbs.POST
});

export type GuildCountLoadResponse = t.TypeOf<typeof TGuildCountLoadResponse>;
export const TGuildCountLoadResponse = t.interface({
  guildCount: t.number,
  userCount: t.number
});

/**
 * GET /guild-count
 */
export const guildCount = makeRoute()({
  label: "general/guildCount",
  route: "/guild-count",
  method: HttpVerbs.GET,
  decode: (response: unknown): Either<Errors, GuildCountLoadResponse> =>
    either.chain(t.object.decode(response), TGuildCountLoadResponse.decode)
});
