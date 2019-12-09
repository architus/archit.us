import { consume, mapValues } from "Utility";
import { combineReducers, Reducer as ReduxReducer } from "redux";
import { StoreSlice, StoreSliceState, Action } from "Store/types";

// ? ====================
// ? Slice configuration
// ? ====================

import { default as session, Session } from "./session";
import { default as notifications, Notifications } from "./notifications";
import { default as guildCount, GuildCount } from "./guildCount";

/**
 * Represents the overall store object of the application
 */
export type Store = {
  session: Session;
  notifications: Notifications;
  guildCount: GuildCount;
};
const slices: { [K in StoreKey]: StoreSlice<Store[K]> } = {
  session,
  notifications,
  guildCount
};

// ? ====================
// ? Slice aggregation
// ? ====================

export type StoreKey = keyof Store;
export const reducer: ReduxReducer<Store, Action> = combineReducers(
  mapValues<
    StoreSlice<StoreSliceState>,
    ReduxReducer<StoreSliceState | undefined, Action>,
    StoreKey
  >(slices, (slice: StoreSlice<StoreSliceState>) => {
    const safeReducer: ReduxReducer<StoreSliceState | undefined, Action> = (
      state = consume(slice.initial),
      action: Action
    ) => slice.reducer(state, action);
    return safeReducer;
  })
);

export const initial: Store = mapValues<
  StoreSlice<StoreSliceState>,
  StoreSliceState,
  StoreKey
>(slices, (slice: StoreSlice<StoreSliceState>) => consume(slice.initial));
