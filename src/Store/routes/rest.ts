import { User, Access, Guild } from "Utility/types";
import * as t from "io-ts";
import { makeRoute } from "Store/api/rest";
import { Errors } from "Store/api/rest/types";
import { Either, either } from "fp-ts/lib/Either";
import { HttpVerbs } from "Utility";

export type IdentifySessionResponse = t.TypeOf<typeof IdentifySessionResponse>;
export const IdentifySessionResponse = t.interface({
  user: User,
  access: Access
});

/**
 * GET /session/identify
 */
export const identify = makeRoute()({
  label: "session/identify",
  route: "/session/identify",
  method: HttpVerbs.GET,
  auth: true,
  decode: (response: unknown): Either<Errors, IdentifySessionResponse> =>
    either.chain(t.object.decode(response), IdentifySessionResponse.decode)
});

export type TokenExchangeResponse = t.TypeOf<typeof TokenExchangeResponse>;
export const TokenExchangeResponse = t.interface({
  user: User,
  access: Access,
  gatewayNonce: t.number
});

/**
 * POST /session/token-exchange
 */
export const tokenExchange = makeRoute<{ code: string }>()({
  label: "session/tokenExchange",
  route: "/session/token-exchange ",
  method: HttpVerbs.POST,
  auth: true,
  decode: (response: unknown): Either<Errors, TokenExchangeResponse> =>
    either.chain(t.object.decode(response), TokenExchangeResponse.decode)
});

export type SessionRefreshResponse = t.TypeOf<typeof SessionRefreshResponse>;
export const SessionRefreshResponse = t.interface({
  access: Access
});

/**
 * POST /session/refresh
 */
export const sessionRefresh = makeRoute()({
  label: "session/refresh",
  route: "/session/refresh",
  method: HttpVerbs.POST,
  auth: true,
  decode: (response: unknown): Either<Errors, SessionRefreshResponse> =>
    either.chain(t.object.decode(response), SessionRefreshResponse.decode)
});

/**
 * POST /session/end
 */
export const sessionEnd = makeRoute()({
  label: "session/end",
  route: "/session/end",
  method: HttpVerbs.POST,
  auth: true
});

export type GuildCountLoadResponse = t.TypeOf<typeof GuildCountLoadResponse>;
export const GuildCountLoadResponse = t.interface({
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
    either.chain(t.object.decode(response), GuildCountLoadResponse.decode)
});

export type GuildsListResponse = t.TypeOf<typeof GuildsListResponse>;
export const GuildsListResponse = t.interface({
  guilds: t.array(Guild)
});

/**
 * GET /guilds
 */
export const guilds = makeRoute()({
  label: "general/guilds",
  route: "/guilds",
  method: HttpVerbs.GET,
  auth: true,
  decode: (response: unknown): Either<Errors, GuildsListResponse> =>
    either.chain(t.object.decode(response), GuildsListResponse.decode)
});
