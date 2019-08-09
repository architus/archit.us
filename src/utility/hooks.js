import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { globalHistory } from "@reach/router";
import { log, addMissingUnit } from "./string";
import { isClient } from "./document";

export function useReturnQuery() {
  if (process.env.PRODUCTION_URL) {
    return "";
  } else {
    const [returnQuery, setReturnQuery] = useState("");
    useEffectOnce(() => {
      if (returnQuery === "") {
        setReturnQuery(
          `return=${encodeURIComponent(
            `${window.location.protocol}//${window.location.host}/app`
          )}`
        );
      }
    });
    return returnQuery;
  }
}

export function useAuthDispatch(action) {
  const isAuthenticated = useSelector(state => state.session.authenticated);
  const authToken = useSelector(state => state.session.accessToken);
  const dispatch = useDispatch();
  if (!isAuthenticated) {
    return () =>
      log("Authenticated dispatch attempted without valid auth session");
  } else {
    return (...args) => dispatch(action(authToken, ...args));
  }
}

export function useClientSide(render) {
  return typeof window === "undefined" ? null : render();
}

export function clientSide(component) {
  return typeof window === "undefined" ? () => null : component;
}

export function useMediaBreakpoints(breakpoints) {
  const collator = useMemo(
    () =>
      new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: "base"
      })
  );
  const sortedBreakpoints = useMemo(
    () => [...breakpoints].sort(collator.compare),
    [breakpoints, collator]
  );
  const queries = sortedBreakpoints.map(
    b => `(min-width: ${addMissingUnit(b)})`
  );
  const getBreakpoint = matches => {
    // Find first media query that fails
    const result = matches.findIndex(m => !m);
    // If none fail, then return last breakpoint; else return the last passing
    return result === -1 ? sortedBreakpoints.length - 1 : result - 1;
  };
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
  }, [sortedBreakpoints]);

  return state === -1 ? null : sortedBreakpoints[state];
}

// Sourced from reach/router/issues/203
// Repository is licensed under MIT
// https://github.com/reach/router/issues/203

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

export function useEffectOnce(effectFunc) {
  useEffect(effectFunc, []);
}

export function useInitialRender() {
  const [isInitial, setIsInitial] = useState(true);
  useEffectOnce(() => setIsInitial(false));
  return isInitial;
}
