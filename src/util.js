// Sourced from A-Frame VR toolkit
export const getUrlParameter = name => {
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

export const constructAvatarUrl = (clientId, hash, size) =>
  !isEmptyOrNil(clientId) && !isEmptyOrNil(hash) && !isNil(size)
    ? `https://cdn.discordapp.com/avatars/${clientId}/${hash}.png?size=${size}`
    : "";

export const clearUrlQueries = () =>
  window.history.replaceState(
    {},
    window.document.title,
    `${window.location.protocol}//${window.location.host}${window.location.pathname}`
  );

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
    newObject[key] = sourceObject[key];
  });
  return newObject;
};

const logPrefix = "Aut-bot App";
export const log = message => console.log(`[${logPrefix}] ${message}`);

const formatAMPM = date => {
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
