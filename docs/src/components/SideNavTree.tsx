import React from "react";
import { NavigationTreeNode } from "@docs/build/nav";

export type SideNavTreeProps = {
  items: NavigationTreeNode[];
};

/**
 * Tree of side nav items displayed in the SideNav component.
 * Includes logic to auto-scroll to the active item where relevant.
 */
const SideNavTree: React.FC<SideNavTreeProps> = ({ items }) => {
  // TODO implement
  return null;
};

export default SideNavTree;
