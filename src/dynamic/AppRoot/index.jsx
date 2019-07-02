import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mapStateToLoggedIn } from "store/reducers/session";
import { log, colorBlend } from "utility";
import useDarkMode from "use-dark-mode";

import Login from "pages/Login";
import Dashboard from "dynamic/Dashboard";
import NotFound from "pages/NotFound";
import { Router } from "components/Router";
import Icon from "components/Icon";
import Layout from "components/Layout";
import GuildList from "components/GuildList";
import Switch from "react-switch";

import "./style.scss";
import { lightColor, primaryColor } from "global.json";

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
      <AppLayout>
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
      </AppLayout>
    );
  }
}

export default AppRoot;

function AppLayout({ children, ...rest }) {
  const { value, toggle } = useDarkMode(true);
  return (
    <Layout
      title="Web Dashboard"
      className="app-root"
      headerChildren={
        typeof window === "undefined" ? null : (
          <Switch
            onChange={toggle}
            checked={value}
            className="mr-3"
            aria-label="Dark mode switch"
            uncheckedIcon={<Icon name="sun" className="dark-mode-icon light" />}
            checkedIcon={<Icon name="moon" className="dark-mode-icon dark" />}
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            offHandleColor={lightColor}
            onHandleColor={lightColor}
            offColor={colorBlend(0.35, primaryColor)}
            onColor={colorBlend(-0.6, primaryColor)}
          />
        )
      }
      {...rest}
    >
      <div className="content-container">{children}</div>
    </Layout>
  );
}

AppLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};
