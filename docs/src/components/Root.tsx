import React from "react";

import { AutoLinkContext } from "@architus/facade/components/AutoLink";
import ColorModeProvider from "@docs/components/ColorModeProvider";
import { Link } from "@docs/components/Router";

// import the global CSS
import "@architus/facade/theme/globals";

// Inject the Gatsby router link to auto links
const linkContext: AutoLinkContext = { link: Link };

/**
 * Custom site-wide root component.
 * See https://www.gatsbyjs.org/docs/browser-apis/#wrapRootElement
 */
const Root: React.FC = ({ children }) => (
  <ColorModeProvider>
    <AutoLinkContext.Provider value={linkContext}>
      {children}
    </AutoLinkContext.Provider>{" "}
  </ColorModeProvider>
);

export default Root;
