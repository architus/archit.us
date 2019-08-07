export function isNil(value) {
  return value == null;
}
export function isDefined(value) {
  return !isNil(value);
}

export function pick(sourceObject, keys) {
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
}

// from https://codereview.stackexchange.com/questions/61632/object-key-value-map-reversal
export function invertMap(map, f) {
  return Object.keys(map).reduce(function(acc, k) {
    acc[map[k]] = (acc[map[k]] || []).concat((f || identity)(k));
    return acc;
  }, {});
}

export const identity = o => o;

export const sleep = m => new Promise(r => setTimeout(r, m));
