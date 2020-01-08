import React from "react";
import { text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import SettingsCategory from "./index";

import { cards } from "./story/example.json.js";

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
    noCollapse={boolean("noCollapse", false)}
  />
);
WithTitle.story = {
  parameters: {
    notes:
      "`SettingsCategory` displays a single Settings category that contains multiple " +
      "Settings cards. This component will auto-collapse on mobile if it has a non-null " +
      "`title` and `noCollapse` is not set to `true`"
  }
};

export const WithoutTitle = () => (
  <SettingsCategory
    onCommit={action("on-commit")}
    cards={cards}
    noCollapse={boolean("noCollapse", false)}
  />
);
