import React from "react";
import { useDispatch } from "Utility";
import { Option } from "Utility/option";
import { User } from "Utility/types";
import { signOut } from "Store/actions";
import { useCurrentUser } from "Store/slices/session";

import { Link as RouterLink } from "Components/Router";
import UserDisplay from "Components/UserDisplay";
import { Dropdown } from "react-bootstrap";
import Icon from "Components/Icon";

import "./style.scss";

export default function SessionControl(): React.ReactNode {
  const user: Option<User> = useCurrentUser();
  const dispatch = useDispatch();

  return user.match({
    // eslint-disable-next-line react/prop-types, react/display-name
    Some: ({ avatar, username, discriminator, id }) => (
      <Dropdown className="session-dropdown">
        <Dropdown.Toggle id="session-dropdown-button">
          <UserDisplay
            className="mr-2"
            avatarHash={avatar}
            username={username}
            discriminator={discriminator}
            clientId={id}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu alignRight>
          <Dropdown.Item onClick={(): void => dispatch(signOut())}>
            <Icon name="sign-out-alt" className="mr-2" /> Sign Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ),
    // eslint-disable-next-line react/display-name
    None: () => (
      <RouterLink className="nav-link" to="/login">
        Sign In
      </RouterLink>
    )
  });
}
