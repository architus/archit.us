/* eslint-disable @typescript-eslint/camelcase */
import { Either, either } from "fp-ts/lib/Either";
import * as t from "io-ts";

import { makeGatewayEvent } from "@app/store/api/gateway";
import {
  LogEvents,
  BaseGatewayPacket,
  TSnowflake,
  THoarFrost,
  BaseGatewayPacketRx,
} from "@app/utility/types";

export type MockBotEventAction = t.TypeOf<typeof MockBotEventAction>;
export const MockBotEventAction = t.taggedUnion(
  "action",
  [
    t.type({
      action: t.literal(LogEvents.MessageSend),
      messageId: t.number,
      content: t.string,
    }),
    t.type({
      action: t.literal(LogEvents.MessageEdit),
      messageId: t.number,
      content: t.string,
    }),
    t.type({
      action: t.literal(LogEvents.MessageDelete),
      messageId: t.number,
    }),
    t.type({
      action: t.literal(LogEvents.ReactionAdd),
      messageId: t.number,
      emoji: t.string,
    }),
    t.type({
      action: t.literal(LogEvents.ReactionRemove),
      messageId: t.number,
      emoji: t.string,
      targetsUser: t.boolean,
    }),
  ],
  "MockBotEvent"
);

export type MockBotEvent = t.TypeOf<typeof MockBotEvent>;
export const MockBotEvent = t.type({
  guildId: t.number,
  actions: t.array(MockBotEventAction),
});
export const mockBotEvent = makeGatewayEvent({
  event: "mock_bot_event",
  decode: (response: unknown): Either<t.Errors, MockBotEvent> =>
    either.chain(t.object.decode(response), MockBotEvent.decode),
});

export type PoolResponse = t.TypeOf<typeof PoolResponse>;
export const PoolResponse = t.intersection(
  [
    BaseGatewayPacketRx,
    t.type({
      finished: t.boolean,
      // The type union to make this work is impossible without knowing the original "type",
      // and would be annoying to type here and in the pools file (additional elements to the
      // tagged union would need to be added for each new pool type and therefore violate DRY),
      // so we loosely type the following two entries so that we can decode them later in the
      // pools saga
      data: t.array(t.object),
      nonexistent: t.array(t.union([TSnowflake, THoarFrost], "SomeId")),
    }),
  ],
  "PoolResponse"
);
export const poolResponse = makeGatewayEvent({
  event: "pool_response",
  decode: (response: unknown): Either<t.Errors, PoolResponse> =>
    either.chain(t.object.decode(response), PoolResponse.decode),
});
