import { createSelector } from "reselect";
import { LOAD_GUILDS } from "../actions";

export const initial = {
  guildList: [],
  hasLoaded: false
};

export function reducer(state = initial, action) {
  switch (action.type) {
    case LOAD_GUILDS:
      const { guildList } = action.payload;
      return {
        ...state,
        guildList,
        hasLoaded: true
      };

    default:
      return state;
  }
}

const getGuildList = state => state.guilds.guildList;

export const getAutbotGuilds = createSelector(
  [getGuildList],
  guildList => guildList.filter(guild => guild.has_autbot)
);
