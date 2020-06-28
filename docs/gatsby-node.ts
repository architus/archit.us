import {
  GatsbyNode,
  SourceNodesArgs,
  CreatePagesArgs,
  CreateResolversArgs,
  Node,
} from "gatsby";

import {
  isDefined,
  isNil,
  trimMarkdownPath,
  splitPath,
  capitalize,
} from "@lib/utility";
import { Option, Some, None } from "@lib/option";
import {
  DocsPage,
  DocsContext,
  DocsFrontmatter,
  DocsPassthroughProps,
  DocsNavtreeConstructionProps,
  BreadcrumbSegment,
  NavTree,
  frontmatterFragment,
  frontmatterType,
  breadcrumbType,
  docsPageType,
} from "@docs/templates/Docs/frontmatter";
import {
  load as loadGithubMetadata,
  attachAuthorship,
} from "@docs/build/github-integration";
import { historyType, githubUserType } from "@docs/build/github-types";
import { createNavigationTrees, navigationTreeType } from "build/nav";
import { getLead } from "build/lead";

const DocsPageTemplate = require("path").resolve(
  "./src/templates/Docs/index.tsx"
);

// Define custom graphql schema to enforce rigid type structures
export const sourceNodes: GatsbyNode["sourceNodes"] = ({
  actions,
  reporter,
}: SourceNodesArgs): Promise<null> => {
  const activity = reporter.activityTimer("implementing custom graphql schema");
  activity.start();
  // To add new keys to the frontmatter, see /src/templates/types.ts
  actions.createTypes(`
    ${navigationTreeType}
    ${githubUserType}
    ${historyType}
    ${githubUserType}
    ${breadcrumbType}
    ${docsPageType}
    ${frontmatterType}

    type Mdx implements Node {
      frontmatter: Frontmatter!
    }

    type File implements Node {
      childMdx: Mdx
    }
`);
  activity.end();

  // Some value needed for type
  // See https://github.com/gatsbyjs/gatsby/issues/23296
  return Promise.resolve<null>(null);
};

/**
 * Inner MDX docs node query object
 */
type OriginalDocsNode = {
  relativePath: string;
  childMdx?: {
    id: string;
    // To add new keys to the frontmatter, see /src/templates/types.ts
    frontmatter: DocsFrontmatter;
  };
};

// To add new keys to the frontmatter, see /src/templates/types.ts
const originalDocsNodeFragment = `
  relativePath
  childMdx {
    id
    frontmatter {
      ${frontmatterFragment}
    }
  }
`;

// Dynamically create documentation page GraphQL nodes & corresponding pages
export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
  createNodeId,
  createContentDigest,
}: CreatePagesArgs) => {
  // Re-use activity variable
  let activity = reporter.activityTimer(`loading docs pages via graphql`);
  activity.start();

  type DocsQueryResult = {
    allFile: {
      edges: Array<{
        node: OriginalDocsNode;
      }>;
    };
  };

  const docsQuery = `
    query loadPagesQuery($limit: Int!) {
      allFile(
        limit: $limit
        filter: {
          sourceInstanceName: { eq: "content" }
          extension: { eq: "md" }
        }
      ) {
        edges {
          node {
            ${originalDocsNodeFragment}
          }
        }
      }
    }
  `;

  const { data, errors } = await graphql<DocsQueryResult>(docsQuery, {
    limit: 10000,
  });

  activity.end();
  if (errors || isNil(data)) {
    throw errors;
  }

  const paths = data.allFile.edges.map(({ node }) => node.relativePath);
  const githubMetadata = await loadGithubMetadata(paths, reporter, graphql);

  activity = reporter.activityTimer(`walking navigation tree`);
  activity.start();

  // Walk the navigation tree and add each docs page node
  const baseNavTree: BaseNavTree = initialBaseNavTree();
  data.allFile.edges.forEach(({ node }) => {
    if (isDefined(node.childMdx)) {
      walkTree(
        {
          path: node.relativePath,
          id: node.childMdx.id,
          ...node.childMdx.frontmatter,
        },
        baseNavTree
      );
    }
  });

  activity.end();
  activity = reporter.activityTimer(`adding defaults to nav tree nodes`);
  activity.start();
  const navTree = addDefaults(baseNavTree);

  if (githubMetadata.isDefined()) {
    activity = reporter.activityTimer(`attaching github metadata to doc pages`);
    activity.start();
    attachAuthorship(navTree, githubMetadata.get);
    activity.end();
  }

  activity.end();
  activity = reporter.activityTimer(`separating nav roots`);
  activity.start();
  const roots = collectRoots(navTree);

  activity.end();
  activity = reporter.activityTimer(`assembling breadcrumbs`);
  activity.start();
  roots.forEach((root) => assembleBreadcrumbs(root, []));

  activity.end();
  activity = reporter.activityTimer(`ordering children`);
  activity.start();
  roots.forEach((root) => orderChildren(root, 0));

  activity.end();
  activity = reporter.activityTimer(`creating navigation tree nodes`);
  activity.start();
  const ids = createNavigationTrees(roots, {
    actions,
    createNodeId,
    createContentDigest,
  });

  activity.end();
  activity = reporter.activityTimer(`dynamically generating docs pages`);
  activity.start();

  // Recursively make a map of order indices using a pre-order traversal
  const preorder: Map<string, number> = new Map();
  let current = 0;
  const traverse = (node: NavTree): void => {
    preorder.set(node.path, current);
    current += 1;
    node.children.forEach(traverse);
  };
  roots.forEach(traverse);

  function createSubtreePages(
    subtree: NavTree,
    sideNavId: string
  ): string | null {
    // Perform post-order traversal of nav tree
    const children = subtree.children
      .map((child) => createSubtreePages(child, sideNavId))
      .filter(isDefined);

    if (!subtree.invisible) {
      const {
        breadcrumb,
        title,
        shortTitle,
        originalPath,
        passthrough,
        history,
        path,
      } = subtree;
      const nodeContent: DocsPage = {
        breadcrumb,
        title,
        shortTitle,
        isOrphan: isNil(originalPath),
        noTOC: passthrough?.noTOC ?? false,
        noSequenceLinks: passthrough?.noSequenceLinks ?? false,
        badge: passthrough?.badge ?? null,
        originalPath,
        history,
        path,
        preorder: preorder.get(subtree.path) ?? 0,
      };

      const idSeed = `docs-page--${subtree.originalPath}#${subtree.slug}`;
      const id = createNodeId(idSeed);
      actions.createNode({
        id,
        parent: subtree.id ?? undefined,
        children,
        internal: {
          type: `DocsPage`,
          content: JSON.stringify(nodeContent),
          contentDigest: createContentDigest(nodeContent),
        },
        sideNav: sideNavId,
        ...nodeContent,
      });

      // Pass in ID to page so it can perform query
      const docsContext: DocsContext = { id };
      actions.createPage({
        path: subtree.path,
        component: DocsPageTemplate,
        context: docsContext,
      });

      let suffix;
      if (!subtree.invisible) {
        if (isNil(subtree.id)) {
          suffix = "(orphan)";
        } else {
          suffix = `=> ${subtree.id}`;
        }
      }

      reporter.info(`docs page @ '${subtree.path}' ${suffix}`);
      return id;
    }

    return null;
  }
  roots.forEach((root, i) => createSubtreePages(root, ids[i]));

  activity.end();
};

// Make a resolver for the lead text for each docs page
export const createResolvers: GatsbyNode["createResolvers"] = (
  args: CreateResolversArgs
) => {
  args.createResolvers({
    DocsPage: {
      lead: {
        async resolve(
          source: Node & DocsPage,
          { maxLength }: { maxLength?: number },
          context: {
            nodeModel: {
              getNodeById: (arg: {
                id: string;
                type?: string;
              }) => Promise<Node | null>;
            };
          }
        ): Promise<string | null> {
          if (isNil(source.parent)) return null;
          const mdxNode = await context.nodeModel.getNodeById({
            id: source.parent,
            type: "Mdx",
          });

          if (isNil(mdxNode)) return null;
          return getLead(args, mdxNode, maxLength);
        },
      },
    },
  });

  return Promise.resolve(null);
};

// ? ==========================
// ? Navigation tree processing
// ? ==========================

/**
 * Adds a trailing slash to the given path
 * @param basePath - Base path
 */
function addTrailingSlash(basePath: string): string {
  return basePath.slice(-1) === "/" ? basePath : `${basePath}/`;
}

/**
 * Slightly-normalized node directly passed in from the GraphQL query result
 */
type NormalizedGatsbyNode = { path: string; id: string } & DocsFrontmatter;

/**
 * Base navigation tree constructed directly from MDX file nodes
 * (before transformation/ordering).
 */
type BaseNavTree = {
  id: Option<string>;
  slug: string;
  path: string;
  root: boolean;
  title: string;
  invisible: boolean;
  children: BaseNavTree[];
  originalPath: Option<string>;
  construction: Option<DocsNavtreeConstructionProps>;
  passthrough: Option<DocsPassthroughProps>;
};

/**
 * Creates the initial base nav tree used to construct during walking.
 * Note: uses `Documentation` as the base root title if none is specified
 */
function initialBaseNavTree(): BaseNavTree {
  return {
    id: None,
    slug: "",
    path: "/",
    root: true,
    title: "Documentation", // Default base root title
    invisible: true,
    children: [],
    originalPath: None,
    construction: None,
    passthrough: None,
  };
}

/**
 * Splits a Gatsby graphql node into the construction and passthrough components
 * @param node - Original normalized node
 */
function splitFrontmatter(
  node: NormalizedGatsbyNode
): {
  construction: DocsNavtreeConstructionProps;
  passthrough: DocsPassthroughProps;
} {
  const {
    id,
    path: nodePath,
    title,
    shortTitle,
    overrideBreadcrumb,
    overrideNav,
    isRoot,
    childrenOrder,
    noBreadcrumb,
    ...passthrough
  } = node;
  return {
    passthrough,
    construction: {
      title,
      shortTitle,
      overrideBreadcrumb,
      overrideNav,
      isRoot,
      noBreadcrumb,
      childrenOrder,
    },
  };
}

/**
 * Walks the nav tree using each parsed node, adding orphan nodes in between as necessary
 * @param node - List of normalized nodes from the graphql query
 * @param navTree - Mutable tree object that is constructed in-place
 */
function walkTree(node: NormalizedGatsbyNode, navTree: BaseNavTree): void {
  const nodePath = trimMarkdownPath(node.path);

  // If root, replace default root node with this one
  if (nodePath === "/") {
    const frontmatter = splitFrontmatter(node);
    // Don't replace children
    const newNode: Omit<BaseNavTree, "children"> = {
      id: Some(node.id),
      slug: "",
      path: "/",
      root: true,
      title: node.title,
      invisible: false,
      originalPath: Some(node.path),
      construction: Some(frontmatter.construction),
      passthrough: Some(frontmatter.passthrough),
    };
    Object.assign(navTree, newNode);
  } else {
    // Walk tree as normal
    const fragments = splitPath(nodePath);
    let subtree = navTree;
    for (let i = 0; i < fragments.length; ++i) {
      const previousNode = subtree.children.find(
        (child) => child.slug === fragments[i]
      );

      // Node existed before
      if (isDefined(previousNode)) {
        subtree = previousNode;
      } else {
        // Create new orphan node here
        const newNode: BaseNavTree = {
          id: None,
          slug: fragments[i],
          path: addTrailingSlash(`/${fragments.slice(0, i + 1).join("/")}`),
          root: false,
          title: capitalize(fragments[i]),
          invisible: false,
          children: [],
          originalPath: None,
          construction: None,
          passthrough: None,
        };
        subtree.children.push(newNode);
        subtree = newNode;
      }

      // Current node: merge page into (and mark as no longer orphan)
      if (i === fragments.length - 1) {
        const frontmatter = splitFrontmatter(node);
        // Don't replace children or slug
        const newNode: Omit<BaseNavTree, "children"> = {
          id: Some(node.id),
          slug: fragments[i],
          path: addTrailingSlash(nodePath),
          root: node.isRoot ?? false,
          title: node.title,
          invisible: false,
          originalPath: Some(node.path),
          construction: Some(frontmatter.construction),
          passthrough: Some(frontmatter.passthrough),
        };
        Object.assign(subtree, newNode);
      }
    }
  }
}

/**
 * Adds defaults to a base nav tree
 * @param subtree - Base nav tree
 */
function addDefaults(subtree: BaseNavTree): NavTree {
  const { title } = subtree;
  let shortTitle = title;
  let breadcrumbTitle = title;
  let navTitle = title;
  if (subtree.construction.isDefined()) {
    shortTitle = subtree.construction.get.shortTitle ?? shortTitle;
    breadcrumbTitle = subtree.construction.get.overrideBreadcrumb ?? shortTitle;
    navTitle = subtree.construction.get.overrideNav ?? title;
  }

  return {
    id: subtree.id.orNull(),
    slug: subtree.slug,
    path: subtree.path,
    root: subtree.root,
    title,
    shortTitle,
    navTitle,
    breadcrumbTitle,
    invisible: subtree.invisible,
    children: subtree.children.map(addDefaults),
    originalPath: subtree.originalPath.orNull(),
    childrenOrder: subtree.construction
      .flatMap(({ childrenOrder }) => Option.from(childrenOrder))
      .orNull(),
    history: null,
    passthrough: subtree.passthrough.orNull(),
    breadcrumb: null,
    noBreadcrumb: subtree.construction
      .flatMap(({ noBreadcrumb }) => Option.from(noBreadcrumb))
      .getOrElse(false),
  };
}

/**
 * Splits a navigation tree into each subtree
 * @param navTree - Base full navigation tree
 */
function collectRoots(navTree: NavTree): NavTree[] {
  const roots = [navTree];
  function separateRootNodes(subtree: NavTree): void {
    for (let i = 0; i < subtree.children.length; ++i) {
      const child = subtree.children[i];
      if (child.root) {
        roots.push(child);
        // Remove and rewind iteration
        subtree.children.splice(i, 1);
        i -= 1;
      } else {
        separateRootNodes(child);
      }
    }
  }

  // Iteratively separate all root nodes
  for (let i = 0; i < roots.length; ++i) {
    separateRootNodes(roots[i]);
  }

  // Remove empty roots
  for (let i = 0; i < roots.length; ++i) {
    if (roots[i].children.length === 0) {
      // Remove and rewind iteration
      roots.splice(i, 1);
      i -= 1;
    }
  }

  return roots;
}

/**
 * Assembles breadcrumbs for each page based on their derived tree structure
 * @param subtree - Recursive subtree
 * @param currentBreadcrumb - Currently built breadcrumb
 */
function assembleBreadcrumbs(
  subtree: NavTree,
  currentBreadcrumb: BreadcrumbSegment[]
): void {
  const withNext = [
    ...currentBreadcrumb,
    {
      text: subtree.breadcrumbTitle,
      path: subtree.path,
    },
  ];

  if (!subtree.invisible && !subtree.noBreadcrumb) {
    const { length } = withNext;
    // eslint-disable-next-line no-param-reassign
    subtree.breadcrumb = withNext.map(({ text, path }, i) =>
      i === length - 1 ? { text, path: null } : { text, path }
    );
  }

  subtree.children.forEach((child) => assembleBreadcrumbs(child, withNext));
}

/**
 * Custom sort function for nav tree nodes
 * @param a - LHS node
 * @param b - RHS node
 */
function compareNodes(a: NavTree, b: NavTree): number {
  return a.navTitle
    .toLocaleLowerCase()
    .localeCompare(b.navTitle.toLocaleLowerCase());
}

/**
 * Orders children using, using `childrenOrder` if explicitly given
 * @param subtree - the current nav subtree
 * @param depth - the current tree depth
 */
function orderChildren(subtree: NavTree, depth: number): void {
  function defaultSort(nodes: NavTree[]): NavTree[] {
    const childless = nodes.filter((node) => node.children.length === 0);
    const parent = nodes.filter((node) => node.children.length !== 0);
    childless.sort(compareNodes);
    parent.sort(compareNodes);
    return depth === 0 ? [...childless, ...parent] : [...parent, ...childless];
  }

  if (isDefined(subtree.childrenOrder)) {
    const order = subtree.childrenOrder;

    // Custom sort order
    const custom: NavTree[] = [];
    order.forEach((slug) => {
      const node = subtree.children.find((n) => n.slug === slug);
      if (node != null) custom.push(node);
    });
    const fallback = subtree.children.filter(
      (node) => !order.includes(node.slug)
    );
    // eslint-disable-next-line no-param-reassign
    subtree.children = [...custom, ...fallback];
  } else {
    // eslint-disable-next-line no-param-reassign
    subtree.children = defaultSort(subtree.children);
  }
  subtree.children.forEach((node) => orderChildren(node, depth + 1));
}
