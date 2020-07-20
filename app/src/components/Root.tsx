import { ThemeProvider, ColorModeProvider } from "@xstyled/emotion";
import React from "react";
import { Provider } from "react-redux";

import NotificationPane from "@app/components/NotificationPane";
import SEO from "@app/components/SEO";
import Store from "@app/store";
import theme from "@app/theme";

import "@app/scss/main.scss";

/**
 * Represents the root component of the application,
 * which remains mounted across navigations
 */
const Root: React.FC = ({ children }) => (
  <>
    <SEO />
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <Provider store={Store}>
          <NotificationPane />
          {children}
        </Provider>
      </ColorModeProvider>
    </ThemeProvider>
  </>
);

export default Root;
