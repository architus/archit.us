import { useDown, Box } from "@xstyled/emotion";
import React from "react";
import { Dropdown } from "react-bootstrap";

import AutoLink from "@app/components/AutoLink";
import Icon from "@app/components/Icon";
import { useOauthUrl } from "@app/components/LoginButton";
import UserDisplay from "@app/components/UserDisplay";
import { useDispatch } from "@app/store";
import { signOut } from "@app/store/actions";
import { useCurrentUser, useSessionStatus } from "@app/store/slices/session";
import { Breakpoint } from "@app/theme";
import { useLocation, withBasePath } from "@app/utility";
import { Option } from "@app/utility/option";
import { User } from "@app/utility/types";
import "./style.scss";

const SessionControl: React.FC = React.memo(() => {
  const user: Option<User> = useCurrentUser();
  const { isSigningIn } = useSessionStatus();
  const dispatch = useDispatch();
  const oauthUrl = useOauthUrl();
  const isSmallScreen = useDown(Breakpoint.SM);
  const { location } = useLocation();
  const isInApp = location.pathname.startsWith(withBasePath("/app"));

  return isSigningIn ? (
    <Dropdown className="session-dropdown">
      <Dropdown.Toggle id="session-dropdown-button">
        <UserDisplay
          className="mr-2"
          user={user.getOrElse(undefined)}
          avatar={isSmallScreen}
        />
      </Dropdown.Toggle>
      <Dropdown.Menu alignRight>
        {!isInApp && isSmallScreen && (
          <Dropdown.Item onClick={(): unknown => dispatch(signOut({}))}>
            {/* Specific number is to offset the size of the icon on Sign Out */}
            <Box mr={26} display="inline" /> Go to dashboard
          </Dropdown.Item>
        )}
        <Dropdown.Item onClick={(): unknown => dispatch(signOut({}))}>
          <Icon name="sign-out-alt" className="mr-2" /> Sign Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ) : (
    <AutoLink className="nav-link" to={oauthUrl}>
      Sign In
    </AutoLink>
  );
});

export default SessionControl;
