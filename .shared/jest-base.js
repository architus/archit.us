// Shared Babel configuration base

const path = require("path");

module.exports = {
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testPathIgnorePatterns: [`node_modules`],
  testURL: `http://localhost`,
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    // Base package aliases
    "^@architus/facade/(.*)$": "<rootDir>/../design/src/$1",
    "^@architus/lib/(.*)$": "<rootDir>/../lib/src/$1",
    // Utility absolute import
    "^@docs/(.*)$": "<rootDir>/../docs/src/$1",
  },
  transform: {
    "^.+\\.[jt]sx?$": path.resolve(path.join(__dirname, "./jest-babel.js")),
  },
  globals: {
    __PATH_PREFIX__: ``,
  },
};
