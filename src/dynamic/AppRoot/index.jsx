import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mapStateToLoggedIn } from "store/reducers/session";
import { log } from "utility";

import Login from "pages/Login";
import Dashboard from "dynamic/Dashboard";
import NotFound from "pages/NotFound";
import { Router } from "components/Router";
import Layout from "components/Layout";
import GuildList from "components/GuildList";

import "./style.scss";

const APP_HTML_CLASS = "html--app";

function AppContent({ loggedIn }) {
  // Don't pre-render anything
  if (typeof window === "undefined") return null;
  else {
    // Ensure the user is logged in
    if (!loggedIn) return <Login fromRestricted={true} />;
    else
      return (
        <Router>
          <Dashboard path="/" />
          <NotFound default />
        </Router>
      );
  }
}

AppContent.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

const AuthenticatedAppContent = connect(mapStateToLoggedIn)(AppContent);

class AppRoot extends React.Component {
  componentDidMount() {
    document.documentElement.classList.add(APP_HTML_CLASS);
  }

  componentWillUnmount() {
    document.documentElement.classList.remove(APP_HTML_CLASS);
  }

  render() {
    return (
      <Layout title="Web Dashboard" className="app-root">
        <div className="content-container">
          <div className="guild-sidebar">
            <GuildList
              onClickGuild={id => log(`Guild ${id} clicked`)}
              onClickAdd={() => log("Guild add clicked")}
            />
          </div>
          <div className="app-content">
            <React.Suspense fallback={<em>Loading...</em>}>
              <AuthenticatedAppContent />
            </React.Suspense>
          </div>
        </div>
      </Layout>
    );
  }
}

export default AppRoot;
