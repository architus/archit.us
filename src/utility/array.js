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
