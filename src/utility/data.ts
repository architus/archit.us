import { randomInt } from "./primitives";
import { Nil, Predicate, RecordKey, Comparator } from "./types";

/**
 * Determines whether a value is defined (non-undefined or null). Returns true if the value
 * is non-nil, false otherwise
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
export function isNil<T>(value: Nil | T): value is Nil {
  return value == null;
}

// ? ========================
// ? Object-related functions
// ? ========================

/**
 * Creates a new object with a null prototype (no attached methods). This means
 * that toString() will not work (among other methods defined in Object.prototype)!
 */
export function createObject(): object {
  return Object.create(null) as object;
}

/**
 * Returns an generator that iterates on each [key, value] tuple of the given object
 * @param obj - The object to obtain an entries iterator for
 * @param checkHasProperty - Whether to check if the object has own property for each key
 *  (as to not include prototype-inherited keys)
 */
export function* entries<K extends RecordKey, V>(
  obj: Record<K, V>,
  checkHasProperty = true
): IterableIterator<[K, V]> {
  for (const key in obj) {
    if (!checkHasProperty || obj.hasOwnProperty(key)) {
      yield [key, obj[key]];
    }
  }
}

/**
 * Tries to take a key from an object, trying until either a. one is found or b. the
 * currently attempted key reaches the initial one. Returns a record value, or null if
 * the nextKey function wrapped around to the initial key
 * @param state - Current record set, where each value could be null
 * @param initial - The key to try first
 * @param nextKey - A function used to get the next key in a circular sequence, starting at
 *  the initial key. Note: this function MUST wrap back to the initial key eventually to
 *  prevent an infinite loop
 */
function tryTake<K extends RecordKey, V>(
  state: Record<K, V | null>,
  initial: K,
  nextKey: (prev: K, state: Record<K, V | null>) => K
): V | null {
  let currentKey: K = initial;
  while (isNil(state[currentKey])) {
    currentKey = nextKey(currentKey, state);
    // Loop back to beginning check
    if (currentKey === initial) return null;
  }
  const value: V | null = state[currentKey];
  state[currentKey] = null;
  return value;
}

/**
 * Takes a value from the current record set, starting at the initial key and proceeding
 * until either a value is found or the record set needs to be replenished from the template.
 * @param state - The current record set, where each value could be null
 * @param key - The key to try to take from first
 * @param nextKey - A function used to get the next key in a circular sequence, starting at
 *  the initial key. Note: this function MUST wrap back to the initial key eventually to
 *  prevent an infinite loop
 * @param template - A template record set to replenish the current one when a non-null value
 *  can't be found
 */
export function takeOrReplenish<K extends RecordKey, V>(
  state: Record<K, V | null>,
  key: K,
  nextKey: (prev: K, state: Record<K, V | null>) => K,
  template: Record<K, V>
): V {
  let result: V | null = tryTake(state, key, nextKey);
  if (isNil(result)) {
    // Replenish the state
    Object.assign(state, template);
    result = tryTake(state, key, nextKey);
    if (isNil(result)) {
      throw Error("Failed to take value after replenishing pool");
    }
  }
  return result;
}

/**
 * Maps the values of an object to another object
 * @param original The original object to map the entries of
 * @param _ The mapping function to apply
 * @param keepPrototype Whether or not to construct the new object with the prototype
 * of the original. Defaults to `false` for type safety concerns
 */
export function mapValues<A, B, K extends RecordKey>(
  original: Record<K, A>,
  _: (a: A, k: K) => B,
  keepPrototype = false
): Record<K, B> {
  const newObj: Record<K, B> = new Object(
    keepPrototype ? Object.getPrototypeOf(original) : null
  ) as Record<K, B>;
  for (const [key, value] of entries(original)) {
    newObj[key] = _(value, key);
  }
  return newObj;
}

/**
 * Maps the entries of an object to another object
 * @param original The original object to map the entries of
 * @param _ The mapping function to apply
 * @param keepPrototype Whether or not to construct the new object with the prototype
 * of the original. Defaults to `false` for type safety concerns
 */
export function mapEntries<A, B, K extends RecordKey, L extends RecordKey>(
  original: Record<K, A>,
  _: (k: K, a: A) => [L, B],
  keepPrototype = false
): Record<L, B> {
  const newObj: Record<L, B> = new Object(
    keepPrototype ? Object.getPrototypeOf(original) : null
  ) as Record<L, B>;
  for (const [key, value] of entries(original)) {
    const [newKey, newVal] = _(key, value);
    newObj[newKey] = newVal;
  }
  return newObj;
}

// ? ========================
// ? Map-related functions
// ? ========================

/**
 * Inverts a map from key =\> value to value =\> [keys]
 * @param map - The map to invert
 */
export function invertMap<K, V>(map: Map<K, V>): Map<V, K[]> {
  const newMap: Map<V, K[]> = new Map<V, K[]>();
  for (const [key, value] of map) {
    const currentValue = newMap.get(value);
    if (isDefined(currentValue)) {
      // Add to existing array entry
      currentValue.push(key);
    } else {
      // Create new array entry
      newMap.set(value, [key]);
    }
  }
  return newMap;
}

/**
 * Converts a vanilla JS object to an ES6 Map. Returns a new Map object consisting of the
 * direct entries in object
 * @param obj - The object to convert to a map
 */
export function toMap<K extends RecordKey, V>(obj: Record<K, V>): Map<K, V> {
  // Don't use keys from object's prototype in resultant map (checkHasProperty=true)
  const entriesGenerator = entries(obj, true);
  return new Map(entriesGenerator);
}

// ? ========================
// ? Array-related functions
// ? ========================

/**
 * Searches for a value in a function that passes the given predicate function. Returns
 * true if at least one value passes the predicate function, else false
 * @param array - The array to search for the function result in
 * @param func - A predicate function
 */
export function includes<T>(array: T[], func: Predicate<T>): boolean {
  return array.findIndex(func) !== -1;
}

/**
 * Selects a random item from an array
 * @param arr Array to pull an item from
 */
export function randomItem<T>(arr: T[]): T | null {
  if (arr.length <= 0) return null;
  else return arr[randomInt(arr.length)];
}

/**
 * Performs a binary search on the pre-sorted array to find the given element's index, or
 * -1 if it could not be found. Guaranteed to run in O(lg(n)) time for input size of n
 * @param sortedArr - Pre-sorted array to perform binary search on
 * @param element - Element to search for (uses comparator function = 0)
 * @param start - Start index to begin searching at (inclusive)
 * @param end - End index to stop searching at (inclusive)
 * @param comparator - Comparator function to use (`-1 iff a < b`,
 * `0 iff a == b`, `1 iff a > b`)
 */
export function binarySearch<T>(
  sortedArr: T[],
  element: T,
  options: {
    start: number | Nil;
    end: number | Nil;
    comparator: Comparator<T>;
  } = {
    start: null,
    end: null,
    comparator: (a, b): number => {
      if (a < b) return -1;
      else if (a > b) return 1;
      else return 0;
    }
  }
): number {
  const { start, end, comparator } = options;
  let startIndex: number = start ?? 0;
  let endIndex: number = end ?? sortedArr.length - 1;
  while (startIndex <= endIndex) {
    const midpoint: number = Math.floor((startIndex + endIndex) / 2);
    const comparatorResult = comparator(sortedArr[midpoint], element);
    if (comparatorResult === 0) return midpoint;
    else if (comparatorResult < 0) {
      startIndex = midpoint + 1;
    } else {
      endIndex = midpoint - 1;
    }
  }
  return -1;
}
