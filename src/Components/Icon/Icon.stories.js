import React from "react";
import { text, object } from "@storybook/addon-knobs";

import Icon from "./index";

export default {
  title: "Components|Icon",
  parameters: { component: Icon }
};

export const Basic = () => (
  <Icon name={text("name", "sign-out-alt")} style={object("style", {})} />
);
Basic.story = {
  parameters: {
    notes:
      "`Icon` provides a wrapper for [FontAwesome](https://fontawesome.com/how-to-use/on-the-web/using-with/react) icons.\n\n" +
      "> **Note:** When adding new icons, first find the desired icon at [the Font Awesome website](https://fontawesome.com/) and " +
      "then add it to `fontawesome.js`.\n\n> Alternatively, if no pre-made icon is found, there is the option of importing svg " +
      "data and manually specifying an icon in `custom.js`."
  }
};

export const Styled = () => (
  <Icon name={"moon"} style={{ color: "darkBlue" }} size="3x" />
);
