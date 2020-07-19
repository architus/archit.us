// Configures Babel options for Jest tests
// If publishing sub-packages in the future and building from source using Babel
// These presets should be a good starting point

const babelOptions = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react",
    ["linaria/babel", { evaluate: true, displayName: true }],
    "@babel/preset-typescript",
  ],
  // plugins: [
  //   [
  //     "@babel/plugin-transform-typescript",
  //     { isTSX: true, allExtensions: true },
  //   ],
  // ],
};

module.exports = require("babel-jest").createTransformer(babelOptions);
