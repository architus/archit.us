import React from "react";
import { text, boolean, number, object } from "@storybook/addon-knobs";

import Tooltip from "./index";
import Icon from "Components/Icon";
import { Button } from "react-bootstrap";

export default {
  title: "Components|Tooltip",
  parameters: { component: Tooltip }
};

export const Basic = () => (
  <Tooltip
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
    text={text("Text", "Example tooltip")}
    children={<Button variant="primary">Basic</Button>}
  />
);
Basic.story = {
  parameters: {
    notes:
      "`Tooltip` exists primarily as a wrapper for the tooltip/overlay component from " +
      "[react-bootstrap](https://react-bootstrap.github.io/components/overlays/#tooltip-props)"
  }
};

export const AdvancedContent = () => (
  <Tooltip
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
    text={
      <span>
        <h6>
          <Icon name="moon" className="mr-2" style={{ color: "yellow" }} />
          Header
        </h6>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis maximus
        aliquet tellus, ac pellentesque nulla imperdiet at.
      </span>
    }
    children={<Button variant="primary">Advanced</Button>}
  />
);
