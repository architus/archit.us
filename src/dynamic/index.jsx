import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mapStateToLoggedIn } from "store/reducers/session";

import Login from "pages/Login";
import Home from "dynamic/Home";
import { Router } from "components/Router";

const Test = () => <p>uwu</p>;

function AppContent({ loggedIn }) {
  // Don't pre-render anything
  if (typeof window === "undefined") return null;
  else {
    // Ensure the user is logged in
    if (!loggedIn) return <Login fromRestricted={true} />;
    else
      return (
        <Router>
          <Home path="/" />
          <Test path="test" />
        </Router>
      );
  }
}

AppContent.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

const AuthenticatedAppContent = connect(mapStateToLoggedIn)(AppContent);

function AppRoot() {
  return (
    <React.Suspense fallback={<em>Loading...</em>}>
      <AuthenticatedAppContent />
    </React.Suspense>
  );
}

export default AppRoot;
