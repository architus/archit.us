import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "components/Router";
import classNames from "classnames";

// this link will be active when itself or deeper routes are current
export const isPartiallyActive = ({ baseClassName, activeClassName }) => ({
  isPartiallyCurrent
}) => {
  return isPartiallyCurrent
    ? { className: classNames(activeClassName, baseClassName) }
    : { className: baseClassName };
};

const NavLink = ({ to, children, ...rest }) => {
  return (
    <li className="nav-item">
      <RouterLink
        to={to}
        getProps={isPartiallyActive({
          baseClassName: "nav-link",
          activeClassName: "active"
        })}
        {...rest}
      >
        {children}
      </RouterLink>
    </li>
  );
};

export default NavLink;

NavLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
