import {
  ThemeProvider,
  ColorModeProvider as XstyledColorModeProvider,
} from "@xstyled/emotion";
import React from "react";
import { Provider } from "react-redux";

import ColorModeProvider from "@app/components/ColorModeProvider";
import NotificationPane from "@app/components/NotificationPane";
import SEO from "@app/components/SEO";
import Store from "@app/store";
import theme from "@app/theme";

// Import the global CSS rules from SCSS/Bootstrap
import "@app/scss/main.scss";

// Import the global CSS rules from Linaria
import "@architus/facade/theme/globals";
import "@app/layout";

/**
 * Represents the root component of the application,
 * which remains mounted across navigations
 */
const Root: React.FC = ({ children }) => (
  <>
    <SEO />
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <XstyledColorModeProvider>
          <Provider store={Store}>
            <NotificationPane />
            {children}
          </Provider>
        </XstyledColorModeProvider>
      </ColorModeProvider>
    </ThemeProvider>
  </>
);

export default Root;
