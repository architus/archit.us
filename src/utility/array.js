import { isNil } from "./object";

export const includes = (array, func) => array.findIndex(func) !== -1;

export const takeOrReplenish = (map, key, nextKey, source) => {
  const take = (map, key) => {
    let currentKey = key;
    while (isNil(map[currentKey])) {
      currentKey = nextKey(currentKey);
      if (currentKey === key) return null;
    }
    const value = map[currentKey];
    map[currentKey] = null;
    return value;
  };
  const replenish = (map, source) => {
    Object.keys(source).forEach(k => (map[k] = source[k]));
  };
  const result = take(map, key);
  if (isNil(result)) {
    replenish(map, source);
    return takeOrReplenish(map, key, nextKey, source);
  } else return result;
};

export function binarySearch(
  sortedArr,
  element,
  { start = null, end = null, comparator = (a, b) => a < b } = {}
) {
  if (isNil(sortedArr) || !Array.isArray(sortedArr)) return -1;
  if (isNil(start)) start = 0;
  if (isNil(end)) end = sortedArr.length - 1;
  while (start <= end) {
    let midpoint = Math.floor((start + end) / 2);
    if (sortedArr[midpoint] === element) return midpoint;
    else if (comparator(sortedArr[midpoint], element)) start = midpoint + 1;
    else end = midpoint - 1;
  }
  return -1;
}
