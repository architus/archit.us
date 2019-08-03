import React, { useCallback, useEffect } from "react";
import useDarkMode from "use-dark-mode";
import addons from "@storybook/addons";

import "./theme.scss";

// get channel to listen to event emitter
const channel = addons.getChannel();

function ThemeDecorator(storyFn) {
  const { value, toggle } = useDarkMode(false);
  const setDark = useCallback(
    dark => {
      if (value !== dark) toggle();
    },
    [value]
  );

  useEffect(() => {
    // listen to DARK_MODE event
    channel.on("DARK_MODE", setDark);
    return () => channel.removeListener("DARK_MODE", setDark);
  }, [channel, setDark]);

  return (
    <div className="content-root">
      <div children={storyFn()} />
    </div>
  );
}

export default ThemeDecorator;
