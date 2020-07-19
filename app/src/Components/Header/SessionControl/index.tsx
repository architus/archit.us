import React from "react";
import { useDown, Box } from "@xstyled/emotion";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "Store";
import { useLocation, withBasePath } from "Utility";
import { Option } from "Utility/option";
import { User } from "Utility/types";
import { signOut } from "Store/actions";
import { useCurrentUser, useSessionStatus } from "Store/slices/session";
import AutoLink from "Components/AutoLink";
import { useOauthUrl } from "Components/LoginButton";
import UserDisplay from "Components/UserDisplay";
import Icon from "Components/Icon";
import { Breakpoint } from "Theme";
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
