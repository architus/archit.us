import { makeGatewayRoute } from "Store/api/gateway";

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
