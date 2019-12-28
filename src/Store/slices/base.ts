import { consume } from "Utility";
import { Supplier } from "Utility/types";
import { Action, StoreSliceState, Reducer } from "Store/types";
import { SESSION_SIGN_OUT } from "Store/actions";

// ? ==================
// ? Higher order slices
// ? ==================

/**
 * Scopes a reducer to accept a namespaced subset of all possible actions to allow for
 * improved type safety and automatic exhaustive checks
 *
 * @param namespace The namespace to scope the reducer function to. Must be valid for the
 * types of Actions it accepts
 * @param scopedReducer A scoped reducer function that accepts subset of Action
 */
export function scopeReducer<S extends StoreSliceState, A extends Action>(
  namespace: A["namespace"],
  scopedReducer: (state: S, action: A) => S
): Reducer<S> {
  return (state: S, action: Action): S => {
    if (action.namespace === namespace) {
      return scopedReducer(state, action as A);
    } else {
      return state;
    }
  };
}

/**
 * Acts as a middleware for the the reducer to reset its state upon a sign out
 *
 * @param initialState Initial state to use upon logout
 * @param reducer Reducer to apply otherwise
 */
export function sessionAware<S extends StoreSliceState>(
  initialState: S | Supplier<S>,
  reducer: Reducer<S>
): Reducer<S> {
  return (state, action) => {
    if (action.type === SESSION_SIGN_OUT) {
      return consume(initialState);
    } else {
      return reducer(state, action);
    }
  };
}
