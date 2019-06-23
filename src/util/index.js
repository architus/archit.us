import { left, right } from "./names";

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

export const generateName = (noSpace = false) => {
  const li = Math.floor(Math.random() * left.length);
  const ri = Math.floor(Math.random() * right.length);
  const lv = left[li];
  const rv = right[ri];
  return noSpace ? `${lv}_${rv}` : `${lv} ${rv}`;
};