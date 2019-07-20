import { sessionAware } from "./session";
import { LOAD_LOGS } from "../actions";

export const initial = {
  logs: {},
};

export const reducer = sessionAware(initial, (state, action) => {
  switch (action.type) {
    case LOAD_LOGS:
      const { logs, guildId } = action.payload;
      return {
        ...state,
        logs: {
          ...state.logs,
          [guildId]: logs
        }
      };

    default:
      return state;
  }
});
