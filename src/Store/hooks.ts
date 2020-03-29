import {
  useSelector as useRawSelector,
  useDispatch as useRawDispatch,
  TypedUseSelectorHook
} from "react-redux";
import { Store, Dispatch } from "Store";

/**
 * Typed useSelector hook that is aware of the root store state shape
 */
export const useSelector: TypedUseSelectorHook<Store> = useRawSelector;

/**
 * Typed useDispatch hook that is aware of the dispatch arguments
 */
export function useDispatch(): Dispatch {
  return useRawDispatch();
}
