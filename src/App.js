import React from "react";
import { addPrefetchExcludes } from "react-static";
import store from "store";

import { Router } from "components/Router";
import { Root, Routes } from "react-static";
import { Provider } from "react-redux";
import Header from "components/Header";
import RestrictedRoute from "components/RestrictedRoute";

import Home from "dynamic/Home";

import "scss/main.scss";

// Any routes in this array will be treated as non-static routes
addPrefetchExcludes(["home"]);

function App() {
  return (
    <Root>
      <Provider store={store}>
        <Header />
        <main>
          <React.Suspense fallback={<em>Loading...</em>}>
            <Router>
              <RestrictedRoute path="/home" component={Home} />
              <Routes path="*" />
            </Router>
          </React.Suspense>
        </main>
      </Provider>
    </Root>
  );
}

export default App;
