import React from "react";
import { NavigationTreeNode } from "@docs/build/nav";

export type SideNavSelectorProps = {
  value: string;
  items: Map<string, NavigationTreeNode>;
};

/**
 * Select box to use to change between top-level navigation trees on mobile
 * or other devices where displaying the header links is infeasible
 */
const SideNavSelector: React.FC<SideNavSelectorProps> = ({ value, items }) => {
  // TODO implement
  return null;
};

export default SideNavSelector;
