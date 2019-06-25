import { SOCKET } from "../actions";
import { pick } from "../../util";

export const initial = {
  responseQueue: []
};

export function reducer(state = initial, action) {
  switch (action.type) {
    case SOCKET.MESSAGE:
      const payload = JSON.parse(action.payload.message);
      if (payload._module === "interpret") {
        return {
          ...state,
          responseQueue: [
            ...state.responseQueue,
            pick(payload, [
              "content",
              "reactions",
              { message_id: "messageId" },
              { guild_id: "guildId" }
            ])
          ]
        };
      } else return state; // pass

    default:
      return state;
  }
}
