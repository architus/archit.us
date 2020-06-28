import React from "react";
import { BreadcrumbSegment } from "templates/Docs/frontmatter";

type BreadcrumbProps = {
  segments: BreadcrumbSegment[];
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Ordered list of links displaying the path segments for the current page,
 * displayed at the top above the title
 */
const Breadcrumb: React.FC<BreadcrumbProps> = ({
  segments,
  className,
  style,
}) => {
  // TODO implement
  return null;
};

export default Breadcrumb;
