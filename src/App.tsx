import React from "react";
import { addPrefetchExcludes } from "react-static";
import Store from "Store";

import { Router } from "components/Router";
import { Root, Routes } from "react-static";
import { Provider } from "react-redux";
import { SEO } from "components/Layout";
import NotificationPane from "components/NotificationPane";

import AppRoot from "dynamic/AppRoot";

import "scss/main.scss";

// Any routes in this array will be treated as non-static routes
addPrefetchExcludes([/\/?app(?:\/.*)?/]);

/**
 * Represents the root component of the application, mounted directly to the `root` div
 */
const App: React.FunctionComponent<{}> = () => (
  <Root>
    <SEO />
    <Provider store={Store}>
      <NotificationPane />
      <main>
        <React.Suspense fallback={<em>Loading...</em>}>
          <Router>
            <AppRoot path="/app/*" />
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </main>
    </Provider>
  </Root>
);

export default App;
