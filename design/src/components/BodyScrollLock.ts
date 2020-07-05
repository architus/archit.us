import React, { useLayoutEffect } from "react";

/**
 * Locks the scroll position of the body when this component is rendered.
 * Useful for modals.
 * See https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
 */
const BodyScrollLock: React.FC = () => {
  // Store the scrollY before the next layout
  // (useful when the modal makes the scrollY effectively 0)
  const scrollYBefore =
    typeof window === "undefined" ? "0" : window.scrollY ?? "0";

  useLayoutEffect(() => {
    // When the modal is shown, we want a fixed body
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYBefore}px`;

    return (): void => {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY ?? "0", 10) * -1);
    };
  });
  return null;
};

export default BodyScrollLock;
