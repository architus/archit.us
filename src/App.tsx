import React from "react";
import { Root, Routes } from "react-static";
import { ThemeProvider, ColorModeProvider } from "@xstyled/emotion";
import Store from "Store";
import { Router } from "Components/Router";
import { Provider } from "react-redux";
import { SEO } from "Components/Layout";
import NotificationPane from "Components/NotificationPane";
import AppRoot from "Dynamic/AppRoot";
import NotFound from "Pages/NotFound";
import theme from "./Theme";
import "scss/main.scss";

/**
 * Represents the root component of the application, mounted directly to the `root` div
 */
const App: React.FunctionComponent<{}> = () => (
  <Root>
    <SEO />
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <Provider store={Store}>
          <NotificationPane />
          <main>
            <React.Suspense fallback={<NotFound />}>
              <Router>
                <AppRoot path="/app/*" />
                <Routes path="*" />
              </Router>
            </React.Suspense>
          </main>
        </Provider>
      </ColorModeProvider>
    </ThemeProvider>
  </Root>
);

export default App;
