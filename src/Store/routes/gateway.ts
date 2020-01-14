import { makeGatewayRoute } from "Store/api/gateway";

export type MockUserEvent = {
  guild_id: number;
  message_id: number;
  content?: string;
  added_reactions?: [number, string][];
  removed_reactions?: [number, string][];
  allowed_commands?: string[];
  silent?: boolean;
};

export const mockUserEvent = makeGatewayRoute<MockUserEvent>()({
  event: "mock_user_event",
  elevated: false
});
