import React from "react";
import { Link } from "gatsby";

// import the global CSS
import "@design/theme/globals";
import ColorModeProvider from "@docs/components/ColorModeProvider";
import { AutoLinkContext } from "@design/components/AutoLink";

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
