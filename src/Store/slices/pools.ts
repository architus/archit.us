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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    patchLocal: (state, action: PayloadAction<PatchLocalPayload>): void => {
      const pool: { [key: string]: PoolContent } = state[action.payload.type];
      const { id, ...patch } = action.payload.entity;
      if (id in pool) {
        // Use immer mutations to handle immutable state change
        pool[id] = { ...pool[id], id, ...patch } as typeof pool[string];
      }
    }
  }
});

export const { patchLocal } = slice.actions;
export default slice.reducer;

// ? =================
// ? Selector hooks
// ? =================

interface PoolProvider<T> {
  all: T[];
  isLoaded: boolean;
}

export function usePool<T extends PoolType>(
  type: T,
  options: {
    filter?: (elem: T) => boolean;
  } = {}
): PoolProvider<PoolBacking[T]> {
  // TODO Implement Pool API
  return {
    all: [],
    isLoaded: false
  };
}
