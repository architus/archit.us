import {
  fork,
  race,
  take,
  cancel,
  delay,
  call,
  put,
  spawn,
} from "redux-saga/effects";
import { SagaIterator, Task } from "@redux-saga/core";
import {
  allPools,
  PoolType,
  applyPressure,
  applyFullPressure,
  moveToLoading,
  SpecificPools,
  AgnosticPools,
  startLoadingAll,
  DistributePoolTypes,
  tryGetPool,
  load,
  AllPoolTypes,
  LoadPayload,
  MoveToLoadingPayload,
} from "Store/slices/pools";
import { signOut } from "Store/actions";
import { None, Option, Some } from "Utility/option";
import { isDefined, difference } from "Utility";
import {
  generateRequestId,
  gatewayMalformed,
  gatewayConnect,
  gatewayReconnect,
} from "Store/api/gateway";
import { Snowflake, Predicate, Nil } from "Utility/types";
import { Action } from "@reduxjs/toolkit";
import {
  poolAllRequest,
  poolRequest,
  PoolRequest,
  poolResponse,
} from "Store/routes";
import { select } from "Store/saga/utility";
import { isRight } from "fp-ts/lib/Either";
import { Errors } from "io-ts";

// The delay (in ms) for clustering single/multiple Id requests from the hook API
const PRESSURE_TIMEOUT = 200;

/**
 * Creates all pool handlers for each pool key
 */
export default function* pools(): SagaIterator {
  for (const key of allPools) {
    yield fork(createPoolHandler, key);
  }
}

/**
 * Creates a scope action predicate for using in take()
 *
 * Requires an action type that includes a payload with `{ type: PoolType }`
 * once created. The type is compared with the given key
 * @param actionCreator - The action creator with a type field with the action type
 * @param key - The key to scope pool actions to
 */
function scopePoolAction<T extends string>(
  actionCreator: { type: T },
  key: PoolType
): Predicate<Action<T>> {
  return (action): boolean => {
    if (action.type !== actionCreator.type) {
      return false;
    }

    const actionWithPayload = action as Action<T> & {
      payload: { type: PoolType };
    };
    return actionWithPayload?.payload?.type === key;
  };
}

/**
 * Performs an initial connection check before handling pool requests by ensuring
 * that the gateway API is connected, and if not, waits for it to become connected.
 * Additionally, if the gateway is not elevated once it's connected, the generator
 * yields `false` at the end.
 */
function* connectionCheck(): SagaIterator<boolean> {
  const isConnected = yield* select(
    (store) => store.gateway.state === "established"
  );

  if (!isConnected) {
    // Wait until connected to continue with dispatch
    yield race({
      connect: take(gatewayConnect),
      reconnect: take(gatewayReconnect),
    });
  }

  const isElevated = yield* select(
    (store) =>
      store.gateway.state !== "noConnection" && store.gateway.isElevated
  );
  return isElevated;
}

/**
 * Constructs the effective payload shape according to the `DistributePoolTypes`
 * helper conditional type
 * @param key - The pool type used for this request
 * @param guildId - The optional guildId (if specific), or `null`/`undefined`
 */
function constructPayload(
  key: PoolType,
  guildId: Snowflake | Nil
): DistributePoolTypes {
  return isDefined(guildId)
    ? { type: key as keyof SpecificPools, guildId }
    : { type: key as keyof AgnosticPools };
}

function* cancelIfRunning(task: Option<Task> | Task): SagaIterator {
  if (task instanceof Option) {
    if (task.isDefined()) {
      if (task.get.isRunning()) {
        yield cancel(task.get);
      }
    }
  } else if (task.isRunning()) {
    yield cancel(task);
  }
}

type PoolCache<T> = {
  agnostic: Option<T>;
  specific: Map<Snowflake, T>;
};

function createPoolCache<T>(): PoolCache<T> {
  return {
    agnostic: None,
    specific: new Map(),
  };
}

/**
 * Begins the pool handling lifecycle task for the given pool type, yielding on
 * partial/full pressure application and signOut actions forever.
 *
 * The lifecycle employs a timeout for releasing built up pressure in the pool
 * so that multiple, clustered pool requests can be batched and requested from
 * the server over the gateway all at once
 * @param key - the pool type for the handler
 */
function* createPoolHandler(key: PoolType): SagaIterator {
  // We use this cache to track all of the *cancellable* saga tasks that are executing
  // that should be interrupted to apply the debounce algorithm to pressure release
  // subroutines. Note that the cache can go stale once the tasks exit
  // (spawn the uncancellable lifecycle handlers). In that case, the values should be
  // disregarded (effectively empty).
  //
  // We don't need one of these for the full requests because they are not debounced
  // (instead. they proceed directly to connection checks/duplicate checks and then
  // to execution)
  const partialPressureTimeouts: PoolCache<Task> = createPoolCache();

  // The next two caches track the currently executing requests for the current pool type
  // (partial uses a set of Ids that are currently being requested and full uses simply
  // `true` to mark that the full pool request is being executed)
  // We use these caches once the connection checks pass for a ready-to-be executed request
  // to ensure that they don't overlap with a currently executing request. If they do,
  // the request is ignored.
  //
  // Note that the reason we don't simply include these caches in the store is because the
  // creators of redux-saga, in their infinite wisdom, process all tasks in the saga queue
  // before executing any of the reducers. This means that we can't rely on redux (the literal
  // core library all of this is a part of that's sole purpose is to *manage state*) to
  // manage the state of our request loading. Otherwise, batched actions won't be properly
  // guarded against when dispatched simultaneously, and therefore there is no way to prevent
  // duplicate gateway requests without storing the local state here.
  const partialExecutingRequests: PoolCache<Set<string>> = createPoolCache();
  const fullExecutingRequests: PoolCache<boolean> = createPoolCache();

  // ! Use unblocking effects only except for `race` to not miss any actions
  while (true) {
    // We race for both partial and full here so we can eagerly cancel all debounced
    // partial requests once a full request has been made
    const { partial, full, signOutAction } = yield race({
      partial: take(scopePoolAction(applyPressure, key)),
      full: take(scopePoolAction(applyFullPressure, key)),
      signOutAction: take(signOut.type),
    });

    if (isDefined(signOutAction)) {
      // Cancel all running timeouts
      yield call(cancelIfRunning, partialPressureTimeouts.agnostic);
      partialPressureTimeouts.agnostic = None;

      for (const task of partialPressureTimeouts.specific.values()) {
        yield call(cancelIfRunning, task);
      }
      partialPressureTimeouts.specific.clear();

      // Exit execution (pools cannot be loaded while unauthenticated)
      break;
    }

    // Cancel the appropriate timeout if it is running (cancel even for full for the
    // reasons stated above)
    if (isDefined(partial) || isDefined(full)) {
      type ActionIntersection = ReturnType<typeof applyPressure> &
        ReturnType<typeof applyFullPressure>;
      const { payload } = (partial || full) as ActionIntersection;
      const { guildId } = payload as { guildId: Snowflake | undefined };

      if (isDefined(guildId)) {
        const task = partialPressureTimeouts.specific.get(guildId);
        partialPressureTimeouts.specific.delete(guildId);
        yield call(cancelIfRunning, Option.from(task));
      } else {
        yield call(cancelIfRunning, partialPressureTimeouts.agnostic);
        partialPressureTimeouts.agnostic = None;
      }
    }

    // If the request is partial, dispatch the pressure action and start a new
    // timeout
    if (isDefined(partial)) {
      const { payload } = partial as ReturnType<typeof applyPressure>;
      const { guildId } = payload as { guildId: Snowflake | undefined };

      const task = yield fork(
        beginPressureReleaseTimeout,
        key,
        guildId,
        partialExecutingRequests
      );
      if (isDefined(guildId)) {
        partialPressureTimeouts.specific.set(guildId, task);
      } else {
        partialPressureTimeouts.agnostic = Some(task);
      }
    }

    // Else, if the request is full, start the lifecycle immediately
    // (don't use a timeout)
    if (isDefined(full)) {
      const { payload } = full as ReturnType<typeof applyFullPressure>;
      const { guildId } = payload as { guildId: Snowflake | undefined };
      yield fork(handleFullPoolRequest, key, guildId, fullExecutingRequests);
    }
  }
}

/**
 * Begins the pressure release timeout, spawning a new detached task to
 * perform the actual partial pool request at the end.
 * @param key - The pool type used for this request
 * @param guildId - The optional guildId (if specific), or `null`/`undefined`
 */
function* beginPressureReleaseTimeout(
  key: PoolType,
  guildId: Snowflake | Nil,
  executionCache: PoolCache<Set<string>>
): SagaIterator {
  yield delay(PRESSURE_TIMEOUT);
  // Spawn detached saga so the task can't be cancelled anymore
  yield spawn(handlePartialPoolRequest, key, guildId, executionCache);
}

/**
 * Begins the partial pool request flow, occurring after the batching timeout
 * @param key - The pool type used for this request
 * @param guildId - The optional guildId (if specific), or `null`/`undefined`
 */
function* handlePartialPoolRequest(
  key: PoolType,
  guildId: Snowflake | Nil,
  executionCache: PoolCache<Set<string>>
): SagaIterator {
  // Make sure we are connected/elevated before proceeding
  if (!(yield call(connectionCheck))) return;

  // Extract the list of loading Ids for the current request
  const ids = yield* select((store) => {
    const pool = tryGetPool(store.pools, key, guildId);
    return pool.map((p) => p.pressuredIdsSet ?? {}).getOrElse({});
  });

  // Calculate the ids in this request that aren't currently executing
  const idSet = new Set(Object.keys(ids));
  const executingIdSet = isDefined(guildId)
    ? executionCache.specific.get(guildId)
    : executionCache.agnostic.getOrElse(undefined);
  const derivedIdSet = isDefined(executingIdSet)
    ? difference(idSet, executingIdSet)
    : idSet;
  const derivedIds = Array.from(derivedIdSet);

  if (derivedIds.length > 0) {
    // Add the ids to the execution cache
    if (isDefined(executingIdSet)) {
      derivedIds.forEach((id) => executingIdSet.add(id));
    } else {
      const executingIds = new Set(derivedIds);
      if (isDefined(guildId)) {
        executionCache.specific.set(guildId, executingIds);
      } else {
        // eslint-disable-next-line no-param-reassign
        executionCache.agnostic = Some(executingIds);
      }
    }

    const requestId = yield call(generateRequestId);
    // Mark the ids as loading
    yield put(
      moveToLoading({
        ...constructPayload(key, guildId),
        ids: derivedIds,
        requestId,
      } as MoveToLoadingPayload)
    );

    // Dispatch the actual gateway request route
    yield put(
      poolRequest({
        ...constructPayload(key, guildId),
        _id: requestId,
        ids: derivedIds,
      } as PoolRequest)
    );

    // Delegate the loading loop to the common loading code
    yield call(loadLoop, key, guildId, requestId, "partial");

    // Once finished, remove the ids from the execution cache
    const finalExecutingIdsSet = isDefined(guildId)
      ? executionCache.specific.get(guildId)
      : executionCache.agnostic.getOrElse(undefined);
    derivedIds.forEach((id) => {
      finalExecutingIdsSet?.delete(id);
    });
  }
}

/**
 * Begins the full pool request flow, occurring immediately after the full
 * pool pressure application
 * @param key - The pool type used for this request
 * @param guildId - The optional guildId (if specific), or `null`/`undefined`
 */
function* handleFullPoolRequest(
  key: PoolType,
  guildId: Snowflake | Nil,
  executionCache: PoolCache<boolean>
): SagaIterator {
  // Make sure we are connected/elevated before proceeding
  if (!(yield call(connectionCheck))) return;

  // Use the execution cache to make sure the given pool isn't already being loaded
  const isExecuting = !!(isDefined(guildId)
    ? executionCache.specific.get(guildId)
    : executionCache.agnostic.getOrElse(false));
  // Also ensure that the full pool isn't already loaded
  const isLoaded = yield* select((store) => {
    const pool = tryGetPool(store.pools, key, guildId);
    return pool.map((p) => p.fullyPopulated).getOrElse(false);
  });
  if (isExecuting || isLoaded) return;

  // Flag that the current request has started execution in the cache
  if (isDefined(guildId)) {
    executionCache.specific.set(guildId, true);
  } else {
    // eslint-disable-next-line no-param-reassign
    executionCache.agnostic = Some(true);
  }

  const requestId = yield call(generateRequestId);
  // Mark the full pool as
  yield put(startLoadingAll(constructPayload(key, guildId)));
  // Dispatch the actual gateway request route
  yield put(
    poolAllRequest({
      ...constructPayload(key, guildId),
      _id: requestId,
    })
  );

  // Delegate the loading loop to the common loading code
  yield call(loadLoop, key, guildId, requestId, "full");

  // Once finished, remove the pool from the execution cache
  if (isDefined(guildId)) {
    executionCache.specific.delete(guildId);
  } else {
    // eslint-disable-next-line no-param-reassign
    executionCache.agnostic = None;
  }
}

/**
 * Begins the load lifecycle loop for a single pool request, yielding on
 * `take(action => poolResponse.match(action))` until a poolResponse event arrives
 * that is marked as `finished`
 * @param key - The pool type used for this request
 * @param guildId - The optional guildId (if specific), or `null`/`undefined`
 * @param requestId - The original request Id of the pool request gateway route
 * @param method - The method of pool load (`"partial"` or `"full"`); passed to
 * the `load` action factory's payload
 */
function* loadLoop(
  key: PoolType,
  guildId: Snowflake | Nil,
  requestId: number,
  method: "partial" | "full"
): SagaIterator {
  while (true) {
    const { responseEvent, signOutAction } = yield race({
      responseEvent: take(
        (action: Action<unknown>) =>
          poolResponse.match(action) && action.payload.data._id === requestId
      ),
      signOutAction: take(signOut.type),
    });

    if (isDefined(signOutAction)) {
      // Mark the load as finished
      yield put(
        load({
          ...constructPayload(key, guildId),
          finished: true,
          nonexistant: [],
          entities: [],
          method,
          requestId,
        } as LoadPayload)
      );
      break;
    }

    if (isDefined(responseEvent) && poolResponse.match(responseEvent)) {
      const { nonexistant, data, finished } = responseEvent.payload.data;

      // Filter the data by successful decodes
      const runtimeType = AllPoolTypes[key];
      const entities: AllPoolTypes[PoolType][] = [];
      for (const entity of data) {
        const decodeResult = runtimeType.decode(entity);
        if (isRight<Errors, AllPoolTypes[PoolType]>(decodeResult)) {
          entities.push(entity as AllPoolTypes[PoolType]);
        } else {
          yield put(
            gatewayMalformed({
              event: responseEvent.payload.event,
              timestamp: responseEvent.payload.timestamp,
              error: {
                message: `Errors ocurred while parsing pool response`,
                error: decodeResult.toString(),
                original: entity,
              },
            })
          );
        }
      }

      yield put(
        load({
          ...constructPayload(key, guildId),
          nonexistant,
          finished,
          entities,
          method,
          requestId,
        } as LoadPayload)
      );

      // Break the loop if finished
      if (finished) break;
    }
  }
}
