import React from "react";
import { Button, ButtonProps } from "react-bootstrap";

import Icon from "@app/components/Icon";
import { Link as RouterLink } from "@app/components/Router";
import { useSessionStatus } from "@app/store/slices/session";
import {
  useReturnQuery,
  API_BASE,
  processIfNotEmptyOrNil,
  isDefined,
  withBasePath,
} from "@app/utility";

import "./style.scss";

export function useOauthUrl(): string {
  const returnQuery = useReturnQuery();
  return `${API_BASE}/session/login${processIfNotEmptyOrNil(
    returnQuery,
    (q) => `?${q}`
  )}`;
}

type LoginButtonProps = {
  loggedIn?: boolean;
  showLabel?: boolean;
};

const LoginButton: React.FC<LoginButtonProps> = ({
  loggedIn,
  showLabel = true,
}) => {
  const oauthUrl = useOauthUrl();
  const { isSigningIn } = useSessionStatus();
  const loggedInProp = isDefined(loggedIn) ? loggedIn : isSigningIn;

  return (
    <div className="login-button">
      {loggedInProp ? (
        <>
          {showLabel ? <p className="mb-3">You are already logged in</p> : null}
          <Button to={withBasePath("/app")} as={RouterLink}>
            Go to dashboard
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
