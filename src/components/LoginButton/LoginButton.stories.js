import React from "react";
import { boolean } from "@storybook/addon-knobs";

import LoginButton from "./index";

export default {
  title: "LoginButton",
  parameters: { component: LoginButton }
};

export const Display = () => (
  <LoginButton
    loggedIn={boolean("Logged In", false)}
    showLabel={boolean("Show Label", true)}
  />
);
export const ConnectedToStore = () => (
  <LoginButton showLabel={boolean("Show Label", true)} />
);
