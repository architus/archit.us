import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { mapStateToLoggedIn } from "Store/slices/session";

import NavLink from "Components/NavLink";

const LoggedInLinks = () => <NavLink to="/app">Dashboard</NavLink>;

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

HeaderLinks.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  className: PropTypes.string
};
