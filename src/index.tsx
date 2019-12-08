import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import App from "./App";
import { isDefined } from "Utility";
export default App;

// Render your app
if (typeof document !== "undefined") {
  const target = document.getElementById("root");
  if (isDefined(target)) {
    const renderMethod = target.hasChildNodes()
      ? ReactDOM.hydrate
      : ReactDOM.render;

    const render: (component: React.ComponentType<{}>) => void = Component => {
      renderMethod(
        <AppContainer>
          <Component />
        </AppContainer>,
        target
      );
    };

    render(App);

    // Hot Module Replacement
    if (module && module.hot) {
      module.hot.accept("./App", () => {
        render(App);
      });
    }
  }

  // Register service worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      if (process.env.PRODUCTION_URL) {
        navigator.serviceWorker.register("/service-worker.js");
      } else {
        navigator.serviceWorker
          .getRegistrations()
          .then(function(registrations) {
            for (let registration of registrations) {
              registration.unregister();
            }
          });
      }
    });
  }
}
