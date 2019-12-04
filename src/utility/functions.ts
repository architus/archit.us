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
