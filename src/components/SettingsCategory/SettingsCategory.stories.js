import React from "react";
import { text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import SettingsCategory from "./index";

import { cards } from "./story/example.json";

export default {
  title: "Components|SettingsCategory",
  parameters: {
    component: SettingsCategory
  }
};

export const WithTitle = () => (
  <SettingsCategory
    onCommit={action("on-commit")}
    title={text("title", "Category Title")}
    cards={cards}
  />
);
WithTitle.story = {
  parameters: {
    notes: "`SettingsCategory`"
  }
};

export const WithoutTitle = () => (
  <SettingsCategory onCommit={action("on-commit")} cards={cards} />
);
