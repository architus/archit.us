import { styled } from "linaria/react";
import { transparentize } from "polished";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

import { withBasePath } from "@app/api";
import UserDisplay from "@app/components/UserDisplay";
import { useOauthUrl } from "@app/hooks";
import { Dropdown } from "@app/react-bootstrap";
import { useDispatch } from "@app/store";
import { signOut } from "@app/store/actions";
import { useCurrentUser, useSessionStatus } from "@app/store/slices/session";
import { useLocation } from "@app/utility";
import { User } from "@app/utility/types";
import AutoLink from "@architus/facade/components/AutoLink";
import { useDown } from "@architus/facade/hooks";
import { color, staticColor } from "@architus/facade/theme/color";
import { transition } from "@architus/facade/theme/motion";
import { gap } from "@architus/facade/theme/spacing";
import { Option } from "@architus/lib/option";

const Styled = {
  Outer: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    margin-left: ${gap.micro};
  `,
  DropdownButton: styled(Dropdown.Toggle)`
    background-color: ${transparentize(0.9, staticColor("dark"))};
    border: none;
    box-shadow: none;
    color: ${color("light")};

    &::after {
      vertical-align: 0.1em;
    }

    &:hover {
      background-color: ${transparentize(0.8, staticColor("dark"))};
    }

    &:active {
      background-color: ${transparentize(0.75, staticColor("dark"))};
    }

    &:focus {
      @include highlight-shadow($-dark);
    }
  `,
  DropdownMenu: styled(Dropdown.Menu)`
    a {
      text-decoration: none;
    }
  `,
  UserDisplay: styled(UserDisplay)`
    margin-right: ${gap.nano};
  `,
  IconOffset: styled.span`
    /* Specific number is to offset the size of the icon on Sign Out */
    margin-right: 26px;
  `,
  SignOutIcon: styled(FaSignOutAlt)`
    position: relative;
    margin-right: ${gap.pico};
    top: 1px;
  `,
  SignInLink: styled(AutoLink)`
    color: ${color("light")};

    ${transition(["opacity"])};
    opacity: 1;

    &:hover {
      color: ${color("light")};
      opacity: 0.8;
    }

    svg {
      font-size: 1.15em;
      position: relative;
      top: 1px;
    }
  `,
};

export type SessionControlProps = {
  className?: string;
  style?: React.CSSProperties;
};

const SessionControl: React.FC<SessionControlProps> = React.memo(
  ({ className, style }) => {
    const user: Option<User> = useCurrentUser();
    const { isSigningIn } = useSessionStatus();
    const dispatch = useDispatch();
    const oauthUrl = useOauthUrl();
    const isSmallScreen = useDown("sm");
    const { location } = useLocation();
    const isInApp = location.pathname.startsWith(withBasePath("/app"));

    return (
      <Styled.Outer>
        {isSigningIn ? (
          <Dropdown className={className} style={style}>
            <Styled.DropdownButton>
              <Styled.UserDisplay
                user={user.getOrElse(undefined)}
                avatar={isSmallScreen}
              />
            </Styled.DropdownButton>
            <Styled.DropdownMenu alignRight>
              {!isInApp && isSmallScreen && (
                <Dropdown.Item onClick={(): unknown => dispatch(signOut({}))}>
                  <Styled.IconOffset /> Go to dashboard
                </Dropdown.Item>
              )}
              <Dropdown.Item onClick={(): unknown => dispatch(signOut({}))}>
                <Styled.SignOutIcon /> Sign Out
              </Dropdown.Item>
            </Styled.DropdownMenu>
          </Dropdown>
        ) : (
          <Styled.SignInLink href={oauthUrl} noUnderline newTab={false}>
            Sign In
          </Styled.SignInLink>
        )}
      </Styled.Outer>
    );
  }
);

export default SessionControl;
