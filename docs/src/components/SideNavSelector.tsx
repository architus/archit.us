import React from "react";
import { NavigationTreeNode } from "@docs/build/nav";

export type SideNavSelectorProps = {
  value: string;
  items: Map<string, NavigationTreeNode>;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Select box to use to change between top-level navigation trees on mobile
 * or other devices where displaying the header links is infeasible
 */
const SideNavSelector: React.FC<SideNavSelectorProps> = ({
  value,
  items,
  className,
  style,
}) => {
  // TODO implement
  return <div className={className} style={style} />;
};

export default SideNavSelector;
