import React from "react";
import { boolean } from "@storybook/addon-knobs";

import LoginButton from "./index";

export default {
  title: "LoginButton",
  parameters: { component: LoginButton }
};

export const Display = () => (
  <LoginButton.Inner loggedIn={boolean("Logged In", false)} />
);
export const ConnectedToStore = () => <LoginButton />;
