/**
 * Format number using locale-aware formatting
 * @param number - Source number to format
 */
export function formatNum(num: number): string {
  const lang =
    typeof window === "undefined" ? "en-US" : window.navigator.languages[0];
  return num.toLocaleString(lang);
}
