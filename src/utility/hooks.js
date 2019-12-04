import { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalHistory } from "@reach/router";
import { addMissingUnit, collator } from "./primitives";
import { log } from "./logging";
import { isClient } from "./document";

// ? =============
// ? HOC
// ? =============

// HOC that disables SSR (returns null)
export function clientSide(component) {
  return typeof window === "undefined" ? () => null : component;
}

// ? =============
// ? Hooks
// ? =============

// Gets return query from the window location if not in production
export function useReturnQuery() {
  const [returnQuery, setReturnQuery] = useState("");
  useEffectOnce(() => {
    if (!process.env.PRODUCTION_URL && returnQuery === "") {
      setReturnQuery(
        `return=${encodeURIComponent(
          `${window.location.protocol}//${window.location.host}/app`
        )}`
      );
    }
  });
  return returnQuery;
}

// Curries the react-redux useDispatch hook to include authentication
export function useAuthDispatch(action) {
  const isAuthenticated = useSelector(state => state.session.authenticated);
  const authToken = useSelector(state => state.session.accessToken);
  const dispatch = useDispatch();
  return useCallback(
    (...args) => {
      if (!isAuthenticated)
        log("Authenticated dispatch attempted without valid auth session");
      else dispatch(action(authToken, ...args));
    },
    [dispatch, isAuthenticated, authToken, action]
  );
}

// Calculates a value only on the client, else falls back to a default value
export function useClientSide(calculate, defaultValue) {
  return typeof window === "undefined" ? defaultValue : calculate();
}

// Return index of the current min-width breakpoint from the given breakpoints
// array, or -1 if none are active
export function useMediaBreakpoints(breakpoints) {
  const sortedBreakpoints = useMemo(
    () => [...breakpoints].sort(collator.compare),
    [breakpoints]
  );

  const queries = useMemo(
    () => sortedBreakpoints.map(b => `(min-width: ${addMissingUnit(b)})`),
    [sortedBreakpoints]
  );

  const getBreakpoint = useCallback(
    matches => {
      // Find first media query that fails
      const result = matches.findIndex(m => !m);
      // If none fail, then return last breakpoint; else return the last passing
      return result === -1 ? sortedBreakpoints.length - 1 : result - 1;
    },
    [sortedBreakpoints]
  );

  const [state, setState] = useState(
    isClient
      ? () => getBreakpoint(queries.map(q => window.matchMedia(q).matches))
      : -1
  );

  useEffect(() => {
    let mounted = true;
    const mediaQueries = queries.map(q => window.matchMedia(q));
    const onChange = () => {
      if (!mounted) {
        return;
      }
      setState(getBreakpoint(mediaQueries.map(m => m.matches)));
    };

    mediaQueries.forEach(mql => mql.addListener(onChange));
    setState(getBreakpoint(mediaQueries.map(m => m.matches)));

    return () => {
      mounted = false;
      mediaQueries.forEach(mql => mql.removeListener(onChange));
    };
  }, [getBreakpoint, queries]);

  return state === -1 ? null : sortedBreakpoints[state];
}

// Sourced from reach/router/issues/203
// Repository is licensed under MIT
// https://github.com/reach/router/issues/203

// Gets current location from global history as a hook
export function useLocation() {
  const initialState = {
    location: globalHistory.location,
    navigate: globalHistory.navigate
  };

  const [state, setState] = useState(initialState);
  useEffectOnce(() => {
    const removeListener = globalHistory.listen(params => {
      const { location } = params;
      const newState = Object.assign({}, initialState, { location });
      setState(newState);
    });
    return () => {
      removeListener();
    };
  });

  return state;
}

// Runs an effect hook once, simulating componentDidMount/componentWillUnmount
export function useEffectOnce(effectFunc) {
  useEffect(effectFunc, []);
}

// Runs a callback hook once (never recalculates)
export function useCallbackOnce(callback) {
  return useCallback(callback, []);
}

// Runs a memo hook once (never recalculates)
export function useMemoOnce(calculate) {
  return useMemo(calculate, []);
}

// Returns true only if the current render
// (useful for ensuring SSR/client hydration symmetry)
export function useInitialRender() {
  const [isInitial, setIsInitial] = useState(true);
  useEffectOnce(() => setIsInitial(false));
  return isInitial;
}
