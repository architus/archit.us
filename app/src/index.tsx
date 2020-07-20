// Uncomment to enable render profiling
// import "./wdyr";

import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { addPrefetchExcludes } from "react-static";

import App from "./App";
import { isDefined } from "@app/utility";
import { isHot } from "@app/utility/types";

// Any routes in this array will be treated as non-static routes
addPrefetchExcludes([/\/?app(?:\/.*)?/]);

export default App;
console.log("gay gay gay gay");

// Render your app
if (typeof document !== "undefined") {
  const target = document.getElementById("root");
  if (isDefined(target)) {
    const renderMethod = target.hasChildNodes()
      ? ReactDOM.hydrate
      : ReactDOM.render;

    const render: (component: React.ComponentType<{}>) => void = (Inner) => {
      renderMethod(
        <AppContainer>
          <Inner />
        </AppContainer>,
        target
      );
    };

    render(App);

    // Hot Module Replacement
    if (module && isHot(module)) {
      module.hot.accept("./App", () => {
        render(App);
      });
    }
  }

  // Register service worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      if (process.env.PRODUCTION) {
        navigator.serviceWorker.register("/service-worker.js");
      } else {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister();
          }
        });
      }
    });
  }
}
