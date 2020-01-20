/* eslint-disable @typescript-eslint/camelcase */
import * as t from "io-ts";
import { Either, either } from "fp-ts/lib/Either";
import { makeGatewayEvent } from "Store/api/gateway";
import { LogEvents } from "Utility/types";

export type MockBotEventAction = t.TypeOf<typeof MockBotEventAction>;
export const MockBotEventAction = t.taggedUnion(
  "action",
  [
    t.type({
      action: t.literal(LogEvents.MessageSend),
      messageId: t.number,
      content: t.string
    }),
    t.type({
      action: t.literal(LogEvents.MessageEdit),
      messageId: t.number,
      content: t.string
    }),
    t.type({
      action: t.literal(LogEvents.MessageDelete),
      messageId: t.number
    }),
    t.type({
      action: t.literal(LogEvents.ReactionAdd),
      messageId: t.number,
      emoji: t.string
    }),
    t.type({
      action: t.literal(LogEvents.ReactionRemove),
      messageId: t.number,
      emoji: t.string,
      targetsUser: t.boolean
    })
  ],
  "MockBotEvent"
);

export type MockBotEvent = t.TypeOf<typeof MockBotEvent>;
export const MockBotEvent = t.type({
  guildId: t.number,
  actions: t.array(MockBotEventAction)
});

export const mockBotEvent = makeGatewayEvent({
  event: "mock_bot_event",
  decode: (response: unknown): Either<t.Errors, MockBotEvent> =>
    either.chain(t.object.decode(response), MockBotEvent.decode)
});
