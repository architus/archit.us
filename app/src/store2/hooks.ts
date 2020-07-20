import {
  useSelector as useRawSelector,
  useDispatch as useRawDispatch,
  TypedUseSelectorHook,
} from "react-redux";

import { Store, Dispatch } from "@app/store";
import { isDefined } from "@app/utility";

/**
 * Typed useSelector hook that is aware of the root store state shape
 */
// Attempt to load the useSelector wrapper from the window in development if it exists
export const useSelector: TypedUseSelectorHook<Store> =
  typeof window !== "undefined" &&
  process.env.ENABLE_PROFILING === "true" &&
  isDefined(((window as unknown) as { useSelector: unknown }).useSelector)
    ? ((window as unknown) as { useSelector: TypedUseSelectorHook<Store> })
        .useSelector
    : useRawSelector;

/**
 * Typed useDispatch hook that is aware of the dispatch arguments
 */
export function useDispatch(): Dispatch {
  return useRawDispatch();
}
