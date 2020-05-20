import React from "react";
import AutoLink from "Components/AutoLink";
import classNames from "classnames";

// This link will be active when itself or deeper routes are current
export const isPartiallyActive = ({
  baseClassName,
  activeClassName,
}: {
  baseClassName: string;
  activeClassName: string;
}) => ({ isPartiallyCurrent }: { isPartiallyCurrent: boolean }): {} => {
  return isPartiallyCurrent
    ? { className: classNames(activeClassName, baseClassName) }
    : { className: baseClassName };
};

type NavLinkProps = React.ComponentProps<typeof AutoLink>;

/**
 * Router link that is used at the top of the page, which automatically changes class on
 * active state
 */
const NavLink: React.FC<NavLinkProps> = ({ to, children, ...rest }) => {
  return (
    <li className="nav-item">
      <AutoLink
        to={to}
        getProps={isPartiallyActive({
          baseClassName: "nav-link",
          activeClassName: "active",
        })}
        {...rest}
      >
        {children}
      </AutoLink>
    </li>
  );
};

export default NavLink;
