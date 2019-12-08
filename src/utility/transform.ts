import { replaceAll } from "./primitives";

// TODO migrate transformation pipeline library to this file

export function highlightTokens(
  string: string,
  tokens: Array<{ token: string | string[]; className: string }>,
  firstOccurrence = false
): string {
  let processed: string = string;
  tokens.forEach(({ token, className }) => {
    if (!Array.isArray(token)) {
      processed = replaceToken(processed, token, className, firstOccurrence);
    } else {
      token.forEach(t => {
        processed = replaceToken(processed, t, className, firstOccurrence);
      });
    }
  });
  return processed;
}

function makeTokenSpan(content: string, className: string): string {
  return `<span class="${className}">${content}</span>`;
}

export function replaceToken(
  string: string,
  token: string | RegExp,
  className: string,
  firstOccurrence = false
): string {
  if (typeof token === "string") {
    return firstOccurrence
      ? string.replace(token, makeTokenSpan(token, className))
      : replaceAll(string, token, makeTokenSpan(token, className));
  } else {
    return firstOccurrence
      ? string.replace(new RegExp(token), match =>
          makeTokenSpan(match, className)
        )
      : string.replace(token, match => makeTokenSpan(match, className));
  }
}
