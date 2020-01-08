import React from "react";

export function Padding({ padding, children }) {
  return <div style={{ padding }}>{children}</div>;
}

export default function PaddingDecorator(storyFn) {
  return <Padding padding="1rem" children={storyFn()} />;
}
