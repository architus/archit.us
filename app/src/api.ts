import { withPathPrefix } from "@architus/lib/path";

/**
 * Gets the RESTful API base URL to use
 */
export const API_BASE: string = process.env.PRODUCTION
  ? "https://api.archit.us"
  : "https://api.develop.archit.us";

/**
 * Gets the Gateway API base URL to use
 */
export const GATEWAY_API_BASE: string = process.env.PRODUCTION
  ? "https://gateway.archit.us"
  : "https://gateway.develop.archit.us";

/**
 * resolves a path with he optional base path
 * @param path - base path with leading /
 */
export function withBasePath(path: string): string {
  const maybePrefix =
    typeof window === "undefined"
      ? undefined
      : (window as { __BASE_PATH__?: string })?.__BASE_PATH__;
  const prefixed = withPathPrefix(path, maybePrefix ?? "/");
  console.log({ path, maybePrefix, prefixed });
  return prefixed;
}
