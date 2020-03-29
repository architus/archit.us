import { makeGatewayRoute } from "Store/api/gateway";
import { LogEvents } from "Utility/types";

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
  elevated: false
});
