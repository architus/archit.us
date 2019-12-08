import React from "react";

export function MaxWidth({ maxWidth, children }) {
  return <div style={{ maxWidth }}>{children}</div>;
}

export default function MaxWidthDecorator(storyFn) {
  return <MaxWidth maxWidth="32rem" children={storyFn()} />;
}
