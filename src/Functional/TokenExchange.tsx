import React, { useEffect } from "react";
import { tokenExchange } from "Store/actions";
import { useSelector, useDispatch } from "Utility";
import { Some, Option, None } from "Utility/option";
import { Store } from "Store/slices";

function getAuthCode(store: Store): Option<string> {
  const { session } = store;
  if (session.state === "connected") return Some(session.discordAuthCode);
  return None;
}

/**
 * Initiates a token exchange with the Architus API upon rendering if
 * the session is in the `"connected"` stage
 *
 * @remarks
 * For more information on the auth pathway, see
 * {@link https://docs.archit.us/internal/api-reference/auth/ | the Architus docs}
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
  }, [authCode, dispatch, state]);
  return null;
};
