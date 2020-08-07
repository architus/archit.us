import { GatsbyBrowser, WrapRootElementBrowserArgs } from "gatsby";
import React from "react";

import Root from "@app/components/Root";

// Adds our custom root component to the page
export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}: WrapRootElementBrowserArgs) => {
  return <Root>{element}</Root>;
};
