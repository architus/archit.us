import React from "react";

// import the global CSS
import "@design/theme/globals";
import ColorModeProvider from "@docs/components/ColorModeProvider";

/**
 * Custom site-wide root component.
 * See https://www.gatsbyjs.org/docs/browser-apis/#wrapRootElement
 */
const Root: React.FC = ({ children }) => (
  <ColorModeProvider>{children}</ColorModeProvider>
);

export default Root;
