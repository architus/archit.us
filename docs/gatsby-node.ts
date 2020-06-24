import { GatsbyNode, SourceNodesArgs, CreatePagesArgs, Reporter } from "gatsby";

import {
  isDefined,
  isNil,
  trimMarkdownPath,
  splitPath,
  capitalize,
} from "../lib/utility";
import { Option, Some, None } from "../lib/option";
import {
  DocsFrontmatter,
  frontmatterFragment,
  frontmatterType,
  NavtreeConstructionProps,
  BreadcrumbSegment,
  DocsPassthroughProps,
  NavTree,
  History,
  DocProps,
} from "./src/templates/types";

const path = require("path");
const DocsPageTemplate = path.resolve("./src/templates/Docs.tsx");

// Define custom graphql schema to enforce rigid type structures
export const sourceNodes: GatsbyNode["sourceNodes"] = ({
  actions,
  reporter,
}: SourceNodesArgs) => {
  const activity = reporter.activityTimer("implementing custom graphql schema");
  activity.start();
  // To add new keys to the frontmatter, see /src/templates/types.ts
  actions.createTypes(`
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
  return null;
};

/**
 * Inner MDX docs node query object
 */
type DocsNode = {
  relativePath: string;
  childMdx?: {
    id: string;
    // To add new keys to the frontmatter, see /src/templates/types.ts
    frontmatter: DocsFrontmatter;
  };
};

// To add new keys to the frontmatter, see /src/templates/types.ts
const docsNodeFragment = `
  relativePath
  childMdx {
    id
    frontmatter {
      ${frontmatterFragment}
    }
  }
`;

/**
 * Page authorship information extracted from GitHub
 */
type PageAuthorship = Array<{
  committedDate: string;
  author: {
    user: {
      name?: string;
      avatarUrl?: string;
      login: string;
      url: string;
    };
  };
}>;

/**
 * Attempts to load the page authorship information using the GitHub API,
 * returning `None` if the data couldn't be loaded for any reason
 * @param paths - List of `relativePath` fields extracted from the docs query
 * @param reporter - Gatsby plugin API reporter instance
 * @param graphql - Gatsby graphql query hook
 */
async function loadGithubMetadata(
  paths: string[],
  reporter: Reporter,
  graphql: CreatePagesArgs["graphql"]
): Promise<Option<Map<string, PageAuthorship>>> {
  // Make sure token was passed in
  if (process.env.GITHUB_TOKEN == null) {
    [
      "Could not find Github token. Skipping authorship metadata sourcing.",
      "To enable author metadata, set the GITHUB_TOKEN environment variable",
    ].forEach((line) => reporter.warn(line));
    return None;
  }

  // Re-use activity variable
  const activity = reporter.activityTimer(
    `loading page authorship metadata via GitHub integration`
  );
  activity.start();

  type GithubMetadataQueryResult = {
    site: {
      siteMetadata: {
        github?: {
          owner?: string;
          name?: string;
          docsRoot?: string;
          branch?: string;
        };
      };
    };
  };

  const githubMetadataQuery = `
    site {
      siteMetadata {
        github {
          owner
          name
          docsRoot
          branch
        }
      }
    }
  `;

  const { data: siteData, errors: siteErrors } = await graphql<
    GithubMetadataQueryResult
  >(githubMetadataQuery);

  // Make sure no errors ocurred
  if (isDefined(siteErrors)) {
    reporter.warn(
      "An error ocurred while querying 'siteMetadata.github' for page authorship sourcing"
    );
    reporter.warn(siteErrors);
    activity.end();
    return None;
  }

  // Make sure github object was given
  const { github } = siteData.site.siteMetadata;
  if (isNil(github)) {
    [
      "'github' is a required field in 'siteMetadata' to enable GitHub integration.",
      "Add it in 'gatsby-config.ts'",
    ].forEach((line) => reporter.warn(line));
    activity.end();
    return None;
  }

  // Make sure all fields were given
  const { owner, name, docsRoot, branch } = github;
  if (isNil(owner) || isNil(name) || isNil(docsRoot) || isNil(branch)) {
    [
      "One or more required fields for GitHub integration were missing from 'siteMetadata.github'.",
      "Add them in 'gatsby-config.ts'",
    ].forEach((line) => reporter.warn(line));
    activity.end();
    return None;
  }

  type GithubApiResults = {
    github: {
      repository: {
        object: {
          [key: string]: {
            nodes: PageAuthorship;
          };
        };
      };
    };
  };

  // Here, we use multiple GitHub commits for each docs file,
  // making the name of their query aliases 'f<index>'
  // (the 'f' is needed to make sure the key is not coerced to a number and rejected)
  const { data: githubData, errors: githubErrors } = await graphql<
    GithubApiResults
  >(
    `
      query githubMetadataQuery($owner: String!, $name: String!, $limit: Int!) {
        github {
          repository(owner: $owner, name: $name) {
            object(expression: "master") {
              ... on GitHub_Commit {
                ${paths.map(
                  (p, i) => `f${i.toString()}: history(
                  first: $limit,
                  path: "${docsRoot + p}"
                ) {
                  nodes {
                    committedDate
                    author {
                      user {
                        name
                        avatarUrl
                        login
                        url
                      }
                    }
                  }
                }`
                )}
              }
            }
          }
        }
      }
    `
  );

  // Make sure no errors ocurred
  if (isDefined(githubErrors)) {
    reporter.warn(
      "An error ocurred while querying the GitHub API for page authorship sourcing"
    );
    reporter.warn(githubErrors);
    activity.end();
    return None;
  }

  // Map object to array with indices
  const pathMap: Map<string, PageAuthorship> = new Map();
  Object.entries(githubData.github.repository.object).forEach(
    ([key, value]) => {
      const idx = parseInt(key.slice(1));
      const path = paths[idx];
      pathMap.set(path, value.nodes);
    }
  );

  activity.end();
  return Some(pathMap);
}

// Dynamically create documentation pages
export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}: CreatePagesArgs) => {
  // Re-use activity variable
  let activity = reporter.activityTimer(`loading docs pages via graphql`);
  activity.start();

  type DocsQueryResult = {
    allFile: {
      edges: Array<{
        node: DocsNode;
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
            ${docsNodeFragment}
          }
        }
      }
    }
  `;

  const { data, errors } = await graphql<DocsQueryResult>(docsQuery, {
    limit: 10000,
  });

  activity.end();
  if (errors) {
    throw errors;
  }

  const paths = data.allFile.edges.map(({ node }) => node.relativePath);
  const githubMetadata = await loadGithubMetadata(paths, reporter, graphql);

  activity = reporter.activityTimer(`walking navigation tree`);
  activity.start();

  // Walk the navigation tree and add each docs page node
  const baseNavTree: BaseNavTree = initialBaseNavTree();
  data.allFile.edges.forEach(({ node }) =>
    walkTree(
      {
        path: node.relativePath,
        id: node.childMdx.id,
        ...node.childMdx.frontmatter,
      },
      baseNavTree
    )
  );

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
  activity = reporter.activityTimer(`dynamically generating docs pages`);
  activity.start();

  function createSubtreePages(subtree, root) {
    if (!subtree.invisible) {
      const {
        breadcrumb,
        title,
        shortTitle,
        originalPath,
        passthrough,
        children,
        history,
      } = subtree;

      const context: DocProps= {
        breadcrumb,
        title,
        shortTitle,
        isOrphan: isNil(originalPath),
        navRoot: root,
        noTOC: passthrough?.noTOC ?? false,
        noBreadcrumb: passthrough?.noBreadcrumb ?? false,
        badge: passthrough?.badge ?? null,
        originalPath,
        children,
        history
      };

      actions.createPage({
        path: subtree.path,
        component: DocsPageTemplate,
        context,
      });

      let suffix;
      if (!subtree.invisible) {
        if (subtree.isOrphan) {
          suffix = "(orphan)";
        } else {
          suffix = `=> ${subtree.id}`;
        }
      }
      reporter.info(`docs page @ '${subtree.path}' ${suffix}`);
    }

    subtree.children.forEach((child) => createSubtreePages(child, root));
  }
  roots.forEach((root) => createSubtreePages(root, root));

  activity.end();
};

// ? ==========================
// ? Navigation tree processing
// ? ==========================

/**
 * Adds a trailing slash to the given path
 * @param path - Base path
 */
function addTrailingSlash(path: string): string {
  return path.slice(-1) === "/" ? path : `${path}/`;
}

type NormalizedGatsbyNode = { path: string; id: string } & DocsFrontmatter;

type BaseNavTree = {
  id: Option<string>;
  slug: string;
  path: string;
  root: boolean;
  title: string;
  invisible: boolean;
  children: BaseNavTree[];
  originalPath: Option<string>;
  construction: Option<NavtreeConstructionProps>;
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
  construction: NavtreeConstructionProps;
  passthrough: DocsPassthroughProps;
} {
  const {
    id,
    path,
    title,
    shortTitle,
    overrideBreadcrumb,
    overrideNav,
    isRoot,
    childrenOrder,
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
      childrenOrder,
    },
  };
}

/**
 * Walks the nav tree using each parsed node, adding orphan nodes in between as necessary
 * @param node - List of normalized nodes from the graphql query
 * @param navTree - Mutable tree object that is constructed in-place
 */
function walkTree(node: NormalizedGatsbyNode, navTree: BaseNavTree) {
  const path = trimMarkdownPath(node.path);

  // If root, replace default root node with this one
  if (path === "/") {
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
    const fragments = splitPath(path);
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
          path: addTrailingSlash(path),
          root: false || node.isRoot,
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
  let { title } = subtree;
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
      .map(({ childrenOrder }) => childrenOrder)
      .orNull(),
    history: null,
    passthrough: subtree.passthrough.orNull(),
    breadcrumb: [],
  };
}

/**
 * Attaches authorship data from GitHub
 * @param subtree - navigation tree (mutated in place)
 * @param metadataMap - authorship data retrieved from the GitHub API
 */
function attachAuthorship(
  subtree: NavTree,
  metadataMap: Map<string, PageAuthorship>
) {
  if (
    isDefined(subtree.originalPath) &&
    metadataMap.has(subtree.originalPath)
  ) {
    const metadata = metadataMap.get(subtree.originalPath);
    const lastModified =
      metadata.length >= 0 && metadata[0] != null
        ? new Date(metadata[0].committedDate)
        : new Date();

    // Build authors list (drop non-unique authors)
    let authors: History["authors"] = [];
    let logins: Set<string> = new Set();
    metadata.forEach(({ author: { user } }) => {
      if (user != null) {
        if (!logins.has(user.login)) {
          logins.add(user.login);
          authors.push(user);
        }
      }
    });

    subtree.history = {
      lastModified: lastModified.toString(),
      authors,
    };
  }

  subtree.children.forEach((s) => attachAuthorship(s, metadataMap));
}

/**
 * Splits a navigation tree into each subtree
 * @param navTree - Base full navigation tree
 */
function collectRoots(navTree: NavTree): NavTree[] {
  const roots = [navTree];
  function separateRootNodes(subtree: NavTree) {
    for (let i = 0; i < subtree.children.length; ++i) {
      const child = subtree.children[i];
      if (child.root) {
        roots.push(child);
        // Remove and rewind iteration
        subtree.children.splice(i, 1);
        --i;
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
      --i;
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
) {
  let withNext = [
    ...currentBreadcrumb,
    {
      text: subtree.breadcrumbTitle,
      path: subtree.path == null ? null : subtree.path,
    },
  ];

  if (!subtree.invisible) {
    const length = withNext.length;
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
function compareNodes(a, b) {
  return a.navTitle
    .toLocaleLowerCase()
    .localeCompare(b.navTitle.toLocaleLowerCase());
}

/**
 * Orders children using, using `childrenOrder` if explicitly given
 * @param subtree - the current nav subtree
 * @param depth - the current tree depth
 */
function orderChildren(subtree: NavTree, depth: number) {
  function defaultSort(nodes: NavTree[]) {
    const childless = nodes.filter((node) => node.children.length === 0);
    const parent = nodes.filter((node) => node.children.length !== 0);
    childless.sort(compareNodes);
    parent.sort(compareNodes);
    return depth === 0 ? [...childless, ...parent] : [...parent, ...childless];
  }

  if (isDefined(subtree.childrenOrder)) {
    let order = subtree.childrenOrder;

    // Custom sort order
    let custom: NavTree[] = [];
    order.forEach((slug) => {
      const node = subtree.children.find((node) => node.slug === slug);
      if (node != null) custom.push(node);
    });
    const fallback = subtree.children.filter(
      (node) => !order.includes(node.slug)
    );
    subtree.children = [...custom, ...fallback];
  } else {
    subtree.children = defaultSort(subtree.children);
  }
  subtree.children.forEach((node) => orderChildren(node, depth + 1));
}
