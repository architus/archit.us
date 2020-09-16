import { styled } from "linaria/react";
import React from "react";
import { FaDiscord } from "react-icons/fa";

import { Link as RouterLink } from "@app/components/Router";
import { useOauthUrl } from "@app/hooks";
import { useSessionStatus } from "@app/store/slices/session";
import { OtherColors } from "@app/theme/color";
import { isDefined } from "@app/utility";
import Button from "@architus/facade/components/Button";
import { gap } from "@architus/facade/theme/spacing";

const Styled = {
  Outer: styled.div`
    line-height: 1.2;
    padding-top: ${gap.nano};
  `,
  LoggedIn: styled.p`
    margin-bottom: ${gap.nano};
  `,
};

export type LoginPromptProps = {
  loggedIn?: boolean;
  showLabel?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Displays a prompt depending on whether the user is logged in,
 * optionally including a label
 */
const LoginPrompt: React.FC<LoginPromptProps> = ({
  className,
  style,
  loggedIn,
  showLabel = true,
}) => {
  const oauthUrl = useOauthUrl();
  const { isSigningIn } = useSessionStatus();
  const loggedInProp = isDefined(loggedIn) ? loggedIn : isSigningIn;
  return (
    <Styled.Outer className={className} style={style}>
      {loggedInProp ? (
        <>
          {showLabel ? (
            <Styled.LoggedIn>You are already logged in</Styled.LoggedIn>
          ) : null}
          <Button type="solid" variant="primary" to="/app" as={RouterLink}>
            Go to dashboard
          </Button>
        </>
      ) : (
        <>
          {showLabel ? <p>Sign in to add architus to a server.</p> : null}
          <Button
            type="solid"
            color={OtherColors.Discord}
            variant="primary"
            icon={<FaDiscord />}
            href={oauthUrl}
            as="a"
          >
            Connect with Discord
          </Button>
        </>
      )}
    </Styled.Outer>
  );
};

export default LoginPrompt;
