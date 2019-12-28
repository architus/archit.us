import React, { useEffect } from "react";
import { discardNonce, attachListener } from "Store/actions_old";
import { useSelector, useDispatch } from "Utility";
import { Gateway } from "Store/api/gateway/middleware";

/**
 * Initializes the Gateway connection upon authentication loading, optionally using a
 * short-term nonce if the state machine is in this segment
 */
export const GatewayInitializer: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const session = useSelector(store => store.session);
  useEffect(() => {
    if (!Gateway.isInitialized) {
      if (session.state === "gateway") {
        Gateway.authenticate(session.nonce);
        dispatch(discardNonce());
      } else if (
        session.state === "pending" ||
        session.state === "none"
      ) {
        Gateway.initialize();
      }
      dispatch(attachListener(Gateway.onSignOut));
    }
  }, [session]);
  return null;
};
