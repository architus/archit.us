const base = require("../.shared/jest-base");

module.exports = {
  ...base,
  testPathIgnorePatterns: [
    ...base.testPathIgnorePatterns,
    `\\.cache`,
    `\\.linaria-cache`,
    `<rootDir>.*/public`,
  ],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  setupFiles: [`<rootDir>/src/test/loader-shim.js`],
  moduleNameMapper: {
    ...base.moduleNameMapper,
    ".+\\.(svg)$": `<rootDir>/__mocks__/svg-mock.js`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
  },
};
