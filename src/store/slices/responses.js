import { sessionAware } from "./session";
import { isDefined } from "Utility";
import {
  LOAD_RESPONSES,
  LOCAL_ADD_RESPONSE,
  LOCAL_EDIT_RESPONSE,
  LOCAL_DELETE_RESPONSE
} from "store/actions";

export const initial = {
  commands: {},
  authors: {}
};

export const reducer = sessionAware(initial, (state, action) => {
  switch (action.type) {
    case LOAD_RESPONSES: {
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
    }

    case LOCAL_ADD_RESPONSE: {
      const {
        guildId,
        response: { response, trigger },
        session: { username, id, discriminator, avatar }
      } = action.payload;
      // Determine if the current user is a new author
      const hasAuthor = state.authors[guildId].hasOwnProperty(id);
      let authorsAddendum;
      if (!hasAuthor)
        authorsAddendum = { [id]: { name: username, avatar, discriminator } };
      return {
        ...state,
        commands: {
          ...state.commands,
          [guildId]: [
            ...state.commands[guildId],
            {
              response,
              trigger,
              count: 0,
              author_id: id
            }
          ]
        },
        authors: isDefined(authorsAddendum)
          ? {
              ...state.authors,
              [guildId]: {
                ...state.authors[guildId],
                ...authorsAddendum
              }
            }
          : state.authors
      };
    }

    case LOCAL_EDIT_RESPONSE: {
      const { guildId, response, key, newValue } = action.payload;
      return {
        ...state,
        commands: {
          ...state.commands,
          [guildId]: state.commands[guildId].map(r =>
            r.trigger === response.trigger ? { ...r, [key]: newValue } : r
          )
        }
      };
    }

    case LOCAL_DELETE_RESPONSE: {
      const { guildId, response } = action.payload;
      return {
        ...state,
        commands: {
          ...state.commands,
          [guildId]: state.commands[guildId].filter(
            r => r.trigger !== response.trigger
          )
        }
      };
    }

    default:
      return state;
  }
});
