import React from "react";
import { text, boolean, number, object } from "@storybook/addon-knobs";

import Tooltip from "./index";
import Icon from "components/Icon";
import { Button } from "react-bootstrap";

export default {
  title: "Tooltip"
};

const baseProps = () => ({
  bottom: boolean("Bottom", false),
  top: boolean("Top", false),
  left: boolean("Left", false),
  padding: `${number("Padding", 0.5, {
    range: true,
    min: 0,
    max: 4,
    step: 0.05
  })}rem`,
  style: object("Style", {}),
  hide: boolean("Hide", false),
  toggle: boolean("Toggle", false),
  delay: number("Delay", 0, {
    range: true,
    min: 0,
    max: 2000,
    step: 50
  })
});

export const Basic = () => (
  <Tooltip
    {...baseProps()}
    text={text("Text", "Example tooltip")}
    children={<Button variant="primary">Basic</Button>}
  />
);
export const AdvancedContent = () => (
  <Tooltip
    {...baseProps()}
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
