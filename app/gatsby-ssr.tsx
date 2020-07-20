import { getColorModeInitScriptElement } from "@xstyled/emotion";
import fs from "fs";
import { GatsbySSR, WrapRootElementNodeArgs, RenderBodyArgs } from "gatsby";
import path from "path";
import React from "react";

import Root from "@app/components/Root";

const noFlashPath = path.resolve("./src/build/no-flash.js");
const noFlashScript = fs.readFileSync(noFlashPath, "utf8");

// Adds our custom root component to the page
export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({
  element,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
WrapRootElementNodeArgs): any => {
  return <Root>{element}</Root>;
};

// Adds the needed no flash scripts for Emotion & old dark theme
export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setPreBodyComponents,
  setPostBodyComponents,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
RenderBodyArgs): any => {
  setPreBodyComponents([getColorModeInitScriptElement()]);
  // Dark mode anti-flash script
  setPostBodyComponents([
    <script
      key="noFlash"
      dangerouslySetInnerHTML={{
        __html: noFlashScript,
      }}
    />,
  ]);
};
