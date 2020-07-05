declare module "*.svg" {
  import React from "react";

  const content: React.FC<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "*.woff" {
  const content: string;
  export default content;
}

declare module "*.woff2" {
  const content: string;
  export default content;
}
