import React, { useState } from "react";
import { text, boolean } from "@storybook/addon-knobs";

import Switch from "./index";
import MaxWidthDecorator from "MaxWidthDecorator";

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
