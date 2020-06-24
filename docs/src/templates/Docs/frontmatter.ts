import { GithubUser } from "../../build/github-integration";

/**
 * Gatsby GraphQL type used to define frontmatter fields/types
 */
export const frontmatterType = `
  type Frontmatter {
    title: String!
    shortTitle: String
    overrideBreadcrumb: String
    overrideNav: String
    isRoot: Boolean
    childrenOrder: [String]

    # Passthrough props (add additional fields here)
    noTOC: Boolean
    noBreadcrumb: Boolean
    badge: String
  }
`;

/**
 * Gatsby GraphQL fragment used to query frontmatter fields
 */
export const frontmatterFragment = `
  title
  shortTitle
  overrideBreadcrumb
  overrideNav
  isRoot
  childrenOrder

  # Passthrough props (add additional fields here)
  noTOC
  noBreadcrumb
  badge
`;

/**
 * Aggregate docs frontmatter type
 */
export type DocsFrontmatter = DocsPassthroughProps &
  DocsNavtreeConstructionProps;

/**
 * These frontmatter props are used to build the navtree
 */
export type DocsNavtreeConstructionProps = {
  title: string;
  shortTitle?: string;
  overrideBreadcrumb?: string;
  overrideNav?: string;
  isRoot?: boolean;
  childrenOrder?: string[];
};

/**
 * Passthrough props (add additional fields here)
 */
export type DocsPassthroughProps = {
  noTOC?: boolean;
  noBreadcrumb?: boolean;
  badge?: string;
  hello?: boolean;
};

/**
 * Single breadcrumb segment
 */
export type BreadcrumbSegment = {
  text: string;
  path: string | null;
};
export const breadcrumbType = `
  type BreadcrumbSegment @dontInfer {
    text: String!
    path: String
  }
`;

/**
 * Final constructed nav tree type.
 * All props here need to be JSON-serializable (no `Option<T>`s)
 */
export type NavTree = {
  id: string | null;
  slug: string;
  path: string;
  root: boolean;
  title: string;
  shortTitle: string;
  navTitle: string;
  breadcrumbTitle: string;
  invisible: boolean;
  children: NavTree[];
  originalPath: string | null;
  childrenOrder: string[] | null;
  history: History | null;
  passthrough: DocsPassthroughProps | null;
  breadcrumb: BreadcrumbSegment[];
};

/**
 * Optional GitHub History retrieved from the GitHub API integration
 */
export type History = {
  lastModified: string;
  authors: Array<GithubUser>;
};
export const historyType = `
  type History @dontInfer {
    lastModified: String!
    authors: [GithubUser!]!
  }
`;

/**
 * Gatsby GraphQL node created for each docs page
 */
export type DocsPage = {
  breadcrumb: BreadcrumbSegment[];
  title: string;
  shortTitle: string;
  isOrphan: boolean;
  navRoot: NavTree;
  noTOC: boolean;
  noBreadcrumb: boolean;
  badge: string | null;
  originalPath: string | null;
  navChildren: NavTree[];
  history: History | null;
};
export const docsPageType = `
  type DocsPage implements Node @childOf(types: ["Mdx"], many: false) @dontInfer {
    breadcrumb: [BreadcrumbSegment!]!
    title: String!
    shortTitle: String!
    isOrphan: Boolean!
    navRoot: JSON!
    noTOC: Boolean!
    noBreadcrumb: Boolean!
    badge: String
    originalPath: String
    navChildren: [JSON!]!
    history: History
  }
`

/**
 * Context object passed into page component
 */
export type DocsContext = {
  id: string;
};
