// Uncomment to enable render profiling
// import "./wdyr";

import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { addPrefetchExcludes } from "react-static";
import { isHot } from "Utility/types";
import { isDefined } from "Utility";
import App from "./App";

// Any routes in this array will be treated as non-static routes
addPrefetchExcludes([/\/?app(?:\/.*)?/]);

export default App;

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

  // Unregister service worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    });
  }
}
