module.exports = async (): Promise<void> => {
  // Lock the timezone to UTC in tests
  // https://stackoverflow.com/a/56482581/13192375
  process.env.TZ = "UTC";
};
