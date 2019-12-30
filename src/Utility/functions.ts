import { Supplier } from "./types";
import { toJSON } from "./primitives";
import { warn } from "./logging";

/**
 * Identity function that maps an object onto itself
 */
export const identity = <T>(o: T): T => o;

/**
 * Returns a promise that resolves once the set milliseconds have elapsed (can not error)
 * @param ms - Milliseconds to sleep for
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Consumes either an input or a lazily-evaulated supplier function to produce a single
 * value
 * @param input - Either a direct value or lazily evaluated function
 */
export function consume<A>(input: A | Supplier<A>): A {
  if (typeof input === "function") return (input as Supplier<A>)();
  return input;
}

/**
 * Makes `assertUnreachable` or `throwUnreachable` error string
 * @param value - Value to make error for
 */
function makeUnreachableError(value: unknown): string {
  const valueStr = toJSON(value).getOrElse("undefnied");
  return `Reached unreachable code due to value: ${valueStr}`;
}

/**
 * Asserts a code path as unreachable, throwing an Error if in development,
 * otherwise causing a no-op in production
 * @param value - Invalid value that causes this case to occur. Can be
 * a message string instead
 */
export function assertUnreachable(value: unknown): void {
  const error = makeUnreachableError(value);
  warn(error);
  if (process.env.NODE_ENV === "development") {
    throw new Error(error);
  }
}

/**
 * Asserts a code path as unreachable, throwing an Error always
 * @param value - Invalid value that causes this case to occur. Can be
 * a message string instead
 */
export function throwUnreachable(value: unknown): never {
  const error = makeUnreachableError(value);
  warn(error);
  throw new Error(error);
}
