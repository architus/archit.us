import React from "react";
import { action } from "@storybook/addon-actions";

import SettingsCard from "./index";

import { cards } from "components/SettingsCategory/story/example.json";

export default {
  title: "Components|SettingsCard",
  parameters: {
    component: SettingsCard
  }
};

export const Basic = () => (
  <SettingsCard onCommit={action("on-commit")} {...cards[0]} />
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
