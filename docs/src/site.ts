import { Nil } from "@lib/types";
import {
  isDefined,
  withoutTrailing,
  withoutLeading,
  trimPrefix,
} from "@lib/utility";

/**
 * Adds a path prefix to a base path
 * @param pathPrefix - Path prefix to add at the beginning
 * @param base - Base path
 */
export function withPathPrefix(pathPrefix: string | Nil, base: string): string {
  return isDefined(pathPrefix)
    ? `${withoutTrailing(pathPrefix)}/${withoutLeading(base)}`
    : base;
}

/**
 * Normalizes an absolute site path
 */
export function normalizePath(path: string): string {
  return `/${withoutTrailing(withoutLeading(path))}`;
}

/**
 * Performs basic window location matching on an (absolute) path, taking
 * into account partial matching and an optional path prefix
 */
export function locationMatches({
  pathPrefix = null,
  path,
  location,
  partial = false,
}: {
  pathPrefix?: string | Nil;
  path: string;
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
