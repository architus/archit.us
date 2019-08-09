import { LOAD_GUILD_COUNT } from "store/actions";

export const initial = {
  guild_count: 0,
  user_count: 0
};

export function reducer(state = initial, action) {
  switch (action.type) {
    case LOAD_GUILD_COUNT:
      const { guild_count, user_count } = action.payload.guildCount;
      return {
        ...state,
        guild_count: guild_count.toLocaleString(),
        user_count: user_count.toLocaleString()
      };

    default:
      return state;
  }
}
