import React from "react";
import PropTypes from "prop-types";
import {
  useReturnQuery,
  API_BASE,
  processIfNotEmptyOrNil,
  isDefined
} from "Utility";
import { useSessionStatus } from "Store/slices/session";

import { Link as RouterLink } from "Components/Router";
import Icon from "Components/Icon";
import { Button } from "react-bootstrap";

import "./style.scss";

export function useOauthUrl() {
  const returnQuery = useReturnQuery();
  console.log(returnQuery);
  return `${API_BASE}/login${processIfNotEmptyOrNil(
    returnQuery,
    q => `?${q}`
  )}`;
}

function LoginButton({ loggedIn, showLabel }) {
  const oauthUrl = useOauthUrl();
  const [_, isLoggingIn] = useSessionStatus();
  const loggedInProp = isDefined(loggedIn) ? loggedIn : isLoggingIn;

  return (
    <div className="login-button">
      {loggedInProp ? (
        <>
          {showLabel ? <p className="mb-3">You are already logged in</p> : null}
          <Button to="/app" as={RouterLink}>
            Get started
          </Button>
        </>
      ) : (
        <>
          {showLabel ? <p>Sign in to add architus to a server.</p> : null}
          <Button variant="discord" href={oauthUrl} className="login">
            <Icon name="discord" />
            <span>Connect</span> <span> with Discord</span>
          </Button>
        </>
      )}
    </div>
  );
}

export default LoginButton;

LoginButton.propTypes = {
  loggedIn: PropTypes.bool,
  showLabel: PropTypes.bool
};

LoginButton.defaultProps = {
  showLabel: true
};

LoginButton.displayName = "LoginButton";
