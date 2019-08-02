import React from "react";

function PaddingDecorator(storyFn) {
  return <div style={{ padding: "1rem" }}>{storyFn()}</div>;
}

export default PaddingDecorator;
