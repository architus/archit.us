import React from "react";
import { GatsbyBrowser, WrapRootElementBrowserArgs } from "gatsby";

import Root from "@docs/components/Root";

// Adds our custom root component to the page
export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}: WrapRootElementBrowserArgs) => {
  return <Root>{element}</Root>;
};
