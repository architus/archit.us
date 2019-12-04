export function isNil(value) {
  return value == null;
}
export function isDefined(value) {
  return !isNil(value);
}

export const identity = o => o;

export const sleep = m => new Promise(r => setTimeout(r, m));

