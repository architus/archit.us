import { Guild } from "Utility";

export type PoolBacking = {
  guilds: Guild;
};

export type PoolType = keyof PoolBacking;
