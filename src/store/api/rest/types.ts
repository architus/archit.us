import { TUser, TAccess } from "Utility/types";
import * as t from "io-ts";

export type TokenExchangeResponse = t.TypeOf<typeof TTokenExchangeResponse>;
export const TTokenExchangeResponse = t.interface({
  user: TUser,
  access: TAccess,
  nonce: t.string
});

export type IdentifySessionResponse = t.TypeOf<typeof TIdentifySessionResponse>;
export const TIdentifySessionResponse = t.interface({
  user: TUser,
  access: TAccess
});

export type GuildCountLoadResponse = t.TypeOf<typeof TGuildCountLoadResponse>;
export const TGuildCountLoadResponse = t.interface({
  guildCount: t.number,
  userCount: t.number
});
