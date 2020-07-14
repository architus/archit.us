import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import shallowEqual from "shallow-equals";

/**
 * Runs an effect hook once, simulating `componentDidMount`/`componentWillUnmount`
 * @param effectFunc - same as `useEffect(effectFunc)`
 */
export function useEffectOnce(effectFunc: () => void | (() => void)): void {
  useEffect(effectFunc, []);
}

/**
 * Returns true only if the current render
 * (useful for ensuring SSR/client hydration symmetry).
 * *Will cause a re-render after initial render*
 */
export function useInitialRender(): boolean {
  const [isInitial, setIsInitial] = useState(true);
  useEffectOnce(() => setIsInitial(false));
  return isInitial;
}

/**
 * Attempts to stabilize a value by using its last-supplied value if
 * the current and previous values are shallowly equal
 * @param value - Current value
 */
export function useShallowStability<T>(value: T): T {
  const prevRef = useRef<{ prev: T }>({ prev: value });
  if (shallowEqual(prevRef.current.prev, value)) {
    return prevRef.current.prev;
  }

  return value;
}

/**
 * Executes media queries.
 * From https://usehooks.com/useMedia/
 * @param queries - List of query strings
 * @param values - List of matching values
 * @param defaultValue - Default value to use if none match
 */
export function useMedia<T>(
  queries: string[],
  values: T[],
  defaultValue: T
): T {
  const memoizedQueries = useShallowStability(queries);
  const memoizedValues = useShallowStability(values);

  // Array containing a media query list for each query
  const mediaQueryLists = useMemo(
    () =>
      memoizedQueries.map((q) =>
        typeof window === "undefined"
          ? {
              matches: false,
              addListener: (): null => null,
              removeListener: (): null => null,
            }
          : window.matchMedia(q)
      ),
    [memoizedQueries]
  );

  // Function that gets value based on matching media query
  const getValue = useCallback((): T => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    // Return related value or defaultValue if none
    return typeof memoizedValues[index] !== "undefined"
      ? memoizedValues[index]
      : defaultValue;
  }, [defaultValue, memoizedValues, mediaQueryLists]);

  // State and setter for matched value
  const [value, setValue] = useState(getValue);

  useEffect(() => {
    // Event listener callback
    // Note: By defining getValue outside of useEffect we ensure that it has ...
    // ... current values of hook args (as this hook callback is created once on mount).
    const handler = (): void => setValue(getValue);
    // Set a listener for each media query with above handler as callback.
    mediaQueryLists.forEach((mql) => mql.addListener(handler));
    // Remove listeners on cleanup
    return (): void =>
      mediaQueryLists.forEach((mql) => mql.removeListener(handler));
  }, [getValue, mediaQueryLists]);

  return value;
}

/**
 * Uses the previous value of a given value
 * From https://usehooks.com/usePrevious/
 * @param queries - List of query strings
 * @param values - List of matching values
 * @param defaultValue - Default value to use if none match
 */
export function usePrevious<T>(value: T): T | undefined {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T | undefined>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
