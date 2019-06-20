import React from "react";
import { connect } from "react-redux";
import { mapStateToLoggedIn } from "../../util";

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
