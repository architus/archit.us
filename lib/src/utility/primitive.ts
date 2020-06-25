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
