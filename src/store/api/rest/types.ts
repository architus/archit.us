import { TToken, TUser } from "Utility/types";
import * as t from "io-ts";

export type TokenExchangeResponse = t.TypeOf<typeof TTokenExchangeResponse>;
export const TTokenExchangeResponse = t.interface({
  user: TUser,
  token: TToken
});
