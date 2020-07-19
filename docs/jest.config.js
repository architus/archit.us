const path = require("path");

module.exports = {
  ...require("../.shared/jest-base"),
  testPathIgnorePatterns: [
    `node_modules`,
    `\\.cache`,
    `\\.linaria-cache`,
    `<rootDir>.*/public`,
  ],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  setupFiles: [`<rootDir>/src/test/loader-shim.js`],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(svg)$": `<rootDir>/__mocks__/svg-mock.js`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
    // Base package aliases
    "^@architus/facade/(.*)$": "<rootDir>/../design/src/$1",
    "^@architus/lib/(.*)$": "<rootDir>/../lib/src/$1",
    // Utility absolute import
    "^@docs/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    __PATH_PREFIX__: ``,
    "ts-jest": {
      diagnostics: {
        ignoreCodes: [2307, 2345, 2347, 2722, 7006, 7031],
      },
      babelConfig: {
        presets: [
          "babel-preset-gatsby",
          [
            "linaria/babel",
            {
              evaluate: true,
              displayName: true,
              babelOptions: {
                presets: ["babel-preset-gatsby", "@babel/preset-typescript"],
                plugins: [
                  [
                    "babel-plugin-module-resolver",
                    {
                      root: ["."],
                      alias: {
                        "@architus/facade": "../design/src",
                        "@architus/lib": "../lib/src",
                        "@docs": "./src",
                      },
                    },
                  ],
                ],
              },
            },
          ],
        ],
        plugins: [
          [
            "babel-plugin-module-resolver",
            {
              root: ["."],
              alias: {
                "@architus/facade": "../design/src",
                "@architus/lib": "../lib/src",
                "@docs": "./src",
              },
            },
          ],
        ],
      },
    },
  },
};
