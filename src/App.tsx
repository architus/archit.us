/** @jsx jsx */
import React from "react";
import { addPrefetchExcludes, Root, Routes } from "react-static";
import styled, { ThemeProvider, jsx as jsxPragma, css } from "@xstyled/emotion";
import Store from "Store";
import { Router } from "Components/Router";
import { Provider } from "react-redux";
import { SEO } from "Components/Layout";
import NotificationPane from "Components/NotificationPane";
import AppRoot from "Dynamic/AppRoot";
import theme from "./Theme";
import "scss/main.scss";

// Any routes in this array will be treated as non-static routes
addPrefetchExcludes([/\/?app(?:\/.*)?/]);

const jsx = (...args: unknown[]) => {
  const result = jsxPragma(...args);
  console.log({ args, result });
  return result;
};

const Test = styled.div`
  background-color: primary;
`;

/**
 * Represents the root component of the application, mounted directly to the `root` div
 */
const App: React.FunctionComponent<{}> = () => (
  <Root>
    <SEO />
    <ThemeProvider theme={theme}>
      <Provider store={Store}>
        <NotificationPane />
        <main>
          <React.Suspense fallback={<em>Loading...</em>}>
            <div
              className={css`
                padding: 32px;
                background-color: hotpink;
                font-size: 24px;
                border-radius: 4px;
                &:hover {
                  color: white;
                }
              `}
            >
              Hover to change color.
            </div>

            <Test>test</Test>
            <Router>
              <AppRoot path="/app/*" />
              <Routes path="*" />
            </Router>
          </React.Suspense>
        </main>
      </Provider>
    </ThemeProvider>
  </Root>
);

export default App;
