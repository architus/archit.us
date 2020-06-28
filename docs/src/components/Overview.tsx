import React from "react";

type OverviewEntry = {
  title: string;
  badge: string | null;
  path: string;
};
export type OverviewContext = OverviewEntry[];
export const OverviewContext = React.createContext<OverviewContext>([]);

type OverviewProps = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * "In this section" element that can be included in MDX
 * (and is automatically added for Orphan pages)
 */
const Overview: React.FC<OverviewProps> = ({ className, style }) => {
  // TODO implement
  return null;
};

export default Overview;
