import { Option, None } from "Utility/option";
import { isDefined } from "Utility/data";

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
  return Math.abs(scrollContainer.scrollTop - getScrollRemainder(scrollContainer));
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
  if (isRemote) return;
  const { protocol, host, pathname } = window.location;
  window.history.replaceState(
    {},
    window.document.title,
    `${protocol}//${host}${pathname}`
  );
}

/**
 * Feature detection method from
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 */
export function testLocalStorage(): boolean {
  let storage: Storage | undefined;
  try {
    const storage = window.localStorage;
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      isDefined(storage) &&
      storage.length !== 0
    );
  }
}

const LocalStorageMetadata: { value: boolean | null } = { value: null };

/**
 * Whether local storage is available in the browser's execution context
 */
export function canUseLocalStorage(): boolean {
  if (LocalStorageMetadata.value == null) {
    const canUse = testLocalStorage();
    LocalStorageMetadata.value = canUse;
    return canUse;
  } else return LocalStorageMetadata.value;
}

/**
 * Gets a value from local storage if it exists, otherwise returns None
 *
 * @param key - Local storage key
 */
export function getLocalStorage(key: string): Option<string> {
  if (isRemote) return None;
  else if (!canUseLocalStorage()) return None;
  else return Option.from(window.localStorage.getItem(key));
}

/**
 * Sets a value to local storage if it exists
 *
 * @param key - Local storage key
 * @returns Whether the set was successful
 */
export function setLocalStorage(key: string, value: string): boolean {
  if (isRemote) return false;
  else if (!canUseLocalStorage()) return false;
  else {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  }
}

/**
 * True if the current execution context is the browser
 */
export const isClient: boolean = typeof window !== "undefined";

/**
 * True if the current execution context is node
 */
export const isRemote: boolean = !isClient;

/**
 * True if the current execution context is the production app
 */
export const isProduction: boolean = !(process.env.PRODUCTION_URL == null);

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
 * @deprecated Use isRemote and Option instead
 * @param func The function to execute
 */
export function ifServer(func: Function) {
  if (isRemote) func();
}
