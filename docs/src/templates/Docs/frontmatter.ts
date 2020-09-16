import { Nil } from "@architus/lib/types";
import { History } from "@docs/build/github-types";

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
    noBreadcrumb: Boolean

    # Passthrough props (add additional fields here)
    noTOC: Boolean
    badge: String
    noSequenceLinks: Boolean
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
  noBreadcrumb

  # Passthrough props (add additional fields here)
  noTOC
  badge
  noSequenceLinks
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
  noBreadcrumb?: boolean;
};

/**
 * Passthrough props (add additional fields here)
 */
export type DocsPassthroughProps = {
  noTOC?: boolean;
  noSequenceLinks?: boolean;
  badge?: string;
};

/**
 * Single breadcrumb segment
 */
export type BreadcrumbSegment = {
  text: string;
  path: string | Nil;
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
  id: string | Nil;
  slug: string;
  path: string;
  root: boolean;
  title: string;
  shortTitle: string;
  navTitle: string;
  breadcrumbTitle: string;
  invisible: boolean;
  children: NavTree[];
  originalPath: string | Nil;
  childrenOrder: string[] | Nil;
  history: History | Nil;
  passthrough: DocsPassthroughProps | Nil;
  breadcrumb: BreadcrumbSegment[] | Nil;
  noBreadcrumb: boolean;
};

/**
 * Gatsby GraphQL node created for each docs page
 */
export type DocsPage = {
  breadcrumb: BreadcrumbSegment[] | Nil;
  title: string;
  shortTitle: string;
  isOrphan: boolean;
  noTOC: boolean;
  noSequenceLinks: boolean;
  badge: string | Nil;
  originalPath: string | Nil;
  history: History | Nil;
  path: string;
  preorder: number;
};
export const docsPageType = `
  type DocsPage implements Node @childOf(types: ["Mdx"], many: false) {
    breadcrumb: [BreadcrumbSegment!]
    title: String!
    shortTitle: String!
    isOrphan: Boolean!
    noTOC: Boolean!
    noSequenceLinks: Boolean!
    badge: String
    originalPath: String
    history: History
    sideNav: NavigationTree! @link
    path: String!
    preorder: Int!
    lead(maxLength: Int): String
  }
`;

/**
 * Context object passed into page component
 */
export type DocsContext = {
  id: string;
  previous: string | Nil;
  next: string | Nil;
};
