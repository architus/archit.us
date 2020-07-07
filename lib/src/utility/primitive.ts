import { Nil } from "@lib/types";

/**
 * Determines whether a value is defined (non-undefined or null). Returns true if the
 * value is non-nil, false otherwise
 * @param value - The value to check for nil-ness
 */
export function isDefined<T>(value: Nil | T): value is T {
  return !(value == null);
}

/**
 * Determines whether a value is nil (null or undefined). Returns true if the value is
 * nil, false otherwise
 * @param value - The value to check for nil-ness
 */
export function isNil(value: unknown): value is Nil {
  return value == null;
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
export function isExternal(href: string): boolean {
  return getExternalRegex().test(href);
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
 * Escapes special regular expression characters.
 * From https://stackoverflow.com/a/9310752/13192375
 * @param raw - raw *unescaped) regex template
 */
export function escapeRegex(raw: string): string {
  return raw.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
