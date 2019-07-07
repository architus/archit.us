import { sessionAware } from "./session";
import { LOAD_RESPONSES } from "../actions";

export const initial = {
  commands: {},
  authors: {}
};

export const reducer = sessionAware(initial, (state, action) => {
  switch (action.type) {
    case LOAD_RESPONSES:
      const { commands, authors, guildId } = action.payload;
      return {
        ...state,
        commands: {
          ...state.commands,
          [guildId]: commands
        },
        authors: {
          ...state.authors,
          [guildId]: authors
        }
      };

    default:
      return state;
  }
});
