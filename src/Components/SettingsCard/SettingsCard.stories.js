import React from "react";
import { action } from "@storybook/addon-actions";

import SettingsCard from "./index";

import { cards } from "Components/SettingsCategory/story/example.json.js";
import { text, number } from "@storybook/addon-knobs";

export default {
  title: "Components|SettingsCard",
  parameters: {
    component: SettingsCard
  }
};

export const Basic = () => (
  <SettingsCard
    onCommit={action("on-commit")}
    title={text("title", "Card title")}
    settings={cards[0].settings}
    width={number("width", 5, { min: 1, max: 10, range: true, step: 1 })}
  />
);
Basic.story = {
  parameters: {
    notes:
      "`SettingsCard` represents a single group of Settings entries, grouped " +
      "by a common topic.\n\n### Width\n\nCard with is configurable, leveraging " +
      "flex-box for the final display. On large devices **(width > 992px)**, the final " +
      "card width is `100% * (width / 20)`, while on medium devices **(width > " +
      "768px)**, the final card width is double that at `100% * (width / 10)`. " +
      "On mobile, cards stretch to the full container width no matter what their " +
      "`width` prop is set to."
  }
};

export const Example = () => (
  <SettingsCard onCommit={action("on-commit")} {...cards[0]} />
);
