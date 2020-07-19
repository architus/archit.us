import { isNil, isDefined, randomItem } from "./data";
import { isClient, isRemote } from "./document";
import { left, right } from "./names.json";
import { identity } from "./functions";
import { error } from "./logging";
import { Option, Some, None } from "./option";
import {
  Dimension,
  RawDimension,
  DimensionUnit,
  dimensionUnits,
  Nil,
  isDimension,
} from "./types";

/**
 * Generates a random name based on the Docker container naming algorithm (adjective,
 * famous scientist)
 * @param separator - Separator used between first and last name
 */
export function generateName(separator = " "): string {
  if (left.length === 0 || right.length === 0) {
    error("Could not generate name: name pool is insufficient");
    return randomNumericString(20);
  }

  // Won't be null due to aggressive checking above
  const leftName = randomItem(left);
  const rightName = randomItem(right);
  return `${leftName}${separator}${rightName}`;
}

const RANDOM_STRING_SPLIT_START = 2;
const RANDOM_STRING_SPLIT_END = 15;
const RANDOM_STRING_SPLIT_LENGTH =
  RANDOM_STRING_SPLIT_END - RANDOM_STRING_SPLIT_START;

/**
 * Creates a random numeric string of the specified length
 * @param length - Length of the generated string
 */
export function randomNumericString(length: number): string {
  if (length <= 0) return "";
  const numSplits = Math.floor((length - 1) / RANDOM_STRING_SPLIT_LENGTH + 1);
  let generated = "";
  for (let i = 0; i < numSplits; ++i) {
    const isLast = i === numSplits - 1;
    if (isLast) {
      const remainder = length % RANDOM_STRING_SPLIT_LENGTH;
      generated += Math.random()
        .toString(10)
        .substring(
          RANDOM_STRING_SPLIT_START,
          RANDOM_STRING_SPLIT_START + remainder
        );
    } else {
      generated += Math.random()
        .toString(10)
        .substring(RANDOM_STRING_SPLIT_START, RANDOM_STRING_SPLIT_END);
    }
  }
  return generated;
}

/**
 * Generates and returns an integer in the range of between 0, inclusive, and max,
 * exclusive
 * @param max - Upper exclusive bound
 */
export function randomInt(max: number): number {
  if (max <= 0) return 0;
  return Math.floor(Math.random() * max);
}

/**
 * Turns a string from a title to the corresponding acronym, keeping track of hyphens and
 * underscores
 * @param title - The original title to transform into an acronym
 */
export function toAcronym(title: string): string {
  const match = title.match(/\b(\w|[-_])/g);
  if (isDefined(match)) return match.join("");
  return "";
}

export const isEmptyOrNil = (input: string | Nil): input is string =>
  isNil(input) || input.toString().trim() === "";

/**
 * Processes a string by applying the mapping function if not empty (all whitespace) or nil
 * @deprecated use `Option.from(input).map(apply).getOrNull()`
 * @param string - The string to consume/process
 * @param apply - The processing function to use
 */
export const processIfNotEmptyOrNil = (
  input: string | Nil,
  apply: (input: string) => string | Nil = identity
): string | Nil =>
  isNil(input) || input.toString().trim() === "" ? input : apply(input);

/**
 * Adds a missing unit to a dimension string
 * @deprecated use `parseDimension(dimension)`
 * @param dimension - The raw dimension text ot number to process
 */
export function addMissingUnit(dimension: RawDimension): Dimension {
  const parsed: Option<Dimension> = parseDimension(dimension);
  return parsed.getOrElse({ unit: "px", amount: 0 });
}

const DIMENSION_REGEX = /^([0-9]*\.?[0-9]*)([A-Za-z%]+)$/;

/**
 * Parses a raw dimension object (string or number) into a Some<Dimension> if successful,
 * else None
 * @param rawDimension - The string or number value to parse and validate
 */
export function parseDimension(rawDimension: RawDimension): Option<Dimension> {
  if (typeof rawDimension === "object") {
    if (isDimension(rawDimension)) {
      return Some(rawDimension);
    }

    return None;
  }

  if (typeof rawDimension === "number")
    return Some({ unit: "px", amount: rawDimension });

  const parsed = Number(rawDimension);
  if (isNaN(parsed)) {
    // Attempt to parse as a dimension string with unit
    const matches = DIMENSION_REGEX.exec(rawDimension);
    if (isNil(matches)) {
      return None;
    }
    const amount: number = Number.parseFloat(matches[1]);
    const unit: string = matches[2];
    // Validate the unit
    if (dimensionUnits.includes(unit)) {
      return Some({ unit: unit as DimensionUnit, amount });
    }
    return None;
  }
  // Preserve type
  return Some({ unit: "px", amount: parsed });
}

/**
 * Formats a dimension object into a CSS-consumable string
 * @param dimension - The source Dimension object to format
 * @param precision - The number of digits of dimension.amount to include in the string
 * (defaults to 3)
 */
export function formatDimension(dimension: Dimension, precision = 3): string {
  return `${dimension.amount.toFixed(precision)}${dimension.unit}`;
}

/**
 * Multiplies a dimension object's amount by the given amount
 * @param dimension - Dimension object
 * @param scalar - Unitless number to multiply the dimension by
 */
export function multiplyDimension(
  dimension: Dimension,
  scalar: number
): Dimension {
  return {
    amount: dimension.amount * scalar,
    unit: dimension.unit,
  };
}

/**
 * Escapes all HTML entities from a string using a different method depending on whether
 * the code runs in the browser or in node.js. For the client, it uses the fastest html
 * escaping function according to https://jsperf.com/htmlencoderegex/35
 * @param string - String to escape HTML for
 */
export function escapeHtml(input: string): string {
  if (isClient) {
    const node: HTMLElement | null = window?.document
      ?.createElement("div")
      ?.appendChild(window.document.createTextNode(input))
      .parentNode as HTMLElement;
    return node?.innerHTML ?? naiveEscapeHtml(input);
  }
  return naiveEscapeHtml(input);
}

/**
 * Applies a naive platform-agnostic method to escape HTML entities from a string using
 * a simple string replacement algorithm.
 * @param input - String to escape HTML for
 */
function naiveEscapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Escapes markdown entities from the given string using a naive string replacement algorithm.
 * @param string - String to escape Markdown for
 */
export function escapeMarkdown(input: string): string {
  return input
    .replace(/\[/g, "&lsqb;")
    .replace(/\]/g, "&rsqb;")
    .replace(/!/g, "&excl;");
}

/**
 * Formats a date's time to appear in the format of `HH:MM {A,P}M`
 * @param date - The date to format
 */
export function formatAmPm(date: Date): string {
  const minutes = date.getMinutes();
  const amPm = date.getHours() >= 12 ? "PM" : "AM";
  let hours = date.getHours() % 12;
  if (hours === 0) hours = 12;
  return `${hours}:${minutes.toString().padStart(2, "0")} ${amPm}`;
}

/**
 * Formats a date's time to appear in the format of `Today at HH:MM {A,P}M`
 * @param date - The date to format
 */
export function toHumanTime(date: Date): string {
  return `Today at ${formatAmPm(date)}`;
}

/**
 * Replaces all occurrences of the replace string with the replaceWith string in the
 * original string input
 * @param string - The original string to look for matches in
 * @param replace - The match text to search for
 * @param replaceWith - The string to replace the match text once found
 */
export function replaceAll(
  input: string,
  replace: string,
  replaceWith: string
): string {
  const regex = escapeRegExp(replace);
  const regexObj = new RegExp(regex, "g");
  return input.replace(regexObj, replaceWith);
}

/**
 * Number collator value
 */
export const collator: Intl.Collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

/**
 * Encodes a string into base 64
 * @param raw - Raw plaintext string
 */
export function encodeBase64(raw: string): string {
  if (isClient) {
    return window.btoa(raw);
  }
  return Buffer.from(raw).toString("base64");
}

/**
 * Decodes a base 64 string
 * @param encoded - Base-64 encoded string
 */
export function decodeBase64(encoded: string): string {
  if (isClient) {
    return window.atob(encoded);
  }
  return Buffer.from(encoded, "base64").toString();
}

export function toJSON(toEncode: unknown): Option<string> {
  if (isNil(toEncode)) return None;

  try {
    const result: string = JSON.stringify(toEncode);
    return Some(result);
  } catch (e) {
    return None;
  }
}

/**
 * Attempts to parse an integer from a string, resulting in a `Some<number>`
 * if successful, and `None` if unsuccessful
 * @param str - Raw numeric string to parse
 */
export function parseInteger(str: string): Option<number> {
  const num = parseInt(str, 10);
  if (Number.isNaN(num)) return None;
  return Some(num);
}

/**
 * Generates a random color with a maxmimum target brightness
 * @remarks
 * Source code used from
 * {@link https://stackoverflow.com/a/17373688 | this Stack Overflow answer}
 * @param brightness - Maximum target brightness (0-1)
 */
export function randomColor(brightness: number): string {
  function randomChannel(b: number): string {
    const r = 255 - b;
    // eslint-disable-next-line no-bitwise
    const n = 0 | (Math.random() * r + b);
    const s = n.toString(16);
    return s.length === 1 ? `0${s}` : s;
  }
  return `#${randomChannel(brightness)}${randomChannel(
    brightness
  )}${randomChannel(brightness)}`;
}

// ? ==============
// ? Path functions
// ? ==============

/**
 * Gets a url parameter from the window's location, or None if not found
 * @param name - The name of the url parameter to look for
 */
export function getUrlParameter(name: string): Option<string> {
  if (isRemote) return None;

  const regex = new RegExp(`[\\?&]${escapeRegExp(name)}=([^&#]*)`);
  const results = Option.from(regex.exec(window.location.search));
  return results.map((r) => r[1].replace(/\+/g, " "));
}

/**
 * Splits a path into its segments
 * @param path - The path to split
 */
export function splitPath(path: string): string[] {
  const trimmedPath: string = path.charAt(0) === "/" ? path.substr(1) : path;
  return (trimmedPath.slice(-1) === "/"
    ? trimmedPath.slice(0, -1)
    : trimmedPath
  ).split("/");
}

/**
 * Returns true if the given fragment is in the path
 * @param path - The path to examine
 * @param param - A string or regular expression to search for in the given path
 * @param position - If specified, then the fragment must occur at the position in the path
 */
export function isInPath({
  path,
  fragment,
  position = null,
}: {
  path: string;
  fragment: string | RegExp;
  position: number | null;
}): boolean {
  // Null test
  if (isNil(position)) {
    if (typeof fragment === "string") {
      // Simple contains test
      return path.indexOf(fragment) !== -1;
    }
    // Regex test
    return fragment.test(path);
  }
  // Position-based test
  const pathComponents: string[] = splitPath(path);
  if (pathComponents.length <= position) return false;

  if (typeof fragment === "string") {
    // Fragment equality test
    return pathComponents[position] === fragment;
  }
  // Regex test
  return fragment.test(pathComponents[position]);
}

const cachedExternalRegex = /^(?:(?:http|https):\/\/(?!(?:www\.)?archit.us)[\w./=?#-_]+)|(?:mailto:.+)$/;
let externalRegex: RegExp | null = null;

/**
 * Lazily gets the regular expression used to determine if a link is external, using
 * `window.location.host` if available and caching the created regex
 */
export function getExternalRegex(): RegExp {
  if (isDefined(externalRegex)) return externalRegex;
  if (isClient) {
    const regexStr = `^(?:(?:http|https):\\/\\/(?!(?:www\\.)?${window.location.host})[\\w./=?#-_]+)|(?:mailto:.+)$`;
    const regex = new RegExp(regexStr);
    externalRegex = regex;
    return externalRegex;
  }
  return cachedExternalRegex;
}

/**
 * Determines whether a link is an external link or not
 * @param href - Href to test
 */
export function isExternal(href: string): boolean {
  return getExternalRegex().test(href);
}

// ? ===============
// ? Regex functions
// ? ===============

/**
 * Splits a string into alternating fragments of text that match the regular
 * expression between those that don't
 * @param input - The string to split
 * @param regex - The regular expression to use to perform the splitting
 */
export function splitFragments(input: string, regex: RegExp): string[] {
  const excludedFragments: string[] = input.split(regex);
  const matchedFragments: string[] = allMatches(input, regex);

  // Zip the two arrays together
  const sequence: string[] = [];
  const zippedLength = Math.min(
    matchedFragments.length,
    excludedFragments.length
  );
  for (let i = 0; i < zippedLength; ++i) {
    sequence.push(excludedFragments[i]);
    sequence.push(matchedFragments[i]);
  }
  if (matchedFragments.length > excludedFragments.length) {
    for (let i = excludedFragments.length; i < matchedFragments.length; ++i) {
      sequence.push(matchedFragments[i]);
    }
  } else if (matchedFragments.length < excludedFragments.length) {
    for (let i = matchedFragments.length; i < excludedFragments.length; ++i) {
      sequence.push(excludedFragments[i]);
    }
  }

  return sequence;
}

/**
 * Re-instantiates a new regular expression with the specified one's flags and pattern
 * @param source - The source regular expression to use as a template
 */
export function remakeRegex(source: RegExp): RegExp {
  return new RegExp(source.source, source.flags);
}

/**
 * Finds all matches it can in a string before returning an array of total matches
 * @param string - The string to search for matches in
 * @param regex - The regular expression to use to find matches of
 */
export function allMatches(string: string, regex: RegExp): string[] {
  const remadeRegex = remakeRegex(regex);
  const matches: string[] = [];
  let currentMatch;
  do {
    currentMatch = remadeRegex.exec(string);
    if (currentMatch) matches.push(currentMatch[0]);
  } while (currentMatch);
  return matches;
}

/**
 * Escapes regular expression text to not cause improper special sequences
 * @param text - The text to escape so that it is safe to use in a regex
 */
export function escapeRegExp(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// ? ======================
// ? Regex constants
// ? ======================

export const alphanumericRegex = /[_\W]+/g;
