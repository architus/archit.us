function getScrollRemainder(scrollContainer) {
  const scrollHeight = scrollContainer.scrollHeight;
  const height = scrollContainer.clientHeight;
  return scrollHeight - height;
}

export function getScrollDistance(scrollContainer) {
  return Math.abs(
    scrollContainer.scrollTop - getScrollRemainder(scrollContainer)
  );
}

export function scrollToBottom(scrollContainer) {
  scrollContainer.scrollTop = getScrollRemainder(scrollContainer);
}

export const clearUrlQueries = () => {
  if (typeof window === "undefined") return;
  window.history.replaceState(
    {},
    window.document.title,
    `${window.location.protocol}//${window.location.host}${window.location.pathname}`
  );
};
