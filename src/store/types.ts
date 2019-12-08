import { Supplier } from "Utility/types";
import { AnyAction } from "redux";
import { Store as _Store } from "Store/slices";

import { SessionAction, NotificationAction } from "Store/actions";
import { RestStatusAction, RestDispatchAction } from "Store/api/rest/actions";

/**
 * Represents the overall store object of the application
 */
export type Store = _Store;
export type Reducer<S extends StoreSliceState> = (
  state: S,
  action: Action
) => S;
export type StoreSliceState = any;
export interface StoreSlice<S extends StoreSliceState> {
  initial: S | Supplier<S>;
  reducer: (old: S, action: Action) => S;
}

// ? ====================
// ? Action types
// ? ====================

export interface ActionBase<T, N> extends AnyAction {
  readonly type: T;
  readonly namespace: N;
}
export type Action =
  | SessionAction
  | NotificationAction
  | RestStatusAction
  | RestDispatchAction<any>;

export type ActionFactory<A extends Action, P extends any[]> = (
  ...props: P
) => A;
