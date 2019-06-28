import { zip, flatten, compact } from "lodash";
import { left, right } from "./names.json";

export function splitFragments(string: string, regex: RegExp): Array<string> {
  const excludedFragments = string.split(regex);
  const matchedFragments = allMatches(string, regex);
  const sequence: Array<string | undefined> = flatten(
    zip(excludedFragments, matchedFragments)
  );
  return compact(sequence);
}

export function remakeRegex(source: RegExp): RegExp {
  return new RegExp(source.source, source.flags);
}

export function allMatches(string: string, regex: RegExp): Array<string> {
  regex = remakeRegex(regex);
  let matches: Array<string> = [];
  let currentMatch: RegExpExecArray | null;
  do {
    currentMatch = regex.exec(string);
    if (currentMatch) matches.push(currentMatch[0]);
  } while (currentMatch);
  return matches;
}

export function generateName(noSpace: boolean = false): string {
  const li: number = Math.floor(Math.random() * left.length);
  const ri: number = Math.floor(Math.random() * right.length);
  const lv: string = left[li];
  const rv: string = right[ri];
  return noSpace ? `${lv}_${rv}` : `${lv} ${rv}`;
};
