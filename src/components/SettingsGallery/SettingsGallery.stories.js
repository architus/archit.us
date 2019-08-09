import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";

import SettingsGallery from "./index";

import { cards } from "components/SettingsCategory/story/example.json";

export default {
  title: "Components|SettingsGallery",
  parameters: {
    component: SettingsGallery
  }
};

export const Basic = () => (
  <SettingsGallery
    onCommit={action("on-commit")}
    categories={[{ cards }, { title: "Second Category", cards }]}
    noCollapse={boolean("noCollapse", false)}
  />
);
Basic.story = {
  parameters: {
    notes:
      "`SettingsGallery` displays multiple Settings categories, auto-collapsing them " +
      "on mobile (unless `noCollapse` is set to `true`)"
  }
};
