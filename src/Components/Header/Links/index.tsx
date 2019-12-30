import React from "react";
import classNames from "classnames";
import { useSessionStatus } from "Store/slices/session";

import NavLink from "Components/NavLink";

const LoggedInLinks: React.FC<{}> = () => (
  <NavLink to="/app">Dashboard</NavLink>
);

const LoggedOutLinks: React.FC<{}> = () => null;
const CommonLinks: React.FC<{}> = () => null;

type HeaderLinksProps = {
  className?: string;
} & Partial<React.HTMLAttributes<HTMLUListElement>>;

const HeaderLinks: React.FC<HeaderLinksProps> = ({ className, ...rest }) => {
  const [loggedIn] = useSessionStatus();
  return (
    <ul className={classNames("navbar-nav", className)} {...rest}>
      <CommonLinks />
      {loggedIn ? <LoggedInLinks /> : <LoggedOutLinks />}
    </ul>
  );
};

export default HeaderLinks;
