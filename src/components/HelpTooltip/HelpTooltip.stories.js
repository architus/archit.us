import React from "react";
import { text, boolean, number, object } from "@storybook/addon-knobs";

import HelpTooltip from "./index";
import Icon from "components/Icon";

export default {
  title: "HelpTooltip",
  parameters: { component: HelpTooltip }
};

export const Basic = () => (
  <HelpTooltip
    right={boolean("Right", false)}
    top={boolean("Top", false)}
    left={boolean("Left", false)}
    padding={`${number("Padding", 0.5, {
      range: true,
      min: 0,
      max: 4,
      step: 0.05
    })}rem`}
    style={object("Style", {})}
    hide={boolean("Hide", false)}
    toggle={boolean("Toggle", false)}
    delay={number("Delay", 0, {
      range: true,
      min: 0,
      max: 2000,
      step: 50
    })}
    content={text("Content", "Example help tooltip")}
  />
);
export const AdvancedContent = () => (
  <HelpTooltip
    right={boolean("Right", false)}
    top={boolean("Top", false)}
    left={boolean("Left", false)}
    padding={`${number("Padding", 0.5, {
      range: true,
      min: 0,
      max: 4,
      step: 0.05
    })}rem`}
    style={object("Style", {})}
    hide={boolean("Hide", false)}
    toggle={boolean("Toggle", false)}
    delay={number("Delay", 0, {
      range: true,
      min: 0,
      max: 2000,
      step: 50
    })}
    content={
      <span>
        <h6>
          <Icon name="moon" className="mr-2" style={{ color: "yellow" }} />
          Header
        </h6>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus
        aliquet tellus, ac pellentesque nulla imperdiet at.
      </span>
    }
  />
);
