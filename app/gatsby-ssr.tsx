import { GatsbySSR, WrapRootElementNodeArgs } from "gatsby";
import React from "react";

import Root from "@app/components/Root";

// Adds our custom root component to the page
export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({
  element,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
WrapRootElementNodeArgs): any => {
  return <Root>{element}</Root>;
};
