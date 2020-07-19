const base = require("../.shared/jest-base");

module.exports = {
  ...base,
  globalSetup: `<rootDir>/src/test/global-setup.js`,
};
