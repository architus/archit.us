import { consume, map } from "Utility";
import { combineReducers, Reducer as ReduxReducer, AnyAction } from "redux";
import { StoreSlice, StoreSliceState, Action } from "Store/types";

// ? ====================
// ? Slice configuration
// ? ====================

import { default as session, Session } from "./session";

const _storeKeys = <const>["session"];
type _Store = {
  session: Session;
};
const slices: Record<StoreKey, StoreSlice<Store[StoreKey]>> = {
  session
};

// ? ====================
// ? Slice aggregation
// ? ====================

/**
 * Represents the overall store object of the application
 */
export type Store = _Store;
export type StoreKey = typeof _storeKeys[number];
export const reducer: ReduxReducer<Store, Action> = combineReducers(
  map<
    StoreSlice<StoreSliceState>,
    ReduxReducer<StoreSliceState | undefined>,
    StoreKey
  >(slices, (slice: StoreSlice<StoreSliceState>) => {
    const safeReducer: ReduxReducer<StoreSliceState | undefined, Action> = (
      state = consume(slice.initial),
      action: Action
    ) => slice.reducer(state, action);
    return safeReducer as ReduxReducer<StoreSliceState | undefined, AnyAction>;
  })
);

export const initial: Store = map<
  StoreSlice<StoreSliceState>,
  StoreSliceState,
  StoreKey
>(slices, (slice: StoreSlice<StoreSliceState>) => consume(slice.initial));
