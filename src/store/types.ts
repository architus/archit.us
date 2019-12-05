import { Supplier } from "Utility/types";
import { SessionAction } from "Store/reducers/session";
import { NotificationAction } from "Store/reducers/notifications";
import { AnyAction } from "redux";

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
export type AuthAction = never;
export type Action = AuthAction | SessionAction | NotificationAction;

export type ActionFactory<A extends Action, P> = (props: P) => A;
export type AuthActionFactory<A extends AuthAction, P> = (
  authToken: string,
  props: P
) => A;
