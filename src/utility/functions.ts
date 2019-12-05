import { Supplier } from "./types";

/**
 * Identity function that maps an object onto itself
 */
export const identity = <T>(o: T): T => o;

/**
 * Returns a promise that resolves once the set milliseconds have elapsed (can not error)
 *
 * @param ms Milliseconds to sleep for
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Consumes either an input or a lazily-evaulated supplier function to produce a single
 * value
 *
 * @param input Either a direct value or lazily evaluated function
 */
export function consume<A>(input: A | Supplier<A>): A {
  if (typeof input === "function") return (input as Supplier<A>)();
  else return input;
}
