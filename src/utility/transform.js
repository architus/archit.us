import { replaceAll } from "./primitives";

// TODO migrate transformation pipeline library to this file

export function highlightTokens(string, tokens, firstOccurrence = false) {
  let processed = string;
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

function makeTokenSpan(content, className) {
  return `<span class="${className}">${content}</span>`;
}

export function replaceToken(
  string,
  token,
  className,
  firstOccurrence = false
) {
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
