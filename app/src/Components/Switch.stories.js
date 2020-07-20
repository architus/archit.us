import { text, boolean } from "@storybook/addon-knobs";
import MaxWidthDecorator from "MaxWidthDecorator";
import React, { useState } from "react";

import Switch from "./index";

export default {
  title: "Inputs|Switch",
  decorators: [MaxWidthDecorator],
  parameters: { component: Switch },
};

export const Controlled = () => {
  const [value, setValue] = useState(false);
  return <Switch checked={value} onChange={setValue} />;
};

export const Disabled = () => {
  return <Switch checked={boolean("checked", false)} disabled />;
};

export const Label = () => {
  const [value, setValue] = useState(false);
  return (
    <Switch
      checked={value}
      onChange={setValue}
      label={text("label", "Switch label")}
    />
  );
};
