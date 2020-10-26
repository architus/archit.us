import { css } from "linaria";
import React from "react";
import { Provider } from "react-redux";

import ColorModeProvider from "@app/components/ColorModeProvider";
import NotificationPane from "@app/components/NotificationPane";
import { Link } from "@app/components/Router";
import Store from "@app/store";
import { injectColorGlobals } from "@app/theme/color";
import { AutoLinkContext } from "@architus/facade/components/AutoLink";

// Import the global CSS rules from Linaria
import "@architus/facade/theme/globals";
import "@app/layout";

// Inject the Gatsby router link to auto links
const linkContext: AutoLinkContext = { link: Link };

// Import the global app colors
export const rootGlobal = css`
  :global() {
    ${injectColorGlobals()}
  }
`;

/**
 * Represents the root component of the application,
 * which remains mounted across navigations
 */
const Root: React.FC = ({ children }) => (
  <AutoLinkContext.Provider value={linkContext}>
    <ColorModeProvider>
      <Provider store={Store}>
        <NotificationPane />
        {children}
      </Provider>
    </ColorModeProvider>
  </AutoLinkContext.Provider>
);

export default Root;
