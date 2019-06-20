import React from "react";
import { mapStateToLoggedIn } from "../../../util";
import { connect } from "react-redux";
import classNames from "classnames";

import NavLink from "../../NavLink";

const LoggedInLinks = () => <NavLink to="/home">Home</NavLink>;

const LoggedOutLinks = () => null;
const CommonLinks = () => null;

const HeaderLinks = ({ loggedIn, className, ...rest }) => {
  // eslint-disable-next-line
  const { dispatch, withoutDispatch } = rest;
  return (
    <ul className={classNames("navbar-nav", className)} {...withoutDispatch}>
      <CommonLinks />
      {loggedIn ? <LoggedInLinks /> : <LoggedOutLinks />}
    </ul>
  );
};

export default connect(mapStateToLoggedIn)(HeaderLinks);
