import { LOAD_GUILDS } from "../actions";

export const initial = {
  guildList: []
};

export function reducer(state = initial, action) {
  switch (action.type) {
    case LOAD_GUILDS:
      const { guilds } = action.payload;
      return {
        guildList: guilds,
        ...state
      };
    default:
      return state;
  }
}
