const babelOptions = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};

// eslint-disable-next-line import/no-extraneous-dependencies
module.exports = require("babel-jest").createTransformer(babelOptions);
