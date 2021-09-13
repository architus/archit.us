import { withPathPrefix } from "@architus/lib/path";

/**
 * Gets the RESTful API base URL to use
 */
export const API_BASE: string = process.env.GATSBY_PRODUCTION
  ? "https://api.archit.us"
  : "https://api.develop.archit.us";

/**
 * Gets the Gateway API base URL to use
 */
export const GATEWAY_API_BASE: string = process.env.GATSBY_PRODUCTION
  ? "https://gateway.archit.us"
  : "https://gateway.develop.archit.us";

/**
 * resolves a path with the optional base path
 * @param path - base path with leading /
 */
export function withBasePath(path: string): string {
  // This value is injected via Webpack's DefinePlugin.
  // For some reason, the normal gatsby behavior doesn't work so
  // we need to inject it manually.
  // See gatsby-node.ts#injectPathPrefixDefinition
  const maybePrefix = process.env.INJECTED_PATH_PREFIX;
  return withPathPrefix(path, maybePrefix ?? "/");
}
