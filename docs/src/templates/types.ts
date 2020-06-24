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
`

/**
 * Passthrough props (add additional fields here)
 */
export type DocsPassthroughProps = {
  noTOC?: boolean;
  noBreadcrumb?: boolean;
  badge?: string;
};

// These frontmatter props are used to build the navtree
export type NavtreeConstructionProps = {
  title: string;
  shortTitle?: string;
  overrideBreadcrumb?: string;
  overrideNav?: string;
  isRoot?: boolean;
  childrenOrder?: string[];
};

export type DocsFrontmatter = DocsPassthroughProps & NavtreeConstructionProps;

export type BreadcrumbSegment = {
  text: string;
  path: string;
};

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

export type History = {
  lastModified: string;
  authors: Array<{}>;
};

// All props here need to be JSON-serializable (no `Option<T>`s)
export type DocProps = {
  breadcrumb: BreadcrumbSegment[];
  title: string;
  shortTitle: string;
  isOrphan: boolean;
  navRoot: NavTree;
  noTOC: boolean;
  noBreadcrumb: boolean;
  badge: string | null;
  originalPath: string | null;
  children: NavTree[];
  history: History | null;
}
