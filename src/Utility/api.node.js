module.exports = {
  /**
   * Gets the RESTful API base URL to use
   */
  API_BASE: process.env.PRODUCTION_URL
    ? "https://api.archit.us"
    : "https://api.develop.archit.us",

  /**
   * Gets the Gateway API base URL to use
   */
  GATEWAY_API_BASE: process.env.PRODUCTION_URL
    ? "https://gateway.archit.us"
    : "https://gateway.develop.archit.us"
};
