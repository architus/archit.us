module.exports = {
  ...require("../.shared/jest-base"),
  setupFiles: [`<rootDir>/src/test/loader-shim.js`],
  globalSetup: `<rootDir>/src/test/global-setup.js`,
};
