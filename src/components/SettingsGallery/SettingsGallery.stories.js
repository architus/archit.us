import React from "react";
import { action } from "@storybook/addon-actions";
import { boolean, number } from "@storybook/addon-knobs";

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
    categories={[
      { cards },
      ...[
        ...Array(
          number("categories", 3, { min: 0, max: 10, range: true, step: 1 }) - 1
        )
      ].map((_o, i) => ({
        title: `Category ${i + 1}`,
        cards
      }))
    ]}
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
