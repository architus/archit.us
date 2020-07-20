import { SelectEffect } from "@redux-saga/core/effects";
import { select as sagaSelect } from "redux-saga/effects";

import { Store } from "@app/store";

/**
 * Same as `redux-saga/effects.select(selector)`, but automatically types
 * correctly based on the overall Store shape
 * @param selector - Selector function
 */
export function* select<T>(
  selector: (store: Store) => T
): Generator<SelectEffect, T> {
  const store = yield sagaSelect(selector);
  return store as T;
}
