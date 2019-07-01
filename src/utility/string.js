import { zip, flatten, compact } from "lodash";
import { left, right } from "./names.json";

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

export function generateName(noSpace = false) {
  const li = Math.floor(Math.random() * left.length);
  const ri = Math.floor(Math.random() * right.length);
  const lv = left[li];
  const rv = right[ri];
  return noSpace ? `${lv}_${rv}` : `${lv} ${rv}`;
}

export function acronym(string = "") {
  return string.match(/\b(\w|[-_])/g).join("");
}
