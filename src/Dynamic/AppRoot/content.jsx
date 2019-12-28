import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mapStateToLoggedIn } from "Store/slices/session";

import Login from "Pages/Login";
import NotFound from "Pages/NotFound";

import Begin from "Dynamic/Begin";
import { Redirect } from "@reach/router";
import { Router } from "Components/Router";
import TokenExchange from "Functional/TokenExchange";

import { APP_PATH_ROOT } from "./config.json";
import { DEFAULT_TAB, tabs } from "./tabs";

function AppContent({ loggedIn, openAddGuild }) {
  // Don't pre-render anything
  if (typeof window === "undefined") return null;
  else {
    // Ensure the user is logged in
    if (!loggedIn) return <Login fromRestricted={true} />;
    else
      return (
        <>
          <TokenExchange />
          <Router>
            <Begin path="/" openAddGuild={openAddGuild} />
            <Redirect
              from=":guildId"
              to={`${APP_PATH_ROOT}/:guildId/${DEFAULT_TAB}`}
              noThrow
            />
            {tabs.map(({ path, component: Component }) => (
              <Component
                path={`:guildId/${path}`}
                key={path}
                openAddGuild={openAddGuild}
              />
            ))}
            <NotFound default fromApp={true} />
          </Router>
        </>
      );
  }
}

export default connect(mapStateToLoggedIn)(AppContent);

AppContent.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  openAddGuild: PropTypes.func
};
