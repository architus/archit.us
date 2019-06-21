import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mapStateToLoggedIn } from "../../store/reducers/session";

import { Route } from "react-router-dom";
import Login from "../../pages/Login";

const RestrictedRoute = ({ loggedIn, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        loggedIn ? <Component /> : <Login fromRestricted={true} />
      }
    />
  );
};

export default connect(mapStateToLoggedIn)(RestrictedRoute);

RestrictedRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  component: PropTypes.func
};
