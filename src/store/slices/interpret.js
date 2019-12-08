import { SOCKET } from "store/actions";
import { pick } from "lodash";

export const initial = {
  responseQueue: []
};

export const SLICING_THRESHOLD = 100;
export const SLICED_LENGTH = 5;

export function reducer(state = initial, action) {
  switch (action.type) {
    case SOCKET.MESSAGE:
      const payload = JSON.parse(action.payload.message);
      const newResponse = pick(payload, [
        "content",
        { message_id: "messageId" },
        { guild_id: "guildId" },
        { added_reactions: "addedReactions" },
        { removed_reactions: "removedReactions" },
        "edit"
      ]);
      if (payload._module === "interpret") {
        const responseQueue = state.responseQueue;
        return {
          ...state,
          responseQueue: [
            // If the array has grown to 100, slice off all but the last 5 elements
            ...(responseQueue.length >= SLICING_THRESHOLD
              ? responseQueue.slice(-SLICED_LENGTH)
              : responseQueue),
            newResponse
          ]
        };
      } else return state; // pass

    default:
      return state;
  }
}
