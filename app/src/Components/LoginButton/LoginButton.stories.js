import { boolean } from "@storybook/addon-knobs";
import React from "react";

import LoginButton from "./index";

export default {
  title: "@app/components|LoginButton",
  parameters: {
    component: LoginButton,
  },
};

export const WithLabel = () => (
  <LoginButton loggedIn={boolean("Logged In", false)} showLabel />
);
WithLabel.story = {
  parameters: {
    notes:
      "`LoginButton` provides an interface for users to either:\n\n1. log in to the architus app or\n2. enter the primary app dashboard",
  },
};

export const WithoutLabel = () => (
  <LoginButton loggedIn={boolean("Logged In", false)} showLabel={false} />
);
