import React, { useEffect } from "react";
import { tokenExchange } from "Store/actions";
import { useSelector, useDispatch } from "Utility";
import { Some, Option, None } from "Utility/option";
import { Store } from "Store/slices";

function getAuthCode(store: Store): Option<string> {
  const { session } = store;
  if (session.state === "connected") return Some(session.discordAuthCode);
  else return None;
}

/**
 * Initiates a token exchange with the Architus API upon rendering if the session is in
 * the `"connected"` stage
 * @see https://docs.archit.us/internal/api-reference/auth/
 */
export const TokenExchangeInitiator: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const state = useSelector(store => store.session.state);
  const authCode: Option<string> = useSelector(getAuthCode);
  // Perform the token exchange upon sufficient conditions
  useEffect(() => {
    if (state === "connected" && authCode.isDefined()) {
      dispatch(tokenExchange(authCode.get));
    }
  }, [state, authCode.orNull()]);
  return null;
};
