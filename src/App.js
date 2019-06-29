import React from "react";
import { addPrefetchExcludes } from "react-static";
import store from "store";

import { Router } from "components/Router";
import { Root, Routes } from "react-static";
import { Provider } from "react-redux";
import Header from "components/Header";

import AppRoot from "dynamic";

import "scss/main.scss";

// Any routes in this array will be treated as non-static routes
addPrefetchExcludes(["app"]);

function App() {
  return (
    <Root>
      <Provider store={store}>
        <Header />
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
