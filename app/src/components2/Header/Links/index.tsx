import { useUp } from "@xstyled/emotion";
import classNames from "classnames";
import React from "react";

import NavLink from "@app/components/NavLink";
import { useSessionStatus } from "@app/store/slices/session";
import { Breakpoint } from "@app/theme";
import { withBasePath } from "@app/utility";

const LoggedInLinks: React.FC = () => (
  <NavLink to={withBasePath("/app")}>Dashboard</NavLink>
);
const LoggedOutLinks: React.FC = () => null;
const CommonLinks: React.FC = () => null;

type HeaderLinksProps = {
  className?: string;
} & Partial<React.HTMLAttributes<HTMLUListElement>>;

const HeaderLinks: React.FC<HeaderLinksProps> = ({ className, ...rest }) => {
  const { isSigningIn } = useSessionStatus();
  // Hide the navbar links on small screen sizes
  return useUp(Breakpoint.SM) ? (
    <ul className={classNames("navbar-nav", className)} {...rest}>
      <CommonLinks />
      {isSigningIn ? <LoggedInLinks /> : <LoggedOutLinks />}
    </ul>
  ) : null;
};

export default HeaderLinks;
