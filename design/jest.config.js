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
      babelConfig: {
        presets: [
          "linaria/babel",
          // ["@babel/preset-env", { targets: { node: "current" } }],
          "@babel/preset-react",
          // ["linaria/babel", { evaluate: true, displayName: true }],
        ],
      },
    },
  },
};
