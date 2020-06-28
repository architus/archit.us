import React from "react";

import { Nil } from "@lib/types";
import { History } from "@docs/build/github-types";

type PageMetadataProps = {
  originalPath: string | Nil;
  history: History | Nil;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Edit link, authorship list, and edit date displayed at the bottom
 * of each docs page
 */
const PageMetadata: React.FC<PageMetadataProps> = ({
  originalPath,
  history,
  className,
  style,
}) => {
  // TODO implement
  return null;
};

export default PageMetadata;
