import React from "react";
import NavLink from "../NavLink";

const LoggedInLinks = () => (
  <NavLink to="/home">Home</NavLink>
)

const LoggedOutLinks = () => (
  <NavLink to="/" exact>Login</NavLink>
);

const NavLinkList = ({ loggedIn }) => {
  return (
    <ul className="navbar-nav">
      {loggedIn ? <LoggedInLinks /> : <LoggedOutLinks />}
    </ul>
  );
};
export default NavLinkList;
