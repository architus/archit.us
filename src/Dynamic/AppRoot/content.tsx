import React from "react";
import { useSessionStatus } from "Store/slices/session";

import Login from "Pages/Login";
import NotFound from "Pages/NotFound";

import Begin from "Dynamic/Begin";
import { Redirect } from "@reach/router";
import { Router } from "Components/Router";

import { withClientSide } from "Utility";
import { APP_PATH_ROOT } from "./config.json";
import { DEFAULT_TAB, tabs } from "./tabs";

type AppContentProps = {
  openAddGuild: () => void;
};

const AppContent: React.ComponentType<AppContentProps> = withClientSide(
  ({ openAddGuild }) => {
    const [loggedIn] = useSessionStatus();
    // Render restricted view if not logged in
    if (!loggedIn) return <Login fromRestricted={true} />;
    return (
      <>
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
);

export default AppContent;
