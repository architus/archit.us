import React from "react";
import { GatsbySSR, WrapRootElementNodeArgs } from "gatsby";

import Root from "@docs/components/Root";

// Adds our custom root component to the page
export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({
  element,
}: WrapRootElementNodeArgs) => {
  return Promise.resolve(<Root>{element}</Root>);
};
