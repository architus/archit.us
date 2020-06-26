declare module "*.inline.svg" {
  import React from "react";

  const content: React.FC<React.HTMLProps<SVGElement>>;
  export default content;
}
