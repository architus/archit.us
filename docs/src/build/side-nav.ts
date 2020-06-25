import { CreatePageArgs } from "gatsby";

import { NavTree } from "@docs/templates/Docs/frontmatter";

export type SideNavNode = {
  path: string;
  label: string;
  badge: string | null;
  children: SideNavNode[];
};

/**
 * Gatsby GraphQL node created for each side nav root
 */
export type SideNavRoot = {
  root: SideNavNode;
};
export const sideNavRootType = `
  type SideNavRoot implements Node @dontInfer {
    root: JSON!
  }
`;

/**
 * Transforms the original source navtree into a side nav tree
 * @param source - Source nav tree node
 */
function transformTree(source: NavTree): SideNavNode {
  return {
    path: source.path,
    label: source.navTitle,
    badge: source.passthrough?.badge ?? null,
    children: source.children.map(transformTree),
  };
}

/**
 * Creates GraphQL side nav nodes
 * @param roots - Original source nav tree root nodes
 * @returns each Id of the SideNavRoot nodes, in order
 */
export function createSideNavNodes(
  roots: NavTree[],
  {
    actions,
    createNodeId,
    createContentDigest,
  }: Pick<CreatePageArgs, "actions" | "createNodeId" | "createContentDigest">
): string[] {
  return roots.map((sourceRoot, index) => {
    const root: SideNavRoot = { root: transformTree(sourceRoot) };
    const id = createNodeId(`side-nav-root--${index}`);
    actions.createNode({
      id,
      children: [],
      internal: {
        type: `SideNavRoot`,
        content: JSON.stringify(root),
        contentDigest: createContentDigest(root),
      },
      ...root,
    });
    return id;
  });
}
