import { GatsbySSR, RenderBodyArgs, WrapRootElementNodeArgs } from "gatsby";
import React from "react";

import { siteMetadata } from "@app/../gatsby-config";
import Root from "@app/components/Root";
import { isDefined } from "@architus/lib/utility";

// Adds our custom root component to the page
export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({
  element,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
WrapRootElementNodeArgs): any => {
  return <Root>{element}</Root>;
};

// Adds our self-hosted analytics platform (Umami)
// to the head as a script tag
export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHeadComponents,
}: RenderBodyArgs): Promise<null> => {
  const { umami } = siteMetadata;
  if (isDefined(umami.websiteId)) {
    setHeadComponents([
      <script
        async
        defer
        key="umami"
        data-website-id={umami.websiteId}
        src={`${umami.base}/umami.js`}
      ></script>,
    ]);
  }

  // Some value needed for type
  // See https://github.com/gatsbyjs/gatsby/issues/23296
  return Promise.resolve<null>(null);
};
