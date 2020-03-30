// This file is used across both Node.js building and the final site

/**
 * Gets the RESTful API base URL to use
 */
const API_BASE: string = process.env.PRODUCTION_URL
  ? "https://api.archit.us"
  : "https://api.develop.archit.us";

/**
 * Gets the Gateway API base URL to use
 */
const GATEWAY_API_BASE: string = process.env.PRODUCTION_URL
  ? "https://gateway.archit.us"
  : "https://gateway.develop.archit.us";

if (
  typeof window === "undefined" &&
  Object.getOwnPropertyDescriptor(module, "exports")?.configurable
) {
  module.exports = { API_BASE, GATEWAY_API_BASE };
}

export { API_BASE, GATEWAY_API_BASE };
