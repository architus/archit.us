import React from "react";
import { boolean } from "@storybook/addon-knobs";

import Window from "./index";
import Icon from "components/Icon";

export default {
  title: "Components|Window",
  parameters: { component: Window }
};

export const Light = () => (
  <Window
    noChrome={boolean("noChrome", false)}
    noPadding={boolean("noPadding", false)}
    variant="light"
  >
    <div className="pt-4 px-4">
      <h1 className="display-4">
        <Icon name="moon" className="mr-2" style={{ color: "#B03A2E" }} />
        Title
      </h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus
        aliquet tellus, ac pellentesque nulla imperdiet at.
      </p>
    </div>
  </Window>
);
Light.story = {
  parameters: {
    notes:
      "`HelpTooltip` provides a way to give explanatory content to users hidden behind " +
      "an interactive tooltip.\n\n> **Note:** The component supports many of the same props as " +
      "`Tooltip`, with one exception beind that `HelpTooltip` is bottom-placed by default, " +
      "whereas `Tooltip` is right-placed by default."
  }
};

export const Discord = () => (
  <Window
    noChrome={boolean("noChrome", false)}
    noPadding={boolean("noPadding", false)}
    variant="discord"
    className="text-light"
  >
    <div className="pt-4 px-4">
      <h1 className="display-4">
        <Icon name="sun" className="mr-2" style={{ color: "#D2B4DE" }} />
        Title
      </h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus
        aliquet tellus, ac pellentesque nulla imperdiet at.
      </p>
    </div>
  </Window>
);
