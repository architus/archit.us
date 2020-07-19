import { graphql, useStaticQuery } from "gatsby";
import { useMemo } from "react";

import { NavigationTreeNode } from "@docs/build/nav";

/**
 * Gets a map of navigation tree Ids to navigation tree root nodes
 */
export function useNavigationTree(): Map<string, NavigationTreeNode> {
  const queryResult = useStaticQuery<GatsbyTypes.UseNavigationQuery>(graphql`
    query UseNavigation {
      allNavigationTree {
        edges {
          node {
            id
            root
          }
        }
      }
    }
  `);

  // Normalize the navigation tree into an ES6 Map
  return useMemo(() => {
    const map: Map<string, NavigationTreeNode> = new Map();
    queryResult.allNavigationTree.edges.forEach(({ node }) => {
      map.set(node.id, node.root);
    });
    return map;
  }, [queryResult]);
}
