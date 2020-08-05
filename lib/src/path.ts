import { Nil } from "./types";
import { trimPrefix, isDefined } from "./utility/primitive";

/**
 * Splits a path into its individual components
 * @param path - Original path string
 */
export function splitPath(path: string): string[] {
  return withoutTrailing(withoutLeading(path)).split("/");
}

const cachedExternalRegex = /^(?:(?:http|https):\/\/(?!(?:www\.)?archit.us)[\w./=?#-_]+)|(?:mailto:.+)$/;
let externalRegex: RegExp | null = null;

/**
 * Lazily gets the regular expression used to determine if a link is external, using
 * `window.location.host` if available and caching the created regex
 */
export function getExternalRegex(): RegExp {
  if (isDefined(externalRegex)) return externalRegex;
  if (typeof window !== "undefined") {
    const regexStr = `^(?:(?:http|https):\\/\\/(?!(?:www\\.)?${window.location.host})[\\w./=?#-_]+)|(?:mailto:.+)$`;
    const regex = new RegExp(regexStr);
    externalRegex = regex;
    return externalRegex;
  }
  return cachedExternalRegex;
}

/**
 * Determines whether a link is an external link or not
 * @param href - Href to test
 */
export function isExternal(path: string): boolean {
  return getExternalRegex().test(path);
}

/**
 * Trims a file path into its normalized shape
 * @param path - original file path
 */
export function trimFilePath(
  path: string,
  extensions: string | string[] = []
): string {
  let withoutExtensions = path;
  if (typeof extensions === "string") {
    withoutExtensions = withoutExtensions.replace(`.${extensions}`, "");
  } else if (isDefined(withoutExtensions)) {
    extensions.forEach((ext) => {
      withoutExtensions = withoutExtensions.replace(`.${ext}`, "");
    });
  }
  return `/${withoutExtensions.replace("index", "").replace(/\/$/, "")}`;
}

/**
 * Adds a path prefix to a base path
 * @param path - Base path
 * @param prefix - Path prefix to add at the beginning
 */
export function withPathPrefix(path: string, prefix: string | Nil): string {
  return isDefined(prefix) && prefix.trim().length > 0 && prefix !== "/"
    ? `${normalizePath(prefix)}/${withoutLeading(path)}`
    : path;
}

/**
 * Normalizes an absolute site path
 */
export function normalizePath(path: string): string {
  return `/${withoutTrailing(withoutLeading(path))}`;
}

/**
 * Trims a path to make it be without a trailing slash
 * @param pathPrefix - Base path
 */
export function withoutTrailing(path: string): string {
  return path.slice(-1) === "/" ? path.slice(0, -1) : path;
}

/**
 * Trims a path to make it be without a leading slash
 * @param pathPrefix - Base path
 */
export function withoutLeading(path: string): string {
  return path.slice(0, 1) === "/" ? path.slice(1) : path;
}

/**
 * Performs basic window location matching on an (absolute) path, taking
 * into account partial matching and an optional path prefix
 */
export function locationMatches({
  path,
  pathPrefix = null,
  location,
  partial = false,
}: {
  path: string;
  pathPrefix?: string | Nil;
  location: string;
  partial?: boolean;
}): boolean {
  // Remove the path prefix if it exists
  let actualLocation = location;
  if (isDefined(pathPrefix) && pathPrefix !== "/") {
    const withLeading = `/${withoutLeading(pathPrefix)}`;
    if (!actualLocation.startsWith(withLeading)) return false;
    actualLocation = trimPrefix(actualLocation, withLeading);
  }

  const normalizedLocation = normalizePath(actualLocation);
  const normalizedPath = normalizePath(path);
  return partial
    ? normalizedLocation.startsWith(normalizedPath)
    : normalizedLocation === normalizedPath;
}
