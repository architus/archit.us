// This file is used across both Node.js building and the final site

/**
 * Gets the RESTful API base URL to use
 */
const API_BASE: string = process.env.PRODUCTION
  ? "https://api.archit.us"
  : "https://api.develop.archit.us";

/**
 * Gets the Gateway API base URL to use
 */
const GATEWAY_API_BASE: string = process.env.PRODUCTION
  ? "https://gateway.archit.us"
  : "https://gateway.develop.archit.us";

/**
 * resolves a path with he optional base path
 * @param path - base path with leading /
 */
function withBasePath(path: string): string {
  if (process.env.SITE_BASE_PATH)
    return `/${process.env.SITE_BASE_PATH}${path}`;
  return path;
}

if (
  typeof window === "undefined" &&
  Object.getOwnPropertyDescriptor(module, "exports")?.configurable
) {
  module.exports = { API_BASE, GATEWAY_API_BASE, withBasePath };
}

export { API_BASE, GATEWAY_API_BASE, withBasePath };
