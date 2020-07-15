import { makeGatewayRoute } from "Store/api/gateway";
import { LogEvents, BaseGatewayPacket } from "Utility/types";
import {
  DistributePoolTypes,
  AllPoolTypes,
  SpecificPools,
  AgnosticPools,
} from "Store/slices/pools";

export interface BaseInterpretPayload<T extends number> {
  action: T;
  guildId: number;
  messageId: number;
}

export type ClientInterpretSend = BaseInterpretPayload<
  LogEvents.MessageSend
> & {
  content: string;
  silent: boolean;
  allowedCommands: string[];
};

export type ClientInterpretReact = BaseInterpretPayload<
  LogEvents.ReactionAdd
> & {
  emoji: string;
};

export type ClientInterpretUnreact = BaseInterpretPayload<
  LogEvents.ReactionRemove
> & {
  emoji: string;
};

export type MockUserEvent =
  | ClientInterpretSend
  | ClientInterpretReact
  | ClientInterpretUnreact;
export const mockUserEvent = makeGatewayRoute<MockUserEvent>()({
  event: "mock_user_event",
  elevated: false,
});

export type PoolAllRequest = BaseGatewayPacket & DistributePoolTypes;
export const poolAllRequest = makeGatewayRoute<PoolAllRequest>()({
  event: "pool_all_request",
  elevated: true,
});

export type PoolRequest = BaseGatewayPacket &
  DistributePoolTypes<
    { ids: AllPoolTypes[keyof AgnosticPools]["id"][] },
    { ids: AllPoolTypes[keyof SpecificPools]["id"][] }
  >;
export const poolRequest = makeGatewayRoute<PoolRequest>()({
  event: "pool_request",
  elevated: true,
});
