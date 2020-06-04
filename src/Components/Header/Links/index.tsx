import React from "react";
import { useUp } from "@xstyled/emotion";
import classNames from "classnames";
import { useSessionStatus } from "Store/slices/session";
import NavLink from "Components/NavLink";
import { Breakpoint } from "Theme";
import { withBasePath } from "Utility";

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
