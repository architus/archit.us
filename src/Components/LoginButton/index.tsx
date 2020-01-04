import React from "react";
import {
  useReturnQuery,
  API_BASE,
  processIfNotEmptyOrNil,
  isDefined
} from "Utility";
import { useSessionStatus } from "Store/slices/session";
import { Link as RouterLink } from "Components/Router";
import Icon from "Components/Icon";
import { Button, ButtonProps } from "react-bootstrap";
import "./style.scss";

export function useOauthUrl(): string {
  const returnQuery = useReturnQuery();
  return `${API_BASE}/session/login${processIfNotEmptyOrNil(
    returnQuery,
    q => `?${q}`
  )}`;
}

type LoginButtonProps = {
  loggedIn?: boolean;
  showLabel?: boolean;
};

const LoginButton: React.FC<LoginButtonProps> = ({
  loggedIn,
  showLabel = true
}) => {
  const oauthUrl = useOauthUrl();
  const isLoggingIn = useSessionStatus()[1];
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
          <Button
            variant={"discord" as ButtonProps["variant"]}
            href={oauthUrl}
            className="login"
          >
            <Icon name="discord" />
            <span>Connect</span> <span> with Discord</span>
          </Button>
        </>
      )}
    </div>
  );
};

LoginButton.displayName = "LoginButton";

export default LoginButton;
