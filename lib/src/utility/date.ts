/**
 * Pretty-prints a date using locale-aware formatting
 * @param date - Source date to format
 */
export function formatDate(date: Date, separator = "at"): string {
  const lang =
    typeof window === "undefined" ? "en-US" : window.navigator.languages[0];
  const dateString = date.toLocaleDateString(lang, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeString = date.toLocaleTimeString(lang, {});
  return `${dateString} ${separator} ${timeString}`;
}

/**
 * Pretty-prints a date using locale-aware formatting
 * @param date - Source date to format
 */
export function formatDateShort(date: Date, separator = "at"): string {
  const lang =
    typeof window === "undefined" ? "en-US" : window.navigator.languages[0];
  const dateString = date.toLocaleDateString(lang, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timeString = date.toLocaleTimeString(lang, {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${dateString} ${separator} ${timeString}`;
}

/**
 * Pretty-prints a date using locale-aware formatting
 * @param date - Source date to format
 */
export function formatDateExtraShort(date: Date): string {
  const lang =
    typeof window === "undefined" ? "en-US" : window.navigator.languages[0];
  const dateString = date.toLocaleDateString(lang, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return dateString;
}
