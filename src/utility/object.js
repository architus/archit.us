export const isNil = value => value == null;
export const isDefined = value => !isNil(value);

export const pick = (sourceObject, keys) => {
  const newObject = {};
  keys.forEach(key => {
    if (typeof key === "string") newObject[key] = sourceObject[key];
    else if (typeof key === "object") {
      const keyKeys = Object.keys(key);
      if (keyKeys.length > 0) {
        const sourceKey = keyKeys[0];
        const newKey = key[keyKeys[0]];
        newObject[newKey] = sourceObject[sourceKey];
      }
    }
  });
  return newObject;
};

// from https://codereview.stackexchange.com/questions/61632/object-key-value-map-reversal
const id = x => x;
export const reverseMapFromMap = (map, f) =>
  Object.keys(map).reduce(function(acc, k) {
    acc[map[k]] = (acc[map[k]] || []).concat((f || id)(k));
    return acc;
  }, {});
