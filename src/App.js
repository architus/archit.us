import React from "react";
import { addPrefetchExcludes } from "react-static";
import store from "store";

import { Router } from "components/Router";
import { Root, Routes } from "react-static";
import { Provider } from "react-redux";
import { SEO } from "components/Layout";
import NotificationPane from "components/NotificationPane";

import AppRoot from "dynamic/AppRoot";

import "scss/main.scss";

// Any routes in this array will be treated as non-static routes
addPrefetchExcludes([/\/?app(?:\/.*)?/]);

function App() {
  return (
    <Root>
      <SEO />
      <Provider store={store}>
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
}

export default App;
