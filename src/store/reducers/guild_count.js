import { sessionAware } from "./session";
import { LOAD_GUILD_COUNT } from "../actions";

export const initial = {
  guild_count: 0,
  user_count: 0
};

export const reducer = sessionAware(initial, (state, action) => {
  switch (action.type) {
    case LOAD_GUILD_COUNT:
      const { guild_count, user_count } = action.payload.guildCount;
      return {
        ...state,
        guild_count: guildCount.guild_count.toLocaleString(),
        user_count: guildCount.user_count.toLocaleString(),
      };
    default:
      return state;
  }
});
