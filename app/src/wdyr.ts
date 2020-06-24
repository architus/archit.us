import React from "react";
import { useSelector } from "react-redux";

// Implements whyDidYouRender when the environment variable is specified

if (
  process.env.ENABLE_PROFILING === "true" ||
  process.env.NODE_ENV === "development"
) {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  const customHookWrapper = { useSelector };
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    logOnDifferentValues: true,
    include: [/^GuildList$/],
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    trackExtraHooks: [[customHookWrapper, "useSelector"]],
  });

  // Attach the custom selector to the window object (only on development).
  // We then check for this property in the code for our custom typed `useSelector`
  // to hook the wrapper up
  if (typeof window !== "undefined") {
    ((window as unknown) as { useSelector: unknown }).useSelector =
      customHookWrapper.useSelector;
  }
}
