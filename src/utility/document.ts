/**
 * Gets the amount needed to scroll to be at the bottom from the top
 *
 * @param scrollContainer The HTML DOM element to get the remaining scroll of
 */
export function getScrollRemainder(scrollContainer: HTMLElement): number {
  const scrollHeight = scrollContainer.scrollHeight;
  const height = scrollContainer.clientHeight;
  return scrollHeight - height;
}

/**
 * Gets the current scroll distance from the scrollTop
 *
 * @param scrollContainer The HTML DOM element to get the scroll distance of
 */
export function getScrollDistance(scrollContainer: HTMLElement): number {
  return Math.abs(
    scrollContainer.scrollTop - getScrollRemainder(scrollContainer)
  );
}

/**
 * Imperatively scrolls to the bottom of the given HTML element
 *
 * @param scrollContainer The HTML DOM element to scroll to the bottom of
 */
export function scrollToBottom(scrollContainer: HTMLElement): void {
  scrollContainer.scrollTop = getScrollRemainder(scrollContainer);
}

/**
 * Clears URL queries from window.location
 */
export function clearUrlQueries(): void {
  if (isServer) return;
  const { protocol, host, pathname } = window.location;
  window.history.replaceState(
    {},
    window.document.title,
    `${protocol}//${host}${pathname}`
  );
};

/**
 * True if the current execution context is the browser
 */
export const isClient = typeof window !== "undefined";

/**
 * True if the current execution context is node
 */
export const isServer = !isClient;

/**
 * Executes the given function if the current execution context is the browser
 *
 * @deprecated Use isClient and Option instead
 * @param func The function to execute
 */
export function ifClient(func: Function) {
  if (isClient) func();
}

/**
 * Executes the given function if the current execution context is node
 *
 * @deprecated Use isServer and Option instead
 * @param func The function to execute
 */
export function ifServer(func: Function) {
  if (isServer) func();
}
