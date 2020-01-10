import * as t from "io-ts";
import { Either, either } from "fp-ts/lib/Either";
import { makeGatewayEvent, makeGatewayRoute } from "Store/api/gateway";

export type MockUserEvent = {
  guild_id: number;
  content?: string;
  message_id: number;
  added_reactions?: string[];
  removed_reactions?: string[];
  allowed_commands?: string[];
  silent: boolean;
};

export const mockUserEvent = makeGatewayRoute<MockUserEvent>()({
  event: "mock_user_event",
  elevated: false
});

export type MockBotEvent = t.TypeOf<typeof MockBotEvent>;
export const MockBotEvent = t.intersection([
  t.type({
    guild_id: t.number,
    message_id: t.number,
    edit: t.boolean
  }),
  t.partial({
    content: t.string,
    added_reactions: t.array(t.string)
  })
]);

export const mockBotEvent = makeGatewayEvent({
  event: "mock_bot_event",
  decode: (response: unknown): Either<t.Errors, MockBotEvent> =>
    either.chain(t.object.decode(response), MockBotEvent.decode)
});

// Export events/routes for middleware to subscribe appropriately
export const routes = { mockUserEvent };
export const events = { mockBotEvent };
