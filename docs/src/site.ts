import { Nil } from "@lib/types";
import { isDefined } from "@lib/utility";

const withoutTrailing = (pathPrefix: string): string =>
  pathPrefix.slice(-1) === "/" ? pathPrefix.slice(0, -1) : pathPrefix;
const withoutLeading = (path: string): string =>
  path.slice(0, 1) === "/" ? path.slice(1) : path;

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
