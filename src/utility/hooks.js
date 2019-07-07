import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { log } from "./misc";

export function useReturnQuery() {
  if (process.env.PRODUCTION_URL) {
    return "";
  } else {
    const [returnQuery, setReturnQuery] = useState("");
    useEffect(() => {
      if (returnQuery === "") {
        setReturnQuery(
          `return=${encodeURIComponent(
            `${window.location.protocol}//${window.location.host}/app`
          )}`
        );
      }
    }, []);
    return returnQuery;
  }
}

export function useAuthDispatch(action) {
  const isAuthenticated = useSelector(state => state.session.authenticated);
  const authToken = useSelector(state => state.session.authToken);
  const dispatch = useDispatch();
  if (!isAuthenticated) {
    return () =>
      log("Authenticated dispatch attempted without valid auth session");
  } else {
    return (...args) => dispatch(action(authToken, ...args));
  }
}
