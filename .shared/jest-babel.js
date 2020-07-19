// Configures Babel options for Jest tests
// If publishing sub-packages in the future and building from source using Babel
// These presets should be a good starting point

const moduleResolver = [
  "babel-plugin-module-resolver",
  {
    root: ["."],
    alias: {
      "@architus/facade": "../design/src",
      "@architus/lib": "../lib/src",
      "@docs": "../docs/src",
    },
  },
];

const basePlugins = [moduleResolver];
const basePresets = ["babel-preset-gatsby", "@babel/preset-typescript"];

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

// eslint-disable-next-line import/no-extraneous-dependencies
module.exports = require("babel-jest").createTransformer(babelOptions);
