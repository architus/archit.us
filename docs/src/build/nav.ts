import { CreatePageArgs } from "gatsby";

import { NavTree } from "@docs/templates/Docs/frontmatter";

export type NavigationTreeNode = {
  path: string;
  label: string;
  badge: string | null;
  children: NavigationTreeNode[];
};

/**
 * Gatsby GraphQL node created for each side nav root
 */
export type NavigationTree = {
  root: NavigationTreeNode;
};
export const navigationTreeType = `
  type NavigationTree implements Node @dontInfer {
    root: JSON!
  }
`;

/**
 * Transforms the original source navtree into a navigation tree Gatsby node
 * @param source - Source nav tree node
 */
function transformTree(source: NavTree): NavigationTreeNode {
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
 * @returns each Id of the navigationTree nodes, in order
 */
export function createNavigationTrees(
  roots: NavTree[],
  {
    actions,
    createNodeId,
    createContentDigest,
  }: Pick<CreatePageArgs, "actions" | "createNodeId" | "createContentDigest">
): string[] {
  return roots.map((sourceRoot, index) => {
    const root: NavigationTree = { root: transformTree(sourceRoot) };
    const id = createNodeId(`navigation-tree--${index}`);
    actions.createNode({
      id,
      children: [],
      internal: {
        type: `NavigationTree`,
        content: JSON.stringify(root),
        contentDigest: createContentDigest(root),
      },
      ...root,
    });
    return id;
  });
}
