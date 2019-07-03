import { createSelector } from "reselect";
import { LOAD_GUILDS, SIGN_OUT } from "../actions";

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

    case SIGN_OUT:
      return initial;

    default:
      return state;
  }
}

const getGuildList = state => state.guilds.guildList;

export const getAutbotGuilds = createSelector(
  [getGuildList],
  guildList => guildList.filter(guild => guild.has_autbot)
);

const MANAGE_SERVERS = 32; // 0x20
export const getDiscordAdminGuilds = createSelector(
  [getGuildList],
  guildList => guildList.filter(guild => guild.permissions & MANAGE_SERVERS)
);
