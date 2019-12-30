import { Guild, User, MakeRequired } from "Utility/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PoolBacking = {
  guilds: Guild;
  users: User;
};

export type PoolType = keyof PoolBacking;
export type PoolContent = PoolBacking[PoolType];
export type Pools = {
  [key in PoolType]: { [key: string]: PoolBacking[key] };
};

type DistributeToPatchPayload<U extends PoolType> = U extends any
  ? { type: U; entity: MakeRequired<PoolBacking[U], "id"> }
  : never;
type PatchLocalPayload = DistributeToPatchPayload<PoolType>;

// ? ====================
// ? Reducer exports
// ? ====================

const initialState: Pools = { guilds: {}, users: {} };
const slice = createSlice({
  name: "pools",
  initialState,
  // TODO implement actions
  reducers: {
    patchLocal: (state, action: PayloadAction<PatchLocalPayload>) => {
      const pool: { [key: string]: PoolContent } = state[action.payload.type];
      const { id, ...patch } = action.payload.entity;
      if (id in pool) {
        pool[id] = { ...pool[id], id, ...patch } as typeof pool[string];
      }
    }
  }
});

export const { patchLocal } = slice.actions;
export default slice.reducer;
