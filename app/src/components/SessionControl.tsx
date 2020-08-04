import { styled } from "linaria/react";
import { transparentize } from "polished";
import React, { useState, useCallback } from "react";
import { FaSignOutAlt, FaCaretDown } from "react-icons/fa";

import Menu from "@app/components/Menu";
import { navigate } from "@app/components/Router";
import UserDisplay from "@app/components/UserDisplay";
import { useOauthUrl, useLocationMatch } from "@app/hooks";
import { useDispatch } from "@app/store";
import { signOut } from "@app/store/actions";
import { useCurrentUser, useSessionStatus } from "@app/store/slices/session";
import { User } from "@app/utility/types";
import AutoLink from "@architus/facade/components/AutoLink";
import { useDown } from "@architus/facade/hooks";
import { color, staticColor } from "@architus/facade/theme/color";
import { transition } from "@architus/facade/theme/motion";
import { shadow } from "@architus/facade/theme/shadow";
import { gap } from "@architus/facade/theme/spacing";
import { Option } from "@architus/lib/option";

const Styled = {
  Outer: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    margin-left: ${gap.micro};
  `,
  DropdownButton: styled.button`
    background-color: ${transparentize(0.9, staticColor("dark"))};
    border: none;
    box-shadow: none;
    color: ${color("light")};
    outline: none !important;
    padding: 6px;
    border-radius: 4px;
    cursor: pointer;

    &::after {
      vertical-align: 0.1em;
    }

    &:hover {
      background-color: ${transparentize(0.85, staticColor("dark"))};
    }

    &:active,
    &[data-active="true"] {
      box-shadow: ${shadow("inset")(staticColor("dark"))};
      background-color: ${transparentize(0.75, staticColor("dark"))};
    }
  `,
  DropdownIcon: styled(FaCaretDown)`
    color: ${color("light")};
    margin-right: ${gap.femto};
  `,
  UserDisplay: styled(UserDisplay)`
    margin-right: ${gap.nano};
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
    const [, isInApp] = useLocationMatch("/app");
    const [dropdownShow, setDropdownShow] = useState(false);
    const toggleDropdown = useCallback(() => setDropdownShow(!dropdownShow), [
      dropdownShow,
    ]);

    return (
      <Styled.Outer className={className} style={style}>
        {isSigningIn ? (
          <Menu
            trigger="none"
            tooltipShown={dropdownShow}
            onClose={(): void => setDropdownShow(false)}
            menu={
              <>
                {!isInApp && isSmallScreen && (
                  <Menu.Item onClick={(): unknown => navigate("/app")}>
                    <Menu.Text>Go to dashboard</Menu.Text>
                  </Menu.Item>
                )}
                <Menu.Item onClick={(): unknown => dispatch(signOut({}))}>
                  <Menu.Icon>
                    <FaSignOutAlt />
                  </Menu.Icon>
                  <Menu.Text>Sign Out</Menu.Text>
                </Menu.Item>
              </>
            }
          >
            <Styled.DropdownButton
              type="button"
              data-active={dropdownShow ? "true" : undefined}
              onClick={toggleDropdown}
              aria-expanded={dropdownShow}
              aria-haspopup={true}
            >
              <Styled.UserDisplay
                user={user.getOrElse(undefined)}
                avatar={isSmallScreen}
              />
              <Styled.DropdownIcon />
            </Styled.DropdownButton>
          </Menu>
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
