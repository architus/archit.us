/**
 * Pretty-prints a date using locale-aware formatting
 * @param date - Source date to format
 */
export function formatDate(date: Date, separator = "at"): string {
  const lang = typeof window === "undefined" ? "en-US" : navigator.languages[0];
  const dateString = date.toLocaleDateString(lang, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeString = date.toLocaleTimeString(lang, {});
  return `${dateString} ${separator} ${timeString}`;
}
