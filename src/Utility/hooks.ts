import { useState, useEffect, useMemo, useCallback } from "react";
import {
  useSelector as useRawSelector,
  useDispatch as useRawDispatch,
  TypedUseSelectorHook
} from "react-redux";
import { globalHistory, History } from "@reach/router";
import { Store, Dispatch } from "Store/types";
import { addMissingUnit, collator } from "./primitives";
import { isClient, isProduction } from "./document";
import { Option, Some, None } from "./option";
import { PoolType, PoolBacking } from "Store/slices/pools";

/**
 * Gets the optional encoded return query param if not in production mode (where the
 * return URL is automatically the production URL)
 *
 * **Note: Causes a re-render due to `useEffectOnce`**
 */
export function useReturnQuery(): string {
  const [returnQuery, setReturnQuery] = useState<string>("");
  useEffectOnce(() => {
    if (!isProduction && returnQuery === "") {
      const returnUrl = `${window.location.protocol}//${window.location.host}/app`;
      const encoded = encodeURIComponent(returnUrl);
      setReturnQuery(`return=${encoded}`);
    }
  });
  return returnQuery;
}

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

/**
 * Conditionally invokes a calculation function depending on the current execution
 * context
 * @param calculate - The callback function that supplies the value on the client
 * @param defaultValue - The default fallback value used on the server
 */
export function useClientSide<A>(calculate: () => A, defaultValue: A): A {
  return isClient ? defaultValue : calculate();
}

/**
 * Finds the active breakpoint from an array such that it is the greatest breakpoint where
 * the width of the viewport is greater than it.
 * @param breakpoints - List of breakpoints to use to match the width onto
 * @returns the value of the current min-width breakpoint from the given breakpoints
 * array, or None if none are active
 */
export function useMediaBreakpoints(breakpoints: string[]): Option<string> {
  const sortedBreakpoints: string[] = useMemo(
    () => [...breakpoints].sort(collator.compare),
    [breakpoints]
  );

  const queries = useMemo(
    () =>
      sortedBreakpoints.map<string>(b => `(min-width: ${addMissingUnit(b)})`),
    [sortedBreakpoints]
  );

  const getActive = useCallback(
    (matches: boolean[]) => {
      // Find first media query that fails
      const result = matches.findIndex(m => !m);
      // If none fail, then return last breakpoint; else return the last passing
      return result === -1 ? sortedBreakpoints.length - 1 : result - 1;
    },
    [sortedBreakpoints]
  );

  const [state, setState] = useState(
    isClient
      ? (): number =>
          getActive(queries.map<boolean>(q => window.matchMedia(q).matches))
      : -1
  );

  useEffect(() => {
    let mounted = true;
    const mediaQueries = queries.map<MediaQueryList>(q => window.matchMedia(q));
    const onChange = (): void => {
      if (!mounted) {
        return;
      }
      setState(getActive(mediaQueries.map<boolean>(m => m.matches)));
    };

    mediaQueries.forEach(mql => mql.addListener(onChange));
    setState(getActive(mediaQueries.map<boolean>(m => m.matches)));

    return (): void => {
      mounted = false;
      mediaQueries.forEach(mql => mql.removeListener(onChange));
    };
  }, [getActive, queries]);

  return state === -1 ? None : Some(sortedBreakpoints[state]);
}

/**
 * Gets current location from global history as a hook
 *
 * @remarks
 * Sourced from {@link https://github.com/reach/router/issues/203 | reach/router/issues/203}
 * Repository is licensed under MIT
 */
export function useLocation(): {
  location: History["location"];
  navigate: History["navigate"];
} {
  const initialState = {
    location: globalHistory.location,
    navigate: globalHistory.navigate
  };

  const [state, setState] = useState(initialState);
  useEffectOnce(() => {
    const removeListener = globalHistory.listen(params => {
      const { location } = params;
      const newState = { ...initialState, location };
      setState(newState);
    });
    return (): void => {
      removeListener();
    };
  });

  return state;
}

/**
 * Runs an effect hook once, simulating `componentDidMount`/`componentWillUnmount`
 * @param effectFunc - Effect function to run
 */
export function useEffectOnce(effectFunc: React.EffectCallback): void {
  useEffect(effectFunc, []);
}

/**
 * Runs a callback hook once (never recalculates)
 * @param callback - the template callback function
 */
export function useCallbackOnce<T extends (...args: never[]) => unknown>(
  callback: T
): T {
  return useCallback(callback, []);
}

/**
 * Runs a memo hook once (never recalculates)
 * @param callback - the memo calculation function
 */
export function useMemoOnce<A>(calculate: () => A): A {
  return useMemo(calculate, []);
}

/**
 * Returns true only if the current render (useful for ensuring SSR/client
 * hydration symmetry)
 */
export function useInitialRender(): boolean {
  const [isInitial, setIsInitial] = useState(true);
  useEffectOnce(() => setIsInitial(false));
  return isInitial;
}

interface PoolProvider<T> {
  all: T[];
  isLoaded: boolean;
}

export function usePool<T extends PoolType>(
  type: T,
  options: {
    filter: (elem: T) => boolean;
  }
): PoolProvider<PoolBacking[T]> {
  // TODO Implement Pool API
  return {
    all: [],
    isLoaded: false
  };
}
