import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { useEffect, useMemo, useRef } from "react";

import { useDispatch, useSelector } from "@app/store/hooks";
import { isDefined, shallowEqual, doublyShallowEqual } from "@app/utility";
import {
  Guild,
  User,
  Snowflake,
  Nil,
  AutoResponse,
  HoarFrost,
  Member,
} from "@app/utility/types";
import { Option, None, Some } from "@architus/lib/option";

export type AllPoolTypes = {
  guild: Guild;
  user: User;
  autoResponse: AutoResponse;
  member: Member;
};

// Runtime io-ts types
export const AllPoolTypes = {
  guild: Guild,
  user: User,
  autoResponse: AutoResponse,
  member: Member,
};

export const guildAgnosticPools = ["user", "guild"] as const;
export const guildSpecificPools = ["autoResponse", "member"] as const;
export const allPools: PoolType[] = [
  ...guildAgnosticPools,
  ...guildSpecificPools,
];

export type PoolType = keyof AllPoolTypes;
export type PoolContent = AllPoolTypes[PoolType];
export type Pool<T extends PoolType> = {
  pool: Record<string, AllPoolTypes[T]>;
  // We use a `Record` here instead of an `Array` to allow for fast existence checking
  // and we prefer it over a `Set` to allow for native JSON serialization as a Redux
  // best practice. It is functionally equivalent to a `Set<string>`, however
  nonexistantSet: Record<string, null>;
  // Same reasoning as above
  pressuredIdsSet: Record<string, null>;
  loadingSets: Record<number, string[]>;
  loadingSetsReverse: Record<string, number>;
  allLoading: boolean;
  fullyPopulated: boolean;
};

export type AgnosticPools = {
  [key in typeof guildAgnosticPools[number]]: Pool<key>;
};
export type SpecificPools = {
  [key in typeof guildSpecificPools[number]]: Pool<key>;
};
export type CombinedPools = AgnosticPools & SpecificPools;
export type Pools = {
  agnostic: AgnosticPools;
  specific: Record<string, SpecificPools>;
};

export type DistributePoolTypes<A = {}, S = A> =
  | (A & { type: keyof AgnosticPools })
  | (S & { type: keyof SpecificPools; guildId: Snowflake });
export type MoveToLoadingPayload = {
  requestId: number;
} & DistributePoolTypes<
  { ids: AllPoolTypes[keyof AgnosticPools]["id"][] },
  { ids: AllPoolTypes[keyof SpecificPools]["id"][] }
>;
export type LoadPayload = {
  nonexistant: string[];
  finished: boolean;
  method: "partial" | "full";
  requestId: number;
} & DistributePoolTypes<
  { entities: AllPoolTypes[keyof AgnosticPools][] },
  { entities: AllPoolTypes[keyof SpecificPools][] }
>;
export type ApplyPressurePayload = DistributePoolTypes<
  | { ids: AllPoolTypes[keyof AgnosticPools]["id"][] }
  | { id: AllPoolTypes[keyof AgnosticPools]["id"] },
  | { ids: AllPoolTypes[keyof SpecificPools]["id"][] }
  | { id: AllPoolTypes[keyof SpecificPools]["id"] }
>;
export type ApplyFullPressurePayload = DistributePoolTypes;
export type StartLoadingAllPayload = DistributePoolTypes;

// ? ====================
// ? Reducer exports
// ? ====================

/**
 * Custom type guard used to determine whether the pool type corresponds to a
 * pool that is guild-agnostic
 * @param type - Base pool type
 */
export function isAgnostic(type: PoolType): type is keyof AgnosticPools {
  return guildAgnosticPools.includes(type as keyof AgnosticPools);
}

const initialState: Pools = makeInitialPools();
const slice = createSlice({
  name: "pools",
  initialState,
  reducers: {
    // ? ======================================
    // ? Direct actions (directly modify state)
    // ? ======================================
    // Adds a list of pressured Ids to the debouncing cache, ready to be loaded
    applyPressure: (
      state: Pools,
      action: PayloadAction<ApplyPressurePayload>
    ): void => {
      const { type } = action.payload;
      const { id, ids } = (action.payload as unknown) as {
        id: AllPoolTypes[PoolType]["id"] | undefined;
        ids: AllPoolTypes[PoolType]["id"][] | undefined;
      };
      const effectiveIds = ids ?? (isDefined(id) ? [id] : []);
      const pool = isAgnostic(type)
        ? state.agnostic[type]
        : getSpecificPool(
            state,
            type,
            (action.payload as { guildId: Snowflake }).guildId
          );

      effectiveIds.forEach((i) => {
        pool.pressuredIdsSet[i] = null;
      });
    },
    // Moves the current set of pressured Ids from pending to loading, using
    // the generated SIO request Id to track where they are being loaded from
    moveToLoading: (
      state: Pools,
      action: PayloadAction<MoveToLoadingPayload>
    ): void => {
      const { type, requestId, ids } = action.payload;
      const pool = isAgnostic(type)
        ? state.agnostic[type]
        : getSpecificPool(
            state,
            type,
            (action.payload as { guildId: Snowflake }).guildId
          );
      pool.pressuredIdsSet = {};
      pool.loadingSets[requestId] = ids;
      ids.forEach((id: Snowflake | HoarFrost) => {
        pool.loadingSetsReverse[id] = requestId;
      });
    },
    // Tracks the beginning of loading all entities in a given pool
    startLoadingAll: (
      state: Pools,
      action: PayloadAction<StartLoadingAllPayload>
    ): void => {
      const { type } = action.payload;
      const pool = isAgnostic(type)
        ? state.agnostic[type]
        : getSpecificPool(
            state,
            type,
            (action.payload as { guildId: Snowflake }).guildId
          );
      pool.allLoading = true;
      // Clear the pressured ids to prevent future loading of specific pool entities
      pool.pressuredIdsSet = {};
    },
    // Incrementally load the pool according to the given `requestId`, marking
    // the load as finished if `finished` is true
    load: (state: Pools, action: PayloadAction<LoadPayload>): void => {
      const {
        type,
        entities,
        nonexistant,
        finished,
        method,
        requestId,
      } = action.payload;
      const isPartial = method === "partial";
      const pool = isAgnostic(type)
        ? state.agnostic[type]
        : getSpecificPool(
            state,
            type,
            (action.payload as { guildId: Snowflake }).guildId
          );

      entities.forEach((entity: AllPoolTypes[PoolType]) => {
        pool.pool[entity.id] = entity;
        if (isPartial && entity.id in pool.loadingSetsReverse) {
          delete pool.loadingSetsReverse[entity.id];
        }
      });

      nonexistant.forEach((id) => {
        pool.nonexistantSet[id] = null;
        if (isPartial && id in pool.loadingSetsReverse) {
          delete pool.loadingSetsReverse[id];
        }
      });

      // Clean up the loading state if finished
      if (finished) {
        if (isPartial) {
          const loadedEntities = pool.loadingSets[requestId];
          delete pool.loadingSets[requestId];
          if (isDefined(loadedEntities)) {
            loadedEntities.forEach((id) => {
              if (id in pool.loadingSetsReverse) {
                delete pool.loadingSetsReverse[id];
              }
            });
          }
        } else {
          // Mark the loading as complete
          pool.fullyPopulated = true;
          pool.allLoading = false;
        }
      }
    },
  },
});

export const {
  applyPressure,
  moveToLoading,
  startLoadingAll,
  load,
} = slice.actions;
export default slice.reducer;

export const applyFullPressure = createAction<ApplyFullPressurePayload>(
  "pools/applyFullPressure"
);

/**
 * Initializes an empty pool shape
 */
function initializePool<T extends PoolType = PoolType>(): CombinedPools[T] {
  return {
    pool: {},
    nonexistantSet: {},
    pressuredIdsSet: {},
    loadingSets: {},
    loadingSetsReverse: {},
    allLoading: false,
    fullyPopulated: false,
  };
}

/**
 * Initializes all pools that are guild-agnostic in a single `AgnosticPools`
 * object
 */
function makeGuildAgnosticPools(): AgnosticPools {
  const base = {} as Record<string, unknown>;
  guildAgnosticPools.forEach((k) => {
    base[k] = initializePool();
  });
  return base as AgnosticPools;
}

/**
 * Initializes all pools that are guild-specific (for a single guild) in a
 * `SpecificPools` object
 */
function makeGuildSpecificPools(): SpecificPools {
  const base = {} as Record<string, unknown>;
  guildSpecificPools.forEach((k) => {
    base[k] = initializePool();
  });
  return base as SpecificPools;
}

/**
 * Creates the initial slice state
 */
function makeInitialPools(): Pools {
  return {
    agnostic: makeGuildAgnosticPools(),
    specific: {},
  };
}

/**
 * Extracts the specific pool for the type/guildId from the current slice
 * state, or initializes an empty one if it doesn't exist, then returning it
 * @param state - Current store state
 * @param type - Pool type in question
 * @param guildId - The guild id for the specific pool
 */
function getSpecificPool<T extends keyof SpecificPools>(
  state: Pools,
  type: T,
  guildId: Snowflake
): SpecificPools[T] {
  const pool: SpecificPools | undefined = state.specific[guildId];
  if (isDefined(pool)) {
    return pool[type];
  }

  const newPool = makeGuildSpecificPools();
  state.specific[guildId] = newPool;
  return newPool[type];
}

/**
 * Attempts to extract the specific pool for the type/guildId from the current
 * slice state, or returns undefined if it doesn't exist
 * @param state - Current store state
 * @param type - Pool type in question
 * @param guildId - The guild id for the specific pool
 */
function tryGetSpecificPool<T extends keyof SpecificPools>(
  state: Pools,
  type: T,
  guildId: Snowflake
): SpecificPools[T] | undefined {
  const pool: SpecificPools | undefined = state.specific[guildId];
  if (isDefined(pool)) {
    return pool[type];
  }

  return undefined;
}

/**
 * Extracts the pool for the type/guildId from the current slice state, or initializes
 * an empty one if it doesn't exist, then returning it
 * @param state - Current store state
 * @param type - Pool type in question
 * @param guildId - The optional guild id for the specific pool, or Nil if agnostic
 */
export function getPool<T extends PoolType>(
  state: Pools,
  type: PoolType,
  guildId: Snowflake | Nil
): Pool<T> {
  return isAgnostic(type)
    ? (state.agnostic[type] as Pool<T>)
    : (getSpecificPool(state, type, guildId as Snowflake) as Pool<T>);
}

/**
 * Attempts to extract the pool for the type/guildId from the current slice state,
 * or returns undefined if it doesn't exist
 * @param state - Current store state
 * @param type - Pool type in question
 * @param guildId - The optional guild id for the specific pool, or Nil if agnostic
 */
export function tryGetPool<T extends PoolType>(
  state: Pools,
  type: PoolType,
  guildId: Snowflake | Nil
): Option<Pool<T>> {
  return isAgnostic(type)
    ? (Some(state.agnostic[type]) as Option<Pool<T>>)
    : (Option.from(
        tryGetSpecificPool(state, type, guildId as Snowflake)
      ) as Option<Pool<T>>);
}

// ? =================
// ? Selector hooks
// ? =================

export interface PoolProvider<T extends PoolType> {
  all: AllPoolTypes[T][];
  isLoaded: boolean;
  loading: boolean;
}

type ConditionalGuild<T extends PoolType> = T extends keyof AgnosticPools
  ? {}
  : { guildId: Snowflake };

type PoolFilter<T extends PoolType> = (elem: AllPoolTypes[T]) => boolean;

/**
 * Gets every element in a pool, or starts loading all if the pool is partial/empty.
 * **Note**: this hook will still return the partial pool (with the optional filter applied),
 * even if the entire pool has not been loaded yet.
 *
 * @param type - Pool type to pull from
 * @param options - Options object
 *
 * **Invariant: if `isAgnostic(type) == false`, then guild is defined**
 */
export function usePool<T extends PoolType>(
  options: {
    type: T;
    filter?: PoolFilter<T>;
  } & ConditionalGuild<T>
): PoolProvider<T> {
  // This hook should only update in the following conditions:
  // - upon rising edge of should pressure
  // - when any of the return values change

  const { type, filter } = options;
  const { guildId } = options as { guildId: Snowflake };
  const dispatch = useDispatch();

  // Track whether the current options have pressured
  const hasPressuredRef = useRef(false);
  // Reset the ref's inner value if any of the options change
  useEffect(() => {
    // Apply the reset upon the cleanup call of useEffect
    return (): void => {
      hasPressuredRef.current = false;
    };
  }, [type, guildId]);

  // Extract the relevant state from the store
  // (make sure to only return what should cause a re-render)
  const selectorResults = useSelector((store) => {
    // Extract the overall entity pool of interest
    const pool: Pool<T> | undefined = isAgnostic(type)
      ? (store.pools.agnostic[type] as Pool<T>)
      : (tryGetSpecificPool(
          store.pools,
          type as keyof SpecificPools,
          guildId
        ) as Pool<T> | undefined);

    let loading: boolean;
    let isLoaded: boolean;

    let shouldPressure: boolean;
    let all: Record<string, AllPoolTypes[T]> | null;

    if (isDefined(pool)) {
      loading = pool.allLoading;
      isLoaded = pool.fullyPopulated;

      shouldPressure = !(isLoaded || loading);
      all = pool.pool;
    } else {
      // If the pool doesn't exist, then it is completely empty and should be pressured
      loading = false;
      isLoaded = false;

      shouldPressure = true;
      all = null;
    }

    return {
      // OR the should pressure control flag with the closure ref to prevent the output
      // value from changing after pressuring when the `shouldPressure` inner value becomes
      // false (effectively only causes updates on the rising edge of `shouldPressure`)
      shouldBePressured: shouldPressure || hasPressuredRef.current,
      isLoaded,
      loading,
      all,
    };
  }, shallowEqual);
  // Destructure in two steps to prevent shadowing in the inner scope
  const { shouldBePressured, loading, isLoaded, all } = selectorResults;

  // Apply pressure if the pool request cannot be fulfilled
  // (pool doesn't exist or the entire pool hasn't started loading)
  useEffect(() => {
    if (shouldBePressured && !hasPressuredRef.current) {
      hasPressuredRef.current = true;
      dispatch(
        applyFullPressure(
          isAgnostic(type)
            ? { type: type as keyof AgnosticPools }
            : { type: type as keyof SpecificPools, guildId }
        )
      );
    }
  }, [shouldBePressured, hasPressuredRef, type, dispatch, guildId]);

  // Memoize the extraction and filtering of the entities
  const filtered = useMemo(() => {
    const entityMap = isDefined(all) ? all : {};
    let allEntities = Object.values(entityMap);
    if (isDefined(filter)) {
      allEntities = allEntities.filter(
        filter as (elem: typeof entityMap[number]) => boolean
      );
    }
    return allEntities;
  }, [all, filter]);

  return {
    all: filtered,
    loading,
    isLoaded,
  };
}

export interface PoolEntityProvider<T extends PoolType> {
  entity: Option<AllPoolTypes[T]>;
  nonexistant: boolean;
  isLoaded: boolean;
  loading: boolean;
}

/**
 * Gets a single element in a pool
 * @param type - Pool type to pull from
 * @param options - Options object
 *
 * **Invariant: if `isAgnostic(type) == false`, then guild is defined**
 */
export function usePoolEntity<T extends PoolType>(
  options: ConditionalGuild<T> & {
    type: T;
    id: AllPoolTypes[T]["id"];
  }
): PoolEntityProvider<T> {
  // This hook should only update in the following conditions:
  // - upon rising edge of should pressure
  // - when any of the return values change

  const { type, id } = options;
  const { guildId } = options as { guildId: Snowflake };
  const dispatch = useDispatch();

  // Track whether the current options have pressured
  const hasPressuredRef = useRef(false);
  // Reset the ref's inner value if any of the options change
  useEffect(() => {
    // Apply the reset upon the cleanup call of useEffect
    return (): void => {
      hasPressuredRef.current = false;
    };
  }, [type, id, guildId]);

  // Extract the relevant state from the store
  // (make sure to only return what should cause a re-render)
  const selectorResults = useSelector((store) => {
    // Extract the overall entity pool of interest
    const pool: Pool<T> | undefined = isAgnostic(type)
      ? (store.pools.agnostic[type] as Pool<T>)
      : (tryGetSpecificPool(
          store.pools,
          type as keyof SpecificPools,
          guildId
        ) as Pool<T> | undefined);

    let pressured: boolean;
    let loading: boolean;
    let nonexistant: boolean;
    let isLoaded: boolean;

    let shouldPressure: boolean;
    let entity: AllPoolTypes[T] | Nil;

    if (isDefined(pool)) {
      const {
        allLoading,
        fullyPopulated,
        loadingSetsReverse,
        pressuredIdsSet,
        pool: entityPool,
        nonexistantSet,
      } = pool;

      pressured = id in pressuredIdsSet;
      loading = allLoading || id in loadingSetsReverse;
      nonexistant =
        id in nonexistantSet || (fullyPopulated && !(id in entityPool));
      isLoaded = id in entityPool || nonexistant;

      shouldPressure = !(isLoaded || pressured || loading);
      entity = entityPool[id];
    } else {
      // If the pool doesn't exist, then it is completely empty and should be pressured
      pressured = false;
      loading = false;
      nonexistant = false;
      isLoaded = false;

      shouldPressure = true;
      entity = null;
    }

    return {
      // OR the should pressure control flag with the closure ref to prevent the output
      // value from changing after pressuring when the `shouldPressure` inner value becomes
      // false (effectively only causes updates on the rising edge of `shouldPressure`)
      shouldBePressured: shouldPressure || hasPressuredRef.current,
      nonexistant,
      isLoaded,
      loading,
      entity,
    };
  }, shallowEqual);
  // Destructure in two steps to prevent shadowing in the inner scope
  const {
    shouldBePressured,
    nonexistant,
    loading,
    isLoaded,
    entity,
  } = selectorResults;

  // Apply the conditional pressure application logic
  useEffect(() => {
    if (shouldBePressured && !hasPressuredRef.current) {
      hasPressuredRef.current = true;
      dispatch(
        applyPressure(
          isAgnostic(type)
            ? {
                id: id as AllPoolTypes[keyof AgnosticPools]["id"],
                type: type as keyof AgnosticPools,
              }
            : {
                id: id as AllPoolTypes[keyof SpecificPools]["id"],
                type: type as keyof SpecificPools,
                guildId,
              }
        )
      );
    }
  }, [shouldBePressured, dispatch, type, id, guildId]);

  // Memoize the Option wrapping operation to provide referential stability to the Some() wrapper
  const entityOption = useMemo(() => Option.from(entity), [entity]);

  return {
    entity: entityOption,
    nonexistant,
    isLoaded,
    loading,
  };
}

type AggregatePoolEntityProvider<T extends PoolType> = PoolEntityProvider<T> & {
  id: AllPoolTypes[T]["id"];
};
type ProviderArrayMemoizationCache<T extends PoolType> = Option<
  Array<AggregatePoolEntityProvider<T>>
>;

/**
 * Gets multiple elements from a pool
 * @param type - Pool type to pull from
 * @param options - Options object
 *
 * **Note**: the reference for `ids` **should be referentially stable**, otherwise the internal
 * logic of the hook will cause repeated pressuring of the inner ids
 *
 * **Invariant: if `isAgnostic(type) == false`, then guild is defined**
 */
export function usePoolEntities<T extends PoolType>(
  options: {
    type: T;
    ids: AllPoolTypes[T]["id"][];
  } & ConditionalGuild<T>
): AggregatePoolEntityProvider<T>[] {
  // This hook should only update in the following conditions:
  // - upon rising edge of should pressure
  // - when any of the return values change

  const { type, ids } = options;
  const { guildId } = options as { guildId: Snowflake };
  const dispatch = useDispatch();

  // Track whether the current options have pressured
  const hasPressuredRef = useRef(false);
  // Reset the ref's inner value if any of the options change
  useEffect(() => {
    // Apply the reset upon the cleanup call of useEffect
    return (): void => {
      hasPressuredRef.current = false;
    };
  }, [type, ids, guildId]);

  // Use a ref with inner mutability to pass additional values out of the selector
  // without forcing a re-render on store change
  const toPressureIdsRef = useRef<string[]>([]);

  // Extract the relevant state from the store
  // (make sure to only return what should cause a re-render)
  const selectorResults = useSelector((store) => {
    // Extract the overall entity pool of interest
    const pool: Pool<T> | undefined = isAgnostic(type)
      ? (store.pools.agnostic[type] as Pool<T>)
      : (tryGetSpecificPool(
          store.pools,
          type as keyof SpecificPools,
          guildId
        ) as Pool<T> | undefined);

    let loadingIds: Set<AllPoolTypes[T]["id"]>;
    let nonexistantIds: Set<AllPoolTypes[T]["id"]>;
    let isLoadedIds: Set<AllPoolTypes[T]["id"]>;

    let entities: (AllPoolTypes[T] | Nil)[];
    let toPressure: AllPoolTypes[T]["id"][];

    if (isDefined(pool)) {
      const {
        allLoading,
        fullyPopulated,
        loadingSetsReverse,
        pressuredIdsSet,
        pool: entityPool,
        nonexistantSet,
      } = pool;

      loadingIds = new Set(
        ids.filter((id) => allLoading || id in loadingSetsReverse)
      );
      nonexistantIds = new Set(
        ids.filter(
          (id) =>
            id in nonexistantSet || (fullyPopulated && !(id in entityPool))
        )
      );
      isLoadedIds = new Set(
        ids.filter((id) => id in entityPool || id in nonexistantIds)
      );

      entities = ids.map((id) => entityPool[id]);
      toPressure = ids.filter(
        (id) =>
          !(id in loadingIds || id in isLoadedIds || id in pressuredIdsSet)
      );
    } else {
      // If the pool doesn't exist, then it is completely empty and should be pressured
      loadingIds = new Set();
      nonexistantIds = new Set();
      isLoadedIds = new Set();

      entities = Array(ids.length).fill(null);
      toPressure = ids;
    }

    // Pass the pressure ids out
    toPressureIdsRef.current = toPressure;

    return {
      // OR the should pressure control flag with the closure ref to prevent the output
      // value from changing after pressuring when the `shouldPressure` inner value becomes
      // false (effectively only causes updates on the rising edge of `shouldPressure`)
      shouldBePressured: toPressure.length > 0 || hasPressuredRef.current,
      loadingIds,
      nonexistantIds,
      isLoadedIds,
      entities,
    };
  }, doublyShallowEqual);
  // Destructure in two steps to prevent shadowing in the inner scope
  const {
    shouldBePressured,
    loadingIds,
    nonexistantIds,
    isLoadedIds,
    entities,
  } = selectorResults;

  // Apply the conditional pressure application logic
  useEffect(() => {
    if (shouldBePressured && !hasPressuredRef.current) {
      hasPressuredRef.current = true;
      const toPressure = toPressureIdsRef.current;
      dispatch(
        applyPressure(
          isAgnostic(type)
            ? {
                ids: toPressure as AllPoolTypes[keyof AgnosticPools]["id"][],
                type: type as keyof AgnosticPools,
              }
            : {
                ids: toPressure as AllPoolTypes[keyof SpecificPools]["id"][],
                type: type as keyof SpecificPools,
                guildId,
              }
        )
      );
    }
  }, [shouldBePressured, toPressureIdsRef, dispatch, type, guildId]);

  // Store the array of previous values to potentially memoize if applicable
  const previousProvidersRef = useRef<ProviderArrayMemoizationCache<T>>(None);
  const providers = ids.map((id, index) => {
    const newProvider: AggregatePoolEntityProvider<T> = {
      id,
      loading: loadingIds.has(id),
      nonexistant: nonexistantIds.has(id),
      isLoaded: isLoadedIds.has(id),
      entity: Option.from(entities[index]),
    };

    // Return the previous provider if it's the same
    return previousProvidersRef.current.isDefined() &&
      shallowEqual(previousProvidersRef.current.get[index], newProvider)
      ? previousProvidersRef.current.get[index]
      : newProvider;
  });

  // Return the entire old providers array if every element is the same
  // (effectively ensures the same array is returned if there are no changes)
  return previousProvidersRef.current.isDefined() &&
    shallowEqual(previousProvidersRef.current.get, providers)
    ? previousProvidersRef.current.get
    : providers;
}
