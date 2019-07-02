// Sourced from A-Frame VR toolkit
export const getUrlParameter = name => {
  if (typeof window === "undefined") return "";

  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

export const addMissingUnit = dimension =>
  isNaN(dimension) ? dimension : `${dimension}px`;

export const multiplyDimension = (dimension, scalar) => {
  if (typeof dimension === "number") return dimension * scalar;
  else if (!isNaN(dimension)) return Number.parseFloat(dimension) * scalar;
  else {
    const dimensionRegex = /^([0-9]*\.?[0-9]*)([A-Za-z%]+)$/g;
    const matches = dimensionRegex.exec(dimension);
    return `${(Number.parseFloat(matches[1]) * scalar).toFixed(3)}${
      matches[2]
    }`;
  }
};

export const isNil = value => value == null;

export const isEmptyOrNil = string =>
  isNil(string) || string.toString().trim() === "";

export const processIfNotEmptyOrNil = (string, apply) =>
  isEmptyOrNil(string) ? string : apply(string);

const avatarSizes = [16, 32, 40, 64, 128, 256, 512, 1024];
const nextLargerSize = size => {
  const number = parseInt(size);
  for (let avatarSize of avatarSizes) {
    if (avatarSize > number) return avatarSize;
  }
  return avatarSizes[avatarSizes.length - 1];
};
export const constructAvatarUrl = (clientId, hash, size, discriminator) => {
  if (!isEmptyOrNil(clientId)) {
    if (!isEmptyOrNil(hash)) {
      const sizeAppend = !isNil(size) ? `?size=${nextLargerSize(size)}` : "";
      return `https://cdn.discordapp.com/avatars/${clientId}/${hash}.png${sizeAppend}`;
    } else {
      // default avatar
      const avatarNumber = discriminator % 5;
      return `https://cdn.discordapp.com/embed/avatars/${avatarNumber}.png`;
    }
  }
};

export const clearUrlQueries = () => {
  if (typeof window === "undefined") return;
  window.history.replaceState(
    {},
    window.document.title,
    `${window.location.protocol}//${window.location.host}${window.location.pathname}`
  );
};

// probably will be enough
export const HttpVerbs = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE"
};

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

const logPrefix = "Aut-bot App";
export const log = message => console.log(`[${logPrefix}] ${message}`);

export const formatAMPM = date => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
};
export const toHumanTime = date => `Today at ${formatAMPM(date)}`;

export const randomDigitString = length =>
  (~~(Math.random() * 10 ** length)).toString().padStart(length, "0");

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

// Fastest html escaping function according to https://jsperf.com/htmlencoderegex/35
export const escapeHtml = string =>
  typeof window !== "undefined"
    ? window.document
        .createElement("div")
        .appendChild(window.document.createTextNode(string)).parentNode
        .innerHTML
    : string
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

export const escapeMarkdown = string =>
  string
    .replace(/\[/g, "&lsqb;", "g")
    .replace(/\]/g, "&rsqb;", "g")
    .replace(/!/g, "&excl;", "g");

// from https://codereview.stackexchange.com/questions/61632/object-key-value-map-reversal
const id = x => x;
export const reverseMapFromMap = (map, f) =>
  Object.keys(map).reduce(function(acc, k) {
    acc[map[k]] = (acc[map[k]] || []).concat((f || id)(k));
    return acc;
  }, {});

export const includes = (array, func) => array.findIndex(func) !== -1;

function getScrollRemainder(scrollContainer) {
  const scrollHeight = scrollContainer.scrollHeight;
  const height = scrollContainer.clientHeight;
  return scrollHeight - height;
}

export function getScrollDistance(scrollContainer) {
  return Math.abs(
    scrollContainer.scrollTop - getScrollRemainder(scrollContainer)
  );
}

export function scrollToBottom(scrollContainer) {
  scrollContainer.scrollTop = getScrollRemainder(scrollContainer);
}
