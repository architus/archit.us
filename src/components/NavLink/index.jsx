import React from "react";
import { NavLink as RouterLink } from "react-router-dom";

const NavLink = ({ to, children, ...rest }) => {
  return (
    <li className="nav-item">
      <RouterLink
        to={to}
        className="nav-link"
        activeClassName="active"
        {...rest}
      >
        {children}
      </RouterLink>
    </li>
  );
};

export default NavLink;
