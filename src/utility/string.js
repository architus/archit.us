import zip from "lodash/zip";
import flatten from "lodash/flatten";
import compact from "lodash/compact";
import { isNil } from "./object";
import { isClient } from "./document";
import { left, right } from "./names.json";

export function generateName(noSpace = false) {
  const li = Math.floor(Math.random() * left.length);
  const ri = Math.floor(Math.random() * right.length);
  const lv = left[li];
  const rv = right[ri];
  return noSpace ? `${lv}_${rv}` : `${lv} ${rv}`;
}

export function toAcronym(string = "") {
  return string.match(/\b(\w|[-_])/g).join("");
}

export const isEmptyOrNil = string =>
  isNil(string) || string.toString().trim() === "";

export const processIfNotEmptyOrNil = (string, apply) =>
  isEmptyOrNil(string) ? string : apply(string);

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

const logPrefix = "Architus App";
export const log = isClient
  ? window.console.log.bind(`[${logPrefix}] %s`)
  : () => null;
export const warn = isClient
  ? window.console.warn.bind(`[${logPrefix}] %s`)
  : () => null;

export function replaceAll(string, replace, replaceWith) {
  const regex = escapeRegExp(replace);
  const regexObj = new RegExp(regex, "g");
  return string.replace(regexObj, replaceWith);
}

export const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base"
});

// ? ==============
// ? Path functions
// ? ==============

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

export function splitPath(path) {
  const trimmedPath = path.charAt(0) === "/" ? path.substr(1) : path;
  return (trimmedPath.slice(-1) === "/"
    ? trimmedPath.slice(0, -1)
    : trimmedPath
  ).split("/");
}

export function isInPath({ path, fragment, position = null }) {
  // Null test
  if (isNil(path) || isNil(fragment)) return false;
  if (isNil(position)) {
    // Simple contains test
    return path.indexOf(fragment) !== -1;
  } else {
    // Position-based test
    const pathComponents = splitPath(path);
    if (pathComponents.length <= position) return false;
    else {
      if (typeof fragment === "string") {
        // Fragment equality test
        return pathComponents[position] === fragment;
      } else {
        // Regex test
        return fragment.test(pathComponents[position]);
      }
    }
  }
}

// ? ===============
// ? Regex functions
// ? ===============

export function splitFragments(string, regex) {
  const excludedFragments = string.split(regex);
  const matchedFragments = allMatches(string, regex);
  const sequence = flatten(zip(excludedFragments, matchedFragments));
  return compact(sequence);
}

export function remakeRegex(source) {
  return new RegExp(source.source, source.flags);
}

export function allMatches(string, regex) {
  regex = remakeRegex(regex);
  let matches = [];
  let currentMatch;
  do {
    currentMatch = regex.exec(string);
    if (currentMatch) matches.push(currentMatch[0]);
  } while (currentMatch);
  return matches;
}

export function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// ? ======================
// ? Regex constants
// ? ======================

export const alphanumericRegex = /[_\W]+/g;
