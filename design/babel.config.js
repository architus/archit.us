module.exports = {
  presets: [
    ["linaria/babel", { evaluate: true, displayName: true }],
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react",
  ],
  plugins: ["@babel/plugin-transform-modules-commonjs"],
};
