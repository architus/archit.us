import React from "react";

import { Nil } from "@lib/types";

export type SequenceLinkData = {
  title: string;
  badge: string | null;
  path: string;
  lead: string | null;
};

type SequenceLinksProps = {
  next: SequenceLinkData | Nil;
  previous: SequenceLinkData | Nil;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Previous/next cards at the bottom of each docs page
 */
const SequenceLinks: React.FC<SequenceLinksProps> = ({
  next,
  previous,
  className,
  style,
}) => {
  // TODO implement
  return null;
};

export default SequenceLinks;
