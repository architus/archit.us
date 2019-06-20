
import React from "react";
import { mapStateToLoggedIn } from "../../util";
import { connect } from "react-redux";

import NavLink from "../NavLink";

const LoggedInLinks = () => (
  <NavLink to="/home">Home</NavLink>
)

const LoggedOutLinks = () => (
  <NavLink to="/login" exact>Login</NavLink>
);

const HeaderLinks = ({ loggedIn }) => {
  return (
    <ul className="navbar-nav">
      {loggedIn ? <LoggedInLinks /> : <LoggedOutLinks />}
    </ul>
  );
};

export default connect(mapStateToLoggedIn)(HeaderLinks);
