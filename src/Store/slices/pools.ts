import { Guild, User, MakeRequired,Emoji } from "Utility/types";
import { Option, None, Some } from "Utility/option";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "Store/hooks";
import { useEffect, useMemo } from "react";
import { isDefined, isNil, entries } from "Utility";


export const poolKeys = ["guilds", "users", "emojis"] as const;
export type PoolBacking = {
  guilds: Guild;
  users: User;
  emojis: Emoji;
};

export type PoolType = keyof PoolBacking & typeof poolKeys[number];
export type PoolContent = PoolBacking[PoolType];
export type Pool<T extends PoolType> = {
  pool: { [key: string]: PoolBacking[T] };
  loading: boolean;
  fullyPopulated: boolean;
};
export type Pools = {
  [key in PoolType]: Pool<key>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DistributeToPatchPayload<U extends PoolType> = U extends unknown
  ? { type: U; entity: MakeRequired<PoolBacking[U], "id"> }
  : never;
type PatchLocalPayload = DistributeToPatchPayload<PoolType>;

type DistributeToPopulatePayload<U extends PoolType> = U extends unknown
  ? { type: U; entities: PoolBacking[U][] }
  : never;
type PopulatePoolPayload = DistributeToPopulatePayload<PoolType>;

type FetchPoolPayload = {
  type: PoolType;
  requiresAuth: boolean;
};

// ? ====================
// ? Reducer exports
// ? ====================

const initialState: Pools = makeInitialPools(poolKeys);
const slice = createSlice({
  name: "pools",
  initialState,
  reducers: {
    fetchPool: (
      state: Pools,
      action: PayloadAction<FetchPoolPayload>
    ): void => {
      // Actual fetching handled by saga
      state[action.payload.type].loading = true;
    },
    populatePool: (
      state: Pools,
      action: PayloadAction<PopulatePoolPayload>
    ): void => {
      // Action is dispatched by saga
      const { type, entities } = action.payload;
      const pool: Pool<PoolType> = state[type];
      for (const entity of entities) {
        pool.pool[entity.id] = entity;
      }
      pool.fullyPopulated = true;
      pool.loading = false;
    },
    patchLocal: (
      state: Pools,
      action: PayloadAction<PatchLocalPayload>
    ): void => {
      const pool: Pool<PoolType> = state[action.payload.type];
      const { id, ...patch } = action.payload.entity;
      if (id in pool) {
        // Use immer mutations to handle immutable state change
        pool.pool[id] = {
          ...pool.pool[id],
          id,
          ...patch,
        } as typeof pool.pool[string];
      }
    },
  },
});

export const { fetchPool, populatePool, patchLocal } = slice.actions;
export default slice.reducer;

function makeInitialPools<T extends PoolType, S extends { [K in T]: Pool<K> }>(
  keys: readonly T[]
): S {
  const obj: S = {} as S;
  for (const k of keys) {
    obj[k] = ({
      pool: {},
      fullyPopulated: false,
      loading: false,
    } as unknown) as S[T];
  }
  return obj;
}

// ? =================
// ? Selector hooks
// ? =================

interface PoolProvider<T> {
  all: T[];
  isLoaded: boolean;
  loading: boolean;
}

/**
 * Gets every element in a pool
 * @param type - Pool type to pull from
 * @param options - Options object
 */
export function usePool<T extends PoolType>(
  type: T,
  options: {
    filter?: (elem: PoolBacking[T]) => boolean;
  } = {}
): PoolProvider<PoolBacking[T]> {
  const { filter } = options;
  const dispatch = useDispatch();
  const pool = (useSelector((store) => store.pools[type]) as unknown) as Pool<
    T
  >;
  useEffect(() => {
    if (!pool.fullyPopulated && !pool.loading) {
      dispatch(fetchPool({ type, requiresAuth: true }));
    }
  }, [pool.fullyPopulated, pool.loading, dispatch, type]);
  const all = useMemo(() => Object.values(pool.pool), [pool.pool]);
  const filtered = useMemo(
    () => (isDefined(filter) ? all.filter(filter) : all),
    [all, filter]
  );

  return {
    all: filtered,
    loading: pool.loading,
    isLoaded: pool.fullyPopulated,
  };
}

interface PoolEntityProvider<T> {
  entity: Option<T>;
  isLoaded: boolean;
  loading: boolean;
}

/**
 * Gets a single element in a pool
 * @param type - Pool type to pull from
 * @param options - Options object
 */
export function usePoolEntity<T extends PoolType>(
  type: T,
  options: {
    filter?: (elem: PoolBacking[T]) => boolean;
  } = {}
): PoolEntityProvider<PoolBacking[T]> {
  const { filter } = options;
  const dispatch = useDispatch();
  const pool = (useSelector((store) => store.pools[type]) as unknown) as Pool<
    T
  >;
  useEffect(() => {
    if (!pool.fullyPopulated && !pool.loading) {
      dispatch(fetchPool({ type, requiresAuth: true }));
    }
  }, [pool.fullyPopulated, pool.loading, dispatch, type]);

  let entity: Option<PoolBacking[T]> = None;
  for (const entry of entries(pool.pool)) {
    if (isNil(filter) || filter(entry[1])) {
      entity = Some(entry[1]);
      break;
    }
  }

  return {
    entity,
    isLoaded: pool.fullyPopulated,
    loading: pool.loading,
  };
}
