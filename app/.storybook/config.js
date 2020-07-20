import { configure, addDecorator, addParameters } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { themes } from "@storybook/theming";
import { jsxDecorator } from "storybook-addon-jsx";

import PaddingDecorator from "./PaddingDecorator";
import ThemeDecorator from "./ThemeDecorator";
import StoreDecorator from "./StoreDecorator";

import { primaryColor, secondaryColor } from "global.json";
import lightLogo from "@app/assets/light_logo.png";
import darkLogo from "@app/assets/dark_logo.png";
import "scss/main.scss";

const themeBase = {
  colorPrimary: secondaryColor,
  colorSecondary: primaryColor,
  brandTitle: "archit.us",
  brandUrl: "https://archit.us"
};

addParameters({
  darkMode: {
    dark: {
      ...themes.dark,
      ...themeBase,
      brandImage: darkLogo
    },
    light: {
      ...themes.light,
      ...themeBase,
      brandImage: lightLogo
    }
  },
  options: {
    panelPosition: "right"
  }
});

configure(
  require.context("../src/", true, /\.stories\.js$/),
  module
);

addDecorator(withKnobs);
addDecorator(jsxDecorator);
addDecorator(PaddingDecorator);
addDecorator(ThemeDecorator);
addDecorator(StoreDecorator);
