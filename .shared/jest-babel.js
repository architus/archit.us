/* eslint-disable import/no-extraneous-dependencies */

// Configures Babel options for Jest tests
// If publishing sub-packages in the future and building from source using Babel
// These presets should be a good starting point

const babelJest = require("babel-jest");
const path = require("path");

const moduleResolver = [
  "babel-plugin-module-resolver",
  {
    root: ["."],
    alias: {
      "@architus/facade": "../design/src",
      "@architus/lib": "../lib/src",
      "@docs": "../docs/src",
      "@app": "../app/src",
    },
  },
];

const basePlugins = [moduleResolver];
const basePresets = [
  path.join(__dirname, "./gatsby-preset-wrapper.js"),
  "@babel/preset-typescript",
];

const babelOptions = {
  plugins: [...basePlugins],
  presets: [
    ...basePresets,
    [
      // The linaria Babel plugin should receive the same babel config
      // for its own evaluation mechanics (except for its own
      // babel preset, which it injects automatically)
      "linaria/babel",
      {
        evaluate: true,
        displayName: true,
        babelOptions: {
          plugins: [...basePlugins],
          presets: [...basePresets],
        },
      },
    ],
  ],
};

module.exports = babelJest.createTransformer(babelOptions);
