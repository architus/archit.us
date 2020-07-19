module.exports = {
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testPathIgnorePatterns: [`node_modules`],
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/src/test/loader-shim.js`],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
  },
  transform: {
    "^.+\\.tsx?$": `ts-jest`,
  },
  globals: {
    __PATH_PREFIX__: ``,
    "ts-jest": {
      diagnostics: {
        ignoreCodes: [2307, 7006],
      },
      babelConfig: {
        presets: [
          ["linaria/babel", { evaluate: true, displayName: true }],
          ["@babel/preset-env", { targets: { node: "current" } }],
          "@babel/preset-react",
        ],
        plugins: ["@babel/plugin-transform-modules-commonjs"],
      },
    },
  },
};
// module.exports = {
//   ...require("../.shared/jest-base"),
//   setupFiles: [`<rootDir>/src/test/loader-shim.js`],
//   // globalSetup: `<rootDir>/src/test/global-setup.js`,
// };
