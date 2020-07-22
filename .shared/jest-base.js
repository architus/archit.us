// Shared Babel configuration base

const path = require("path");

const relative = (p) => path.resolve(path.join(__dirname, p));

module.exports = {
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testPathIgnorePatterns: [`node_modules`],
  testURL: `http://localhost`,
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    // Base package aliases
    "^@architus/facade/(.*)$": relative("../design/src/$1"),
    "^@architus/lib/(.*)$": relative("../lib/src/$1"),
    // Utility absolute imports
    "^@docs/(.*)$": relative("../docs/src/$1"),
    "^@app/(.*)$": relative("../app/src/$1"),
  },
  transform: {
    "^.+\\.[jt]sx?$": relative("./jest-babel.js"),
  },
  globals: {
    __PATH_PREFIX__: ``,
  },
};
