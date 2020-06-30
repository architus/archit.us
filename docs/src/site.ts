import { Nil } from "@lib/types";
import { isDefined, withoutTrailing, withoutLeading } from "@lib/utility";

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
