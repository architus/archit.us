/* eslint-disable @typescript-eslint/camelcase */
import * as t from "io-ts";
import { Either, either } from "fp-ts/lib/Either";
import { makeGatewayEvent } from "Store/api/gateway";

export type MockBotEvent = t.TypeOf<typeof MockBotEvent>;
export const MockBotEvent = t.intersection([
  t.type({
    guild_id: t.number,
    message_id: t.union([t.number, t.null]),
    edit: t.boolean
  }),
  t.partial({
    content: t.string,
    added_reactions: t.array(t.tuple([t.number, t.string]))
  })
]);

export const mockBotEvent = makeGatewayEvent({
  event: "mock_bot_event",
  decode: (response: unknown): Either<t.Errors, MockBotEvent> =>
    either.chain(t.object.decode(response), MockBotEvent.decode)
});
