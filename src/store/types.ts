import { Supplier } from "Utility/types";
import { SessionAction } from "Store/reducers/session";

export interface Store {}
export type Reducer<S extends StoreSliceState> = (state: S, action: Action) => S;
export type StoreSliceState = Record<string, any>;
export interface StoreSlice<S extends StoreSliceState> {
  initial: S | Supplier<S>;
  reducer: (old: S, action: Action) => S;
}

// ? ====================
// ? Action types
// ? ====================

interface ActionSeven {
  readonly namespace: "some garbage action";
  readonly type: "some garbage action 2";
}

export type AuthAction = never;
export type Action = AuthAction | SessionAction | ActionSeven;

export type ActionFactory<A extends Action, P> = (props: P) => A;
export type AuthActionFactory<A extends AuthAction, P> = (
  authToken: string,
  props: P
) => A;
