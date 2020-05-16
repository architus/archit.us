const r = require.resolve;

module.exports = (api, { external, node, modules } = {}) => {
  const { NODE_ENV } = process.env;
  const PRODUCTION = NODE_ENV === "production";

  // Turn on the cache
  api.cache(true);

  // This preset is for external node_modules only.
  if (external) {
    return {
      sourceType: "unambiguous",
      presets: [r("@babel/preset-env")],
      plugins: [
        [
          r("@babel/plugin-transform-runtime"),
          {
            corejs: false,
            useESModules: true,
          },
        ],
        r("@babel/plugin-syntax-dynamic-import"),
      ],
    };
  }

  if (node) {
    return {
      presets: [
        r("@babel/preset-env"),
        [r("@babel/preset-react"), { development: false }],
      ],
      plugins: [
        r("babel-plugin-macros"),
        r("@babel/plugin-transform-modules-commonjs"),
        r("@babel/plugin-syntax-dynamic-import"),
        r("@babel/plugin-transform-destructuring"),
        r("@babel/plugin-transform-runtime"),
        r("@babel/plugin-proposal-class-properties"),
        r("@babel/plugin-proposal-optional-chaining"),
        r("@babel/plugin-proposal-export-default-from"),
      ],
    };
  }

  return {
    presets: [
      r("@babel/preset-env"),
      [r("@babel/preset-react"), { development: !PRODUCTION }],
    ],
    plugins: [
      ...((modules && [r("@babel/plugin-transform-modules-commonjs")]) || []),
      ...((PRODUCTION && [
        r("babel-plugin-universal-import"),
        r("babel-plugin-transform-react-remove-prop-types"),
      ]) ||
        []),
      r("@babel/plugin-transform-runtime"),
      r("babel-plugin-macros"),
      r("@babel/plugin-transform-destructuring"),
      r("@babel/plugin-syntax-dynamic-import"),
      r("@babel/plugin-proposal-class-properties"),
      r("@babel/plugin-proposal-optional-chaining"),
      r("@babel/plugin-proposal-export-default-from"),
    ],
  };
};
