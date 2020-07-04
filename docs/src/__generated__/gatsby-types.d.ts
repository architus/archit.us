/* eslint-disable */

declare namespace GatsbyTypes {
type Maybe<T> = T | undefined;
type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  JSON: never;
  GitHub_URI: any;
  GitHub_DateTime: any;
  GitHub_HTML: any;
  GitHub_GitObjectID: any;
  GitHub_GitTimestamp: any;
  GitHub_GitSSHRemote: any;
  GitHub_Date: any;
  GitHub_PreciseDateTime: any;
  GitHub_X509Certificate: any;
};











type BooleanQueryOperatorInput = {
  readonly eq: Maybe<Scalars['Boolean']>;
  readonly ne: Maybe<Scalars['Boolean']>;
  readonly in: Maybe<ReadonlyArray<Maybe<Scalars['Boolean']>>>;
  readonly nin: Maybe<ReadonlyArray<Maybe<Scalars['Boolean']>>>;
};

type BreadcrumbSegment = {
  readonly text: Scalars['String'];
  readonly path: Maybe<Scalars['String']>;
};

type BreadcrumbSegmentFilterInput = {
  readonly text: Maybe<StringQueryOperatorInput>;
  readonly path: Maybe<StringQueryOperatorInput>;
};

type BreadcrumbSegmentFilterListInput = {
  readonly elemMatch: Maybe<BreadcrumbSegmentFilterInput>;
};

type BuildMetadata = Node & {
  readonly label: Scalars['String'];
  readonly icon: Maybe<Scalars['String']>;
  readonly context: BuildMetadataContext;
  readonly details: ReadonlyArray<BuildMetadataEntry>;
  readonly id: Scalars['ID'];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
};

type BuildMetadataConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<BuildMetadataEdge>;
  readonly nodes: ReadonlyArray<BuildMetadata>;
  readonly pageInfo: PageInfo;
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly group: ReadonlyArray<BuildMetadataGroupConnection>;
};


type BuildMetadataConnection_distinctArgs = {
  field: BuildMetadataFieldsEnum;
};


type BuildMetadataConnection_groupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: BuildMetadataFieldsEnum;
};

type BuildMetadataContext = {
  readonly label: Scalars['String'];
  readonly message: Maybe<Scalars['String']>;
  readonly icon: Maybe<Scalars['String']>;
};

type BuildMetadataContextFilterInput = {
  readonly label: Maybe<StringQueryOperatorInput>;
  readonly message: Maybe<StringQueryOperatorInput>;
  readonly icon: Maybe<StringQueryOperatorInput>;
};

type BuildMetadataEdge = {
  readonly next: Maybe<BuildMetadata>;
  readonly node: BuildMetadata;
  readonly previous: Maybe<BuildMetadata>;
};

type BuildMetadataEntry = {
  readonly type: Scalars['String'];
  readonly label: Scalars['String'];
  readonly href: Maybe<Scalars['String']>;
  readonly text: Maybe<Scalars['String']>;
  readonly content: Maybe<Scalars['String']>;
};

type BuildMetadataEntryFilterInput = {
  readonly type: Maybe<StringQueryOperatorInput>;
  readonly label: Maybe<StringQueryOperatorInput>;
  readonly href: Maybe<StringQueryOperatorInput>;
  readonly text: Maybe<StringQueryOperatorInput>;
  readonly content: Maybe<StringQueryOperatorInput>;
};

type BuildMetadataEntryFilterListInput = {
  readonly elemMatch: Maybe<BuildMetadataEntryFilterInput>;
};

enum BuildMetadataFieldsEnum {
  label = 'label',
  icon = 'icon',
  context___label = 'context.label',
  context___message = 'context.message',
  context___icon = 'context.icon',
  details = 'details',
  details___type = 'details.type',
  details___label = 'details.label',
  details___href = 'details.href',
  details___text = 'details.text',
  details___content = 'details.content',
  id = 'id',
  parent___id = 'parent.id',
  parent___parent___id = 'parent.parent.id',
  parent___parent___parent___id = 'parent.parent.parent.id',
  parent___parent___parent___children = 'parent.parent.parent.children',
  parent___parent___children = 'parent.parent.children',
  parent___parent___children___id = 'parent.parent.children.id',
  parent___parent___children___children = 'parent.parent.children.children',
  parent___parent___internal___content = 'parent.parent.internal.content',
  parent___parent___internal___contentDigest = 'parent.parent.internal.contentDigest',
  parent___parent___internal___description = 'parent.parent.internal.description',
  parent___parent___internal___fieldOwners = 'parent.parent.internal.fieldOwners',
  parent___parent___internal___ignoreType = 'parent.parent.internal.ignoreType',
  parent___parent___internal___mediaType = 'parent.parent.internal.mediaType',
  parent___parent___internal___owner = 'parent.parent.internal.owner',
  parent___parent___internal___type = 'parent.parent.internal.type',
  parent___children = 'parent.children',
  parent___children___id = 'parent.children.id',
  parent___children___parent___id = 'parent.children.parent.id',
  parent___children___parent___children = 'parent.children.parent.children',
  parent___children___children = 'parent.children.children',
  parent___children___children___id = 'parent.children.children.id',
  parent___children___children___children = 'parent.children.children.children',
  parent___children___internal___content = 'parent.children.internal.content',
  parent___children___internal___contentDigest = 'parent.children.internal.contentDigest',
  parent___children___internal___description = 'parent.children.internal.description',
  parent___children___internal___fieldOwners = 'parent.children.internal.fieldOwners',
  parent___children___internal___ignoreType = 'parent.children.internal.ignoreType',
  parent___children___internal___mediaType = 'parent.children.internal.mediaType',
  parent___children___internal___owner = 'parent.children.internal.owner',
  parent___children___internal___type = 'parent.children.internal.type',
  parent___internal___content = 'parent.internal.content',
  parent___internal___contentDigest = 'parent.internal.contentDigest',
  parent___internal___description = 'parent.internal.description',
  parent___internal___fieldOwners = 'parent.internal.fieldOwners',
  parent___internal___ignoreType = 'parent.internal.ignoreType',
  parent___internal___mediaType = 'parent.internal.mediaType',
  parent___internal___owner = 'parent.internal.owner',
  parent___internal___type = 'parent.internal.type',
  children = 'children',
  children___id = 'children.id',
  children___parent___id = 'children.parent.id',
  children___parent___parent___id = 'children.parent.parent.id',
  children___parent___parent___children = 'children.parent.parent.children',
  children___parent___children = 'children.parent.children',
  children___parent___children___id = 'children.parent.children.id',
  children___parent___children___children = 'children.parent.children.children',
  children___parent___internal___content = 'children.parent.internal.content',
  children___parent___internal___contentDigest = 'children.parent.internal.contentDigest',
  children___parent___internal___description = 'children.parent.internal.description',
  children___parent___internal___fieldOwners = 'children.parent.internal.fieldOwners',
  children___parent___internal___ignoreType = 'children.parent.internal.ignoreType',
  children___parent___internal___mediaType = 'children.parent.internal.mediaType',
  children___parent___internal___owner = 'children.parent.internal.owner',
  children___parent___internal___type = 'children.parent.internal.type',
  children___children = 'children.children',
  children___children___id = 'children.children.id',
  children___children___parent___id = 'children.children.parent.id',
  children___children___parent___children = 'children.children.parent.children',
  children___children___children = 'children.children.children',
  children___children___children___id = 'children.children.children.id',
  children___children___children___children = 'children.children.children.children',
  children___children___internal___content = 'children.children.internal.content',
  children___children___internal___contentDigest = 'children.children.internal.contentDigest',
  children___children___internal___description = 'children.children.internal.description',
  children___children___internal___fieldOwners = 'children.children.internal.fieldOwners',
  children___children___internal___ignoreType = 'children.children.internal.ignoreType',
  children___children___internal___mediaType = 'children.children.internal.mediaType',
  children___children___internal___owner = 'children.children.internal.owner',
  children___children___internal___type = 'children.children.internal.type',
  children___internal___content = 'children.internal.content',
  children___internal___contentDigest = 'children.internal.contentDigest',
  children___internal___description = 'children.internal.description',
  children___internal___fieldOwners = 'children.internal.fieldOwners',
  children___internal___ignoreType = 'children.internal.ignoreType',
  children___internal___mediaType = 'children.internal.mediaType',
  children___internal___owner = 'children.internal.owner',
  children___internal___type = 'children.internal.type',
  internal___content = 'internal.content',
  internal___contentDigest = 'internal.contentDigest',
  internal___description = 'internal.description',
  internal___fieldOwners = 'internal.fieldOwners',
  internal___ignoreType = 'internal.ignoreType',
  internal___mediaType = 'internal.mediaType',
  internal___owner = 'internal.owner',
  internal___type = 'internal.type'
}

type BuildMetadataFilterInput = {
  readonly label: Maybe<StringQueryOperatorInput>;
  readonly icon: Maybe<StringQueryOperatorInput>;
  readonly context: Maybe<BuildMetadataContextFilterInput>;
  readonly details: Maybe<BuildMetadataEntryFilterListInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
};

type BuildMetadataGroupConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<BuildMetadataEdge>;
  readonly nodes: ReadonlyArray<BuildMetadata>;
  readonly pageInfo: PageInfo;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
};

type BuildMetadataSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<BuildMetadataFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};


type DateQueryOperatorInput = {
  readonly eq: Maybe<Scalars['Date']>;
  readonly ne: Maybe<Scalars['Date']>;
  readonly gt: Maybe<Scalars['Date']>;
  readonly gte: Maybe<Scalars['Date']>;
  readonly lt: Maybe<Scalars['Date']>;
  readonly lte: Maybe<Scalars['Date']>;
  readonly in: Maybe<ReadonlyArray<Maybe<Scalars['Date']>>>;
  readonly nin: Maybe<ReadonlyArray<Maybe<Scalars['Date']>>>;
};

type Directory = Node & {
  readonly sourceInstanceName: Scalars['String'];
  readonly absolutePath: Scalars['String'];
  readonly relativePath: Scalars['String'];
  readonly extension: Scalars['String'];
  readonly size: Scalars['Int'];
  readonly prettySize: Scalars['String'];
  readonly modifiedTime: Scalars['Date'];
  readonly accessTime: Scalars['Date'];
  readonly changeTime: Scalars['Date'];
  readonly birthTime: Scalars['Date'];
  readonly root: Scalars['String'];
  readonly dir: Scalars['String'];
  readonly base: Scalars['String'];
  readonly ext: Scalars['String'];
  readonly name: Scalars['String'];
  readonly relativeDirectory: Scalars['String'];
  readonly dev: Scalars['Int'];
  readonly mode: Scalars['Int'];
  readonly nlink: Scalars['Int'];
  readonly uid: Scalars['Int'];
  readonly gid: Scalars['Int'];
  readonly rdev: Scalars['Int'];
  readonly ino: Scalars['Float'];
  readonly atimeMs: Scalars['Float'];
  readonly mtimeMs: Scalars['Float'];
  readonly ctimeMs: Scalars['Float'];
  readonly atime: Scalars['Date'];
  readonly mtime: Scalars['Date'];
  readonly ctime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  readonly birthtime: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  readonly birthtimeMs: Maybe<Scalars['Float']>;
  readonly blksize: Maybe<Scalars['Int']>;
  readonly blocks: Maybe<Scalars['Int']>;
  readonly id: Scalars['ID'];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
};


type Directory_modifiedTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


type Directory_accessTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


type Directory_changeTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


type Directory_birthTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


type Directory_atimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


type Directory_mtimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


type Directory_ctimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};

type DirectoryConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<DirectoryEdge>;
  readonly nodes: ReadonlyArray<Directory>;
  readonly pageInfo: PageInfo;
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly group: ReadonlyArray<DirectoryGroupConnection>;
};


type DirectoryConnection_distinctArgs = {
  field: DirectoryFieldsEnum;
};


type DirectoryConnection_groupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: DirectoryFieldsEnum;
};

type DirectoryEdge = {
  readonly next: Maybe<Directory>;
  readonly node: Directory;
  readonly previous: Maybe<Directory>;
};

enum DirectoryFieldsEnum {
  sourceInstanceName = 'sourceInstanceName',
  absolutePath = 'absolutePath',
  relativePath = 'relativePath',
  extension = 'extension',
  size = 'size',
  prettySize = 'prettySize',
  modifiedTime = 'modifiedTime',
  accessTime = 'accessTime',
  changeTime = 'changeTime',
  birthTime = 'birthTime',
  root = 'root',
  dir = 'dir',
  base = 'base',
  ext = 'ext',
  name = 'name',
  relativeDirectory = 'relativeDirectory',
  dev = 'dev',
  mode = 'mode',
  nlink = 'nlink',
  uid = 'uid',
  gid = 'gid',
  rdev = 'rdev',
  ino = 'ino',
  atimeMs = 'atimeMs',
  mtimeMs = 'mtimeMs',
  ctimeMs = 'ctimeMs',
  atime = 'atime',
  mtime = 'mtime',
  ctime = 'ctime',
  birthtime = 'birthtime',
  birthtimeMs = 'birthtimeMs',
  blksize = 'blksize',
  blocks = 'blocks',
  id = 'id',
  parent___id = 'parent.id',
  parent___parent___id = 'parent.parent.id',
  parent___parent___parent___id = 'parent.parent.parent.id',
  parent___parent___parent___children = 'parent.parent.parent.children',
  parent___parent___children = 'parent.parent.children',
  parent___parent___children___id = 'parent.parent.children.id',
  parent___parent___children___children = 'parent.parent.children.children',
  parent___parent___internal___content = 'parent.parent.internal.content',
  parent___parent___internal___contentDigest = 'parent.parent.internal.contentDigest',
  parent___parent___internal___description = 'parent.parent.internal.description',
  parent___parent___internal___fieldOwners = 'parent.parent.internal.fieldOwners',
  parent___parent___internal___ignoreType = 'parent.parent.internal.ignoreType',
  parent___parent___internal___mediaType = 'parent.parent.internal.mediaType',
  parent___parent___internal___owner = 'parent.parent.internal.owner',
  parent___parent___internal___type = 'parent.parent.internal.type',
  parent___children = 'parent.children',
  parent___children___id = 'parent.children.id',
  parent___children___parent___id = 'parent.children.parent.id',
  parent___children___parent___children = 'parent.children.parent.children',
  parent___children___children = 'parent.children.children',
  parent___children___children___id = 'parent.children.children.id',
  parent___children___children___children = 'parent.children.children.children',
  parent___children___internal___content = 'parent.children.internal.content',
  parent___children___internal___contentDigest = 'parent.children.internal.contentDigest',
  parent___children___internal___description = 'parent.children.internal.description',
  parent___children___internal___fieldOwners = 'parent.children.internal.fieldOwners',
  parent___children___internal___ignoreType = 'parent.children.internal.ignoreType',
  parent___children___internal___mediaType = 'parent.children.internal.mediaType',
  parent___children___internal___owner = 'parent.children.internal.owner',
  parent___children___internal___type = 'parent.children.internal.type',
  parent___internal___content = 'parent.internal.content',
  parent___internal___contentDigest = 'parent.internal.contentDigest',
  parent___internal___description = 'parent.internal.description',
  parent___internal___fieldOwners = 'parent.internal.fieldOwners',
  parent___internal___ignoreType = 'parent.internal.ignoreType',
  parent___internal___mediaType = 'parent.internal.mediaType',
  parent___internal___owner = 'parent.internal.owner',
  parent___internal___type = 'parent.internal.type',
  children = 'children',
  children___id = 'children.id',
  children___parent___id = 'children.parent.id',
  children___parent___parent___id = 'children.parent.parent.id',
  children___parent___parent___children = 'children.parent.parent.children',
  children___parent___children = 'children.parent.children',
  children___parent___children___id = 'children.parent.children.id',
  children___parent___children___children = 'children.parent.children.children',
  children___parent___internal___content = 'children.parent.internal.content',
  children___parent___internal___contentDigest = 'children.parent.internal.contentDigest',
  children___parent___internal___description = 'children.parent.internal.description',
  children___parent___internal___fieldOwners = 'children.parent.internal.fieldOwners',
  children___parent___internal___ignoreType = 'children.parent.internal.ignoreType',
  children___parent___internal___mediaType = 'children.parent.internal.mediaType',
  children___parent___internal___owner = 'children.parent.internal.owner',
  children___parent___internal___type = 'children.parent.internal.type',
  children___children = 'children.children',
  children___children___id = 'children.children.id',
  children___children___parent___id = 'children.children.parent.id',
  children___children___parent___children = 'children.children.parent.children',
  children___children___children = 'children.children.children',
  children___children___children___id = 'children.children.children.id',
  children___children___children___children = 'children.children.children.children',
  children___children___internal___content = 'children.children.internal.content',
  children___children___internal___contentDigest = 'children.children.internal.contentDigest',
  children___children___internal___description = 'children.children.internal.description',
  children___children___internal___fieldOwners = 'children.children.internal.fieldOwners',
  children___children___internal___ignoreType = 'children.children.internal.ignoreType',
  children___children___internal___mediaType = 'children.children.internal.mediaType',
  children___children___internal___owner = 'children.children.internal.owner',
  children___children___internal___type = 'children.children.internal.type',
  children___internal___content = 'children.internal.content',
  children___internal___contentDigest = 'children.internal.contentDigest',
  children___internal___description = 'children.internal.description',
  children___internal___fieldOwners = 'children.internal.fieldOwners',
  children___internal___ignoreType = 'children.internal.ignoreType',
  children___internal___mediaType = 'children.internal.mediaType',
  children___internal___owner = 'children.internal.owner',
  children___internal___type = 'children.internal.type',
  internal___content = 'internal.content',
  internal___contentDigest = 'internal.contentDigest',
  internal___description = 'internal.description',
  internal___fieldOwners = 'internal.fieldOwners',
  internal___ignoreType = 'internal.ignoreType',
  internal___mediaType = 'internal.mediaType',
  internal___owner = 'internal.owner',
  internal___type = 'internal.type'
}

type DirectoryFilterInput = {
  readonly sourceInstanceName: Maybe<StringQueryOperatorInput>;
  readonly absolutePath: Maybe<StringQueryOperatorInput>;
  readonly relativePath: Maybe<StringQueryOperatorInput>;
  readonly extension: Maybe<StringQueryOperatorInput>;
  readonly size: Maybe<IntQueryOperatorInput>;
  readonly prettySize: Maybe<StringQueryOperatorInput>;
  readonly modifiedTime: Maybe<DateQueryOperatorInput>;
  readonly accessTime: Maybe<DateQueryOperatorInput>;
  readonly changeTime: Maybe<DateQueryOperatorInput>;
  readonly birthTime: Maybe<DateQueryOperatorInput>;
  readonly root: Maybe<StringQueryOperatorInput>;
  readonly dir: Maybe<StringQueryOperatorInput>;
  readonly base: Maybe<StringQueryOperatorInput>;
  readonly ext: Maybe<StringQueryOperatorInput>;
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly relativeDirectory: Maybe<StringQueryOperatorInput>;
  readonly dev: Maybe<IntQueryOperatorInput>;
  readonly mode: Maybe<IntQueryOperatorInput>;
  readonly nlink: Maybe<IntQueryOperatorInput>;
  readonly uid: Maybe<IntQueryOperatorInput>;
  readonly gid: Maybe<IntQueryOperatorInput>;
  readonly rdev: Maybe<IntQueryOperatorInput>;
  readonly ino: Maybe<FloatQueryOperatorInput>;
  readonly atimeMs: Maybe<FloatQueryOperatorInput>;
  readonly mtimeMs: Maybe<FloatQueryOperatorInput>;
  readonly ctimeMs: Maybe<FloatQueryOperatorInput>;
  readonly atime: Maybe<DateQueryOperatorInput>;
  readonly mtime: Maybe<DateQueryOperatorInput>;
  readonly ctime: Maybe<DateQueryOperatorInput>;
  readonly birthtime: Maybe<DateQueryOperatorInput>;
  readonly birthtimeMs: Maybe<FloatQueryOperatorInput>;
  readonly blksize: Maybe<IntQueryOperatorInput>;
  readonly blocks: Maybe<IntQueryOperatorInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
};

type DirectoryGroupConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<DirectoryEdge>;
  readonly nodes: ReadonlyArray<Directory>;
  readonly pageInfo: PageInfo;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
};

type DirectorySortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<DirectoryFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

type DocsPage = Node & {
  readonly breadcrumb: Maybe<ReadonlyArray<BreadcrumbSegment>>;
  readonly title: Scalars['String'];
  readonly shortTitle: Scalars['String'];
  readonly isOrphan: Scalars['Boolean'];
  readonly noTOC: Scalars['Boolean'];
  readonly noSequenceLinks: Scalars['Boolean'];
  readonly badge: Maybe<Scalars['String']>;
  readonly originalPath: Maybe<Scalars['String']>;
  readonly history: Maybe<History>;
  readonly sideNav: NavigationTree;
  readonly path: Scalars['String'];
  readonly preorder: Scalars['Int'];
  readonly lead: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
};


type DocsPage_leadArgs = {
  maxLength: Maybe<Scalars['Int']>;
};

type DocsPageConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<DocsPageEdge>;
  readonly nodes: ReadonlyArray<DocsPage>;
  readonly pageInfo: PageInfo;
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly group: ReadonlyArray<DocsPageGroupConnection>;
};


type DocsPageConnection_distinctArgs = {
  field: DocsPageFieldsEnum;
};


type DocsPageConnection_groupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: DocsPageFieldsEnum;
};

type DocsPageEdge = {
  readonly next: Maybe<DocsPage>;
  readonly node: DocsPage;
  readonly previous: Maybe<DocsPage>;
};

enum DocsPageFieldsEnum {
  breadcrumb = 'breadcrumb',
  breadcrumb___text = 'breadcrumb.text',
  breadcrumb___path = 'breadcrumb.path',
  title = 'title',
  shortTitle = 'shortTitle',
  isOrphan = 'isOrphan',
  noTOC = 'noTOC',
  noSequenceLinks = 'noSequenceLinks',
  badge = 'badge',
  originalPath = 'originalPath',
  history___lastModified = 'history.lastModified',
  history___authors = 'history.authors',
  history___authors___name = 'history.authors.name',
  history___authors___avatarUrl = 'history.authors.avatarUrl',
  history___authors___login = 'history.authors.login',
  history___authors___url = 'history.authors.url',
  sideNav___root = 'sideNav.root',
  sideNav___id = 'sideNav.id',
  sideNav___parent___id = 'sideNav.parent.id',
  sideNav___parent___parent___id = 'sideNav.parent.parent.id',
  sideNav___parent___parent___children = 'sideNav.parent.parent.children',
  sideNav___parent___children = 'sideNav.parent.children',
  sideNav___parent___children___id = 'sideNav.parent.children.id',
  sideNav___parent___children___children = 'sideNav.parent.children.children',
  sideNav___parent___internal___content = 'sideNav.parent.internal.content',
  sideNav___parent___internal___contentDigest = 'sideNav.parent.internal.contentDigest',
  sideNav___parent___internal___description = 'sideNav.parent.internal.description',
  sideNav___parent___internal___fieldOwners = 'sideNav.parent.internal.fieldOwners',
  sideNav___parent___internal___ignoreType = 'sideNav.parent.internal.ignoreType',
  sideNav___parent___internal___mediaType = 'sideNav.parent.internal.mediaType',
  sideNav___parent___internal___owner = 'sideNav.parent.internal.owner',
  sideNav___parent___internal___type = 'sideNav.parent.internal.type',
  sideNav___children = 'sideNav.children',
  sideNav___children___id = 'sideNav.children.id',
  sideNav___children___parent___id = 'sideNav.children.parent.id',
  sideNav___children___parent___children = 'sideNav.children.parent.children',
  sideNav___children___children = 'sideNav.children.children',
  sideNav___children___children___id = 'sideNav.children.children.id',
  sideNav___children___children___children = 'sideNav.children.children.children',
  sideNav___children___internal___content = 'sideNav.children.internal.content',
  sideNav___children___internal___contentDigest = 'sideNav.children.internal.contentDigest',
  sideNav___children___internal___description = 'sideNav.children.internal.description',
  sideNav___children___internal___fieldOwners = 'sideNav.children.internal.fieldOwners',
  sideNav___children___internal___ignoreType = 'sideNav.children.internal.ignoreType',
  sideNav___children___internal___mediaType = 'sideNav.children.internal.mediaType',
  sideNav___children___internal___owner = 'sideNav.children.internal.owner',
  sideNav___children___internal___type = 'sideNav.children.internal.type',
  sideNav___internal___content = 'sideNav.internal.content',
  sideNav___internal___contentDigest = 'sideNav.internal.contentDigest',
  sideNav___internal___description = 'sideNav.internal.description',
  sideNav___internal___fieldOwners = 'sideNav.internal.fieldOwners',
  sideNav___internal___ignoreType = 'sideNav.internal.ignoreType',
  sideNav___internal___mediaType = 'sideNav.internal.mediaType',
  sideNav___internal___owner = 'sideNav.internal.owner',
  sideNav___internal___type = 'sideNav.internal.type',
  path = 'path',
  preorder = 'preorder',
  lead = 'lead',
  id = 'id',
  parent___id = 'parent.id',
  parent___parent___id = 'parent.parent.id',
  parent___parent___parent___id = 'parent.parent.parent.id',
  parent___parent___parent___children = 'parent.parent.parent.children',
  parent___parent___children = 'parent.parent.children',
  parent___parent___children___id = 'parent.parent.children.id',
  parent___parent___children___children = 'parent.parent.children.children',
  parent___parent___internal___content = 'parent.parent.internal.content',
  parent___parent___internal___contentDigest = 'parent.parent.internal.contentDigest',
  parent___parent___internal___description = 'parent.parent.internal.description',
  parent___parent___internal___fieldOwners = 'parent.parent.internal.fieldOwners',
  parent___parent___internal___ignoreType = 'parent.parent.internal.ignoreType',
  parent___parent___internal___mediaType = 'parent.parent.internal.mediaType',
  parent___parent___internal___owner = 'parent.parent.internal.owner',
  parent___parent___internal___type = 'parent.parent.internal.type',
  parent___children = 'parent.children',
  parent___children___id = 'parent.children.id',
  parent___children___parent___id = 'parent.children.parent.id',
  parent___children___parent___children = 'parent.children.parent.children',
  parent___children___children = 'parent.children.children',
  parent___children___children___id = 'parent.children.children.id',
  parent___children___children___children = 'parent.children.children.children',
  parent___children___internal___content = 'parent.children.internal.content',
  parent___children___internal___contentDigest = 'parent.children.internal.contentDigest',
  parent___children___internal___description = 'parent.children.internal.description',
  parent___children___internal___fieldOwners = 'parent.children.internal.fieldOwners',
  parent___children___internal___ignoreType = 'parent.children.internal.ignoreType',
  parent___children___internal___mediaType = 'parent.children.internal.mediaType',
  parent___children___internal___owner = 'parent.children.internal.owner',
  parent___children___internal___type = 'parent.children.internal.type',
  parent___internal___content = 'parent.internal.content',
  parent___internal___contentDigest = 'parent.internal.contentDigest',
  parent___internal___description = 'parent.internal.description',
  parent___internal___fieldOwners = 'parent.internal.fieldOwners',
  parent___internal___ignoreType = 'parent.internal.ignoreType',
  parent___internal___mediaType = 'parent.internal.mediaType',
  parent___internal___owner = 'parent.internal.owner',
  parent___internal___type = 'parent.internal.type',
  children = 'children',
  children___id = 'children.id',
  children___parent___id = 'children.parent.id',
  children___parent___parent___id = 'children.parent.parent.id',
  children___parent___parent___children = 'children.parent.parent.children',
  children___parent___children = 'children.parent.children',
  children___parent___children___id = 'children.parent.children.id',
  children___parent___children___children = 'children.parent.children.children',
  children___parent___internal___content = 'children.parent.internal.content',
  children___parent___internal___contentDigest = 'children.parent.internal.contentDigest',
  children___parent___internal___description = 'children.parent.internal.description',
  children___parent___internal___fieldOwners = 'children.parent.internal.fieldOwners',
  children___parent___internal___ignoreType = 'children.parent.internal.ignoreType',
  children___parent___internal___mediaType = 'children.parent.internal.mediaType',
  children___parent___internal___owner = 'children.parent.internal.owner',
  children___parent___internal___type = 'children.parent.internal.type',
  children___children = 'children.children',
  children___children___id = 'children.children.id',
  children___children___parent___id = 'children.children.parent.id',
  children___children___parent___children = 'children.children.parent.children',
  children___children___children = 'children.children.children',
  children___children___children___id = 'children.children.children.id',
  children___children___children___children = 'children.children.children.children',
  children___children___internal___content = 'children.children.internal.content',
  children___children___internal___contentDigest = 'children.children.internal.contentDigest',
  children___children___internal___description = 'children.children.internal.description',
  children___children___internal___fieldOwners = 'children.children.internal.fieldOwners',
  children___children___internal___ignoreType = 'children.children.internal.ignoreType',
  children___children___internal___mediaType = 'children.children.internal.mediaType',
  children___children___internal___owner = 'children.children.internal.owner',
  children___children___internal___type = 'children.children.internal.type',
  children___internal___content = 'children.internal.content',
  children___internal___contentDigest = 'children.internal.contentDigest',
  children___internal___description = 'children.internal.description',
  children___internal___fieldOwners = 'children.internal.fieldOwners',
  children___internal___ignoreType = 'children.internal.ignoreType',
  children___internal___mediaType = 'children.internal.mediaType',
  children___internal___owner = 'children.internal.owner',
  children___internal___type = 'children.internal.type',
  internal___content = 'internal.content',
  internal___contentDigest = 'internal.contentDigest',
  internal___description = 'internal.description',
  internal___fieldOwners = 'internal.fieldOwners',
  internal___ignoreType = 'internal.ignoreType',
  internal___mediaType = 'internal.mediaType',
  internal___owner = 'internal.owner',
  internal___type = 'internal.type'
}

type DocsPageFilterInput = {
  readonly breadcrumb: Maybe<BreadcrumbSegmentFilterListInput>;
  readonly title: Maybe<StringQueryOperatorInput>;
  readonly shortTitle: Maybe<StringQueryOperatorInput>;
  readonly isOrphan: Maybe<BooleanQueryOperatorInput>;
  readonly noTOC: Maybe<BooleanQueryOperatorInput>;
  readonly noSequenceLinks: Maybe<BooleanQueryOperatorInput>;
  readonly badge: Maybe<StringQueryOperatorInput>;
  readonly originalPath: Maybe<StringQueryOperatorInput>;
  readonly history: Maybe<HistoryFilterInput>;
  readonly sideNav: Maybe<NavigationTreeFilterInput>;
  readonly path: Maybe<StringQueryOperatorInput>;
  readonly preorder: Maybe<IntQueryOperatorInput>;
  readonly lead: Maybe<StringQueryOperatorInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
};

type DocsPageGroupConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<DocsPageEdge>;
  readonly nodes: ReadonlyArray<DocsPage>;
  readonly pageInfo: PageInfo;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
};

type DocsPageSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<DocsPageFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

type File = Node & {
  readonly sourceInstanceName: Scalars['String'];
  readonly absolutePath: Scalars['String'];
  readonly relativePath: Scalars['String'];
  readonly extension: Scalars['String'];
  readonly size: Scalars['Int'];
  readonly prettySize: Scalars['String'];
  readonly modifiedTime: Scalars['Date'];
  readonly accessTime: Scalars['Date'];
  readonly changeTime: Scalars['Date'];
  readonly birthTime: Scalars['Date'];
  readonly root: Scalars['String'];
  readonly dir: Scalars['String'];
  readonly base: Scalars['String'];
  readonly ext: Scalars['String'];
  readonly name: Scalars['String'];
  readonly relativeDirectory: Scalars['String'];
  readonly dev: Scalars['Int'];
  readonly mode: Scalars['Int'];
  readonly nlink: Scalars['Int'];
  readonly uid: Scalars['Int'];
  readonly gid: Scalars['Int'];
  readonly rdev: Scalars['Int'];
  readonly ino: Scalars['Float'];
  readonly atimeMs: Scalars['Float'];
  readonly mtimeMs: Scalars['Float'];
  readonly ctimeMs: Scalars['Float'];
  readonly atime: Scalars['Date'];
  readonly mtime: Scalars['Date'];
  readonly ctime: Scalars['Date'];
  /** @deprecated Use `birthTime` instead */
  readonly birthtime: Maybe<Scalars['Date']>;
  /** @deprecated Use `birthTime` instead */
  readonly birthtimeMs: Maybe<Scalars['Float']>;
  readonly childMdx: Maybe<Mdx>;
  readonly blksize: Maybe<Scalars['Int']>;
  readonly blocks: Maybe<Scalars['Int']>;
  /** Copy file to static directory and return public url to it */
  readonly publicURL: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
};


type File_modifiedTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


type File_accessTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


type File_changeTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


type File_birthTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


type File_atimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


type File_mtimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


type File_ctimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};

type FileConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<FileEdge>;
  readonly nodes: ReadonlyArray<File>;
  readonly pageInfo: PageInfo;
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly group: ReadonlyArray<FileGroupConnection>;
};


type FileConnection_distinctArgs = {
  field: FileFieldsEnum;
};


type FileConnection_groupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: FileFieldsEnum;
};

type FileEdge = {
  readonly next: Maybe<File>;
  readonly node: File;
  readonly previous: Maybe<File>;
};

enum FileFieldsEnum {
  sourceInstanceName = 'sourceInstanceName',
  absolutePath = 'absolutePath',
  relativePath = 'relativePath',
  extension = 'extension',
  size = 'size',
  prettySize = 'prettySize',
  modifiedTime = 'modifiedTime',
  accessTime = 'accessTime',
  changeTime = 'changeTime',
  birthTime = 'birthTime',
  root = 'root',
  dir = 'dir',
  base = 'base',
  ext = 'ext',
  name = 'name',
  relativeDirectory = 'relativeDirectory',
  dev = 'dev',
  mode = 'mode',
  nlink = 'nlink',
  uid = 'uid',
  gid = 'gid',
  rdev = 'rdev',
  ino = 'ino',
  atimeMs = 'atimeMs',
  mtimeMs = 'mtimeMs',
  ctimeMs = 'ctimeMs',
  atime = 'atime',
  mtime = 'mtime',
  ctime = 'ctime',
  birthtime = 'birthtime',
  birthtimeMs = 'birthtimeMs',
  childMdx___rawBody = 'childMdx.rawBody',
  childMdx___fileAbsolutePath = 'childMdx.fileAbsolutePath',
  childMdx___frontmatter___title = 'childMdx.frontmatter.title',
  childMdx___frontmatter___shortTitle = 'childMdx.frontmatter.shortTitle',
  childMdx___frontmatter___overrideBreadcrumb = 'childMdx.frontmatter.overrideBreadcrumb',
  childMdx___frontmatter___overrideNav = 'childMdx.frontmatter.overrideNav',
  childMdx___frontmatter___isRoot = 'childMdx.frontmatter.isRoot',
  childMdx___frontmatter___childrenOrder = 'childMdx.frontmatter.childrenOrder',
  childMdx___frontmatter___noBreadcrumb = 'childMdx.frontmatter.noBreadcrumb',
  childMdx___frontmatter___noTOC = 'childMdx.frontmatter.noTOC',
  childMdx___frontmatter___badge = 'childMdx.frontmatter.badge',
  childMdx___frontmatter___noSequenceLinks = 'childMdx.frontmatter.noSequenceLinks',
  childMdx___body = 'childMdx.body',
  childMdx___excerpt = 'childMdx.excerpt',
  childMdx___headings = 'childMdx.headings',
  childMdx___headings___value = 'childMdx.headings.value',
  childMdx___headings___depth = 'childMdx.headings.depth',
  childMdx___html = 'childMdx.html',
  childMdx___mdxAST = 'childMdx.mdxAST',
  childMdx___tableOfContents = 'childMdx.tableOfContents',
  childMdx___timeToRead = 'childMdx.timeToRead',
  childMdx___wordCount___paragraphs = 'childMdx.wordCount.paragraphs',
  childMdx___wordCount___sentences = 'childMdx.wordCount.sentences',
  childMdx___wordCount___words = 'childMdx.wordCount.words',
  childMdx___childDocsPage___breadcrumb = 'childMdx.childDocsPage.breadcrumb',
  childMdx___childDocsPage___breadcrumb___text = 'childMdx.childDocsPage.breadcrumb.text',
  childMdx___childDocsPage___breadcrumb___path = 'childMdx.childDocsPage.breadcrumb.path',
  childMdx___childDocsPage___title = 'childMdx.childDocsPage.title',
  childMdx___childDocsPage___shortTitle = 'childMdx.childDocsPage.shortTitle',
  childMdx___childDocsPage___isOrphan = 'childMdx.childDocsPage.isOrphan',
  childMdx___childDocsPage___noTOC = 'childMdx.childDocsPage.noTOC',
  childMdx___childDocsPage___noSequenceLinks = 'childMdx.childDocsPage.noSequenceLinks',
  childMdx___childDocsPage___badge = 'childMdx.childDocsPage.badge',
  childMdx___childDocsPage___originalPath = 'childMdx.childDocsPage.originalPath',
  childMdx___childDocsPage___history___lastModified = 'childMdx.childDocsPage.history.lastModified',
  childMdx___childDocsPage___history___authors = 'childMdx.childDocsPage.history.authors',
  childMdx___childDocsPage___sideNav___root = 'childMdx.childDocsPage.sideNav.root',
  childMdx___childDocsPage___sideNav___id = 'childMdx.childDocsPage.sideNav.id',
  childMdx___childDocsPage___sideNav___children = 'childMdx.childDocsPage.sideNav.children',
  childMdx___childDocsPage___path = 'childMdx.childDocsPage.path',
  childMdx___childDocsPage___preorder = 'childMdx.childDocsPage.preorder',
  childMdx___childDocsPage___lead = 'childMdx.childDocsPage.lead',
  childMdx___childDocsPage___id = 'childMdx.childDocsPage.id',
  childMdx___childDocsPage___parent___id = 'childMdx.childDocsPage.parent.id',
  childMdx___childDocsPage___parent___children = 'childMdx.childDocsPage.parent.children',
  childMdx___childDocsPage___children = 'childMdx.childDocsPage.children',
  childMdx___childDocsPage___children___id = 'childMdx.childDocsPage.children.id',
  childMdx___childDocsPage___children___children = 'childMdx.childDocsPage.children.children',
  childMdx___childDocsPage___internal___content = 'childMdx.childDocsPage.internal.content',
  childMdx___childDocsPage___internal___contentDigest = 'childMdx.childDocsPage.internal.contentDigest',
  childMdx___childDocsPage___internal___description = 'childMdx.childDocsPage.internal.description',
  childMdx___childDocsPage___internal___fieldOwners = 'childMdx.childDocsPage.internal.fieldOwners',
  childMdx___childDocsPage___internal___ignoreType = 'childMdx.childDocsPage.internal.ignoreType',
  childMdx___childDocsPage___internal___mediaType = 'childMdx.childDocsPage.internal.mediaType',
  childMdx___childDocsPage___internal___owner = 'childMdx.childDocsPage.internal.owner',
  childMdx___childDocsPage___internal___type = 'childMdx.childDocsPage.internal.type',
  childMdx___id = 'childMdx.id',
  childMdx___parent___id = 'childMdx.parent.id',
  childMdx___parent___parent___id = 'childMdx.parent.parent.id',
  childMdx___parent___parent___children = 'childMdx.parent.parent.children',
  childMdx___parent___children = 'childMdx.parent.children',
  childMdx___parent___children___id = 'childMdx.parent.children.id',
  childMdx___parent___children___children = 'childMdx.parent.children.children',
  childMdx___parent___internal___content = 'childMdx.parent.internal.content',
  childMdx___parent___internal___contentDigest = 'childMdx.parent.internal.contentDigest',
  childMdx___parent___internal___description = 'childMdx.parent.internal.description',
  childMdx___parent___internal___fieldOwners = 'childMdx.parent.internal.fieldOwners',
  childMdx___parent___internal___ignoreType = 'childMdx.parent.internal.ignoreType',
  childMdx___parent___internal___mediaType = 'childMdx.parent.internal.mediaType',
  childMdx___parent___internal___owner = 'childMdx.parent.internal.owner',
  childMdx___parent___internal___type = 'childMdx.parent.internal.type',
  childMdx___children = 'childMdx.children',
  childMdx___children___id = 'childMdx.children.id',
  childMdx___children___parent___id = 'childMdx.children.parent.id',
  childMdx___children___parent___children = 'childMdx.children.parent.children',
  childMdx___children___children = 'childMdx.children.children',
  childMdx___children___children___id = 'childMdx.children.children.id',
  childMdx___children___children___children = 'childMdx.children.children.children',
  childMdx___children___internal___content = 'childMdx.children.internal.content',
  childMdx___children___internal___contentDigest = 'childMdx.children.internal.contentDigest',
  childMdx___children___internal___description = 'childMdx.children.internal.description',
  childMdx___children___internal___fieldOwners = 'childMdx.children.internal.fieldOwners',
  childMdx___children___internal___ignoreType = 'childMdx.children.internal.ignoreType',
  childMdx___children___internal___mediaType = 'childMdx.children.internal.mediaType',
  childMdx___children___internal___owner = 'childMdx.children.internal.owner',
  childMdx___children___internal___type = 'childMdx.children.internal.type',
  childMdx___internal___content = 'childMdx.internal.content',
  childMdx___internal___contentDigest = 'childMdx.internal.contentDigest',
  childMdx___internal___description = 'childMdx.internal.description',
  childMdx___internal___fieldOwners = 'childMdx.internal.fieldOwners',
  childMdx___internal___ignoreType = 'childMdx.internal.ignoreType',
  childMdx___internal___mediaType = 'childMdx.internal.mediaType',
  childMdx___internal___owner = 'childMdx.internal.owner',
  childMdx___internal___type = 'childMdx.internal.type',
  blksize = 'blksize',
  blocks = 'blocks',
  publicURL = 'publicURL',
  id = 'id',
  parent___id = 'parent.id',
  parent___parent___id = 'parent.parent.id',
  parent___parent___parent___id = 'parent.parent.parent.id',
  parent___parent___parent___children = 'parent.parent.parent.children',
  parent___parent___children = 'parent.parent.children',
  parent___parent___children___id = 'parent.parent.children.id',
  parent___parent___children___children = 'parent.parent.children.children',
  parent___parent___internal___content = 'parent.parent.internal.content',
  parent___parent___internal___contentDigest = 'parent.parent.internal.contentDigest',
  parent___parent___internal___description = 'parent.parent.internal.description',
  parent___parent___internal___fieldOwners = 'parent.parent.internal.fieldOwners',
  parent___parent___internal___ignoreType = 'parent.parent.internal.ignoreType',
  parent___parent___internal___mediaType = 'parent.parent.internal.mediaType',
  parent___parent___internal___owner = 'parent.parent.internal.owner',
  parent___parent___internal___type = 'parent.parent.internal.type',
  parent___children = 'parent.children',
  parent___children___id = 'parent.children.id',
  parent___children___parent___id = 'parent.children.parent.id',
  parent___children___parent___children = 'parent.children.parent.children',
  parent___children___children = 'parent.children.children',
  parent___children___children___id = 'parent.children.children.id',
  parent___children___children___children = 'parent.children.children.children',
  parent___children___internal___content = 'parent.children.internal.content',
  parent___children___internal___contentDigest = 'parent.children.internal.contentDigest',
  parent___children___internal___description = 'parent.children.internal.description',
  parent___children___internal___fieldOwners = 'parent.children.internal.fieldOwners',
  parent___children___internal___ignoreType = 'parent.children.internal.ignoreType',
  parent___children___internal___mediaType = 'parent.children.internal.mediaType',
  parent___children___internal___owner = 'parent.children.internal.owner',
  parent___children___internal___type = 'parent.children.internal.type',
  parent___internal___content = 'parent.internal.content',
  parent___internal___contentDigest = 'parent.internal.contentDigest',
  parent___internal___description = 'parent.internal.description',
  parent___internal___fieldOwners = 'parent.internal.fieldOwners',
  parent___internal___ignoreType = 'parent.internal.ignoreType',
  parent___internal___mediaType = 'parent.internal.mediaType',
  parent___internal___owner = 'parent.internal.owner',
  parent___internal___type = 'parent.internal.type',
  children = 'children',
  children___id = 'children.id',
  children___parent___id = 'children.parent.id',
  children___parent___parent___id = 'children.parent.parent.id',
  children___parent___parent___children = 'children.parent.parent.children',
  children___parent___children = 'children.parent.children',
  children___parent___children___id = 'children.parent.children.id',
  children___parent___children___children = 'children.parent.children.children',
  children___parent___internal___content = 'children.parent.internal.content',
  children___parent___internal___contentDigest = 'children.parent.internal.contentDigest',
  children___parent___internal___description = 'children.parent.internal.description',
  children___parent___internal___fieldOwners = 'children.parent.internal.fieldOwners',
  children___parent___internal___ignoreType = 'children.parent.internal.ignoreType',
  children___parent___internal___mediaType = 'children.parent.internal.mediaType',
  children___parent___internal___owner = 'children.parent.internal.owner',
  children___parent___internal___type = 'children.parent.internal.type',
  children___children = 'children.children',
  children___children___id = 'children.children.id',
  children___children___parent___id = 'children.children.parent.id',
  children___children___parent___children = 'children.children.parent.children',
  children___children___children = 'children.children.children',
  children___children___children___id = 'children.children.children.id',
  children___children___children___children = 'children.children.children.children',
  children___children___internal___content = 'children.children.internal.content',
  children___children___internal___contentDigest = 'children.children.internal.contentDigest',
  children___children___internal___description = 'children.children.internal.description',
  children___children___internal___fieldOwners = 'children.children.internal.fieldOwners',
  children___children___internal___ignoreType = 'children.children.internal.ignoreType',
  children___children___internal___mediaType = 'children.children.internal.mediaType',
  children___children___internal___owner = 'children.children.internal.owner',
  children___children___internal___type = 'children.children.internal.type',
  children___internal___content = 'children.internal.content',
  children___internal___contentDigest = 'children.internal.contentDigest',
  children___internal___description = 'children.internal.description',
  children___internal___fieldOwners = 'children.internal.fieldOwners',
  children___internal___ignoreType = 'children.internal.ignoreType',
  children___internal___mediaType = 'children.internal.mediaType',
  children___internal___owner = 'children.internal.owner',
  children___internal___type = 'children.internal.type',
  internal___content = 'internal.content',
  internal___contentDigest = 'internal.contentDigest',
  internal___description = 'internal.description',
  internal___fieldOwners = 'internal.fieldOwners',
  internal___ignoreType = 'internal.ignoreType',
  internal___mediaType = 'internal.mediaType',
  internal___owner = 'internal.owner',
  internal___type = 'internal.type'
}

type FileFilterInput = {
  readonly sourceInstanceName: Maybe<StringQueryOperatorInput>;
  readonly absolutePath: Maybe<StringQueryOperatorInput>;
  readonly relativePath: Maybe<StringQueryOperatorInput>;
  readonly extension: Maybe<StringQueryOperatorInput>;
  readonly size: Maybe<IntQueryOperatorInput>;
  readonly prettySize: Maybe<StringQueryOperatorInput>;
  readonly modifiedTime: Maybe<DateQueryOperatorInput>;
  readonly accessTime: Maybe<DateQueryOperatorInput>;
  readonly changeTime: Maybe<DateQueryOperatorInput>;
  readonly birthTime: Maybe<DateQueryOperatorInput>;
  readonly root: Maybe<StringQueryOperatorInput>;
  readonly dir: Maybe<StringQueryOperatorInput>;
  readonly base: Maybe<StringQueryOperatorInput>;
  readonly ext: Maybe<StringQueryOperatorInput>;
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly relativeDirectory: Maybe<StringQueryOperatorInput>;
  readonly dev: Maybe<IntQueryOperatorInput>;
  readonly mode: Maybe<IntQueryOperatorInput>;
  readonly nlink: Maybe<IntQueryOperatorInput>;
  readonly uid: Maybe<IntQueryOperatorInput>;
  readonly gid: Maybe<IntQueryOperatorInput>;
  readonly rdev: Maybe<IntQueryOperatorInput>;
  readonly ino: Maybe<FloatQueryOperatorInput>;
  readonly atimeMs: Maybe<FloatQueryOperatorInput>;
  readonly mtimeMs: Maybe<FloatQueryOperatorInput>;
  readonly ctimeMs: Maybe<FloatQueryOperatorInput>;
  readonly atime: Maybe<DateQueryOperatorInput>;
  readonly mtime: Maybe<DateQueryOperatorInput>;
  readonly ctime: Maybe<DateQueryOperatorInput>;
  readonly birthtime: Maybe<DateQueryOperatorInput>;
  readonly birthtimeMs: Maybe<FloatQueryOperatorInput>;
  readonly childMdx: Maybe<MdxFilterInput>;
  readonly blksize: Maybe<IntQueryOperatorInput>;
  readonly blocks: Maybe<IntQueryOperatorInput>;
  readonly publicURL: Maybe<StringQueryOperatorInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
};

type FileGroupConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<FileEdge>;
  readonly nodes: ReadonlyArray<File>;
  readonly pageInfo: PageInfo;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
};

type FileSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<FileFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

type FloatQueryOperatorInput = {
  readonly eq: Maybe<Scalars['Float']>;
  readonly ne: Maybe<Scalars['Float']>;
  readonly gt: Maybe<Scalars['Float']>;
  readonly gte: Maybe<Scalars['Float']>;
  readonly lt: Maybe<Scalars['Float']>;
  readonly lte: Maybe<Scalars['Float']>;
  readonly in: Maybe<ReadonlyArray<Maybe<Scalars['Float']>>>;
  readonly nin: Maybe<ReadonlyArray<Maybe<Scalars['Float']>>>;
};

type Frontmatter = {
  readonly title: Scalars['String'];
  readonly shortTitle: Maybe<Scalars['String']>;
  readonly overrideBreadcrumb: Maybe<Scalars['String']>;
  readonly overrideNav: Maybe<Scalars['String']>;
  readonly isRoot: Maybe<Scalars['Boolean']>;
  readonly childrenOrder: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly noBreadcrumb: Maybe<Scalars['Boolean']>;
  readonly noTOC: Maybe<Scalars['Boolean']>;
  readonly badge: Maybe<Scalars['String']>;
  readonly noSequenceLinks: Maybe<Scalars['Boolean']>;
};

type FrontmatterFilterInput = {
  readonly title: Maybe<StringQueryOperatorInput>;
  readonly shortTitle: Maybe<StringQueryOperatorInput>;
  readonly overrideBreadcrumb: Maybe<StringQueryOperatorInput>;
  readonly overrideNav: Maybe<StringQueryOperatorInput>;
  readonly isRoot: Maybe<BooleanQueryOperatorInput>;
  readonly childrenOrder: Maybe<StringQueryOperatorInput>;
  readonly noBreadcrumb: Maybe<BooleanQueryOperatorInput>;
  readonly noTOC: Maybe<BooleanQueryOperatorInput>;
  readonly badge: Maybe<StringQueryOperatorInput>;
  readonly noSequenceLinks: Maybe<BooleanQueryOperatorInput>;
};

/** The query root of GitHub's GraphQL interface. */
type GitHub = {
  /** Look up a code of conduct by its key */
  readonly codeOfConduct: Maybe<GitHub_CodeOfConduct>;
  /** Look up a code of conduct by its key */
  readonly codesOfConduct: Maybe<ReadonlyArray<Maybe<GitHub_CodeOfConduct>>>;
  /** Look up an enterprise by URL slug. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** Look up a pending enterprise administrator invitation by invitee, enterprise and role. */
  readonly enterpriseAdministratorInvitation: Maybe<GitHub_EnterpriseAdministratorInvitation>;
  /** Look up a pending enterprise administrator invitation by invitation token. */
  readonly enterpriseAdministratorInvitationByToken: Maybe<GitHub_EnterpriseAdministratorInvitation>;
  /** Look up an open source license by its key */
  readonly license: Maybe<GitHub_License>;
  /** Return a list of known open source licenses */
  readonly licenses: ReadonlyArray<Maybe<GitHub_License>>;
  /** Get alphabetically sorted list of Marketplace categories */
  readonly marketplaceCategories: ReadonlyArray<GitHub_MarketplaceCategory>;
  /** Look up a Marketplace category by its slug. */
  readonly marketplaceCategory: Maybe<GitHub_MarketplaceCategory>;
  /** Look up a single Marketplace listing */
  readonly marketplaceListing: Maybe<GitHub_MarketplaceListing>;
  /** Look up Marketplace listings */
  readonly marketplaceListings: GitHub_MarketplaceListingConnection;
  /** Return information about the GitHub instance */
  readonly meta: GitHub_GitHubMetadata;
  /** Fetches an object given its ID. */
  readonly node: Maybe<GitHub_Node>;
  /** Lookup nodes by a list of IDs. */
  readonly nodes: ReadonlyArray<Maybe<GitHub_Node>>;
  /** Lookup a organization by login. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The client's rate limit information. */
  readonly rateLimit: Maybe<GitHub_RateLimit>;
  /** Hack to workaround https://github.com/facebook/relay/issues/112 re-exposing the root query object */
  readonly relay: Query;
  /** Lookup a given repository by the owner and repository name. */
  readonly repository: Maybe<GitHub_Repository>;
  /** Lookup a repository owner (ie. either a User or an Organization) by login. */
  readonly repositoryOwner: Maybe<GitHub_RepositoryOwner>;
  /** Lookup resource by a URL. */
  readonly resource: Maybe<GitHub_UniformResourceLocatable>;
  /** Perform a search across resources. */
  readonly search: GitHub_SearchResultItemConnection;
  /** GitHub Security Advisories */
  readonly securityAdvisories: GitHub_SecurityAdvisoryConnection;
  /** Fetch a Security Advisory by its GHSA ID */
  readonly securityAdvisory: Maybe<GitHub_SecurityAdvisory>;
  /** Software Vulnerabilities documented by GitHub Security Advisories */
  readonly securityVulnerabilities: GitHub_SecurityVulnerabilityConnection;
  /**
   * Look up a single Sponsors Listing
   * @deprecated `Query.sponsorsListing` will be removed. Use `Sponsorable.sponsorsListing` instead. Removal on 2020-04-01 UTC.
   */
  readonly sponsorsListing: Maybe<GitHub_SponsorsListing>;
  /** Look up a topic by name. */
  readonly topic: Maybe<GitHub_Topic>;
  /** Lookup a user by login. */
  readonly user: Maybe<GitHub_User>;
  /** The currently authenticated user. */
  readonly viewer: GitHub_User;
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_codeOfConductArgs = {
  key: Scalars['String'];
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_enterpriseArgs = {
  slug: Scalars['String'];
  invitationToken: Maybe<Scalars['String']>;
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_enterpriseAdministratorInvitationArgs = {
  userLogin: Scalars['String'];
  enterpriseSlug: Scalars['String'];
  role: GitHub_EnterpriseAdministratorRole;
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_enterpriseAdministratorInvitationByTokenArgs = {
  invitationToken: Scalars['String'];
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_licenseArgs = {
  key: Scalars['String'];
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_marketplaceCategoriesArgs = {
  includeCategories: Maybe<ReadonlyArray<Scalars['String']>>;
  excludeEmpty: Maybe<Scalars['Boolean']>;
  excludeSubcategories: Maybe<Scalars['Boolean']>;
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_marketplaceCategoryArgs = {
  slug: Scalars['String'];
  useTopicAliases: Maybe<Scalars['Boolean']>;
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_marketplaceListingArgs = {
  slug: Scalars['String'];
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_marketplaceListingsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  categorySlug: Maybe<Scalars['String']>;
  useTopicAliases: Maybe<Scalars['Boolean']>;
  viewerCanAdmin: Maybe<Scalars['Boolean']>;
  adminId: Maybe<Scalars['ID']>;
  organizationId: Maybe<Scalars['ID']>;
  allStates: Maybe<Scalars['Boolean']>;
  slugs: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  primaryCategoryOnly?: Maybe<Scalars['Boolean']>;
  withFreeTrialsOnly?: Maybe<Scalars['Boolean']>;
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_nodeArgs = {
  id: Scalars['ID'];
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_nodesArgs = {
  ids: ReadonlyArray<Scalars['ID']>;
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_organizationArgs = {
  login: Scalars['String'];
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_rateLimitArgs = {
  dryRun?: Maybe<Scalars['Boolean']>;
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_repositoryArgs = {
  owner: Scalars['String'];
  name: Scalars['String'];
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_repositoryOwnerArgs = {
  login: Scalars['String'];
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_resourceArgs = {
  url: Scalars['GitHub_URI'];
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_searchArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  query: Scalars['String'];
  type: GitHub_SearchType;
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_securityAdvisoriesArgs = {
  orderBy?: Maybe<GitHub_SecurityAdvisoryOrder>;
  identifier: Maybe<GitHub_SecurityAdvisoryIdentifierFilter>;
  publishedSince: Maybe<Scalars['GitHub_DateTime']>;
  updatedSince: Maybe<Scalars['GitHub_DateTime']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_securityAdvisoryArgs = {
  ghsaId: Scalars['String'];
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_securityVulnerabilitiesArgs = {
  orderBy?: Maybe<GitHub_SecurityVulnerabilityOrder>;
  ecosystem: Maybe<GitHub_SecurityAdvisoryEcosystem>;
  package: Maybe<Scalars['String']>;
  severities: Maybe<ReadonlyArray<GitHub_SecurityAdvisorySeverity>>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_sponsorsListingArgs = {
  slug: Scalars['String'];
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_topicArgs = {
  name: Scalars['String'];
};


/** The query root of GitHub's GraphQL interface. */
type GitHub_userArgs = {
  login: Scalars['String'];
};

/** Autogenerated input type of AcceptEnterpriseAdministratorInvitation */
type GitHub_AcceptEnterpriseAdministratorInvitationInput = {
  /** The id of the invitation being accepted */
  readonly invitationId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of AcceptEnterpriseAdministratorInvitation */
type GitHub_AcceptEnterpriseAdministratorInvitationPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The invitation that was accepted. */
  readonly invitation: Maybe<GitHub_EnterpriseAdministratorInvitation>;
  /** A message confirming the result of accepting an administrator invitation. */
  readonly message: Maybe<Scalars['String']>;
};

/** Autogenerated input type of AcceptTopicSuggestion */
type GitHub_AcceptTopicSuggestionInput = {
  /** The Node ID of the repository. */
  readonly repositoryId: Scalars['ID'];
  /** The name of the suggested topic. */
  readonly name: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of AcceptTopicSuggestion */
type GitHub_AcceptTopicSuggestionPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The accepted topic. */
  readonly topic: Maybe<GitHub_Topic>;
};

/** The possible capabilities for action executions setting. */
enum GitHub_ActionExecutionCapabilitySetting {
  /** All action executions are disabled. */
  DISABLED = 'DISABLED',
  /** All action executions are enabled. */
  ALL_ACTIONS = 'ALL_ACTIONS',
  /** Only actions defined within the repo are allowed. */
  LOCAL_ACTIONS_ONLY = 'LOCAL_ACTIONS_ONLY',
  /** Organization administrators action execution capabilities. */
  NO_POLICY = 'NO_POLICY'
}

/** Represents an object which can take actions on GitHub. Typically a User or Bot. */
type GitHub_Actor = {
  /** A URL pointing to the actor's public avatar. */
  readonly avatarUrl: Scalars['GitHub_URI'];
  /** The username of the actor. */
  readonly login: Scalars['String'];
  /** The HTTP path for this actor. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this actor. */
  readonly url: Scalars['GitHub_URI'];
};


/** Represents an object which can take actions on GitHub. Typically a User or Bot. */
type GitHub_Actor_avatarUrlArgs = {
  size: Maybe<Scalars['Int']>;
};

/** Location information for an actor */
type GitHub_ActorLocation = {
  /** City */
  readonly city: Maybe<Scalars['String']>;
  /** Country name */
  readonly country: Maybe<Scalars['String']>;
  /** Country code */
  readonly countryCode: Maybe<Scalars['String']>;
  /** Region name */
  readonly region: Maybe<Scalars['String']>;
  /** Region or state code */
  readonly regionCode: Maybe<Scalars['String']>;
};

/** Autogenerated input type of AddAssigneesToAssignable */
type GitHub_AddAssigneesToAssignableInput = {
  /** The id of the assignable object to add assignees to. */
  readonly assignableId: Scalars['ID'];
  /** The id of users to add as assignees. */
  readonly assigneeIds: ReadonlyArray<Scalars['ID']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of AddAssigneesToAssignable */
type GitHub_AddAssigneesToAssignablePayload = {
  /** The item that was assigned. */
  readonly assignable: Maybe<GitHub_Assignable>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated input type of AddComment */
type GitHub_AddCommentInput = {
  /** The Node ID of the subject to modify. */
  readonly subjectId: Scalars['ID'];
  /** The contents of the comment. */
  readonly body: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of AddComment */
type GitHub_AddCommentPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The edge from the subject's comment connection. */
  readonly commentEdge: Maybe<GitHub_IssueCommentEdge>;
  /** The subject */
  readonly subject: Maybe<GitHub_Node>;
  /** The edge from the subject's timeline connection. */
  readonly timelineEdge: Maybe<GitHub_IssueTimelineItemEdge>;
};

/** Represents a 'added_to_project' event on a given issue or pull request. */
type GitHub_AddedToProjectEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  readonly id: Scalars['ID'];
};

/** Autogenerated input type of AddLabelsToLabelable */
type GitHub_AddLabelsToLabelableInput = {
  /** The id of the labelable object to add labels to. */
  readonly labelableId: Scalars['ID'];
  /** The ids of the labels to add. */
  readonly labelIds: ReadonlyArray<Scalars['ID']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of AddLabelsToLabelable */
type GitHub_AddLabelsToLabelablePayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The item that was labeled. */
  readonly labelable: Maybe<GitHub_Labelable>;
};

/** Autogenerated input type of AddProjectCard */
type GitHub_AddProjectCardInput = {
  /** The Node ID of the ProjectColumn. */
  readonly projectColumnId: Scalars['ID'];
  /** The content of the card. Must be a member of the ProjectCardItem union */
  readonly contentId: Maybe<Scalars['ID']>;
  /** The note on the card. */
  readonly note: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of AddProjectCard */
type GitHub_AddProjectCardPayload = {
  /** The edge from the ProjectColumn's card connection. */
  readonly cardEdge: Maybe<GitHub_ProjectCardEdge>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The ProjectColumn */
  readonly projectColumn: Maybe<GitHub_ProjectColumn>;
};

/** Autogenerated input type of AddProjectColumn */
type GitHub_AddProjectColumnInput = {
  /** The Node ID of the project. */
  readonly projectId: Scalars['ID'];
  /** The name of the column. */
  readonly name: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of AddProjectColumn */
type GitHub_AddProjectColumnPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The edge from the project's column connection. */
  readonly columnEdge: Maybe<GitHub_ProjectColumnEdge>;
  /** The project */
  readonly project: Maybe<GitHub_Project>;
};

/** Autogenerated input type of AddPullRequestReviewComment */
type GitHub_AddPullRequestReviewCommentInput = {
  /** The node ID of the pull request reviewing */
  readonly pullRequestId: Maybe<Scalars['ID']>;
  /** The Node ID of the review to modify. */
  readonly pullRequestReviewId: Maybe<Scalars['ID']>;
  /** The SHA of the commit to comment on. */
  readonly commitOID: Maybe<Scalars['GitHub_GitObjectID']>;
  /** The text of the comment. */
  readonly body: Scalars['String'];
  /** The relative path of the file to comment on. */
  readonly path: Maybe<Scalars['String']>;
  /** The line index in the diff to comment on. */
  readonly position: Maybe<Scalars['Int']>;
  /** The comment id to reply to. */
  readonly inReplyTo: Maybe<Scalars['ID']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of AddPullRequestReviewComment */
type GitHub_AddPullRequestReviewCommentPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The newly created comment. */
  readonly comment: Maybe<GitHub_PullRequestReviewComment>;
  /** The edge from the review's comment connection. */
  readonly commentEdge: Maybe<GitHub_PullRequestReviewCommentEdge>;
};

/** Autogenerated input type of AddPullRequestReview */
type GitHub_AddPullRequestReviewInput = {
  /** The Node ID of the pull request to modify. */
  readonly pullRequestId: Scalars['ID'];
  /** The commit OID the review pertains to. */
  readonly commitOID: Maybe<Scalars['GitHub_GitObjectID']>;
  /** The contents of the review body comment. */
  readonly body: Maybe<Scalars['String']>;
  /** The event to perform on the pull request review. */
  readonly event: Maybe<GitHub_PullRequestReviewEvent>;
  /** The review line comments. */
  readonly comments: Maybe<ReadonlyArray<Maybe<GitHub_DraftPullRequestReviewComment>>>;
  /** The review line comment threads. */
  readonly threads: Maybe<ReadonlyArray<Maybe<GitHub_DraftPullRequestReviewThread>>>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of AddPullRequestReview */
type GitHub_AddPullRequestReviewPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The newly created pull request review. */
  readonly pullRequestReview: Maybe<GitHub_PullRequestReview>;
  /** The edge from the pull request's review connection. */
  readonly reviewEdge: Maybe<GitHub_PullRequestReviewEdge>;
};

/** Autogenerated input type of AddPullRequestReviewThread */
type GitHub_AddPullRequestReviewThreadInput = {
  /** Path to the file being commented on. */
  readonly path: Scalars['String'];
  /** Body of the thread's first comment. */
  readonly body: Scalars['String'];
  /** The Node ID of the review to modify. */
  readonly pullRequestReviewId: Scalars['ID'];
  /** The line of the blob to which the thread refers. The end of the line range for multi-line comments. */
  readonly line: Scalars['Int'];
  /** The side of the diff on which the line resides. For multi-line comments, this is the side for the end of the line range. */
  readonly side: Maybe<GitHub_DiffSide>;
  /** The first line of the range to which the comment refers. */
  readonly startLine: Maybe<Scalars['Int']>;
  /** The side of the diff on which the start line resides. */
  readonly startSide: Maybe<GitHub_DiffSide>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of AddPullRequestReviewThread */
type GitHub_AddPullRequestReviewThreadPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The newly created thread. */
  readonly thread: Maybe<GitHub_PullRequestReviewThread>;
};

/** Autogenerated input type of AddReaction */
type GitHub_AddReactionInput = {
  /** The Node ID of the subject to modify. */
  readonly subjectId: Scalars['ID'];
  /** The name of the emoji to react with. */
  readonly content: GitHub_ReactionContent;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of AddReaction */
type GitHub_AddReactionPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The reaction object. */
  readonly reaction: Maybe<GitHub_Reaction>;
  /** The reactable subject. */
  readonly subject: Maybe<GitHub_Reactable>;
};

/** Autogenerated input type of AddStar */
type GitHub_AddStarInput = {
  /** The Starrable ID to star. */
  readonly starrableId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of AddStar */
type GitHub_AddStarPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The starrable. */
  readonly starrable: Maybe<GitHub_Starrable>;
};

/** A GitHub App. */
type GitHub_App = GitHub_Node & {
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** The description of the app. */
  readonly description: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  /** The hex color code, without the leading '#', for the logo background. */
  readonly logoBackgroundColor: Scalars['String'];
  /** A URL pointing to the app's logo. */
  readonly logoUrl: Scalars['GitHub_URI'];
  /** The name of the app. */
  readonly name: Scalars['String'];
  /** A slug based on the name of the app for use in URLs. */
  readonly slug: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The URL to the app's homepage. */
  readonly url: Scalars['GitHub_URI'];
};


/** A GitHub App. */
type GitHub_App_logoUrlArgs = {
  size: Maybe<Scalars['Int']>;
};

/** Autogenerated input type of ArchiveRepository */
type GitHub_ArchiveRepositoryInput = {
  /** The ID of the repository to mark as archived. */
  readonly repositoryId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of ArchiveRepository */
type GitHub_ArchiveRepositoryPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The repository that was marked as archived. */
  readonly repository: Maybe<GitHub_Repository>;
};

/** An object that can have users assigned to it. */
type GitHub_Assignable = {
  /** A list of Users assigned to this object. */
  readonly assignees: GitHub_UserConnection;
};


/** An object that can have users assigned to it. */
type GitHub_Assignable_assigneesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** Represents an 'assigned' event on any assignable object. */
type GitHub_AssignedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the assignable associated with the event. */
  readonly assignable: GitHub_Assignable;
  /** Identifies the user or mannequin that was assigned. */
  readonly assignee: Maybe<GitHub_Assignee>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /**
   * Identifies the user who was assigned.
   * @deprecated Assignees can now be mannequins. Use the `assignee` field instead. Removal on 2020-01-01 UTC.
   */
  readonly user: Maybe<GitHub_User>;
};

/** Types that can be assigned to issues. */
type GitHub_Assignee = GitHub_Bot | GitHub_Mannequin | GitHub_Organization | GitHub_User;

/** An entry in the audit log. */
type GitHub_AuditEntry = {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Types that can initiate an audit log event. */
type GitHub_AuditEntryActor = GitHub_Bot | GitHub_Organization | GitHub_User;

/** Ordering options for Audit Log connections. */
type GitHub_AuditLogOrder = {
  /** The field to order Audit Logs by. */
  readonly field: Maybe<GitHub_AuditLogOrderField>;
  /** The ordering direction. */
  readonly direction: Maybe<GitHub_OrderDirection>;
};

/** Properties by which Audit Log connections can be ordered. */
enum GitHub_AuditLogOrderField {
  /** Order audit log entries by timestamp */
  CREATED_AT = 'CREATED_AT'
}

/** Represents a 'automatic_base_change_failed' event on a given pull request. */
type GitHub_AutomaticBaseChangeFailedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** The new base for this PR */
  readonly newBase: Scalars['String'];
  /** The old base for this PR */
  readonly oldBase: Scalars['String'];
  /** PullRequest referenced by event. */
  readonly pullRequest: GitHub_PullRequest;
};

/** Represents a 'automatic_base_change_succeeded' event on a given pull request. */
type GitHub_AutomaticBaseChangeSucceededEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** The new base for this PR */
  readonly newBase: Scalars['String'];
  /** The old base for this PR */
  readonly oldBase: Scalars['String'];
  /** PullRequest referenced by event. */
  readonly pullRequest: GitHub_PullRequest;
};

/** Represents a 'base_ref_changed' event on a given issue or pull request. */
type GitHub_BaseRefChangedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  readonly id: Scalars['ID'];
};

/** Represents a 'base_ref_force_pushed' event on a given pull request. */
type GitHub_BaseRefForcePushedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the after commit SHA for the 'base_ref_force_pushed' event. */
  readonly afterCommit: Maybe<GitHub_Commit>;
  /** Identifies the before commit SHA for the 'base_ref_force_pushed' event. */
  readonly beforeCommit: Maybe<GitHub_Commit>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** PullRequest referenced by event. */
  readonly pullRequest: GitHub_PullRequest;
  /** Identifies the fully qualified ref name for the 'base_ref_force_pushed' event. */
  readonly ref: Maybe<GitHub_Ref>;
};

/** Represents a Git blame. */
type GitHub_Blame = {
  /** The list of ranges from a Git blame. */
  readonly ranges: ReadonlyArray<GitHub_BlameRange>;
};

/** Represents a range of information from a Git blame. */
type GitHub_BlameRange = {
  /**
   * Identifies the recency of the change, from 1 (new) to 10 (old). This is
   * calculated as a 2-quantile and determines the length of distance between the
   * median age of all the changes in the file and the recency of the current
   * range's change.
   */
  readonly age: Scalars['Int'];
  /** Identifies the line author */
  readonly commit: GitHub_Commit;
  /** The ending line for the range */
  readonly endingLine: Scalars['Int'];
  /** The starting line for the range */
  readonly startingLine: Scalars['Int'];
};

/** Represents a Git blob. */
type GitHub_Blob = GitHub_Node & GitHub_GitObject & {
  /** An abbreviated version of the Git object ID */
  readonly abbreviatedOid: Scalars['String'];
  /** Byte size of Blob object */
  readonly byteSize: Scalars['Int'];
  /** The HTTP path for this Git object */
  readonly commitResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this Git object */
  readonly commitUrl: Scalars['GitHub_URI'];
  readonly id: Scalars['ID'];
  /** Indicates whether the Blob is binary or text. Returns null if unable to determine the encoding. */
  readonly isBinary: Maybe<Scalars['Boolean']>;
  /** Indicates whether the contents is truncated */
  readonly isTruncated: Scalars['Boolean'];
  /** The Git object ID */
  readonly oid: Scalars['GitHub_GitObjectID'];
  /** The Repository the Git object belongs to */
  readonly repository: GitHub_Repository;
  /** UTF8 text data or null if the Blob is binary */
  readonly text: Maybe<Scalars['String']>;
};

/** A special type of user which takes actions on behalf of GitHub Apps. */
type GitHub_Bot = GitHub_Node & GitHub_Actor & GitHub_UniformResourceLocatable & {
  /** A URL pointing to the GitHub App's public avatar. */
  readonly avatarUrl: Scalars['GitHub_URI'];
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  readonly id: Scalars['ID'];
  /** The username of the actor. */
  readonly login: Scalars['String'];
  /** The HTTP path for this bot */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL for this bot */
  readonly url: Scalars['GitHub_URI'];
};


/** A special type of user which takes actions on behalf of GitHub Apps. */
type GitHub_Bot_avatarUrlArgs = {
  size: Maybe<Scalars['Int']>;
};

/** A branch protection rule. */
type GitHub_BranchProtectionRule = GitHub_Node & {
  /** A list of conflicts matching branches protection rule and other branch protection rules */
  readonly branchProtectionRuleConflicts: GitHub_BranchProtectionRuleConflictConnection;
  /** The actor who created this branch protection rule. */
  readonly creator: Maybe<GitHub_Actor>;
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** Will new commits pushed to matching branches dismiss pull request review approvals. */
  readonly dismissesStaleReviews: Scalars['Boolean'];
  readonly id: Scalars['ID'];
  /** Can admins overwrite branch protection. */
  readonly isAdminEnforced: Scalars['Boolean'];
  /** Repository refs that are protected by this rule */
  readonly matchingRefs: GitHub_RefConnection;
  /** Identifies the protection rule pattern. */
  readonly pattern: Scalars['String'];
  /** A list push allowances for this branch protection rule. */
  readonly pushAllowances: GitHub_PushAllowanceConnection;
  /** The repository associated with this branch protection rule. */
  readonly repository: Maybe<GitHub_Repository>;
  /** Number of approving reviews required to update matching branches. */
  readonly requiredApprovingReviewCount: Maybe<Scalars['Int']>;
  /** List of required status check contexts that must pass for commits to be accepted to matching branches. */
  readonly requiredStatusCheckContexts: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  /** Are approving reviews required to update matching branches. */
  readonly requiresApprovingReviews: Scalars['Boolean'];
  /** Are reviews from code owners required to update matching branches. */
  readonly requiresCodeOwnerReviews: Scalars['Boolean'];
  /** Are commits required to be signed. */
  readonly requiresCommitSignatures: Scalars['Boolean'];
  /** Are status checks required to update matching branches. */
  readonly requiresStatusChecks: Scalars['Boolean'];
  /** Are branches required to be up to date before merging. */
  readonly requiresStrictStatusChecks: Scalars['Boolean'];
  /** Is pushing to matching branches restricted. */
  readonly restrictsPushes: Scalars['Boolean'];
  /** Is dismissal of pull request reviews restricted. */
  readonly restrictsReviewDismissals: Scalars['Boolean'];
  /** A list review dismissal allowances for this branch protection rule. */
  readonly reviewDismissalAllowances: GitHub_ReviewDismissalAllowanceConnection;
};


/** A branch protection rule. */
type GitHub_BranchProtectionRule_branchProtectionRuleConflictsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A branch protection rule. */
type GitHub_BranchProtectionRule_matchingRefsArgs = {
  query: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A branch protection rule. */
type GitHub_BranchProtectionRule_pushAllowancesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A branch protection rule. */
type GitHub_BranchProtectionRule_reviewDismissalAllowancesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** A conflict between two branch protection rules. */
type GitHub_BranchProtectionRuleConflict = {
  /** Identifies the branch protection rule. */
  readonly branchProtectionRule: Maybe<GitHub_BranchProtectionRule>;
  /** Identifies the conflicting branch protection rule. */
  readonly conflictingBranchProtectionRule: Maybe<GitHub_BranchProtectionRule>;
  /** Identifies the branch ref that has conflicting rules */
  readonly ref: Maybe<GitHub_Ref>;
};

/** The connection type for BranchProtectionRuleConflict. */
type GitHub_BranchProtectionRuleConflictConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_BranchProtectionRuleConflictEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_BranchProtectionRuleConflict>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_BranchProtectionRuleConflictEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_BranchProtectionRuleConflict>;
};

/** The connection type for BranchProtectionRule. */
type GitHub_BranchProtectionRuleConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_BranchProtectionRuleEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_BranchProtectionRule>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_BranchProtectionRuleEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_BranchProtectionRule>;
};

/** Autogenerated input type of CancelEnterpriseAdminInvitation */
type GitHub_CancelEnterpriseAdminInvitationInput = {
  /** The Node ID of the pending enterprise administrator invitation. */
  readonly invitationId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CancelEnterpriseAdminInvitation */
type GitHub_CancelEnterpriseAdminInvitationPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The invitation that was canceled. */
  readonly invitation: Maybe<GitHub_EnterpriseAdministratorInvitation>;
  /** A message confirming the result of canceling an administrator invitation. */
  readonly message: Maybe<Scalars['String']>;
};

/** Autogenerated input type of ChangeUserStatus */
type GitHub_ChangeUserStatusInput = {
  /** The emoji to represent your status. Can either be a native Unicode emoji or an emoji name with colons, e.g., :grinning:. */
  readonly emoji: Maybe<Scalars['String']>;
  /** A short description of your current status. */
  readonly message: Maybe<Scalars['String']>;
  /**
   * The ID of the organization whose members will be allowed to see the status. If
   * omitted, the status will be publicly visible.
   */
  readonly organizationId: Maybe<Scalars['ID']>;
  /** Whether this status should indicate you are not fully available on GitHub, e.g., you are away. */
  readonly limitedAvailability: Maybe<Scalars['Boolean']>;
  /** If set, the user status will not be shown after this date. */
  readonly expiresAt: Maybe<Scalars['GitHub_DateTime']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of ChangeUserStatus */
type GitHub_ChangeUserStatusPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** Your updated status. */
  readonly status: Maybe<GitHub_UserStatus>;
};

/** Autogenerated input type of ClearLabelsFromLabelable */
type GitHub_ClearLabelsFromLabelableInput = {
  /** The id of the labelable object to clear the labels from. */
  readonly labelableId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of ClearLabelsFromLabelable */
type GitHub_ClearLabelsFromLabelablePayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The item that was unlabeled. */
  readonly labelable: Maybe<GitHub_Labelable>;
};

/** Autogenerated input type of CloneProject */
type GitHub_CloneProjectInput = {
  /** The owner ID to create the project under. */
  readonly targetOwnerId: Scalars['ID'];
  /** The source project to clone. */
  readonly sourceId: Scalars['ID'];
  /** Whether or not to clone the source project's workflows. */
  readonly includeWorkflows: Scalars['Boolean'];
  /** The name of the project. */
  readonly name: Scalars['String'];
  /** The description of the project. */
  readonly body: Maybe<Scalars['String']>;
  /** The visibility of the project, defaults to false (private). */
  readonly public: Maybe<Scalars['Boolean']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CloneProject */
type GitHub_CloneProjectPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The id of the JobStatus for populating cloned fields. */
  readonly jobStatusId: Maybe<Scalars['String']>;
  /** The new cloned project. */
  readonly project: Maybe<GitHub_Project>;
};

/** Autogenerated input type of CloneTemplateRepository */
type GitHub_CloneTemplateRepositoryInput = {
  /** The Node ID of the template repository. */
  readonly repositoryId: Scalars['ID'];
  /** The name of the new repository. */
  readonly name: Scalars['String'];
  /** The ID of the owner for the new repository. */
  readonly ownerId: Scalars['ID'];
  /** A short description of the new repository. */
  readonly description: Maybe<Scalars['String']>;
  /** Indicates the repository's visibility level. */
  readonly visibility: GitHub_RepositoryVisibility;
  /**
   * Whether to copy all branches from the template to the new repository. Defaults
   * to copying only the default branch of the template.
   */
  readonly includeAllBranches: Maybe<Scalars['Boolean']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CloneTemplateRepository */
type GitHub_CloneTemplateRepositoryPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The new repository. */
  readonly repository: Maybe<GitHub_Repository>;
};

/** An object that can be closed */
type GitHub_Closable = {
  /** `true` if the object is closed (definition of closed may depend on type) */
  readonly closed: Scalars['Boolean'];
  /** Identifies the date and time when the object was closed. */
  readonly closedAt: Maybe<Scalars['GitHub_DateTime']>;
};

/** Represents a 'closed' event on any `Closable`. */
type GitHub_ClosedEvent = GitHub_Node & GitHub_UniformResourceLocatable & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Object that was closed. */
  readonly closable: GitHub_Closable;
  /** Object which triggered the creation of this event. */
  readonly closer: Maybe<GitHub_Closer>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** The HTTP path for this closed event. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this closed event. */
  readonly url: Scalars['GitHub_URI'];
};

/** Autogenerated input type of CloseIssue */
type GitHub_CloseIssueInput = {
  /** ID of the issue to be closed. */
  readonly issueId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CloseIssue */
type GitHub_CloseIssuePayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The issue that was closed. */
  readonly issue: Maybe<GitHub_Issue>;
};

/** Autogenerated input type of ClosePullRequest */
type GitHub_ClosePullRequestInput = {
  /** ID of the pull request to be closed. */
  readonly pullRequestId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of ClosePullRequest */
type GitHub_ClosePullRequestPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The pull request that was closed. */
  readonly pullRequest: Maybe<GitHub_PullRequest>;
};

/** The object which triggered a `ClosedEvent`. */
type GitHub_Closer = GitHub_Commit | GitHub_PullRequest;

/** The Code of Conduct for a repository */
type GitHub_CodeOfConduct = GitHub_Node & {
  /** The body of the Code of Conduct */
  readonly body: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  /** The key for the Code of Conduct */
  readonly key: Scalars['String'];
  /** The formal name of the Code of Conduct */
  readonly name: Scalars['String'];
  /** The HTTP path for this Code of Conduct */
  readonly resourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for this Code of Conduct */
  readonly url: Maybe<Scalars['GitHub_URI']>;
};

/** Collaborators affiliation level with a subject. */
enum GitHub_CollaboratorAffiliation {
  /** All outside collaborators of an organization-owned subject. */
  OUTSIDE = 'OUTSIDE',
  /** All collaborators with permissions to an organization-owned subject, regardless of organization membership status. */
  DIRECT = 'DIRECT',
  /** All collaborators the authenticated user can see. */
  ALL = 'ALL'
}

/** Represents a comment. */
type GitHub_Comment = {
  /** The actor who authored the comment. */
  readonly author: Maybe<GitHub_Actor>;
  /** Author's association with the subject of the comment. */
  readonly authorAssociation: GitHub_CommentAuthorAssociation;
  /** The body as Markdown. */
  readonly body: Scalars['String'];
  /** The body rendered to HTML. */
  readonly bodyHTML: Scalars['GitHub_HTML'];
  /** The body rendered to text. */
  readonly bodyText: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Check if this comment was created via an email reply. */
  readonly createdViaEmail: Scalars['Boolean'];
  /** The actor who edited the comment. */
  readonly editor: Maybe<GitHub_Actor>;
  readonly id: Scalars['ID'];
  /** Check if this comment was edited and includes an edit with the creation data */
  readonly includesCreatedEdit: Scalars['Boolean'];
  /** The moment the editor made the last edit */
  readonly lastEditedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** Identifies when the comment was published at. */
  readonly publishedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** A list of edits to this content. */
  readonly userContentEdits: Maybe<GitHub_UserContentEditConnection>;
  /** Did the viewer author this comment. */
  readonly viewerDidAuthor: Scalars['Boolean'];
};


/** Represents a comment. */
type GitHub_Comment_userContentEditsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** A comment author association with repository. */
enum GitHub_CommentAuthorAssociation {
  /** Author is a member of the organization that owns the repository. */
  MEMBER = 'MEMBER',
  /** Author is the owner of the repository. */
  OWNER = 'OWNER',
  /** Author has been invited to collaborate on the repository. */
  COLLABORATOR = 'COLLABORATOR',
  /** Author has previously committed to the repository. */
  CONTRIBUTOR = 'CONTRIBUTOR',
  /** Author has not previously committed to the repository. */
  FIRST_TIME_CONTRIBUTOR = 'FIRST_TIME_CONTRIBUTOR',
  /** Author has not previously committed to GitHub. */
  FIRST_TIMER = 'FIRST_TIMER',
  /** Author has no association with the repository. */
  NONE = 'NONE'
}

/** The possible errors that will prevent a user from updating a comment. */
enum GitHub_CommentCannotUpdateReason {
  /** Unable to create comment because repository is archived. */
  ARCHIVED = 'ARCHIVED',
  /** You must be the author or have write access to this repository to update this comment. */
  INSUFFICIENT_ACCESS = 'INSUFFICIENT_ACCESS',
  /** Unable to create comment because issue is locked. */
  LOCKED = 'LOCKED',
  /** You must be logged in to update this comment. */
  LOGIN_REQUIRED = 'LOGIN_REQUIRED',
  /** Repository is under maintenance. */
  MAINTENANCE = 'MAINTENANCE',
  /** At least one email address must be verified to update this comment. */
  VERIFIED_EMAIL_REQUIRED = 'VERIFIED_EMAIL_REQUIRED',
  /** You cannot update this comment */
  DENIED = 'DENIED'
}

/** Represents a 'comment_deleted' event on a given issue or pull request. */
type GitHub_CommentDeletedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  readonly id: Scalars['ID'];
};

/** Represents a Git commit. */
type GitHub_Commit = GitHub_Node & GitHub_GitObject & GitHub_Subscribable & GitHub_UniformResourceLocatable & {
  /** An abbreviated version of the Git object ID */
  readonly abbreviatedOid: Scalars['String'];
  /** The number of additions in this commit. */
  readonly additions: Scalars['Int'];
  /** The pull requests associated with a commit */
  readonly associatedPullRequests: Maybe<GitHub_PullRequestConnection>;
  /** Authorship details of the commit. */
  readonly author: Maybe<GitHub_GitActor>;
  /** Check if the committer and the author match. */
  readonly authoredByCommitter: Scalars['Boolean'];
  /** The datetime when this commit was authored. */
  readonly authoredDate: Scalars['GitHub_DateTime'];
  /** Fetches `git blame` information. */
  readonly blame: GitHub_Blame;
  /** The number of changed files in this commit. */
  readonly changedFiles: Scalars['Int'];
  /** Comments made on the commit. */
  readonly comments: GitHub_CommitCommentConnection;
  /** The HTTP path for this Git object */
  readonly commitResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this Git object */
  readonly commitUrl: Scalars['GitHub_URI'];
  /** The datetime when this commit was committed. */
  readonly committedDate: Scalars['GitHub_DateTime'];
  /** Check if commited via GitHub web UI. */
  readonly committedViaWeb: Scalars['Boolean'];
  /** Committership details of the commit. */
  readonly committer: Maybe<GitHub_GitActor>;
  /** The number of deletions in this commit. */
  readonly deletions: Scalars['Int'];
  /** The deployments associated with a commit. */
  readonly deployments: Maybe<GitHub_DeploymentConnection>;
  /** The linear commit history starting from (and including) this commit, in the same order as `git log`. */
  readonly history: GitHub_CommitHistoryConnection;
  readonly id: Scalars['ID'];
  /** The Git commit message */
  readonly message: Scalars['String'];
  /** The Git commit message body */
  readonly messageBody: Scalars['String'];
  /** The commit message body rendered to HTML. */
  readonly messageBodyHTML: Scalars['GitHub_HTML'];
  /** The Git commit message headline */
  readonly messageHeadline: Scalars['String'];
  /** The commit message headline rendered to HTML. */
  readonly messageHeadlineHTML: Scalars['GitHub_HTML'];
  /** The Git object ID */
  readonly oid: Scalars['GitHub_GitObjectID'];
  /** The organization this commit was made on behalf of. */
  readonly onBehalfOf: Maybe<GitHub_Organization>;
  /** The parents of a commit. */
  readonly parents: GitHub_CommitConnection;
  /** The datetime when this commit was pushed. */
  readonly pushedDate: Maybe<Scalars['GitHub_DateTime']>;
  /** The Repository this commit belongs to */
  readonly repository: GitHub_Repository;
  /** The HTTP path for this commit */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** Commit signing information, if present. */
  readonly signature: Maybe<GitHub_GitSignature>;
  /** Status information for this commit */
  readonly status: Maybe<GitHub_Status>;
  /** Check and Status rollup information for this commit. */
  readonly statusCheckRollup: Maybe<GitHub_StatusCheckRollup>;
  /** Returns a list of all submodules in this repository as of this Commit parsed from the .gitmodules file. */
  readonly submodules: GitHub_SubmoduleConnection;
  /**
   * Returns a URL to download a tarball archive for a repository.
   * Note: For private repositories, these links are temporary and expire after five minutes.
   */
  readonly tarballUrl: Scalars['GitHub_URI'];
  /** Commit's root Tree */
  readonly tree: GitHub_Tree;
  /** The HTTP path for the tree of this commit */
  readonly treeResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for the tree of this commit */
  readonly treeUrl: Scalars['GitHub_URI'];
  /** The HTTP URL for this commit */
  readonly url: Scalars['GitHub_URI'];
  /** Check if the viewer is able to change their subscription status for the repository. */
  readonly viewerCanSubscribe: Scalars['Boolean'];
  /** Identifies if the viewer is watching, not watching, or ignoring the subscribable entity. */
  readonly viewerSubscription: Maybe<GitHub_SubscriptionState>;
  /**
   * Returns a URL to download a zipball archive for a repository.
   * Note: For private repositories, these links are temporary and expire after five minutes.
   */
  readonly zipballUrl: Scalars['GitHub_URI'];
};


/** Represents a Git commit. */
type GitHub_Commit_associatedPullRequestsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy?: Maybe<GitHub_PullRequestOrder>;
};


/** Represents a Git commit. */
type GitHub_Commit_blameArgs = {
  path: Scalars['String'];
};


/** Represents a Git commit. */
type GitHub_Commit_commentsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** Represents a Git commit. */
type GitHub_Commit_deploymentsArgs = {
  environments: Maybe<ReadonlyArray<Scalars['String']>>;
  orderBy?: Maybe<GitHub_DeploymentOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** Represents a Git commit. */
type GitHub_Commit_historyArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  path: Maybe<Scalars['String']>;
  author: Maybe<GitHub_CommitAuthor>;
  since: Maybe<Scalars['GitHub_GitTimestamp']>;
  until: Maybe<Scalars['GitHub_GitTimestamp']>;
};


/** Represents a Git commit. */
type GitHub_Commit_parentsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** Represents a Git commit. */
type GitHub_Commit_submodulesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** Specifies an author for filtering Git commits. */
type GitHub_CommitAuthor = {
  /**
   * ID of a User to filter by. If non-null, only commits authored by this user
   * will be returned. This field takes precedence over emails.
   */
  readonly id: Maybe<Scalars['ID']>;
  /** Email addresses to filter by. Commits authored by any of the specified email addresses will be returned. */
  readonly emails: Maybe<ReadonlyArray<Scalars['String']>>;
};

/** Represents a comment on a given Commit. */
type GitHub_CommitComment = GitHub_Node & GitHub_Comment & GitHub_Deletable & GitHub_Minimizable & GitHub_Updatable & GitHub_UpdatableComment & GitHub_Reactable & GitHub_RepositoryNode & {
  /** The actor who authored the comment. */
  readonly author: Maybe<GitHub_Actor>;
  /** Author's association with the subject of the comment. */
  readonly authorAssociation: GitHub_CommentAuthorAssociation;
  /** Identifies the comment body. */
  readonly body: Scalars['String'];
  /** The body rendered to HTML. */
  readonly bodyHTML: Scalars['GitHub_HTML'];
  /** The body rendered to text. */
  readonly bodyText: Scalars['String'];
  /** Identifies the commit associated with the comment, if the commit exists. */
  readonly commit: Maybe<GitHub_Commit>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Check if this comment was created via an email reply. */
  readonly createdViaEmail: Scalars['Boolean'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** The actor who edited the comment. */
  readonly editor: Maybe<GitHub_Actor>;
  readonly id: Scalars['ID'];
  /** Check if this comment was edited and includes an edit with the creation data */
  readonly includesCreatedEdit: Scalars['Boolean'];
  /** Returns whether or not a comment has been minimized. */
  readonly isMinimized: Scalars['Boolean'];
  /** The moment the editor made the last edit */
  readonly lastEditedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** Returns why the comment was minimized. */
  readonly minimizedReason: Maybe<Scalars['String']>;
  /** Identifies the file path associated with the comment. */
  readonly path: Maybe<Scalars['String']>;
  /** Identifies the line position associated with the comment. */
  readonly position: Maybe<Scalars['Int']>;
  /** Identifies when the comment was published at. */
  readonly publishedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** A list of reactions grouped by content left on the subject. */
  readonly reactionGroups: Maybe<ReadonlyArray<GitHub_ReactionGroup>>;
  /** A list of Reactions left on the Issue. */
  readonly reactions: GitHub_ReactionConnection;
  /** The repository associated with this node. */
  readonly repository: GitHub_Repository;
  /** The HTTP path permalink for this commit comment. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL permalink for this commit comment. */
  readonly url: Scalars['GitHub_URI'];
  /** A list of edits to this content. */
  readonly userContentEdits: Maybe<GitHub_UserContentEditConnection>;
  /** Check if the current viewer can delete this object. */
  readonly viewerCanDelete: Scalars['Boolean'];
  /** Check if the current viewer can minimize this object. */
  readonly viewerCanMinimize: Scalars['Boolean'];
  /** Can user react to this subject */
  readonly viewerCanReact: Scalars['Boolean'];
  /** Check if the current viewer can update this object. */
  readonly viewerCanUpdate: Scalars['Boolean'];
  /** Reasons why the current viewer can not update this comment. */
  readonly viewerCannotUpdateReasons: ReadonlyArray<GitHub_CommentCannotUpdateReason>;
  /** Did the viewer author this comment. */
  readonly viewerDidAuthor: Scalars['Boolean'];
};


/** Represents a comment on a given Commit. */
type GitHub_CommitComment_reactionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  content: Maybe<GitHub_ReactionContent>;
  orderBy: Maybe<GitHub_ReactionOrder>;
};


/** Represents a comment on a given Commit. */
type GitHub_CommitComment_userContentEditsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The connection type for CommitComment. */
type GitHub_CommitCommentConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_CommitCommentEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_CommitComment>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_CommitCommentEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_CommitComment>;
};

/** A thread of comments on a commit. */
type GitHub_CommitCommentThread = GitHub_Node & GitHub_RepositoryNode & {
  /** The comments that exist in this thread. */
  readonly comments: GitHub_CommitCommentConnection;
  /** The commit the comments were made on. */
  readonly commit: Maybe<GitHub_Commit>;
  readonly id: Scalars['ID'];
  /** The file the comments were made on. */
  readonly path: Maybe<Scalars['String']>;
  /** The position in the diff for the commit that the comment was made on. */
  readonly position: Maybe<Scalars['Int']>;
  /** The repository associated with this node. */
  readonly repository: GitHub_Repository;
};


/** A thread of comments on a commit. */
type GitHub_CommitCommentThread_commentsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The connection type for Commit. */
type GitHub_CommitConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_CommitEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Commit>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** Ordering options for commit contribution connections. */
type GitHub_CommitContributionOrder = {
  /** The field by which to order commit contributions. */
  readonly field: GitHub_CommitContributionOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which commit contribution connections can be ordered. */
enum GitHub_CommitContributionOrderField {
  /** Order commit contributions by when they were made. */
  OCCURRED_AT = 'OCCURRED_AT',
  /** Order commit contributions by how many commits they represent. */
  COMMIT_COUNT = 'COMMIT_COUNT'
}

/** This aggregates commits made by a user within one repository. */
type GitHub_CommitContributionsByRepository = {
  /** The commit contributions, each representing a day. */
  readonly contributions: GitHub_CreatedCommitContributionConnection;
  /** The repository in which the commits were made. */
  readonly repository: GitHub_Repository;
  /** The HTTP path for the user's commits to the repository in this time range. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for the user's commits to the repository in this time range. */
  readonly url: Scalars['GitHub_URI'];
};


/** This aggregates commits made by a user within one repository. */
type GitHub_CommitContributionsByRepository_contributionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy?: Maybe<GitHub_CommitContributionOrder>;
};

/** An edge in a connection. */
type GitHub_CommitEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_Commit>;
};

/** The connection type for Commit. */
type GitHub_CommitHistoryConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_CommitEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Commit>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** Represents a 'connected' event on a given issue or pull request. */
type GitHub_ConnectedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** Reference originated in a different repository. */
  readonly isCrossRepository: Scalars['Boolean'];
  /** Issue or pull request that made the reference. */
  readonly source: GitHub_ReferencedSubject;
  /** Issue or pull request which was connected. */
  readonly subject: GitHub_ReferencedSubject;
};

/** Represents a contribution a user made on GitHub, such as opening an issue. */
type GitHub_Contribution = {
  /**
   * Whether this contribution is associated with a record you do not have access to. For
   * example, your own 'first issue' contribution may have been made on a repository you can no
   * longer access.
   */
  readonly isRestricted: Scalars['Boolean'];
  /** When this contribution was made. */
  readonly occurredAt: Scalars['GitHub_DateTime'];
  /** The HTTP path for this contribution. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this contribution. */
  readonly url: Scalars['GitHub_URI'];
  /** The user who made this contribution. */
  readonly user: GitHub_User;
};

/** A calendar of contributions made on GitHub by a user. */
type GitHub_ContributionCalendar = {
  /** A list of hex color codes used in this calendar. The darker the color, the more contributions it represents. */
  readonly colors: ReadonlyArray<Scalars['String']>;
  /** Determine if the color set was chosen because it's currently Halloween. */
  readonly isHalloween: Scalars['Boolean'];
  /** A list of the months of contributions in this calendar. */
  readonly months: ReadonlyArray<GitHub_ContributionCalendarMonth>;
  /** The count of total contributions in the calendar. */
  readonly totalContributions: Scalars['Int'];
  /** A list of the weeks of contributions in this calendar. */
  readonly weeks: ReadonlyArray<GitHub_ContributionCalendarWeek>;
};

/** Represents a single day of contributions on GitHub by a user. */
type GitHub_ContributionCalendarDay = {
  /** The hex color code that represents how many contributions were made on this day compared to others in the calendar. */
  readonly color: Scalars['String'];
  /** How many contributions were made by the user on this day. */
  readonly contributionCount: Scalars['Int'];
  /** The day this square represents. */
  readonly date: Scalars['GitHub_Date'];
  /** A number representing which day of the week this square represents, e.g., 1 is Monday. */
  readonly weekday: Scalars['Int'];
};

/** A month of contributions in a user's contribution graph. */
type GitHub_ContributionCalendarMonth = {
  /** The date of the first day of this month. */
  readonly firstDay: Scalars['GitHub_Date'];
  /** The name of the month. */
  readonly name: Scalars['String'];
  /** How many weeks started in this month. */
  readonly totalWeeks: Scalars['Int'];
  /** The year the month occurred in. */
  readonly year: Scalars['Int'];
};

/** A week of contributions in a user's contribution graph. */
type GitHub_ContributionCalendarWeek = {
  /** The days of contributions in this week. */
  readonly contributionDays: ReadonlyArray<GitHub_ContributionCalendarDay>;
  /** The date of the earliest square in this week. */
  readonly firstDay: Scalars['GitHub_Date'];
};

/** Ordering options for contribution connections. */
type GitHub_ContributionOrder = {
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** A contributions collection aggregates contributions such as opened issues and commits created by a user. */
type GitHub_ContributionsCollection = {
  /** Commit contributions made by the user, grouped by repository. */
  readonly commitContributionsByRepository: ReadonlyArray<GitHub_CommitContributionsByRepository>;
  /** A calendar of this user's contributions on GitHub. */
  readonly contributionCalendar: GitHub_ContributionCalendar;
  /** The years the user has been making contributions with the most recent year first. */
  readonly contributionYears: ReadonlyArray<Scalars['Int']>;
  /** Determine if this collection's time span ends in the current month. */
  readonly doesEndInCurrentMonth: Scalars['Boolean'];
  /**
   * The date of the first restricted contribution the user made in this time
   * period. Can only be non-null when the user has enabled private contribution counts.
   */
  readonly earliestRestrictedContributionDate: Maybe<Scalars['GitHub_Date']>;
  /** The ending date and time of this collection. */
  readonly endedAt: Scalars['GitHub_DateTime'];
  /**
   * The first issue the user opened on GitHub. This will be null if that issue was
   * opened outside the collection's time range and ignoreTimeRange is false. If
   * the issue is not visible but the user has opted to show private contributions,
   * a RestrictedContribution will be returned.
   */
  readonly firstIssueContribution: Maybe<GitHub_CreatedIssueOrRestrictedContribution>;
  /**
   * The first pull request the user opened on GitHub. This will be null if that
   * pull request was opened outside the collection's time range and
   * ignoreTimeRange is not true. If the pull request is not visible but the user
   * has opted to show private contributions, a RestrictedContribution will be returned.
   */
  readonly firstPullRequestContribution: Maybe<GitHub_CreatedPullRequestOrRestrictedContribution>;
  /**
   * The first repository the user created on GitHub. This will be null if that
   * first repository was created outside the collection's time range and
   * ignoreTimeRange is false. If the repository is not visible, then a
   * RestrictedContribution is returned.
   */
  readonly firstRepositoryContribution: Maybe<GitHub_CreatedRepositoryOrRestrictedContribution>;
  /** Does the user have any more activity in the timeline that occurred prior to the collection's time range? */
  readonly hasActivityInThePast: Scalars['Boolean'];
  /** Determine if there are any contributions in this collection. */
  readonly hasAnyContributions: Scalars['Boolean'];
  /**
   * Determine if the user made any contributions in this time frame whose details
   * are not visible because they were made in a private repository. Can only be
   * true if the user enabled private contribution counts.
   */
  readonly hasAnyRestrictedContributions: Scalars['Boolean'];
  /** Whether or not the collector's time span is all within the same day. */
  readonly isSingleDay: Scalars['Boolean'];
  /** A list of issues the user opened. */
  readonly issueContributions: GitHub_CreatedIssueContributionConnection;
  /** Issue contributions made by the user, grouped by repository. */
  readonly issueContributionsByRepository: ReadonlyArray<GitHub_IssueContributionsByRepository>;
  /**
   * When the user signed up for GitHub. This will be null if that sign up date
   * falls outside the collection's time range and ignoreTimeRange is false.
   */
  readonly joinedGitHubContribution: Maybe<GitHub_JoinedGitHubContribution>;
  /**
   * The date of the most recent restricted contribution the user made in this time
   * period. Can only be non-null when the user has enabled private contribution counts.
   */
  readonly latestRestrictedContributionDate: Maybe<Scalars['GitHub_Date']>;
  /**
   * When this collection's time range does not include any activity from the user, use this
   * to get a different collection from an earlier time range that does have activity.
   */
  readonly mostRecentCollectionWithActivity: Maybe<GitHub_ContributionsCollection>;
  /**
   * Returns a different contributions collection from an earlier time range than this one
   * that does not have any contributions.
   */
  readonly mostRecentCollectionWithoutActivity: Maybe<GitHub_ContributionsCollection>;
  /**
   * The issue the user opened on GitHub that received the most comments in the specified
   * time frame.
   */
  readonly popularIssueContribution: Maybe<GitHub_CreatedIssueContribution>;
  /**
   * The pull request the user opened on GitHub that received the most comments in the
   * specified time frame.
   */
  readonly popularPullRequestContribution: Maybe<GitHub_CreatedPullRequestContribution>;
  /** Pull request contributions made by the user. */
  readonly pullRequestContributions: GitHub_CreatedPullRequestContributionConnection;
  /** Pull request contributions made by the user, grouped by repository. */
  readonly pullRequestContributionsByRepository: ReadonlyArray<GitHub_PullRequestContributionsByRepository>;
  /** Pull request review contributions made by the user. */
  readonly pullRequestReviewContributions: GitHub_CreatedPullRequestReviewContributionConnection;
  /** Pull request review contributions made by the user, grouped by repository. */
  readonly pullRequestReviewContributionsByRepository: ReadonlyArray<GitHub_PullRequestReviewContributionsByRepository>;
  /** A list of repositories owned by the user that the user created in this time range. */
  readonly repositoryContributions: GitHub_CreatedRepositoryContributionConnection;
  /**
   * A count of contributions made by the user that the viewer cannot access. Only
   * non-zero when the user has chosen to share their private contribution counts.
   */
  readonly restrictedContributionsCount: Scalars['Int'];
  /** The beginning date and time of this collection. */
  readonly startedAt: Scalars['GitHub_DateTime'];
  /** How many commits were made by the user in this time span. */
  readonly totalCommitContributions: Scalars['Int'];
  /** How many issues the user opened. */
  readonly totalIssueContributions: Scalars['Int'];
  /** How many pull requests the user opened. */
  readonly totalPullRequestContributions: Scalars['Int'];
  /** How many pull request reviews the user left. */
  readonly totalPullRequestReviewContributions: Scalars['Int'];
  /** How many different repositories the user committed to. */
  readonly totalRepositoriesWithContributedCommits: Scalars['Int'];
  /** How many different repositories the user opened issues in. */
  readonly totalRepositoriesWithContributedIssues: Scalars['Int'];
  /** How many different repositories the user left pull request reviews in. */
  readonly totalRepositoriesWithContributedPullRequestReviews: Scalars['Int'];
  /** How many different repositories the user opened pull requests in. */
  readonly totalRepositoriesWithContributedPullRequests: Scalars['Int'];
  /** How many repositories the user created. */
  readonly totalRepositoryContributions: Scalars['Int'];
  /** The user who made the contributions in this collection. */
  readonly user: GitHub_User;
};


/** A contributions collection aggregates contributions such as opened issues and commits created by a user. */
type GitHub_ContributionsCollection_commitContributionsByRepositoryArgs = {
  maxRepositories?: Maybe<Scalars['Int']>;
};


/** A contributions collection aggregates contributions such as opened issues and commits created by a user. */
type GitHub_ContributionsCollection_issueContributionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  excludeFirst?: Maybe<Scalars['Boolean']>;
  excludePopular?: Maybe<Scalars['Boolean']>;
  orderBy?: Maybe<GitHub_ContributionOrder>;
};


/** A contributions collection aggregates contributions such as opened issues and commits created by a user. */
type GitHub_ContributionsCollection_issueContributionsByRepositoryArgs = {
  maxRepositories?: Maybe<Scalars['Int']>;
  excludeFirst?: Maybe<Scalars['Boolean']>;
  excludePopular?: Maybe<Scalars['Boolean']>;
};


/** A contributions collection aggregates contributions such as opened issues and commits created by a user. */
type GitHub_ContributionsCollection_pullRequestContributionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  excludeFirst?: Maybe<Scalars['Boolean']>;
  excludePopular?: Maybe<Scalars['Boolean']>;
  orderBy?: Maybe<GitHub_ContributionOrder>;
};


/** A contributions collection aggregates contributions such as opened issues and commits created by a user. */
type GitHub_ContributionsCollection_pullRequestContributionsByRepositoryArgs = {
  maxRepositories?: Maybe<Scalars['Int']>;
  excludeFirst?: Maybe<Scalars['Boolean']>;
  excludePopular?: Maybe<Scalars['Boolean']>;
};


/** A contributions collection aggregates contributions such as opened issues and commits created by a user. */
type GitHub_ContributionsCollection_pullRequestReviewContributionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy?: Maybe<GitHub_ContributionOrder>;
};


/** A contributions collection aggregates contributions such as opened issues and commits created by a user. */
type GitHub_ContributionsCollection_pullRequestReviewContributionsByRepositoryArgs = {
  maxRepositories?: Maybe<Scalars['Int']>;
};


/** A contributions collection aggregates contributions such as opened issues and commits created by a user. */
type GitHub_ContributionsCollection_repositoryContributionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  excludeFirst?: Maybe<Scalars['Boolean']>;
  orderBy?: Maybe<GitHub_ContributionOrder>;
};


/** A contributions collection aggregates contributions such as opened issues and commits created by a user. */
type GitHub_ContributionsCollection_totalIssueContributionsArgs = {
  excludeFirst?: Maybe<Scalars['Boolean']>;
  excludePopular?: Maybe<Scalars['Boolean']>;
};


/** A contributions collection aggregates contributions such as opened issues and commits created by a user. */
type GitHub_ContributionsCollection_totalPullRequestContributionsArgs = {
  excludeFirst?: Maybe<Scalars['Boolean']>;
  excludePopular?: Maybe<Scalars['Boolean']>;
};


/** A contributions collection aggregates contributions such as opened issues and commits created by a user. */
type GitHub_ContributionsCollection_totalRepositoriesWithContributedIssuesArgs = {
  excludeFirst?: Maybe<Scalars['Boolean']>;
  excludePopular?: Maybe<Scalars['Boolean']>;
};


/** A contributions collection aggregates contributions such as opened issues and commits created by a user. */
type GitHub_ContributionsCollection_totalRepositoriesWithContributedPullRequestsArgs = {
  excludeFirst?: Maybe<Scalars['Boolean']>;
  excludePopular?: Maybe<Scalars['Boolean']>;
};


/** A contributions collection aggregates contributions such as opened issues and commits created by a user. */
type GitHub_ContributionsCollection_totalRepositoryContributionsArgs = {
  excludeFirst?: Maybe<Scalars['Boolean']>;
};

/** Represents a 'converted_note_to_issue' event on a given issue or pull request. */
type GitHub_ConvertedNoteToIssueEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  readonly id: Scalars['ID'];
};

/** Autogenerated input type of ConvertProjectCardNoteToIssue */
type GitHub_ConvertProjectCardNoteToIssueInput = {
  /** The ProjectCard ID to convert. */
  readonly projectCardId: Scalars['ID'];
  /** The ID of the repository to create the issue in. */
  readonly repositoryId: Scalars['ID'];
  /** The title of the newly created issue. Defaults to the card's note text. */
  readonly title: Maybe<Scalars['String']>;
  /** The body of the newly created issue. */
  readonly body: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of ConvertProjectCardNoteToIssue */
type GitHub_ConvertProjectCardNoteToIssuePayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The updated ProjectCard. */
  readonly projectCard: Maybe<GitHub_ProjectCard>;
};

/** Represents a 'convert_to_draft' event on a given pull request. */
type GitHub_ConvertToDraftEvent = GitHub_Node & GitHub_UniformResourceLocatable & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** PullRequest referenced by event. */
  readonly pullRequest: GitHub_PullRequest;
  /** The HTTP path for this convert to draft event. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this convert to draft event. */
  readonly url: Scalars['GitHub_URI'];
};

/** Autogenerated input type of CreateBranchProtectionRule */
type GitHub_CreateBranchProtectionRuleInput = {
  /** The global relay id of the repository in which a new branch protection rule should be created in. */
  readonly repositoryId: Scalars['ID'];
  /** The glob-like pattern used to determine matching branches. */
  readonly pattern: Scalars['String'];
  /** Are approving reviews required to update matching branches. */
  readonly requiresApprovingReviews: Maybe<Scalars['Boolean']>;
  /** Number of approving reviews required to update matching branches. */
  readonly requiredApprovingReviewCount: Maybe<Scalars['Int']>;
  /** Are commits required to be signed. */
  readonly requiresCommitSignatures: Maybe<Scalars['Boolean']>;
  /** Can admins overwrite branch protection. */
  readonly isAdminEnforced: Maybe<Scalars['Boolean']>;
  /** Are status checks required to update matching branches. */
  readonly requiresStatusChecks: Maybe<Scalars['Boolean']>;
  /** Are branches required to be up to date before merging. */
  readonly requiresStrictStatusChecks: Maybe<Scalars['Boolean']>;
  /** Are reviews from code owners required to update matching branches. */
  readonly requiresCodeOwnerReviews: Maybe<Scalars['Boolean']>;
  /** Will new commits pushed to matching branches dismiss pull request review approvals. */
  readonly dismissesStaleReviews: Maybe<Scalars['Boolean']>;
  /** Is dismissal of pull request reviews restricted. */
  readonly restrictsReviewDismissals: Maybe<Scalars['Boolean']>;
  /** A list of User or Team IDs allowed to dismiss reviews on pull requests targeting matching branches. */
  readonly reviewDismissalActorIds: Maybe<ReadonlyArray<Scalars['ID']>>;
  /** Is pushing to matching branches restricted. */
  readonly restrictsPushes: Maybe<Scalars['Boolean']>;
  /** A list of User, Team or App IDs allowed to push to matching branches. */
  readonly pushActorIds: Maybe<ReadonlyArray<Scalars['ID']>>;
  /** List of required status check contexts that must pass for commits to be accepted to matching branches. */
  readonly requiredStatusCheckContexts: Maybe<ReadonlyArray<Scalars['String']>>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateBranchProtectionRule */
type GitHub_CreateBranchProtectionRulePayload = {
  /** The newly created BranchProtectionRule. */
  readonly branchProtectionRule: Maybe<GitHub_BranchProtectionRule>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Represents the contribution a user made by committing to a repository. */
type GitHub_CreatedCommitContribution = GitHub_Contribution & {
  /** How many commits were made on this day to this repository by the user. */
  readonly commitCount: Scalars['Int'];
  /**
   * Whether this contribution is associated with a record you do not have access to. For
   * example, your own 'first issue' contribution may have been made on a repository you can no
   * longer access.
   */
  readonly isRestricted: Scalars['Boolean'];
  /** When this contribution was made. */
  readonly occurredAt: Scalars['GitHub_DateTime'];
  /** The repository the user made a commit in. */
  readonly repository: GitHub_Repository;
  /** The HTTP path for this contribution. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this contribution. */
  readonly url: Scalars['GitHub_URI'];
  /** The user who made this contribution. */
  readonly user: GitHub_User;
};

/** The connection type for CreatedCommitContribution. */
type GitHub_CreatedCommitContributionConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_CreatedCommitContributionEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_CreatedCommitContribution>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of commits across days and repositories in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_CreatedCommitContributionEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_CreatedCommitContribution>;
};

/** Represents the contribution a user made on GitHub by opening an issue. */
type GitHub_CreatedIssueContribution = GitHub_Contribution & {
  /**
   * Whether this contribution is associated with a record you do not have access to. For
   * example, your own 'first issue' contribution may have been made on a repository you can no
   * longer access.
   */
  readonly isRestricted: Scalars['Boolean'];
  /** The issue that was opened. */
  readonly issue: GitHub_Issue;
  /** When this contribution was made. */
  readonly occurredAt: Scalars['GitHub_DateTime'];
  /** The HTTP path for this contribution. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this contribution. */
  readonly url: Scalars['GitHub_URI'];
  /** The user who made this contribution. */
  readonly user: GitHub_User;
};

/** The connection type for CreatedIssueContribution. */
type GitHub_CreatedIssueContributionConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_CreatedIssueContributionEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_CreatedIssueContribution>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_CreatedIssueContributionEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_CreatedIssueContribution>;
};

/** Represents either a issue the viewer can access or a restricted contribution. */
type GitHub_CreatedIssueOrRestrictedContribution = GitHub_CreatedIssueContribution | GitHub_RestrictedContribution;

/** Represents the contribution a user made on GitHub by opening a pull request. */
type GitHub_CreatedPullRequestContribution = GitHub_Contribution & {
  /**
   * Whether this contribution is associated with a record you do not have access to. For
   * example, your own 'first issue' contribution may have been made on a repository you can no
   * longer access.
   */
  readonly isRestricted: Scalars['Boolean'];
  /** When this contribution was made. */
  readonly occurredAt: Scalars['GitHub_DateTime'];
  /** The pull request that was opened. */
  readonly pullRequest: GitHub_PullRequest;
  /** The HTTP path for this contribution. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this contribution. */
  readonly url: Scalars['GitHub_URI'];
  /** The user who made this contribution. */
  readonly user: GitHub_User;
};

/** The connection type for CreatedPullRequestContribution. */
type GitHub_CreatedPullRequestContributionConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_CreatedPullRequestContributionEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_CreatedPullRequestContribution>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_CreatedPullRequestContributionEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_CreatedPullRequestContribution>;
};

/** Represents either a pull request the viewer can access or a restricted contribution. */
type GitHub_CreatedPullRequestOrRestrictedContribution = GitHub_CreatedPullRequestContribution | GitHub_RestrictedContribution;

/** Represents the contribution a user made by leaving a review on a pull request. */
type GitHub_CreatedPullRequestReviewContribution = GitHub_Contribution & {
  /**
   * Whether this contribution is associated with a record you do not have access to. For
   * example, your own 'first issue' contribution may have been made on a repository you can no
   * longer access.
   */
  readonly isRestricted: Scalars['Boolean'];
  /** When this contribution was made. */
  readonly occurredAt: Scalars['GitHub_DateTime'];
  /** The pull request the user reviewed. */
  readonly pullRequest: GitHub_PullRequest;
  /** The review the user left on the pull request. */
  readonly pullRequestReview: GitHub_PullRequestReview;
  /** The repository containing the pull request that the user reviewed. */
  readonly repository: GitHub_Repository;
  /** The HTTP path for this contribution. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this contribution. */
  readonly url: Scalars['GitHub_URI'];
  /** The user who made this contribution. */
  readonly user: GitHub_User;
};

/** The connection type for CreatedPullRequestReviewContribution. */
type GitHub_CreatedPullRequestReviewContributionConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_CreatedPullRequestReviewContributionEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_CreatedPullRequestReviewContribution>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_CreatedPullRequestReviewContributionEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_CreatedPullRequestReviewContribution>;
};

/** Represents the contribution a user made on GitHub by creating a repository. */
type GitHub_CreatedRepositoryContribution = GitHub_Contribution & {
  /**
   * Whether this contribution is associated with a record you do not have access to. For
   * example, your own 'first issue' contribution may have been made on a repository you can no
   * longer access.
   */
  readonly isRestricted: Scalars['Boolean'];
  /** When this contribution was made. */
  readonly occurredAt: Scalars['GitHub_DateTime'];
  /** The repository that was created. */
  readonly repository: GitHub_Repository;
  /** The HTTP path for this contribution. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this contribution. */
  readonly url: Scalars['GitHub_URI'];
  /** The user who made this contribution. */
  readonly user: GitHub_User;
};

/** The connection type for CreatedRepositoryContribution. */
type GitHub_CreatedRepositoryContributionConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_CreatedRepositoryContributionEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_CreatedRepositoryContribution>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_CreatedRepositoryContributionEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_CreatedRepositoryContribution>;
};

/** Represents either a repository the viewer can access or a restricted contribution. */
type GitHub_CreatedRepositoryOrRestrictedContribution = GitHub_CreatedRepositoryContribution | GitHub_RestrictedContribution;

/** Autogenerated input type of CreateEnterpriseOrganization */
type GitHub_CreateEnterpriseOrganizationInput = {
  /** The ID of the enterprise owning the new organization. */
  readonly enterpriseId: Scalars['ID'];
  /** The login of the new organization. */
  readonly login: Scalars['String'];
  /** The profile name of the new organization. */
  readonly profileName: Scalars['String'];
  /** The email used for sending billing receipts. */
  readonly billingEmail: Scalars['String'];
  /** The logins for the administrators of the new organization. */
  readonly adminLogins: ReadonlyArray<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateEnterpriseOrganization */
type GitHub_CreateEnterpriseOrganizationPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The enterprise that owns the created organization. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** The organization that was created. */
  readonly organization: Maybe<GitHub_Organization>;
};

/** Autogenerated input type of CreateIpAllowListEntry */
type GitHub_CreateIpAllowListEntryInput = {
  /** The ID of the owner for which to create the new IP allow list entry. */
  readonly ownerId: Scalars['ID'];
  /** An IP address or range of addresses in CIDR notation. */
  readonly allowListValue: Scalars['String'];
  /** An optional name for the IP allow list entry. */
  readonly name: Maybe<Scalars['String']>;
  /** Whether the IP allow list entry is active when an IP allow list is enabled. */
  readonly isActive: Scalars['Boolean'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateIpAllowListEntry */
type GitHub_CreateIpAllowListEntryPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The IP allow list entry that was created. */
  readonly ipAllowListEntry: Maybe<GitHub_IpAllowListEntry>;
};

/** Autogenerated input type of CreateIssue */
type GitHub_CreateIssueInput = {
  /** The Node ID of the repository. */
  readonly repositoryId: Scalars['ID'];
  /** The title for the issue. */
  readonly title: Scalars['String'];
  /** The body for the issue description. */
  readonly body: Maybe<Scalars['String']>;
  /** The Node ID for the user assignee for this issue. */
  readonly assigneeIds: Maybe<ReadonlyArray<Scalars['ID']>>;
  /** The Node ID of the milestone for this issue. */
  readonly milestoneId: Maybe<Scalars['ID']>;
  /** An array of Node IDs of labels for this issue. */
  readonly labelIds: Maybe<ReadonlyArray<Scalars['ID']>>;
  /** An array of Node IDs for projects associated with this issue. */
  readonly projectIds: Maybe<ReadonlyArray<Scalars['ID']>>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateIssue */
type GitHub_CreateIssuePayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The new issue. */
  readonly issue: Maybe<GitHub_Issue>;
};

/** Autogenerated input type of CreateProject */
type GitHub_CreateProjectInput = {
  /** The owner ID to create the project under. */
  readonly ownerId: Scalars['ID'];
  /** The name of project. */
  readonly name: Scalars['String'];
  /** The description of project. */
  readonly body: Maybe<Scalars['String']>;
  /** The name of the GitHub-provided template. */
  readonly template: Maybe<GitHub_ProjectTemplate>;
  /** A list of repository IDs to create as linked repositories for the project */
  readonly repositoryIds: Maybe<ReadonlyArray<Scalars['ID']>>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateProject */
type GitHub_CreateProjectPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The new project. */
  readonly project: Maybe<GitHub_Project>;
};

/** Autogenerated input type of CreatePullRequest */
type GitHub_CreatePullRequestInput = {
  /** The Node ID of the repository. */
  readonly repositoryId: Scalars['ID'];
  /**
   * The name of the branch you want your changes pulled into. This should be an existing branch
   * on the current repository. You cannot update the base branch on a pull request to point
   * to another repository.
   */
  readonly baseRefName: Scalars['String'];
  /**
   * The name of the branch where your changes are implemented. For cross-repository pull requests
   * in the same network, namespace `head_ref_name` with a user like this: `username:branch`.
   */
  readonly headRefName: Scalars['String'];
  /** The title of the pull request. */
  readonly title: Scalars['String'];
  /** The contents of the pull request. */
  readonly body: Maybe<Scalars['String']>;
  /** Indicates whether maintainers can modify the pull request. */
  readonly maintainerCanModify: Maybe<Scalars['Boolean']>;
  /** Indicates whether this pull request should be a draft. */
  readonly draft: Maybe<Scalars['Boolean']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreatePullRequest */
type GitHub_CreatePullRequestPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The new pull request. */
  readonly pullRequest: Maybe<GitHub_PullRequest>;
};

/** Autogenerated input type of CreateRef */
type GitHub_CreateRefInput = {
  /** The Node ID of the Repository to create the Ref in. */
  readonly repositoryId: Scalars['ID'];
  /** The fully qualified name of the new Ref (ie: `refs/heads/my_new_branch`). */
  readonly name: Scalars['String'];
  /** The GitObjectID that the new Ref shall target. Must point to a commit. */
  readonly oid: Scalars['GitHub_GitObjectID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateRef */
type GitHub_CreateRefPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The newly created ref. */
  readonly ref: Maybe<GitHub_Ref>;
};

/** Autogenerated input type of CreateRepository */
type GitHub_CreateRepositoryInput = {
  /** The name of the new repository. */
  readonly name: Scalars['String'];
  /** The ID of the owner for the new repository. */
  readonly ownerId: Maybe<Scalars['ID']>;
  /** A short description of the new repository. */
  readonly description: Maybe<Scalars['String']>;
  /** Indicates the repository's visibility level. */
  readonly visibility: GitHub_RepositoryVisibility;
  /**
   * Whether this repository should be marked as a template such that anyone who
   * can access it can create new repositories with the same files and directory structure.
   */
  readonly template: Maybe<Scalars['Boolean']>;
  /** The URL for a web page about this repository. */
  readonly homepageUrl: Maybe<Scalars['GitHub_URI']>;
  /** Indicates if the repository should have the wiki feature enabled. */
  readonly hasWikiEnabled: Maybe<Scalars['Boolean']>;
  /** Indicates if the repository should have the issues feature enabled. */
  readonly hasIssuesEnabled: Maybe<Scalars['Boolean']>;
  /**
   * When an organization is specified as the owner, this ID identifies the team
   * that should be granted access to the new repository.
   */
  readonly teamId: Maybe<Scalars['ID']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateRepository */
type GitHub_CreateRepositoryPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The new repository. */
  readonly repository: Maybe<GitHub_Repository>;
};

/** Autogenerated input type of CreateTeamDiscussionComment */
type GitHub_CreateTeamDiscussionCommentInput = {
  /** The ID of the discussion to which the comment belongs. */
  readonly discussionId: Scalars['ID'];
  /** The content of the comment. */
  readonly body: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateTeamDiscussionComment */
type GitHub_CreateTeamDiscussionCommentPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The new comment. */
  readonly teamDiscussionComment: Maybe<GitHub_TeamDiscussionComment>;
};

/** Autogenerated input type of CreateTeamDiscussion */
type GitHub_CreateTeamDiscussionInput = {
  /** The ID of the team to which the discussion belongs. */
  readonly teamId: Scalars['ID'];
  /** The title of the discussion. */
  readonly title: Scalars['String'];
  /** The content of the discussion. */
  readonly body: Scalars['String'];
  /**
   * If true, restricts the visiblity of this discussion to team members and
   * organization admins. If false or not specified, allows any organization member
   * to view this discussion.
   */
  readonly private: Maybe<Scalars['Boolean']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateTeamDiscussion */
type GitHub_CreateTeamDiscussionPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The new discussion. */
  readonly teamDiscussion: Maybe<GitHub_TeamDiscussion>;
};

/** Represents a mention made by one issue or pull request to another. */
type GitHub_CrossReferencedEvent = GitHub_Node & GitHub_UniformResourceLocatable & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** Reference originated in a different repository. */
  readonly isCrossRepository: Scalars['Boolean'];
  /** Identifies when the reference was made. */
  readonly referencedAt: Scalars['GitHub_DateTime'];
  /** The HTTP path for this pull request. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** Issue or pull request that made the reference. */
  readonly source: GitHub_ReferencedSubject;
  /** Issue or pull request to which the reference was made. */
  readonly target: GitHub_ReferencedSubject;
  /** The HTTP URL for this pull request. */
  readonly url: Scalars['GitHub_URI'];
  /** Checks if the target will be closed when the source is merged. */
  readonly willCloseTarget: Scalars['Boolean'];
};



/** Autogenerated input type of DeclineTopicSuggestion */
type GitHub_DeclineTopicSuggestionInput = {
  /** The Node ID of the repository. */
  readonly repositoryId: Scalars['ID'];
  /** The name of the suggested topic. */
  readonly name: Scalars['String'];
  /** The reason why the suggested topic is declined. */
  readonly reason: GitHub_TopicSuggestionDeclineReason;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeclineTopicSuggestion */
type GitHub_DeclineTopicSuggestionPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The declined topic. */
  readonly topic: Maybe<GitHub_Topic>;
};

/** The possible default permissions for repositories. */
enum GitHub_DefaultRepositoryPermissionField {
  /** No access */
  NONE = 'NONE',
  /** Can read repos by default */
  READ = 'READ',
  /** Can read and write repos by default */
  WRITE = 'WRITE',
  /** Can read, write, and administrate repos by default */
  ADMIN = 'ADMIN'
}

/** Entities that can be deleted. */
type GitHub_Deletable = {
  /** Check if the current viewer can delete this object. */
  readonly viewerCanDelete: Scalars['Boolean'];
};

/** Autogenerated input type of DeleteBranchProtectionRule */
type GitHub_DeleteBranchProtectionRuleInput = {
  /** The global relay id of the branch protection rule to be deleted. */
  readonly branchProtectionRuleId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteBranchProtectionRule */
type GitHub_DeleteBranchProtectionRulePayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated input type of DeleteDeployment */
type GitHub_DeleteDeploymentInput = {
  /** The Node ID of the deployment to be deleted. */
  readonly id: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteDeployment */
type GitHub_DeleteDeploymentPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated input type of DeleteIpAllowListEntry */
type GitHub_DeleteIpAllowListEntryInput = {
  /** The ID of the IP allow list entry to delete. */
  readonly ipAllowListEntryId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteIpAllowListEntry */
type GitHub_DeleteIpAllowListEntryPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The IP allow list entry that was deleted. */
  readonly ipAllowListEntry: Maybe<GitHub_IpAllowListEntry>;
};

/** Autogenerated input type of DeleteIssueComment */
type GitHub_DeleteIssueCommentInput = {
  /** The ID of the comment to delete. */
  readonly id: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteIssueComment */
type GitHub_DeleteIssueCommentPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated input type of DeleteIssue */
type GitHub_DeleteIssueInput = {
  /** The ID of the issue to delete. */
  readonly issueId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteIssue */
type GitHub_DeleteIssuePayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The repository the issue belonged to */
  readonly repository: Maybe<GitHub_Repository>;
};

/** Autogenerated input type of DeleteProjectCard */
type GitHub_DeleteProjectCardInput = {
  /** The id of the card to delete. */
  readonly cardId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteProjectCard */
type GitHub_DeleteProjectCardPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The column the deleted card was in. */
  readonly column: Maybe<GitHub_ProjectColumn>;
  /** The deleted card ID. */
  readonly deletedCardId: Maybe<Scalars['ID']>;
};

/** Autogenerated input type of DeleteProjectColumn */
type GitHub_DeleteProjectColumnInput = {
  /** The id of the column to delete. */
  readonly columnId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteProjectColumn */
type GitHub_DeleteProjectColumnPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The deleted column ID. */
  readonly deletedColumnId: Maybe<Scalars['ID']>;
  /** The project the deleted column was in. */
  readonly project: Maybe<GitHub_Project>;
};

/** Autogenerated input type of DeleteProject */
type GitHub_DeleteProjectInput = {
  /** The Project ID to update. */
  readonly projectId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteProject */
type GitHub_DeleteProjectPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The repository or organization the project was removed from. */
  readonly owner: Maybe<GitHub_ProjectOwner>;
};

/** Autogenerated input type of DeletePullRequestReviewComment */
type GitHub_DeletePullRequestReviewCommentInput = {
  /** The ID of the comment to delete. */
  readonly id: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeletePullRequestReviewComment */
type GitHub_DeletePullRequestReviewCommentPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The pull request review the deleted comment belonged to. */
  readonly pullRequestReview: Maybe<GitHub_PullRequestReview>;
};

/** Autogenerated input type of DeletePullRequestReview */
type GitHub_DeletePullRequestReviewInput = {
  /** The Node ID of the pull request review to delete. */
  readonly pullRequestReviewId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeletePullRequestReview */
type GitHub_DeletePullRequestReviewPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The deleted pull request review. */
  readonly pullRequestReview: Maybe<GitHub_PullRequestReview>;
};

/** Autogenerated input type of DeleteRef */
type GitHub_DeleteRefInput = {
  /** The Node ID of the Ref to be deleted. */
  readonly refId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteRef */
type GitHub_DeleteRefPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated input type of DeleteTeamDiscussionComment */
type GitHub_DeleteTeamDiscussionCommentInput = {
  /** The ID of the comment to delete. */
  readonly id: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteTeamDiscussionComment */
type GitHub_DeleteTeamDiscussionCommentPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated input type of DeleteTeamDiscussion */
type GitHub_DeleteTeamDiscussionInput = {
  /** The discussion ID to delete. */
  readonly id: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteTeamDiscussion */
type GitHub_DeleteTeamDiscussionPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Represents a 'demilestoned' event on a given issue or pull request. */
type GitHub_DemilestonedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** Identifies the milestone title associated with the 'demilestoned' event. */
  readonly milestoneTitle: Scalars['String'];
  /** Object referenced by event. */
  readonly subject: GitHub_MilestoneItem;
};

/** Represents a 'deployed' event on a given pull request. */
type GitHub_DeployedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** The deployment associated with the 'deployed' event. */
  readonly deployment: GitHub_Deployment;
  readonly id: Scalars['ID'];
  /** PullRequest referenced by event. */
  readonly pullRequest: GitHub_PullRequest;
  /** The ref associated with the 'deployed' event. */
  readonly ref: Maybe<GitHub_Ref>;
};

/** A repository deploy key. */
type GitHub_DeployKey = GitHub_Node & {
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** The deploy key. */
  readonly key: Scalars['String'];
  /** Whether or not the deploy key is read only. */
  readonly readOnly: Scalars['Boolean'];
  /** The deploy key title. */
  readonly title: Scalars['String'];
  /** Whether or not the deploy key has been verified. */
  readonly verified: Scalars['Boolean'];
};

/** The connection type for DeployKey. */
type GitHub_DeployKeyConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_DeployKeyEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_DeployKey>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_DeployKeyEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_DeployKey>;
};

/** Represents triggered deployment instance. */
type GitHub_Deployment = GitHub_Node & {
  /** Identifies the commit sha of the deployment. */
  readonly commit: Maybe<GitHub_Commit>;
  /** Identifies the oid of the deployment commit, even if the commit has been deleted. */
  readonly commitOid: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the actor who triggered the deployment. */
  readonly creator: GitHub_Actor;
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** The deployment description. */
  readonly description: Maybe<Scalars['String']>;
  /** The latest environment to which this deployment was made. */
  readonly environment: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  /** The latest environment to which this deployment was made. */
  readonly latestEnvironment: Maybe<Scalars['String']>;
  /** The latest status of this deployment. */
  readonly latestStatus: Maybe<GitHub_DeploymentStatus>;
  /** The original environment to which this deployment was made. */
  readonly originalEnvironment: Maybe<Scalars['String']>;
  /** Extra information that a deployment system might need. */
  readonly payload: Maybe<Scalars['String']>;
  /** Identifies the Ref of the deployment, if the deployment was created by ref. */
  readonly ref: Maybe<GitHub_Ref>;
  /** Identifies the repository associated with the deployment. */
  readonly repository: GitHub_Repository;
  /** The current state of the deployment. */
  readonly state: Maybe<GitHub_DeploymentState>;
  /** A list of statuses associated with the deployment. */
  readonly statuses: Maybe<GitHub_DeploymentStatusConnection>;
  /** The deployment task. */
  readonly task: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
};


/** Represents triggered deployment instance. */
type GitHub_Deployment_statusesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The connection type for Deployment. */
type GitHub_DeploymentConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_DeploymentEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Deployment>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_DeploymentEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_Deployment>;
};

/** Represents a 'deployment_environment_changed' event on a given pull request. */
type GitHub_DeploymentEnvironmentChangedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** The deployment status that updated the deployment environment. */
  readonly deploymentStatus: GitHub_DeploymentStatus;
  readonly id: Scalars['ID'];
  /** PullRequest referenced by event. */
  readonly pullRequest: GitHub_PullRequest;
};

/** Ordering options for deployment connections */
type GitHub_DeploymentOrder = {
  /** The field to order deployments by. */
  readonly field: GitHub_DeploymentOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which deployment connections can be ordered. */
enum GitHub_DeploymentOrderField {
  /** Order collection by creation time */
  CREATED_AT = 'CREATED_AT'
}

/** The possible states in which a deployment can be. */
enum GitHub_DeploymentState {
  /** The pending deployment was not updated after 30 minutes. */
  ABANDONED = 'ABANDONED',
  /** The deployment is currently active. */
  ACTIVE = 'ACTIVE',
  /** An inactive transient deployment. */
  DESTROYED = 'DESTROYED',
  /** The deployment experienced an error. */
  ERROR = 'ERROR',
  /** The deployment has failed. */
  FAILURE = 'FAILURE',
  /** The deployment is inactive. */
  INACTIVE = 'INACTIVE',
  /** The deployment is pending. */
  PENDING = 'PENDING',
  /** The deployment has queued */
  QUEUED = 'QUEUED',
  /** The deployment is in progress. */
  IN_PROGRESS = 'IN_PROGRESS'
}

/** Describes the status of a given deployment attempt. */
type GitHub_DeploymentStatus = GitHub_Node & {
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the actor who triggered the deployment. */
  readonly creator: GitHub_Actor;
  /** Identifies the deployment associated with status. */
  readonly deployment: GitHub_Deployment;
  /** Identifies the description of the deployment. */
  readonly description: Maybe<Scalars['String']>;
  /** Identifies the environment URL of the deployment. */
  readonly environmentUrl: Maybe<Scalars['GitHub_URI']>;
  readonly id: Scalars['ID'];
  /** Identifies the log URL of the deployment. */
  readonly logUrl: Maybe<Scalars['GitHub_URI']>;
  /** Identifies the current state of the deployment. */
  readonly state: GitHub_DeploymentStatusState;
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
};

/** The connection type for DeploymentStatus. */
type GitHub_DeploymentStatusConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_DeploymentStatusEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_DeploymentStatus>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_DeploymentStatusEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_DeploymentStatus>;
};

/** The possible states for a deployment status. */
enum GitHub_DeploymentStatusState {
  /** The deployment is pending. */
  PENDING = 'PENDING',
  /** The deployment was successful. */
  SUCCESS = 'SUCCESS',
  /** The deployment has failed. */
  FAILURE = 'FAILURE',
  /** The deployment is inactive. */
  INACTIVE = 'INACTIVE',
  /** The deployment experienced an error. */
  ERROR = 'ERROR',
  /** The deployment is queued */
  QUEUED = 'QUEUED',
  /** The deployment is in progress. */
  IN_PROGRESS = 'IN_PROGRESS'
}

/** The possible sides of a diff. */
enum GitHub_DiffSide {
  /** The left side of the diff. */
  LEFT = 'LEFT',
  /** The right side of the diff. */
  RIGHT = 'RIGHT'
}

/** Represents a 'disconnected' event on a given issue or pull request. */
type GitHub_DisconnectedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** Reference originated in a different repository. */
  readonly isCrossRepository: Scalars['Boolean'];
  /** Issue or pull request from which the issue was disconnected. */
  readonly source: GitHub_ReferencedSubject;
  /** Issue or pull request which was disconnected. */
  readonly subject: GitHub_ReferencedSubject;
};

/** Autogenerated input type of DismissPullRequestReview */
type GitHub_DismissPullRequestReviewInput = {
  /** The Node ID of the pull request review to modify. */
  readonly pullRequestReviewId: Scalars['ID'];
  /** The contents of the pull request review dismissal message. */
  readonly message: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DismissPullRequestReview */
type GitHub_DismissPullRequestReviewPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The dismissed pull request review. */
  readonly pullRequestReview: Maybe<GitHub_PullRequestReview>;
};

/** Specifies a review comment to be left with a Pull Request Review. */
type GitHub_DraftPullRequestReviewComment = {
  /** Path to the file being commented on. */
  readonly path: Scalars['String'];
  /** Position in the file to leave a comment on. */
  readonly position: Scalars['Int'];
  /** Body of the comment to leave. */
  readonly body: Scalars['String'];
};

/** Specifies a review comment thread to be left with a Pull Request Review. */
type GitHub_DraftPullRequestReviewThread = {
  /** Path to the file being commented on. */
  readonly path: Scalars['String'];
  /** The line of the blob to which the thread refers. The end of the line range for multi-line comments. */
  readonly line: Scalars['Int'];
  /** The side of the diff on which the line resides. For multi-line comments, this is the side for the end of the line range. */
  readonly side: Maybe<GitHub_DiffSide>;
  /** The first line of the range to which the comment refers. */
  readonly startLine: Maybe<Scalars['Int']>;
  /** The side of the diff on which the start line resides. */
  readonly startSide: Maybe<GitHub_DiffSide>;
  /** Body of the comment to leave. */
  readonly body: Scalars['String'];
};

/** An account to manage multiple organizations with consolidated policy and billing. */
type GitHub_Enterprise = GitHub_Node & {
  /** A URL pointing to the enterprise's public avatar. */
  readonly avatarUrl: Scalars['GitHub_URI'];
  /** Enterprise billing information visible to enterprise billing managers. */
  readonly billingInfo: Maybe<GitHub_EnterpriseBillingInfo>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** The description of the enterprise. */
  readonly description: Maybe<Scalars['String']>;
  /** The description of the enterprise as HTML. */
  readonly descriptionHTML: Scalars['GitHub_HTML'];
  readonly id: Scalars['ID'];
  /** The location of the enterprise. */
  readonly location: Maybe<Scalars['String']>;
  /** A list of users who are members of this enterprise. */
  readonly members: GitHub_EnterpriseMemberConnection;
  /** The name of the enterprise. */
  readonly name: Scalars['String'];
  /** A list of organizations that belong to this enterprise. */
  readonly organizations: GitHub_OrganizationConnection;
  /** Enterprise information only visible to enterprise owners. */
  readonly ownerInfo: Maybe<GitHub_EnterpriseOwnerInfo>;
  /** The HTTP path for this enterprise. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The URL-friendly identifier for the enterprise. */
  readonly slug: Scalars['String'];
  /** The HTTP URL for this enterprise. */
  readonly url: Scalars['GitHub_URI'];
  /** A list of user accounts on this enterprise. */
  readonly userAccounts: GitHub_EnterpriseUserAccountConnection;
  /** Is the current viewer an admin of this enterprise? */
  readonly viewerIsAdmin: Scalars['Boolean'];
  /** The URL of the enterprise website. */
  readonly websiteUrl: Maybe<Scalars['GitHub_URI']>;
};


/** An account to manage multiple organizations with consolidated policy and billing. */
type GitHub_Enterprise_avatarUrlArgs = {
  size: Maybe<Scalars['Int']>;
};


/** An account to manage multiple organizations with consolidated policy and billing. */
type GitHub_Enterprise_membersArgs = {
  organizationLogins: Maybe<ReadonlyArray<Scalars['String']>>;
  query: Maybe<Scalars['String']>;
  orderBy?: Maybe<GitHub_EnterpriseMemberOrder>;
  role: Maybe<GitHub_EnterpriseUserAccountMembershipRole>;
  deployment: Maybe<GitHub_EnterpriseUserDeployment>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** An account to manage multiple organizations with consolidated policy and billing. */
type GitHub_Enterprise_organizationsArgs = {
  query: Maybe<Scalars['String']>;
  orderBy?: Maybe<GitHub_OrganizationOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** An account to manage multiple organizations with consolidated policy and billing. */
type GitHub_Enterprise_userAccountsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The connection type for User. */
type GitHub_EnterpriseAdministratorConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_EnterpriseAdministratorEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_User>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** A User who is an administrator of an enterprise. */
type GitHub_EnterpriseAdministratorEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_User>;
  /** The role of the administrator. */
  readonly role: GitHub_EnterpriseAdministratorRole;
};

/** An invitation for a user to become an owner or billing manager of an enterprise. */
type GitHub_EnterpriseAdministratorInvitation = GitHub_Node & {
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** The email of the person who was invited to the enterprise. */
  readonly email: Maybe<Scalars['String']>;
  /** The enterprise the invitation is for. */
  readonly enterprise: GitHub_Enterprise;
  readonly id: Scalars['ID'];
  /** The user who was invited to the enterprise. */
  readonly invitee: Maybe<GitHub_User>;
  /** The user who created the invitation. */
  readonly inviter: Maybe<GitHub_User>;
  /** The invitee's pending role in the enterprise (owner or billing_manager). */
  readonly role: GitHub_EnterpriseAdministratorRole;
};

/** The connection type for EnterpriseAdministratorInvitation. */
type GitHub_EnterpriseAdministratorInvitationConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_EnterpriseAdministratorInvitationEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_EnterpriseAdministratorInvitation>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_EnterpriseAdministratorInvitationEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_EnterpriseAdministratorInvitation>;
};

/** Ordering options for enterprise administrator invitation connections */
type GitHub_EnterpriseAdministratorInvitationOrder = {
  /** The field to order enterprise administrator invitations by. */
  readonly field: GitHub_EnterpriseAdministratorInvitationOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which enterprise administrator invitation connections can be ordered. */
enum GitHub_EnterpriseAdministratorInvitationOrderField {
  /** Order enterprise administrator member invitations by creation time */
  CREATED_AT = 'CREATED_AT'
}

/** The possible administrator roles in an enterprise account. */
enum GitHub_EnterpriseAdministratorRole {
  /** Represents an owner of the enterprise account. */
  OWNER = 'OWNER',
  /** Represents a billing manager of the enterprise account. */
  BILLING_MANAGER = 'BILLING_MANAGER'
}

/** Metadata for an audit entry containing enterprise account information. */
type GitHub_EnterpriseAuditEntryData = {
  /** The HTTP path for this enterprise. */
  readonly enterpriseResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The slug of the enterprise. */
  readonly enterpriseSlug: Maybe<Scalars['String']>;
  /** The HTTP URL for this enterprise. */
  readonly enterpriseUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Enterprise billing information visible to enterprise billing managers and owners. */
type GitHub_EnterpriseBillingInfo = {
  /** The number of licenseable users/emails across the enterprise. */
  readonly allLicensableUsersCount: Scalars['Int'];
  /** The number of data packs used by all organizations owned by the enterprise. */
  readonly assetPacks: Scalars['Int'];
  /**
   * The number of available seats across all owned organizations based on the unique number of billable users.
   * @deprecated `availableSeats` will be replaced with `totalAvailableLicenses` to provide more clarity on the value being returned Use EnterpriseBillingInfo.totalAvailableLicenses instead. Removal on 2020-01-01 UTC.
   */
  readonly availableSeats: Scalars['Int'];
  /** The bandwidth quota in GB for all organizations owned by the enterprise. */
  readonly bandwidthQuota: Scalars['Float'];
  /** The bandwidth usage in GB for all organizations owned by the enterprise. */
  readonly bandwidthUsage: Scalars['Float'];
  /** The bandwidth usage as a percentage of the bandwidth quota. */
  readonly bandwidthUsagePercentage: Scalars['Int'];
  /**
   * The total seats across all organizations owned by the enterprise.
   * @deprecated `seats` will be replaced with `totalLicenses` to provide more clarity on the value being returned Use EnterpriseBillingInfo.totalLicenses instead. Removal on 2020-01-01 UTC.
   */
  readonly seats: Scalars['Int'];
  /** The storage quota in GB for all organizations owned by the enterprise. */
  readonly storageQuota: Scalars['Float'];
  /** The storage usage in GB for all organizations owned by the enterprise. */
  readonly storageUsage: Scalars['Float'];
  /** The storage usage as a percentage of the storage quota. */
  readonly storageUsagePercentage: Scalars['Int'];
  /** The number of available licenses across all owned organizations based on the unique number of billable users. */
  readonly totalAvailableLicenses: Scalars['Int'];
  /** The total number of licenses allocated. */
  readonly totalLicenses: Scalars['Int'];
};

/** The possible values for the enterprise default repository permission setting. */
enum GitHub_EnterpriseDefaultRepositoryPermissionSettingValue {
  /** Organizations in the enterprise choose default repository permissions for their members. */
  NO_POLICY = 'NO_POLICY',
  /** Organization members will be able to clone, pull, push, and add new collaborators to all organization repositories. */
  ADMIN = 'ADMIN',
  /** Organization members will be able to clone, pull, and push all organization repositories. */
  WRITE = 'WRITE',
  /** Organization members will be able to clone and pull all organization repositories. */
  READ = 'READ',
  /** Organization members will only be able to clone and pull public repositories. */
  NONE = 'NONE'
}

/** The possible values for an enabled/disabled enterprise setting. */
enum GitHub_EnterpriseEnabledDisabledSettingValue {
  /** The setting is enabled for organizations in the enterprise. */
  ENABLED = 'ENABLED',
  /** The setting is disabled for organizations in the enterprise. */
  DISABLED = 'DISABLED',
  /** There is no policy set for organizations in the enterprise. */
  NO_POLICY = 'NO_POLICY'
}

/** The possible values for an enabled/no policy enterprise setting. */
enum GitHub_EnterpriseEnabledSettingValue {
  /** The setting is enabled for organizations in the enterprise. */
  ENABLED = 'ENABLED',
  /** There is no policy set for organizations in the enterprise. */
  NO_POLICY = 'NO_POLICY'
}

/** An identity provider configured to provision identities for an enterprise. */
type GitHub_EnterpriseIdentityProvider = GitHub_Node & {
  /** The digest algorithm used to sign SAML requests for the identity provider. */
  readonly digestMethod: Maybe<GitHub_SamlDigestAlgorithm>;
  /** The enterprise this identity provider belongs to. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** ExternalIdentities provisioned by this identity provider. */
  readonly externalIdentities: GitHub_ExternalIdentityConnection;
  readonly id: Scalars['ID'];
  /** The x509 certificate used by the identity provider to sign assertions and responses. */
  readonly idpCertificate: Maybe<Scalars['GitHub_X509Certificate']>;
  /** The Issuer Entity ID for the SAML identity provider. */
  readonly issuer: Maybe<Scalars['String']>;
  /** Recovery codes that can be used by admins to access the enterprise if the identity provider is unavailable. */
  readonly recoveryCodes: Maybe<ReadonlyArray<Scalars['String']>>;
  /** The signature algorithm used to sign SAML requests for the identity provider. */
  readonly signatureMethod: Maybe<GitHub_SamlSignatureAlgorithm>;
  /** The URL endpoint for the identity provider's SAML SSO. */
  readonly ssoUrl: Maybe<Scalars['GitHub_URI']>;
};


/** An identity provider configured to provision identities for an enterprise. */
type GitHub_EnterpriseIdentityProvider_externalIdentitiesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** An object that is a member of an enterprise. */
type GitHub_EnterpriseMember = GitHub_EnterpriseUserAccount | GitHub_User;

/** The connection type for EnterpriseMember. */
type GitHub_EnterpriseMemberConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_EnterpriseMemberEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_EnterpriseMember>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** A User who is a member of an enterprise through one or more organizations. */
type GitHub_EnterpriseMemberEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** Whether the user does not have a license for the enterprise. */
  readonly isUnlicensed: Scalars['Boolean'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_EnterpriseMember>;
};

/** Ordering options for enterprise member connections. */
type GitHub_EnterpriseMemberOrder = {
  /** The field to order enterprise members by. */
  readonly field: GitHub_EnterpriseMemberOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which enterprise member connections can be ordered. */
enum GitHub_EnterpriseMemberOrderField {
  /** Order enterprise members by login */
  LOGIN = 'LOGIN',
  /** Order enterprise members by creation time */
  CREATED_AT = 'CREATED_AT'
}

/** The possible values for the enterprise members can create repositories setting. */
enum GitHub_EnterpriseMembersCanCreateRepositoriesSettingValue {
  /** Organization administrators choose whether to allow members to create repositories. */
  NO_POLICY = 'NO_POLICY',
  /** Members will be able to create public and private repositories. */
  ALL = 'ALL',
  /** Members will be able to create only public repositories. */
  PUBLIC = 'PUBLIC',
  /** Members will be able to create only private repositories. */
  PRIVATE = 'PRIVATE',
  /** Members will not be able to create public or private repositories. */
  DISABLED = 'DISABLED'
}

/** The possible values for the members can make purchases setting. */
enum GitHub_EnterpriseMembersCanMakePurchasesSettingValue {
  /** The setting is enabled for organizations in the enterprise. */
  ENABLED = 'ENABLED',
  /** The setting is disabled for organizations in the enterprise. */
  DISABLED = 'DISABLED'
}

/** The connection type for Organization. */
type GitHub_EnterpriseOrganizationMembershipConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_EnterpriseOrganizationMembershipEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Organization>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An enterprise organization that a user is a member of. */
type GitHub_EnterpriseOrganizationMembershipEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_Organization>;
  /** The role of the user in the enterprise membership. */
  readonly role: GitHub_EnterpriseUserAccountMembershipRole;
};

/** The connection type for User. */
type GitHub_EnterpriseOutsideCollaboratorConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_EnterpriseOutsideCollaboratorEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_User>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** A User who is an outside collaborator of an enterprise through one or more organizations. */
type GitHub_EnterpriseOutsideCollaboratorEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** Whether the outside collaborator does not have a license for the enterprise. */
  readonly isUnlicensed: Scalars['Boolean'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_User>;
  /** The enterprise organization repositories this user is a member of. */
  readonly repositories: GitHub_EnterpriseRepositoryInfoConnection;
};


/** A User who is an outside collaborator of an enterprise through one or more organizations. */
type GitHub_EnterpriseOutsideCollaboratorEdge_repositoriesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy?: Maybe<GitHub_RepositoryOrder>;
};

/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo = {
  /** A list of enterprise organizations configured with the provided action execution capabilities setting value. */
  readonly actionExecutionCapabilitySettingOrganizations: GitHub_OrganizationConnection;
  /** A list of all of the administrators for this enterprise. */
  readonly admins: GitHub_EnterpriseAdministratorConnection;
  /** A list of users in the enterprise who currently have two-factor authentication disabled. */
  readonly affiliatedUsersWithTwoFactorDisabled: GitHub_UserConnection;
  /** Whether or not affiliated users with two-factor authentication disabled exist in the enterprise. */
  readonly affiliatedUsersWithTwoFactorDisabledExist: Scalars['Boolean'];
  /** The setting value for whether private repository forking is enabled for repositories in organizations in this enterprise. */
  readonly allowPrivateRepositoryForkingSetting: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A list of enterprise organizations configured with the provided private repository forking setting value. */
  readonly allowPrivateRepositoryForkingSettingOrganizations: GitHub_OrganizationConnection;
  /** The setting value for base repository permissions for organizations in this enterprise. */
  readonly defaultRepositoryPermissionSetting: GitHub_EnterpriseDefaultRepositoryPermissionSettingValue;
  /** A list of enterprise organizations configured with the provided default repository permission. */
  readonly defaultRepositoryPermissionSettingOrganizations: GitHub_OrganizationConnection;
  /** Enterprise Server installations owned by the enterprise. */
  readonly enterpriseServerInstallations: GitHub_EnterpriseServerInstallationConnection;
  /** The setting value for whether the enterprise has an IP allow list enabled. */
  readonly ipAllowListEnabledSetting: GitHub_IpAllowListEnabledSettingValue;
  /** The IP addresses that are allowed to access resources owned by the enterprise. */
  readonly ipAllowListEntries: GitHub_IpAllowListEntryConnection;
  /** Whether or not the default repository permission is currently being updated. */
  readonly isUpdatingDefaultRepositoryPermission: Scalars['Boolean'];
  /** Whether the two-factor authentication requirement is currently being enforced. */
  readonly isUpdatingTwoFactorRequirement: Scalars['Boolean'];
  /**
   * The setting value for whether organization members with admin permissions on a
   * repository can change repository visibility.
   */
  readonly membersCanChangeRepositoryVisibilitySetting: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A list of enterprise organizations configured with the provided can change repository visibility setting value. */
  readonly membersCanChangeRepositoryVisibilitySettingOrganizations: GitHub_OrganizationConnection;
  /** The setting value for whether members of organizations in the enterprise can create internal repositories. */
  readonly membersCanCreateInternalRepositoriesSetting: Maybe<Scalars['Boolean']>;
  /** The setting value for whether members of organizations in the enterprise can create private repositories. */
  readonly membersCanCreatePrivateRepositoriesSetting: Maybe<Scalars['Boolean']>;
  /** The setting value for whether members of organizations in the enterprise can create public repositories. */
  readonly membersCanCreatePublicRepositoriesSetting: Maybe<Scalars['Boolean']>;
  /** The setting value for whether members of organizations in the enterprise can create repositories. */
  readonly membersCanCreateRepositoriesSetting: Maybe<GitHub_EnterpriseMembersCanCreateRepositoriesSettingValue>;
  /** A list of enterprise organizations configured with the provided repository creation setting value. */
  readonly membersCanCreateRepositoriesSettingOrganizations: GitHub_OrganizationConnection;
  /** The setting value for whether members with admin permissions for repositories can delete issues. */
  readonly membersCanDeleteIssuesSetting: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A list of enterprise organizations configured with the provided members can delete issues setting value. */
  readonly membersCanDeleteIssuesSettingOrganizations: GitHub_OrganizationConnection;
  /** The setting value for whether members with admin permissions for repositories can delete or transfer repositories. */
  readonly membersCanDeleteRepositoriesSetting: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A list of enterprise organizations configured with the provided members can delete repositories setting value. */
  readonly membersCanDeleteRepositoriesSettingOrganizations: GitHub_OrganizationConnection;
  /** The setting value for whether members of organizations in the enterprise can invite outside collaborators. */
  readonly membersCanInviteCollaboratorsSetting: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A list of enterprise organizations configured with the provided members can invite collaborators setting value. */
  readonly membersCanInviteCollaboratorsSettingOrganizations: GitHub_OrganizationConnection;
  /** Indicates whether members of this enterprise's organizations can purchase additional services for those organizations. */
  readonly membersCanMakePurchasesSetting: GitHub_EnterpriseMembersCanMakePurchasesSettingValue;
  /** The setting value for whether members with admin permissions for repositories can update protected branches. */
  readonly membersCanUpdateProtectedBranchesSetting: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A list of enterprise organizations configured with the provided members can update protected branches setting value. */
  readonly membersCanUpdateProtectedBranchesSettingOrganizations: GitHub_OrganizationConnection;
  /** The setting value for whether members can view dependency insights. */
  readonly membersCanViewDependencyInsightsSetting: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A list of enterprise organizations configured with the provided members can view dependency insights setting value. */
  readonly membersCanViewDependencyInsightsSettingOrganizations: GitHub_OrganizationConnection;
  /** The setting value for whether organization projects are enabled for organizations in this enterprise. */
  readonly organizationProjectsSetting: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A list of enterprise organizations configured with the provided organization projects setting value. */
  readonly organizationProjectsSettingOrganizations: GitHub_OrganizationConnection;
  /** A list of outside collaborators across the repositories in the enterprise. */
  readonly outsideCollaborators: GitHub_EnterpriseOutsideCollaboratorConnection;
  /** A list of pending administrator invitations for the enterprise. */
  readonly pendingAdminInvitations: GitHub_EnterpriseAdministratorInvitationConnection;
  /** A list of pending collaborator invitations across the repositories in the enterprise. */
  readonly pendingCollaboratorInvitations: GitHub_RepositoryInvitationConnection;
  /**
   * A list of pending collaborators across the repositories in the enterprise.
   * @deprecated Repository invitations can now be associated with an email, not only an invitee. Use the `pendingCollaboratorInvitations` field instead. Removal on 2020-10-01 UTC.
   */
  readonly pendingCollaborators: GitHub_EnterprisePendingCollaboratorConnection;
  /** A list of pending member invitations for organizations in the enterprise. */
  readonly pendingMemberInvitations: GitHub_EnterprisePendingMemberInvitationConnection;
  /** The setting value for whether repository projects are enabled in this enterprise. */
  readonly repositoryProjectsSetting: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A list of enterprise organizations configured with the provided repository projects setting value. */
  readonly repositoryProjectsSettingOrganizations: GitHub_OrganizationConnection;
  /** The SAML Identity Provider for the enterprise. */
  readonly samlIdentityProvider: Maybe<GitHub_EnterpriseIdentityProvider>;
  /** A list of enterprise organizations configured with the SAML single sign-on setting value. */
  readonly samlIdentityProviderSettingOrganizations: GitHub_OrganizationConnection;
  /** The setting value for whether team discussions are enabled for organizations in this enterprise. */
  readonly teamDiscussionsSetting: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A list of enterprise organizations configured with the provided team discussions setting value. */
  readonly teamDiscussionsSettingOrganizations: GitHub_OrganizationConnection;
  /** The setting value for whether the enterprise requires two-factor authentication for its organizations and users. */
  readonly twoFactorRequiredSetting: GitHub_EnterpriseEnabledSettingValue;
  /** A list of enterprise organizations configured with the two-factor authentication setting value. */
  readonly twoFactorRequiredSettingOrganizations: GitHub_OrganizationConnection;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_actionExecutionCapabilitySettingOrganizationsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy?: Maybe<GitHub_OrganizationOrder>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_adminsArgs = {
  query: Maybe<Scalars['String']>;
  role: Maybe<GitHub_EnterpriseAdministratorRole>;
  orderBy?: Maybe<GitHub_EnterpriseMemberOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_affiliatedUsersWithTwoFactorDisabledArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_allowPrivateRepositoryForkingSettingOrganizationsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  value: Scalars['Boolean'];
  orderBy?: Maybe<GitHub_OrganizationOrder>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_defaultRepositoryPermissionSettingOrganizationsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  value: GitHub_DefaultRepositoryPermissionField;
  orderBy?: Maybe<GitHub_OrganizationOrder>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_enterpriseServerInstallationsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  connectedOnly?: Maybe<Scalars['Boolean']>;
  orderBy?: Maybe<GitHub_EnterpriseServerInstallationOrder>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_ipAllowListEntriesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy?: Maybe<GitHub_IpAllowListEntryOrder>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_membersCanChangeRepositoryVisibilitySettingOrganizationsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  value: Scalars['Boolean'];
  orderBy?: Maybe<GitHub_OrganizationOrder>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_membersCanCreateRepositoriesSettingOrganizationsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  value: GitHub_OrganizationMembersCanCreateRepositoriesSettingValue;
  orderBy?: Maybe<GitHub_OrganizationOrder>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_membersCanDeleteIssuesSettingOrganizationsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  value: Scalars['Boolean'];
  orderBy?: Maybe<GitHub_OrganizationOrder>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_membersCanDeleteRepositoriesSettingOrganizationsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  value: Scalars['Boolean'];
  orderBy?: Maybe<GitHub_OrganizationOrder>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_membersCanInviteCollaboratorsSettingOrganizationsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  value: Scalars['Boolean'];
  orderBy?: Maybe<GitHub_OrganizationOrder>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_membersCanUpdateProtectedBranchesSettingOrganizationsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  value: Scalars['Boolean'];
  orderBy?: Maybe<GitHub_OrganizationOrder>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_membersCanViewDependencyInsightsSettingOrganizationsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  value: Scalars['Boolean'];
  orderBy?: Maybe<GitHub_OrganizationOrder>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_organizationProjectsSettingOrganizationsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  value: Scalars['Boolean'];
  orderBy?: Maybe<GitHub_OrganizationOrder>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_outsideCollaboratorsArgs = {
  login: Maybe<Scalars['String']>;
  query: Maybe<Scalars['String']>;
  orderBy?: Maybe<GitHub_EnterpriseMemberOrder>;
  visibility: Maybe<GitHub_RepositoryVisibility>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_pendingAdminInvitationsArgs = {
  query: Maybe<Scalars['String']>;
  orderBy?: Maybe<GitHub_EnterpriseAdministratorInvitationOrder>;
  role: Maybe<GitHub_EnterpriseAdministratorRole>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_pendingCollaboratorInvitationsArgs = {
  query: Maybe<Scalars['String']>;
  orderBy?: Maybe<GitHub_RepositoryInvitationOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_pendingCollaboratorsArgs = {
  query: Maybe<Scalars['String']>;
  orderBy?: Maybe<GitHub_RepositoryInvitationOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_pendingMemberInvitationsArgs = {
  query: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_repositoryProjectsSettingOrganizationsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  value: Scalars['Boolean'];
  orderBy?: Maybe<GitHub_OrganizationOrder>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_samlIdentityProviderSettingOrganizationsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  value: GitHub_IdentityProviderConfigurationState;
  orderBy?: Maybe<GitHub_OrganizationOrder>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_teamDiscussionsSettingOrganizationsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  value: Scalars['Boolean'];
  orderBy?: Maybe<GitHub_OrganizationOrder>;
};


/** Enterprise information only visible to enterprise owners. */
type GitHub_EnterpriseOwnerInfo_twoFactorRequiredSettingOrganizationsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  value: Scalars['Boolean'];
  orderBy?: Maybe<GitHub_OrganizationOrder>;
};

/** The connection type for User. */
type GitHub_EnterprisePendingCollaboratorConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_EnterprisePendingCollaboratorEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_User>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** A user with an invitation to be a collaborator on a repository owned by an organization in an enterprise. */
type GitHub_EnterprisePendingCollaboratorEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** Whether the invited collaborator does not have a license for the enterprise. */
  readonly isUnlicensed: Scalars['Boolean'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_User>;
  /** The enterprise organization repositories this user is a member of. */
  readonly repositories: GitHub_EnterpriseRepositoryInfoConnection;
};


/** A user with an invitation to be a collaborator on a repository owned by an organization in an enterprise. */
type GitHub_EnterprisePendingCollaboratorEdge_repositoriesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy?: Maybe<GitHub_RepositoryOrder>;
};

/** The connection type for OrganizationInvitation. */
type GitHub_EnterprisePendingMemberInvitationConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_EnterprisePendingMemberInvitationEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_OrganizationInvitation>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
  /** Identifies the total count of unique users in the connection. */
  readonly totalUniqueUserCount: Scalars['Int'];
};

/** An invitation to be a member in an enterprise organization. */
type GitHub_EnterprisePendingMemberInvitationEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** Whether the invitation has a license for the enterprise. */
  readonly isUnlicensed: Scalars['Boolean'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_OrganizationInvitation>;
};

/** A subset of repository information queryable from an enterprise. */
type GitHub_EnterpriseRepositoryInfo = GitHub_Node & {
  readonly id: Scalars['ID'];
  /** Identifies if the repository is private. */
  readonly isPrivate: Scalars['Boolean'];
  /** The repository's name. */
  readonly name: Scalars['String'];
  /** The repository's name with owner. */
  readonly nameWithOwner: Scalars['String'];
};

/** The connection type for EnterpriseRepositoryInfo. */
type GitHub_EnterpriseRepositoryInfoConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_EnterpriseRepositoryInfoEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_EnterpriseRepositoryInfo>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_EnterpriseRepositoryInfoEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_EnterpriseRepositoryInfo>;
};

/** An Enterprise Server installation. */
type GitHub_EnterpriseServerInstallation = GitHub_Node & {
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** The customer name to which the Enterprise Server installation belongs. */
  readonly customerName: Scalars['String'];
  /** The host name of the Enterprise Server installation. */
  readonly hostName: Scalars['String'];
  readonly id: Scalars['ID'];
  /** Whether or not the installation is connected to an Enterprise Server installation via GitHub Connect. */
  readonly isConnected: Scalars['Boolean'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** User accounts on this Enterprise Server installation. */
  readonly userAccounts: GitHub_EnterpriseServerUserAccountConnection;
  /** User accounts uploads for the Enterprise Server installation. */
  readonly userAccountsUploads: GitHub_EnterpriseServerUserAccountsUploadConnection;
};


/** An Enterprise Server installation. */
type GitHub_EnterpriseServerInstallation_userAccountsArgs = {
  orderBy?: Maybe<GitHub_EnterpriseServerUserAccountOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** An Enterprise Server installation. */
type GitHub_EnterpriseServerInstallation_userAccountsUploadsArgs = {
  orderBy?: Maybe<GitHub_EnterpriseServerUserAccountsUploadOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The connection type for EnterpriseServerInstallation. */
type GitHub_EnterpriseServerInstallationConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_EnterpriseServerInstallationEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_EnterpriseServerInstallation>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_EnterpriseServerInstallationEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_EnterpriseServerInstallation>;
};

/** Ordering options for Enterprise Server installation connections. */
type GitHub_EnterpriseServerInstallationOrder = {
  /** The field to order Enterprise Server installations by. */
  readonly field: GitHub_EnterpriseServerInstallationOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which Enterprise Server installation connections can be ordered. */
enum GitHub_EnterpriseServerInstallationOrderField {
  /** Order Enterprise Server installations by host name */
  HOST_NAME = 'HOST_NAME',
  /** Order Enterprise Server installations by customer name */
  CUSTOMER_NAME = 'CUSTOMER_NAME',
  /** Order Enterprise Server installations by creation time */
  CREATED_AT = 'CREATED_AT'
}

/** A user account on an Enterprise Server installation. */
type GitHub_EnterpriseServerUserAccount = GitHub_Node & {
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** User emails belonging to this user account. */
  readonly emails: GitHub_EnterpriseServerUserAccountEmailConnection;
  /** The Enterprise Server installation on which this user account exists. */
  readonly enterpriseServerInstallation: GitHub_EnterpriseServerInstallation;
  readonly id: Scalars['ID'];
  /** Whether the user account is a site administrator on the Enterprise Server installation. */
  readonly isSiteAdmin: Scalars['Boolean'];
  /** The login of the user account on the Enterprise Server installation. */
  readonly login: Scalars['String'];
  /** The profile name of the user account on the Enterprise Server installation. */
  readonly profileName: Maybe<Scalars['String']>;
  /** The date and time when the user account was created on the Enterprise Server installation. */
  readonly remoteCreatedAt: Scalars['GitHub_DateTime'];
  /** The ID of the user account on the Enterprise Server installation. */
  readonly remoteUserId: Scalars['Int'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
};


/** A user account on an Enterprise Server installation. */
type GitHub_EnterpriseServerUserAccount_emailsArgs = {
  orderBy?: Maybe<GitHub_EnterpriseServerUserAccountEmailOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The connection type for EnterpriseServerUserAccount. */
type GitHub_EnterpriseServerUserAccountConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_EnterpriseServerUserAccountEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_EnterpriseServerUserAccount>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_EnterpriseServerUserAccountEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_EnterpriseServerUserAccount>;
};

/** An email belonging to a user account on an Enterprise Server installation. */
type GitHub_EnterpriseServerUserAccountEmail = GitHub_Node & {
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** The email address. */
  readonly email: Scalars['String'];
  readonly id: Scalars['ID'];
  /** Indicates whether this is the primary email of the associated user account. */
  readonly isPrimary: Scalars['Boolean'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The user account to which the email belongs. */
  readonly userAccount: GitHub_EnterpriseServerUserAccount;
};

/** The connection type for EnterpriseServerUserAccountEmail. */
type GitHub_EnterpriseServerUserAccountEmailConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_EnterpriseServerUserAccountEmailEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_EnterpriseServerUserAccountEmail>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_EnterpriseServerUserAccountEmailEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_EnterpriseServerUserAccountEmail>;
};

/** Ordering options for Enterprise Server user account email connections. */
type GitHub_EnterpriseServerUserAccountEmailOrder = {
  /** The field to order emails by. */
  readonly field: GitHub_EnterpriseServerUserAccountEmailOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which Enterprise Server user account email connections can be ordered. */
enum GitHub_EnterpriseServerUserAccountEmailOrderField {
  /** Order emails by email */
  EMAIL = 'EMAIL'
}

/** Ordering options for Enterprise Server user account connections. */
type GitHub_EnterpriseServerUserAccountOrder = {
  /** The field to order user accounts by. */
  readonly field: GitHub_EnterpriseServerUserAccountOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which Enterprise Server user account connections can be ordered. */
enum GitHub_EnterpriseServerUserAccountOrderField {
  /** Order user accounts by login */
  LOGIN = 'LOGIN',
  /** Order user accounts by creation time on the Enterprise Server installation */
  REMOTE_CREATED_AT = 'REMOTE_CREATED_AT'
}

/** A user accounts upload from an Enterprise Server installation. */
type GitHub_EnterpriseServerUserAccountsUpload = GitHub_Node & {
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** The enterprise to which this upload belongs. */
  readonly enterprise: GitHub_Enterprise;
  /** The Enterprise Server installation for which this upload was generated. */
  readonly enterpriseServerInstallation: GitHub_EnterpriseServerInstallation;
  readonly id: Scalars['ID'];
  /** The name of the file uploaded. */
  readonly name: Scalars['String'];
  /** The synchronization state of the upload */
  readonly syncState: GitHub_EnterpriseServerUserAccountsUploadSyncState;
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
};

/** The connection type for EnterpriseServerUserAccountsUpload. */
type GitHub_EnterpriseServerUserAccountsUploadConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_EnterpriseServerUserAccountsUploadEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_EnterpriseServerUserAccountsUpload>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_EnterpriseServerUserAccountsUploadEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_EnterpriseServerUserAccountsUpload>;
};

/** Ordering options for Enterprise Server user accounts upload connections. */
type GitHub_EnterpriseServerUserAccountsUploadOrder = {
  /** The field to order user accounts uploads by. */
  readonly field: GitHub_EnterpriseServerUserAccountsUploadOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which Enterprise Server user accounts upload connections can be ordered. */
enum GitHub_EnterpriseServerUserAccountsUploadOrderField {
  /** Order user accounts uploads by creation time */
  CREATED_AT = 'CREATED_AT'
}

/** Synchronization state of the Enterprise Server user accounts upload */
enum GitHub_EnterpriseServerUserAccountsUploadSyncState {
  /** The synchronization of the upload is pending. */
  PENDING = 'PENDING',
  /** The synchronization of the upload succeeded. */
  SUCCESS = 'SUCCESS',
  /** The synchronization of the upload failed. */
  FAILURE = 'FAILURE'
}

/** An account for a user who is an admin of an enterprise or a member of an enterprise through one or more organizations. */
type GitHub_EnterpriseUserAccount = GitHub_Node & GitHub_Actor & {
  /** A URL pointing to the enterprise user account's public avatar. */
  readonly avatarUrl: Scalars['GitHub_URI'];
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** The enterprise in which this user account exists. */
  readonly enterprise: GitHub_Enterprise;
  readonly id: Scalars['ID'];
  /** An identifier for the enterprise user account, a login or email address */
  readonly login: Scalars['String'];
  /** The name of the enterprise user account */
  readonly name: Maybe<Scalars['String']>;
  /** A list of enterprise organizations this user is a member of. */
  readonly organizations: GitHub_EnterpriseOrganizationMembershipConnection;
  /** The HTTP path for this user. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL for this user. */
  readonly url: Scalars['GitHub_URI'];
  /** The user within the enterprise. */
  readonly user: Maybe<GitHub_User>;
};


/** An account for a user who is an admin of an enterprise or a member of an enterprise through one or more organizations. */
type GitHub_EnterpriseUserAccount_avatarUrlArgs = {
  size: Maybe<Scalars['Int']>;
};


/** An account for a user who is an admin of an enterprise or a member of an enterprise through one or more organizations. */
type GitHub_EnterpriseUserAccount_organizationsArgs = {
  query: Maybe<Scalars['String']>;
  orderBy?: Maybe<GitHub_OrganizationOrder>;
  role: Maybe<GitHub_EnterpriseUserAccountMembershipRole>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The connection type for EnterpriseUserAccount. */
type GitHub_EnterpriseUserAccountConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_EnterpriseUserAccountEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_EnterpriseUserAccount>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_EnterpriseUserAccountEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_EnterpriseUserAccount>;
};

/** The possible roles for enterprise membership. */
enum GitHub_EnterpriseUserAccountMembershipRole {
  /** The user is a member of the enterprise membership. */
  MEMBER = 'MEMBER',
  /** The user is an owner of the enterprise membership. */
  OWNER = 'OWNER'
}

/** The possible GitHub Enterprise deployments where this user can exist. */
enum GitHub_EnterpriseUserDeployment {
  /** The user is part of a GitHub Enterprise Cloud deployment. */
  CLOUD = 'CLOUD',
  /** The user is part of a GitHub Enterprise Server deployment. */
  SERVER = 'SERVER'
}

/** An external identity provisioned by SAML SSO or SCIM. */
type GitHub_ExternalIdentity = GitHub_Node & {
  /** The GUID for this identity */
  readonly guid: Scalars['String'];
  readonly id: Scalars['ID'];
  /** Organization invitation for this SCIM-provisioned external identity */
  readonly organizationInvitation: Maybe<GitHub_OrganizationInvitation>;
  /** SAML Identity attributes */
  readonly samlIdentity: Maybe<GitHub_ExternalIdentitySamlAttributes>;
  /** SCIM Identity attributes */
  readonly scimIdentity: Maybe<GitHub_ExternalIdentityScimAttributes>;
  /** User linked to this external identity. Will be NULL if this identity has not been claimed by an organization member. */
  readonly user: Maybe<GitHub_User>;
};

/** The connection type for ExternalIdentity. */
type GitHub_ExternalIdentityConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_ExternalIdentityEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_ExternalIdentity>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_ExternalIdentityEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_ExternalIdentity>;
};

/** SAML attributes for the External Identity */
type GitHub_ExternalIdentitySamlAttributes = {
  /** The NameID of the SAML identity */
  readonly nameId: Maybe<Scalars['String']>;
};

/** SCIM attributes for the External Identity */
type GitHub_ExternalIdentityScimAttributes = {
  /** The userName of the SCIM identity */
  readonly username: Maybe<Scalars['String']>;
};

/** The connection type for User. */
type GitHub_FollowerConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_UserEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_User>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** The connection type for User. */
type GitHub_FollowingConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_UserEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_User>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** Autogenerated input type of FollowUser */
type GitHub_FollowUserInput = {
  /** ID of the user to follow. */
  readonly userId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of FollowUser */
type GitHub_FollowUserPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The user that was followed. */
  readonly user: Maybe<GitHub_User>;
};

/** A funding platform link for a repository. */
type GitHub_FundingLink = {
  /** The funding platform this link is for. */
  readonly platform: GitHub_FundingPlatform;
  /** The configured URL for this funding link. */
  readonly url: Scalars['GitHub_URI'];
};

/** The possible funding platforms for repository funding links. */
enum GitHub_FundingPlatform {
  /** GitHub funding platform. */
  GITHUB = 'GITHUB',
  /** Patreon funding platform. */
  PATREON = 'PATREON',
  /** Open Collective funding platform. */
  OPEN_COLLECTIVE = 'OPEN_COLLECTIVE',
  /** Ko-fi funding platform. */
  KO_FI = 'KO_FI',
  /** Tidelift funding platform. */
  TIDELIFT = 'TIDELIFT',
  /** Community Bridge funding platform. */
  COMMUNITY_BRIDGE = 'COMMUNITY_BRIDGE',
  /** Liberapay funding platform. */
  LIBERAPAY = 'LIBERAPAY',
  /** IssueHunt funding platform. */
  ISSUEHUNT = 'ISSUEHUNT',
  /** Otechie funding platform. */
  OTECHIE = 'OTECHIE',
  /** Custom funding platform. */
  CUSTOM = 'CUSTOM'
}

/** A generic hovercard context with a message and icon */
type GitHub_GenericHovercardContext = GitHub_HovercardContext & {
  /** A string describing this context */
  readonly message: Scalars['String'];
  /** An octicon to accompany this context */
  readonly octicon: Scalars['String'];
};

/** A Gist. */
type GitHub_Gist = GitHub_Node & GitHub_Starrable & GitHub_UniformResourceLocatable & {
  /** A list of comments associated with the gist */
  readonly comments: GitHub_GistCommentConnection;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** The gist description. */
  readonly description: Maybe<Scalars['String']>;
  /** The files in this gist. */
  readonly files: Maybe<ReadonlyArray<Maybe<GitHub_GistFile>>>;
  /** A list of forks associated with the gist */
  readonly forks: GitHub_GistConnection;
  readonly id: Scalars['ID'];
  /** Identifies if the gist is a fork. */
  readonly isFork: Scalars['Boolean'];
  /** Whether the gist is public or not. */
  readonly isPublic: Scalars['Boolean'];
  /** The gist name. */
  readonly name: Scalars['String'];
  /** The gist owner. */
  readonly owner: Maybe<GitHub_RepositoryOwner>;
  /** Identifies when the gist was last pushed to. */
  readonly pushedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** The HTML path to this resource. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** A list of users who have starred this starrable. */
  readonly stargazers: GitHub_StargazerConnection;
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL for this Gist. */
  readonly url: Scalars['GitHub_URI'];
  /** Returns a boolean indicating whether the viewing user has starred this starrable. */
  readonly viewerHasStarred: Scalars['Boolean'];
};


/** A Gist. */
type GitHub_Gist_commentsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A Gist. */
type GitHub_Gist_filesArgs = {
  limit?: Maybe<Scalars['Int']>;
  oid: Maybe<Scalars['GitHub_GitObjectID']>;
};


/** A Gist. */
type GitHub_Gist_forksArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<GitHub_GistOrder>;
};


/** A Gist. */
type GitHub_Gist_stargazersArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<GitHub_StarOrder>;
};

/** Represents a comment on an Gist. */
type GitHub_GistComment = GitHub_Node & GitHub_Comment & GitHub_Deletable & GitHub_Minimizable & GitHub_Updatable & GitHub_UpdatableComment & {
  /** The actor who authored the comment. */
  readonly author: Maybe<GitHub_Actor>;
  /** Author's association with the gist. */
  readonly authorAssociation: GitHub_CommentAuthorAssociation;
  /** Identifies the comment body. */
  readonly body: Scalars['String'];
  /** The body rendered to HTML. */
  readonly bodyHTML: Scalars['GitHub_HTML'];
  /** The body rendered to text. */
  readonly bodyText: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Check if this comment was created via an email reply. */
  readonly createdViaEmail: Scalars['Boolean'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** The actor who edited the comment. */
  readonly editor: Maybe<GitHub_Actor>;
  /** The associated gist. */
  readonly gist: GitHub_Gist;
  readonly id: Scalars['ID'];
  /** Check if this comment was edited and includes an edit with the creation data */
  readonly includesCreatedEdit: Scalars['Boolean'];
  /** Returns whether or not a comment has been minimized. */
  readonly isMinimized: Scalars['Boolean'];
  /** The moment the editor made the last edit */
  readonly lastEditedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** Returns why the comment was minimized. */
  readonly minimizedReason: Maybe<Scalars['String']>;
  /** Identifies when the comment was published at. */
  readonly publishedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** A list of edits to this content. */
  readonly userContentEdits: Maybe<GitHub_UserContentEditConnection>;
  /** Check if the current viewer can delete this object. */
  readonly viewerCanDelete: Scalars['Boolean'];
  /** Check if the current viewer can minimize this object. */
  readonly viewerCanMinimize: Scalars['Boolean'];
  /** Check if the current viewer can update this object. */
  readonly viewerCanUpdate: Scalars['Boolean'];
  /** Reasons why the current viewer can not update this comment. */
  readonly viewerCannotUpdateReasons: ReadonlyArray<GitHub_CommentCannotUpdateReason>;
  /** Did the viewer author this comment. */
  readonly viewerDidAuthor: Scalars['Boolean'];
};


/** Represents a comment on an Gist. */
type GitHub_GistComment_userContentEditsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The connection type for GistComment. */
type GitHub_GistCommentConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_GistCommentEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_GistComment>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_GistCommentEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_GistComment>;
};

/** The connection type for Gist. */
type GitHub_GistConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_GistEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Gist>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_GistEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_Gist>;
};

/** A file in a gist. */
type GitHub_GistFile = {
  /** The file name encoded to remove characters that are invalid in URL paths. */
  readonly encodedName: Maybe<Scalars['String']>;
  /** The gist file encoding. */
  readonly encoding: Maybe<Scalars['String']>;
  /** The file extension from the file name. */
  readonly extension: Maybe<Scalars['String']>;
  /** Indicates if this file is an image. */
  readonly isImage: Scalars['Boolean'];
  /** Whether the file's contents were truncated. */
  readonly isTruncated: Scalars['Boolean'];
  /** The programming language this file is written in. */
  readonly language: Maybe<GitHub_Language>;
  /** The gist file name. */
  readonly name: Maybe<Scalars['String']>;
  /** The gist file size in bytes. */
  readonly size: Maybe<Scalars['Int']>;
  /** UTF8 text data or null if the file is binary */
  readonly text: Maybe<Scalars['String']>;
};


/** A file in a gist. */
type GitHub_GistFile_textArgs = {
  truncate: Maybe<Scalars['Int']>;
};

/** Ordering options for gist connections */
type GitHub_GistOrder = {
  /** The field to order repositories by. */
  readonly field: GitHub_GistOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which gist connections can be ordered. */
enum GitHub_GistOrderField {
  /** Order gists by creation time */
  CREATED_AT = 'CREATED_AT',
  /** Order gists by update time */
  UPDATED_AT = 'UPDATED_AT',
  /** Order gists by push time */
  PUSHED_AT = 'PUSHED_AT'
}

/** The privacy of a Gist */
enum GitHub_GistPrivacy {
  /** Public */
  PUBLIC = 'PUBLIC',
  /** Secret */
  SECRET = 'SECRET',
  /** Gists that are public and secret */
  ALL = 'ALL'
}

/** Represents an actor in a Git commit (ie. an author or committer). */
type GitHub_GitActor = {
  /** A URL pointing to the author's public avatar. */
  readonly avatarUrl: Scalars['GitHub_URI'];
  /** The timestamp of the Git action (authoring or committing). */
  readonly date: Maybe<Scalars['GitHub_GitTimestamp']>;
  /** The email in the Git commit. */
  readonly email: Maybe<Scalars['String']>;
  /** The name in the Git commit. */
  readonly name: Maybe<Scalars['String']>;
  /** The GitHub user corresponding to the email field. Null if no such user exists. */
  readonly user: Maybe<GitHub_User>;
};


/** Represents an actor in a Git commit (ie. an author or committer). */
type GitHub_GitActor_avatarUrlArgs = {
  size: Maybe<Scalars['Int']>;
};

/** Represents information about the GitHub instance. */
type GitHub_GitHubMetadata = {
  /** Returns a String that's a SHA of `github-services` */
  readonly gitHubServicesSha: Scalars['GitHub_GitObjectID'];
  /** IP addresses that users connect to for git operations */
  readonly gitIpAddresses: Maybe<ReadonlyArray<Scalars['String']>>;
  /** IP addresses that service hooks are sent from */
  readonly hookIpAddresses: Maybe<ReadonlyArray<Scalars['String']>>;
  /** IP addresses that the importer connects from */
  readonly importerIpAddresses: Maybe<ReadonlyArray<Scalars['String']>>;
  /** Whether or not users are verified */
  readonly isPasswordAuthenticationVerifiable: Scalars['Boolean'];
  /** IP addresses for GitHub Pages' A records */
  readonly pagesIpAddresses: Maybe<ReadonlyArray<Scalars['String']>>;
};

/** Represents a Git object. */
type GitHub_GitObject = {
  /** An abbreviated version of the Git object ID */
  readonly abbreviatedOid: Scalars['String'];
  /** The HTTP path for this Git object */
  readonly commitResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this Git object */
  readonly commitUrl: Scalars['GitHub_URI'];
  readonly id: Scalars['ID'];
  /** The Git object ID */
  readonly oid: Scalars['GitHub_GitObjectID'];
  /** The Repository the Git object belongs to */
  readonly repository: GitHub_Repository;
};


/** Information about a signature (GPG or S/MIME) on a Commit or Tag. */
type GitHub_GitSignature = {
  /** Email used to sign this object. */
  readonly email: Scalars['String'];
  /** True if the signature is valid and verified by GitHub. */
  readonly isValid: Scalars['Boolean'];
  /** Payload for GPG signing object. Raw ODB object without the signature header. */
  readonly payload: Scalars['String'];
  /** ASCII-armored signature header from object. */
  readonly signature: Scalars['String'];
  /** GitHub user corresponding to the email signing this commit. */
  readonly signer: Maybe<GitHub_User>;
  /**
   * The state of this signature. `VALID` if signature is valid and verified by
   * GitHub, otherwise represents reason why signature is considered invalid.
   */
  readonly state: GitHub_GitSignatureState;
  /** True if the signature was made with GitHub's signing key. */
  readonly wasSignedByGitHub: Scalars['Boolean'];
};

/** The state of a Git signature. */
enum GitHub_GitSignatureState {
  /** Valid signature and verified by GitHub */
  VALID = 'VALID',
  /** Invalid signature */
  INVALID = 'INVALID',
  /** Malformed signature */
  MALFORMED_SIG = 'MALFORMED_SIG',
  /** Key used for signing not known to GitHub */
  UNKNOWN_KEY = 'UNKNOWN_KEY',
  /** Invalid email used for signing */
  BAD_EMAIL = 'BAD_EMAIL',
  /** Email used for signing unverified on GitHub */
  UNVERIFIED_EMAIL = 'UNVERIFIED_EMAIL',
  /** Email used for signing not known to GitHub */
  NO_USER = 'NO_USER',
  /** Unknown signature type */
  UNKNOWN_SIG_TYPE = 'UNKNOWN_SIG_TYPE',
  /** Unsigned */
  UNSIGNED = 'UNSIGNED',
  /** Internal error - the GPG verification service is unavailable at the moment */
  GPGVERIFY_UNAVAILABLE = 'GPGVERIFY_UNAVAILABLE',
  /** Internal error - the GPG verification service misbehaved */
  GPGVERIFY_ERROR = 'GPGVERIFY_ERROR',
  /** The usage flags for the key that signed this don't allow signing */
  NOT_SIGNING_KEY = 'NOT_SIGNING_KEY',
  /** Signing key expired */
  EXPIRED_KEY = 'EXPIRED_KEY',
  /** Valid signature, pending certificate revocation checking */
  OCSP_PENDING = 'OCSP_PENDING',
  /** Valid siganture, though certificate revocation check failed */
  OCSP_ERROR = 'OCSP_ERROR',
  /** The signing certificate or its chain could not be verified */
  BAD_CERT = 'BAD_CERT',
  /** One or more certificates in chain has been revoked */
  OCSP_REVOKED = 'OCSP_REVOKED'
}



/** Represents a GPG signature on a Commit or Tag. */
type GitHub_GpgSignature = GitHub_GitSignature & {
  /** Email used to sign this object. */
  readonly email: Scalars['String'];
  /** True if the signature is valid and verified by GitHub. */
  readonly isValid: Scalars['Boolean'];
  /** Hex-encoded ID of the key that signed this object. */
  readonly keyId: Maybe<Scalars['String']>;
  /** Payload for GPG signing object. Raw ODB object without the signature header. */
  readonly payload: Scalars['String'];
  /** ASCII-armored signature header from object. */
  readonly signature: Scalars['String'];
  /** GitHub user corresponding to the email signing this commit. */
  readonly signer: Maybe<GitHub_User>;
  /**
   * The state of this signature. `VALID` if signature is valid and verified by
   * GitHub, otherwise represents reason why signature is considered invalid.
   */
  readonly state: GitHub_GitSignatureState;
  /** True if the signature was made with GitHub's signing key. */
  readonly wasSignedByGitHub: Scalars['Boolean'];
};

/** Represents a 'head_ref_deleted' event on a given pull request. */
type GitHub_HeadRefDeletedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the Ref associated with the `head_ref_deleted` event. */
  readonly headRef: Maybe<GitHub_Ref>;
  /** Identifies the name of the Ref associated with the `head_ref_deleted` event. */
  readonly headRefName: Scalars['String'];
  readonly id: Scalars['ID'];
  /** PullRequest referenced by event. */
  readonly pullRequest: GitHub_PullRequest;
};

/** Represents a 'head_ref_force_pushed' event on a given pull request. */
type GitHub_HeadRefForcePushedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the after commit SHA for the 'head_ref_force_pushed' event. */
  readonly afterCommit: Maybe<GitHub_Commit>;
  /** Identifies the before commit SHA for the 'head_ref_force_pushed' event. */
  readonly beforeCommit: Maybe<GitHub_Commit>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** PullRequest referenced by event. */
  readonly pullRequest: GitHub_PullRequest;
  /** Identifies the fully qualified ref name for the 'head_ref_force_pushed' event. */
  readonly ref: Maybe<GitHub_Ref>;
};

/** Represents a 'head_ref_restored' event on a given pull request. */
type GitHub_HeadRefRestoredEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** PullRequest referenced by event. */
  readonly pullRequest: GitHub_PullRequest;
};

/** Detail needed to display a hovercard for a user */
type GitHub_Hovercard = {
  /** Each of the contexts for this hovercard */
  readonly contexts: ReadonlyArray<GitHub_HovercardContext>;
};

/** An individual line of a hovercard */
type GitHub_HovercardContext = {
  /** A string describing this context */
  readonly message: Scalars['String'];
  /** An octicon to accompany this context */
  readonly octicon: Scalars['String'];
};


/** The possible states in which authentication can be configured with an identity provider. */
enum GitHub_IdentityProviderConfigurationState {
  /** Authentication with an identity provider is configured and enforced. */
  ENFORCED = 'ENFORCED',
  /** Authentication with an identity provider is configured but not enforced. */
  CONFIGURED = 'CONFIGURED',
  /** Authentication with an identity provider is not configured. */
  UNCONFIGURED = 'UNCONFIGURED'
}

/** Autogenerated input type of InviteEnterpriseAdmin */
type GitHub_InviteEnterpriseAdminInput = {
  /** The ID of the enterprise to which you want to invite an administrator. */
  readonly enterpriseId: Scalars['ID'];
  /** The login of a user to invite as an administrator. */
  readonly invitee: Maybe<Scalars['String']>;
  /** The email of the person to invite as an administrator. */
  readonly email: Maybe<Scalars['String']>;
  /** The role of the administrator. */
  readonly role: Maybe<GitHub_EnterpriseAdministratorRole>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of InviteEnterpriseAdmin */
type GitHub_InviteEnterpriseAdminPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The created enterprise administrator invitation. */
  readonly invitation: Maybe<GitHub_EnterpriseAdministratorInvitation>;
};

/** The possible values for the IP allow list enabled setting. */
enum GitHub_IpAllowListEnabledSettingValue {
  /** The setting is enabled for the owner. */
  ENABLED = 'ENABLED',
  /** The setting is disabled for the owner. */
  DISABLED = 'DISABLED'
}

/** An IP address or range of addresses that is allowed to access an owner's resources. */
type GitHub_IpAllowListEntry = GitHub_Node & {
  /** A single IP address or range of IP addresses in CIDR notation. */
  readonly allowListValue: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** Whether the entry is currently active. */
  readonly isActive: Scalars['Boolean'];
  /** The name of the IP allow list entry. */
  readonly name: Maybe<Scalars['String']>;
  /** The owner of the IP allow list entry. */
  readonly owner: GitHub_IpAllowListOwner;
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
};

/** The connection type for IpAllowListEntry. */
type GitHub_IpAllowListEntryConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_IpAllowListEntryEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_IpAllowListEntry>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_IpAllowListEntryEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_IpAllowListEntry>;
};

/** Ordering options for IP allow list entry connections. */
type GitHub_IpAllowListEntryOrder = {
  /** The field to order IP allow list entries by. */
  readonly field: GitHub_IpAllowListEntryOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which IP allow list entry connections can be ordered. */
enum GitHub_IpAllowListEntryOrderField {
  /** Order IP allow list entries by creation time. */
  CREATED_AT = 'CREATED_AT',
  /** Order IP allow list entries by the allow list value. */
  ALLOW_LIST_VALUE = 'ALLOW_LIST_VALUE'
}

/** Types that can own an IP allow list. */
type GitHub_IpAllowListOwner = GitHub_Enterprise | GitHub_Organization;

/** An Issue is a place to discuss ideas, enhancements, tasks, and bugs for a project. */
type GitHub_Issue = GitHub_Node & GitHub_Assignable & GitHub_Closable & GitHub_Comment & GitHub_Updatable & GitHub_UpdatableComment & GitHub_Labelable & GitHub_Lockable & GitHub_Reactable & GitHub_RepositoryNode & GitHub_Subscribable & GitHub_UniformResourceLocatable & {
  /** Reason that the conversation was locked. */
  readonly activeLockReason: Maybe<GitHub_LockReason>;
  /** A list of Users assigned to this object. */
  readonly assignees: GitHub_UserConnection;
  /** The actor who authored the comment. */
  readonly author: Maybe<GitHub_Actor>;
  /** Author's association with the subject of the comment. */
  readonly authorAssociation: GitHub_CommentAuthorAssociation;
  /** Identifies the body of the issue. */
  readonly body: Scalars['String'];
  /** The body rendered to HTML. */
  readonly bodyHTML: Scalars['GitHub_HTML'];
  /** Identifies the body of the issue rendered to text. */
  readonly bodyText: Scalars['String'];
  /** `true` if the object is closed (definition of closed may depend on type) */
  readonly closed: Scalars['Boolean'];
  /** Identifies the date and time when the object was closed. */
  readonly closedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** A list of comments associated with the Issue. */
  readonly comments: GitHub_IssueCommentConnection;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Check if this comment was created via an email reply. */
  readonly createdViaEmail: Scalars['Boolean'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** The actor who edited the comment. */
  readonly editor: Maybe<GitHub_Actor>;
  /** The hovercard information for this issue */
  readonly hovercard: GitHub_Hovercard;
  readonly id: Scalars['ID'];
  /** Check if this comment was edited and includes an edit with the creation data */
  readonly includesCreatedEdit: Scalars['Boolean'];
  /** A list of labels associated with the object. */
  readonly labels: Maybe<GitHub_LabelConnection>;
  /** The moment the editor made the last edit */
  readonly lastEditedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** `true` if the object is locked */
  readonly locked: Scalars['Boolean'];
  /** Identifies the milestone associated with the issue. */
  readonly milestone: Maybe<GitHub_Milestone>;
  /** Identifies the issue number. */
  readonly number: Scalars['Int'];
  /** A list of Users that are participating in the Issue conversation. */
  readonly participants: GitHub_UserConnection;
  /** List of project cards associated with this issue. */
  readonly projectCards: GitHub_ProjectCardConnection;
  /** Identifies when the comment was published at. */
  readonly publishedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** A list of reactions grouped by content left on the subject. */
  readonly reactionGroups: Maybe<ReadonlyArray<GitHub_ReactionGroup>>;
  /** A list of Reactions left on the Issue. */
  readonly reactions: GitHub_ReactionConnection;
  /** The repository associated with this node. */
  readonly repository: GitHub_Repository;
  /** The HTTP path for this issue */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** Identifies the state of the issue. */
  readonly state: GitHub_IssueState;
  /**
   * A list of events, comments, commits, etc. associated with the issue.
   * @deprecated `timeline` will be removed Use Issue.timelineItems instead. Removal on 2020-10-01 UTC.
   */
  readonly timeline: GitHub_IssueTimelineConnection;
  /** A list of events, comments, commits, etc. associated with the issue. */
  readonly timelineItems: GitHub_IssueTimelineItemsConnection;
  /** Identifies the issue title. */
  readonly title: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL for this issue */
  readonly url: Scalars['GitHub_URI'];
  /** A list of edits to this content. */
  readonly userContentEdits: Maybe<GitHub_UserContentEditConnection>;
  /** Can user react to this subject */
  readonly viewerCanReact: Scalars['Boolean'];
  /** Check if the viewer is able to change their subscription status for the repository. */
  readonly viewerCanSubscribe: Scalars['Boolean'];
  /** Check if the current viewer can update this object. */
  readonly viewerCanUpdate: Scalars['Boolean'];
  /** Reasons why the current viewer can not update this comment. */
  readonly viewerCannotUpdateReasons: ReadonlyArray<GitHub_CommentCannotUpdateReason>;
  /** Did the viewer author this comment. */
  readonly viewerDidAuthor: Scalars['Boolean'];
  /** Identifies if the viewer is watching, not watching, or ignoring the subscribable entity. */
  readonly viewerSubscription: Maybe<GitHub_SubscriptionState>;
};


/** An Issue is a place to discuss ideas, enhancements, tasks, and bugs for a project. */
type GitHub_Issue_assigneesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** An Issue is a place to discuss ideas, enhancements, tasks, and bugs for a project. */
type GitHub_Issue_commentsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** An Issue is a place to discuss ideas, enhancements, tasks, and bugs for a project. */
type GitHub_Issue_hovercardArgs = {
  includeNotificationContexts?: Maybe<Scalars['Boolean']>;
};


/** An Issue is a place to discuss ideas, enhancements, tasks, and bugs for a project. */
type GitHub_Issue_labelsArgs = {
  orderBy?: Maybe<GitHub_LabelOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** An Issue is a place to discuss ideas, enhancements, tasks, and bugs for a project. */
type GitHub_Issue_participantsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** An Issue is a place to discuss ideas, enhancements, tasks, and bugs for a project. */
type GitHub_Issue_projectCardsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  archivedStates?: Maybe<ReadonlyArray<Maybe<GitHub_ProjectCardArchivedState>>>;
};


/** An Issue is a place to discuss ideas, enhancements, tasks, and bugs for a project. */
type GitHub_Issue_reactionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  content: Maybe<GitHub_ReactionContent>;
  orderBy: Maybe<GitHub_ReactionOrder>;
};


/** An Issue is a place to discuss ideas, enhancements, tasks, and bugs for a project. */
type GitHub_Issue_timelineArgs = {
  since: Maybe<Scalars['GitHub_DateTime']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** An Issue is a place to discuss ideas, enhancements, tasks, and bugs for a project. */
type GitHub_Issue_timelineItemsArgs = {
  since: Maybe<Scalars['GitHub_DateTime']>;
  skip: Maybe<Scalars['Int']>;
  itemTypes: Maybe<ReadonlyArray<GitHub_IssueTimelineItemsItemType>>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** An Issue is a place to discuss ideas, enhancements, tasks, and bugs for a project. */
type GitHub_Issue_userContentEditsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** Represents a comment on an Issue. */
type GitHub_IssueComment = GitHub_Node & GitHub_Comment & GitHub_Deletable & GitHub_Minimizable & GitHub_Updatable & GitHub_UpdatableComment & GitHub_Reactable & GitHub_RepositoryNode & {
  /** The actor who authored the comment. */
  readonly author: Maybe<GitHub_Actor>;
  /** Author's association with the subject of the comment. */
  readonly authorAssociation: GitHub_CommentAuthorAssociation;
  /** The body as Markdown. */
  readonly body: Scalars['String'];
  /** The body rendered to HTML. */
  readonly bodyHTML: Scalars['GitHub_HTML'];
  /** The body rendered to text. */
  readonly bodyText: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Check if this comment was created via an email reply. */
  readonly createdViaEmail: Scalars['Boolean'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** The actor who edited the comment. */
  readonly editor: Maybe<GitHub_Actor>;
  readonly id: Scalars['ID'];
  /** Check if this comment was edited and includes an edit with the creation data */
  readonly includesCreatedEdit: Scalars['Boolean'];
  /** Returns whether or not a comment has been minimized. */
  readonly isMinimized: Scalars['Boolean'];
  /** Identifies the issue associated with the comment. */
  readonly issue: GitHub_Issue;
  /** The moment the editor made the last edit */
  readonly lastEditedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** Returns why the comment was minimized. */
  readonly minimizedReason: Maybe<Scalars['String']>;
  /** Identifies when the comment was published at. */
  readonly publishedAt: Maybe<Scalars['GitHub_DateTime']>;
  /**
   * Returns the pull request associated with the comment, if this comment was made on a
   * pull request.
   */
  readonly pullRequest: Maybe<GitHub_PullRequest>;
  /** A list of reactions grouped by content left on the subject. */
  readonly reactionGroups: Maybe<ReadonlyArray<GitHub_ReactionGroup>>;
  /** A list of Reactions left on the Issue. */
  readonly reactions: GitHub_ReactionConnection;
  /** The repository associated with this node. */
  readonly repository: GitHub_Repository;
  /** The HTTP path for this issue comment */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL for this issue comment */
  readonly url: Scalars['GitHub_URI'];
  /** A list of edits to this content. */
  readonly userContentEdits: Maybe<GitHub_UserContentEditConnection>;
  /** Check if the current viewer can delete this object. */
  readonly viewerCanDelete: Scalars['Boolean'];
  /** Check if the current viewer can minimize this object. */
  readonly viewerCanMinimize: Scalars['Boolean'];
  /** Can user react to this subject */
  readonly viewerCanReact: Scalars['Boolean'];
  /** Check if the current viewer can update this object. */
  readonly viewerCanUpdate: Scalars['Boolean'];
  /** Reasons why the current viewer can not update this comment. */
  readonly viewerCannotUpdateReasons: ReadonlyArray<GitHub_CommentCannotUpdateReason>;
  /** Did the viewer author this comment. */
  readonly viewerDidAuthor: Scalars['Boolean'];
};


/** Represents a comment on an Issue. */
type GitHub_IssueComment_reactionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  content: Maybe<GitHub_ReactionContent>;
  orderBy: Maybe<GitHub_ReactionOrder>;
};


/** Represents a comment on an Issue. */
type GitHub_IssueComment_userContentEditsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The connection type for IssueComment. */
type GitHub_IssueCommentConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_IssueCommentEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_IssueComment>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_IssueCommentEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_IssueComment>;
};

/** The connection type for Issue. */
type GitHub_IssueConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_IssueEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Issue>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** This aggregates issues opened by a user within one repository. */
type GitHub_IssueContributionsByRepository = {
  /** The issue contributions. */
  readonly contributions: GitHub_CreatedIssueContributionConnection;
  /** The repository in which the issues were opened. */
  readonly repository: GitHub_Repository;
};


/** This aggregates issues opened by a user within one repository. */
type GitHub_IssueContributionsByRepository_contributionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy?: Maybe<GitHub_ContributionOrder>;
};

/** An edge in a connection. */
type GitHub_IssueEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_Issue>;
};

/** Ways in which to filter lists of issues. */
type GitHub_IssueFilters = {
  /**
   * List issues assigned to given name. Pass in `null` for issues with no assigned
   * user, and `*` for issues assigned to any user.
   */
  readonly assignee: Maybe<Scalars['String']>;
  /** List issues created by given name. */
  readonly createdBy: Maybe<Scalars['String']>;
  /** List issues where the list of label names exist on the issue. */
  readonly labels: Maybe<ReadonlyArray<Scalars['String']>>;
  /** List issues where the given name is mentioned in the issue. */
  readonly mentioned: Maybe<Scalars['String']>;
  /**
   * List issues by given milestone argument. If an string representation of an
   * integer is passed, it should refer to a milestone by its number field. Pass in
   * `null` for issues with no milestone, and `*` for issues that are assigned to any milestone.
   */
  readonly milestone: Maybe<Scalars['String']>;
  /** List issues that have been updated at or after the given date. */
  readonly since: Maybe<Scalars['GitHub_DateTime']>;
  /** List issues filtered by the list of states given. */
  readonly states: Maybe<ReadonlyArray<GitHub_IssueState>>;
  /** List issues subscribed to by viewer. */
  readonly viewerSubscribed: Maybe<Scalars['Boolean']>;
};

/** Ways in which lists of issues can be ordered upon return. */
type GitHub_IssueOrder = {
  /** The field in which to order issues by. */
  readonly field: GitHub_IssueOrderField;
  /** The direction in which to order issues by the specified field. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which issue connections can be ordered. */
enum GitHub_IssueOrderField {
  /** Order issues by creation time */
  CREATED_AT = 'CREATED_AT',
  /** Order issues by update time */
  UPDATED_AT = 'UPDATED_AT',
  /** Order issues by comment count */
  COMMENTS = 'COMMENTS'
}

/** Used for return value of Repository.issueOrPullRequest. */
type GitHub_IssueOrPullRequest = GitHub_Issue | GitHub_PullRequest;

/** The possible states of an issue. */
enum GitHub_IssueState {
  /** An issue that is still open */
  OPEN = 'OPEN',
  /** An issue that has been closed */
  CLOSED = 'CLOSED'
}

/** The connection type for IssueTimelineItem. */
type GitHub_IssueTimelineConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_IssueTimelineItemEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_IssueTimelineItem>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An item in an issue timeline */
type GitHub_IssueTimelineItem = GitHub_AssignedEvent | GitHub_ClosedEvent | GitHub_Commit | GitHub_CrossReferencedEvent | GitHub_DemilestonedEvent | GitHub_IssueComment | GitHub_LabeledEvent | GitHub_LockedEvent | GitHub_MilestonedEvent | GitHub_ReferencedEvent | GitHub_RenamedTitleEvent | GitHub_ReopenedEvent | GitHub_SubscribedEvent | GitHub_TransferredEvent | GitHub_UnassignedEvent | GitHub_UnlabeledEvent | GitHub_UnlockedEvent | GitHub_UnsubscribedEvent | GitHub_UserBlockedEvent;

/** An edge in a connection. */
type GitHub_IssueTimelineItemEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_IssueTimelineItem>;
};

/** An item in an issue timeline */
type GitHub_IssueTimelineItems = GitHub_AddedToProjectEvent | GitHub_AssignedEvent | GitHub_ClosedEvent | GitHub_CommentDeletedEvent | GitHub_ConnectedEvent | GitHub_ConvertedNoteToIssueEvent | GitHub_CrossReferencedEvent | GitHub_DemilestonedEvent | GitHub_DisconnectedEvent | GitHub_IssueComment | GitHub_LabeledEvent | GitHub_LockedEvent | GitHub_MarkedAsDuplicateEvent | GitHub_MentionedEvent | GitHub_MilestonedEvent | GitHub_MovedColumnsInProjectEvent | GitHub_PinnedEvent | GitHub_ReferencedEvent | GitHub_RemovedFromProjectEvent | GitHub_RenamedTitleEvent | GitHub_ReopenedEvent | GitHub_SubscribedEvent | GitHub_TransferredEvent | GitHub_UnassignedEvent | GitHub_UnlabeledEvent | GitHub_UnlockedEvent | GitHub_UnmarkedAsDuplicateEvent | GitHub_UnpinnedEvent | GitHub_UnsubscribedEvent | GitHub_UserBlockedEvent;

/** The connection type for IssueTimelineItems. */
type GitHub_IssueTimelineItemsConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_IssueTimelineItemsEdge>>>;
  /** Identifies the count of items after applying `before` and `after` filters. */
  readonly filteredCount: Scalars['Int'];
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_IssueTimelineItems>>>;
  /** Identifies the count of items after applying `before`/`after` filters and `first`/`last`/`skip` slicing. */
  readonly pageCount: Scalars['Int'];
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
  /** Identifies the date and time when the timeline was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
};

/** An edge in a connection. */
type GitHub_IssueTimelineItemsEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_IssueTimelineItems>;
};

/** The possible item types found in a timeline. */
enum GitHub_IssueTimelineItemsItemType {
  /** Represents a comment on an Issue. */
  ISSUE_COMMENT = 'ISSUE_COMMENT',
  /** Represents a mention made by one issue or pull request to another. */
  CROSS_REFERENCED_EVENT = 'CROSS_REFERENCED_EVENT',
  /** Represents a 'added_to_project' event on a given issue or pull request. */
  ADDED_TO_PROJECT_EVENT = 'ADDED_TO_PROJECT_EVENT',
  /** Represents an 'assigned' event on any assignable object. */
  ASSIGNED_EVENT = 'ASSIGNED_EVENT',
  /** Represents a 'closed' event on any `Closable`. */
  CLOSED_EVENT = 'CLOSED_EVENT',
  /** Represents a 'comment_deleted' event on a given issue or pull request. */
  COMMENT_DELETED_EVENT = 'COMMENT_DELETED_EVENT',
  /** Represents a 'connected' event on a given issue or pull request. */
  CONNECTED_EVENT = 'CONNECTED_EVENT',
  /** Represents a 'converted_note_to_issue' event on a given issue or pull request. */
  CONVERTED_NOTE_TO_ISSUE_EVENT = 'CONVERTED_NOTE_TO_ISSUE_EVENT',
  /** Represents a 'demilestoned' event on a given issue or pull request. */
  DEMILESTONED_EVENT = 'DEMILESTONED_EVENT',
  /** Represents a 'disconnected' event on a given issue or pull request. */
  DISCONNECTED_EVENT = 'DISCONNECTED_EVENT',
  /** Represents a 'labeled' event on a given issue or pull request. */
  LABELED_EVENT = 'LABELED_EVENT',
  /** Represents a 'locked' event on a given issue or pull request. */
  LOCKED_EVENT = 'LOCKED_EVENT',
  /** Represents a 'marked_as_duplicate' event on a given issue or pull request. */
  MARKED_AS_DUPLICATE_EVENT = 'MARKED_AS_DUPLICATE_EVENT',
  /** Represents a 'mentioned' event on a given issue or pull request. */
  MENTIONED_EVENT = 'MENTIONED_EVENT',
  /** Represents a 'milestoned' event on a given issue or pull request. */
  MILESTONED_EVENT = 'MILESTONED_EVENT',
  /** Represents a 'moved_columns_in_project' event on a given issue or pull request. */
  MOVED_COLUMNS_IN_PROJECT_EVENT = 'MOVED_COLUMNS_IN_PROJECT_EVENT',
  /** Represents a 'pinned' event on a given issue or pull request. */
  PINNED_EVENT = 'PINNED_EVENT',
  /** Represents a 'referenced' event on a given `ReferencedSubject`. */
  REFERENCED_EVENT = 'REFERENCED_EVENT',
  /** Represents a 'removed_from_project' event on a given issue or pull request. */
  REMOVED_FROM_PROJECT_EVENT = 'REMOVED_FROM_PROJECT_EVENT',
  /** Represents a 'renamed' event on a given issue or pull request */
  RENAMED_TITLE_EVENT = 'RENAMED_TITLE_EVENT',
  /** Represents a 'reopened' event on any `Closable`. */
  REOPENED_EVENT = 'REOPENED_EVENT',
  /** Represents a 'subscribed' event on a given `Subscribable`. */
  SUBSCRIBED_EVENT = 'SUBSCRIBED_EVENT',
  /** Represents a 'transferred' event on a given issue or pull request. */
  TRANSFERRED_EVENT = 'TRANSFERRED_EVENT',
  /** Represents an 'unassigned' event on any assignable object. */
  UNASSIGNED_EVENT = 'UNASSIGNED_EVENT',
  /** Represents an 'unlabeled' event on a given issue or pull request. */
  UNLABELED_EVENT = 'UNLABELED_EVENT',
  /** Represents an 'unlocked' event on a given issue or pull request. */
  UNLOCKED_EVENT = 'UNLOCKED_EVENT',
  /** Represents a 'user_blocked' event on a given user. */
  USER_BLOCKED_EVENT = 'USER_BLOCKED_EVENT',
  /** Represents an 'unmarked_as_duplicate' event on a given issue or pull request. */
  UNMARKED_AS_DUPLICATE_EVENT = 'UNMARKED_AS_DUPLICATE_EVENT',
  /** Represents an 'unpinned' event on a given issue or pull request. */
  UNPINNED_EVENT = 'UNPINNED_EVENT',
  /** Represents an 'unsubscribed' event on a given `Subscribable`. */
  UNSUBSCRIBED_EVENT = 'UNSUBSCRIBED_EVENT'
}

/** Represents a user signing up for a GitHub account. */
type GitHub_JoinedGitHubContribution = GitHub_Contribution & {
  /**
   * Whether this contribution is associated with a record you do not have access to. For
   * example, your own 'first issue' contribution may have been made on a repository you can no
   * longer access.
   */
  readonly isRestricted: Scalars['Boolean'];
  /** When this contribution was made. */
  readonly occurredAt: Scalars['GitHub_DateTime'];
  /** The HTTP path for this contribution. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this contribution. */
  readonly url: Scalars['GitHub_URI'];
  /** The user who made this contribution. */
  readonly user: GitHub_User;
};

/** A label for categorizing Issues or Milestones with a given Repository. */
type GitHub_Label = GitHub_Node & {
  /** Identifies the label color. */
  readonly color: Scalars['String'];
  /** Identifies the date and time when the label was created. */
  readonly createdAt: Maybe<Scalars['GitHub_DateTime']>;
  /** A brief description of this label. */
  readonly description: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  /** Indicates whether or not this is a default label. */
  readonly isDefault: Scalars['Boolean'];
  /** A list of issues associated with this label. */
  readonly issues: GitHub_IssueConnection;
  /** Identifies the label name. */
  readonly name: Scalars['String'];
  /** A list of pull requests associated with this label. */
  readonly pullRequests: GitHub_PullRequestConnection;
  /** The repository associated with this label. */
  readonly repository: GitHub_Repository;
  /** The HTTP path for this label. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** Identifies the date and time when the label was last updated. */
  readonly updatedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** The HTTP URL for this label. */
  readonly url: Scalars['GitHub_URI'];
};


/** A label for categorizing Issues or Milestones with a given Repository. */
type GitHub_Label_issuesArgs = {
  orderBy: Maybe<GitHub_IssueOrder>;
  labels: Maybe<ReadonlyArray<Scalars['String']>>;
  states: Maybe<ReadonlyArray<GitHub_IssueState>>;
  filterBy: Maybe<GitHub_IssueFilters>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A label for categorizing Issues or Milestones with a given Repository. */
type GitHub_Label_pullRequestsArgs = {
  states: Maybe<ReadonlyArray<GitHub_PullRequestState>>;
  labels: Maybe<ReadonlyArray<Scalars['String']>>;
  headRefName: Maybe<Scalars['String']>;
  baseRefName: Maybe<Scalars['String']>;
  orderBy: Maybe<GitHub_IssueOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** An object that can have labels assigned to it. */
type GitHub_Labelable = {
  /** A list of labels associated with the object. */
  readonly labels: Maybe<GitHub_LabelConnection>;
};


/** An object that can have labels assigned to it. */
type GitHub_Labelable_labelsArgs = {
  orderBy?: Maybe<GitHub_LabelOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The connection type for Label. */
type GitHub_LabelConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_LabelEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Label>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** Represents a 'labeled' event on a given issue or pull request. */
type GitHub_LabeledEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** Identifies the label associated with the 'labeled' event. */
  readonly label: GitHub_Label;
  /** Identifies the `Labelable` associated with the event. */
  readonly labelable: GitHub_Labelable;
};

/** An edge in a connection. */
type GitHub_LabelEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_Label>;
};

/** Ways in which lists of labels can be ordered upon return. */
type GitHub_LabelOrder = {
  /** The field in which to order labels by. */
  readonly field: GitHub_LabelOrderField;
  /** The direction in which to order labels by the specified field. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which label connections can be ordered. */
enum GitHub_LabelOrderField {
  /** Order labels by name  */
  NAME = 'NAME',
  /** Order labels by creation time */
  CREATED_AT = 'CREATED_AT'
}

/** Represents a given language found in repositories. */
type GitHub_Language = GitHub_Node & {
  /** The color defined for the current language. */
  readonly color: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  /** The name of the current language. */
  readonly name: Scalars['String'];
};

/** A list of languages associated with the parent. */
type GitHub_LanguageConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_LanguageEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Language>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
  /** The total size in bytes of files written in that language. */
  readonly totalSize: Scalars['Int'];
};

/** Represents the language of a repository. */
type GitHub_LanguageEdge = {
  readonly cursor: Scalars['String'];
  readonly node: GitHub_Language;
  /** The number of bytes of code written in the language. */
  readonly size: Scalars['Int'];
};

/** Ordering options for language connections. */
type GitHub_LanguageOrder = {
  /** The field to order languages by. */
  readonly field: GitHub_LanguageOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which language connections can be ordered. */
enum GitHub_LanguageOrderField {
  /** Order languages by the size of all files containing the language */
  SIZE = 'SIZE'
}

/** A repository's open source license */
type GitHub_License = GitHub_Node & {
  /** The full text of the license */
  readonly body: Scalars['String'];
  /** The conditions set by the license */
  readonly conditions: ReadonlyArray<Maybe<GitHub_LicenseRule>>;
  /** A human-readable description of the license */
  readonly description: Maybe<Scalars['String']>;
  /** Whether the license should be featured */
  readonly featured: Scalars['Boolean'];
  /** Whether the license should be displayed in license pickers */
  readonly hidden: Scalars['Boolean'];
  readonly id: Scalars['ID'];
  /** Instructions on how to implement the license */
  readonly implementation: Maybe<Scalars['String']>;
  /** The lowercased SPDX ID of the license */
  readonly key: Scalars['String'];
  /** The limitations set by the license */
  readonly limitations: ReadonlyArray<Maybe<GitHub_LicenseRule>>;
  /** The license full name specified by <https://spdx.org/licenses> */
  readonly name: Scalars['String'];
  /** Customary short name if applicable (e.g, GPLv3) */
  readonly nickname: Maybe<Scalars['String']>;
  /** The permissions set by the license */
  readonly permissions: ReadonlyArray<Maybe<GitHub_LicenseRule>>;
  /** Whether the license is a pseudo-license placeholder (e.g., other, no-license) */
  readonly pseudoLicense: Scalars['Boolean'];
  /** Short identifier specified by <https://spdx.org/licenses> */
  readonly spdxId: Maybe<Scalars['String']>;
  /** URL to the license on <https://choosealicense.com> */
  readonly url: Maybe<Scalars['GitHub_URI']>;
};

/** Describes a License's conditions, permissions, and limitations */
type GitHub_LicenseRule = {
  /** A description of the rule */
  readonly description: Scalars['String'];
  /** The machine-readable rule key */
  readonly key: Scalars['String'];
  /** The human-readable rule label */
  readonly label: Scalars['String'];
};

/** Autogenerated input type of LinkRepositoryToProject */
type GitHub_LinkRepositoryToProjectInput = {
  /** The ID of the Project to link to a Repository */
  readonly projectId: Scalars['ID'];
  /** The ID of the Repository to link to a Project. */
  readonly repositoryId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of LinkRepositoryToProject */
type GitHub_LinkRepositoryToProjectPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The linked Project. */
  readonly project: Maybe<GitHub_Project>;
  /** The linked Repository. */
  readonly repository: Maybe<GitHub_Repository>;
};

/** An object that can be locked. */
type GitHub_Lockable = {
  /** Reason that the conversation was locked. */
  readonly activeLockReason: Maybe<GitHub_LockReason>;
  /** `true` if the object is locked */
  readonly locked: Scalars['Boolean'];
};

/** Represents a 'locked' event on a given issue or pull request. */
type GitHub_LockedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** Reason that the conversation was locked (optional). */
  readonly lockReason: Maybe<GitHub_LockReason>;
  /** Object that was locked. */
  readonly lockable: GitHub_Lockable;
};

/** Autogenerated input type of LockLockable */
type GitHub_LockLockableInput = {
  /** ID of the issue or pull request to be locked. */
  readonly lockableId: Scalars['ID'];
  /** A reason for why the issue or pull request will be locked. */
  readonly lockReason: Maybe<GitHub_LockReason>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of LockLockable */
type GitHub_LockLockablePayload = {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The item that was locked. */
  readonly lockedRecord: Maybe<GitHub_Lockable>;
};

/** The possible reasons that an issue or pull request was locked. */
enum GitHub_LockReason {
  /** The issue or pull request was locked because the conversation was off-topic. */
  OFF_TOPIC = 'OFF_TOPIC',
  /** The issue or pull request was locked because the conversation was too heated. */
  TOO_HEATED = 'TOO_HEATED',
  /** The issue or pull request was locked because the conversation was resolved. */
  RESOLVED = 'RESOLVED',
  /** The issue or pull request was locked because the conversation was spam. */
  SPAM = 'SPAM'
}

/** A placeholder user for attribution of imported data on GitHub. */
type GitHub_Mannequin = GitHub_Node & GitHub_Actor & GitHub_UniformResourceLocatable & {
  /** A URL pointing to the GitHub App's public avatar. */
  readonly avatarUrl: Scalars['GitHub_URI'];
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** The mannequin's email on the source instance. */
  readonly email: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  /** The username of the actor. */
  readonly login: Scalars['String'];
  /** The HTML path to this resource. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The URL to this resource. */
  readonly url: Scalars['GitHub_URI'];
};


/** A placeholder user for attribution of imported data on GitHub. */
type GitHub_Mannequin_avatarUrlArgs = {
  size: Maybe<Scalars['Int']>;
};

/** Represents a 'marked_as_duplicate' event on a given issue or pull request. */
type GitHub_MarkedAsDuplicateEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
};

/** A public description of a Marketplace category. */
type GitHub_MarketplaceCategory = GitHub_Node & {
  /** The category's description. */
  readonly description: Maybe<Scalars['String']>;
  /** The technical description of how apps listed in this category work with GitHub. */
  readonly howItWorks: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  /** The category's name. */
  readonly name: Scalars['String'];
  /** How many Marketplace listings have this as their primary category. */
  readonly primaryListingCount: Scalars['Int'];
  /** The HTTP path for this Marketplace category. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** How many Marketplace listings have this as their secondary category. */
  readonly secondaryListingCount: Scalars['Int'];
  /** The short name of the category used in its URL. */
  readonly slug: Scalars['String'];
  /** The HTTP URL for this Marketplace category. */
  readonly url: Scalars['GitHub_URI'];
};

/** A listing in the GitHub integration marketplace. */
type GitHub_MarketplaceListing = GitHub_Node & {
  /** The GitHub App this listing represents. */
  readonly app: Maybe<GitHub_App>;
  /** URL to the listing owner's company site. */
  readonly companyUrl: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP path for configuring access to the listing's integration or OAuth app */
  readonly configurationResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for configuring access to the listing's integration or OAuth app */
  readonly configurationUrl: Scalars['GitHub_URI'];
  /** URL to the listing's documentation. */
  readonly documentationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The listing's detailed description. */
  readonly extendedDescription: Maybe<Scalars['String']>;
  /** The listing's detailed description rendered to HTML. */
  readonly extendedDescriptionHTML: Scalars['GitHub_HTML'];
  /** The listing's introductory description. */
  readonly fullDescription: Scalars['String'];
  /** The listing's introductory description rendered to HTML. */
  readonly fullDescriptionHTML: Scalars['GitHub_HTML'];
  /** Does this listing have any plans with a free trial? */
  readonly hasPublishedFreeTrialPlans: Scalars['Boolean'];
  /** Does this listing have a terms of service link? */
  readonly hasTermsOfService: Scalars['Boolean'];
  /** A technical description of how this app works with GitHub. */
  readonly howItWorks: Maybe<Scalars['String']>;
  /** The listing's technical description rendered to HTML. */
  readonly howItWorksHTML: Scalars['GitHub_HTML'];
  readonly id: Scalars['ID'];
  /** URL to install the product to the viewer's account or organization. */
  readonly installationUrl: Maybe<Scalars['GitHub_URI']>;
  /** Whether this listing's app has been installed for the current viewer */
  readonly installedForViewer: Scalars['Boolean'];
  /** Whether this listing has been removed from the Marketplace. */
  readonly isArchived: Scalars['Boolean'];
  /**
   * Whether this listing is still an editable draft that has not been submitted
   * for review and is not publicly visible in the Marketplace.
   */
  readonly isDraft: Scalars['Boolean'];
  /** Whether the product this listing represents is available as part of a paid plan. */
  readonly isPaid: Scalars['Boolean'];
  /** Whether this listing has been approved for display in the Marketplace. */
  readonly isPublic: Scalars['Boolean'];
  /** Whether this listing has been rejected by GitHub for display in the Marketplace. */
  readonly isRejected: Scalars['Boolean'];
  /** Whether this listing has been approved for unverified display in the Marketplace. */
  readonly isUnverified: Scalars['Boolean'];
  /** Whether this draft listing has been submitted for review for approval to be unverified in the Marketplace. */
  readonly isUnverifiedPending: Scalars['Boolean'];
  /** Whether this draft listing has been submitted for review from GitHub for approval to be verified in the Marketplace. */
  readonly isVerificationPendingFromDraft: Scalars['Boolean'];
  /** Whether this unverified listing has been submitted for review from GitHub for approval to be verified in the Marketplace. */
  readonly isVerificationPendingFromUnverified: Scalars['Boolean'];
  /** Whether this listing has been approved for verified display in the Marketplace. */
  readonly isVerified: Scalars['Boolean'];
  /** The hex color code, without the leading '#', for the logo background. */
  readonly logoBackgroundColor: Scalars['String'];
  /** URL for the listing's logo image. */
  readonly logoUrl: Maybe<Scalars['GitHub_URI']>;
  /** The listing's full name. */
  readonly name: Scalars['String'];
  /** The listing's very short description without a trailing period or ampersands. */
  readonly normalizedShortDescription: Scalars['String'];
  /** URL to the listing's detailed pricing. */
  readonly pricingUrl: Maybe<Scalars['GitHub_URI']>;
  /** The category that best describes the listing. */
  readonly primaryCategory: GitHub_MarketplaceCategory;
  /** URL to the listing's privacy policy, may return an empty string for listings that do not require a privacy policy URL. */
  readonly privacyPolicyUrl: Scalars['GitHub_URI'];
  /** The HTTP path for the Marketplace listing. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The URLs for the listing's screenshots. */
  readonly screenshotUrls: ReadonlyArray<Maybe<Scalars['String']>>;
  /** An alternate category that describes the listing. */
  readonly secondaryCategory: Maybe<GitHub_MarketplaceCategory>;
  /** The listing's very short description. */
  readonly shortDescription: Scalars['String'];
  /** The short name of the listing used in its URL. */
  readonly slug: Scalars['String'];
  /** URL to the listing's status page. */
  readonly statusUrl: Maybe<Scalars['GitHub_URI']>;
  /** An email address for support for this listing's app. */
  readonly supportEmail: Maybe<Scalars['String']>;
  /**
   * Either a URL or an email address for support for this listing's app, may
   * return an empty string for listings that do not require a support URL.
   */
  readonly supportUrl: Scalars['GitHub_URI'];
  /** URL to the listing's terms of service. */
  readonly termsOfServiceUrl: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the Marketplace listing. */
  readonly url: Scalars['GitHub_URI'];
  /** Can the current viewer add plans for this Marketplace listing. */
  readonly viewerCanAddPlans: Scalars['Boolean'];
  /** Can the current viewer approve this Marketplace listing. */
  readonly viewerCanApprove: Scalars['Boolean'];
  /** Can the current viewer delist this Marketplace listing. */
  readonly viewerCanDelist: Scalars['Boolean'];
  /** Can the current viewer edit this Marketplace listing. */
  readonly viewerCanEdit: Scalars['Boolean'];
  /**
   * Can the current viewer edit the primary and secondary category of this
   * Marketplace listing.
   */
  readonly viewerCanEditCategories: Scalars['Boolean'];
  /** Can the current viewer edit the plans for this Marketplace listing. */
  readonly viewerCanEditPlans: Scalars['Boolean'];
  /**
   * Can the current viewer return this Marketplace listing to draft state
   * so it becomes editable again.
   */
  readonly viewerCanRedraft: Scalars['Boolean'];
  /**
   * Can the current viewer reject this Marketplace listing by returning it to
   * an editable draft state or rejecting it entirely.
   */
  readonly viewerCanReject: Scalars['Boolean'];
  /**
   * Can the current viewer request this listing be reviewed for display in
   * the Marketplace as verified.
   */
  readonly viewerCanRequestApproval: Scalars['Boolean'];
  /** Indicates whether the current user has an active subscription to this Marketplace listing. */
  readonly viewerHasPurchased: Scalars['Boolean'];
  /**
   * Indicates if the current user has purchased a subscription to this Marketplace listing
   * for all of the organizations the user owns.
   */
  readonly viewerHasPurchasedForAllOrganizations: Scalars['Boolean'];
  /** Does the current viewer role allow them to administer this Marketplace listing. */
  readonly viewerIsListingAdmin: Scalars['Boolean'];
};


/** A listing in the GitHub integration marketplace. */
type GitHub_MarketplaceListing_logoUrlArgs = {
  size?: Maybe<Scalars['Int']>;
};

/** Look up Marketplace Listings */
type GitHub_MarketplaceListingConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_MarketplaceListingEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_MarketplaceListing>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_MarketplaceListingEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_MarketplaceListing>;
};

/** Autogenerated input type of MarkPullRequestReadyForReview */
type GitHub_MarkPullRequestReadyForReviewInput = {
  /** ID of the pull request to be marked as ready for review. */
  readonly pullRequestId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of MarkPullRequestReadyForReview */
type GitHub_MarkPullRequestReadyForReviewPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The pull request that is ready for review. */
  readonly pullRequest: Maybe<GitHub_PullRequest>;
};

/** Audit log entry for a members_can_delete_repos.clear event. */
type GitHub_MembersCanDeleteReposClearAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_EnterpriseAuditEntryData & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  /** The HTTP path for this enterprise. */
  readonly enterpriseResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The slug of the enterprise. */
  readonly enterpriseSlug: Maybe<Scalars['String']>;
  /** The HTTP URL for this enterprise. */
  readonly enterpriseUrl: Maybe<Scalars['GitHub_URI']>;
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a members_can_delete_repos.disable event. */
type GitHub_MembersCanDeleteReposDisableAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_EnterpriseAuditEntryData & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  /** The HTTP path for this enterprise. */
  readonly enterpriseResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The slug of the enterprise. */
  readonly enterpriseSlug: Maybe<Scalars['String']>;
  /** The HTTP URL for this enterprise. */
  readonly enterpriseUrl: Maybe<Scalars['GitHub_URI']>;
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a members_can_delete_repos.enable event. */
type GitHub_MembersCanDeleteReposEnableAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_EnterpriseAuditEntryData & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  /** The HTTP path for this enterprise. */
  readonly enterpriseResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The slug of the enterprise. */
  readonly enterpriseSlug: Maybe<Scalars['String']>;
  /** The HTTP URL for this enterprise. */
  readonly enterpriseUrl: Maybe<Scalars['GitHub_URI']>;
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Entities that have members who can set status messages. */
type GitHub_MemberStatusable = {
  /** Get the status messages members of this entity have set that are either public or visible only to the organization. */
  readonly memberStatuses: GitHub_UserStatusConnection;
};


/** Entities that have members who can set status messages. */
type GitHub_MemberStatusable_memberStatusesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy?: Maybe<GitHub_UserStatusOrder>;
};

/** Represents a 'mentioned' event on a given issue or pull request. */
type GitHub_MentionedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  readonly id: Scalars['ID'];
};

/** Whether or not a PullRequest can be merged. */
enum GitHub_MergeableState {
  /** The pull request can be merged. */
  MERGEABLE = 'MERGEABLE',
  /** The pull request cannot be merged due to merge conflicts. */
  CONFLICTING = 'CONFLICTING',
  /** The mergeability of the pull request is still being calculated. */
  UNKNOWN = 'UNKNOWN'
}

/** Autogenerated input type of MergeBranch */
type GitHub_MergeBranchInput = {
  /** The Node ID of the Repository containing the base branch that will be modified. */
  readonly repositoryId: Scalars['ID'];
  /** The name of the base branch that the provided head will be merged into. */
  readonly base: Scalars['String'];
  /** The head to merge into the base branch. This can be a branch name or a commit GitObjectID. */
  readonly head: Scalars['String'];
  /** Message to use for the merge commit. If omitted, a default will be used. */
  readonly commitMessage: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of MergeBranch */
type GitHub_MergeBranchPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The resulting merge Commit. */
  readonly mergeCommit: Maybe<GitHub_Commit>;
};

/** Represents a 'merged' event on a given pull request. */
type GitHub_MergedEvent = GitHub_Node & GitHub_UniformResourceLocatable & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the commit associated with the `merge` event. */
  readonly commit: Maybe<GitHub_Commit>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** Identifies the Ref associated with the `merge` event. */
  readonly mergeRef: Maybe<GitHub_Ref>;
  /** Identifies the name of the Ref associated with the `merge` event. */
  readonly mergeRefName: Scalars['String'];
  /** PullRequest referenced by event. */
  readonly pullRequest: GitHub_PullRequest;
  /** The HTTP path for this merged event. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this merged event. */
  readonly url: Scalars['GitHub_URI'];
};

/** Autogenerated input type of MergePullRequest */
type GitHub_MergePullRequestInput = {
  /** ID of the pull request to be merged. */
  readonly pullRequestId: Scalars['ID'];
  /** Commit headline to use for the merge commit; if omitted, a default message will be used. */
  readonly commitHeadline: Maybe<Scalars['String']>;
  /** Commit body to use for the merge commit; if omitted, a default message will be used */
  readonly commitBody: Maybe<Scalars['String']>;
  /** OID that the pull request head ref must match to allow merge; if omitted, no check is performed. */
  readonly expectedHeadOid: Maybe<Scalars['GitHub_GitObjectID']>;
  /** The merge method to use. If omitted, defaults to 'MERGE' */
  readonly mergeMethod: Maybe<GitHub_PullRequestMergeMethod>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of MergePullRequest */
type GitHub_MergePullRequestPayload = {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The pull request that was merged. */
  readonly pullRequest: Maybe<GitHub_PullRequest>;
};

/** Represents a Milestone object on a given repository. */
type GitHub_Milestone = GitHub_Node & GitHub_Closable & GitHub_UniformResourceLocatable & {
  /** `true` if the object is closed (definition of closed may depend on type) */
  readonly closed: Scalars['Boolean'];
  /** Identifies the date and time when the object was closed. */
  readonly closedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the actor who created the milestone. */
  readonly creator: Maybe<GitHub_Actor>;
  /** Identifies the description of the milestone. */
  readonly description: Maybe<Scalars['String']>;
  /** Identifies the due date of the milestone. */
  readonly dueOn: Maybe<Scalars['GitHub_DateTime']>;
  readonly id: Scalars['ID'];
  /** Just for debugging on review-lab */
  readonly issuePrioritiesDebug: Scalars['String'];
  /** A list of issues associated with the milestone. */
  readonly issues: GitHub_IssueConnection;
  /** Identifies the number of the milestone. */
  readonly number: Scalars['Int'];
  /** A list of pull requests associated with the milestone. */
  readonly pullRequests: GitHub_PullRequestConnection;
  /** The repository associated with this milestone. */
  readonly repository: GitHub_Repository;
  /** The HTTP path for this milestone */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** Identifies the state of the milestone. */
  readonly state: GitHub_MilestoneState;
  /** Identifies the title of the milestone. */
  readonly title: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL for this milestone */
  readonly url: Scalars['GitHub_URI'];
};


/** Represents a Milestone object on a given repository. */
type GitHub_Milestone_issuesArgs = {
  orderBy: Maybe<GitHub_IssueOrder>;
  labels: Maybe<ReadonlyArray<Scalars['String']>>;
  states: Maybe<ReadonlyArray<GitHub_IssueState>>;
  filterBy: Maybe<GitHub_IssueFilters>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** Represents a Milestone object on a given repository. */
type GitHub_Milestone_pullRequestsArgs = {
  states: Maybe<ReadonlyArray<GitHub_PullRequestState>>;
  labels: Maybe<ReadonlyArray<Scalars['String']>>;
  headRefName: Maybe<Scalars['String']>;
  baseRefName: Maybe<Scalars['String']>;
  orderBy: Maybe<GitHub_IssueOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The connection type for Milestone. */
type GitHub_MilestoneConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_MilestoneEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Milestone>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** Represents a 'milestoned' event on a given issue or pull request. */
type GitHub_MilestonedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** Identifies the milestone title associated with the 'milestoned' event. */
  readonly milestoneTitle: Scalars['String'];
  /** Object referenced by event. */
  readonly subject: GitHub_MilestoneItem;
};

/** An edge in a connection. */
type GitHub_MilestoneEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_Milestone>;
};

/** Types that can be inside a Milestone. */
type GitHub_MilestoneItem = GitHub_Issue | GitHub_PullRequest;

/** Ordering options for milestone connections. */
type GitHub_MilestoneOrder = {
  /** The field to order milestones by. */
  readonly field: GitHub_MilestoneOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which milestone connections can be ordered. */
enum GitHub_MilestoneOrderField {
  /** Order milestones by when they are due. */
  DUE_DATE = 'DUE_DATE',
  /** Order milestones by when they were created. */
  CREATED_AT = 'CREATED_AT',
  /** Order milestones by when they were last updated. */
  UPDATED_AT = 'UPDATED_AT',
  /** Order milestones by their number. */
  NUMBER = 'NUMBER'
}

/** The possible states of a milestone. */
enum GitHub_MilestoneState {
  /** A milestone that is still open. */
  OPEN = 'OPEN',
  /** A milestone that has been closed. */
  CLOSED = 'CLOSED'
}

/** Entities that can be minimized. */
type GitHub_Minimizable = {
  /** Returns whether or not a comment has been minimized. */
  readonly isMinimized: Scalars['Boolean'];
  /** Returns why the comment was minimized. */
  readonly minimizedReason: Maybe<Scalars['String']>;
  /** Check if the current viewer can minimize this object. */
  readonly viewerCanMinimize: Scalars['Boolean'];
};

/** Autogenerated input type of MinimizeComment */
type GitHub_MinimizeCommentInput = {
  /** The Node ID of the subject to modify. */
  readonly subjectId: Scalars['ID'];
  /** The classification of comment */
  readonly classifier: GitHub_ReportedContentClassifiers;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of MinimizeComment */
type GitHub_MinimizeCommentPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The comment that was minimized. */
  readonly minimizedComment: Maybe<GitHub_Minimizable>;
};

/** Represents a 'moved_columns_in_project' event on a given issue or pull request. */
type GitHub_MovedColumnsInProjectEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  readonly id: Scalars['ID'];
};

/** Autogenerated input type of MoveProjectCard */
type GitHub_MoveProjectCardInput = {
  /** The id of the card to move. */
  readonly cardId: Scalars['ID'];
  /** The id of the column to move it into. */
  readonly columnId: Scalars['ID'];
  /** Place the new card after the card with this id. Pass null to place it at the top. */
  readonly afterCardId: Maybe<Scalars['ID']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of MoveProjectCard */
type GitHub_MoveProjectCardPayload = {
  /** The new edge of the moved card. */
  readonly cardEdge: Maybe<GitHub_ProjectCardEdge>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated input type of MoveProjectColumn */
type GitHub_MoveProjectColumnInput = {
  /** The id of the column to move. */
  readonly columnId: Scalars['ID'];
  /** Place the new column after the column with this id. Pass null to place it at the front. */
  readonly afterColumnId: Maybe<Scalars['ID']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of MoveProjectColumn */
type GitHub_MoveProjectColumnPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The new edge of the moved column. */
  readonly columnEdge: Maybe<GitHub_ProjectColumnEdge>;
};

/** An object with an ID. */
type GitHub_Node = {
  /** ID of the object. */
  readonly id: Scalars['ID'];
};

/** Metadata for an audit entry with action oauth_application.* */
type GitHub_OauthApplicationAuditEntryData = {
  /** The name of the OAuth Application. */
  readonly oauthApplicationName: Maybe<Scalars['String']>;
  /** The HTTP path for the OAuth Application */
  readonly oauthApplicationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the OAuth Application */
  readonly oauthApplicationUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a oauth_application.create event. */
type GitHub_OauthApplicationCreateAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OauthApplicationAuditEntryData & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The application URL of the OAuth Application. */
  readonly applicationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The callback URL of the OAuth Application. */
  readonly callbackUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The name of the OAuth Application. */
  readonly oauthApplicationName: Maybe<Scalars['String']>;
  /** The HTTP path for the OAuth Application */
  readonly oauthApplicationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the OAuth Application */
  readonly oauthApplicationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The rate limit of the OAuth Application. */
  readonly rateLimit: Maybe<Scalars['Int']>;
  /** The state of the OAuth Application. */
  readonly state: Maybe<GitHub_OauthApplicationCreateAuditEntryState>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** The state of an OAuth Application when it was created. */
enum GitHub_OauthApplicationCreateAuditEntryState {
  /** The OAuth Application was active and allowed to have OAuth Accesses. */
  ACTIVE = 'ACTIVE',
  /** The OAuth Application was suspended from generating OAuth Accesses due to abuse or security concerns. */
  SUSPENDED = 'SUSPENDED',
  /** The OAuth Application was in the process of being deleted. */
  PENDING_DELETION = 'PENDING_DELETION'
}

/** The corresponding operation type for the action */
enum GitHub_OperationType {
  /** An existing resource was accessed */
  ACCESS = 'ACCESS',
  /** A resource performed an authentication event */
  AUTHENTICATION = 'AUTHENTICATION',
  /** A new resource was created */
  CREATE = 'CREATE',
  /** An existing resource was modified */
  MODIFY = 'MODIFY',
  /** An existing resource was removed */
  REMOVE = 'REMOVE',
  /** An existing resource was restored */
  RESTORE = 'RESTORE',
  /** An existing resource was transferred between multiple resources */
  TRANSFER = 'TRANSFER'
}

/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
enum GitHub_OrderDirection {
  /** Specifies an ascending order for a given `orderBy` argument. */
  ASC = 'ASC',
  /** Specifies a descending order for a given `orderBy` argument. */
  DESC = 'DESC'
}

/** Audit log entry for a org.add_billing_manager */
type GitHub_OrgAddBillingManagerAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The email address used to invite a billing manager for the organization. */
  readonly invitationEmail: Maybe<Scalars['String']>;
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a org.add_member */
type GitHub_OrgAddMemberAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The permission level of the member added to the organization. */
  readonly permission: Maybe<GitHub_OrgAddMemberAuditEntryPermission>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** The permissions available to members on an Organization. */
enum GitHub_OrgAddMemberAuditEntryPermission {
  /** Can read and clone repositories. */
  READ = 'READ',
  /** Can read, clone, push, and add collaborators to repositories. */
  ADMIN = 'ADMIN'
}

/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
type GitHub_Organization = GitHub_Node & GitHub_Actor & GitHub_PackageOwner & GitHub_ProjectOwner & GitHub_RepositoryOwner & GitHub_UniformResourceLocatable & GitHub_MemberStatusable & GitHub_ProfileOwner & GitHub_Sponsorable & {
  /** Determine if this repository owner has any items that can be pinned to their profile. */
  readonly anyPinnableItems: Scalars['Boolean'];
  /** Audit log entries of the organization */
  readonly auditLog: GitHub_OrganizationAuditEntryConnection;
  /** A URL pointing to the organization's public avatar. */
  readonly avatarUrl: Scalars['GitHub_URI'];
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** The organization's public profile description. */
  readonly description: Maybe<Scalars['String']>;
  /** The organization's public profile description rendered to HTML. */
  readonly descriptionHTML: Maybe<Scalars['String']>;
  /** The organization's public email. */
  readonly email: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  /** The setting value for whether the organization has an IP allow list enabled. */
  readonly ipAllowListEnabledSetting: GitHub_IpAllowListEnabledSettingValue;
  /** The IP addresses that are allowed to access resources owned by the organization. */
  readonly ipAllowListEntries: GitHub_IpAllowListEntryConnection;
  /** Whether the organization has verified its profile email and website. */
  readonly isVerified: Scalars['Boolean'];
  /**
   * Showcases a selection of repositories and gists that the profile owner has
   * either curated or that have been selected automatically based on popularity.
   */
  readonly itemShowcase: GitHub_ProfileItemShowcase;
  /** The organization's public profile location. */
  readonly location: Maybe<Scalars['String']>;
  /** The organization's login name. */
  readonly login: Scalars['String'];
  /** Get the status messages members of this entity have set that are either public or visible only to the organization. */
  readonly memberStatuses: GitHub_UserStatusConnection;
  /** A list of users who are members of this organization. */
  readonly membersWithRole: GitHub_OrganizationMemberConnection;
  /** The organization's public profile name. */
  readonly name: Maybe<Scalars['String']>;
  /** The HTTP path creating a new team */
  readonly newTeamResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL creating a new team */
  readonly newTeamUrl: Scalars['GitHub_URI'];
  /** The billing email for the organization. */
  readonly organizationBillingEmail: Maybe<Scalars['String']>;
  /** A list of packages under the owner. */
  readonly packages: GitHub_PackageConnection;
  /** A list of users who have been invited to join this organization. */
  readonly pendingMembers: GitHub_UserConnection;
  /** A list of repositories and gists this profile owner can pin to their profile. */
  readonly pinnableItems: GitHub_PinnableItemConnection;
  /** A list of repositories and gists this profile owner has pinned to their profile */
  readonly pinnedItems: GitHub_PinnableItemConnection;
  /** Returns how many more items this profile owner can pin to their profile. */
  readonly pinnedItemsRemaining: Scalars['Int'];
  /** Find project by number. */
  readonly project: Maybe<GitHub_Project>;
  /** A list of projects under the owner. */
  readonly projects: GitHub_ProjectConnection;
  /** The HTTP path listing organization's projects */
  readonly projectsResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL listing organization's projects */
  readonly projectsUrl: Scalars['GitHub_URI'];
  /** A list of repositories that the user owns. */
  readonly repositories: GitHub_RepositoryConnection;
  /** Find Repository. */
  readonly repository: Maybe<GitHub_Repository>;
  /**
   * When true the organization requires all members, billing managers, and outside
   * collaborators to enable two-factor authentication.
   */
  readonly requiresTwoFactorAuthentication: Maybe<Scalars['Boolean']>;
  /** The HTTP path for this organization. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The Organization's SAML identity providers */
  readonly samlIdentityProvider: Maybe<GitHub_OrganizationIdentityProvider>;
  /** The GitHub Sponsors listing for this user. */
  readonly sponsorsListing: Maybe<GitHub_SponsorsListing>;
  /** This object's sponsorships as the maintainer. */
  readonly sponsorshipsAsMaintainer: GitHub_SponsorshipConnection;
  /** This object's sponsorships as the sponsor. */
  readonly sponsorshipsAsSponsor: GitHub_SponsorshipConnection;
  /** Find an organization's team by its slug. */
  readonly team: Maybe<GitHub_Team>;
  /** A list of teams in this organization. */
  readonly teams: GitHub_TeamConnection;
  /** The HTTP path listing organization's teams */
  readonly teamsResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL listing organization's teams */
  readonly teamsUrl: Scalars['GitHub_URI'];
  /** The organization's Twitter username. */
  readonly twitterUsername: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL for this organization. */
  readonly url: Scalars['GitHub_URI'];
  /** Organization is adminable by the viewer. */
  readonly viewerCanAdminister: Scalars['Boolean'];
  /** Can the viewer pin repositories and gists to the profile? */
  readonly viewerCanChangePinnedItems: Scalars['Boolean'];
  /** Can the current viewer create new projects on this owner. */
  readonly viewerCanCreateProjects: Scalars['Boolean'];
  /** Viewer can create repositories on this organization */
  readonly viewerCanCreateRepositories: Scalars['Boolean'];
  /** Viewer can create teams on this organization. */
  readonly viewerCanCreateTeams: Scalars['Boolean'];
  /** Viewer is an active member of this organization. */
  readonly viewerIsAMember: Scalars['Boolean'];
  /** The organization's public profile URL. */
  readonly websiteUrl: Maybe<Scalars['GitHub_URI']>;
};


/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
type GitHub_Organization_anyPinnableItemsArgs = {
  type: Maybe<GitHub_PinnableItemType>;
};


/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
type GitHub_Organization_auditLogArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  query: Maybe<Scalars['String']>;
  orderBy?: Maybe<GitHub_AuditLogOrder>;
};


/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
type GitHub_Organization_avatarUrlArgs = {
  size: Maybe<Scalars['Int']>;
};


/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
type GitHub_Organization_ipAllowListEntriesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy?: Maybe<GitHub_IpAllowListEntryOrder>;
};


/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
type GitHub_Organization_memberStatusesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy?: Maybe<GitHub_UserStatusOrder>;
};


/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
type GitHub_Organization_membersWithRoleArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
type GitHub_Organization_packagesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  names: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  repositoryId: Maybe<Scalars['ID']>;
  packageType: Maybe<GitHub_PackageType>;
  orderBy?: Maybe<GitHub_PackageOrder>;
};


/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
type GitHub_Organization_pendingMembersArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
type GitHub_Organization_pinnableItemsArgs = {
  types: Maybe<ReadonlyArray<GitHub_PinnableItemType>>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
type GitHub_Organization_pinnedItemsArgs = {
  types: Maybe<ReadonlyArray<GitHub_PinnableItemType>>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
type GitHub_Organization_projectArgs = {
  number: Scalars['Int'];
};


/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
type GitHub_Organization_projectsArgs = {
  orderBy: Maybe<GitHub_ProjectOrder>;
  search: Maybe<Scalars['String']>;
  states: Maybe<ReadonlyArray<GitHub_ProjectState>>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
type GitHub_Organization_repositoriesArgs = {
  privacy: Maybe<GitHub_RepositoryPrivacy>;
  orderBy: Maybe<GitHub_RepositoryOrder>;
  affiliations: Maybe<ReadonlyArray<Maybe<GitHub_RepositoryAffiliation>>>;
  ownerAffiliations?: Maybe<ReadonlyArray<Maybe<GitHub_RepositoryAffiliation>>>;
  isLocked: Maybe<Scalars['Boolean']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  isFork: Maybe<Scalars['Boolean']>;
};


/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
type GitHub_Organization_repositoryArgs = {
  name: Scalars['String'];
};


/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
type GitHub_Organization_sponsorshipsAsMaintainerArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  includePrivate?: Maybe<Scalars['Boolean']>;
  orderBy: Maybe<GitHub_SponsorshipOrder>;
};


/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
type GitHub_Organization_sponsorshipsAsSponsorArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<GitHub_SponsorshipOrder>;
};


/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
type GitHub_Organization_teamArgs = {
  slug: Scalars['String'];
};


/** An account on GitHub, with one or more owners, that has repositories, members and teams. */
type GitHub_Organization_teamsArgs = {
  privacy: Maybe<GitHub_TeamPrivacy>;
  role: Maybe<GitHub_TeamRole>;
  query: Maybe<Scalars['String']>;
  userLogins: Maybe<ReadonlyArray<Scalars['String']>>;
  orderBy: Maybe<GitHub_TeamOrder>;
  ldapMapped: Maybe<Scalars['Boolean']>;
  rootTeamsOnly?: Maybe<Scalars['Boolean']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** An audit entry in an organization audit log. */
type GitHub_OrganizationAuditEntry = GitHub_MembersCanDeleteReposClearAuditEntry | GitHub_MembersCanDeleteReposDisableAuditEntry | GitHub_MembersCanDeleteReposEnableAuditEntry | GitHub_OauthApplicationCreateAuditEntry | GitHub_OrgAddBillingManagerAuditEntry | GitHub_OrgAddMemberAuditEntry | GitHub_OrgBlockUserAuditEntry | GitHub_OrgConfigDisableCollaboratorsOnlyAuditEntry | GitHub_OrgConfigEnableCollaboratorsOnlyAuditEntry | GitHub_OrgCreateAuditEntry | GitHub_OrgDisableOauthAppRestrictionsAuditEntry | GitHub_OrgDisableSamlAuditEntry | GitHub_OrgDisableTwoFactorRequirementAuditEntry | GitHub_OrgEnableOauthAppRestrictionsAuditEntry | GitHub_OrgEnableSamlAuditEntry | GitHub_OrgEnableTwoFactorRequirementAuditEntry | GitHub_OrgInviteMemberAuditEntry | GitHub_OrgInviteToBusinessAuditEntry | GitHub_OrgOauthAppAccessApprovedAuditEntry | GitHub_OrgOauthAppAccessDeniedAuditEntry | GitHub_OrgOauthAppAccessRequestedAuditEntry | GitHub_OrgRemoveBillingManagerAuditEntry | GitHub_OrgRemoveMemberAuditEntry | GitHub_OrgRemoveOutsideCollaboratorAuditEntry | GitHub_OrgRestoreMemberAuditEntry | GitHub_OrgUnblockUserAuditEntry | GitHub_OrgUpdateDefaultRepositoryPermissionAuditEntry | GitHub_OrgUpdateMemberAuditEntry | GitHub_OrgUpdateMemberRepositoryCreationPermissionAuditEntry | GitHub_OrgUpdateMemberRepositoryInvitationPermissionAuditEntry | GitHub_PrivateRepositoryForkingDisableAuditEntry | GitHub_PrivateRepositoryForkingEnableAuditEntry | GitHub_RepoAccessAuditEntry | GitHub_RepoAddMemberAuditEntry | GitHub_RepoAddTopicAuditEntry | GitHub_RepoArchivedAuditEntry | GitHub_RepoChangeMergeSettingAuditEntry | GitHub_RepoConfigDisableAnonymousGitAccessAuditEntry | GitHub_RepoConfigDisableCollaboratorsOnlyAuditEntry | GitHub_RepoConfigDisableContributorsOnlyAuditEntry | GitHub_RepoConfigDisableSockpuppetDisallowedAuditEntry | GitHub_RepoConfigEnableAnonymousGitAccessAuditEntry | GitHub_RepoConfigEnableCollaboratorsOnlyAuditEntry | GitHub_RepoConfigEnableContributorsOnlyAuditEntry | GitHub_RepoConfigEnableSockpuppetDisallowedAuditEntry | GitHub_RepoConfigLockAnonymousGitAccessAuditEntry | GitHub_RepoConfigUnlockAnonymousGitAccessAuditEntry | GitHub_RepoCreateAuditEntry | GitHub_RepoDestroyAuditEntry | GitHub_RepoRemoveMemberAuditEntry | GitHub_RepoRemoveTopicAuditEntry | GitHub_RepositoryVisibilityChangeDisableAuditEntry | GitHub_RepositoryVisibilityChangeEnableAuditEntry | GitHub_TeamAddMemberAuditEntry | GitHub_TeamAddRepositoryAuditEntry | GitHub_TeamChangeParentTeamAuditEntry | GitHub_TeamRemoveMemberAuditEntry | GitHub_TeamRemoveRepositoryAuditEntry;

/** The connection type for OrganizationAuditEntry. */
type GitHub_OrganizationAuditEntryConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_OrganizationAuditEntryEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_OrganizationAuditEntry>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** Metadata for an audit entry with action org.* */
type GitHub_OrganizationAuditEntryData = {
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
};

/** An edge in a connection. */
type GitHub_OrganizationAuditEntryEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_OrganizationAuditEntry>;
};

/** The connection type for Organization. */
type GitHub_OrganizationConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_OrganizationEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Organization>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_OrganizationEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_Organization>;
};

/** An Identity Provider configured to provision SAML and SCIM identities for Organizations */
type GitHub_OrganizationIdentityProvider = GitHub_Node & {
  /** The digest algorithm used to sign SAML requests for the Identity Provider. */
  readonly digestMethod: Maybe<Scalars['GitHub_URI']>;
  /** External Identities provisioned by this Identity Provider */
  readonly externalIdentities: GitHub_ExternalIdentityConnection;
  readonly id: Scalars['ID'];
  /** The x509 certificate used by the Identity Provder to sign assertions and responses. */
  readonly idpCertificate: Maybe<Scalars['GitHub_X509Certificate']>;
  /** The Issuer Entity ID for the SAML Identity Provider */
  readonly issuer: Maybe<Scalars['String']>;
  /** Organization this Identity Provider belongs to */
  readonly organization: Maybe<GitHub_Organization>;
  /** The signature algorithm used to sign SAML requests for the Identity Provider. */
  readonly signatureMethod: Maybe<Scalars['GitHub_URI']>;
  /** The URL endpoint for the Identity Provider's SAML SSO. */
  readonly ssoUrl: Maybe<Scalars['GitHub_URI']>;
};


/** An Identity Provider configured to provision SAML and SCIM identities for Organizations */
type GitHub_OrganizationIdentityProvider_externalIdentitiesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** An Invitation for a user to an organization. */
type GitHub_OrganizationInvitation = GitHub_Node & {
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** The email address of the user invited to the organization. */
  readonly email: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  /** The type of invitation that was sent (e.g. email, user). */
  readonly invitationType: GitHub_OrganizationInvitationType;
  /** The user who was invited to the organization. */
  readonly invitee: Maybe<GitHub_User>;
  /** The user who created the invitation. */
  readonly inviter: GitHub_User;
  /** The organization the invite is for */
  readonly organization: GitHub_Organization;
  /** The user's pending role in the organization (e.g. member, owner). */
  readonly role: GitHub_OrganizationInvitationRole;
};

/** The connection type for OrganizationInvitation. */
type GitHub_OrganizationInvitationConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_OrganizationInvitationEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_OrganizationInvitation>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_OrganizationInvitationEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_OrganizationInvitation>;
};

/** The possible organization invitation roles. */
enum GitHub_OrganizationInvitationRole {
  /** The user is invited to be a direct member of the organization. */
  DIRECT_MEMBER = 'DIRECT_MEMBER',
  /** The user is invited to be an admin of the organization. */
  ADMIN = 'ADMIN',
  /** The user is invited to be a billing manager of the organization. */
  BILLING_MANAGER = 'BILLING_MANAGER',
  /** The user's previous role will be reinstated. */
  REINSTATE = 'REINSTATE'
}

/** The possible organization invitation types. */
enum GitHub_OrganizationInvitationType {
  /** The invitation was to an existing user. */
  USER = 'USER',
  /** The invitation was to an email address. */
  EMAIL = 'EMAIL'
}

/** The connection type for User. */
type GitHub_OrganizationMemberConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_OrganizationMemberEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_User>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** Represents a user within an organization. */
type GitHub_OrganizationMemberEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** Whether the organization member has two factor enabled or not. Returns null if information is not available to viewer. */
  readonly hasTwoFactorEnabled: Maybe<Scalars['Boolean']>;
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_User>;
  /** The role this user has in the organization. */
  readonly role: Maybe<GitHub_OrganizationMemberRole>;
};

/** The possible roles within an organization for its members. */
enum GitHub_OrganizationMemberRole {
  /** The user is a member of the organization. */
  MEMBER = 'MEMBER',
  /** The user is an administrator of the organization. */
  ADMIN = 'ADMIN'
}

/** The possible values for the members can create repositories setting on an organization. */
enum GitHub_OrganizationMembersCanCreateRepositoriesSettingValue {
  /** Members will be able to create public and private repositories. */
  ALL = 'ALL',
  /** Members will be able to create only private repositories. */
  PRIVATE = 'PRIVATE',
  /** Members will not be able to create public or private repositories. */
  DISABLED = 'DISABLED'
}

/** Ordering options for organization connections. */
type GitHub_OrganizationOrder = {
  /** The field to order organizations by. */
  readonly field: GitHub_OrganizationOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which organization connections can be ordered. */
enum GitHub_OrganizationOrderField {
  /** Order organizations by creation time */
  CREATED_AT = 'CREATED_AT',
  /** Order organizations by login */
  LOGIN = 'LOGIN'
}

/** An organization list hovercard context */
type GitHub_OrganizationsHovercardContext = GitHub_HovercardContext & {
  /** A string describing this context */
  readonly message: Scalars['String'];
  /** An octicon to accompany this context */
  readonly octicon: Scalars['String'];
  /** Organizations this user is a member of that are relevant */
  readonly relevantOrganizations: GitHub_OrganizationConnection;
  /** The total number of organizations this user is in */
  readonly totalOrganizationCount: Scalars['Int'];
};


/** An organization list hovercard context */
type GitHub_OrganizationsHovercardContext_relevantOrganizationsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** An organization teams hovercard context */
type GitHub_OrganizationTeamsHovercardContext = GitHub_HovercardContext & {
  /** A string describing this context */
  readonly message: Scalars['String'];
  /** An octicon to accompany this context */
  readonly octicon: Scalars['String'];
  /** Teams in this organization the user is a member of that are relevant */
  readonly relevantTeams: GitHub_TeamConnection;
  /** The path for the full team list for this user */
  readonly teamsResourcePath: Scalars['GitHub_URI'];
  /** The URL for the full team list for this user */
  readonly teamsUrl: Scalars['GitHub_URI'];
  /** The total number of teams the user is on in the organization */
  readonly totalTeamCount: Scalars['Int'];
};


/** An organization teams hovercard context */
type GitHub_OrganizationTeamsHovercardContext_relevantTeamsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** Audit log entry for a org.block_user */
type GitHub_OrgBlockUserAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The blocked user. */
  readonly blockedUser: Maybe<GitHub_User>;
  /** The username of the blocked user. */
  readonly blockedUserName: Maybe<Scalars['String']>;
  /** The HTTP path for the blocked user. */
  readonly blockedUserResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the blocked user. */
  readonly blockedUserUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a org.config.disable_collaborators_only event. */
type GitHub_OrgConfigDisableCollaboratorsOnlyAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a org.config.enable_collaborators_only event. */
type GitHub_OrgConfigEnableCollaboratorsOnlyAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a org.create event. */
type GitHub_OrgCreateAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The billing plan for the Organization. */
  readonly billingPlan: Maybe<GitHub_OrgCreateAuditEntryBillingPlan>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** The billing plans available for organizations. */
enum GitHub_OrgCreateAuditEntryBillingPlan {
  /** Free Plan */
  FREE = 'FREE',
  /** Team Plan */
  BUSINESS = 'BUSINESS',
  /** Enterprise Cloud Plan */
  BUSINESS_PLUS = 'BUSINESS_PLUS',
  /** Legacy Unlimited Plan */
  UNLIMITED = 'UNLIMITED',
  /** Tiered Per Seat Plan */
  TIERED_PER_SEAT = 'TIERED_PER_SEAT'
}

/** Audit log entry for a org.disable_oauth_app_restrictions event. */
type GitHub_OrgDisableOauthAppRestrictionsAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a org.disable_saml event. */
type GitHub_OrgDisableSamlAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  /** The SAML provider's digest algorithm URL. */
  readonly digestMethodUrl: Maybe<Scalars['GitHub_URI']>;
  readonly id: Scalars['ID'];
  /** The SAML provider's issuer URL. */
  readonly issuerUrl: Maybe<Scalars['GitHub_URI']>;
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The SAML provider's signature algorithm URL. */
  readonly signatureMethodUrl: Maybe<Scalars['GitHub_URI']>;
  /** The SAML provider's single sign-on URL. */
  readonly singleSignOnUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a org.disable_two_factor_requirement event. */
type GitHub_OrgDisableTwoFactorRequirementAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a org.enable_oauth_app_restrictions event. */
type GitHub_OrgEnableOauthAppRestrictionsAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a org.enable_saml event. */
type GitHub_OrgEnableSamlAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  /** The SAML provider's digest algorithm URL. */
  readonly digestMethodUrl: Maybe<Scalars['GitHub_URI']>;
  readonly id: Scalars['ID'];
  /** The SAML provider's issuer URL. */
  readonly issuerUrl: Maybe<Scalars['GitHub_URI']>;
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The SAML provider's signature algorithm URL. */
  readonly signatureMethodUrl: Maybe<Scalars['GitHub_URI']>;
  /** The SAML provider's single sign-on URL. */
  readonly singleSignOnUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a org.enable_two_factor_requirement event. */
type GitHub_OrgEnableTwoFactorRequirementAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a org.invite_member event. */
type GitHub_OrgInviteMemberAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  /** The email address of the organization invitation. */
  readonly email: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The organization invitation. */
  readonly organizationInvitation: Maybe<GitHub_OrganizationInvitation>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a org.invite_to_business event. */
type GitHub_OrgInviteToBusinessAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_EnterpriseAuditEntryData & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  /** The HTTP path for this enterprise. */
  readonly enterpriseResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The slug of the enterprise. */
  readonly enterpriseSlug: Maybe<Scalars['String']>;
  /** The HTTP URL for this enterprise. */
  readonly enterpriseUrl: Maybe<Scalars['GitHub_URI']>;
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a org.oauth_app_access_approved event. */
type GitHub_OrgOauthAppAccessApprovedAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OauthApplicationAuditEntryData & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The name of the OAuth Application. */
  readonly oauthApplicationName: Maybe<Scalars['String']>;
  /** The HTTP path for the OAuth Application */
  readonly oauthApplicationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the OAuth Application */
  readonly oauthApplicationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a org.oauth_app_access_denied event. */
type GitHub_OrgOauthAppAccessDeniedAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OauthApplicationAuditEntryData & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The name of the OAuth Application. */
  readonly oauthApplicationName: Maybe<Scalars['String']>;
  /** The HTTP path for the OAuth Application */
  readonly oauthApplicationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the OAuth Application */
  readonly oauthApplicationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a org.oauth_app_access_requested event. */
type GitHub_OrgOauthAppAccessRequestedAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OauthApplicationAuditEntryData & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The name of the OAuth Application. */
  readonly oauthApplicationName: Maybe<Scalars['String']>;
  /** The HTTP path for the OAuth Application */
  readonly oauthApplicationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the OAuth Application */
  readonly oauthApplicationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a org.remove_billing_manager event. */
type GitHub_OrgRemoveBillingManagerAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The reason for the billing manager being removed. */
  readonly reason: Maybe<GitHub_OrgRemoveBillingManagerAuditEntryReason>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** The reason a billing manager was removed from an Organization. */
enum GitHub_OrgRemoveBillingManagerAuditEntryReason {
  /** The organization required 2FA of its billing managers and this user did not have 2FA enabled. */
  TWO_FACTOR_REQUIREMENT_NON_COMPLIANCE = 'TWO_FACTOR_REQUIREMENT_NON_COMPLIANCE',
  /** SAML external identity missing */
  SAML_EXTERNAL_IDENTITY_MISSING = 'SAML_EXTERNAL_IDENTITY_MISSING',
  /** SAML SSO enforcement requires an external identity */
  SAML_SSO_ENFORCEMENT_REQUIRES_EXTERNAL_IDENTITY = 'SAML_SSO_ENFORCEMENT_REQUIRES_EXTERNAL_IDENTITY'
}

/** Audit log entry for a org.remove_member event. */
type GitHub_OrgRemoveMemberAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The types of membership the member has with the organization. */
  readonly membershipTypes: Maybe<ReadonlyArray<GitHub_OrgRemoveMemberAuditEntryMembershipType>>;
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The reason for the member being removed. */
  readonly reason: Maybe<GitHub_OrgRemoveMemberAuditEntryReason>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** The type of membership a user has with an Organization. */
enum GitHub_OrgRemoveMemberAuditEntryMembershipType {
  /** A direct member is a user that is a member of the Organization. */
  DIRECT_MEMBER = 'DIRECT_MEMBER',
  /**
   * Organization administrators have full access and can change several settings,
   * including the names of repositories that belong to the Organization and Owners
   * team membership. In addition, organization admins can delete the organization
   * and all of its repositories.
   */
  ADMIN = 'ADMIN',
  /** A billing manager is a user who manages the billing settings for the Organization, such as updating payment information. */
  BILLING_MANAGER = 'BILLING_MANAGER',
  /**
   * An unaffiliated collaborator is a person who is not a member of the
   * Organization and does not have access to any repositories in the Organization.
   */
  UNAFFILIATED = 'UNAFFILIATED',
  /**
   * An outside collaborator is a person who isn't explicitly a member of the
   * Organization, but who has Read, Write, or Admin permissions to one or more
   * repositories in the organization.
   */
  OUTSIDE_COLLABORATOR = 'OUTSIDE_COLLABORATOR'
}

/** The reason a member was removed from an Organization. */
enum GitHub_OrgRemoveMemberAuditEntryReason {
  /** The organization required 2FA of its billing managers and this user did not have 2FA enabled. */
  TWO_FACTOR_REQUIREMENT_NON_COMPLIANCE = 'TWO_FACTOR_REQUIREMENT_NON_COMPLIANCE',
  /** SAML external identity missing */
  SAML_EXTERNAL_IDENTITY_MISSING = 'SAML_EXTERNAL_IDENTITY_MISSING',
  /** SAML SSO enforcement requires an external identity */
  SAML_SSO_ENFORCEMENT_REQUIRES_EXTERNAL_IDENTITY = 'SAML_SSO_ENFORCEMENT_REQUIRES_EXTERNAL_IDENTITY',
  /** User account has been deleted */
  USER_ACCOUNT_DELETED = 'USER_ACCOUNT_DELETED',
  /** User was removed from organization during account recovery */
  TWO_FACTOR_ACCOUNT_RECOVERY = 'TWO_FACTOR_ACCOUNT_RECOVERY'
}

/** Audit log entry for a org.remove_outside_collaborator event. */
type GitHub_OrgRemoveOutsideCollaboratorAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The types of membership the outside collaborator has with the organization. */
  readonly membershipTypes: Maybe<ReadonlyArray<GitHub_OrgRemoveOutsideCollaboratorAuditEntryMembershipType>>;
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The reason for the outside collaborator being removed from the Organization. */
  readonly reason: Maybe<GitHub_OrgRemoveOutsideCollaboratorAuditEntryReason>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** The type of membership a user has with an Organization. */
enum GitHub_OrgRemoveOutsideCollaboratorAuditEntryMembershipType {
  /**
   * An outside collaborator is a person who isn't explicitly a member of the
   * Organization, but who has Read, Write, or Admin permissions to one or more
   * repositories in the organization.
   */
  OUTSIDE_COLLABORATOR = 'OUTSIDE_COLLABORATOR',
  /**
   * An unaffiliated collaborator is a person who is not a member of the
   * Organization and does not have access to any repositories in the organization.
   */
  UNAFFILIATED = 'UNAFFILIATED',
  /** A billing manager is a user who manages the billing settings for the Organization, such as updating payment information. */
  BILLING_MANAGER = 'BILLING_MANAGER'
}

/** The reason an outside collaborator was removed from an Organization. */
enum GitHub_OrgRemoveOutsideCollaboratorAuditEntryReason {
  /** The organization required 2FA of its billing managers and this user did not have 2FA enabled. */
  TWO_FACTOR_REQUIREMENT_NON_COMPLIANCE = 'TWO_FACTOR_REQUIREMENT_NON_COMPLIANCE',
  /** SAML external identity missing */
  SAML_EXTERNAL_IDENTITY_MISSING = 'SAML_EXTERNAL_IDENTITY_MISSING'
}

/** Audit log entry for a org.restore_member event. */
type GitHub_OrgRestoreMemberAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The number of custom email routings for the restored member. */
  readonly restoredCustomEmailRoutingsCount: Maybe<Scalars['Int']>;
  /** The number of issue assignemnts for the restored member. */
  readonly restoredIssueAssignmentsCount: Maybe<Scalars['Int']>;
  /** Restored organization membership objects. */
  readonly restoredMemberships: Maybe<ReadonlyArray<GitHub_OrgRestoreMemberAuditEntryMembership>>;
  /** The number of restored memberships. */
  readonly restoredMembershipsCount: Maybe<Scalars['Int']>;
  /** The number of repositories of the restored member. */
  readonly restoredRepositoriesCount: Maybe<Scalars['Int']>;
  /** The number of starred repositories for the restored member. */
  readonly restoredRepositoryStarsCount: Maybe<Scalars['Int']>;
  /** The number of watched repositories for the restored member. */
  readonly restoredRepositoryWatchesCount: Maybe<Scalars['Int']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Types of memberships that can be restored for an Organization member. */
type GitHub_OrgRestoreMemberAuditEntryMembership = GitHub_OrgRestoreMemberMembershipOrganizationAuditEntryData | GitHub_OrgRestoreMemberMembershipRepositoryAuditEntryData | GitHub_OrgRestoreMemberMembershipTeamAuditEntryData;

/** Metadata for an organization membership for org.restore_member actions */
type GitHub_OrgRestoreMemberMembershipOrganizationAuditEntryData = GitHub_OrganizationAuditEntryData & {
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Metadata for a repository membership for org.restore_member actions */
type GitHub_OrgRestoreMemberMembershipRepositoryAuditEntryData = GitHub_RepositoryAuditEntryData & {
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Metadata for a team membership for org.restore_member actions */
type GitHub_OrgRestoreMemberMembershipTeamAuditEntryData = GitHub_TeamAuditEntryData & {
  /** The team associated with the action */
  readonly team: Maybe<GitHub_Team>;
  /** The name of the team */
  readonly teamName: Maybe<Scalars['String']>;
  /** The HTTP path for this team */
  readonly teamResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for this team */
  readonly teamUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a org.unblock_user */
type GitHub_OrgUnblockUserAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user being unblocked by the organization. */
  readonly blockedUser: Maybe<GitHub_User>;
  /** The username of the blocked user. */
  readonly blockedUserName: Maybe<Scalars['String']>;
  /** The HTTP path for the blocked user. */
  readonly blockedUserResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the blocked user. */
  readonly blockedUserUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a org.update_default_repository_permission */
type GitHub_OrgUpdateDefaultRepositoryPermissionAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The new default repository permission level for the organization. */
  readonly permission: Maybe<GitHub_OrgUpdateDefaultRepositoryPermissionAuditEntryPermission>;
  /** The former default repository permission level for the organization. */
  readonly permissionWas: Maybe<GitHub_OrgUpdateDefaultRepositoryPermissionAuditEntryPermission>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** The default permission a repository can have in an Organization. */
enum GitHub_OrgUpdateDefaultRepositoryPermissionAuditEntryPermission {
  /** Can read and clone repositories. */
  READ = 'READ',
  /** Can read, clone and push to repositories. */
  WRITE = 'WRITE',
  /** Can read, clone, push, and add collaborators to repositories. */
  ADMIN = 'ADMIN',
  /** No default permission value. */
  NONE = 'NONE'
}

/** Audit log entry for a org.update_member event. */
type GitHub_OrgUpdateMemberAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The new member permission level for the organization. */
  readonly permission: Maybe<GitHub_OrgUpdateMemberAuditEntryPermission>;
  /** The former member permission level for the organization. */
  readonly permissionWas: Maybe<GitHub_OrgUpdateMemberAuditEntryPermission>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** The permissions available to members on an Organization. */
enum GitHub_OrgUpdateMemberAuditEntryPermission {
  /** Can read and clone repositories. */
  READ = 'READ',
  /** Can read, clone, push, and add collaborators to repositories. */
  ADMIN = 'ADMIN'
}

/** Audit log entry for a org.update_member_repository_creation_permission event. */
type GitHub_OrgUpdateMemberRepositoryCreationPermissionAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** Can members create repositories in the organization. */
  readonly canCreateRepositories: Maybe<Scalars['Boolean']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
  /** The permission for visibility level of repositories for this organization. */
  readonly visibility: Maybe<GitHub_OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility>;
};

/** The permissions available for repository creation on an Organization. */
enum GitHub_OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility {
  /** All organization members are restricted from creating any repositories. */
  ALL = 'ALL',
  /** All organization members are restricted from creating public repositories. */
  PUBLIC = 'PUBLIC'
}

/** Audit log entry for a org.update_member_repository_invitation_permission event. */
type GitHub_OrgUpdateMemberRepositoryInvitationPermissionAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** Can outside collaborators be invited to repositories in the organization. */
  readonly canInviteOutsideCollaboratorsToRepositories: Maybe<Scalars['Boolean']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Information for an uploaded package. */
type GitHub_Package = GitHub_Node & {
  readonly id: Scalars['ID'];
  /** Find the latest version for the package. */
  readonly latestVersion: Maybe<GitHub_PackageVersion>;
  /** Identifies the name of the package. */
  readonly name: Scalars['String'];
  /** Identifies the type of the package. */
  readonly packageType: GitHub_PackageType;
  /** The repository this package belongs to. */
  readonly repository: Maybe<GitHub_Repository>;
  /** Statistics about package activity. */
  readonly statistics: Maybe<GitHub_PackageStatistics>;
  /** Find package version by version string. */
  readonly version: Maybe<GitHub_PackageVersion>;
  /** list of versions for this package */
  readonly versions: GitHub_PackageVersionConnection;
};


/** Information for an uploaded package. */
type GitHub_Package_versionArgs = {
  version: Scalars['String'];
};


/** Information for an uploaded package. */
type GitHub_Package_versionsArgs = {
  orderBy?: Maybe<GitHub_PackageVersionOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The connection type for Package. */
type GitHub_PackageConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_PackageEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Package>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_PackageEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_Package>;
};

/** A file in a package version. */
type GitHub_PackageFile = GitHub_Node & {
  readonly id: Scalars['ID'];
  /** MD5 hash of the file. */
  readonly md5: Maybe<Scalars['String']>;
  /** Name of the file. */
  readonly name: Scalars['String'];
  /** The package version this file belongs to. */
  readonly packageVersion: Maybe<GitHub_PackageVersion>;
  /** SHA1 hash of the file. */
  readonly sha1: Maybe<Scalars['String']>;
  /** SHA256 hash of the file. */
  readonly sha256: Maybe<Scalars['String']>;
  /** Size of the file in bytes. */
  readonly size: Maybe<Scalars['Int']>;
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** URL to download the asset. */
  readonly url: Maybe<Scalars['GitHub_URI']>;
};

/** The connection type for PackageFile. */
type GitHub_PackageFileConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_PackageFileEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_PackageFile>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_PackageFileEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_PackageFile>;
};

/** Ways in which lists of package files can be ordered upon return. */
type GitHub_PackageFileOrder = {
  /** The field in which to order package files by. */
  readonly field: Maybe<GitHub_PackageFileOrderField>;
  /** The direction in which to order package files by the specified field. */
  readonly direction: Maybe<GitHub_OrderDirection>;
};

/** Properties by which package file connections can be ordered. */
enum GitHub_PackageFileOrderField {
  /** Order package files by creation time */
  CREATED_AT = 'CREATED_AT'
}

/** Ways in which lists of packages can be ordered upon return. */
type GitHub_PackageOrder = {
  /** The field in which to order packages by. */
  readonly field: Maybe<GitHub_PackageOrderField>;
  /** The direction in which to order packages by the specified field. */
  readonly direction: Maybe<GitHub_OrderDirection>;
};

/** Properties by which package connections can be ordered. */
enum GitHub_PackageOrderField {
  /** Order packages by creation time */
  CREATED_AT = 'CREATED_AT'
}

/** Represents an owner of a package. */
type GitHub_PackageOwner = {
  readonly id: Scalars['ID'];
  /** A list of packages under the owner. */
  readonly packages: GitHub_PackageConnection;
};


/** Represents an owner of a package. */
type GitHub_PackageOwner_packagesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  names: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  repositoryId: Maybe<Scalars['ID']>;
  packageType: Maybe<GitHub_PackageType>;
  orderBy?: Maybe<GitHub_PackageOrder>;
};

/** Represents a object that contains package activity statistics such as downloads. */
type GitHub_PackageStatistics = {
  /** Number of times the package was downloaded since it was created. */
  readonly downloadsTotalCount: Scalars['Int'];
};

/** A version tag contains the mapping between a tag name and a version. */
type GitHub_PackageTag = GitHub_Node & {
  readonly id: Scalars['ID'];
  /** Identifies the tag name of the version. */
  readonly name: Scalars['String'];
  /** Version that the tag is associated with. */
  readonly version: Maybe<GitHub_PackageVersion>;
};

/** The possible types of a package. */
enum GitHub_PackageType {
  /** An npm package. */
  NPM = 'NPM',
  /** A rubygems package. */
  RUBYGEMS = 'RUBYGEMS',
  /** A maven package. */
  MAVEN = 'MAVEN',
  /** A docker image. */
  DOCKER = 'DOCKER',
  /** A debian package. */
  DEBIAN = 'DEBIAN',
  /** A nuget package. */
  NUGET = 'NUGET',
  /** A python package. */
  PYPI = 'PYPI'
}

/** Information about a specific package version. */
type GitHub_PackageVersion = GitHub_Node & {
  /** List of files associated with this package version */
  readonly files: GitHub_PackageFileConnection;
  readonly id: Scalars['ID'];
  /** The package associated with this version. */
  readonly package: Maybe<GitHub_Package>;
  /** The platform this version was built for. */
  readonly platform: Maybe<Scalars['String']>;
  /** Whether or not this version is a pre-release. */
  readonly preRelease: Scalars['Boolean'];
  /** The README of this package version. */
  readonly readme: Maybe<Scalars['String']>;
  /** The release associated with this package version. */
  readonly release: Maybe<GitHub_Release>;
  /** Statistics about package activity. */
  readonly statistics: Maybe<GitHub_PackageVersionStatistics>;
  /** The package version summary. */
  readonly summary: Maybe<Scalars['String']>;
  /** The version string. */
  readonly version: Scalars['String'];
};


/** Information about a specific package version. */
type GitHub_PackageVersion_filesArgs = {
  orderBy?: Maybe<GitHub_PackageFileOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The connection type for PackageVersion. */
type GitHub_PackageVersionConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_PackageVersionEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_PackageVersion>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_PackageVersionEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_PackageVersion>;
};

/** Ways in which lists of package versions can be ordered upon return. */
type GitHub_PackageVersionOrder = {
  /** The field in which to order package versions by. */
  readonly field: Maybe<GitHub_PackageVersionOrderField>;
  /** The direction in which to order package versions by the specified field. */
  readonly direction: Maybe<GitHub_OrderDirection>;
};

/** Properties by which package version connections can be ordered. */
enum GitHub_PackageVersionOrderField {
  /** Order package versions by creation time */
  CREATED_AT = 'CREATED_AT'
}

/** Represents a object that contains package version activity statistics such as downloads. */
type GitHub_PackageVersionStatistics = {
  /** Number of times the package was downloaded since it was created. */
  readonly downloadsTotalCount: Scalars['Int'];
};

/** Information about pagination in a connection. */
type GitHub_PageInfo = {
  /** When paginating forwards, the cursor to continue. */
  readonly endCursor: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  readonly hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  readonly hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  readonly startCursor: Maybe<Scalars['String']>;
};

/** Types that can grant permissions on a repository to a user */
type GitHub_PermissionGranter = GitHub_Organization | GitHub_Repository | GitHub_Team;

/** A level of permission and source for a user's access to a repository. */
type GitHub_PermissionSource = {
  /** The organization the repository belongs to. */
  readonly organization: GitHub_Organization;
  /** The level of access this source has granted to the user. */
  readonly permission: GitHub_DefaultRepositoryPermissionField;
  /** The source of this permission. */
  readonly source: GitHub_PermissionGranter;
};

/** Types that can be pinned to a profile page. */
type GitHub_PinnableItem = GitHub_Gist | GitHub_Repository;

/** The connection type for PinnableItem. */
type GitHub_PinnableItemConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_PinnableItemEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_PinnableItem>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_PinnableItemEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_PinnableItem>;
};

/** Represents items that can be pinned to a profile page or dashboard. */
enum GitHub_PinnableItemType {
  /** A repository. */
  REPOSITORY = 'REPOSITORY',
  /** A gist. */
  GIST = 'GIST',
  /** An issue. */
  ISSUE = 'ISSUE',
  /** A project. */
  PROJECT = 'PROJECT',
  /** A pull request. */
  PULL_REQUEST = 'PULL_REQUEST',
  /** A user. */
  USER = 'USER',
  /** An organization. */
  ORGANIZATION = 'ORGANIZATION',
  /** A team. */
  TEAM = 'TEAM'
}

/** Represents a 'pinned' event on a given issue or pull request. */
type GitHub_PinnedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** Identifies the issue associated with the event. */
  readonly issue: GitHub_Issue;
};


/** Audit log entry for a private_repository_forking.disable event. */
type GitHub_PrivateRepositoryForkingDisableAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_EnterpriseAuditEntryData & GitHub_OrganizationAuditEntryData & GitHub_RepositoryAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  /** The HTTP path for this enterprise. */
  readonly enterpriseResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The slug of the enterprise. */
  readonly enterpriseSlug: Maybe<Scalars['String']>;
  /** The HTTP URL for this enterprise. */
  readonly enterpriseUrl: Maybe<Scalars['GitHub_URI']>;
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a private_repository_forking.enable event. */
type GitHub_PrivateRepositoryForkingEnableAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_EnterpriseAuditEntryData & GitHub_OrganizationAuditEntryData & GitHub_RepositoryAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  /** The HTTP path for this enterprise. */
  readonly enterpriseResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The slug of the enterprise. */
  readonly enterpriseSlug: Maybe<Scalars['String']>;
  /** The HTTP URL for this enterprise. */
  readonly enterpriseUrl: Maybe<Scalars['GitHub_URI']>;
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/**
 * A curatable list of repositories relating to a repository owner, which defaults
 * to showing the most popular repositories they own.
 */
type GitHub_ProfileItemShowcase = {
  /** Whether or not the owner has pinned any repositories or gists. */
  readonly hasPinnedItems: Scalars['Boolean'];
  /**
   * The repositories and gists in the showcase. If the profile owner has any
   * pinned items, those will be returned. Otherwise, the profile owner's popular
   * repositories will be returned.
   */
  readonly items: GitHub_PinnableItemConnection;
};


/**
 * A curatable list of repositories relating to a repository owner, which defaults
 * to showing the most popular repositories they own.
 */
type GitHub_ProfileItemShowcase_itemsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** Represents any entity on GitHub that has a profile page. */
type GitHub_ProfileOwner = {
  /** Determine if this repository owner has any items that can be pinned to their profile. */
  readonly anyPinnableItems: Scalars['Boolean'];
  /** The public profile email. */
  readonly email: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  /**
   * Showcases a selection of repositories and gists that the profile owner has
   * either curated or that have been selected automatically based on popularity.
   */
  readonly itemShowcase: GitHub_ProfileItemShowcase;
  /** The public profile location. */
  readonly location: Maybe<Scalars['String']>;
  /** The username used to login. */
  readonly login: Scalars['String'];
  /** The public profile name. */
  readonly name: Maybe<Scalars['String']>;
  /** A list of repositories and gists this profile owner can pin to their profile. */
  readonly pinnableItems: GitHub_PinnableItemConnection;
  /** A list of repositories and gists this profile owner has pinned to their profile */
  readonly pinnedItems: GitHub_PinnableItemConnection;
  /** Returns how many more items this profile owner can pin to their profile. */
  readonly pinnedItemsRemaining: Scalars['Int'];
  /** Can the viewer pin repositories and gists to the profile? */
  readonly viewerCanChangePinnedItems: Scalars['Boolean'];
  /** The public profile website URL. */
  readonly websiteUrl: Maybe<Scalars['GitHub_URI']>;
};


/** Represents any entity on GitHub that has a profile page. */
type GitHub_ProfileOwner_anyPinnableItemsArgs = {
  type: Maybe<GitHub_PinnableItemType>;
};


/** Represents any entity on GitHub that has a profile page. */
type GitHub_ProfileOwner_pinnableItemsArgs = {
  types: Maybe<ReadonlyArray<GitHub_PinnableItemType>>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** Represents any entity on GitHub that has a profile page. */
type GitHub_ProfileOwner_pinnedItemsArgs = {
  types: Maybe<ReadonlyArray<GitHub_PinnableItemType>>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** Projects manage issues, pull requests and notes within a project owner. */
type GitHub_Project = GitHub_Node & GitHub_Closable & GitHub_Updatable & {
  /** The project's description body. */
  readonly body: Maybe<Scalars['String']>;
  /** The projects description body rendered to HTML. */
  readonly bodyHTML: Scalars['GitHub_HTML'];
  /** `true` if the object is closed (definition of closed may depend on type) */
  readonly closed: Scalars['Boolean'];
  /** Identifies the date and time when the object was closed. */
  readonly closedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** List of columns in the project */
  readonly columns: GitHub_ProjectColumnConnection;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** The actor who originally created the project. */
  readonly creator: Maybe<GitHub_Actor>;
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  readonly id: Scalars['ID'];
  /** The project's name. */
  readonly name: Scalars['String'];
  /** The project's number. */
  readonly number: Scalars['Int'];
  /** The project's owner. Currently limited to repositories, organizations, and users. */
  readonly owner: GitHub_ProjectOwner;
  /** List of pending cards in this project */
  readonly pendingCards: GitHub_ProjectCardConnection;
  /** The HTTP path for this project */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** Whether the project is open or closed. */
  readonly state: GitHub_ProjectState;
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL for this project */
  readonly url: Scalars['GitHub_URI'];
  /** Check if the current viewer can update this object. */
  readonly viewerCanUpdate: Scalars['Boolean'];
};


/** Projects manage issues, pull requests and notes within a project owner. */
type GitHub_Project_columnsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** Projects manage issues, pull requests and notes within a project owner. */
type GitHub_Project_pendingCardsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  archivedStates?: Maybe<ReadonlyArray<Maybe<GitHub_ProjectCardArchivedState>>>;
};

/** A card in a project. */
type GitHub_ProjectCard = GitHub_Node & {
  /**
   * The project column this card is associated under. A card may only belong to one
   * project column at a time. The column field will be null if the card is created
   * in a pending state and has yet to be associated with a column. Once cards are
   * associated with a column, they will not become pending in the future.
   */
  readonly column: Maybe<GitHub_ProjectColumn>;
  /** The card content item */
  readonly content: Maybe<GitHub_ProjectCardItem>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** The actor who created this card */
  readonly creator: Maybe<GitHub_Actor>;
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  readonly id: Scalars['ID'];
  /** Whether the card is archived */
  readonly isArchived: Scalars['Boolean'];
  /** The card note */
  readonly note: Maybe<Scalars['String']>;
  /** The project that contains this card. */
  readonly project: GitHub_Project;
  /** The HTTP path for this card */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The state of ProjectCard */
  readonly state: Maybe<GitHub_ProjectCardState>;
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL for this card */
  readonly url: Scalars['GitHub_URI'];
};

/** The possible archived states of a project card. */
enum GitHub_ProjectCardArchivedState {
  /** A project card that is archived */
  ARCHIVED = 'ARCHIVED',
  /** A project card that is not archived */
  NOT_ARCHIVED = 'NOT_ARCHIVED'
}

/** The connection type for ProjectCard. */
type GitHub_ProjectCardConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_ProjectCardEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_ProjectCard>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_ProjectCardEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_ProjectCard>;
};

/** Types that can be inside Project Cards. */
type GitHub_ProjectCardItem = GitHub_Issue | GitHub_PullRequest;

/** Various content states of a ProjectCard */
enum GitHub_ProjectCardState {
  /** The card has content only. */
  CONTENT_ONLY = 'CONTENT_ONLY',
  /** The card has a note only. */
  NOTE_ONLY = 'NOTE_ONLY',
  /** The card is redacted. */
  REDACTED = 'REDACTED'
}

/** A column inside a project. */
type GitHub_ProjectColumn = GitHub_Node & {
  /** List of cards in the column */
  readonly cards: GitHub_ProjectCardConnection;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  readonly id: Scalars['ID'];
  /** The project column's name. */
  readonly name: Scalars['String'];
  /** The project that contains this column. */
  readonly project: GitHub_Project;
  /** The semantic purpose of the column */
  readonly purpose: Maybe<GitHub_ProjectColumnPurpose>;
  /** The HTTP path for this project column */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL for this project column */
  readonly url: Scalars['GitHub_URI'];
};


/** A column inside a project. */
type GitHub_ProjectColumn_cardsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  archivedStates?: Maybe<ReadonlyArray<Maybe<GitHub_ProjectCardArchivedState>>>;
};

/** The connection type for ProjectColumn. */
type GitHub_ProjectColumnConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_ProjectColumnEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_ProjectColumn>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_ProjectColumnEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_ProjectColumn>;
};

/** The semantic purpose of the column - todo, in progress, or done. */
enum GitHub_ProjectColumnPurpose {
  /** The column contains cards still to be worked on */
  TODO = 'TODO',
  /** The column contains cards which are currently being worked on */
  IN_PROGRESS = 'IN_PROGRESS',
  /** The column contains cards which are complete */
  DONE = 'DONE'
}

/** A list of projects associated with the owner. */
type GitHub_ProjectConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_ProjectEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Project>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_ProjectEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_Project>;
};

/** Ways in which lists of projects can be ordered upon return. */
type GitHub_ProjectOrder = {
  /** The field in which to order projects by. */
  readonly field: GitHub_ProjectOrderField;
  /** The direction in which to order projects by the specified field. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which project connections can be ordered. */
enum GitHub_ProjectOrderField {
  /** Order projects by creation time */
  CREATED_AT = 'CREATED_AT',
  /** Order projects by update time */
  UPDATED_AT = 'UPDATED_AT',
  /** Order projects by name */
  NAME = 'NAME'
}

/** Represents an owner of a Project. */
type GitHub_ProjectOwner = {
  readonly id: Scalars['ID'];
  /** Find project by number. */
  readonly project: Maybe<GitHub_Project>;
  /** A list of projects under the owner. */
  readonly projects: GitHub_ProjectConnection;
  /** The HTTP path listing owners projects */
  readonly projectsResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL listing owners projects */
  readonly projectsUrl: Scalars['GitHub_URI'];
  /** Can the current viewer create new projects on this owner. */
  readonly viewerCanCreateProjects: Scalars['Boolean'];
};


/** Represents an owner of a Project. */
type GitHub_ProjectOwner_projectArgs = {
  number: Scalars['Int'];
};


/** Represents an owner of a Project. */
type GitHub_ProjectOwner_projectsArgs = {
  orderBy: Maybe<GitHub_ProjectOrder>;
  search: Maybe<Scalars['String']>;
  states: Maybe<ReadonlyArray<GitHub_ProjectState>>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** State of the project; either 'open' or 'closed' */
enum GitHub_ProjectState {
  /** The project is open. */
  OPEN = 'OPEN',
  /** The project is closed. */
  CLOSED = 'CLOSED'
}

/** GitHub-provided templates for Projects */
enum GitHub_ProjectTemplate {
  /** Create a board with columns for To do, In progress and Done. */
  BASIC_KANBAN = 'BASIC_KANBAN',
  /** Create a board with v2 triggers to automatically move cards across To do, In progress and Done columns. */
  AUTOMATED_KANBAN_V2 = 'AUTOMATED_KANBAN_V2',
  /** Create a board with triggers to automatically move cards across columns with review automation. */
  AUTOMATED_REVIEWS_KANBAN = 'AUTOMATED_REVIEWS_KANBAN',
  /** Create a board to triage and prioritize bugs with To do, priority, and Done columns. */
  BUG_TRIAGE = 'BUG_TRIAGE'
}

/** A user's public key. */
type GitHub_PublicKey = GitHub_Node & {
  /** The last time this authorization was used to perform an action. Values will be null for keys not owned by the user. */
  readonly accessedAt: Maybe<Scalars['GitHub_DateTime']>;
  /**
   * Identifies the date and time when the key was created. Keys created before
   * March 5th, 2014 have inaccurate values. Values will be null for keys not owned by the user.
   */
  readonly createdAt: Maybe<Scalars['GitHub_DateTime']>;
  /** The fingerprint for this PublicKey. */
  readonly fingerprint: Scalars['String'];
  readonly id: Scalars['ID'];
  /** Whether this PublicKey is read-only or not. Values will be null for keys not owned by the user. */
  readonly isReadOnly: Maybe<Scalars['Boolean']>;
  /** The public key string. */
  readonly key: Scalars['String'];
  /**
   * Identifies the date and time when the key was updated. Keys created before
   * March 5th, 2014 may have inaccurate values. Values will be null for keys not
   * owned by the user.
   */
  readonly updatedAt: Maybe<Scalars['GitHub_DateTime']>;
};

/** The connection type for PublicKey. */
type GitHub_PublicKeyConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_PublicKeyEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_PublicKey>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_PublicKeyEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_PublicKey>;
};

/** A repository pull request. */
type GitHub_PullRequest = GitHub_Node & GitHub_Assignable & GitHub_Closable & GitHub_Comment & GitHub_Updatable & GitHub_UpdatableComment & GitHub_Labelable & GitHub_Lockable & GitHub_Reactable & GitHub_RepositoryNode & GitHub_Subscribable & GitHub_UniformResourceLocatable & {
  /** Reason that the conversation was locked. */
  readonly activeLockReason: Maybe<GitHub_LockReason>;
  /** The number of additions in this pull request. */
  readonly additions: Scalars['Int'];
  /** A list of Users assigned to this object. */
  readonly assignees: GitHub_UserConnection;
  /** The actor who authored the comment. */
  readonly author: Maybe<GitHub_Actor>;
  /** Author's association with the subject of the comment. */
  readonly authorAssociation: GitHub_CommentAuthorAssociation;
  /** Identifies the base Ref associated with the pull request. */
  readonly baseRef: Maybe<GitHub_Ref>;
  /** Identifies the name of the base Ref associated with the pull request, even if the ref has been deleted. */
  readonly baseRefName: Scalars['String'];
  /** Identifies the oid of the base ref associated with the pull request, even if the ref has been deleted. */
  readonly baseRefOid: Scalars['GitHub_GitObjectID'];
  /** The repository associated with this pull request's base Ref. */
  readonly baseRepository: Maybe<GitHub_Repository>;
  /** The body as Markdown. */
  readonly body: Scalars['String'];
  /** The body rendered to HTML. */
  readonly bodyHTML: Scalars['GitHub_HTML'];
  /** The body rendered to text. */
  readonly bodyText: Scalars['String'];
  /** The number of changed files in this pull request. */
  readonly changedFiles: Scalars['Int'];
  /** The HTTP path for the checks of this pull request. */
  readonly checksResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for the checks of this pull request. */
  readonly checksUrl: Scalars['GitHub_URI'];
  /** `true` if the pull request is closed */
  readonly closed: Scalars['Boolean'];
  /** Identifies the date and time when the object was closed. */
  readonly closedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** A list of comments associated with the pull request. */
  readonly comments: GitHub_IssueCommentConnection;
  /** A list of commits present in this pull request's head branch not present in the base branch. */
  readonly commits: GitHub_PullRequestCommitConnection;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Check if this comment was created via an email reply. */
  readonly createdViaEmail: Scalars['Boolean'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** The number of deletions in this pull request. */
  readonly deletions: Scalars['Int'];
  /** The actor who edited this pull request's body. */
  readonly editor: Maybe<GitHub_Actor>;
  /** Lists the files changed within this pull request. */
  readonly files: Maybe<GitHub_PullRequestChangedFileConnection>;
  /** Identifies the head Ref associated with the pull request. */
  readonly headRef: Maybe<GitHub_Ref>;
  /** Identifies the name of the head Ref associated with the pull request, even if the ref has been deleted. */
  readonly headRefName: Scalars['String'];
  /** Identifies the oid of the head ref associated with the pull request, even if the ref has been deleted. */
  readonly headRefOid: Scalars['GitHub_GitObjectID'];
  /** The repository associated with this pull request's head Ref. */
  readonly headRepository: Maybe<GitHub_Repository>;
  /** The owner of the repository associated with this pull request's head Ref. */
  readonly headRepositoryOwner: Maybe<GitHub_RepositoryOwner>;
  /** The hovercard information for this issue */
  readonly hovercard: GitHub_Hovercard;
  readonly id: Scalars['ID'];
  /** Check if this comment was edited and includes an edit with the creation data */
  readonly includesCreatedEdit: Scalars['Boolean'];
  /** The head and base repositories are different. */
  readonly isCrossRepository: Scalars['Boolean'];
  /** Identifies if the pull request is a draft. */
  readonly isDraft: Scalars['Boolean'];
  /** A list of labels associated with the object. */
  readonly labels: Maybe<GitHub_LabelConnection>;
  /** The moment the editor made the last edit */
  readonly lastEditedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** `true` if the pull request is locked */
  readonly locked: Scalars['Boolean'];
  /** Indicates whether maintainers can modify the pull request. */
  readonly maintainerCanModify: Scalars['Boolean'];
  /** The commit that was created when this pull request was merged. */
  readonly mergeCommit: Maybe<GitHub_Commit>;
  /** Whether or not the pull request can be merged based on the existence of merge conflicts. */
  readonly mergeable: GitHub_MergeableState;
  /** Whether or not the pull request was merged. */
  readonly merged: Scalars['Boolean'];
  /** The date and time that the pull request was merged. */
  readonly mergedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** The actor who merged the pull request. */
  readonly mergedBy: Maybe<GitHub_Actor>;
  /** Identifies the milestone associated with the pull request. */
  readonly milestone: Maybe<GitHub_Milestone>;
  /** Identifies the pull request number. */
  readonly number: Scalars['Int'];
  /** A list of Users that are participating in the Pull Request conversation. */
  readonly participants: GitHub_UserConnection;
  /** The permalink to the pull request. */
  readonly permalink: Scalars['GitHub_URI'];
  /**
   * The commit that GitHub automatically generated to test if this pull request
   * could be merged. This field will not return a value if the pull request is
   * merged, or if the test merge commit is still being generated. See the
   * `mergeable` field for more details on the mergeability of the pull request.
   */
  readonly potentialMergeCommit: Maybe<GitHub_Commit>;
  /** List of project cards associated with this pull request. */
  readonly projectCards: GitHub_ProjectCardConnection;
  /** Identifies when the comment was published at. */
  readonly publishedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** A list of reactions grouped by content left on the subject. */
  readonly reactionGroups: Maybe<ReadonlyArray<GitHub_ReactionGroup>>;
  /** A list of Reactions left on the Issue. */
  readonly reactions: GitHub_ReactionConnection;
  /** The repository associated with this node. */
  readonly repository: GitHub_Repository;
  /** The HTTP path for this pull request. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The HTTP path for reverting this pull request. */
  readonly revertResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for reverting this pull request. */
  readonly revertUrl: Scalars['GitHub_URI'];
  /** The current status of this pull request with respect to code review. */
  readonly reviewDecision: Maybe<GitHub_PullRequestReviewDecision>;
  /** A list of review requests associated with the pull request. */
  readonly reviewRequests: Maybe<GitHub_ReviewRequestConnection>;
  /** The list of all review threads for this pull request. */
  readonly reviewThreads: GitHub_PullRequestReviewThreadConnection;
  /** A list of reviews associated with the pull request. */
  readonly reviews: Maybe<GitHub_PullRequestReviewConnection>;
  /** Identifies the state of the pull request. */
  readonly state: GitHub_PullRequestState;
  /** A list of reviewer suggestions based on commit history and past review comments. */
  readonly suggestedReviewers: ReadonlyArray<Maybe<GitHub_SuggestedReviewer>>;
  /**
   * A list of events, comments, commits, etc. associated with the pull request.
   * @deprecated `timeline` will be removed Use PullRequest.timelineItems instead. Removal on 2020-10-01 UTC.
   */
  readonly timeline: GitHub_PullRequestTimelineConnection;
  /** A list of events, comments, commits, etc. associated with the pull request. */
  readonly timelineItems: GitHub_PullRequestTimelineItemsConnection;
  /** Identifies the pull request title. */
  readonly title: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL for this pull request. */
  readonly url: Scalars['GitHub_URI'];
  /** A list of edits to this content. */
  readonly userContentEdits: Maybe<GitHub_UserContentEditConnection>;
  /** Whether or not the viewer can apply suggestion. */
  readonly viewerCanApplySuggestion: Scalars['Boolean'];
  /** Can user react to this subject */
  readonly viewerCanReact: Scalars['Boolean'];
  /** Check if the viewer is able to change their subscription status for the repository. */
  readonly viewerCanSubscribe: Scalars['Boolean'];
  /** Check if the current viewer can update this object. */
  readonly viewerCanUpdate: Scalars['Boolean'];
  /** Reasons why the current viewer can not update this comment. */
  readonly viewerCannotUpdateReasons: ReadonlyArray<GitHub_CommentCannotUpdateReason>;
  /** Did the viewer author this comment. */
  readonly viewerDidAuthor: Scalars['Boolean'];
  /** Identifies if the viewer is watching, not watching, or ignoring the subscribable entity. */
  readonly viewerSubscription: Maybe<GitHub_SubscriptionState>;
};


/** A repository pull request. */
type GitHub_PullRequest_assigneesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository pull request. */
type GitHub_PullRequest_commentsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository pull request. */
type GitHub_PullRequest_commitsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository pull request. */
type GitHub_PullRequest_filesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository pull request. */
type GitHub_PullRequest_hovercardArgs = {
  includeNotificationContexts?: Maybe<Scalars['Boolean']>;
};


/** A repository pull request. */
type GitHub_PullRequest_labelsArgs = {
  orderBy?: Maybe<GitHub_LabelOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository pull request. */
type GitHub_PullRequest_participantsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository pull request. */
type GitHub_PullRequest_projectCardsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  archivedStates?: Maybe<ReadonlyArray<Maybe<GitHub_ProjectCardArchivedState>>>;
};


/** A repository pull request. */
type GitHub_PullRequest_reactionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  content: Maybe<GitHub_ReactionContent>;
  orderBy: Maybe<GitHub_ReactionOrder>;
};


/** A repository pull request. */
type GitHub_PullRequest_reviewRequestsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository pull request. */
type GitHub_PullRequest_reviewThreadsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository pull request. */
type GitHub_PullRequest_reviewsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  states: Maybe<ReadonlyArray<GitHub_PullRequestReviewState>>;
  author: Maybe<Scalars['String']>;
};


/** A repository pull request. */
type GitHub_PullRequest_timelineArgs = {
  since: Maybe<Scalars['GitHub_DateTime']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository pull request. */
type GitHub_PullRequest_timelineItemsArgs = {
  since: Maybe<Scalars['GitHub_DateTime']>;
  skip: Maybe<Scalars['Int']>;
  itemTypes: Maybe<ReadonlyArray<GitHub_PullRequestTimelineItemsItemType>>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository pull request. */
type GitHub_PullRequest_userContentEditsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** A file changed in a pull request. */
type GitHub_PullRequestChangedFile = {
  /** The number of additions to the file. */
  readonly additions: Scalars['Int'];
  /** The number of deletions to the file. */
  readonly deletions: Scalars['Int'];
  /** The path of the file. */
  readonly path: Scalars['String'];
};

/** The connection type for PullRequestChangedFile. */
type GitHub_PullRequestChangedFileConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_PullRequestChangedFileEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_PullRequestChangedFile>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_PullRequestChangedFileEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_PullRequestChangedFile>;
};

/** Represents a Git commit part of a pull request. */
type GitHub_PullRequestCommit = GitHub_Node & GitHub_UniformResourceLocatable & {
  /** The Git commit object */
  readonly commit: GitHub_Commit;
  readonly id: Scalars['ID'];
  /** The pull request this commit belongs to */
  readonly pullRequest: GitHub_PullRequest;
  /** The HTTP path for this pull request commit */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this pull request commit */
  readonly url: Scalars['GitHub_URI'];
};

/** Represents a commit comment thread part of a pull request. */
type GitHub_PullRequestCommitCommentThread = GitHub_Node & GitHub_RepositoryNode & {
  /** The comments that exist in this thread. */
  readonly comments: GitHub_CommitCommentConnection;
  /** The commit the comments were made on. */
  readonly commit: GitHub_Commit;
  readonly id: Scalars['ID'];
  /** The file the comments were made on. */
  readonly path: Maybe<Scalars['String']>;
  /** The position in the diff for the commit that the comment was made on. */
  readonly position: Maybe<Scalars['Int']>;
  /** The pull request this commit comment thread belongs to */
  readonly pullRequest: GitHub_PullRequest;
  /** The repository associated with this node. */
  readonly repository: GitHub_Repository;
};


/** Represents a commit comment thread part of a pull request. */
type GitHub_PullRequestCommitCommentThread_commentsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The connection type for PullRequestCommit. */
type GitHub_PullRequestCommitConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_PullRequestCommitEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_PullRequestCommit>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_PullRequestCommitEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_PullRequestCommit>;
};

/** The connection type for PullRequest. */
type GitHub_PullRequestConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_PullRequestEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_PullRequest>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** This aggregates pull requests opened by a user within one repository. */
type GitHub_PullRequestContributionsByRepository = {
  /** The pull request contributions. */
  readonly contributions: GitHub_CreatedPullRequestContributionConnection;
  /** The repository in which the pull requests were opened. */
  readonly repository: GitHub_Repository;
};


/** This aggregates pull requests opened by a user within one repository. */
type GitHub_PullRequestContributionsByRepository_contributionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy?: Maybe<GitHub_ContributionOrder>;
};

/** An edge in a connection. */
type GitHub_PullRequestEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_PullRequest>;
};

/** Represents available types of methods to use when merging a pull request. */
enum GitHub_PullRequestMergeMethod {
  /** Add all commits from the head branch to the base branch with a merge commit. */
  MERGE = 'MERGE',
  /** Combine all commits from the head branch into a single commit in the base branch. */
  SQUASH = 'SQUASH',
  /** Add all commits from the head branch onto the base branch individually. */
  REBASE = 'REBASE'
}

/** Ways in which lists of issues can be ordered upon return. */
type GitHub_PullRequestOrder = {
  /** The field in which to order pull requests by. */
  readonly field: GitHub_PullRequestOrderField;
  /** The direction in which to order pull requests by the specified field. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which pull_requests connections can be ordered. */
enum GitHub_PullRequestOrderField {
  /** Order pull_requests by creation time */
  CREATED_AT = 'CREATED_AT',
  /** Order pull_requests by update time */
  UPDATED_AT = 'UPDATED_AT'
}

/** A review object for a given pull request. */
type GitHub_PullRequestReview = GitHub_Node & GitHub_Comment & GitHub_Deletable & GitHub_Updatable & GitHub_UpdatableComment & GitHub_Reactable & GitHub_RepositoryNode & {
  /** The actor who authored the comment. */
  readonly author: Maybe<GitHub_Actor>;
  /** Author's association with the subject of the comment. */
  readonly authorAssociation: GitHub_CommentAuthorAssociation;
  /** Identifies the pull request review body. */
  readonly body: Scalars['String'];
  /** The body rendered to HTML. */
  readonly bodyHTML: Scalars['GitHub_HTML'];
  /** The body of this review rendered as plain text. */
  readonly bodyText: Scalars['String'];
  /** A list of review comments for the current pull request review. */
  readonly comments: GitHub_PullRequestReviewCommentConnection;
  /** Identifies the commit associated with this pull request review. */
  readonly commit: Maybe<GitHub_Commit>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Check if this comment was created via an email reply. */
  readonly createdViaEmail: Scalars['Boolean'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** The actor who edited the comment. */
  readonly editor: Maybe<GitHub_Actor>;
  readonly id: Scalars['ID'];
  /** Check if this comment was edited and includes an edit with the creation data */
  readonly includesCreatedEdit: Scalars['Boolean'];
  /** The moment the editor made the last edit */
  readonly lastEditedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** A list of teams that this review was made on behalf of. */
  readonly onBehalfOf: GitHub_TeamConnection;
  /** Identifies when the comment was published at. */
  readonly publishedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** Identifies the pull request associated with this pull request review. */
  readonly pullRequest: GitHub_PullRequest;
  /** A list of reactions grouped by content left on the subject. */
  readonly reactionGroups: Maybe<ReadonlyArray<GitHub_ReactionGroup>>;
  /** A list of Reactions left on the Issue. */
  readonly reactions: GitHub_ReactionConnection;
  /** The repository associated with this node. */
  readonly repository: GitHub_Repository;
  /** The HTTP path permalink for this PullRequestReview. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** Identifies the current state of the pull request review. */
  readonly state: GitHub_PullRequestReviewState;
  /** Identifies when the Pull Request Review was submitted */
  readonly submittedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL permalink for this PullRequestReview. */
  readonly url: Scalars['GitHub_URI'];
  /** A list of edits to this content. */
  readonly userContentEdits: Maybe<GitHub_UserContentEditConnection>;
  /** Check if the current viewer can delete this object. */
  readonly viewerCanDelete: Scalars['Boolean'];
  /** Can user react to this subject */
  readonly viewerCanReact: Scalars['Boolean'];
  /** Check if the current viewer can update this object. */
  readonly viewerCanUpdate: Scalars['Boolean'];
  /** Reasons why the current viewer can not update this comment. */
  readonly viewerCannotUpdateReasons: ReadonlyArray<GitHub_CommentCannotUpdateReason>;
  /** Did the viewer author this comment. */
  readonly viewerDidAuthor: Scalars['Boolean'];
};


/** A review object for a given pull request. */
type GitHub_PullRequestReview_commentsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A review object for a given pull request. */
type GitHub_PullRequestReview_onBehalfOfArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A review object for a given pull request. */
type GitHub_PullRequestReview_reactionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  content: Maybe<GitHub_ReactionContent>;
  orderBy: Maybe<GitHub_ReactionOrder>;
};


/** A review object for a given pull request. */
type GitHub_PullRequestReview_userContentEditsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** A review comment associated with a given repository pull request. */
type GitHub_PullRequestReviewComment = GitHub_Node & GitHub_Comment & GitHub_Deletable & GitHub_Minimizable & GitHub_Updatable & GitHub_UpdatableComment & GitHub_Reactable & GitHub_RepositoryNode & {
  /** The actor who authored the comment. */
  readonly author: Maybe<GitHub_Actor>;
  /** Author's association with the subject of the comment. */
  readonly authorAssociation: GitHub_CommentAuthorAssociation;
  /** The comment body of this review comment. */
  readonly body: Scalars['String'];
  /** The body rendered to HTML. */
  readonly bodyHTML: Scalars['GitHub_HTML'];
  /** The comment body of this review comment rendered as plain text. */
  readonly bodyText: Scalars['String'];
  /** Identifies the commit associated with the comment. */
  readonly commit: Maybe<GitHub_Commit>;
  /** Identifies when the comment was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Check if this comment was created via an email reply. */
  readonly createdViaEmail: Scalars['Boolean'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** The diff hunk to which the comment applies. */
  readonly diffHunk: Scalars['String'];
  /** Identifies when the comment was created in a draft state. */
  readonly draftedAt: Scalars['GitHub_DateTime'];
  /** The actor who edited the comment. */
  readonly editor: Maybe<GitHub_Actor>;
  readonly id: Scalars['ID'];
  /** Check if this comment was edited and includes an edit with the creation data */
  readonly includesCreatedEdit: Scalars['Boolean'];
  /** Returns whether or not a comment has been minimized. */
  readonly isMinimized: Scalars['Boolean'];
  /** The moment the editor made the last edit */
  readonly lastEditedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** Returns why the comment was minimized. */
  readonly minimizedReason: Maybe<Scalars['String']>;
  /** Identifies the original commit associated with the comment. */
  readonly originalCommit: Maybe<GitHub_Commit>;
  /** The original line index in the diff to which the comment applies. */
  readonly originalPosition: Scalars['Int'];
  /** Identifies when the comment body is outdated */
  readonly outdated: Scalars['Boolean'];
  /** The path to which the comment applies. */
  readonly path: Scalars['String'];
  /** The line index in the diff to which the comment applies. */
  readonly position: Maybe<Scalars['Int']>;
  /** Identifies when the comment was published at. */
  readonly publishedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** The pull request associated with this review comment. */
  readonly pullRequest: GitHub_PullRequest;
  /** The pull request review associated with this review comment. */
  readonly pullRequestReview: Maybe<GitHub_PullRequestReview>;
  /** A list of reactions grouped by content left on the subject. */
  readonly reactionGroups: Maybe<ReadonlyArray<GitHub_ReactionGroup>>;
  /** A list of Reactions left on the Issue. */
  readonly reactions: GitHub_ReactionConnection;
  /** The comment this is a reply to. */
  readonly replyTo: Maybe<GitHub_PullRequestReviewComment>;
  /** The repository associated with this node. */
  readonly repository: GitHub_Repository;
  /** The HTTP path permalink for this review comment. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** Identifies the state of the comment. */
  readonly state: GitHub_PullRequestReviewCommentState;
  /** Identifies when the comment was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL permalink for this review comment. */
  readonly url: Scalars['GitHub_URI'];
  /** A list of edits to this content. */
  readonly userContentEdits: Maybe<GitHub_UserContentEditConnection>;
  /** Check if the current viewer can delete this object. */
  readonly viewerCanDelete: Scalars['Boolean'];
  /** Check if the current viewer can minimize this object. */
  readonly viewerCanMinimize: Scalars['Boolean'];
  /** Can user react to this subject */
  readonly viewerCanReact: Scalars['Boolean'];
  /** Check if the current viewer can update this object. */
  readonly viewerCanUpdate: Scalars['Boolean'];
  /** Reasons why the current viewer can not update this comment. */
  readonly viewerCannotUpdateReasons: ReadonlyArray<GitHub_CommentCannotUpdateReason>;
  /** Did the viewer author this comment. */
  readonly viewerDidAuthor: Scalars['Boolean'];
};


/** A review comment associated with a given repository pull request. */
type GitHub_PullRequestReviewComment_reactionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  content: Maybe<GitHub_ReactionContent>;
  orderBy: Maybe<GitHub_ReactionOrder>;
};


/** A review comment associated with a given repository pull request. */
type GitHub_PullRequestReviewComment_userContentEditsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The connection type for PullRequestReviewComment. */
type GitHub_PullRequestReviewCommentConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_PullRequestReviewCommentEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_PullRequestReviewComment>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_PullRequestReviewCommentEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_PullRequestReviewComment>;
};

/** The possible states of a pull request review comment. */
enum GitHub_PullRequestReviewCommentState {
  /** A comment that is part of a pending review */
  PENDING = 'PENDING',
  /** A comment that is part of a submitted review */
  SUBMITTED = 'SUBMITTED'
}

/** The connection type for PullRequestReview. */
type GitHub_PullRequestReviewConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_PullRequestReviewEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_PullRequestReview>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** This aggregates pull request reviews made by a user within one repository. */
type GitHub_PullRequestReviewContributionsByRepository = {
  /** The pull request review contributions. */
  readonly contributions: GitHub_CreatedPullRequestReviewContributionConnection;
  /** The repository in which the pull request reviews were made. */
  readonly repository: GitHub_Repository;
};


/** This aggregates pull request reviews made by a user within one repository. */
type GitHub_PullRequestReviewContributionsByRepository_contributionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy?: Maybe<GitHub_ContributionOrder>;
};

/** The review status of a pull request. */
enum GitHub_PullRequestReviewDecision {
  /** Changes have been requested on the pull request. */
  CHANGES_REQUESTED = 'CHANGES_REQUESTED',
  /** The pull request has received an approving review. */
  APPROVED = 'APPROVED',
  /** A review is required before the pull request can be merged. */
  REVIEW_REQUIRED = 'REVIEW_REQUIRED'
}

/** An edge in a connection. */
type GitHub_PullRequestReviewEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_PullRequestReview>;
};

/** The possible events to perform on a pull request review. */
enum GitHub_PullRequestReviewEvent {
  /** Submit general feedback without explicit approval. */
  COMMENT = 'COMMENT',
  /** Submit feedback and approve merging these changes. */
  APPROVE = 'APPROVE',
  /** Submit feedback that must be addressed before merging. */
  REQUEST_CHANGES = 'REQUEST_CHANGES',
  /** Dismiss review so it now longer effects merging. */
  DISMISS = 'DISMISS'
}

/** The possible states of a pull request review. */
enum GitHub_PullRequestReviewState {
  /** A review that has not yet been submitted. */
  PENDING = 'PENDING',
  /** An informational review. */
  COMMENTED = 'COMMENTED',
  /** A review allowing the pull request to merge. */
  APPROVED = 'APPROVED',
  /** A review blocking the pull request from merging. */
  CHANGES_REQUESTED = 'CHANGES_REQUESTED',
  /** A review that has been dismissed. */
  DISMISSED = 'DISMISSED'
}

/** A threaded list of comments for a given pull request. */
type GitHub_PullRequestReviewThread = GitHub_Node & {
  /** A list of pull request comments associated with the thread. */
  readonly comments: GitHub_PullRequestReviewCommentConnection;
  /** The side of the diff on which this thread was placed. */
  readonly diffSide: GitHub_DiffSide;
  readonly id: Scalars['ID'];
  /** Whether this thread has been resolved */
  readonly isResolved: Scalars['Boolean'];
  /** The line in the file to which this thread refers */
  readonly line: Maybe<Scalars['Int']>;
  /** The original line in the file to which this thread refers. */
  readonly originalLine: Maybe<Scalars['Int']>;
  /** The original start line in the file to which this thread refers (multi-line only). */
  readonly originalStartLine: Maybe<Scalars['Int']>;
  /** Identifies the pull request associated with this thread. */
  readonly pullRequest: GitHub_PullRequest;
  /** Identifies the repository associated with this thread. */
  readonly repository: GitHub_Repository;
  /** The user who resolved this thread */
  readonly resolvedBy: Maybe<GitHub_User>;
  /** The side of the diff that the first line of the thread starts on (multi-line only) */
  readonly startDiffSide: Maybe<GitHub_DiffSide>;
  /** The start line in the file to which this thread refers (multi-line only) */
  readonly startLine: Maybe<Scalars['Int']>;
  /** Whether or not the viewer can resolve this thread */
  readonly viewerCanResolve: Scalars['Boolean'];
  /** Whether or not the viewer can unresolve this thread */
  readonly viewerCanUnresolve: Scalars['Boolean'];
};


/** A threaded list of comments for a given pull request. */
type GitHub_PullRequestReviewThread_commentsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  skip: Maybe<Scalars['Int']>;
};

/** Review comment threads for a pull request review. */
type GitHub_PullRequestReviewThreadConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_PullRequestReviewThreadEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_PullRequestReviewThread>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_PullRequestReviewThreadEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_PullRequestReviewThread>;
};

/** Represents the latest point in the pull request timeline for which the viewer has seen the pull request's commits. */
type GitHub_PullRequestRevisionMarker = {
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** The last commit the viewer has seen. */
  readonly lastSeenCommit: GitHub_Commit;
  /** The pull request to which the marker belongs. */
  readonly pullRequest: GitHub_PullRequest;
};

/** The possible states of a pull request. */
enum GitHub_PullRequestState {
  /** A pull request that is still open. */
  OPEN = 'OPEN',
  /** A pull request that has been closed without being merged. */
  CLOSED = 'CLOSED',
  /** A pull request that has been closed by being merged. */
  MERGED = 'MERGED'
}

/** The connection type for PullRequestTimelineItem. */
type GitHub_PullRequestTimelineConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_PullRequestTimelineItemEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_PullRequestTimelineItem>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An item in an pull request timeline */
type GitHub_PullRequestTimelineItem = GitHub_AssignedEvent | GitHub_BaseRefForcePushedEvent | GitHub_ClosedEvent | GitHub_Commit | GitHub_CommitCommentThread | GitHub_CrossReferencedEvent | GitHub_DemilestonedEvent | GitHub_DeployedEvent | GitHub_DeploymentEnvironmentChangedEvent | GitHub_HeadRefDeletedEvent | GitHub_HeadRefForcePushedEvent | GitHub_HeadRefRestoredEvent | GitHub_IssueComment | GitHub_LabeledEvent | GitHub_LockedEvent | GitHub_MergedEvent | GitHub_MilestonedEvent | GitHub_PullRequestReview | GitHub_PullRequestReviewComment | GitHub_PullRequestReviewThread | GitHub_ReferencedEvent | GitHub_RenamedTitleEvent | GitHub_ReopenedEvent | GitHub_ReviewDismissedEvent | GitHub_ReviewRequestRemovedEvent | GitHub_ReviewRequestedEvent | GitHub_SubscribedEvent | GitHub_UnassignedEvent | GitHub_UnlabeledEvent | GitHub_UnlockedEvent | GitHub_UnsubscribedEvent | GitHub_UserBlockedEvent;

/** An edge in a connection. */
type GitHub_PullRequestTimelineItemEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_PullRequestTimelineItem>;
};

/** An item in a pull request timeline */
type GitHub_PullRequestTimelineItems = GitHub_AddedToProjectEvent | GitHub_AssignedEvent | GitHub_AutomaticBaseChangeFailedEvent | GitHub_AutomaticBaseChangeSucceededEvent | GitHub_BaseRefChangedEvent | GitHub_BaseRefForcePushedEvent | GitHub_ClosedEvent | GitHub_CommentDeletedEvent | GitHub_ConnectedEvent | GitHub_ConvertToDraftEvent | GitHub_ConvertedNoteToIssueEvent | GitHub_CrossReferencedEvent | GitHub_DemilestonedEvent | GitHub_DeployedEvent | GitHub_DeploymentEnvironmentChangedEvent | GitHub_DisconnectedEvent | GitHub_HeadRefDeletedEvent | GitHub_HeadRefForcePushedEvent | GitHub_HeadRefRestoredEvent | GitHub_IssueComment | GitHub_LabeledEvent | GitHub_LockedEvent | GitHub_MarkedAsDuplicateEvent | GitHub_MentionedEvent | GitHub_MergedEvent | GitHub_MilestonedEvent | GitHub_MovedColumnsInProjectEvent | GitHub_PinnedEvent | GitHub_PullRequestCommit | GitHub_PullRequestCommitCommentThread | GitHub_PullRequestReview | GitHub_PullRequestReviewThread | GitHub_PullRequestRevisionMarker | GitHub_ReadyForReviewEvent | GitHub_ReferencedEvent | GitHub_RemovedFromProjectEvent | GitHub_RenamedTitleEvent | GitHub_ReopenedEvent | GitHub_ReviewDismissedEvent | GitHub_ReviewRequestRemovedEvent | GitHub_ReviewRequestedEvent | GitHub_SubscribedEvent | GitHub_TransferredEvent | GitHub_UnassignedEvent | GitHub_UnlabeledEvent | GitHub_UnlockedEvent | GitHub_UnmarkedAsDuplicateEvent | GitHub_UnpinnedEvent | GitHub_UnsubscribedEvent | GitHub_UserBlockedEvent;

/** The connection type for PullRequestTimelineItems. */
type GitHub_PullRequestTimelineItemsConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_PullRequestTimelineItemsEdge>>>;
  /** Identifies the count of items after applying `before` and `after` filters. */
  readonly filteredCount: Scalars['Int'];
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_PullRequestTimelineItems>>>;
  /** Identifies the count of items after applying `before`/`after` filters and `first`/`last`/`skip` slicing. */
  readonly pageCount: Scalars['Int'];
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
  /** Identifies the date and time when the timeline was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
};

/** An edge in a connection. */
type GitHub_PullRequestTimelineItemsEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_PullRequestTimelineItems>;
};

/** The possible item types found in a timeline. */
enum GitHub_PullRequestTimelineItemsItemType {
  /** Represents a Git commit part of a pull request. */
  PULL_REQUEST_COMMIT = 'PULL_REQUEST_COMMIT',
  /** Represents a commit comment thread part of a pull request. */
  PULL_REQUEST_COMMIT_COMMENT_THREAD = 'PULL_REQUEST_COMMIT_COMMENT_THREAD',
  /** A review object for a given pull request. */
  PULL_REQUEST_REVIEW = 'PULL_REQUEST_REVIEW',
  /** A threaded list of comments for a given pull request. */
  PULL_REQUEST_REVIEW_THREAD = 'PULL_REQUEST_REVIEW_THREAD',
  /** Represents the latest point in the pull request timeline for which the viewer has seen the pull request's commits. */
  PULL_REQUEST_REVISION_MARKER = 'PULL_REQUEST_REVISION_MARKER',
  /** Represents a 'automatic_base_change_failed' event on a given pull request. */
  AUTOMATIC_BASE_CHANGE_FAILED_EVENT = 'AUTOMATIC_BASE_CHANGE_FAILED_EVENT',
  /** Represents a 'automatic_base_change_succeeded' event on a given pull request. */
  AUTOMATIC_BASE_CHANGE_SUCCEEDED_EVENT = 'AUTOMATIC_BASE_CHANGE_SUCCEEDED_EVENT',
  /** Represents a 'base_ref_changed' event on a given issue or pull request. */
  BASE_REF_CHANGED_EVENT = 'BASE_REF_CHANGED_EVENT',
  /** Represents a 'base_ref_force_pushed' event on a given pull request. */
  BASE_REF_FORCE_PUSHED_EVENT = 'BASE_REF_FORCE_PUSHED_EVENT',
  /** Represents a 'deployed' event on a given pull request. */
  DEPLOYED_EVENT = 'DEPLOYED_EVENT',
  /** Represents a 'deployment_environment_changed' event on a given pull request. */
  DEPLOYMENT_ENVIRONMENT_CHANGED_EVENT = 'DEPLOYMENT_ENVIRONMENT_CHANGED_EVENT',
  /** Represents a 'head_ref_deleted' event on a given pull request. */
  HEAD_REF_DELETED_EVENT = 'HEAD_REF_DELETED_EVENT',
  /** Represents a 'head_ref_force_pushed' event on a given pull request. */
  HEAD_REF_FORCE_PUSHED_EVENT = 'HEAD_REF_FORCE_PUSHED_EVENT',
  /** Represents a 'head_ref_restored' event on a given pull request. */
  HEAD_REF_RESTORED_EVENT = 'HEAD_REF_RESTORED_EVENT',
  /** Represents a 'merged' event on a given pull request. */
  MERGED_EVENT = 'MERGED_EVENT',
  /** Represents a 'review_dismissed' event on a given issue or pull request. */
  REVIEW_DISMISSED_EVENT = 'REVIEW_DISMISSED_EVENT',
  /** Represents an 'review_requested' event on a given pull request. */
  REVIEW_REQUESTED_EVENT = 'REVIEW_REQUESTED_EVENT',
  /** Represents an 'review_request_removed' event on a given pull request. */
  REVIEW_REQUEST_REMOVED_EVENT = 'REVIEW_REQUEST_REMOVED_EVENT',
  /** Represents a 'ready_for_review' event on a given pull request. */
  READY_FOR_REVIEW_EVENT = 'READY_FOR_REVIEW_EVENT',
  /** Represents a 'convert_to_draft' event on a given pull request. */
  CONVERT_TO_DRAFT_EVENT = 'CONVERT_TO_DRAFT_EVENT',
  /** Represents a comment on an Issue. */
  ISSUE_COMMENT = 'ISSUE_COMMENT',
  /** Represents a mention made by one issue or pull request to another. */
  CROSS_REFERENCED_EVENT = 'CROSS_REFERENCED_EVENT',
  /** Represents a 'added_to_project' event on a given issue or pull request. */
  ADDED_TO_PROJECT_EVENT = 'ADDED_TO_PROJECT_EVENT',
  /** Represents an 'assigned' event on any assignable object. */
  ASSIGNED_EVENT = 'ASSIGNED_EVENT',
  /** Represents a 'closed' event on any `Closable`. */
  CLOSED_EVENT = 'CLOSED_EVENT',
  /** Represents a 'comment_deleted' event on a given issue or pull request. */
  COMMENT_DELETED_EVENT = 'COMMENT_DELETED_EVENT',
  /** Represents a 'connected' event on a given issue or pull request. */
  CONNECTED_EVENT = 'CONNECTED_EVENT',
  /** Represents a 'converted_note_to_issue' event on a given issue or pull request. */
  CONVERTED_NOTE_TO_ISSUE_EVENT = 'CONVERTED_NOTE_TO_ISSUE_EVENT',
  /** Represents a 'demilestoned' event on a given issue or pull request. */
  DEMILESTONED_EVENT = 'DEMILESTONED_EVENT',
  /** Represents a 'disconnected' event on a given issue or pull request. */
  DISCONNECTED_EVENT = 'DISCONNECTED_EVENT',
  /** Represents a 'labeled' event on a given issue or pull request. */
  LABELED_EVENT = 'LABELED_EVENT',
  /** Represents a 'locked' event on a given issue or pull request. */
  LOCKED_EVENT = 'LOCKED_EVENT',
  /** Represents a 'marked_as_duplicate' event on a given issue or pull request. */
  MARKED_AS_DUPLICATE_EVENT = 'MARKED_AS_DUPLICATE_EVENT',
  /** Represents a 'mentioned' event on a given issue or pull request. */
  MENTIONED_EVENT = 'MENTIONED_EVENT',
  /** Represents a 'milestoned' event on a given issue or pull request. */
  MILESTONED_EVENT = 'MILESTONED_EVENT',
  /** Represents a 'moved_columns_in_project' event on a given issue or pull request. */
  MOVED_COLUMNS_IN_PROJECT_EVENT = 'MOVED_COLUMNS_IN_PROJECT_EVENT',
  /** Represents a 'pinned' event on a given issue or pull request. */
  PINNED_EVENT = 'PINNED_EVENT',
  /** Represents a 'referenced' event on a given `ReferencedSubject`. */
  REFERENCED_EVENT = 'REFERENCED_EVENT',
  /** Represents a 'removed_from_project' event on a given issue or pull request. */
  REMOVED_FROM_PROJECT_EVENT = 'REMOVED_FROM_PROJECT_EVENT',
  /** Represents a 'renamed' event on a given issue or pull request */
  RENAMED_TITLE_EVENT = 'RENAMED_TITLE_EVENT',
  /** Represents a 'reopened' event on any `Closable`. */
  REOPENED_EVENT = 'REOPENED_EVENT',
  /** Represents a 'subscribed' event on a given `Subscribable`. */
  SUBSCRIBED_EVENT = 'SUBSCRIBED_EVENT',
  /** Represents a 'transferred' event on a given issue or pull request. */
  TRANSFERRED_EVENT = 'TRANSFERRED_EVENT',
  /** Represents an 'unassigned' event on any assignable object. */
  UNASSIGNED_EVENT = 'UNASSIGNED_EVENT',
  /** Represents an 'unlabeled' event on a given issue or pull request. */
  UNLABELED_EVENT = 'UNLABELED_EVENT',
  /** Represents an 'unlocked' event on a given issue or pull request. */
  UNLOCKED_EVENT = 'UNLOCKED_EVENT',
  /** Represents a 'user_blocked' event on a given user. */
  USER_BLOCKED_EVENT = 'USER_BLOCKED_EVENT',
  /** Represents an 'unmarked_as_duplicate' event on a given issue or pull request. */
  UNMARKED_AS_DUPLICATE_EVENT = 'UNMARKED_AS_DUPLICATE_EVENT',
  /** Represents an 'unpinned' event on a given issue or pull request. */
  UNPINNED_EVENT = 'UNPINNED_EVENT',
  /** Represents an 'unsubscribed' event on a given `Subscribable`. */
  UNSUBSCRIBED_EVENT = 'UNSUBSCRIBED_EVENT'
}

/** The possible target states when updating a pull request. */
enum GitHub_PullRequestUpdateState {
  /** A pull request that is still open. */
  OPEN = 'OPEN',
  /** A pull request that has been closed without being merged. */
  CLOSED = 'CLOSED'
}

/** A team, user or app who has the ability to push to a protected branch. */
type GitHub_PushAllowance = GitHub_Node & {
  /** The actor that can push. */
  readonly actor: Maybe<GitHub_PushAllowanceActor>;
  /** Identifies the branch protection rule associated with the allowed user or team. */
  readonly branchProtectionRule: Maybe<GitHub_BranchProtectionRule>;
  readonly id: Scalars['ID'];
};

/** Types that can be an actor. */
type GitHub_PushAllowanceActor = GitHub_App | GitHub_Team | GitHub_User;

/** The connection type for PushAllowance. */
type GitHub_PushAllowanceConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_PushAllowanceEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_PushAllowance>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_PushAllowanceEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_PushAllowance>;
};

/** Represents the client's rate limit. */
type GitHub_RateLimit = {
  /** The point cost for the current query counting against the rate limit. */
  readonly cost: Scalars['Int'];
  /** The maximum number of points the client is permitted to consume in a 60 minute window. */
  readonly limit: Scalars['Int'];
  /** The maximum number of nodes this query may return */
  readonly nodeCount: Scalars['Int'];
  /** The number of points remaining in the current rate limit window. */
  readonly remaining: Scalars['Int'];
  /** The time at which the current rate limit window resets in UTC epoch seconds. */
  readonly resetAt: Scalars['GitHub_DateTime'];
};

/** Represents a subject that can be reacted on. */
type GitHub_Reactable = {
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  readonly id: Scalars['ID'];
  /** A list of reactions grouped by content left on the subject. */
  readonly reactionGroups: Maybe<ReadonlyArray<GitHub_ReactionGroup>>;
  /** A list of Reactions left on the Issue. */
  readonly reactions: GitHub_ReactionConnection;
  /** Can user react to this subject */
  readonly viewerCanReact: Scalars['Boolean'];
};


/** Represents a subject that can be reacted on. */
type GitHub_Reactable_reactionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  content: Maybe<GitHub_ReactionContent>;
  orderBy: Maybe<GitHub_ReactionOrder>;
};

/** The connection type for User. */
type GitHub_ReactingUserConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_ReactingUserEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_User>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** Represents a user that's made a reaction. */
type GitHub_ReactingUserEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  readonly node: GitHub_User;
  /** The moment when the user made the reaction. */
  readonly reactedAt: Scalars['GitHub_DateTime'];
};

/** An emoji reaction to a particular piece of content. */
type GitHub_Reaction = GitHub_Node & {
  /** Identifies the emoji reaction. */
  readonly content: GitHub_ReactionContent;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  readonly id: Scalars['ID'];
  /** The reactable piece of content */
  readonly reactable: GitHub_Reactable;
  /** Identifies the user who created this reaction. */
  readonly user: Maybe<GitHub_User>;
};

/** A list of reactions that have been left on the subject. */
type GitHub_ReactionConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_ReactionEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Reaction>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
  /** Whether or not the authenticated user has left a reaction on the subject. */
  readonly viewerHasReacted: Scalars['Boolean'];
};

/** Emojis that can be attached to Issues, Pull Requests and Comments. */
enum GitHub_ReactionContent {
  /** Represents the `:+1:` emoji. */
  THUMBS_UP = 'THUMBS_UP',
  /** Represents the `:-1:` emoji. */
  THUMBS_DOWN = 'THUMBS_DOWN',
  /** Represents the `:laugh:` emoji. */
  LAUGH = 'LAUGH',
  /** Represents the `:hooray:` emoji. */
  HOORAY = 'HOORAY',
  /** Represents the `:confused:` emoji. */
  CONFUSED = 'CONFUSED',
  /** Represents the `:heart:` emoji. */
  HEART = 'HEART',
  /** Represents the `:rocket:` emoji. */
  ROCKET = 'ROCKET',
  /** Represents the `:eyes:` emoji. */
  EYES = 'EYES'
}

/** An edge in a connection. */
type GitHub_ReactionEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_Reaction>;
};

/** A group of emoji reactions to a particular piece of content. */
type GitHub_ReactionGroup = {
  /** Identifies the emoji reaction. */
  readonly content: GitHub_ReactionContent;
  /** Identifies when the reaction was created. */
  readonly createdAt: Maybe<Scalars['GitHub_DateTime']>;
  /** The subject that was reacted to. */
  readonly subject: GitHub_Reactable;
  /** Users who have reacted to the reaction subject with the emotion represented by this reaction group */
  readonly users: GitHub_ReactingUserConnection;
  /** Whether or not the authenticated user has left a reaction on the subject. */
  readonly viewerHasReacted: Scalars['Boolean'];
};


/** A group of emoji reactions to a particular piece of content. */
type GitHub_ReactionGroup_usersArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** Ways in which lists of reactions can be ordered upon return. */
type GitHub_ReactionOrder = {
  /** The field in which to order reactions by. */
  readonly field: GitHub_ReactionOrderField;
  /** The direction in which to order reactions by the specified field. */
  readonly direction: GitHub_OrderDirection;
};

/** A list of fields that reactions can be ordered by. */
enum GitHub_ReactionOrderField {
  /** Allows ordering a list of reactions by when they were created. */
  CREATED_AT = 'CREATED_AT'
}

/** Represents a 'ready_for_review' event on a given pull request. */
type GitHub_ReadyForReviewEvent = GitHub_Node & GitHub_UniformResourceLocatable & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** PullRequest referenced by event. */
  readonly pullRequest: GitHub_PullRequest;
  /** The HTTP path for this ready for review event. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this ready for review event. */
  readonly url: Scalars['GitHub_URI'];
};

/** Represents a Git reference. */
type GitHub_Ref = GitHub_Node & {
  /** A list of pull requests with this ref as the head ref. */
  readonly associatedPullRequests: GitHub_PullRequestConnection;
  readonly id: Scalars['ID'];
  /** The ref name. */
  readonly name: Scalars['String'];
  /** The ref's prefix, such as `refs/heads/` or `refs/tags/`. */
  readonly prefix: Scalars['String'];
  /** The repository the ref belongs to. */
  readonly repository: GitHub_Repository;
  /**
   * The object the ref points to.
   * 
   * **Upcoming Change on 2019-07-01 UTC**
   * **Description:** Type for `target` will change from `GitObject!` to `GitObject`.
   * **Reason:** The `target` field may return `null` values and is changing to nullable
   */
  readonly target: GitHub_GitObject;
};


/** Represents a Git reference. */
type GitHub_Ref_associatedPullRequestsArgs = {
  states: Maybe<ReadonlyArray<GitHub_PullRequestState>>;
  labels: Maybe<ReadonlyArray<Scalars['String']>>;
  headRefName: Maybe<Scalars['String']>;
  baseRefName: Maybe<Scalars['String']>;
  orderBy: Maybe<GitHub_IssueOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The connection type for Ref. */
type GitHub_RefConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_RefEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Ref>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_RefEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_Ref>;
};

/** Represents a 'referenced' event on a given `ReferencedSubject`. */
type GitHub_ReferencedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the commit associated with the 'referenced' event. */
  readonly commit: Maybe<GitHub_Commit>;
  /** Identifies the repository associated with the 'referenced' event. */
  readonly commitRepository: GitHub_Repository;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** Reference originated in a different repository. */
  readonly isCrossRepository: Scalars['Boolean'];
  /** Checks if the commit message itself references the subject. Can be false in the case of a commit comment reference. */
  readonly isDirectReference: Scalars['Boolean'];
  /** Object referenced by event. */
  readonly subject: GitHub_ReferencedSubject;
};

/** Any referencable object */
type GitHub_ReferencedSubject = GitHub_Issue | GitHub_PullRequest;

/** Ways in which lists of git refs can be ordered upon return. */
type GitHub_RefOrder = {
  /** The field in which to order refs by. */
  readonly field: GitHub_RefOrderField;
  /** The direction in which to order refs by the specified field. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which ref connections can be ordered. */
enum GitHub_RefOrderField {
  /** Order refs by underlying commit date if the ref prefix is refs/tags/ */
  TAG_COMMIT_DATE = 'TAG_COMMIT_DATE',
  /** Order refs by their alphanumeric name */
  ALPHABETICAL = 'ALPHABETICAL'
}

/** Autogenerated input type of RegenerateEnterpriseIdentityProviderRecoveryCodes */
type GitHub_RegenerateEnterpriseIdentityProviderRecoveryCodesInput = {
  /** The ID of the enterprise on which to set an identity provider. */
  readonly enterpriseId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of RegenerateEnterpriseIdentityProviderRecoveryCodes */
type GitHub_RegenerateEnterpriseIdentityProviderRecoveryCodesPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The identity provider for the enterprise. */
  readonly identityProvider: Maybe<GitHub_EnterpriseIdentityProvider>;
};

/** A release contains the content for a release. */
type GitHub_Release = GitHub_Node & GitHub_UniformResourceLocatable & {
  /** The author of the release */
  readonly author: Maybe<GitHub_User>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** The description of the release. */
  readonly description: Maybe<Scalars['String']>;
  /** The description of this release rendered to HTML. */
  readonly descriptionHTML: Maybe<Scalars['GitHub_HTML']>;
  readonly id: Scalars['ID'];
  /** Whether or not the release is a draft */
  readonly isDraft: Scalars['Boolean'];
  /** Whether or not the release is a prerelease */
  readonly isPrerelease: Scalars['Boolean'];
  /** The title of the release. */
  readonly name: Maybe<Scalars['String']>;
  /** Identifies the date and time when the release was created. */
  readonly publishedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** List of releases assets which are dependent on this release. */
  readonly releaseAssets: GitHub_ReleaseAssetConnection;
  /** The HTTP path for this issue */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** A description of the release, rendered to HTML without any links in it. */
  readonly shortDescriptionHTML: Maybe<Scalars['GitHub_HTML']>;
  /** The Git tag the release points to */
  readonly tag: Maybe<GitHub_Ref>;
  /** The name of the release's Git tag */
  readonly tagName: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL for this issue */
  readonly url: Scalars['GitHub_URI'];
};


/** A release contains the content for a release. */
type GitHub_Release_releaseAssetsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
};


/** A release contains the content for a release. */
type GitHub_Release_shortDescriptionHTMLArgs = {
  limit?: Maybe<Scalars['Int']>;
};

/** A release asset contains the content for a release asset. */
type GitHub_ReleaseAsset = GitHub_Node & {
  /** The asset's content-type */
  readonly contentType: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** The number of times this asset was downloaded */
  readonly downloadCount: Scalars['Int'];
  /** Identifies the URL where you can download the release asset via the browser. */
  readonly downloadUrl: Scalars['GitHub_URI'];
  readonly id: Scalars['ID'];
  /** Identifies the title of the release asset. */
  readonly name: Scalars['String'];
  /** Release that the asset is associated with */
  readonly release: Maybe<GitHub_Release>;
  /** The size (in bytes) of the asset */
  readonly size: Scalars['Int'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The user that performed the upload */
  readonly uploadedBy: GitHub_User;
  /** Identifies the URL of the release asset. */
  readonly url: Scalars['GitHub_URI'];
};

/** The connection type for ReleaseAsset. */
type GitHub_ReleaseAssetConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_ReleaseAssetEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_ReleaseAsset>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_ReleaseAssetEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_ReleaseAsset>;
};

/** The connection type for Release. */
type GitHub_ReleaseConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_ReleaseEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Release>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_ReleaseEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_Release>;
};

/** Ways in which lists of releases can be ordered upon return. */
type GitHub_ReleaseOrder = {
  /** The field in which to order releases by. */
  readonly field: GitHub_ReleaseOrderField;
  /** The direction in which to order releases by the specified field. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which release connections can be ordered. */
enum GitHub_ReleaseOrderField {
  /** Order releases by creation time */
  CREATED_AT = 'CREATED_AT',
  /** Order releases alphabetically by name */
  NAME = 'NAME'
}

/** Autogenerated input type of RemoveAssigneesFromAssignable */
type GitHub_RemoveAssigneesFromAssignableInput = {
  /** The id of the assignable object to remove assignees from. */
  readonly assignableId: Scalars['ID'];
  /** The id of users to remove as assignees. */
  readonly assigneeIds: ReadonlyArray<Scalars['ID']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of RemoveAssigneesFromAssignable */
type GitHub_RemoveAssigneesFromAssignablePayload = {
  /** The item that was unassigned. */
  readonly assignable: Maybe<GitHub_Assignable>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Represents a 'removed_from_project' event on a given issue or pull request. */
type GitHub_RemovedFromProjectEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  readonly id: Scalars['ID'];
};

/** Autogenerated input type of RemoveEnterpriseAdmin */
type GitHub_RemoveEnterpriseAdminInput = {
  /** The Enterprise ID from which to remove the administrator. */
  readonly enterpriseId: Scalars['ID'];
  /** The login of the user to remove as an administrator. */
  readonly login: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of RemoveEnterpriseAdmin */
type GitHub_RemoveEnterpriseAdminPayload = {
  /** The user who was removed as an administrator. */
  readonly admin: Maybe<GitHub_User>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The updated enterprise. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** A message confirming the result of removing an administrator. */
  readonly message: Maybe<Scalars['String']>;
  /** The viewer performing the mutation. */
  readonly viewer: Maybe<GitHub_User>;
};

/** Autogenerated input type of RemoveEnterpriseIdentityProvider */
type GitHub_RemoveEnterpriseIdentityProviderInput = {
  /** The ID of the enterprise from which to remove the identity provider. */
  readonly enterpriseId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of RemoveEnterpriseIdentityProvider */
type GitHub_RemoveEnterpriseIdentityProviderPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The identity provider that was removed from the enterprise. */
  readonly identityProvider: Maybe<GitHub_EnterpriseIdentityProvider>;
};

/** Autogenerated input type of RemoveEnterpriseOrganization */
type GitHub_RemoveEnterpriseOrganizationInput = {
  /** The ID of the enterprise from which the organization should be removed. */
  readonly enterpriseId: Scalars['ID'];
  /** The ID of the organization to remove from the enterprise. */
  readonly organizationId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of RemoveEnterpriseOrganization */
type GitHub_RemoveEnterpriseOrganizationPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The updated enterprise. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** The organization that was removed from the enterprise. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The viewer performing the mutation. */
  readonly viewer: Maybe<GitHub_User>;
};

/** Autogenerated input type of RemoveLabelsFromLabelable */
type GitHub_RemoveLabelsFromLabelableInput = {
  /** The id of the Labelable to remove labels from. */
  readonly labelableId: Scalars['ID'];
  /** The ids of labels to remove. */
  readonly labelIds: ReadonlyArray<Scalars['ID']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of RemoveLabelsFromLabelable */
type GitHub_RemoveLabelsFromLabelablePayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The Labelable the labels were removed from. */
  readonly labelable: Maybe<GitHub_Labelable>;
};

/** Autogenerated input type of RemoveOutsideCollaborator */
type GitHub_RemoveOutsideCollaboratorInput = {
  /** The ID of the outside collaborator to remove. */
  readonly userId: Scalars['ID'];
  /** The ID of the organization to remove the outside collaborator from. */
  readonly organizationId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of RemoveOutsideCollaborator */
type GitHub_RemoveOutsideCollaboratorPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The user that was removed as an outside collaborator. */
  readonly removedUser: Maybe<GitHub_User>;
};

/** Autogenerated input type of RemoveReaction */
type GitHub_RemoveReactionInput = {
  /** The Node ID of the subject to modify. */
  readonly subjectId: Scalars['ID'];
  /** The name of the emoji reaction to remove. */
  readonly content: GitHub_ReactionContent;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of RemoveReaction */
type GitHub_RemoveReactionPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The reaction object. */
  readonly reaction: Maybe<GitHub_Reaction>;
  /** The reactable subject. */
  readonly subject: Maybe<GitHub_Reactable>;
};

/** Autogenerated input type of RemoveStar */
type GitHub_RemoveStarInput = {
  /** The Starrable ID to unstar. */
  readonly starrableId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of RemoveStar */
type GitHub_RemoveStarPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The starrable. */
  readonly starrable: Maybe<GitHub_Starrable>;
};

/** Represents a 'renamed' event on a given issue or pull request */
type GitHub_RenamedTitleEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the current title of the issue or pull request. */
  readonly currentTitle: Scalars['String'];
  readonly id: Scalars['ID'];
  /** Identifies the previous title of the issue or pull request. */
  readonly previousTitle: Scalars['String'];
  /** Subject that was renamed. */
  readonly subject: GitHub_RenamedTitleSubject;
};

/** An object which has a renamable title */
type GitHub_RenamedTitleSubject = GitHub_Issue | GitHub_PullRequest;

/** Represents a 'reopened' event on any `Closable`. */
type GitHub_ReopenedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Object that was reopened. */
  readonly closable: GitHub_Closable;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
};

/** Autogenerated input type of ReopenIssue */
type GitHub_ReopenIssueInput = {
  /** ID of the issue to be opened. */
  readonly issueId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of ReopenIssue */
type GitHub_ReopenIssuePayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The issue that was opened. */
  readonly issue: Maybe<GitHub_Issue>;
};

/** Autogenerated input type of ReopenPullRequest */
type GitHub_ReopenPullRequestInput = {
  /** ID of the pull request to be reopened. */
  readonly pullRequestId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of ReopenPullRequest */
type GitHub_ReopenPullRequestPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The pull request that was reopened. */
  readonly pullRequest: Maybe<GitHub_PullRequest>;
};

/** Audit log entry for a repo.access event. */
type GitHub_RepoAccessAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & GitHub_RepositoryAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
  /** The visibility of the repository */
  readonly visibility: Maybe<GitHub_RepoAccessAuditEntryVisibility>;
};

/** The privacy of a repository */
enum GitHub_RepoAccessAuditEntryVisibility {
  /** The repository is visible only to users in the same business. */
  INTERNAL = 'INTERNAL',
  /** The repository is visible only to those with explicit access. */
  PRIVATE = 'PRIVATE',
  /** The repository is visible to everyone. */
  PUBLIC = 'PUBLIC'
}

/** Audit log entry for a repo.add_member event. */
type GitHub_RepoAddMemberAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & GitHub_RepositoryAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
  /** The visibility of the repository */
  readonly visibility: Maybe<GitHub_RepoAddMemberAuditEntryVisibility>;
};

/** The privacy of a repository */
enum GitHub_RepoAddMemberAuditEntryVisibility {
  /** The repository is visible only to users in the same business. */
  INTERNAL = 'INTERNAL',
  /** The repository is visible only to those with explicit access. */
  PRIVATE = 'PRIVATE',
  /** The repository is visible to everyone. */
  PUBLIC = 'PUBLIC'
}

/** Audit log entry for a repo.add_topic event. */
type GitHub_RepoAddTopicAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_RepositoryAuditEntryData & GitHub_OrganizationAuditEntryData & GitHub_TopicAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The name of the topic added to the repository */
  readonly topic: Maybe<GitHub_Topic>;
  /** The name of the topic added to the repository */
  readonly topicName: Maybe<Scalars['String']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a repo.archived event. */
type GitHub_RepoArchivedAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_RepositoryAuditEntryData & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
  /** The visibility of the repository */
  readonly visibility: Maybe<GitHub_RepoArchivedAuditEntryVisibility>;
};

/** The privacy of a repository */
enum GitHub_RepoArchivedAuditEntryVisibility {
  /** The repository is visible only to users in the same business. */
  INTERNAL = 'INTERNAL',
  /** The repository is visible only to those with explicit access. */
  PRIVATE = 'PRIVATE',
  /** The repository is visible to everyone. */
  PUBLIC = 'PUBLIC'
}

/** Audit log entry for a repo.change_merge_setting event. */
type GitHub_RepoChangeMergeSettingAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_RepositoryAuditEntryData & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** Whether the change was to enable (true) or disable (false) the merge type */
  readonly isEnabled: Maybe<Scalars['Boolean']>;
  /** The merge method affected by the change */
  readonly mergeType: Maybe<GitHub_RepoChangeMergeSettingAuditEntryMergeType>;
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** The merge options available for pull requests to this repository. */
enum GitHub_RepoChangeMergeSettingAuditEntryMergeType {
  /** The pull request is added to the base branch in a merge commit. */
  MERGE = 'MERGE',
  /** Commits from the pull request are added onto the base branch individually without a merge commit. */
  REBASE = 'REBASE',
  /** The pull request's commits are squashed into a single commit before they are merged to the base branch. */
  SQUASH = 'SQUASH'
}

/** Audit log entry for a repo.config.disable_anonymous_git_access event. */
type GitHub_RepoConfigDisableAnonymousGitAccessAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & GitHub_RepositoryAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a repo.config.disable_collaborators_only event. */
type GitHub_RepoConfigDisableCollaboratorsOnlyAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & GitHub_RepositoryAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a repo.config.disable_contributors_only event. */
type GitHub_RepoConfigDisableContributorsOnlyAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & GitHub_RepositoryAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a repo.config.disable_sockpuppet_disallowed event. */
type GitHub_RepoConfigDisableSockpuppetDisallowedAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & GitHub_RepositoryAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a repo.config.enable_anonymous_git_access event. */
type GitHub_RepoConfigEnableAnonymousGitAccessAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & GitHub_RepositoryAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a repo.config.enable_collaborators_only event. */
type GitHub_RepoConfigEnableCollaboratorsOnlyAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & GitHub_RepositoryAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a repo.config.enable_contributors_only event. */
type GitHub_RepoConfigEnableContributorsOnlyAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & GitHub_RepositoryAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a repo.config.enable_sockpuppet_disallowed event. */
type GitHub_RepoConfigEnableSockpuppetDisallowedAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & GitHub_RepositoryAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a repo.config.lock_anonymous_git_access event. */
type GitHub_RepoConfigLockAnonymousGitAccessAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & GitHub_RepositoryAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a repo.config.unlock_anonymous_git_access event. */
type GitHub_RepoConfigUnlockAnonymousGitAccessAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & GitHub_RepositoryAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a repo.create event. */
type GitHub_RepoCreateAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_RepositoryAuditEntryData & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  /** The name of the parent repository for this forked repository. */
  readonly forkParentName: Maybe<Scalars['String']>;
  /** The name of the root repository for this netork. */
  readonly forkSourceName: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
  /** The visibility of the repository */
  readonly visibility: Maybe<GitHub_RepoCreateAuditEntryVisibility>;
};

/** The privacy of a repository */
enum GitHub_RepoCreateAuditEntryVisibility {
  /** The repository is visible only to users in the same business. */
  INTERNAL = 'INTERNAL',
  /** The repository is visible only to those with explicit access. */
  PRIVATE = 'PRIVATE',
  /** The repository is visible to everyone. */
  PUBLIC = 'PUBLIC'
}

/** Audit log entry for a repo.destroy event. */
type GitHub_RepoDestroyAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_RepositoryAuditEntryData & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
  /** The visibility of the repository */
  readonly visibility: Maybe<GitHub_RepoDestroyAuditEntryVisibility>;
};

/** The privacy of a repository */
enum GitHub_RepoDestroyAuditEntryVisibility {
  /** The repository is visible only to users in the same business. */
  INTERNAL = 'INTERNAL',
  /** The repository is visible only to those with explicit access. */
  PRIVATE = 'PRIVATE',
  /** The repository is visible to everyone. */
  PUBLIC = 'PUBLIC'
}

/** Audit log entry for a repo.remove_member event. */
type GitHub_RepoRemoveMemberAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & GitHub_RepositoryAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
  /** The visibility of the repository */
  readonly visibility: Maybe<GitHub_RepoRemoveMemberAuditEntryVisibility>;
};

/** The privacy of a repository */
enum GitHub_RepoRemoveMemberAuditEntryVisibility {
  /** The repository is visible only to users in the same business. */
  INTERNAL = 'INTERNAL',
  /** The repository is visible only to those with explicit access. */
  PRIVATE = 'PRIVATE',
  /** The repository is visible to everyone. */
  PUBLIC = 'PUBLIC'
}

/** Audit log entry for a repo.remove_topic event. */
type GitHub_RepoRemoveTopicAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_RepositoryAuditEntryData & GitHub_OrganizationAuditEntryData & GitHub_TopicAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The name of the topic added to the repository */
  readonly topic: Maybe<GitHub_Topic>;
  /** The name of the topic added to the repository */
  readonly topicName: Maybe<Scalars['String']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** The reasons a piece of content can be reported or minimized. */
enum GitHub_ReportedContentClassifiers {
  /** A spammy piece of content */
  SPAM = 'SPAM',
  /** An abusive or harassing piece of content */
  ABUSE = 'ABUSE',
  /** An irrelevant piece of content */
  OFF_TOPIC = 'OFF_TOPIC',
  /** An outdated piece of content */
  OUTDATED = 'OUTDATED',
  /** A duplicated piece of content */
  DUPLICATE = 'DUPLICATE',
  /** The content has been resolved */
  RESOLVED = 'RESOLVED'
}

/** A repository contains the content for a project. */
type GitHub_Repository = GitHub_Node & GitHub_ProjectOwner & GitHub_PackageOwner & GitHub_Subscribable & GitHub_Starrable & GitHub_UniformResourceLocatable & GitHub_RepositoryInfo & {
  /** A list of users that can be assigned to issues in this repository. */
  readonly assignableUsers: GitHub_UserConnection;
  /** A list of branch protection rules for this repository. */
  readonly branchProtectionRules: GitHub_BranchProtectionRuleConnection;
  /** Returns the code of conduct for this repository */
  readonly codeOfConduct: Maybe<GitHub_CodeOfConduct>;
  /** A list of collaborators associated with the repository. */
  readonly collaborators: Maybe<GitHub_RepositoryCollaboratorConnection>;
  /** A list of commit comments associated with the repository. */
  readonly commitComments: GitHub_CommitCommentConnection;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** The Ref associated with the repository's default branch. */
  readonly defaultBranchRef: Maybe<GitHub_Ref>;
  /** Whether or not branches are automatically deleted when merged in this repository. */
  readonly deleteBranchOnMerge: Scalars['Boolean'];
  /** A list of deploy keys that are on this repository. */
  readonly deployKeys: GitHub_DeployKeyConnection;
  /** Deployments associated with the repository */
  readonly deployments: GitHub_DeploymentConnection;
  /** The description of the repository. */
  readonly description: Maybe<Scalars['String']>;
  /** The description of the repository rendered to HTML. */
  readonly descriptionHTML: Scalars['GitHub_HTML'];
  /** The number of kilobytes this repository occupies on disk. */
  readonly diskUsage: Maybe<Scalars['Int']>;
  /** Returns how many forks there are of this repository in the whole network. */
  readonly forkCount: Scalars['Int'];
  /** A list of direct forked repositories. */
  readonly forks: GitHub_RepositoryConnection;
  /** The funding links for this repository */
  readonly fundingLinks: ReadonlyArray<GitHub_FundingLink>;
  /** Indicates if the repository has issues feature enabled. */
  readonly hasIssuesEnabled: Scalars['Boolean'];
  /** Indicates if the repository has the Projects feature enabled. */
  readonly hasProjectsEnabled: Scalars['Boolean'];
  /** Indicates if the repository has wiki feature enabled. */
  readonly hasWikiEnabled: Scalars['Boolean'];
  /** The repository's URL. */
  readonly homepageUrl: Maybe<Scalars['GitHub_URI']>;
  readonly id: Scalars['ID'];
  /** Indicates if the repository is unmaintained. */
  readonly isArchived: Scalars['Boolean'];
  /** Returns whether or not this repository disabled. */
  readonly isDisabled: Scalars['Boolean'];
  /** Identifies if the repository is a fork. */
  readonly isFork: Scalars['Boolean'];
  /** Indicates if the repository has been locked or not. */
  readonly isLocked: Scalars['Boolean'];
  /** Identifies if the repository is a mirror. */
  readonly isMirror: Scalars['Boolean'];
  /** Identifies if the repository is private. */
  readonly isPrivate: Scalars['Boolean'];
  /** Identifies if the repository is a template that can be used to generate new repositories. */
  readonly isTemplate: Scalars['Boolean'];
  /** Returns a single issue from the current repository by number. */
  readonly issue: Maybe<GitHub_Issue>;
  /** Returns a single issue-like object from the current repository by number. */
  readonly issueOrPullRequest: Maybe<GitHub_IssueOrPullRequest>;
  /** A list of issues that have been opened in the repository. */
  readonly issues: GitHub_IssueConnection;
  /** Returns a single label by name */
  readonly label: Maybe<GitHub_Label>;
  /** A list of labels associated with the repository. */
  readonly labels: Maybe<GitHub_LabelConnection>;
  /** A list containing a breakdown of the language composition of the repository. */
  readonly languages: Maybe<GitHub_LanguageConnection>;
  /** The license associated with the repository */
  readonly licenseInfo: Maybe<GitHub_License>;
  /** The reason the repository has been locked. */
  readonly lockReason: Maybe<GitHub_RepositoryLockReason>;
  /** A list of Users that can be mentioned in the context of the repository. */
  readonly mentionableUsers: GitHub_UserConnection;
  /** Whether or not PRs are merged with a merge commit on this repository. */
  readonly mergeCommitAllowed: Scalars['Boolean'];
  /** Returns a single milestone from the current repository by number. */
  readonly milestone: Maybe<GitHub_Milestone>;
  /** A list of milestones associated with the repository. */
  readonly milestones: Maybe<GitHub_MilestoneConnection>;
  /** The repository's original mirror URL. */
  readonly mirrorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The name of the repository. */
  readonly name: Scalars['String'];
  /** The repository's name with owner. */
  readonly nameWithOwner: Scalars['String'];
  /** A Git object in the repository */
  readonly object: Maybe<GitHub_GitObject>;
  /** The image used to represent this repository in Open Graph data. */
  readonly openGraphImageUrl: Scalars['GitHub_URI'];
  /** The User owner of the repository. */
  readonly owner: GitHub_RepositoryOwner;
  /** A list of packages under the owner. */
  readonly packages: GitHub_PackageConnection;
  /** The repository parent, if this is a fork. */
  readonly parent: Maybe<GitHub_Repository>;
  /** The primary language of the repository's code. */
  readonly primaryLanguage: Maybe<GitHub_Language>;
  /** Find project by number. */
  readonly project: Maybe<GitHub_Project>;
  /** A list of projects under the owner. */
  readonly projects: GitHub_ProjectConnection;
  /** The HTTP path listing the repository's projects */
  readonly projectsResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL listing the repository's projects */
  readonly projectsUrl: Scalars['GitHub_URI'];
  /** Returns a single pull request from the current repository by number. */
  readonly pullRequest: Maybe<GitHub_PullRequest>;
  /** A list of pull requests that have been opened in the repository. */
  readonly pullRequests: GitHub_PullRequestConnection;
  /** Identifies when the repository was last pushed to. */
  readonly pushedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** Whether or not rebase-merging is enabled on this repository. */
  readonly rebaseMergeAllowed: Scalars['Boolean'];
  /** Fetch a given ref from the repository */
  readonly ref: Maybe<GitHub_Ref>;
  /** Fetch a list of refs from the repository */
  readonly refs: Maybe<GitHub_RefConnection>;
  /** Lookup a single release given various criteria. */
  readonly release: Maybe<GitHub_Release>;
  /** List of releases which are dependent on this repository. */
  readonly releases: GitHub_ReleaseConnection;
  /** A list of applied repository-topic associations for this repository. */
  readonly repositoryTopics: GitHub_RepositoryTopicConnection;
  /** The HTTP path for this repository */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** A description of the repository, rendered to HTML without any links in it. */
  readonly shortDescriptionHTML: Scalars['GitHub_HTML'];
  /** Whether or not squash-merging is enabled on this repository. */
  readonly squashMergeAllowed: Scalars['Boolean'];
  /** The SSH URL to clone this repository */
  readonly sshUrl: Scalars['GitHub_GitSSHRemote'];
  /** A list of users who have starred this starrable. */
  readonly stargazers: GitHub_StargazerConnection;
  /**
   * Returns a list of all submodules in this repository parsed from the
   * .gitmodules file as of the default branch's HEAD commit.
   */
  readonly submodules: GitHub_SubmoduleConnection;
  /** Temporary authentication token for cloning this repository. */
  readonly tempCloneToken: Maybe<Scalars['String']>;
  /** The repository from which this repository was generated, if any. */
  readonly templateRepository: Maybe<GitHub_Repository>;
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL for this repository */
  readonly url: Scalars['GitHub_URI'];
  /** Whether this repository has a custom image to use with Open Graph as opposed to being represented by the owner's avatar. */
  readonly usesCustomOpenGraphImage: Scalars['Boolean'];
  /** Indicates whether the viewer has admin permissions on this repository. */
  readonly viewerCanAdminister: Scalars['Boolean'];
  /** Can the current viewer create new projects on this owner. */
  readonly viewerCanCreateProjects: Scalars['Boolean'];
  /** Check if the viewer is able to change their subscription status for the repository. */
  readonly viewerCanSubscribe: Scalars['Boolean'];
  /** Indicates whether the viewer can update the topics of this repository. */
  readonly viewerCanUpdateTopics: Scalars['Boolean'];
  /** Returns a boolean indicating whether the viewing user has starred this starrable. */
  readonly viewerHasStarred: Scalars['Boolean'];
  /** The users permission level on the repository. Will return null if authenticated as an GitHub App. */
  readonly viewerPermission: Maybe<GitHub_RepositoryPermission>;
  /** Identifies if the viewer is watching, not watching, or ignoring the subscribable entity. */
  readonly viewerSubscription: Maybe<GitHub_SubscriptionState>;
  /** A list of vulnerability alerts that are on this repository. */
  readonly vulnerabilityAlerts: Maybe<GitHub_RepositoryVulnerabilityAlertConnection>;
  /** A list of users watching the repository. */
  readonly watchers: GitHub_UserConnection;
};


/** A repository contains the content for a project. */
type GitHub_Repository_assignableUsersArgs = {
  query: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_branchProtectionRulesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_collaboratorsArgs = {
  affiliation: Maybe<GitHub_CollaboratorAffiliation>;
  query: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_commitCommentsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_deployKeysArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_deploymentsArgs = {
  environments: Maybe<ReadonlyArray<Scalars['String']>>;
  orderBy?: Maybe<GitHub_DeploymentOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_forksArgs = {
  privacy: Maybe<GitHub_RepositoryPrivacy>;
  orderBy: Maybe<GitHub_RepositoryOrder>;
  affiliations: Maybe<ReadonlyArray<Maybe<GitHub_RepositoryAffiliation>>>;
  ownerAffiliations?: Maybe<ReadonlyArray<Maybe<GitHub_RepositoryAffiliation>>>;
  isLocked: Maybe<Scalars['Boolean']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_issueArgs = {
  number: Scalars['Int'];
};


/** A repository contains the content for a project. */
type GitHub_Repository_issueOrPullRequestArgs = {
  number: Scalars['Int'];
};


/** A repository contains the content for a project. */
type GitHub_Repository_issuesArgs = {
  orderBy: Maybe<GitHub_IssueOrder>;
  labels: Maybe<ReadonlyArray<Scalars['String']>>;
  states: Maybe<ReadonlyArray<GitHub_IssueState>>;
  filterBy: Maybe<GitHub_IssueFilters>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_labelArgs = {
  name: Scalars['String'];
};


/** A repository contains the content for a project. */
type GitHub_Repository_labelsArgs = {
  orderBy?: Maybe<GitHub_LabelOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  query: Maybe<Scalars['String']>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_languagesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<GitHub_LanguageOrder>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_mentionableUsersArgs = {
  query: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_milestoneArgs = {
  number: Scalars['Int'];
};


/** A repository contains the content for a project. */
type GitHub_Repository_milestonesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  states: Maybe<ReadonlyArray<GitHub_MilestoneState>>;
  orderBy: Maybe<GitHub_MilestoneOrder>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_objectArgs = {
  oid: Maybe<Scalars['GitHub_GitObjectID']>;
  expression: Maybe<Scalars['String']>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_packagesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  names: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  repositoryId: Maybe<Scalars['ID']>;
  packageType: Maybe<GitHub_PackageType>;
  orderBy?: Maybe<GitHub_PackageOrder>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_projectArgs = {
  number: Scalars['Int'];
};


/** A repository contains the content for a project. */
type GitHub_Repository_projectsArgs = {
  orderBy: Maybe<GitHub_ProjectOrder>;
  search: Maybe<Scalars['String']>;
  states: Maybe<ReadonlyArray<GitHub_ProjectState>>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_pullRequestArgs = {
  number: Scalars['Int'];
};


/** A repository contains the content for a project. */
type GitHub_Repository_pullRequestsArgs = {
  states: Maybe<ReadonlyArray<GitHub_PullRequestState>>;
  labels: Maybe<ReadonlyArray<Scalars['String']>>;
  headRefName: Maybe<Scalars['String']>;
  baseRefName: Maybe<Scalars['String']>;
  orderBy: Maybe<GitHub_IssueOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_refArgs = {
  qualifiedName: Scalars['String'];
};


/** A repository contains the content for a project. */
type GitHub_Repository_refsArgs = {
  query: Maybe<Scalars['String']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  refPrefix: Scalars['String'];
  direction: Maybe<GitHub_OrderDirection>;
  orderBy: Maybe<GitHub_RefOrder>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_releaseArgs = {
  tagName: Scalars['String'];
};


/** A repository contains the content for a project. */
type GitHub_Repository_releasesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<GitHub_ReleaseOrder>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_repositoryTopicsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_shortDescriptionHTMLArgs = {
  limit?: Maybe<Scalars['Int']>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_stargazersArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<GitHub_StarOrder>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_submodulesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_vulnerabilityAlertsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A repository contains the content for a project. */
type GitHub_Repository_watchersArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The affiliation of a user to a repository */
enum GitHub_RepositoryAffiliation {
  /** Repositories that are owned by the authenticated user. */
  OWNER = 'OWNER',
  /** Repositories that the user has been added to as a collaborator. */
  COLLABORATOR = 'COLLABORATOR',
  /**
   * Repositories that the user has access to through being a member of an
   * organization. This includes every repository on every team that the user is on.
   */
  ORGANIZATION_MEMBER = 'ORGANIZATION_MEMBER'
}

/** Metadata for an audit entry with action repo.* */
type GitHub_RepositoryAuditEntryData = {
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
};

/** The connection type for User. */
type GitHub_RepositoryCollaboratorConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_RepositoryCollaboratorEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_User>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** Represents a user who is a collaborator of a repository. */
type GitHub_RepositoryCollaboratorEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  readonly node: GitHub_User;
  /**
   * The permission the user has on the repository.
   * 
   * **Upcoming Change on 2020-10-01 UTC**
   * **Description:** Type for `permission` will change from `RepositoryPermission!` to `String`.
   * **Reason:** This field may return additional values
   */
  readonly permission: GitHub_RepositoryPermission;
  /** A list of sources for the user's access to the repository. */
  readonly permissionSources: Maybe<ReadonlyArray<GitHub_PermissionSource>>;
};

/** A list of repositories owned by the subject. */
type GitHub_RepositoryConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_RepositoryEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Repository>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
  /** The total size in kilobytes of all repositories in the connection. */
  readonly totalDiskUsage: Scalars['Int'];
};

/** The reason a repository is listed as 'contributed'. */
enum GitHub_RepositoryContributionType {
  /** Created a commit */
  COMMIT = 'COMMIT',
  /** Created an issue */
  ISSUE = 'ISSUE',
  /** Created a pull request */
  PULL_REQUEST = 'PULL_REQUEST',
  /** Created the repository */
  REPOSITORY = 'REPOSITORY',
  /** Reviewed a pull request */
  PULL_REQUEST_REVIEW = 'PULL_REQUEST_REVIEW'
}

/** An edge in a connection. */
type GitHub_RepositoryEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_Repository>;
};

/** A subset of repository info. */
type GitHub_RepositoryInfo = {
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** The description of the repository. */
  readonly description: Maybe<Scalars['String']>;
  /** The description of the repository rendered to HTML. */
  readonly descriptionHTML: Scalars['GitHub_HTML'];
  /** Returns how many forks there are of this repository in the whole network. */
  readonly forkCount: Scalars['Int'];
  /** Indicates if the repository has issues feature enabled. */
  readonly hasIssuesEnabled: Scalars['Boolean'];
  /** Indicates if the repository has the Projects feature enabled. */
  readonly hasProjectsEnabled: Scalars['Boolean'];
  /** Indicates if the repository has wiki feature enabled. */
  readonly hasWikiEnabled: Scalars['Boolean'];
  /** The repository's URL. */
  readonly homepageUrl: Maybe<Scalars['GitHub_URI']>;
  /** Indicates if the repository is unmaintained. */
  readonly isArchived: Scalars['Boolean'];
  /** Identifies if the repository is a fork. */
  readonly isFork: Scalars['Boolean'];
  /** Indicates if the repository has been locked or not. */
  readonly isLocked: Scalars['Boolean'];
  /** Identifies if the repository is a mirror. */
  readonly isMirror: Scalars['Boolean'];
  /** Identifies if the repository is private. */
  readonly isPrivate: Scalars['Boolean'];
  /** Identifies if the repository is a template that can be used to generate new repositories. */
  readonly isTemplate: Scalars['Boolean'];
  /** The license associated with the repository */
  readonly licenseInfo: Maybe<GitHub_License>;
  /** The reason the repository has been locked. */
  readonly lockReason: Maybe<GitHub_RepositoryLockReason>;
  /** The repository's original mirror URL. */
  readonly mirrorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The name of the repository. */
  readonly name: Scalars['String'];
  /** The repository's name with owner. */
  readonly nameWithOwner: Scalars['String'];
  /** The image used to represent this repository in Open Graph data. */
  readonly openGraphImageUrl: Scalars['GitHub_URI'];
  /** The User owner of the repository. */
  readonly owner: GitHub_RepositoryOwner;
  /** Identifies when the repository was last pushed to. */
  readonly pushedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** The HTTP path for this repository */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** A description of the repository, rendered to HTML without any links in it. */
  readonly shortDescriptionHTML: Scalars['GitHub_HTML'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL for this repository */
  readonly url: Scalars['GitHub_URI'];
  /** Whether this repository has a custom image to use with Open Graph as opposed to being represented by the owner's avatar. */
  readonly usesCustomOpenGraphImage: Scalars['Boolean'];
};


/** A subset of repository info. */
type GitHub_RepositoryInfo_shortDescriptionHTMLArgs = {
  limit?: Maybe<Scalars['Int']>;
};

/** An invitation for a user to be added to a repository. */
type GitHub_RepositoryInvitation = GitHub_Node & {
  /** The email address that received the invitation. */
  readonly email: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  /** The user who received the invitation. */
  readonly invitee: Maybe<GitHub_User>;
  /** The user who created the invitation. */
  readonly inviter: GitHub_User;
  /**
   * The permission granted on this repository by this invitation.
   * 
   * **Upcoming Change on 2020-10-01 UTC**
   * **Description:** Type for `permission` will change from `RepositoryPermission!` to `String`.
   * **Reason:** This field may return additional values
   */
  readonly permission: GitHub_RepositoryPermission;
  /** The Repository the user is invited to. */
  readonly repository: Maybe<GitHub_RepositoryInfo>;
};

/** The connection type for RepositoryInvitation. */
type GitHub_RepositoryInvitationConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_RepositoryInvitationEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_RepositoryInvitation>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_RepositoryInvitationEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_RepositoryInvitation>;
};

/** Ordering options for repository invitation connections. */
type GitHub_RepositoryInvitationOrder = {
  /** The field to order repository invitations by. */
  readonly field: GitHub_RepositoryInvitationOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which repository invitation connections can be ordered. */
enum GitHub_RepositoryInvitationOrderField {
  /** Order repository invitations by creation time */
  CREATED_AT = 'CREATED_AT',
  /** Order repository invitations by invitee login */
  INVITEE_LOGIN = 'INVITEE_LOGIN'
}

/** The possible reasons a given repository could be in a locked state. */
enum GitHub_RepositoryLockReason {
  /** The repository is locked due to a move. */
  MOVING = 'MOVING',
  /** The repository is locked due to a billing related reason. */
  BILLING = 'BILLING',
  /** The repository is locked due to a rename. */
  RENAME = 'RENAME',
  /** The repository is locked due to a migration. */
  MIGRATING = 'MIGRATING'
}

/** Represents a object that belongs to a repository. */
type GitHub_RepositoryNode = {
  /** The repository associated with this node. */
  readonly repository: GitHub_Repository;
};

/** Ordering options for repository connections */
type GitHub_RepositoryOrder = {
  /** The field to order repositories by. */
  readonly field: GitHub_RepositoryOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which repository connections can be ordered. */
enum GitHub_RepositoryOrderField {
  /** Order repositories by creation time */
  CREATED_AT = 'CREATED_AT',
  /** Order repositories by update time */
  UPDATED_AT = 'UPDATED_AT',
  /** Order repositories by push time */
  PUSHED_AT = 'PUSHED_AT',
  /** Order repositories by name */
  NAME = 'NAME',
  /** Order repositories by number of stargazers */
  STARGAZERS = 'STARGAZERS'
}

/** Represents an owner of a Repository. */
type GitHub_RepositoryOwner = {
  /** A URL pointing to the owner's public avatar. */
  readonly avatarUrl: Scalars['GitHub_URI'];
  readonly id: Scalars['ID'];
  /** The username used to login. */
  readonly login: Scalars['String'];
  /** A list of repositories that the user owns. */
  readonly repositories: GitHub_RepositoryConnection;
  /** Find Repository. */
  readonly repository: Maybe<GitHub_Repository>;
  /** The HTTP URL for the owner. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for the owner. */
  readonly url: Scalars['GitHub_URI'];
};


/** Represents an owner of a Repository. */
type GitHub_RepositoryOwner_avatarUrlArgs = {
  size: Maybe<Scalars['Int']>;
};


/** Represents an owner of a Repository. */
type GitHub_RepositoryOwner_repositoriesArgs = {
  privacy: Maybe<GitHub_RepositoryPrivacy>;
  orderBy: Maybe<GitHub_RepositoryOrder>;
  affiliations: Maybe<ReadonlyArray<Maybe<GitHub_RepositoryAffiliation>>>;
  ownerAffiliations?: Maybe<ReadonlyArray<Maybe<GitHub_RepositoryAffiliation>>>;
  isLocked: Maybe<Scalars['Boolean']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  isFork: Maybe<Scalars['Boolean']>;
};


/** Represents an owner of a Repository. */
type GitHub_RepositoryOwner_repositoryArgs = {
  name: Scalars['String'];
};

/** The access level to a repository */
enum GitHub_RepositoryPermission {
  /**
   * Can read, clone, and push to this repository. Can also manage issues, pull
   * requests, and repository settings, including adding collaborators
   */
  ADMIN = 'ADMIN',
  /** Can read, clone, and push to this repository. They can also manage issues, pull requests, and some repository settings */
  MAINTAIN = 'MAINTAIN',
  /** Can read, clone, and push to this repository. Can also manage issues and pull requests */
  WRITE = 'WRITE',
  /** Can read and clone this repository. Can also manage issues and pull requests */
  TRIAGE = 'TRIAGE',
  /** Can read and clone this repository. Can also open and comment on issues and pull requests */
  READ = 'READ'
}

/** The privacy of a repository */
enum GitHub_RepositoryPrivacy {
  /** Public */
  PUBLIC = 'PUBLIC',
  /** Private */
  PRIVATE = 'PRIVATE'
}

/** A repository-topic connects a repository to a topic. */
type GitHub_RepositoryTopic = GitHub_Node & GitHub_UniformResourceLocatable & {
  readonly id: Scalars['ID'];
  /** The HTTP path for this repository-topic. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The topic. */
  readonly topic: GitHub_Topic;
  /** The HTTP URL for this repository-topic. */
  readonly url: Scalars['GitHub_URI'];
};

/** The connection type for RepositoryTopic. */
type GitHub_RepositoryTopicConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_RepositoryTopicEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_RepositoryTopic>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_RepositoryTopicEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_RepositoryTopic>;
};

/** The repository's visibility level. */
enum GitHub_RepositoryVisibility {
  /** The repository is visible only to those with explicit access. */
  PRIVATE = 'PRIVATE',
  /** The repository is visible to everyone. */
  PUBLIC = 'PUBLIC',
  /** The repository is visible only to users in the same business. */
  INTERNAL = 'INTERNAL'
}

/** Audit log entry for a repository_visibility_change.disable event. */
type GitHub_RepositoryVisibilityChangeDisableAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_EnterpriseAuditEntryData & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  /** The HTTP path for this enterprise. */
  readonly enterpriseResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The slug of the enterprise. */
  readonly enterpriseSlug: Maybe<Scalars['String']>;
  /** The HTTP URL for this enterprise. */
  readonly enterpriseUrl: Maybe<Scalars['GitHub_URI']>;
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a repository_visibility_change.enable event. */
type GitHub_RepositoryVisibilityChangeEnableAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_EnterpriseAuditEntryData & GitHub_OrganizationAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  /** The HTTP path for this enterprise. */
  readonly enterpriseResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The slug of the enterprise. */
  readonly enterpriseSlug: Maybe<Scalars['String']>;
  /** The HTTP URL for this enterprise. */
  readonly enterpriseUrl: Maybe<Scalars['GitHub_URI']>;
  readonly id: Scalars['ID'];
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** A alert for a repository with an affected vulnerability. */
type GitHub_RepositoryVulnerabilityAlert = GitHub_Node & GitHub_RepositoryNode & {
  /** When was the alert created? */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** The reason the alert was dismissed */
  readonly dismissReason: Maybe<Scalars['String']>;
  /** When was the alert dimissed? */
  readonly dismissedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** The user who dismissed the alert */
  readonly dismisser: Maybe<GitHub_User>;
  readonly id: Scalars['ID'];
  /** The associated repository */
  readonly repository: GitHub_Repository;
  /** The associated security advisory */
  readonly securityAdvisory: Maybe<GitHub_SecurityAdvisory>;
  /** The associated security vulnerablity */
  readonly securityVulnerability: Maybe<GitHub_SecurityVulnerability>;
  /** The vulnerable manifest filename */
  readonly vulnerableManifestFilename: Scalars['String'];
  /** The vulnerable manifest path */
  readonly vulnerableManifestPath: Scalars['String'];
  /** The vulnerable requirements */
  readonly vulnerableRequirements: Maybe<Scalars['String']>;
};

/** The connection type for RepositoryVulnerabilityAlert. */
type GitHub_RepositoryVulnerabilityAlertConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_RepositoryVulnerabilityAlertEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_RepositoryVulnerabilityAlert>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_RepositoryVulnerabilityAlertEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_RepositoryVulnerabilityAlert>;
};

/** Types that can be requested reviewers. */
type GitHub_RequestedReviewer = GitHub_Mannequin | GitHub_Team | GitHub_User;

/** Autogenerated input type of RequestReviews */
type GitHub_RequestReviewsInput = {
  /** The Node ID of the pull request to modify. */
  readonly pullRequestId: Scalars['ID'];
  /** The Node IDs of the user to request. */
  readonly userIds: Maybe<ReadonlyArray<Scalars['ID']>>;
  /** The Node IDs of the team to request. */
  readonly teamIds: Maybe<ReadonlyArray<Scalars['ID']>>;
  /** Add users to the set rather than replace. */
  readonly union: Maybe<Scalars['Boolean']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of RequestReviews */
type GitHub_RequestReviewsPayload = {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The pull request that is getting requests. */
  readonly pullRequest: Maybe<GitHub_PullRequest>;
  /** The edge from the pull request to the requested reviewers. */
  readonly requestedReviewersEdge: Maybe<GitHub_UserEdge>;
};

/** Autogenerated input type of ResolveReviewThread */
type GitHub_ResolveReviewThreadInput = {
  /** The ID of the thread to resolve */
  readonly threadId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of ResolveReviewThread */
type GitHub_ResolveReviewThreadPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The thread to resolve. */
  readonly thread: Maybe<GitHub_PullRequestReviewThread>;
};

/** Represents a private contribution a user made on GitHub. */
type GitHub_RestrictedContribution = GitHub_Contribution & {
  /**
   * Whether this contribution is associated with a record you do not have access to. For
   * example, your own 'first issue' contribution may have been made on a repository you can no
   * longer access.
   */
  readonly isRestricted: Scalars['Boolean'];
  /** When this contribution was made. */
  readonly occurredAt: Scalars['GitHub_DateTime'];
  /** The HTTP path for this contribution. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this contribution. */
  readonly url: Scalars['GitHub_URI'];
  /** The user who made this contribution. */
  readonly user: GitHub_User;
};

/** A team or user who has the ability to dismiss a review on a protected branch. */
type GitHub_ReviewDismissalAllowance = GitHub_Node & {
  /** The actor that can dismiss. */
  readonly actor: Maybe<GitHub_ReviewDismissalAllowanceActor>;
  /** Identifies the branch protection rule associated with the allowed user or team. */
  readonly branchProtectionRule: Maybe<GitHub_BranchProtectionRule>;
  readonly id: Scalars['ID'];
};

/** Types that can be an actor. */
type GitHub_ReviewDismissalAllowanceActor = GitHub_Team | GitHub_User;

/** The connection type for ReviewDismissalAllowance. */
type GitHub_ReviewDismissalAllowanceConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_ReviewDismissalAllowanceEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_ReviewDismissalAllowance>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_ReviewDismissalAllowanceEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_ReviewDismissalAllowance>;
};

/** Represents a 'review_dismissed' event on a given issue or pull request. */
type GitHub_ReviewDismissedEvent = GitHub_Node & GitHub_UniformResourceLocatable & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** Identifies the optional message associated with the 'review_dismissed' event. */
  readonly dismissalMessage: Maybe<Scalars['String']>;
  /** Identifies the optional message associated with the event, rendered to HTML. */
  readonly dismissalMessageHTML: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  /** Identifies the previous state of the review with the 'review_dismissed' event. */
  readonly previousReviewState: GitHub_PullRequestReviewState;
  /** PullRequest referenced by event. */
  readonly pullRequest: GitHub_PullRequest;
  /** Identifies the commit which caused the review to become stale. */
  readonly pullRequestCommit: Maybe<GitHub_PullRequestCommit>;
  /** The HTTP path for this review dismissed event. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** Identifies the review associated with the 'review_dismissed' event. */
  readonly review: Maybe<GitHub_PullRequestReview>;
  /** The HTTP URL for this review dismissed event. */
  readonly url: Scalars['GitHub_URI'];
};

/** A request for a user to review a pull request. */
type GitHub_ReviewRequest = GitHub_Node & {
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  readonly id: Scalars['ID'];
  /** Identifies the pull request associated with this review request. */
  readonly pullRequest: GitHub_PullRequest;
  /** The reviewer that is requested. */
  readonly requestedReviewer: Maybe<GitHub_RequestedReviewer>;
};

/** The connection type for ReviewRequest. */
type GitHub_ReviewRequestConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_ReviewRequestEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_ReviewRequest>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** Represents an 'review_requested' event on a given pull request. */
type GitHub_ReviewRequestedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** PullRequest referenced by event. */
  readonly pullRequest: GitHub_PullRequest;
  /** Identifies the reviewer whose review was requested. */
  readonly requestedReviewer: Maybe<GitHub_RequestedReviewer>;
};

/** An edge in a connection. */
type GitHub_ReviewRequestEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_ReviewRequest>;
};

/** Represents an 'review_request_removed' event on a given pull request. */
type GitHub_ReviewRequestRemovedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** PullRequest referenced by event. */
  readonly pullRequest: GitHub_PullRequest;
  /** Identifies the reviewer whose review request was removed. */
  readonly requestedReviewer: Maybe<GitHub_RequestedReviewer>;
};

/**
 * A hovercard context with a message describing the current code review state of the pull
 * request.
 */
type GitHub_ReviewStatusHovercardContext = GitHub_HovercardContext & {
  /** A string describing this context */
  readonly message: Scalars['String'];
  /** An octicon to accompany this context */
  readonly octicon: Scalars['String'];
  /** The current status of the pull request with respect to code review. */
  readonly reviewDecision: Maybe<GitHub_PullRequestReviewDecision>;
};

/** The possible digest algorithms used to sign SAML requests for an identity provider. */
enum GitHub_SamlDigestAlgorithm {
  /** SHA1 */
  SHA1 = 'SHA1',
  /** SHA256 */
  SHA256 = 'SHA256',
  /** SHA384 */
  SHA384 = 'SHA384',
  /** SHA512 */
  SHA512 = 'SHA512'
}

/** The possible signature algorithms used to sign SAML requests for a Identity Provider. */
enum GitHub_SamlSignatureAlgorithm {
  /** RSA-SHA1 */
  RSA_SHA1 = 'RSA_SHA1',
  /** RSA-SHA256 */
  RSA_SHA256 = 'RSA_SHA256',
  /** RSA-SHA384 */
  RSA_SHA384 = 'RSA_SHA384',
  /** RSA-SHA512 */
  RSA_SHA512 = 'RSA_SHA512'
}

/** A Saved Reply is text a user can use to reply quickly. */
type GitHub_SavedReply = GitHub_Node & {
  /** The body of the saved reply. */
  readonly body: Scalars['String'];
  /** The saved reply body rendered to HTML. */
  readonly bodyHTML: Scalars['GitHub_HTML'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  readonly id: Scalars['ID'];
  /** The title of the saved reply. */
  readonly title: Scalars['String'];
  /** The user that saved this reply. */
  readonly user: Maybe<GitHub_Actor>;
};

/** The connection type for SavedReply. */
type GitHub_SavedReplyConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_SavedReplyEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_SavedReply>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_SavedReplyEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_SavedReply>;
};

/** Ordering options for saved reply connections. */
type GitHub_SavedReplyOrder = {
  /** The field to order saved replies by. */
  readonly field: GitHub_SavedReplyOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which saved reply connections can be ordered. */
enum GitHub_SavedReplyOrderField {
  /** Order saved reply by when they were updated. */
  UPDATED_AT = 'UPDATED_AT'
}

/** The results of a search. */
type GitHub_SearchResultItem = GitHub_App | GitHub_Issue | GitHub_MarketplaceListing | GitHub_Organization | GitHub_PullRequest | GitHub_Repository | GitHub_User;

/** A list of results that matched against a search query. */
type GitHub_SearchResultItemConnection = {
  /** The number of pieces of code that matched the search query. */
  readonly codeCount: Scalars['Int'];
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_SearchResultItemEdge>>>;
  /** The number of issues that matched the search query. */
  readonly issueCount: Scalars['Int'];
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_SearchResultItem>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** The number of repositories that matched the search query. */
  readonly repositoryCount: Scalars['Int'];
  /** The number of users that matched the search query. */
  readonly userCount: Scalars['Int'];
  /** The number of wiki pages that matched the search query. */
  readonly wikiCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_SearchResultItemEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_SearchResultItem>;
  /** Text matches on the result found. */
  readonly textMatches: Maybe<ReadonlyArray<Maybe<GitHub_TextMatch>>>;
};

/** Represents the individual results of a search. */
enum GitHub_SearchType {
  /** Returns results matching issues in repositories. */
  ISSUE = 'ISSUE',
  /** Returns results matching repositories. */
  REPOSITORY = 'REPOSITORY',
  /** Returns results matching users and organizations on GitHub. */
  USER = 'USER'
}

/** A GitHub Security Advisory */
type GitHub_SecurityAdvisory = GitHub_Node & {
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** This is a long plaintext description of the advisory */
  readonly description: Scalars['String'];
  /** The GitHub Security Advisory ID */
  readonly ghsaId: Scalars['String'];
  readonly id: Scalars['ID'];
  /** A list of identifiers for this advisory */
  readonly identifiers: ReadonlyArray<GitHub_SecurityAdvisoryIdentifier>;
  /** The organization that originated the advisory */
  readonly origin: Scalars['String'];
  /** The permalink for the advisory */
  readonly permalink: Maybe<Scalars['GitHub_URI']>;
  /** When the advisory was published */
  readonly publishedAt: Scalars['GitHub_DateTime'];
  /** A list of references for this advisory */
  readonly references: ReadonlyArray<GitHub_SecurityAdvisoryReference>;
  /** The severity of the advisory */
  readonly severity: GitHub_SecurityAdvisorySeverity;
  /** A short plaintext summary of the advisory */
  readonly summary: Scalars['String'];
  /** When the advisory was last updated */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** Vulnerabilities associated with this Advisory */
  readonly vulnerabilities: GitHub_SecurityVulnerabilityConnection;
  /** When the advisory was withdrawn, if it has been withdrawn */
  readonly withdrawnAt: Maybe<Scalars['GitHub_DateTime']>;
};


/** A GitHub Security Advisory */
type GitHub_SecurityAdvisory_vulnerabilitiesArgs = {
  orderBy?: Maybe<GitHub_SecurityVulnerabilityOrder>;
  ecosystem: Maybe<GitHub_SecurityAdvisoryEcosystem>;
  package: Maybe<Scalars['String']>;
  severities: Maybe<ReadonlyArray<GitHub_SecurityAdvisorySeverity>>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The connection type for SecurityAdvisory. */
type GitHub_SecurityAdvisoryConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_SecurityAdvisoryEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_SecurityAdvisory>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** The possible ecosystems of a security vulnerability's package. */
enum GitHub_SecurityAdvisoryEcosystem {
  /** Ruby gems hosted at RubyGems.org */
  RUBYGEMS = 'RUBYGEMS',
  /** JavaScript packages hosted at npmjs.com */
  NPM = 'NPM',
  /** Python packages hosted at PyPI.org */
  PIP = 'PIP',
  /** Java artifacts hosted at the Maven central repository */
  MAVEN = 'MAVEN',
  /** .NET packages hosted at the NuGet Gallery */
  NUGET = 'NUGET',
  /** PHP packages hosted at packagist.org */
  COMPOSER = 'COMPOSER'
}

/** An edge in a connection. */
type GitHub_SecurityAdvisoryEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_SecurityAdvisory>;
};

/** A GitHub Security Advisory Identifier */
type GitHub_SecurityAdvisoryIdentifier = {
  /** The identifier type, e.g. GHSA, CVE */
  readonly type: Scalars['String'];
  /** The identifier */
  readonly value: Scalars['String'];
};

/** An advisory identifier to filter results on. */
type GitHub_SecurityAdvisoryIdentifierFilter = {
  /** The identifier type. */
  readonly type: GitHub_SecurityAdvisoryIdentifierType;
  /** The identifier string. Supports exact or partial matching. */
  readonly value: Scalars['String'];
};

/** Identifier formats available for advisories. */
enum GitHub_SecurityAdvisoryIdentifierType {
  /** Common Vulnerabilities and Exposures Identifier. */
  CVE = 'CVE',
  /** GitHub Security Advisory ID. */
  GHSA = 'GHSA'
}

/** Ordering options for security advisory connections */
type GitHub_SecurityAdvisoryOrder = {
  /** The field to order security advisories by. */
  readonly field: GitHub_SecurityAdvisoryOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which security advisory connections can be ordered. */
enum GitHub_SecurityAdvisoryOrderField {
  /** Order advisories by publication time */
  PUBLISHED_AT = 'PUBLISHED_AT',
  /** Order advisories by update time */
  UPDATED_AT = 'UPDATED_AT'
}

/** An individual package */
type GitHub_SecurityAdvisoryPackage = {
  /** The ecosystem the package belongs to, e.g. RUBYGEMS, NPM */
  readonly ecosystem: GitHub_SecurityAdvisoryEcosystem;
  /** The package name */
  readonly name: Scalars['String'];
};

/** An individual package version */
type GitHub_SecurityAdvisoryPackageVersion = {
  /** The package name or version */
  readonly identifier: Scalars['String'];
};

/** A GitHub Security Advisory Reference */
type GitHub_SecurityAdvisoryReference = {
  /** A publicly accessible reference */
  readonly url: Scalars['GitHub_URI'];
};

/** Severity of the vulnerability. */
enum GitHub_SecurityAdvisorySeverity {
  /** Low. */
  LOW = 'LOW',
  /** Moderate. */
  MODERATE = 'MODERATE',
  /** High. */
  HIGH = 'HIGH',
  /** Critical. */
  CRITICAL = 'CRITICAL'
}

/** An individual vulnerability within an Advisory */
type GitHub_SecurityVulnerability = {
  /** The Advisory associated with this Vulnerability */
  readonly advisory: GitHub_SecurityAdvisory;
  /** The first version containing a fix for the vulnerability */
  readonly firstPatchedVersion: Maybe<GitHub_SecurityAdvisoryPackageVersion>;
  /** A description of the vulnerable package */
  readonly package: GitHub_SecurityAdvisoryPackage;
  /** The severity of the vulnerability within this package */
  readonly severity: GitHub_SecurityAdvisorySeverity;
  /** When the vulnerability was last updated */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /**
   * A string that describes the vulnerable package versions.
   * This string follows a basic syntax with a few forms.
   * + `= 0.2.0` denotes a single vulnerable version.
   * + `<= 1.0.8` denotes a version range up to and including the specified version
   * + `< 0.1.11` denotes a version range up to, but excluding, the specified version
   * + `>= 4.3.0, < 4.3.5` denotes a version range with a known minimum and maximum version.
   * + `>= 0.0.1` denotes a version range with a known minimum, but no known maximum
   */
  readonly vulnerableVersionRange: Scalars['String'];
};

/** The connection type for SecurityVulnerability. */
type GitHub_SecurityVulnerabilityConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_SecurityVulnerabilityEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_SecurityVulnerability>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_SecurityVulnerabilityEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_SecurityVulnerability>;
};

/** Ordering options for security vulnerability connections */
type GitHub_SecurityVulnerabilityOrder = {
  /** The field to order security vulnerabilities by. */
  readonly field: GitHub_SecurityVulnerabilityOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which security vulnerability connections can be ordered. */
enum GitHub_SecurityVulnerabilityOrderField {
  /** Order vulnerability by update time */
  UPDATED_AT = 'UPDATED_AT'
}

/** Autogenerated input type of SetEnterpriseIdentityProvider */
type GitHub_SetEnterpriseIdentityProviderInput = {
  /** The ID of the enterprise on which to set an identity provider. */
  readonly enterpriseId: Scalars['ID'];
  /** The URL endpoint for the identity provider's SAML SSO. */
  readonly ssoUrl: Scalars['GitHub_URI'];
  /** The Issuer Entity ID for the SAML identity provider */
  readonly issuer: Maybe<Scalars['String']>;
  /** The x509 certificate used by the identity provider to sign assertions and responses. */
  readonly idpCertificate: Scalars['String'];
  /** The signature algorithm used to sign SAML requests for the identity provider. */
  readonly signatureMethod: GitHub_SamlSignatureAlgorithm;
  /** The digest algorithm used to sign SAML requests for the identity provider. */
  readonly digestMethod: GitHub_SamlDigestAlgorithm;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of SetEnterpriseIdentityProvider */
type GitHub_SetEnterpriseIdentityProviderPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The identity provider for the enterprise. */
  readonly identityProvider: Maybe<GitHub_EnterpriseIdentityProvider>;
};

/** Represents an S/MIME signature on a Commit or Tag. */
type GitHub_SmimeSignature = GitHub_GitSignature & {
  /** Email used to sign this object. */
  readonly email: Scalars['String'];
  /** True if the signature is valid and verified by GitHub. */
  readonly isValid: Scalars['Boolean'];
  /** Payload for GPG signing object. Raw ODB object without the signature header. */
  readonly payload: Scalars['String'];
  /** ASCII-armored signature header from object. */
  readonly signature: Scalars['String'];
  /** GitHub user corresponding to the email signing this commit. */
  readonly signer: Maybe<GitHub_User>;
  /**
   * The state of this signature. `VALID` if signature is valid and verified by
   * GitHub, otherwise represents reason why signature is considered invalid.
   */
  readonly state: GitHub_GitSignatureState;
  /** True if the signature was made with GitHub's signing key. */
  readonly wasSignedByGitHub: Scalars['Boolean'];
};

/** Entites that can sponsor others via GitHub Sponsors */
type GitHub_Sponsor = GitHub_Organization | GitHub_User;

/** Entities that can be sponsored through GitHub Sponsors */
type GitHub_Sponsorable = {
  /** The GitHub Sponsors listing for this user. */
  readonly sponsorsListing: Maybe<GitHub_SponsorsListing>;
  /** This object's sponsorships as the maintainer. */
  readonly sponsorshipsAsMaintainer: GitHub_SponsorshipConnection;
  /** This object's sponsorships as the sponsor. */
  readonly sponsorshipsAsSponsor: GitHub_SponsorshipConnection;
};


/** Entities that can be sponsored through GitHub Sponsors */
type GitHub_Sponsorable_sponsorshipsAsMaintainerArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  includePrivate?: Maybe<Scalars['Boolean']>;
  orderBy: Maybe<GitHub_SponsorshipOrder>;
};


/** Entities that can be sponsored through GitHub Sponsors */
type GitHub_Sponsorable_sponsorshipsAsSponsorArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<GitHub_SponsorshipOrder>;
};

/** A sponsorship relationship between a sponsor and a maintainer */
type GitHub_Sponsorship = GitHub_Node & {
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /**
   * The entity that is being sponsored
   * @deprecated `Sponsorship.maintainer` will be removed. Use `Sponsorship.sponsorable` instead. Removal on 2020-04-01 UTC.
   */
  readonly maintainer: GitHub_User;
  /** The privacy level for this sponsorship. */
  readonly privacyLevel: GitHub_SponsorshipPrivacy;
  /**
   * The user that is sponsoring. Returns null if the sponsorship is private or if sponsor is not a user.
   * @deprecated `Sponsorship.sponsor` will be removed. Use `Sponsorship.sponsorEntity` instead. Removal on 2020-10-01 UTC.
   */
  readonly sponsor: Maybe<GitHub_User>;
  /** The user or organization that is sponsoring. Returns null if the sponsorship is private. */
  readonly sponsorEntity: Maybe<GitHub_Sponsor>;
  /** The entity that is being sponsored */
  readonly sponsorable: GitHub_Sponsorable;
  /** The associated sponsorship tier */
  readonly tier: Maybe<GitHub_SponsorsTier>;
};

/** The connection type for Sponsorship. */
type GitHub_SponsorshipConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_SponsorshipEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Sponsorship>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_SponsorshipEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_Sponsorship>;
};

/** Ordering options for sponsorship connections. */
type GitHub_SponsorshipOrder = {
  /** The field to order sponsorship by. */
  readonly field: GitHub_SponsorshipOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which sponsorship connections can be ordered. */
enum GitHub_SponsorshipOrderField {
  /** Order sponsorship by creation time. */
  CREATED_AT = 'CREATED_AT'
}

/** The privacy of a sponsorship */
enum GitHub_SponsorshipPrivacy {
  /** Public */
  PUBLIC = 'PUBLIC',
  /** Private */
  PRIVATE = 'PRIVATE'
}

/** A GitHub Sponsors listing. */
type GitHub_SponsorsListing = GitHub_Node & {
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** The full description of the listing. */
  readonly fullDescription: Scalars['String'];
  /** The full description of the listing rendered to HTML. */
  readonly fullDescriptionHTML: Scalars['GitHub_HTML'];
  readonly id: Scalars['ID'];
  /** The listing's full name. */
  readonly name: Scalars['String'];
  /** The short description of the listing. */
  readonly shortDescription: Scalars['String'];
  /** The short name of the listing. */
  readonly slug: Scalars['String'];
  /** The published tiers for this GitHub Sponsors listing. */
  readonly tiers: Maybe<GitHub_SponsorsTierConnection>;
};


/** A GitHub Sponsors listing. */
type GitHub_SponsorsListing_tiersArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy?: Maybe<GitHub_SponsorsTierOrder>;
};

/** A GitHub Sponsors tier associated with a GitHub Sponsors listing. */
type GitHub_SponsorsTier = GitHub_Node & {
  /** SponsorsTier information only visible to users that can administer the associated Sponsors listing. */
  readonly adminInfo: Maybe<GitHub_SponsorsTierAdminInfo>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** The description of the tier. */
  readonly description: Scalars['String'];
  /** The tier description rendered to HTML */
  readonly descriptionHTML: Scalars['GitHub_HTML'];
  readonly id: Scalars['ID'];
  /** How much this tier costs per month in cents. */
  readonly monthlyPriceInCents: Scalars['Int'];
  /** How much this tier costs per month in dollars. */
  readonly monthlyPriceInDollars: Scalars['Int'];
  /** The name of the tier. */
  readonly name: Scalars['String'];
  /** The sponsors listing that this tier belongs to. */
  readonly sponsorsListing: GitHub_SponsorsListing;
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
};

/** SponsorsTier information only visible to users that can administer the associated Sponsors listing. */
type GitHub_SponsorsTierAdminInfo = {
  /** The sponsorships associated with this tier. */
  readonly sponsorships: GitHub_SponsorshipConnection;
};


/** SponsorsTier information only visible to users that can administer the associated Sponsors listing. */
type GitHub_SponsorsTierAdminInfo_sponsorshipsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  includePrivate?: Maybe<Scalars['Boolean']>;
  orderBy: Maybe<GitHub_SponsorshipOrder>;
};

/** The connection type for SponsorsTier. */
type GitHub_SponsorsTierConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_SponsorsTierEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_SponsorsTier>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_SponsorsTierEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_SponsorsTier>;
};

/** Ordering options for Sponsors tiers connections. */
type GitHub_SponsorsTierOrder = {
  /** The field to order tiers by. */
  readonly field: GitHub_SponsorsTierOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which Sponsors tiers connections can be ordered. */
enum GitHub_SponsorsTierOrderField {
  /** Order tiers by creation time. */
  CREATED_AT = 'CREATED_AT',
  /** Order tiers by their monthly price in cents */
  MONTHLY_PRICE_IN_CENTS = 'MONTHLY_PRICE_IN_CENTS'
}

/** The connection type for User. */
type GitHub_StargazerConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_StargazerEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_User>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** Represents a user that's starred a repository. */
type GitHub_StargazerEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  readonly node: GitHub_User;
  /** Identifies when the item was starred. */
  readonly starredAt: Scalars['GitHub_DateTime'];
};

/** Ways in which star connections can be ordered. */
type GitHub_StarOrder = {
  /** The field in which to order nodes by. */
  readonly field: GitHub_StarOrderField;
  /** The direction in which to order nodes. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which star connections can be ordered. */
enum GitHub_StarOrderField {
  /** Allows ordering a list of stars by when they were created. */
  STARRED_AT = 'STARRED_AT'
}

/** Things that can be starred. */
type GitHub_Starrable = {
  readonly id: Scalars['ID'];
  /** A list of users who have starred this starrable. */
  readonly stargazers: GitHub_StargazerConnection;
  /** Returns a boolean indicating whether the viewing user has starred this starrable. */
  readonly viewerHasStarred: Scalars['Boolean'];
};


/** Things that can be starred. */
type GitHub_Starrable_stargazersArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<GitHub_StarOrder>;
};

/** The connection type for Repository. */
type GitHub_StarredRepositoryConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_StarredRepositoryEdge>>>;
  /** Is the list of stars for this user truncated? This is true for users that have many stars. */
  readonly isOverLimit: Scalars['Boolean'];
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Repository>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** Represents a starred repository. */
type GitHub_StarredRepositoryEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  readonly node: GitHub_Repository;
  /** Identifies when the item was starred. */
  readonly starredAt: Scalars['GitHub_DateTime'];
};

/** Represents a commit status. */
type GitHub_Status = GitHub_Node & {
  /** The commit this status is attached to. */
  readonly commit: Maybe<GitHub_Commit>;
  /** Looks up an individual status context by context name. */
  readonly context: Maybe<GitHub_StatusContext>;
  /** The individual status contexts for this commit. */
  readonly contexts: ReadonlyArray<GitHub_StatusContext>;
  readonly id: Scalars['ID'];
  /** The combined commit status. */
  readonly state: GitHub_StatusState;
};


/** Represents a commit status. */
type GitHub_Status_contextArgs = {
  name: Scalars['String'];
};

/** Represents the rollup for both the check runs and status for a commit. */
type GitHub_StatusCheckRollup = GitHub_Node & {
  /** The commit the status and check runs are attached to. */
  readonly commit: Maybe<GitHub_Commit>;
  /** A list of status contexts and check runs for this commit. */
  readonly contexts: GitHub_StatusCheckRollupContextConnection;
  readonly id: Scalars['ID'];
  /** The combined status for the commit. */
  readonly state: GitHub_StatusState;
};


/** Represents the rollup for both the check runs and status for a commit. */
type GitHub_StatusCheckRollup_contextsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** Types that can be inside a StatusCheckRollup context. */
type GitHub_StatusCheckRollupContext = GitHub_StatusContext;

/** The connection type for StatusCheckRollupContext. */
type GitHub_StatusCheckRollupContextConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_StatusCheckRollupContextEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_StatusCheckRollupContext>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_StatusCheckRollupContextEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_StatusCheckRollupContext>;
};

/** Represents an individual commit status context */
type GitHub_StatusContext = GitHub_Node & {
  /** The avatar of the OAuth application or the user that created the status */
  readonly avatarUrl: Maybe<Scalars['GitHub_URI']>;
  /** This commit this status context is attached to. */
  readonly commit: Maybe<GitHub_Commit>;
  /** The name of this status context. */
  readonly context: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** The actor who created this status context. */
  readonly creator: Maybe<GitHub_Actor>;
  /** The description for this status context. */
  readonly description: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  /** The state of this status context. */
  readonly state: GitHub_StatusState;
  /** The URL for this status context. */
  readonly targetUrl: Maybe<Scalars['GitHub_URI']>;
};


/** Represents an individual commit status context */
type GitHub_StatusContext_avatarUrlArgs = {
  size?: Maybe<Scalars['Int']>;
};

/** The possible commit status states. */
enum GitHub_StatusState {
  /** Status is expected. */
  EXPECTED = 'EXPECTED',
  /** Status is errored. */
  ERROR = 'ERROR',
  /** Status is failing. */
  FAILURE = 'FAILURE',
  /** Status is pending. */
  PENDING = 'PENDING',
  /** Status is successful. */
  SUCCESS = 'SUCCESS'
}

/** Autogenerated input type of SubmitPullRequestReview */
type GitHub_SubmitPullRequestReviewInput = {
  /** The Pull Request ID to submit any pending reviews. */
  readonly pullRequestId: Maybe<Scalars['ID']>;
  /** The Pull Request Review ID to submit. */
  readonly pullRequestReviewId: Maybe<Scalars['ID']>;
  /** The event to send to the Pull Request Review. */
  readonly event: GitHub_PullRequestReviewEvent;
  /** The text field to set on the Pull Request Review. */
  readonly body: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of SubmitPullRequestReview */
type GitHub_SubmitPullRequestReviewPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The submitted pull request review. */
  readonly pullRequestReview: Maybe<GitHub_PullRequestReview>;
};

/** A pointer to a repository at a specific revision embedded inside another repository. */
type GitHub_Submodule = {
  /** The branch of the upstream submodule for tracking updates */
  readonly branch: Maybe<Scalars['String']>;
  /** The git URL of the submodule repository */
  readonly gitUrl: Scalars['GitHub_URI'];
  /** The name of the submodule in .gitmodules */
  readonly name: Scalars['String'];
  /** The path in the superproject that this submodule is located in */
  readonly path: Scalars['String'];
  /** The commit revision of the subproject repository being tracked by the submodule */
  readonly subprojectCommitOid: Maybe<Scalars['GitHub_GitObjectID']>;
};

/** The connection type for Submodule. */
type GitHub_SubmoduleConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_SubmoduleEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Submodule>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_SubmoduleEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_Submodule>;
};

/** Entities that can be subscribed to for web and email notifications. */
type GitHub_Subscribable = {
  readonly id: Scalars['ID'];
  /** Check if the viewer is able to change their subscription status for the repository. */
  readonly viewerCanSubscribe: Scalars['Boolean'];
  /** Identifies if the viewer is watching, not watching, or ignoring the subscribable entity. */
  readonly viewerSubscription: Maybe<GitHub_SubscriptionState>;
};

/** Represents a 'subscribed' event on a given `Subscribable`. */
type GitHub_SubscribedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** Object referenced by event. */
  readonly subscribable: GitHub_Subscribable;
};

/** The possible states of a subscription. */
enum GitHub_SubscriptionState {
  /** The User is only notified when participating or @mentioned. */
  UNSUBSCRIBED = 'UNSUBSCRIBED',
  /** The User is notified of all conversations. */
  SUBSCRIBED = 'SUBSCRIBED',
  /** The User is never notified. */
  IGNORED = 'IGNORED'
}

/** A suggestion to review a pull request based on a user's commit history and review comments. */
type GitHub_SuggestedReviewer = {
  /** Is this suggestion based on past commits? */
  readonly isAuthor: Scalars['Boolean'];
  /** Is this suggestion based on past review comments? */
  readonly isCommenter: Scalars['Boolean'];
  /** Identifies the user suggested to review the pull request. */
  readonly reviewer: GitHub_User;
};

/** Represents a Git tag. */
type GitHub_Tag = GitHub_Node & GitHub_GitObject & {
  /** An abbreviated version of the Git object ID */
  readonly abbreviatedOid: Scalars['String'];
  /** The HTTP path for this Git object */
  readonly commitResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this Git object */
  readonly commitUrl: Scalars['GitHub_URI'];
  readonly id: Scalars['ID'];
  /** The Git tag message. */
  readonly message: Maybe<Scalars['String']>;
  /** The Git tag name. */
  readonly name: Scalars['String'];
  /** The Git object ID */
  readonly oid: Scalars['GitHub_GitObjectID'];
  /** The Repository the Git object belongs to */
  readonly repository: GitHub_Repository;
  /** Details about the tag author. */
  readonly tagger: Maybe<GitHub_GitActor>;
  /** The Git object the tag points to. */
  readonly target: GitHub_GitObject;
};

/** A team of users in an organization. */
type GitHub_Team = GitHub_Node & GitHub_Subscribable & GitHub_MemberStatusable & {
  /** A list of teams that are ancestors of this team. */
  readonly ancestors: GitHub_TeamConnection;
  /** A URL pointing to the team's avatar. */
  readonly avatarUrl: Maybe<Scalars['GitHub_URI']>;
  /** List of child teams belonging to this team */
  readonly childTeams: GitHub_TeamConnection;
  /** The slug corresponding to the organization and team. */
  readonly combinedSlug: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** The description of the team. */
  readonly description: Maybe<Scalars['String']>;
  /** Find a team discussion by its number. */
  readonly discussion: Maybe<GitHub_TeamDiscussion>;
  /** A list of team discussions. */
  readonly discussions: GitHub_TeamDiscussionConnection;
  /** The HTTP path for team discussions */
  readonly discussionsResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for team discussions */
  readonly discussionsUrl: Scalars['GitHub_URI'];
  /** The HTTP path for editing this team */
  readonly editTeamResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for editing this team */
  readonly editTeamUrl: Scalars['GitHub_URI'];
  readonly id: Scalars['ID'];
  /** A list of pending invitations for users to this team */
  readonly invitations: Maybe<GitHub_OrganizationInvitationConnection>;
  /** Get the status messages members of this entity have set that are either public or visible only to the organization. */
  readonly memberStatuses: GitHub_UserStatusConnection;
  /** A list of users who are members of this team. */
  readonly members: GitHub_TeamMemberConnection;
  /** The HTTP path for the team' members */
  readonly membersResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for the team' members */
  readonly membersUrl: Scalars['GitHub_URI'];
  /** The name of the team. */
  readonly name: Scalars['String'];
  /** The HTTP path creating a new team */
  readonly newTeamResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL creating a new team */
  readonly newTeamUrl: Scalars['GitHub_URI'];
  /** The organization that owns this team. */
  readonly organization: GitHub_Organization;
  /** The parent team of the team. */
  readonly parentTeam: Maybe<GitHub_Team>;
  /** The level of privacy the team has. */
  readonly privacy: GitHub_TeamPrivacy;
  /** A list of repositories this team has access to. */
  readonly repositories: GitHub_TeamRepositoryConnection;
  /** The HTTP path for this team's repositories */
  readonly repositoriesResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this team's repositories */
  readonly repositoriesUrl: Scalars['GitHub_URI'];
  /** The HTTP path for this team */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The slug corresponding to the team. */
  readonly slug: Scalars['String'];
  /** The HTTP path for this team's teams */
  readonly teamsResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this team's teams */
  readonly teamsUrl: Scalars['GitHub_URI'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL for this team */
  readonly url: Scalars['GitHub_URI'];
  /** Team is adminable by the viewer. */
  readonly viewerCanAdminister: Scalars['Boolean'];
  /** Check if the viewer is able to change their subscription status for the repository. */
  readonly viewerCanSubscribe: Scalars['Boolean'];
  /** Identifies if the viewer is watching, not watching, or ignoring the subscribable entity. */
  readonly viewerSubscription: Maybe<GitHub_SubscriptionState>;
};


/** A team of users in an organization. */
type GitHub_Team_ancestorsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A team of users in an organization. */
type GitHub_Team_avatarUrlArgs = {
  size?: Maybe<Scalars['Int']>;
};


/** A team of users in an organization. */
type GitHub_Team_childTeamsArgs = {
  orderBy: Maybe<GitHub_TeamOrder>;
  userLogins: Maybe<ReadonlyArray<Scalars['String']>>;
  immediateOnly?: Maybe<Scalars['Boolean']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A team of users in an organization. */
type GitHub_Team_discussionArgs = {
  number: Scalars['Int'];
};


/** A team of users in an organization. */
type GitHub_Team_discussionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  isPinned: Maybe<Scalars['Boolean']>;
  orderBy: Maybe<GitHub_TeamDiscussionOrder>;
};


/** A team of users in an organization. */
type GitHub_Team_invitationsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A team of users in an organization. */
type GitHub_Team_memberStatusesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy?: Maybe<GitHub_UserStatusOrder>;
};


/** A team of users in an organization. */
type GitHub_Team_membersArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  query: Maybe<Scalars['String']>;
  membership?: Maybe<GitHub_TeamMembershipType>;
  role: Maybe<GitHub_TeamMemberRole>;
  orderBy: Maybe<GitHub_TeamMemberOrder>;
};


/** A team of users in an organization. */
type GitHub_Team_repositoriesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  query: Maybe<Scalars['String']>;
  orderBy: Maybe<GitHub_TeamRepositoryOrder>;
};

/** Audit log entry for a team.add_member event. */
type GitHub_TeamAddMemberAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & GitHub_TeamAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** Whether the team was mapped to an LDAP Group. */
  readonly isLdapMapped: Maybe<Scalars['Boolean']>;
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The team associated with the action */
  readonly team: Maybe<GitHub_Team>;
  /** The name of the team */
  readonly teamName: Maybe<Scalars['String']>;
  /** The HTTP path for this team */
  readonly teamResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for this team */
  readonly teamUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a team.add_repository event. */
type GitHub_TeamAddRepositoryAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & GitHub_RepositoryAuditEntryData & GitHub_TeamAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** Whether the team was mapped to an LDAP Group. */
  readonly isLdapMapped: Maybe<Scalars['Boolean']>;
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The team associated with the action */
  readonly team: Maybe<GitHub_Team>;
  /** The name of the team */
  readonly teamName: Maybe<Scalars['String']>;
  /** The HTTP path for this team */
  readonly teamResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for this team */
  readonly teamUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Metadata for an audit entry with action team.* */
type GitHub_TeamAuditEntryData = {
  /** The team associated with the action */
  readonly team: Maybe<GitHub_Team>;
  /** The name of the team */
  readonly teamName: Maybe<Scalars['String']>;
  /** The HTTP path for this team */
  readonly teamResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for this team */
  readonly teamUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a team.change_parent_team event. */
type GitHub_TeamChangeParentTeamAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & GitHub_TeamAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** Whether the team was mapped to an LDAP Group. */
  readonly isLdapMapped: Maybe<Scalars['Boolean']>;
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The new parent team. */
  readonly parentTeam: Maybe<GitHub_Team>;
  /** The name of the new parent team */
  readonly parentTeamName: Maybe<Scalars['String']>;
  /** The name of the former parent team */
  readonly parentTeamNameWas: Maybe<Scalars['String']>;
  /** The HTTP path for the parent team */
  readonly parentTeamResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the parent team */
  readonly parentTeamUrl: Maybe<Scalars['GitHub_URI']>;
  /** The former parent team. */
  readonly parentTeamWas: Maybe<GitHub_Team>;
  /** The HTTP path for the previous parent team */
  readonly parentTeamWasResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the previous parent team */
  readonly parentTeamWasUrl: Maybe<Scalars['GitHub_URI']>;
  /** The team associated with the action */
  readonly team: Maybe<GitHub_Team>;
  /** The name of the team */
  readonly teamName: Maybe<Scalars['String']>;
  /** The HTTP path for this team */
  readonly teamResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for this team */
  readonly teamUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** The connection type for Team. */
type GitHub_TeamConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_TeamEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Team>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** A team discussion. */
type GitHub_TeamDiscussion = GitHub_Node & GitHub_Comment & GitHub_Deletable & GitHub_Reactable & GitHub_Subscribable & GitHub_UniformResourceLocatable & GitHub_Updatable & GitHub_UpdatableComment & {
  /** The actor who authored the comment. */
  readonly author: Maybe<GitHub_Actor>;
  /** Author's association with the discussion's team. */
  readonly authorAssociation: GitHub_CommentAuthorAssociation;
  /** The body as Markdown. */
  readonly body: Scalars['String'];
  /** The body rendered to HTML. */
  readonly bodyHTML: Scalars['GitHub_HTML'];
  /** The body rendered to text. */
  readonly bodyText: Scalars['String'];
  /** Identifies the discussion body hash. */
  readonly bodyVersion: Scalars['String'];
  /** A list of comments on this discussion. */
  readonly comments: GitHub_TeamDiscussionCommentConnection;
  /** The HTTP path for discussion comments */
  readonly commentsResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for discussion comments */
  readonly commentsUrl: Scalars['GitHub_URI'];
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Check if this comment was created via an email reply. */
  readonly createdViaEmail: Scalars['Boolean'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** The actor who edited the comment. */
  readonly editor: Maybe<GitHub_Actor>;
  readonly id: Scalars['ID'];
  /** Check if this comment was edited and includes an edit with the creation data */
  readonly includesCreatedEdit: Scalars['Boolean'];
  /** Whether or not the discussion is pinned. */
  readonly isPinned: Scalars['Boolean'];
  /** Whether or not the discussion is only visible to team members and org admins. */
  readonly isPrivate: Scalars['Boolean'];
  /** The moment the editor made the last edit */
  readonly lastEditedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** Identifies the discussion within its team. */
  readonly number: Scalars['Int'];
  /** Identifies when the comment was published at. */
  readonly publishedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** A list of reactions grouped by content left on the subject. */
  readonly reactionGroups: Maybe<ReadonlyArray<GitHub_ReactionGroup>>;
  /** A list of Reactions left on the Issue. */
  readonly reactions: GitHub_ReactionConnection;
  /** The HTTP path for this discussion */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The team that defines the context of this discussion. */
  readonly team: GitHub_Team;
  /** The title of the discussion */
  readonly title: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL for this discussion */
  readonly url: Scalars['GitHub_URI'];
  /** A list of edits to this content. */
  readonly userContentEdits: Maybe<GitHub_UserContentEditConnection>;
  /** Check if the current viewer can delete this object. */
  readonly viewerCanDelete: Scalars['Boolean'];
  /** Whether or not the current viewer can pin this discussion. */
  readonly viewerCanPin: Scalars['Boolean'];
  /** Can user react to this subject */
  readonly viewerCanReact: Scalars['Boolean'];
  /** Check if the viewer is able to change their subscription status for the repository. */
  readonly viewerCanSubscribe: Scalars['Boolean'];
  /** Check if the current viewer can update this object. */
  readonly viewerCanUpdate: Scalars['Boolean'];
  /** Reasons why the current viewer can not update this comment. */
  readonly viewerCannotUpdateReasons: ReadonlyArray<GitHub_CommentCannotUpdateReason>;
  /** Did the viewer author this comment. */
  readonly viewerDidAuthor: Scalars['Boolean'];
  /** Identifies if the viewer is watching, not watching, or ignoring the subscribable entity. */
  readonly viewerSubscription: Maybe<GitHub_SubscriptionState>;
};


/** A team discussion. */
type GitHub_TeamDiscussion_commentsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<GitHub_TeamDiscussionCommentOrder>;
  fromComment: Maybe<Scalars['Int']>;
};


/** A team discussion. */
type GitHub_TeamDiscussion_reactionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  content: Maybe<GitHub_ReactionContent>;
  orderBy: Maybe<GitHub_ReactionOrder>;
};


/** A team discussion. */
type GitHub_TeamDiscussion_userContentEditsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** A comment on a team discussion. */
type GitHub_TeamDiscussionComment = GitHub_Node & GitHub_Comment & GitHub_Deletable & GitHub_Reactable & GitHub_UniformResourceLocatable & GitHub_Updatable & GitHub_UpdatableComment & {
  /** The actor who authored the comment. */
  readonly author: Maybe<GitHub_Actor>;
  /** Author's association with the comment's team. */
  readonly authorAssociation: GitHub_CommentAuthorAssociation;
  /** The body as Markdown. */
  readonly body: Scalars['String'];
  /** The body rendered to HTML. */
  readonly bodyHTML: Scalars['GitHub_HTML'];
  /** The body rendered to text. */
  readonly bodyText: Scalars['String'];
  /** The current version of the body content. */
  readonly bodyVersion: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Check if this comment was created via an email reply. */
  readonly createdViaEmail: Scalars['Boolean'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** The discussion this comment is about. */
  readonly discussion: GitHub_TeamDiscussion;
  /** The actor who edited the comment. */
  readonly editor: Maybe<GitHub_Actor>;
  readonly id: Scalars['ID'];
  /** Check if this comment was edited and includes an edit with the creation data */
  readonly includesCreatedEdit: Scalars['Boolean'];
  /** The moment the editor made the last edit */
  readonly lastEditedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** Identifies the comment number. */
  readonly number: Scalars['Int'];
  /** Identifies when the comment was published at. */
  readonly publishedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** A list of reactions grouped by content left on the subject. */
  readonly reactionGroups: Maybe<ReadonlyArray<GitHub_ReactionGroup>>;
  /** A list of Reactions left on the Issue. */
  readonly reactions: GitHub_ReactionConnection;
  /** The HTTP path for this comment */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL for this comment */
  readonly url: Scalars['GitHub_URI'];
  /** A list of edits to this content. */
  readonly userContentEdits: Maybe<GitHub_UserContentEditConnection>;
  /** Check if the current viewer can delete this object. */
  readonly viewerCanDelete: Scalars['Boolean'];
  /** Can user react to this subject */
  readonly viewerCanReact: Scalars['Boolean'];
  /** Check if the current viewer can update this object. */
  readonly viewerCanUpdate: Scalars['Boolean'];
  /** Reasons why the current viewer can not update this comment. */
  readonly viewerCannotUpdateReasons: ReadonlyArray<GitHub_CommentCannotUpdateReason>;
  /** Did the viewer author this comment. */
  readonly viewerDidAuthor: Scalars['Boolean'];
};


/** A comment on a team discussion. */
type GitHub_TeamDiscussionComment_reactionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  content: Maybe<GitHub_ReactionContent>;
  orderBy: Maybe<GitHub_ReactionOrder>;
};


/** A comment on a team discussion. */
type GitHub_TeamDiscussionComment_userContentEditsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The connection type for TeamDiscussionComment. */
type GitHub_TeamDiscussionCommentConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_TeamDiscussionCommentEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_TeamDiscussionComment>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_TeamDiscussionCommentEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_TeamDiscussionComment>;
};

/** Ways in which team discussion comment connections can be ordered. */
type GitHub_TeamDiscussionCommentOrder = {
  /** The field by which to order nodes. */
  readonly field: GitHub_TeamDiscussionCommentOrderField;
  /** The direction in which to order nodes. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which team discussion comment connections can be ordered. */
enum GitHub_TeamDiscussionCommentOrderField {
  /** Allows sequential ordering of team discussion comments (which is equivalent to chronological ordering). */
  NUMBER = 'NUMBER'
}

/** The connection type for TeamDiscussion. */
type GitHub_TeamDiscussionConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_TeamDiscussionEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_TeamDiscussion>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_TeamDiscussionEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_TeamDiscussion>;
};

/** Ways in which team discussion connections can be ordered. */
type GitHub_TeamDiscussionOrder = {
  /** The field by which to order nodes. */
  readonly field: GitHub_TeamDiscussionOrderField;
  /** The direction in which to order nodes. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which team discussion connections can be ordered. */
enum GitHub_TeamDiscussionOrderField {
  /** Allows chronological ordering of team discussions. */
  CREATED_AT = 'CREATED_AT'
}

/** An edge in a connection. */
type GitHub_TeamEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_Team>;
};

/** The connection type for User. */
type GitHub_TeamMemberConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_TeamMemberEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_User>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** Represents a user who is a member of a team. */
type GitHub_TeamMemberEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The HTTP path to the organization's member access page. */
  readonly memberAccessResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL to the organization's member access page. */
  readonly memberAccessUrl: Scalars['GitHub_URI'];
  readonly node: GitHub_User;
  /** The role the member has on the team. */
  readonly role: GitHub_TeamMemberRole;
};

/** Ordering options for team member connections */
type GitHub_TeamMemberOrder = {
  /** The field to order team members by. */
  readonly field: GitHub_TeamMemberOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which team member connections can be ordered. */
enum GitHub_TeamMemberOrderField {
  /** Order team members by login */
  LOGIN = 'LOGIN',
  /** Order team members by creation time */
  CREATED_AT = 'CREATED_AT'
}

/** The possible team member roles; either 'maintainer' or 'member'. */
enum GitHub_TeamMemberRole {
  /** A team maintainer has permission to add and remove team members. */
  MAINTAINER = 'MAINTAINER',
  /** A team member has no administrative permissions on the team. */
  MEMBER = 'MEMBER'
}

/** Defines which types of team members are included in the returned list. Can be one of IMMEDIATE, CHILD_TEAM or ALL. */
enum GitHub_TeamMembershipType {
  /** Includes only immediate members of the team. */
  IMMEDIATE = 'IMMEDIATE',
  /** Includes only child team members for the team. */
  CHILD_TEAM = 'CHILD_TEAM',
  /** Includes immediate and child team members for the team. */
  ALL = 'ALL'
}

/** Ways in which team connections can be ordered. */
type GitHub_TeamOrder = {
  /** The field in which to order nodes by. */
  readonly field: GitHub_TeamOrderField;
  /** The direction in which to order nodes. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which team connections can be ordered. */
enum GitHub_TeamOrderField {
  /** Allows ordering a list of teams by name. */
  NAME = 'NAME'
}

/** The possible team privacy values. */
enum GitHub_TeamPrivacy {
  /** A secret team can only be seen by its members. */
  SECRET = 'SECRET',
  /** A visible team can be seen and @mentioned by every member of the organization. */
  VISIBLE = 'VISIBLE'
}

/** Audit log entry for a team.remove_member event. */
type GitHub_TeamRemoveMemberAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & GitHub_TeamAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** Whether the team was mapped to an LDAP Group. */
  readonly isLdapMapped: Maybe<Scalars['Boolean']>;
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The team associated with the action */
  readonly team: Maybe<GitHub_Team>;
  /** The name of the team */
  readonly teamName: Maybe<Scalars['String']>;
  /** The HTTP path for this team */
  readonly teamResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for this team */
  readonly teamUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** Audit log entry for a team.remove_repository event. */
type GitHub_TeamRemoveRepositoryAuditEntry = GitHub_Node & GitHub_AuditEntry & GitHub_OrganizationAuditEntryData & GitHub_RepositoryAuditEntryData & GitHub_TeamAuditEntryData & {
  /** The action name */
  readonly action: Scalars['String'];
  /** The user who initiated the action */
  readonly actor: Maybe<GitHub_AuditEntryActor>;
  /** The IP address of the actor */
  readonly actorIp: Maybe<Scalars['String']>;
  /** A readable representation of the actor's location */
  readonly actorLocation: Maybe<GitHub_ActorLocation>;
  /** The username of the user who initiated the action */
  readonly actorLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the actor. */
  readonly actorResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the actor. */
  readonly actorUrl: Maybe<Scalars['GitHub_URI']>;
  /** The time the action was initiated */
  readonly createdAt: Scalars['GitHub_PreciseDateTime'];
  readonly id: Scalars['ID'];
  /** Whether the team was mapped to an LDAP Group. */
  readonly isLdapMapped: Maybe<Scalars['Boolean']>;
  /** The corresponding operation type for the action */
  readonly operationType: Maybe<GitHub_OperationType>;
  /** The Organization associated with the Audit Entry. */
  readonly organization: Maybe<GitHub_Organization>;
  /** The name of the Organization. */
  readonly organizationName: Maybe<Scalars['String']>;
  /** The HTTP path for the organization */
  readonly organizationResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the organization */
  readonly organizationUrl: Maybe<Scalars['GitHub_URI']>;
  /** The repository associated with the action */
  readonly repository: Maybe<GitHub_Repository>;
  /** The name of the repository */
  readonly repositoryName: Maybe<Scalars['String']>;
  /** The HTTP path for the repository */
  readonly repositoryResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the repository */
  readonly repositoryUrl: Maybe<Scalars['GitHub_URI']>;
  /** The team associated with the action */
  readonly team: Maybe<GitHub_Team>;
  /** The name of the team */
  readonly teamName: Maybe<Scalars['String']>;
  /** The HTTP path for this team */
  readonly teamResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for this team */
  readonly teamUrl: Maybe<Scalars['GitHub_URI']>;
  /** The user affected by the action */
  readonly user: Maybe<GitHub_User>;
  /** For actions involving two users, the actor is the initiator and the user is the affected user. */
  readonly userLogin: Maybe<Scalars['String']>;
  /** The HTTP path for the user. */
  readonly userResourcePath: Maybe<Scalars['GitHub_URI']>;
  /** The HTTP URL for the user. */
  readonly userUrl: Maybe<Scalars['GitHub_URI']>;
};

/** The connection type for Repository. */
type GitHub_TeamRepositoryConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_TeamRepositoryEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_Repository>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** Represents a team repository. */
type GitHub_TeamRepositoryEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  readonly node: GitHub_Repository;
  /**
   * The permission level the team has on the repository
   * 
   * **Upcoming Change on 2020-10-01 UTC**
   * **Description:** Type for `permission` will change from `RepositoryPermission!` to `String`.
   * **Reason:** This field may return additional values
   */
  readonly permission: GitHub_RepositoryPermission;
};

/** Ordering options for team repository connections */
type GitHub_TeamRepositoryOrder = {
  /** The field to order repositories by. */
  readonly field: GitHub_TeamRepositoryOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which team repository connections can be ordered. */
enum GitHub_TeamRepositoryOrderField {
  /** Order repositories by creation time */
  CREATED_AT = 'CREATED_AT',
  /** Order repositories by update time */
  UPDATED_AT = 'UPDATED_AT',
  /** Order repositories by push time */
  PUSHED_AT = 'PUSHED_AT',
  /** Order repositories by name */
  NAME = 'NAME',
  /** Order repositories by permission */
  PERMISSION = 'PERMISSION',
  /** Order repositories by number of stargazers */
  STARGAZERS = 'STARGAZERS'
}

/** The role of a user on a team. */
enum GitHub_TeamRole {
  /** User has admin rights on the team. */
  ADMIN = 'ADMIN',
  /** User is a member of the team. */
  MEMBER = 'MEMBER'
}

/** A text match within a search result. */
type GitHub_TextMatch = {
  /** The specific text fragment within the property matched on. */
  readonly fragment: Scalars['String'];
  /** Highlights within the matched fragment. */
  readonly highlights: ReadonlyArray<GitHub_TextMatchHighlight>;
  /** The property matched on. */
  readonly property: Scalars['String'];
};

/** Represents a single highlight in a search result match. */
type GitHub_TextMatchHighlight = {
  /** The indice in the fragment where the matched text begins. */
  readonly beginIndice: Scalars['Int'];
  /** The indice in the fragment where the matched text ends. */
  readonly endIndice: Scalars['Int'];
  /** The text matched. */
  readonly text: Scalars['String'];
};

/** A topic aggregates entities that are related to a subject. */
type GitHub_Topic = GitHub_Node & GitHub_Starrable & {
  readonly id: Scalars['ID'];
  /** The topic's name. */
  readonly name: Scalars['String'];
  /**
   * A list of related topics, including aliases of this topic, sorted with the most relevant
   * first. Returns up to 10 Topics.
   */
  readonly relatedTopics: ReadonlyArray<GitHub_Topic>;
  /** A list of users who have starred this starrable. */
  readonly stargazers: GitHub_StargazerConnection;
  /** Returns a boolean indicating whether the viewing user has starred this starrable. */
  readonly viewerHasStarred: Scalars['Boolean'];
};


/** A topic aggregates entities that are related to a subject. */
type GitHub_Topic_relatedTopicsArgs = {
  first?: Maybe<Scalars['Int']>;
};


/** A topic aggregates entities that are related to a subject. */
type GitHub_Topic_stargazersArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<GitHub_StarOrder>;
};

/** Metadata for an audit entry with a topic. */
type GitHub_TopicAuditEntryData = {
  /** The name of the topic added to the repository */
  readonly topic: Maybe<GitHub_Topic>;
  /** The name of the topic added to the repository */
  readonly topicName: Maybe<Scalars['String']>;
};

/** Reason that the suggested topic is declined. */
enum GitHub_TopicSuggestionDeclineReason {
  /** The suggested topic is not relevant to the repository. */
  NOT_RELEVANT = 'NOT_RELEVANT',
  /** The suggested topic is too specific for the repository (e.g. #ruby-on-rails-version-4-2-1). */
  TOO_SPECIFIC = 'TOO_SPECIFIC',
  /** The viewer does not like the suggested topic. */
  PERSONAL_PREFERENCE = 'PERSONAL_PREFERENCE',
  /** The suggested topic is too general for the repository. */
  TOO_GENERAL = 'TOO_GENERAL'
}

/** Autogenerated input type of TransferIssue */
type GitHub_TransferIssueInput = {
  /** The Node ID of the issue to be transferred */
  readonly issueId: Scalars['ID'];
  /** The Node ID of the repository the issue should be transferred to */
  readonly repositoryId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of TransferIssue */
type GitHub_TransferIssuePayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The issue that was transferred */
  readonly issue: Maybe<GitHub_Issue>;
};

/** Represents a 'transferred' event on a given issue or pull request. */
type GitHub_TransferredEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** The repository this came from */
  readonly fromRepository: Maybe<GitHub_Repository>;
  readonly id: Scalars['ID'];
  /** Identifies the issue associated with the event. */
  readonly issue: GitHub_Issue;
};

/** Represents a Git tree. */
type GitHub_Tree = GitHub_Node & GitHub_GitObject & {
  /** An abbreviated version of the Git object ID */
  readonly abbreviatedOid: Scalars['String'];
  /** The HTTP path for this Git object */
  readonly commitResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL for this Git object */
  readonly commitUrl: Scalars['GitHub_URI'];
  /** A list of tree entries. */
  readonly entries: Maybe<ReadonlyArray<GitHub_TreeEntry>>;
  readonly id: Scalars['ID'];
  /** The Git object ID */
  readonly oid: Scalars['GitHub_GitObjectID'];
  /** The Repository the Git object belongs to */
  readonly repository: GitHub_Repository;
};

/** Represents a Git tree entry. */
type GitHub_TreeEntry = {
  /** Entry file mode. */
  readonly mode: Scalars['Int'];
  /** Entry file name. */
  readonly name: Scalars['String'];
  /** Entry file object. */
  readonly object: Maybe<GitHub_GitObject>;
  /** Entry file Git object ID. */
  readonly oid: Scalars['GitHub_GitObjectID'];
  /** The Repository the tree entry belongs to */
  readonly repository: GitHub_Repository;
  /** If the TreeEntry is for a directory occupied by a submodule project, this returns the corresponding submodule */
  readonly submodule: Maybe<GitHub_Submodule>;
  /** Entry file type. */
  readonly type: Scalars['String'];
};

/** Autogenerated input type of UnarchiveRepository */
type GitHub_UnarchiveRepositoryInput = {
  /** The ID of the repository to unarchive. */
  readonly repositoryId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UnarchiveRepository */
type GitHub_UnarchiveRepositoryPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The repository that was unarchived. */
  readonly repository: Maybe<GitHub_Repository>;
};

/** Represents an 'unassigned' event on any assignable object. */
type GitHub_UnassignedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the assignable associated with the event. */
  readonly assignable: GitHub_Assignable;
  /** Identifies the user or mannequin that was unassigned. */
  readonly assignee: Maybe<GitHub_Assignee>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /**
   * Identifies the subject (user) who was unassigned.
   * @deprecated Assignees can now be mannequins. Use the `assignee` field instead. Removal on 2020-01-01 UTC.
   */
  readonly user: Maybe<GitHub_User>;
};

/** Autogenerated input type of UnfollowUser */
type GitHub_UnfollowUserInput = {
  /** ID of the user to unfollow. */
  readonly userId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UnfollowUser */
type GitHub_UnfollowUserPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The user that was unfollowed. */
  readonly user: Maybe<GitHub_User>;
};

/** Represents a type that can be retrieved by a URL. */
type GitHub_UniformResourceLocatable = {
  /** The HTML path to this resource. */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** The URL to this resource. */
  readonly url: Scalars['GitHub_URI'];
};

/** Represents an unknown signature on a Commit or Tag. */
type GitHub_UnknownSignature = GitHub_GitSignature & {
  /** Email used to sign this object. */
  readonly email: Scalars['String'];
  /** True if the signature is valid and verified by GitHub. */
  readonly isValid: Scalars['Boolean'];
  /** Payload for GPG signing object. Raw ODB object without the signature header. */
  readonly payload: Scalars['String'];
  /** ASCII-armored signature header from object. */
  readonly signature: Scalars['String'];
  /** GitHub user corresponding to the email signing this commit. */
  readonly signer: Maybe<GitHub_User>;
  /**
   * The state of this signature. `VALID` if signature is valid and verified by
   * GitHub, otherwise represents reason why signature is considered invalid.
   */
  readonly state: GitHub_GitSignatureState;
  /** True if the signature was made with GitHub's signing key. */
  readonly wasSignedByGitHub: Scalars['Boolean'];
};

/** Represents an 'unlabeled' event on a given issue or pull request. */
type GitHub_UnlabeledEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** Identifies the label associated with the 'unlabeled' event. */
  readonly label: GitHub_Label;
  /** Identifies the `Labelable` associated with the event. */
  readonly labelable: GitHub_Labelable;
};

/** Autogenerated input type of UnlinkRepositoryFromProject */
type GitHub_UnlinkRepositoryFromProjectInput = {
  /** The ID of the Project linked to the Repository. */
  readonly projectId: Scalars['ID'];
  /** The ID of the Repository linked to the Project. */
  readonly repositoryId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UnlinkRepositoryFromProject */
type GitHub_UnlinkRepositoryFromProjectPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The linked Project. */
  readonly project: Maybe<GitHub_Project>;
  /** The linked Repository. */
  readonly repository: Maybe<GitHub_Repository>;
};

/** Represents an 'unlocked' event on a given issue or pull request. */
type GitHub_UnlockedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** Object that was unlocked. */
  readonly lockable: GitHub_Lockable;
};

/** Autogenerated input type of UnlockLockable */
type GitHub_UnlockLockableInput = {
  /** ID of the issue or pull request to be unlocked. */
  readonly lockableId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UnlockLockable */
type GitHub_UnlockLockablePayload = {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The item that was unlocked. */
  readonly unlockedRecord: Maybe<GitHub_Lockable>;
};

/** Represents an 'unmarked_as_duplicate' event on a given issue or pull request. */
type GitHub_UnmarkedAsDuplicateEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
};

/** Autogenerated input type of UnmarkIssueAsDuplicate */
type GitHub_UnmarkIssueAsDuplicateInput = {
  /** ID of the issue or pull request currently marked as a duplicate. */
  readonly duplicateId: Scalars['ID'];
  /** ID of the issue or pull request currently considered canonical/authoritative/original. */
  readonly canonicalId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UnmarkIssueAsDuplicate */
type GitHub_UnmarkIssueAsDuplicatePayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The issue or pull request that was marked as a duplicate. */
  readonly duplicate: Maybe<GitHub_IssueOrPullRequest>;
};

/** Autogenerated input type of UnminimizeComment */
type GitHub_UnminimizeCommentInput = {
  /** The Node ID of the subject to modify. */
  readonly subjectId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UnminimizeComment */
type GitHub_UnminimizeCommentPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The comment that was unminimized. */
  readonly unminimizedComment: Maybe<GitHub_Minimizable>;
};

/** Represents an 'unpinned' event on a given issue or pull request. */
type GitHub_UnpinnedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** Identifies the issue associated with the event. */
  readonly issue: GitHub_Issue;
};

/** Autogenerated input type of UnresolveReviewThread */
type GitHub_UnresolveReviewThreadInput = {
  /** The ID of the thread to unresolve */
  readonly threadId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UnresolveReviewThread */
type GitHub_UnresolveReviewThreadPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The thread to resolve. */
  readonly thread: Maybe<GitHub_PullRequestReviewThread>;
};

/** Represents an 'unsubscribed' event on a given `Subscribable`. */
type GitHub_UnsubscribedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** Object referenced by event. */
  readonly subscribable: GitHub_Subscribable;
};

/** Entities that can be updated. */
type GitHub_Updatable = {
  /** Check if the current viewer can update this object. */
  readonly viewerCanUpdate: Scalars['Boolean'];
};

/** Comments that can be updated. */
type GitHub_UpdatableComment = {
  /** Reasons why the current viewer can not update this comment. */
  readonly viewerCannotUpdateReasons: ReadonlyArray<GitHub_CommentCannotUpdateReason>;
};

/** Autogenerated input type of UpdateBranchProtectionRule */
type GitHub_UpdateBranchProtectionRuleInput = {
  /** The global relay id of the branch protection rule to be updated. */
  readonly branchProtectionRuleId: Scalars['ID'];
  /** The glob-like pattern used to determine matching branches. */
  readonly pattern: Maybe<Scalars['String']>;
  /** Are approving reviews required to update matching branches. */
  readonly requiresApprovingReviews: Maybe<Scalars['Boolean']>;
  /** Number of approving reviews required to update matching branches. */
  readonly requiredApprovingReviewCount: Maybe<Scalars['Int']>;
  /** Are commits required to be signed. */
  readonly requiresCommitSignatures: Maybe<Scalars['Boolean']>;
  /** Can admins overwrite branch protection. */
  readonly isAdminEnforced: Maybe<Scalars['Boolean']>;
  /** Are status checks required to update matching branches. */
  readonly requiresStatusChecks: Maybe<Scalars['Boolean']>;
  /** Are branches required to be up to date before merging. */
  readonly requiresStrictStatusChecks: Maybe<Scalars['Boolean']>;
  /** Are reviews from code owners required to update matching branches. */
  readonly requiresCodeOwnerReviews: Maybe<Scalars['Boolean']>;
  /** Will new commits pushed to matching branches dismiss pull request review approvals. */
  readonly dismissesStaleReviews: Maybe<Scalars['Boolean']>;
  /** Is dismissal of pull request reviews restricted. */
  readonly restrictsReviewDismissals: Maybe<Scalars['Boolean']>;
  /** A list of User or Team IDs allowed to dismiss reviews on pull requests targeting matching branches. */
  readonly reviewDismissalActorIds: Maybe<ReadonlyArray<Scalars['ID']>>;
  /** Is pushing to matching branches restricted. */
  readonly restrictsPushes: Maybe<Scalars['Boolean']>;
  /** A list of User, Team or App IDs allowed to push to matching branches. */
  readonly pushActorIds: Maybe<ReadonlyArray<Scalars['ID']>>;
  /** List of required status check contexts that must pass for commits to be accepted to matching branches. */
  readonly requiredStatusCheckContexts: Maybe<ReadonlyArray<Scalars['String']>>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateBranchProtectionRule */
type GitHub_UpdateBranchProtectionRulePayload = {
  /** The newly created BranchProtectionRule. */
  readonly branchProtectionRule: Maybe<GitHub_BranchProtectionRule>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateEnterpriseActionExecutionCapabilitySetting */
type GitHub_UpdateEnterpriseActionExecutionCapabilitySettingInput = {
  /** The ID of the enterprise on which to set the members can create repositories setting. */
  readonly enterpriseId: Scalars['ID'];
  /** The value for the action execution capability setting on the enterprise. */
  readonly capability: GitHub_ActionExecutionCapabilitySetting;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateEnterpriseActionExecutionCapabilitySetting */
type GitHub_UpdateEnterpriseActionExecutionCapabilitySettingPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The enterprise with the updated action execution capability setting. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** A message confirming the result of updating the action execution capability setting. */
  readonly message: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateEnterpriseAdministratorRole */
type GitHub_UpdateEnterpriseAdministratorRoleInput = {
  /** The ID of the Enterprise which the admin belongs to. */
  readonly enterpriseId: Scalars['ID'];
  /** The login of a administrator whose role is being changed. */
  readonly login: Scalars['String'];
  /** The new role for the Enterprise administrator. */
  readonly role: GitHub_EnterpriseAdministratorRole;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateEnterpriseAdministratorRole */
type GitHub_UpdateEnterpriseAdministratorRolePayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** A message confirming the result of changing the administrator's role. */
  readonly message: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateEnterpriseAllowPrivateRepositoryForkingSetting */
type GitHub_UpdateEnterpriseAllowPrivateRepositoryForkingSettingInput = {
  /** The ID of the enterprise on which to set the allow private repository forking setting. */
  readonly enterpriseId: Scalars['ID'];
  /** The value for the allow private repository forking setting on the enterprise. */
  readonly settingValue: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateEnterpriseAllowPrivateRepositoryForkingSetting */
type GitHub_UpdateEnterpriseAllowPrivateRepositoryForkingSettingPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The enterprise with the updated allow private repository forking setting. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** A message confirming the result of updating the allow private repository forking setting. */
  readonly message: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateEnterpriseDefaultRepositoryPermissionSetting */
type GitHub_UpdateEnterpriseDefaultRepositoryPermissionSettingInput = {
  /** The ID of the enterprise on which to set the default repository permission setting. */
  readonly enterpriseId: Scalars['ID'];
  /** The value for the default repository permission setting on the enterprise. */
  readonly settingValue: GitHub_EnterpriseDefaultRepositoryPermissionSettingValue;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateEnterpriseDefaultRepositoryPermissionSetting */
type GitHub_UpdateEnterpriseDefaultRepositoryPermissionSettingPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The enterprise with the updated default repository permission setting. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** A message confirming the result of updating the default repository permission setting. */
  readonly message: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateEnterpriseMembersCanChangeRepositoryVisibilitySetting */
type GitHub_UpdateEnterpriseMembersCanChangeRepositoryVisibilitySettingInput = {
  /** The ID of the enterprise on which to set the members can change repository visibility setting. */
  readonly enterpriseId: Scalars['ID'];
  /** The value for the members can change repository visibility setting on the enterprise. */
  readonly settingValue: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateEnterpriseMembersCanChangeRepositoryVisibilitySetting */
type GitHub_UpdateEnterpriseMembersCanChangeRepositoryVisibilitySettingPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The enterprise with the updated members can change repository visibility setting. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** A message confirming the result of updating the members can change repository visibility setting. */
  readonly message: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateEnterpriseMembersCanCreateRepositoriesSetting */
type GitHub_UpdateEnterpriseMembersCanCreateRepositoriesSettingInput = {
  /** The ID of the enterprise on which to set the members can create repositories setting. */
  readonly enterpriseId: Scalars['ID'];
  /**
   * Value for the members can create repositories setting on the enterprise. This
   * or the granular public/private/internal allowed fields (but not both) must be provided.
   */
  readonly settingValue: Maybe<GitHub_EnterpriseMembersCanCreateRepositoriesSettingValue>;
  /** When false, allow member organizations to set their own repository creation member privileges. */
  readonly membersCanCreateRepositoriesPolicyEnabled: Maybe<Scalars['Boolean']>;
  /** Allow members to create public repositories. Defaults to current value. */
  readonly membersCanCreatePublicRepositories: Maybe<Scalars['Boolean']>;
  /** Allow members to create private repositories. Defaults to current value. */
  readonly membersCanCreatePrivateRepositories: Maybe<Scalars['Boolean']>;
  /** Allow members to create internal repositories. Defaults to current value. */
  readonly membersCanCreateInternalRepositories: Maybe<Scalars['Boolean']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateEnterpriseMembersCanCreateRepositoriesSetting */
type GitHub_UpdateEnterpriseMembersCanCreateRepositoriesSettingPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The enterprise with the updated members can create repositories setting. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** A message confirming the result of updating the members can create repositories setting. */
  readonly message: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateEnterpriseMembersCanDeleteIssuesSetting */
type GitHub_UpdateEnterpriseMembersCanDeleteIssuesSettingInput = {
  /** The ID of the enterprise on which to set the members can delete issues setting. */
  readonly enterpriseId: Scalars['ID'];
  /** The value for the members can delete issues setting on the enterprise. */
  readonly settingValue: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateEnterpriseMembersCanDeleteIssuesSetting */
type GitHub_UpdateEnterpriseMembersCanDeleteIssuesSettingPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The enterprise with the updated members can delete issues setting. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** A message confirming the result of updating the members can delete issues setting. */
  readonly message: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateEnterpriseMembersCanDeleteRepositoriesSetting */
type GitHub_UpdateEnterpriseMembersCanDeleteRepositoriesSettingInput = {
  /** The ID of the enterprise on which to set the members can delete repositories setting. */
  readonly enterpriseId: Scalars['ID'];
  /** The value for the members can delete repositories setting on the enterprise. */
  readonly settingValue: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateEnterpriseMembersCanDeleteRepositoriesSetting */
type GitHub_UpdateEnterpriseMembersCanDeleteRepositoriesSettingPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The enterprise with the updated members can delete repositories setting. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** A message confirming the result of updating the members can delete repositories setting. */
  readonly message: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateEnterpriseMembersCanInviteCollaboratorsSetting */
type GitHub_UpdateEnterpriseMembersCanInviteCollaboratorsSettingInput = {
  /** The ID of the enterprise on which to set the members can invite collaborators setting. */
  readonly enterpriseId: Scalars['ID'];
  /** The value for the members can invite collaborators setting on the enterprise. */
  readonly settingValue: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateEnterpriseMembersCanInviteCollaboratorsSetting */
type GitHub_UpdateEnterpriseMembersCanInviteCollaboratorsSettingPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The enterprise with the updated members can invite collaborators setting. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** A message confirming the result of updating the members can invite collaborators setting. */
  readonly message: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateEnterpriseMembersCanMakePurchasesSetting */
type GitHub_UpdateEnterpriseMembersCanMakePurchasesSettingInput = {
  /** The ID of the enterprise on which to set the members can make purchases setting. */
  readonly enterpriseId: Scalars['ID'];
  /** The value for the members can make purchases setting on the enterprise. */
  readonly settingValue: GitHub_EnterpriseMembersCanMakePurchasesSettingValue;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateEnterpriseMembersCanMakePurchasesSetting */
type GitHub_UpdateEnterpriseMembersCanMakePurchasesSettingPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The enterprise with the updated members can make purchases setting. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** A message confirming the result of updating the members can make purchases setting. */
  readonly message: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateEnterpriseMembersCanUpdateProtectedBranchesSetting */
type GitHub_UpdateEnterpriseMembersCanUpdateProtectedBranchesSettingInput = {
  /** The ID of the enterprise on which to set the members can update protected branches setting. */
  readonly enterpriseId: Scalars['ID'];
  /** The value for the members can update protected branches setting on the enterprise. */
  readonly settingValue: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateEnterpriseMembersCanUpdateProtectedBranchesSetting */
type GitHub_UpdateEnterpriseMembersCanUpdateProtectedBranchesSettingPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The enterprise with the updated members can update protected branches setting. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** A message confirming the result of updating the members can update protected branches setting. */
  readonly message: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateEnterpriseMembersCanViewDependencyInsightsSetting */
type GitHub_UpdateEnterpriseMembersCanViewDependencyInsightsSettingInput = {
  /** The ID of the enterprise on which to set the members can view dependency insights setting. */
  readonly enterpriseId: Scalars['ID'];
  /** The value for the members can view dependency insights setting on the enterprise. */
  readonly settingValue: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateEnterpriseMembersCanViewDependencyInsightsSetting */
type GitHub_UpdateEnterpriseMembersCanViewDependencyInsightsSettingPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The enterprise with the updated members can view dependency insights setting. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** A message confirming the result of updating the members can view dependency insights setting. */
  readonly message: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateEnterpriseOrganizationProjectsSetting */
type GitHub_UpdateEnterpriseOrganizationProjectsSettingInput = {
  /** The ID of the enterprise on which to set the organization projects setting. */
  readonly enterpriseId: Scalars['ID'];
  /** The value for the organization projects setting on the enterprise. */
  readonly settingValue: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateEnterpriseOrganizationProjectsSetting */
type GitHub_UpdateEnterpriseOrganizationProjectsSettingPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The enterprise with the updated organization projects setting. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** A message confirming the result of updating the organization projects setting. */
  readonly message: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateEnterpriseProfile */
type GitHub_UpdateEnterpriseProfileInput = {
  /** The Enterprise ID to update. */
  readonly enterpriseId: Scalars['ID'];
  /** The name of the enterprise. */
  readonly name: Maybe<Scalars['String']>;
  /** The description of the enterprise. */
  readonly description: Maybe<Scalars['String']>;
  /** The URL of the enterprise's website. */
  readonly websiteUrl: Maybe<Scalars['String']>;
  /** The location of the enterprise. */
  readonly location: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateEnterpriseProfile */
type GitHub_UpdateEnterpriseProfilePayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The updated enterprise. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
};

/** Autogenerated input type of UpdateEnterpriseRepositoryProjectsSetting */
type GitHub_UpdateEnterpriseRepositoryProjectsSettingInput = {
  /** The ID of the enterprise on which to set the repository projects setting. */
  readonly enterpriseId: Scalars['ID'];
  /** The value for the repository projects setting on the enterprise. */
  readonly settingValue: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateEnterpriseRepositoryProjectsSetting */
type GitHub_UpdateEnterpriseRepositoryProjectsSettingPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The enterprise with the updated repository projects setting. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** A message confirming the result of updating the repository projects setting. */
  readonly message: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateEnterpriseTeamDiscussionsSetting */
type GitHub_UpdateEnterpriseTeamDiscussionsSettingInput = {
  /** The ID of the enterprise on which to set the team discussions setting. */
  readonly enterpriseId: Scalars['ID'];
  /** The value for the team discussions setting on the enterprise. */
  readonly settingValue: GitHub_EnterpriseEnabledDisabledSettingValue;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateEnterpriseTeamDiscussionsSetting */
type GitHub_UpdateEnterpriseTeamDiscussionsSettingPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The enterprise with the updated team discussions setting. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** A message confirming the result of updating the team discussions setting. */
  readonly message: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateEnterpriseTwoFactorAuthenticationRequiredSetting */
type GitHub_UpdateEnterpriseTwoFactorAuthenticationRequiredSettingInput = {
  /** The ID of the enterprise on which to set the two factor authentication required setting. */
  readonly enterpriseId: Scalars['ID'];
  /** The value for the two factor authentication required setting on the enterprise. */
  readonly settingValue: GitHub_EnterpriseEnabledSettingValue;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateEnterpriseTwoFactorAuthenticationRequiredSetting */
type GitHub_UpdateEnterpriseTwoFactorAuthenticationRequiredSettingPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The enterprise with the updated two factor authentication required setting. */
  readonly enterprise: Maybe<GitHub_Enterprise>;
  /** A message confirming the result of updating the two factor authentication required setting. */
  readonly message: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateIpAllowListEnabledSetting */
type GitHub_UpdateIpAllowListEnabledSettingInput = {
  /** The ID of the owner on which to set the IP allow list enabled setting. */
  readonly ownerId: Scalars['ID'];
  /** The value for the IP allow list enabled setting. */
  readonly settingValue: GitHub_IpAllowListEnabledSettingValue;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateIpAllowListEnabledSetting */
type GitHub_UpdateIpAllowListEnabledSettingPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The IP allow list owner on which the setting was updated. */
  readonly owner: Maybe<GitHub_IpAllowListOwner>;
};

/** Autogenerated input type of UpdateIpAllowListEntry */
type GitHub_UpdateIpAllowListEntryInput = {
  /** The ID of the IP allow list entry to update. */
  readonly ipAllowListEntryId: Scalars['ID'];
  /** An IP address or range of addresses in CIDR notation. */
  readonly allowListValue: Scalars['String'];
  /** An optional name for the IP allow list entry. */
  readonly name: Maybe<Scalars['String']>;
  /** Whether the IP allow list entry is active when an IP allow list is enabled. */
  readonly isActive: Scalars['Boolean'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateIpAllowListEntry */
type GitHub_UpdateIpAllowListEntryPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The IP allow list entry that was updated. */
  readonly ipAllowListEntry: Maybe<GitHub_IpAllowListEntry>;
};

/** Autogenerated input type of UpdateIssueComment */
type GitHub_UpdateIssueCommentInput = {
  /** The ID of the IssueComment to modify. */
  readonly id: Scalars['ID'];
  /** The updated text of the comment. */
  readonly body: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateIssueComment */
type GitHub_UpdateIssueCommentPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The updated comment. */
  readonly issueComment: Maybe<GitHub_IssueComment>;
};

/** Autogenerated input type of UpdateIssue */
type GitHub_UpdateIssueInput = {
  /** The ID of the Issue to modify. */
  readonly id: Scalars['ID'];
  /** The title for the issue. */
  readonly title: Maybe<Scalars['String']>;
  /** The body for the issue description. */
  readonly body: Maybe<Scalars['String']>;
  /** An array of Node IDs of users for this issue. */
  readonly assigneeIds: Maybe<ReadonlyArray<Scalars['ID']>>;
  /** The Node ID of the milestone for this issue. */
  readonly milestoneId: Maybe<Scalars['ID']>;
  /** An array of Node IDs of labels for this issue. */
  readonly labelIds: Maybe<ReadonlyArray<Scalars['ID']>>;
  /** The desired issue state. */
  readonly state: Maybe<GitHub_IssueState>;
  /** An array of Node IDs for projects associated with this issue. */
  readonly projectIds: Maybe<ReadonlyArray<Scalars['ID']>>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateIssue */
type GitHub_UpdateIssuePayload = {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The issue. */
  readonly issue: Maybe<GitHub_Issue>;
};

/** Autogenerated input type of UpdateProjectCard */
type GitHub_UpdateProjectCardInput = {
  /** The ProjectCard ID to update. */
  readonly projectCardId: Scalars['ID'];
  /** Whether or not the ProjectCard should be archived */
  readonly isArchived: Maybe<Scalars['Boolean']>;
  /** The note of ProjectCard. */
  readonly note: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateProjectCard */
type GitHub_UpdateProjectCardPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The updated ProjectCard. */
  readonly projectCard: Maybe<GitHub_ProjectCard>;
};

/** Autogenerated input type of UpdateProjectColumn */
type GitHub_UpdateProjectColumnInput = {
  /** The ProjectColumn ID to update. */
  readonly projectColumnId: Scalars['ID'];
  /** The name of project column. */
  readonly name: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateProjectColumn */
type GitHub_UpdateProjectColumnPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The updated project column. */
  readonly projectColumn: Maybe<GitHub_ProjectColumn>;
};

/** Autogenerated input type of UpdateProject */
type GitHub_UpdateProjectInput = {
  /** The Project ID to update. */
  readonly projectId: Scalars['ID'];
  /** The name of project. */
  readonly name: Maybe<Scalars['String']>;
  /** The description of project. */
  readonly body: Maybe<Scalars['String']>;
  /** Whether the project is open or closed. */
  readonly state: Maybe<GitHub_ProjectState>;
  /** Whether the project is public or not. */
  readonly public: Maybe<Scalars['Boolean']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateProject */
type GitHub_UpdateProjectPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The updated project. */
  readonly project: Maybe<GitHub_Project>;
};

/** Autogenerated input type of UpdatePullRequest */
type GitHub_UpdatePullRequestInput = {
  /** The Node ID of the pull request. */
  readonly pullRequestId: Scalars['ID'];
  /**
   * The name of the branch you want your changes pulled into. This should be an existing branch
   * on the current repository.
   */
  readonly baseRefName: Maybe<Scalars['String']>;
  /** The title of the pull request. */
  readonly title: Maybe<Scalars['String']>;
  /** The contents of the pull request. */
  readonly body: Maybe<Scalars['String']>;
  /** The target state of the pull request. */
  readonly state: Maybe<GitHub_PullRequestUpdateState>;
  /** Indicates whether maintainers can modify the pull request. */
  readonly maintainerCanModify: Maybe<Scalars['Boolean']>;
  /** An array of Node IDs of users for this pull request. */
  readonly assigneeIds: Maybe<ReadonlyArray<Scalars['ID']>>;
  /** The Node ID of the milestone for this pull request. */
  readonly milestoneId: Maybe<Scalars['ID']>;
  /** An array of Node IDs of labels for this pull request. */
  readonly labelIds: Maybe<ReadonlyArray<Scalars['ID']>>;
  /** An array of Node IDs for projects associated with this pull request. */
  readonly projectIds: Maybe<ReadonlyArray<Scalars['ID']>>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdatePullRequest */
type GitHub_UpdatePullRequestPayload = {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The updated pull request. */
  readonly pullRequest: Maybe<GitHub_PullRequest>;
};

/** Autogenerated input type of UpdatePullRequestReviewComment */
type GitHub_UpdatePullRequestReviewCommentInput = {
  /** The Node ID of the comment to modify. */
  readonly pullRequestReviewCommentId: Scalars['ID'];
  /** The text of the comment. */
  readonly body: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdatePullRequestReviewComment */
type GitHub_UpdatePullRequestReviewCommentPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The updated comment. */
  readonly pullRequestReviewComment: Maybe<GitHub_PullRequestReviewComment>;
};

/** Autogenerated input type of UpdatePullRequestReview */
type GitHub_UpdatePullRequestReviewInput = {
  /** The Node ID of the pull request review to modify. */
  readonly pullRequestReviewId: Scalars['ID'];
  /** The contents of the pull request review body. */
  readonly body: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdatePullRequestReview */
type GitHub_UpdatePullRequestReviewPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The updated pull request review. */
  readonly pullRequestReview: Maybe<GitHub_PullRequestReview>;
};

/** Autogenerated input type of UpdateRef */
type GitHub_UpdateRefInput = {
  /** The Node ID of the Ref to be updated. */
  readonly refId: Scalars['ID'];
  /** The GitObjectID that the Ref shall be updated to target. */
  readonly oid: Scalars['GitHub_GitObjectID'];
  /** Permit updates of branch Refs that are not fast-forwards? */
  readonly force: Maybe<Scalars['Boolean']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateRef */
type GitHub_UpdateRefPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The updated Ref. */
  readonly ref: Maybe<GitHub_Ref>;
};

/** Autogenerated input type of UpdateRepository */
type GitHub_UpdateRepositoryInput = {
  /** The ID of the repository to update. */
  readonly repositoryId: Scalars['ID'];
  /** The new name of the repository. */
  readonly name: Maybe<Scalars['String']>;
  /** A new description for the repository. Pass an empty string to erase the existing description. */
  readonly description: Maybe<Scalars['String']>;
  /**
   * Whether this repository should be marked as a template such that anyone who
   * can access it can create new repositories with the same files and directory structure.
   */
  readonly template: Maybe<Scalars['Boolean']>;
  /** The URL for a web page about this repository. Pass an empty string to erase the existing URL. */
  readonly homepageUrl: Maybe<Scalars['GitHub_URI']>;
  /** Indicates if the repository should have the wiki feature enabled. */
  readonly hasWikiEnabled: Maybe<Scalars['Boolean']>;
  /** Indicates if the repository should have the issues feature enabled. */
  readonly hasIssuesEnabled: Maybe<Scalars['Boolean']>;
  /** Indicates if the repository should have the project boards feature enabled. */
  readonly hasProjectsEnabled: Maybe<Scalars['Boolean']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateRepository */
type GitHub_UpdateRepositoryPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The updated repository. */
  readonly repository: Maybe<GitHub_Repository>;
};

/** Autogenerated input type of UpdateSubscription */
type GitHub_UpdateSubscriptionInput = {
  /** The Node ID of the subscribable object to modify. */
  readonly subscribableId: Scalars['ID'];
  /** The new state of the subscription. */
  readonly state: GitHub_SubscriptionState;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateSubscription */
type GitHub_UpdateSubscriptionPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The input subscribable entity. */
  readonly subscribable: Maybe<GitHub_Subscribable>;
};

/** Autogenerated input type of UpdateTeamDiscussionComment */
type GitHub_UpdateTeamDiscussionCommentInput = {
  /** The ID of the comment to modify. */
  readonly id: Scalars['ID'];
  /** The updated text of the comment. */
  readonly body: Scalars['String'];
  /** The current version of the body content. */
  readonly bodyVersion: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateTeamDiscussionComment */
type GitHub_UpdateTeamDiscussionCommentPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The updated comment. */
  readonly teamDiscussionComment: Maybe<GitHub_TeamDiscussionComment>;
};

/** Autogenerated input type of UpdateTeamDiscussion */
type GitHub_UpdateTeamDiscussionInput = {
  /** The Node ID of the discussion to modify. */
  readonly id: Scalars['ID'];
  /** The updated title of the discussion. */
  readonly title: Maybe<Scalars['String']>;
  /** The updated text of the discussion. */
  readonly body: Maybe<Scalars['String']>;
  /**
   * The current version of the body content. If provided, this update operation
   * will be rejected if the given version does not match the latest version on the server.
   */
  readonly bodyVersion: Maybe<Scalars['String']>;
  /** If provided, sets the pinned state of the updated discussion. */
  readonly pinned: Maybe<Scalars['Boolean']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateTeamDiscussion */
type GitHub_UpdateTeamDiscussionPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** The updated discussion. */
  readonly teamDiscussion: Maybe<GitHub_TeamDiscussion>;
};

/** Autogenerated input type of UpdateTopics */
type GitHub_UpdateTopicsInput = {
  /** The Node ID of the repository. */
  readonly repositoryId: Scalars['ID'];
  /** An array of topic names. */
  readonly topicNames: ReadonlyArray<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateTopics */
type GitHub_UpdateTopicsPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars['String']>;
  /** Names of the provided topics that are not valid. */
  readonly invalidTopicNames: Maybe<ReadonlyArray<Scalars['String']>>;
  /** The updated repository. */
  readonly repository: Maybe<GitHub_Repository>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User = GitHub_Node & GitHub_Actor & GitHub_PackageOwner & GitHub_ProjectOwner & GitHub_RepositoryOwner & GitHub_UniformResourceLocatable & GitHub_ProfileOwner & GitHub_Sponsorable & {
  /** Determine if this repository owner has any items that can be pinned to their profile. */
  readonly anyPinnableItems: Scalars['Boolean'];
  /** A URL pointing to the user's public avatar. */
  readonly avatarUrl: Scalars['GitHub_URI'];
  /** The user's public profile bio. */
  readonly bio: Maybe<Scalars['String']>;
  /** The user's public profile bio as HTML. */
  readonly bioHTML: Scalars['GitHub_HTML'];
  /** A list of commit comments made by this user. */
  readonly commitComments: GitHub_CommitCommentConnection;
  /** The user's public profile company. */
  readonly company: Maybe<Scalars['String']>;
  /** The user's public profile company as HTML. */
  readonly companyHTML: Scalars['GitHub_HTML'];
  /** The collection of contributions this user has made to different repositories. */
  readonly contributionsCollection: GitHub_ContributionsCollection;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the primary key from the database. */
  readonly databaseId: Maybe<Scalars['Int']>;
  /** The user's publicly visible profile email. */
  readonly email: Scalars['String'];
  /** A list of users the given user is followed by. */
  readonly followers: GitHub_FollowerConnection;
  /** A list of users the given user is following. */
  readonly following: GitHub_FollowingConnection;
  /** Find gist by repo name. */
  readonly gist: Maybe<GitHub_Gist>;
  /** A list of gist comments made by this user. */
  readonly gistComments: GitHub_GistCommentConnection;
  /** A list of the Gists the user has created. */
  readonly gists: GitHub_GistConnection;
  /** The hovercard information for this user in a given context */
  readonly hovercard: GitHub_Hovercard;
  readonly id: Scalars['ID'];
  /** Whether or not this user is a participant in the GitHub Security Bug Bounty. */
  readonly isBountyHunter: Scalars['Boolean'];
  /** Whether or not this user is a participant in the GitHub Campus Experts Program. */
  readonly isCampusExpert: Scalars['Boolean'];
  /** Whether or not this user is a GitHub Developer Program member. */
  readonly isDeveloperProgramMember: Scalars['Boolean'];
  /** Whether or not this user is a GitHub employee. */
  readonly isEmployee: Scalars['Boolean'];
  /** Whether or not the user has marked themselves as for hire. */
  readonly isHireable: Scalars['Boolean'];
  /** Whether or not this user is a site administrator. */
  readonly isSiteAdmin: Scalars['Boolean'];
  /** Whether or not this user is the viewing user. */
  readonly isViewer: Scalars['Boolean'];
  /** A list of issue comments made by this user. */
  readonly issueComments: GitHub_IssueCommentConnection;
  /** A list of issues associated with this user. */
  readonly issues: GitHub_IssueConnection;
  /**
   * Showcases a selection of repositories and gists that the profile owner has
   * either curated or that have been selected automatically based on popularity.
   */
  readonly itemShowcase: GitHub_ProfileItemShowcase;
  /** The user's public profile location. */
  readonly location: Maybe<Scalars['String']>;
  /** The username used to login. */
  readonly login: Scalars['String'];
  /** The user's public profile name. */
  readonly name: Maybe<Scalars['String']>;
  /** Find an organization by its login that the user belongs to. */
  readonly organization: Maybe<GitHub_Organization>;
  /** Verified email addresses that match verified domains for a specified organization the user is a member of. */
  readonly organizationVerifiedDomainEmails: ReadonlyArray<Scalars['String']>;
  /** A list of organizations the user belongs to. */
  readonly organizations: GitHub_OrganizationConnection;
  /** A list of packages under the owner. */
  readonly packages: GitHub_PackageConnection;
  /** A list of repositories and gists this profile owner can pin to their profile. */
  readonly pinnableItems: GitHub_PinnableItemConnection;
  /** A list of repositories and gists this profile owner has pinned to their profile */
  readonly pinnedItems: GitHub_PinnableItemConnection;
  /** Returns how many more items this profile owner can pin to their profile. */
  readonly pinnedItemsRemaining: Scalars['Int'];
  /** Find project by number. */
  readonly project: Maybe<GitHub_Project>;
  /** A list of projects under the owner. */
  readonly projects: GitHub_ProjectConnection;
  /** The HTTP path listing user's projects */
  readonly projectsResourcePath: Scalars['GitHub_URI'];
  /** The HTTP URL listing user's projects */
  readonly projectsUrl: Scalars['GitHub_URI'];
  /** A list of public keys associated with this user. */
  readonly publicKeys: GitHub_PublicKeyConnection;
  /** A list of pull requests associated with this user. */
  readonly pullRequests: GitHub_PullRequestConnection;
  /** A list of repositories that the user owns. */
  readonly repositories: GitHub_RepositoryConnection;
  /** A list of repositories that the user recently contributed to. */
  readonly repositoriesContributedTo: GitHub_RepositoryConnection;
  /** Find Repository. */
  readonly repository: Maybe<GitHub_Repository>;
  /** The HTTP path for this user */
  readonly resourcePath: Scalars['GitHub_URI'];
  /** Replies this user has saved */
  readonly savedReplies: Maybe<GitHub_SavedReplyConnection>;
  /** The GitHub Sponsors listing for this user. */
  readonly sponsorsListing: Maybe<GitHub_SponsorsListing>;
  /** This object's sponsorships as the maintainer. */
  readonly sponsorshipsAsMaintainer: GitHub_SponsorshipConnection;
  /** This object's sponsorships as the sponsor. */
  readonly sponsorshipsAsSponsor: GitHub_SponsorshipConnection;
  /** Repositories the user has starred. */
  readonly starredRepositories: GitHub_StarredRepositoryConnection;
  /** The user's description of what they're currently doing. */
  readonly status: Maybe<GitHub_UserStatus>;
  /** Repositories the user has contributed to, ordered by contribution rank, plus repositories the user has created */
  readonly topRepositories: GitHub_RepositoryConnection;
  /** The user's Twitter username. */
  readonly twitterUsername: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The HTTP URL for this user */
  readonly url: Scalars['GitHub_URI'];
  /** Can the viewer pin repositories and gists to the profile? */
  readonly viewerCanChangePinnedItems: Scalars['Boolean'];
  /** Can the current viewer create new projects on this owner. */
  readonly viewerCanCreateProjects: Scalars['Boolean'];
  /** Whether or not the viewer is able to follow the user. */
  readonly viewerCanFollow: Scalars['Boolean'];
  /** Whether or not this user is followed by the viewer. */
  readonly viewerIsFollowing: Scalars['Boolean'];
  /** A list of repositories the given user is watching. */
  readonly watching: GitHub_RepositoryConnection;
  /** A URL pointing to the user's public website/blog. */
  readonly websiteUrl: Maybe<Scalars['GitHub_URI']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_anyPinnableItemsArgs = {
  type: Maybe<GitHub_PinnableItemType>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_avatarUrlArgs = {
  size: Maybe<Scalars['Int']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_commitCommentsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_contributionsCollectionArgs = {
  organizationID: Maybe<Scalars['ID']>;
  from: Maybe<Scalars['GitHub_DateTime']>;
  to: Maybe<Scalars['GitHub_DateTime']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_followersArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_followingArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_gistArgs = {
  name: Scalars['String'];
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_gistCommentsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_gistsArgs = {
  privacy: Maybe<GitHub_GistPrivacy>;
  orderBy: Maybe<GitHub_GistOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_hovercardArgs = {
  primarySubjectId: Maybe<Scalars['ID']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_issueCommentsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_issuesArgs = {
  orderBy: Maybe<GitHub_IssueOrder>;
  labels: Maybe<ReadonlyArray<Scalars['String']>>;
  states: Maybe<ReadonlyArray<GitHub_IssueState>>;
  filterBy: Maybe<GitHub_IssueFilters>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_organizationArgs = {
  login: Scalars['String'];
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_organizationVerifiedDomainEmailsArgs = {
  login: Scalars['String'];
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_organizationsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_packagesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  names: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  repositoryId: Maybe<Scalars['ID']>;
  packageType: Maybe<GitHub_PackageType>;
  orderBy?: Maybe<GitHub_PackageOrder>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_pinnableItemsArgs = {
  types: Maybe<ReadonlyArray<GitHub_PinnableItemType>>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_pinnedItemsArgs = {
  types: Maybe<ReadonlyArray<GitHub_PinnableItemType>>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_projectArgs = {
  number: Scalars['Int'];
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_projectsArgs = {
  orderBy: Maybe<GitHub_ProjectOrder>;
  search: Maybe<Scalars['String']>;
  states: Maybe<ReadonlyArray<GitHub_ProjectState>>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_publicKeysArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_pullRequestsArgs = {
  states: Maybe<ReadonlyArray<GitHub_PullRequestState>>;
  labels: Maybe<ReadonlyArray<Scalars['String']>>;
  headRefName: Maybe<Scalars['String']>;
  baseRefName: Maybe<Scalars['String']>;
  orderBy: Maybe<GitHub_IssueOrder>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_repositoriesArgs = {
  privacy: Maybe<GitHub_RepositoryPrivacy>;
  orderBy: Maybe<GitHub_RepositoryOrder>;
  affiliations: Maybe<ReadonlyArray<Maybe<GitHub_RepositoryAffiliation>>>;
  ownerAffiliations?: Maybe<ReadonlyArray<Maybe<GitHub_RepositoryAffiliation>>>;
  isLocked: Maybe<Scalars['Boolean']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  isFork: Maybe<Scalars['Boolean']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_repositoriesContributedToArgs = {
  privacy: Maybe<GitHub_RepositoryPrivacy>;
  orderBy: Maybe<GitHub_RepositoryOrder>;
  isLocked: Maybe<Scalars['Boolean']>;
  includeUserRepositories: Maybe<Scalars['Boolean']>;
  contributionTypes: Maybe<ReadonlyArray<Maybe<GitHub_RepositoryContributionType>>>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_repositoryArgs = {
  name: Scalars['String'];
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_savedRepliesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy?: Maybe<GitHub_SavedReplyOrder>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_sponsorshipsAsMaintainerArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  includePrivate?: Maybe<Scalars['Boolean']>;
  orderBy: Maybe<GitHub_SponsorshipOrder>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_sponsorshipsAsSponsorArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<GitHub_SponsorshipOrder>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_starredRepositoriesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  ownedByViewer: Maybe<Scalars['Boolean']>;
  orderBy: Maybe<GitHub_StarOrder>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_topRepositoriesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: GitHub_RepositoryOrder;
  since: Maybe<Scalars['GitHub_DateTime']>;
};


/** A user is an individual's account on GitHub that owns repositories and can make new content. */
type GitHub_User_watchingArgs = {
  privacy: Maybe<GitHub_RepositoryPrivacy>;
  orderBy: Maybe<GitHub_RepositoryOrder>;
  affiliations: Maybe<ReadonlyArray<Maybe<GitHub_RepositoryAffiliation>>>;
  ownerAffiliations?: Maybe<ReadonlyArray<Maybe<GitHub_RepositoryAffiliation>>>;
  isLocked: Maybe<Scalars['Boolean']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

/** The possible durations that a user can be blocked for. */
enum GitHub_UserBlockDuration {
  /** The user was blocked for 1 day */
  ONE_DAY = 'ONE_DAY',
  /** The user was blocked for 3 days */
  THREE_DAYS = 'THREE_DAYS',
  /** The user was blocked for 7 days */
  ONE_WEEK = 'ONE_WEEK',
  /** The user was blocked for 30 days */
  ONE_MONTH = 'ONE_MONTH',
  /** The user was blocked permanently */
  PERMANENT = 'PERMANENT'
}

/** Represents a 'user_blocked' event on a given user. */
type GitHub_UserBlockedEvent = GitHub_Node & {
  /** Identifies the actor who performed the event. */
  readonly actor: Maybe<GitHub_Actor>;
  /** Number of days that the user was blocked for. */
  readonly blockDuration: GitHub_UserBlockDuration;
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  readonly id: Scalars['ID'];
  /** The user who was blocked. */
  readonly subject: Maybe<GitHub_User>;
};

/** The connection type for User. */
type GitHub_UserConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_UserEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_User>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edit on user content */
type GitHub_UserContentEdit = GitHub_Node & {
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** Identifies the date and time when the object was deleted. */
  readonly deletedAt: Maybe<Scalars['GitHub_DateTime']>;
  /** The actor who deleted this content */
  readonly deletedBy: Maybe<GitHub_Actor>;
  /** A summary of the changes for this edit */
  readonly diff: Maybe<Scalars['String']>;
  /** When this content was edited */
  readonly editedAt: Scalars['GitHub_DateTime'];
  /** The actor who edited this content */
  readonly editor: Maybe<GitHub_Actor>;
  readonly id: Scalars['ID'];
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
};

/** A list of edits to content. */
type GitHub_UserContentEditConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_UserContentEditEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_UserContentEdit>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_UserContentEditEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_UserContentEdit>;
};

/** Represents a user. */
type GitHub_UserEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_User>;
};

/** The user's description of what they're currently doing. */
type GitHub_UserStatus = GitHub_Node & {
  /** Identifies the date and time when the object was created. */
  readonly createdAt: Scalars['GitHub_DateTime'];
  /** An emoji summarizing the user's status. */
  readonly emoji: Maybe<Scalars['String']>;
  /** The status emoji as HTML. */
  readonly emojiHTML: Maybe<Scalars['GitHub_HTML']>;
  /** If set, the status will not be shown after this date. */
  readonly expiresAt: Maybe<Scalars['GitHub_DateTime']>;
  /** ID of the object. */
  readonly id: Scalars['ID'];
  /** Whether this status indicates the user is not fully available on GitHub. */
  readonly indicatesLimitedAvailability: Scalars['Boolean'];
  /** A brief message describing what the user is doing. */
  readonly message: Maybe<Scalars['String']>;
  /** The organization whose members can see this status. If null, this status is publicly visible. */
  readonly organization: Maybe<GitHub_Organization>;
  /** Identifies the date and time when the object was last updated. */
  readonly updatedAt: Scalars['GitHub_DateTime'];
  /** The user who has this status. */
  readonly user: GitHub_User;
};

/** The connection type for UserStatus. */
type GitHub_UserStatusConnection = {
  /** A list of edges. */
  readonly edges: Maybe<ReadonlyArray<Maybe<GitHub_UserStatusEdge>>>;
  /** A list of nodes. */
  readonly nodes: Maybe<ReadonlyArray<Maybe<GitHub_UserStatus>>>;
  /** Information to aid in pagination. */
  readonly pageInfo: GitHub_PageInfo;
  /** Identifies the total count of items in the connection. */
  readonly totalCount: Scalars['Int'];
};

/** An edge in a connection. */
type GitHub_UserStatusEdge = {
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String'];
  /** The item at the end of the edge. */
  readonly node: Maybe<GitHub_UserStatus>;
};

/** Ordering options for user status connections. */
type GitHub_UserStatusOrder = {
  /** The field to order user statuses by. */
  readonly field: GitHub_UserStatusOrderField;
  /** The ordering direction. */
  readonly direction: GitHub_OrderDirection;
};

/** Properties by which user status connections can be ordered. */
enum GitHub_UserStatusOrderField {
  /** Order user statuses by when they were updated. */
  UPDATED_AT = 'UPDATED_AT'
}

/** A hovercard context with a message describing how the viewer is related. */
type GitHub_ViewerHovercardContext = GitHub_HovercardContext & {
  /** A string describing this context */
  readonly message: Scalars['String'];
  /** An octicon to accompany this context */
  readonly octicon: Scalars['String'];
  /** Identifies the user who is related to this context. */
  readonly viewer: GitHub_User;
};


type GithubUser = {
  readonly name: Maybe<Scalars['String']>;
  readonly avatarUrl: Maybe<Scalars['String']>;
  readonly login: Scalars['String'];
  readonly url: Scalars['String'];
};

type GithubUserFilterInput = {
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly avatarUrl: Maybe<StringQueryOperatorInput>;
  readonly login: Maybe<StringQueryOperatorInput>;
  readonly url: Maybe<StringQueryOperatorInput>;
};

type GithubUserFilterListInput = {
  readonly elemMatch: Maybe<GithubUserFilterInput>;
};

type GraphQLSource = Node & {
  readonly id: Scalars['ID'];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
  readonly typeName: Maybe<Scalars['String']>;
  readonly fieldName: Maybe<Scalars['String']>;
};

type GraphQLSourceConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<GraphQLSourceEdge>;
  readonly nodes: ReadonlyArray<GraphQLSource>;
  readonly pageInfo: PageInfo;
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly group: ReadonlyArray<GraphQLSourceGroupConnection>;
};


type GraphQLSourceConnection_distinctArgs = {
  field: GraphQLSourceFieldsEnum;
};


type GraphQLSourceConnection_groupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: GraphQLSourceFieldsEnum;
};

type GraphQLSourceEdge = {
  readonly next: Maybe<GraphQLSource>;
  readonly node: GraphQLSource;
  readonly previous: Maybe<GraphQLSource>;
};

enum GraphQLSourceFieldsEnum {
  id = 'id',
  parent___id = 'parent.id',
  parent___parent___id = 'parent.parent.id',
  parent___parent___parent___id = 'parent.parent.parent.id',
  parent___parent___parent___children = 'parent.parent.parent.children',
  parent___parent___children = 'parent.parent.children',
  parent___parent___children___id = 'parent.parent.children.id',
  parent___parent___children___children = 'parent.parent.children.children',
  parent___parent___internal___content = 'parent.parent.internal.content',
  parent___parent___internal___contentDigest = 'parent.parent.internal.contentDigest',
  parent___parent___internal___description = 'parent.parent.internal.description',
  parent___parent___internal___fieldOwners = 'parent.parent.internal.fieldOwners',
  parent___parent___internal___ignoreType = 'parent.parent.internal.ignoreType',
  parent___parent___internal___mediaType = 'parent.parent.internal.mediaType',
  parent___parent___internal___owner = 'parent.parent.internal.owner',
  parent___parent___internal___type = 'parent.parent.internal.type',
  parent___children = 'parent.children',
  parent___children___id = 'parent.children.id',
  parent___children___parent___id = 'parent.children.parent.id',
  parent___children___parent___children = 'parent.children.parent.children',
  parent___children___children = 'parent.children.children',
  parent___children___children___id = 'parent.children.children.id',
  parent___children___children___children = 'parent.children.children.children',
  parent___children___internal___content = 'parent.children.internal.content',
  parent___children___internal___contentDigest = 'parent.children.internal.contentDigest',
  parent___children___internal___description = 'parent.children.internal.description',
  parent___children___internal___fieldOwners = 'parent.children.internal.fieldOwners',
  parent___children___internal___ignoreType = 'parent.children.internal.ignoreType',
  parent___children___internal___mediaType = 'parent.children.internal.mediaType',
  parent___children___internal___owner = 'parent.children.internal.owner',
  parent___children___internal___type = 'parent.children.internal.type',
  parent___internal___content = 'parent.internal.content',
  parent___internal___contentDigest = 'parent.internal.contentDigest',
  parent___internal___description = 'parent.internal.description',
  parent___internal___fieldOwners = 'parent.internal.fieldOwners',
  parent___internal___ignoreType = 'parent.internal.ignoreType',
  parent___internal___mediaType = 'parent.internal.mediaType',
  parent___internal___owner = 'parent.internal.owner',
  parent___internal___type = 'parent.internal.type',
  children = 'children',
  children___id = 'children.id',
  children___parent___id = 'children.parent.id',
  children___parent___parent___id = 'children.parent.parent.id',
  children___parent___parent___children = 'children.parent.parent.children',
  children___parent___children = 'children.parent.children',
  children___parent___children___id = 'children.parent.children.id',
  children___parent___children___children = 'children.parent.children.children',
  children___parent___internal___content = 'children.parent.internal.content',
  children___parent___internal___contentDigest = 'children.parent.internal.contentDigest',
  children___parent___internal___description = 'children.parent.internal.description',
  children___parent___internal___fieldOwners = 'children.parent.internal.fieldOwners',
  children___parent___internal___ignoreType = 'children.parent.internal.ignoreType',
  children___parent___internal___mediaType = 'children.parent.internal.mediaType',
  children___parent___internal___owner = 'children.parent.internal.owner',
  children___parent___internal___type = 'children.parent.internal.type',
  children___children = 'children.children',
  children___children___id = 'children.children.id',
  children___children___parent___id = 'children.children.parent.id',
  children___children___parent___children = 'children.children.parent.children',
  children___children___children = 'children.children.children',
  children___children___children___id = 'children.children.children.id',
  children___children___children___children = 'children.children.children.children',
  children___children___internal___content = 'children.children.internal.content',
  children___children___internal___contentDigest = 'children.children.internal.contentDigest',
  children___children___internal___description = 'children.children.internal.description',
  children___children___internal___fieldOwners = 'children.children.internal.fieldOwners',
  children___children___internal___ignoreType = 'children.children.internal.ignoreType',
  children___children___internal___mediaType = 'children.children.internal.mediaType',
  children___children___internal___owner = 'children.children.internal.owner',
  children___children___internal___type = 'children.children.internal.type',
  children___internal___content = 'children.internal.content',
  children___internal___contentDigest = 'children.internal.contentDigest',
  children___internal___description = 'children.internal.description',
  children___internal___fieldOwners = 'children.internal.fieldOwners',
  children___internal___ignoreType = 'children.internal.ignoreType',
  children___internal___mediaType = 'children.internal.mediaType',
  children___internal___owner = 'children.internal.owner',
  children___internal___type = 'children.internal.type',
  internal___content = 'internal.content',
  internal___contentDigest = 'internal.contentDigest',
  internal___description = 'internal.description',
  internal___fieldOwners = 'internal.fieldOwners',
  internal___ignoreType = 'internal.ignoreType',
  internal___mediaType = 'internal.mediaType',
  internal___owner = 'internal.owner',
  internal___type = 'internal.type',
  typeName = 'typeName',
  fieldName = 'fieldName'
}

type GraphQLSourceFilterInput = {
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
  readonly typeName: Maybe<StringQueryOperatorInput>;
  readonly fieldName: Maybe<StringQueryOperatorInput>;
};

type GraphQLSourceGroupConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<GraphQLSourceEdge>;
  readonly nodes: ReadonlyArray<GraphQLSource>;
  readonly pageInfo: PageInfo;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
};

type GraphQLSourceSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<GraphQLSourceFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

enum HeadingsMdx {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6'
}

type History = {
  readonly lastModified: Scalars['String'];
  readonly authors: ReadonlyArray<GithubUser>;
};

type HistoryFilterInput = {
  readonly lastModified: Maybe<StringQueryOperatorInput>;
  readonly authors: Maybe<GithubUserFilterListInput>;
};

type Internal = {
  readonly content: Maybe<Scalars['String']>;
  readonly contentDigest: Scalars['String'];
  readonly description: Maybe<Scalars['String']>;
  readonly fieldOwners: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly ignoreType: Maybe<Scalars['Boolean']>;
  readonly mediaType: Maybe<Scalars['String']>;
  readonly owner: Scalars['String'];
  readonly type: Scalars['String'];
};

type InternalFilterInput = {
  readonly content: Maybe<StringQueryOperatorInput>;
  readonly contentDigest: Maybe<StringQueryOperatorInput>;
  readonly description: Maybe<StringQueryOperatorInput>;
  readonly fieldOwners: Maybe<StringQueryOperatorInput>;
  readonly ignoreType: Maybe<BooleanQueryOperatorInput>;
  readonly mediaType: Maybe<StringQueryOperatorInput>;
  readonly owner: Maybe<StringQueryOperatorInput>;
  readonly type: Maybe<StringQueryOperatorInput>;
};

type IntQueryOperatorInput = {
  readonly eq: Maybe<Scalars['Int']>;
  readonly ne: Maybe<Scalars['Int']>;
  readonly gt: Maybe<Scalars['Int']>;
  readonly gte: Maybe<Scalars['Int']>;
  readonly lt: Maybe<Scalars['Int']>;
  readonly lte: Maybe<Scalars['Int']>;
  readonly in: Maybe<ReadonlyArray<Maybe<Scalars['Int']>>>;
  readonly nin: Maybe<ReadonlyArray<Maybe<Scalars['Int']>>>;
};


type JSONQueryOperatorInput = {
  readonly eq: Maybe<Scalars['JSON']>;
  readonly ne: Maybe<Scalars['JSON']>;
  readonly in: Maybe<ReadonlyArray<Maybe<Scalars['JSON']>>>;
  readonly nin: Maybe<ReadonlyArray<Maybe<Scalars['JSON']>>>;
  readonly regex: Maybe<Scalars['JSON']>;
  readonly glob: Maybe<Scalars['JSON']>;
};

type Mdx = Node & {
  readonly rawBody: Scalars['String'];
  readonly fileAbsolutePath: Scalars['String'];
  readonly frontmatter: Frontmatter;
  readonly body: Scalars['String'];
  readonly excerpt: Scalars['String'];
  readonly headings: Maybe<ReadonlyArray<Maybe<MdxHeadingMdx>>>;
  readonly html: Maybe<Scalars['String']>;
  readonly mdxAST: Maybe<Scalars['JSON']>;
  readonly tableOfContents: Maybe<Scalars['JSON']>;
  readonly timeToRead: Maybe<Scalars['Int']>;
  readonly wordCount: Maybe<MdxWordCount>;
  readonly childDocsPage: Maybe<DocsPage>;
  readonly id: Scalars['ID'];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
};


type Mdx_excerptArgs = {
  pruneLength?: Maybe<Scalars['Int']>;
  truncate?: Maybe<Scalars['Boolean']>;
};


type Mdx_headingsArgs = {
  depth: Maybe<HeadingsMdx>;
};


type Mdx_tableOfContentsArgs = {
  maxDepth: Maybe<Scalars['Int']>;
};

type MdxConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<MdxEdge>;
  readonly nodes: ReadonlyArray<Mdx>;
  readonly pageInfo: PageInfo;
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly group: ReadonlyArray<MdxGroupConnection>;
};


type MdxConnection_distinctArgs = {
  field: MdxFieldsEnum;
};


type MdxConnection_groupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: MdxFieldsEnum;
};

type MdxEdge = {
  readonly next: Maybe<Mdx>;
  readonly node: Mdx;
  readonly previous: Maybe<Mdx>;
};

enum MdxFieldsEnum {
  rawBody = 'rawBody',
  fileAbsolutePath = 'fileAbsolutePath',
  frontmatter___title = 'frontmatter.title',
  frontmatter___shortTitle = 'frontmatter.shortTitle',
  frontmatter___overrideBreadcrumb = 'frontmatter.overrideBreadcrumb',
  frontmatter___overrideNav = 'frontmatter.overrideNav',
  frontmatter___isRoot = 'frontmatter.isRoot',
  frontmatter___childrenOrder = 'frontmatter.childrenOrder',
  frontmatter___noBreadcrumb = 'frontmatter.noBreadcrumb',
  frontmatter___noTOC = 'frontmatter.noTOC',
  frontmatter___badge = 'frontmatter.badge',
  frontmatter___noSequenceLinks = 'frontmatter.noSequenceLinks',
  body = 'body',
  excerpt = 'excerpt',
  headings = 'headings',
  headings___value = 'headings.value',
  headings___depth = 'headings.depth',
  html = 'html',
  mdxAST = 'mdxAST',
  tableOfContents = 'tableOfContents',
  timeToRead = 'timeToRead',
  wordCount___paragraphs = 'wordCount.paragraphs',
  wordCount___sentences = 'wordCount.sentences',
  wordCount___words = 'wordCount.words',
  childDocsPage___breadcrumb = 'childDocsPage.breadcrumb',
  childDocsPage___breadcrumb___text = 'childDocsPage.breadcrumb.text',
  childDocsPage___breadcrumb___path = 'childDocsPage.breadcrumb.path',
  childDocsPage___title = 'childDocsPage.title',
  childDocsPage___shortTitle = 'childDocsPage.shortTitle',
  childDocsPage___isOrphan = 'childDocsPage.isOrphan',
  childDocsPage___noTOC = 'childDocsPage.noTOC',
  childDocsPage___noSequenceLinks = 'childDocsPage.noSequenceLinks',
  childDocsPage___badge = 'childDocsPage.badge',
  childDocsPage___originalPath = 'childDocsPage.originalPath',
  childDocsPage___history___lastModified = 'childDocsPage.history.lastModified',
  childDocsPage___history___authors = 'childDocsPage.history.authors',
  childDocsPage___history___authors___name = 'childDocsPage.history.authors.name',
  childDocsPage___history___authors___avatarUrl = 'childDocsPage.history.authors.avatarUrl',
  childDocsPage___history___authors___login = 'childDocsPage.history.authors.login',
  childDocsPage___history___authors___url = 'childDocsPage.history.authors.url',
  childDocsPage___sideNav___root = 'childDocsPage.sideNav.root',
  childDocsPage___sideNav___id = 'childDocsPage.sideNav.id',
  childDocsPage___sideNav___parent___id = 'childDocsPage.sideNav.parent.id',
  childDocsPage___sideNav___parent___children = 'childDocsPage.sideNav.parent.children',
  childDocsPage___sideNav___children = 'childDocsPage.sideNav.children',
  childDocsPage___sideNav___children___id = 'childDocsPage.sideNav.children.id',
  childDocsPage___sideNav___children___children = 'childDocsPage.sideNav.children.children',
  childDocsPage___sideNav___internal___content = 'childDocsPage.sideNav.internal.content',
  childDocsPage___sideNav___internal___contentDigest = 'childDocsPage.sideNav.internal.contentDigest',
  childDocsPage___sideNav___internal___description = 'childDocsPage.sideNav.internal.description',
  childDocsPage___sideNav___internal___fieldOwners = 'childDocsPage.sideNav.internal.fieldOwners',
  childDocsPage___sideNav___internal___ignoreType = 'childDocsPage.sideNav.internal.ignoreType',
  childDocsPage___sideNav___internal___mediaType = 'childDocsPage.sideNav.internal.mediaType',
  childDocsPage___sideNav___internal___owner = 'childDocsPage.sideNav.internal.owner',
  childDocsPage___sideNav___internal___type = 'childDocsPage.sideNav.internal.type',
  childDocsPage___path = 'childDocsPage.path',
  childDocsPage___preorder = 'childDocsPage.preorder',
  childDocsPage___lead = 'childDocsPage.lead',
  childDocsPage___id = 'childDocsPage.id',
  childDocsPage___parent___id = 'childDocsPage.parent.id',
  childDocsPage___parent___parent___id = 'childDocsPage.parent.parent.id',
  childDocsPage___parent___parent___children = 'childDocsPage.parent.parent.children',
  childDocsPage___parent___children = 'childDocsPage.parent.children',
  childDocsPage___parent___children___id = 'childDocsPage.parent.children.id',
  childDocsPage___parent___children___children = 'childDocsPage.parent.children.children',
  childDocsPage___parent___internal___content = 'childDocsPage.parent.internal.content',
  childDocsPage___parent___internal___contentDigest = 'childDocsPage.parent.internal.contentDigest',
  childDocsPage___parent___internal___description = 'childDocsPage.parent.internal.description',
  childDocsPage___parent___internal___fieldOwners = 'childDocsPage.parent.internal.fieldOwners',
  childDocsPage___parent___internal___ignoreType = 'childDocsPage.parent.internal.ignoreType',
  childDocsPage___parent___internal___mediaType = 'childDocsPage.parent.internal.mediaType',
  childDocsPage___parent___internal___owner = 'childDocsPage.parent.internal.owner',
  childDocsPage___parent___internal___type = 'childDocsPage.parent.internal.type',
  childDocsPage___children = 'childDocsPage.children',
  childDocsPage___children___id = 'childDocsPage.children.id',
  childDocsPage___children___parent___id = 'childDocsPage.children.parent.id',
  childDocsPage___children___parent___children = 'childDocsPage.children.parent.children',
  childDocsPage___children___children = 'childDocsPage.children.children',
  childDocsPage___children___children___id = 'childDocsPage.children.children.id',
  childDocsPage___children___children___children = 'childDocsPage.children.children.children',
  childDocsPage___children___internal___content = 'childDocsPage.children.internal.content',
  childDocsPage___children___internal___contentDigest = 'childDocsPage.children.internal.contentDigest',
  childDocsPage___children___internal___description = 'childDocsPage.children.internal.description',
  childDocsPage___children___internal___fieldOwners = 'childDocsPage.children.internal.fieldOwners',
  childDocsPage___children___internal___ignoreType = 'childDocsPage.children.internal.ignoreType',
  childDocsPage___children___internal___mediaType = 'childDocsPage.children.internal.mediaType',
  childDocsPage___children___internal___owner = 'childDocsPage.children.internal.owner',
  childDocsPage___children___internal___type = 'childDocsPage.children.internal.type',
  childDocsPage___internal___content = 'childDocsPage.internal.content',
  childDocsPage___internal___contentDigest = 'childDocsPage.internal.contentDigest',
  childDocsPage___internal___description = 'childDocsPage.internal.description',
  childDocsPage___internal___fieldOwners = 'childDocsPage.internal.fieldOwners',
  childDocsPage___internal___ignoreType = 'childDocsPage.internal.ignoreType',
  childDocsPage___internal___mediaType = 'childDocsPage.internal.mediaType',
  childDocsPage___internal___owner = 'childDocsPage.internal.owner',
  childDocsPage___internal___type = 'childDocsPage.internal.type',
  id = 'id',
  parent___id = 'parent.id',
  parent___parent___id = 'parent.parent.id',
  parent___parent___parent___id = 'parent.parent.parent.id',
  parent___parent___parent___children = 'parent.parent.parent.children',
  parent___parent___children = 'parent.parent.children',
  parent___parent___children___id = 'parent.parent.children.id',
  parent___parent___children___children = 'parent.parent.children.children',
  parent___parent___internal___content = 'parent.parent.internal.content',
  parent___parent___internal___contentDigest = 'parent.parent.internal.contentDigest',
  parent___parent___internal___description = 'parent.parent.internal.description',
  parent___parent___internal___fieldOwners = 'parent.parent.internal.fieldOwners',
  parent___parent___internal___ignoreType = 'parent.parent.internal.ignoreType',
  parent___parent___internal___mediaType = 'parent.parent.internal.mediaType',
  parent___parent___internal___owner = 'parent.parent.internal.owner',
  parent___parent___internal___type = 'parent.parent.internal.type',
  parent___children = 'parent.children',
  parent___children___id = 'parent.children.id',
  parent___children___parent___id = 'parent.children.parent.id',
  parent___children___parent___children = 'parent.children.parent.children',
  parent___children___children = 'parent.children.children',
  parent___children___children___id = 'parent.children.children.id',
  parent___children___children___children = 'parent.children.children.children',
  parent___children___internal___content = 'parent.children.internal.content',
  parent___children___internal___contentDigest = 'parent.children.internal.contentDigest',
  parent___children___internal___description = 'parent.children.internal.description',
  parent___children___internal___fieldOwners = 'parent.children.internal.fieldOwners',
  parent___children___internal___ignoreType = 'parent.children.internal.ignoreType',
  parent___children___internal___mediaType = 'parent.children.internal.mediaType',
  parent___children___internal___owner = 'parent.children.internal.owner',
  parent___children___internal___type = 'parent.children.internal.type',
  parent___internal___content = 'parent.internal.content',
  parent___internal___contentDigest = 'parent.internal.contentDigest',
  parent___internal___description = 'parent.internal.description',
  parent___internal___fieldOwners = 'parent.internal.fieldOwners',
  parent___internal___ignoreType = 'parent.internal.ignoreType',
  parent___internal___mediaType = 'parent.internal.mediaType',
  parent___internal___owner = 'parent.internal.owner',
  parent___internal___type = 'parent.internal.type',
  children = 'children',
  children___id = 'children.id',
  children___parent___id = 'children.parent.id',
  children___parent___parent___id = 'children.parent.parent.id',
  children___parent___parent___children = 'children.parent.parent.children',
  children___parent___children = 'children.parent.children',
  children___parent___children___id = 'children.parent.children.id',
  children___parent___children___children = 'children.parent.children.children',
  children___parent___internal___content = 'children.parent.internal.content',
  children___parent___internal___contentDigest = 'children.parent.internal.contentDigest',
  children___parent___internal___description = 'children.parent.internal.description',
  children___parent___internal___fieldOwners = 'children.parent.internal.fieldOwners',
  children___parent___internal___ignoreType = 'children.parent.internal.ignoreType',
  children___parent___internal___mediaType = 'children.parent.internal.mediaType',
  children___parent___internal___owner = 'children.parent.internal.owner',
  children___parent___internal___type = 'children.parent.internal.type',
  children___children = 'children.children',
  children___children___id = 'children.children.id',
  children___children___parent___id = 'children.children.parent.id',
  children___children___parent___children = 'children.children.parent.children',
  children___children___children = 'children.children.children',
  children___children___children___id = 'children.children.children.id',
  children___children___children___children = 'children.children.children.children',
  children___children___internal___content = 'children.children.internal.content',
  children___children___internal___contentDigest = 'children.children.internal.contentDigest',
  children___children___internal___description = 'children.children.internal.description',
  children___children___internal___fieldOwners = 'children.children.internal.fieldOwners',
  children___children___internal___ignoreType = 'children.children.internal.ignoreType',
  children___children___internal___mediaType = 'children.children.internal.mediaType',
  children___children___internal___owner = 'children.children.internal.owner',
  children___children___internal___type = 'children.children.internal.type',
  children___internal___content = 'children.internal.content',
  children___internal___contentDigest = 'children.internal.contentDigest',
  children___internal___description = 'children.internal.description',
  children___internal___fieldOwners = 'children.internal.fieldOwners',
  children___internal___ignoreType = 'children.internal.ignoreType',
  children___internal___mediaType = 'children.internal.mediaType',
  children___internal___owner = 'children.internal.owner',
  children___internal___type = 'children.internal.type',
  internal___content = 'internal.content',
  internal___contentDigest = 'internal.contentDigest',
  internal___description = 'internal.description',
  internal___fieldOwners = 'internal.fieldOwners',
  internal___ignoreType = 'internal.ignoreType',
  internal___mediaType = 'internal.mediaType',
  internal___owner = 'internal.owner',
  internal___type = 'internal.type'
}

type MdxFilterInput = {
  readonly rawBody: Maybe<StringQueryOperatorInput>;
  readonly fileAbsolutePath: Maybe<StringQueryOperatorInput>;
  readonly frontmatter: Maybe<FrontmatterFilterInput>;
  readonly body: Maybe<StringQueryOperatorInput>;
  readonly excerpt: Maybe<StringQueryOperatorInput>;
  readonly headings: Maybe<MdxHeadingMdxFilterListInput>;
  readonly html: Maybe<StringQueryOperatorInput>;
  readonly mdxAST: Maybe<JSONQueryOperatorInput>;
  readonly tableOfContents: Maybe<JSONQueryOperatorInput>;
  readonly timeToRead: Maybe<IntQueryOperatorInput>;
  readonly wordCount: Maybe<MdxWordCountFilterInput>;
  readonly childDocsPage: Maybe<DocsPageFilterInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
};

type MdxFrontmatter = {
  readonly title: Scalars['String'];
};

type MdxGroupConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<MdxEdge>;
  readonly nodes: ReadonlyArray<Mdx>;
  readonly pageInfo: PageInfo;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
};

type MdxHeadingMdx = {
  readonly value: Maybe<Scalars['String']>;
  readonly depth: Maybe<Scalars['Int']>;
};

type MdxHeadingMdxFilterInput = {
  readonly value: Maybe<StringQueryOperatorInput>;
  readonly depth: Maybe<IntQueryOperatorInput>;
};

type MdxHeadingMdxFilterListInput = {
  readonly elemMatch: Maybe<MdxHeadingMdxFilterInput>;
};

type MdxSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<MdxFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

type MdxWordCount = {
  readonly paragraphs: Maybe<Scalars['Int']>;
  readonly sentences: Maybe<Scalars['Int']>;
  readonly words: Maybe<Scalars['Int']>;
};

type MdxWordCountFilterInput = {
  readonly paragraphs: Maybe<IntQueryOperatorInput>;
  readonly sentences: Maybe<IntQueryOperatorInput>;
  readonly words: Maybe<IntQueryOperatorInput>;
};

type NavigationTree = Node & {
  readonly root: Scalars['JSON'];
  readonly id: Scalars['ID'];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
};

type NavigationTreeConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<NavigationTreeEdge>;
  readonly nodes: ReadonlyArray<NavigationTree>;
  readonly pageInfo: PageInfo;
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly group: ReadonlyArray<NavigationTreeGroupConnection>;
};


type NavigationTreeConnection_distinctArgs = {
  field: NavigationTreeFieldsEnum;
};


type NavigationTreeConnection_groupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: NavigationTreeFieldsEnum;
};

type NavigationTreeEdge = {
  readonly next: Maybe<NavigationTree>;
  readonly node: NavigationTree;
  readonly previous: Maybe<NavigationTree>;
};

enum NavigationTreeFieldsEnum {
  root = 'root',
  id = 'id',
  parent___id = 'parent.id',
  parent___parent___id = 'parent.parent.id',
  parent___parent___parent___id = 'parent.parent.parent.id',
  parent___parent___parent___children = 'parent.parent.parent.children',
  parent___parent___children = 'parent.parent.children',
  parent___parent___children___id = 'parent.parent.children.id',
  parent___parent___children___children = 'parent.parent.children.children',
  parent___parent___internal___content = 'parent.parent.internal.content',
  parent___parent___internal___contentDigest = 'parent.parent.internal.contentDigest',
  parent___parent___internal___description = 'parent.parent.internal.description',
  parent___parent___internal___fieldOwners = 'parent.parent.internal.fieldOwners',
  parent___parent___internal___ignoreType = 'parent.parent.internal.ignoreType',
  parent___parent___internal___mediaType = 'parent.parent.internal.mediaType',
  parent___parent___internal___owner = 'parent.parent.internal.owner',
  parent___parent___internal___type = 'parent.parent.internal.type',
  parent___children = 'parent.children',
  parent___children___id = 'parent.children.id',
  parent___children___parent___id = 'parent.children.parent.id',
  parent___children___parent___children = 'parent.children.parent.children',
  parent___children___children = 'parent.children.children',
  parent___children___children___id = 'parent.children.children.id',
  parent___children___children___children = 'parent.children.children.children',
  parent___children___internal___content = 'parent.children.internal.content',
  parent___children___internal___contentDigest = 'parent.children.internal.contentDigest',
  parent___children___internal___description = 'parent.children.internal.description',
  parent___children___internal___fieldOwners = 'parent.children.internal.fieldOwners',
  parent___children___internal___ignoreType = 'parent.children.internal.ignoreType',
  parent___children___internal___mediaType = 'parent.children.internal.mediaType',
  parent___children___internal___owner = 'parent.children.internal.owner',
  parent___children___internal___type = 'parent.children.internal.type',
  parent___internal___content = 'parent.internal.content',
  parent___internal___contentDigest = 'parent.internal.contentDigest',
  parent___internal___description = 'parent.internal.description',
  parent___internal___fieldOwners = 'parent.internal.fieldOwners',
  parent___internal___ignoreType = 'parent.internal.ignoreType',
  parent___internal___mediaType = 'parent.internal.mediaType',
  parent___internal___owner = 'parent.internal.owner',
  parent___internal___type = 'parent.internal.type',
  children = 'children',
  children___id = 'children.id',
  children___parent___id = 'children.parent.id',
  children___parent___parent___id = 'children.parent.parent.id',
  children___parent___parent___children = 'children.parent.parent.children',
  children___parent___children = 'children.parent.children',
  children___parent___children___id = 'children.parent.children.id',
  children___parent___children___children = 'children.parent.children.children',
  children___parent___internal___content = 'children.parent.internal.content',
  children___parent___internal___contentDigest = 'children.parent.internal.contentDigest',
  children___parent___internal___description = 'children.parent.internal.description',
  children___parent___internal___fieldOwners = 'children.parent.internal.fieldOwners',
  children___parent___internal___ignoreType = 'children.parent.internal.ignoreType',
  children___parent___internal___mediaType = 'children.parent.internal.mediaType',
  children___parent___internal___owner = 'children.parent.internal.owner',
  children___parent___internal___type = 'children.parent.internal.type',
  children___children = 'children.children',
  children___children___id = 'children.children.id',
  children___children___parent___id = 'children.children.parent.id',
  children___children___parent___children = 'children.children.parent.children',
  children___children___children = 'children.children.children',
  children___children___children___id = 'children.children.children.id',
  children___children___children___children = 'children.children.children.children',
  children___children___internal___content = 'children.children.internal.content',
  children___children___internal___contentDigest = 'children.children.internal.contentDigest',
  children___children___internal___description = 'children.children.internal.description',
  children___children___internal___fieldOwners = 'children.children.internal.fieldOwners',
  children___children___internal___ignoreType = 'children.children.internal.ignoreType',
  children___children___internal___mediaType = 'children.children.internal.mediaType',
  children___children___internal___owner = 'children.children.internal.owner',
  children___children___internal___type = 'children.children.internal.type',
  children___internal___content = 'children.internal.content',
  children___internal___contentDigest = 'children.internal.contentDigest',
  children___internal___description = 'children.internal.description',
  children___internal___fieldOwners = 'children.internal.fieldOwners',
  children___internal___ignoreType = 'children.internal.ignoreType',
  children___internal___mediaType = 'children.internal.mediaType',
  children___internal___owner = 'children.internal.owner',
  children___internal___type = 'children.internal.type',
  internal___content = 'internal.content',
  internal___contentDigest = 'internal.contentDigest',
  internal___description = 'internal.description',
  internal___fieldOwners = 'internal.fieldOwners',
  internal___ignoreType = 'internal.ignoreType',
  internal___mediaType = 'internal.mediaType',
  internal___owner = 'internal.owner',
  internal___type = 'internal.type'
}

type NavigationTreeFilterInput = {
  readonly root: Maybe<JSONQueryOperatorInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
};

type NavigationTreeGroupConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<NavigationTreeEdge>;
  readonly nodes: ReadonlyArray<NavigationTree>;
  readonly pageInfo: PageInfo;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
};

type NavigationTreeSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<NavigationTreeFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

/** Node Interface */
type Node = {
  readonly id: Scalars['ID'];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
};

type NodeFilterInput = {
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
};

type NodeFilterListInput = {
  readonly elemMatch: Maybe<NodeFilterInput>;
};

type PageInfo = {
  readonly currentPage: Scalars['Int'];
  readonly hasPreviousPage: Scalars['Boolean'];
  readonly hasNextPage: Scalars['Boolean'];
  readonly itemCount: Scalars['Int'];
  readonly pageCount: Scalars['Int'];
  readonly perPage: Maybe<Scalars['Int']>;
  readonly totalCount: Scalars['Int'];
};

type Query = {
  readonly file: Maybe<File>;
  readonly allFile: FileConnection;
  readonly directory: Maybe<Directory>;
  readonly allDirectory: DirectoryConnection;
  readonly sitePage: Maybe<SitePage>;
  readonly allSitePage: SitePageConnection;
  readonly site: Maybe<Site>;
  readonly allSite: SiteConnection;
  readonly mdx: Maybe<Mdx>;
  readonly allMdx: MdxConnection;
  readonly navigationTree: Maybe<NavigationTree>;
  readonly allNavigationTree: NavigationTreeConnection;
  readonly docsPage: Maybe<DocsPage>;
  readonly allDocsPage: DocsPageConnection;
  readonly buildMetadata: Maybe<BuildMetadata>;
  readonly allBuildMetadata: BuildMetadataConnection;
  readonly graphQlSource: Maybe<GraphQLSource>;
  readonly allGraphQlSource: GraphQLSourceConnection;
  readonly siteBuildMetadata: Maybe<SiteBuildMetadata>;
  readonly allSiteBuildMetadata: SiteBuildMetadataConnection;
  readonly sitePlugin: Maybe<SitePlugin>;
  readonly allSitePlugin: SitePluginConnection;
  readonly github: GitHub;
};


type Query_fileArgs = {
  sourceInstanceName: Maybe<StringQueryOperatorInput>;
  absolutePath: Maybe<StringQueryOperatorInput>;
  relativePath: Maybe<StringQueryOperatorInput>;
  extension: Maybe<StringQueryOperatorInput>;
  size: Maybe<IntQueryOperatorInput>;
  prettySize: Maybe<StringQueryOperatorInput>;
  modifiedTime: Maybe<DateQueryOperatorInput>;
  accessTime: Maybe<DateQueryOperatorInput>;
  changeTime: Maybe<DateQueryOperatorInput>;
  birthTime: Maybe<DateQueryOperatorInput>;
  root: Maybe<StringQueryOperatorInput>;
  dir: Maybe<StringQueryOperatorInput>;
  base: Maybe<StringQueryOperatorInput>;
  ext: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  relativeDirectory: Maybe<StringQueryOperatorInput>;
  dev: Maybe<IntQueryOperatorInput>;
  mode: Maybe<IntQueryOperatorInput>;
  nlink: Maybe<IntQueryOperatorInput>;
  uid: Maybe<IntQueryOperatorInput>;
  gid: Maybe<IntQueryOperatorInput>;
  rdev: Maybe<IntQueryOperatorInput>;
  ino: Maybe<FloatQueryOperatorInput>;
  atimeMs: Maybe<FloatQueryOperatorInput>;
  mtimeMs: Maybe<FloatQueryOperatorInput>;
  ctimeMs: Maybe<FloatQueryOperatorInput>;
  atime: Maybe<DateQueryOperatorInput>;
  mtime: Maybe<DateQueryOperatorInput>;
  ctime: Maybe<DateQueryOperatorInput>;
  birthtime: Maybe<DateQueryOperatorInput>;
  birthtimeMs: Maybe<FloatQueryOperatorInput>;
  childMdx: Maybe<MdxFilterInput>;
  blksize: Maybe<IntQueryOperatorInput>;
  blocks: Maybe<IntQueryOperatorInput>;
  publicURL: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


type Query_allFileArgs = {
  filter: Maybe<FileFilterInput>;
  sort: Maybe<FileSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


type Query_directoryArgs = {
  sourceInstanceName: Maybe<StringQueryOperatorInput>;
  absolutePath: Maybe<StringQueryOperatorInput>;
  relativePath: Maybe<StringQueryOperatorInput>;
  extension: Maybe<StringQueryOperatorInput>;
  size: Maybe<IntQueryOperatorInput>;
  prettySize: Maybe<StringQueryOperatorInput>;
  modifiedTime: Maybe<DateQueryOperatorInput>;
  accessTime: Maybe<DateQueryOperatorInput>;
  changeTime: Maybe<DateQueryOperatorInput>;
  birthTime: Maybe<DateQueryOperatorInput>;
  root: Maybe<StringQueryOperatorInput>;
  dir: Maybe<StringQueryOperatorInput>;
  base: Maybe<StringQueryOperatorInput>;
  ext: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  relativeDirectory: Maybe<StringQueryOperatorInput>;
  dev: Maybe<IntQueryOperatorInput>;
  mode: Maybe<IntQueryOperatorInput>;
  nlink: Maybe<IntQueryOperatorInput>;
  uid: Maybe<IntQueryOperatorInput>;
  gid: Maybe<IntQueryOperatorInput>;
  rdev: Maybe<IntQueryOperatorInput>;
  ino: Maybe<FloatQueryOperatorInput>;
  atimeMs: Maybe<FloatQueryOperatorInput>;
  mtimeMs: Maybe<FloatQueryOperatorInput>;
  ctimeMs: Maybe<FloatQueryOperatorInput>;
  atime: Maybe<DateQueryOperatorInput>;
  mtime: Maybe<DateQueryOperatorInput>;
  ctime: Maybe<DateQueryOperatorInput>;
  birthtime: Maybe<DateQueryOperatorInput>;
  birthtimeMs: Maybe<FloatQueryOperatorInput>;
  blksize: Maybe<IntQueryOperatorInput>;
  blocks: Maybe<IntQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


type Query_allDirectoryArgs = {
  filter: Maybe<DirectoryFilterInput>;
  sort: Maybe<DirectorySortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


type Query_sitePageArgs = {
  path: Maybe<StringQueryOperatorInput>;
  component: Maybe<StringQueryOperatorInput>;
  internalComponentName: Maybe<StringQueryOperatorInput>;
  componentChunkName: Maybe<StringQueryOperatorInput>;
  matchPath: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  isCreatedByStatefulCreatePages: Maybe<BooleanQueryOperatorInput>;
  context: Maybe<SitePageContextFilterInput>;
  pluginCreator: Maybe<SitePluginFilterInput>;
  pluginCreatorId: Maybe<StringQueryOperatorInput>;
  componentPath: Maybe<StringQueryOperatorInput>;
};


type Query_allSitePageArgs = {
  filter: Maybe<SitePageFilterInput>;
  sort: Maybe<SitePageSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


type Query_siteArgs = {
  buildTime: Maybe<DateQueryOperatorInput>;
  siteMetadata: Maybe<SiteSiteMetadataFilterInput>;
  port: Maybe<DateQueryOperatorInput>;
  host: Maybe<StringQueryOperatorInput>;
  pathPrefix: Maybe<StringQueryOperatorInput>;
  polyfill: Maybe<BooleanQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


type Query_allSiteArgs = {
  filter: Maybe<SiteFilterInput>;
  sort: Maybe<SiteSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


type Query_mdxArgs = {
  rawBody: Maybe<StringQueryOperatorInput>;
  fileAbsolutePath: Maybe<StringQueryOperatorInput>;
  frontmatter: Maybe<FrontmatterFilterInput>;
  body: Maybe<StringQueryOperatorInput>;
  excerpt: Maybe<StringQueryOperatorInput>;
  headings: Maybe<MdxHeadingMdxFilterListInput>;
  html: Maybe<StringQueryOperatorInput>;
  mdxAST: Maybe<JSONQueryOperatorInput>;
  tableOfContents: Maybe<JSONQueryOperatorInput>;
  timeToRead: Maybe<IntQueryOperatorInput>;
  wordCount: Maybe<MdxWordCountFilterInput>;
  childDocsPage: Maybe<DocsPageFilterInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


type Query_allMdxArgs = {
  filter: Maybe<MdxFilterInput>;
  sort: Maybe<MdxSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


type Query_navigationTreeArgs = {
  root: Maybe<JSONQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


type Query_allNavigationTreeArgs = {
  filter: Maybe<NavigationTreeFilterInput>;
  sort: Maybe<NavigationTreeSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


type Query_docsPageArgs = {
  breadcrumb: Maybe<BreadcrumbSegmentFilterListInput>;
  title: Maybe<StringQueryOperatorInput>;
  shortTitle: Maybe<StringQueryOperatorInput>;
  isOrphan: Maybe<BooleanQueryOperatorInput>;
  noTOC: Maybe<BooleanQueryOperatorInput>;
  noSequenceLinks: Maybe<BooleanQueryOperatorInput>;
  badge: Maybe<StringQueryOperatorInput>;
  originalPath: Maybe<StringQueryOperatorInput>;
  history: Maybe<HistoryFilterInput>;
  sideNav: Maybe<NavigationTreeFilterInput>;
  path: Maybe<StringQueryOperatorInput>;
  preorder: Maybe<IntQueryOperatorInput>;
  lead: Maybe<StringQueryOperatorInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


type Query_allDocsPageArgs = {
  filter: Maybe<DocsPageFilterInput>;
  sort: Maybe<DocsPageSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


type Query_buildMetadataArgs = {
  label: Maybe<StringQueryOperatorInput>;
  icon: Maybe<StringQueryOperatorInput>;
  context: Maybe<BuildMetadataContextFilterInput>;
  details: Maybe<BuildMetadataEntryFilterListInput>;
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
};


type Query_allBuildMetadataArgs = {
  filter: Maybe<BuildMetadataFilterInput>;
  sort: Maybe<BuildMetadataSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


type Query_graphQlSourceArgs = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  typeName: Maybe<StringQueryOperatorInput>;
  fieldName: Maybe<StringQueryOperatorInput>;
};


type Query_allGraphQlSourceArgs = {
  filter: Maybe<GraphQLSourceFilterInput>;
  sort: Maybe<GraphQLSourceSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


type Query_siteBuildMetadataArgs = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  buildTime: Maybe<DateQueryOperatorInput>;
};


type Query_allSiteBuildMetadataArgs = {
  filter: Maybe<SiteBuildMetadataFilterInput>;
  sort: Maybe<SiteBuildMetadataSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};


type Query_sitePluginArgs = {
  id: Maybe<StringQueryOperatorInput>;
  parent: Maybe<NodeFilterInput>;
  children: Maybe<NodeFilterListInput>;
  internal: Maybe<InternalFilterInput>;
  resolve: Maybe<StringQueryOperatorInput>;
  name: Maybe<StringQueryOperatorInput>;
  version: Maybe<StringQueryOperatorInput>;
  pluginOptions: Maybe<SitePluginPluginOptionsFilterInput>;
  nodeAPIs: Maybe<StringQueryOperatorInput>;
  browserAPIs: Maybe<StringQueryOperatorInput>;
  ssrAPIs: Maybe<StringQueryOperatorInput>;
  pluginFilepath: Maybe<StringQueryOperatorInput>;
  packageJson: Maybe<SitePluginPackageJsonFilterInput>;
};


type Query_allSitePluginArgs = {
  filter: Maybe<SitePluginFilterInput>;
  sort: Maybe<SitePluginSortInput>;
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
};

type Site = Node & {
  readonly buildTime: Maybe<Scalars['Date']>;
  readonly siteMetadata: Maybe<SiteSiteMetadata>;
  readonly port: Maybe<Scalars['Date']>;
  readonly host: Maybe<Scalars['String']>;
  readonly pathPrefix: Maybe<Scalars['String']>;
  readonly polyfill: Maybe<Scalars['Boolean']>;
  readonly id: Scalars['ID'];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
};


type Site_buildTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};


type Site_portArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};

type SiteBuildMetadata = Node & {
  readonly id: Scalars['ID'];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
  readonly buildTime: Maybe<Scalars['Date']>;
};


type SiteBuildMetadata_buildTimeArgs = {
  formatString: Maybe<Scalars['String']>;
  fromNow: Maybe<Scalars['Boolean']>;
  difference: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['String']>;
};

type SiteBuildMetadataConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<SiteBuildMetadataEdge>;
  readonly nodes: ReadonlyArray<SiteBuildMetadata>;
  readonly pageInfo: PageInfo;
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly group: ReadonlyArray<SiteBuildMetadataGroupConnection>;
};


type SiteBuildMetadataConnection_distinctArgs = {
  field: SiteBuildMetadataFieldsEnum;
};


type SiteBuildMetadataConnection_groupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: SiteBuildMetadataFieldsEnum;
};

type SiteBuildMetadataEdge = {
  readonly next: Maybe<SiteBuildMetadata>;
  readonly node: SiteBuildMetadata;
  readonly previous: Maybe<SiteBuildMetadata>;
};

enum SiteBuildMetadataFieldsEnum {
  id = 'id',
  parent___id = 'parent.id',
  parent___parent___id = 'parent.parent.id',
  parent___parent___parent___id = 'parent.parent.parent.id',
  parent___parent___parent___children = 'parent.parent.parent.children',
  parent___parent___children = 'parent.parent.children',
  parent___parent___children___id = 'parent.parent.children.id',
  parent___parent___children___children = 'parent.parent.children.children',
  parent___parent___internal___content = 'parent.parent.internal.content',
  parent___parent___internal___contentDigest = 'parent.parent.internal.contentDigest',
  parent___parent___internal___description = 'parent.parent.internal.description',
  parent___parent___internal___fieldOwners = 'parent.parent.internal.fieldOwners',
  parent___parent___internal___ignoreType = 'parent.parent.internal.ignoreType',
  parent___parent___internal___mediaType = 'parent.parent.internal.mediaType',
  parent___parent___internal___owner = 'parent.parent.internal.owner',
  parent___parent___internal___type = 'parent.parent.internal.type',
  parent___children = 'parent.children',
  parent___children___id = 'parent.children.id',
  parent___children___parent___id = 'parent.children.parent.id',
  parent___children___parent___children = 'parent.children.parent.children',
  parent___children___children = 'parent.children.children',
  parent___children___children___id = 'parent.children.children.id',
  parent___children___children___children = 'parent.children.children.children',
  parent___children___internal___content = 'parent.children.internal.content',
  parent___children___internal___contentDigest = 'parent.children.internal.contentDigest',
  parent___children___internal___description = 'parent.children.internal.description',
  parent___children___internal___fieldOwners = 'parent.children.internal.fieldOwners',
  parent___children___internal___ignoreType = 'parent.children.internal.ignoreType',
  parent___children___internal___mediaType = 'parent.children.internal.mediaType',
  parent___children___internal___owner = 'parent.children.internal.owner',
  parent___children___internal___type = 'parent.children.internal.type',
  parent___internal___content = 'parent.internal.content',
  parent___internal___contentDigest = 'parent.internal.contentDigest',
  parent___internal___description = 'parent.internal.description',
  parent___internal___fieldOwners = 'parent.internal.fieldOwners',
  parent___internal___ignoreType = 'parent.internal.ignoreType',
  parent___internal___mediaType = 'parent.internal.mediaType',
  parent___internal___owner = 'parent.internal.owner',
  parent___internal___type = 'parent.internal.type',
  children = 'children',
  children___id = 'children.id',
  children___parent___id = 'children.parent.id',
  children___parent___parent___id = 'children.parent.parent.id',
  children___parent___parent___children = 'children.parent.parent.children',
  children___parent___children = 'children.parent.children',
  children___parent___children___id = 'children.parent.children.id',
  children___parent___children___children = 'children.parent.children.children',
  children___parent___internal___content = 'children.parent.internal.content',
  children___parent___internal___contentDigest = 'children.parent.internal.contentDigest',
  children___parent___internal___description = 'children.parent.internal.description',
  children___parent___internal___fieldOwners = 'children.parent.internal.fieldOwners',
  children___parent___internal___ignoreType = 'children.parent.internal.ignoreType',
  children___parent___internal___mediaType = 'children.parent.internal.mediaType',
  children___parent___internal___owner = 'children.parent.internal.owner',
  children___parent___internal___type = 'children.parent.internal.type',
  children___children = 'children.children',
  children___children___id = 'children.children.id',
  children___children___parent___id = 'children.children.parent.id',
  children___children___parent___children = 'children.children.parent.children',
  children___children___children = 'children.children.children',
  children___children___children___id = 'children.children.children.id',
  children___children___children___children = 'children.children.children.children',
  children___children___internal___content = 'children.children.internal.content',
  children___children___internal___contentDigest = 'children.children.internal.contentDigest',
  children___children___internal___description = 'children.children.internal.description',
  children___children___internal___fieldOwners = 'children.children.internal.fieldOwners',
  children___children___internal___ignoreType = 'children.children.internal.ignoreType',
  children___children___internal___mediaType = 'children.children.internal.mediaType',
  children___children___internal___owner = 'children.children.internal.owner',
  children___children___internal___type = 'children.children.internal.type',
  children___internal___content = 'children.internal.content',
  children___internal___contentDigest = 'children.internal.contentDigest',
  children___internal___description = 'children.internal.description',
  children___internal___fieldOwners = 'children.internal.fieldOwners',
  children___internal___ignoreType = 'children.internal.ignoreType',
  children___internal___mediaType = 'children.internal.mediaType',
  children___internal___owner = 'children.internal.owner',
  children___internal___type = 'children.internal.type',
  internal___content = 'internal.content',
  internal___contentDigest = 'internal.contentDigest',
  internal___description = 'internal.description',
  internal___fieldOwners = 'internal.fieldOwners',
  internal___ignoreType = 'internal.ignoreType',
  internal___mediaType = 'internal.mediaType',
  internal___owner = 'internal.owner',
  internal___type = 'internal.type',
  buildTime = 'buildTime'
}

type SiteBuildMetadataFilterInput = {
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
  readonly buildTime: Maybe<DateQueryOperatorInput>;
};

type SiteBuildMetadataGroupConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<SiteBuildMetadataEdge>;
  readonly nodes: ReadonlyArray<SiteBuildMetadata>;
  readonly pageInfo: PageInfo;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
};

type SiteBuildMetadataSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<SiteBuildMetadataFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

type SiteConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<SiteEdge>;
  readonly nodes: ReadonlyArray<Site>;
  readonly pageInfo: PageInfo;
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly group: ReadonlyArray<SiteGroupConnection>;
};


type SiteConnection_distinctArgs = {
  field: SiteFieldsEnum;
};


type SiteConnection_groupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: SiteFieldsEnum;
};

type SiteEdge = {
  readonly next: Maybe<Site>;
  readonly node: Site;
  readonly previous: Maybe<Site>;
};

enum SiteFieldsEnum {
  buildTime = 'buildTime',
  siteMetadata___title = 'siteMetadata.title',
  siteMetadata___headerTitle = 'siteMetadata.headerTitle',
  siteMetadata___version = 'siteMetadata.version',
  siteMetadata___description = 'siteMetadata.description',
  siteMetadata___author = 'siteMetadata.author',
  siteMetadata___siteUrl = 'siteMetadata.siteUrl',
  siteMetadata___themeColor = 'siteMetadata.themeColor',
  siteMetadata___msTileColor = 'siteMetadata.msTileColor',
  siteMetadata___github___owner = 'siteMetadata.github.owner',
  siteMetadata___github___name = 'siteMetadata.github.name',
  siteMetadata___github___docsRoot = 'siteMetadata.github.docsRoot',
  siteMetadata___github___branch = 'siteMetadata.github.branch',
  siteMetadata___socials___github = 'siteMetadata.socials.github',
  siteMetadata___socials___discord = 'siteMetadata.socials.discord',
  port = 'port',
  host = 'host',
  pathPrefix = 'pathPrefix',
  polyfill = 'polyfill',
  id = 'id',
  parent___id = 'parent.id',
  parent___parent___id = 'parent.parent.id',
  parent___parent___parent___id = 'parent.parent.parent.id',
  parent___parent___parent___children = 'parent.parent.parent.children',
  parent___parent___children = 'parent.parent.children',
  parent___parent___children___id = 'parent.parent.children.id',
  parent___parent___children___children = 'parent.parent.children.children',
  parent___parent___internal___content = 'parent.parent.internal.content',
  parent___parent___internal___contentDigest = 'parent.parent.internal.contentDigest',
  parent___parent___internal___description = 'parent.parent.internal.description',
  parent___parent___internal___fieldOwners = 'parent.parent.internal.fieldOwners',
  parent___parent___internal___ignoreType = 'parent.parent.internal.ignoreType',
  parent___parent___internal___mediaType = 'parent.parent.internal.mediaType',
  parent___parent___internal___owner = 'parent.parent.internal.owner',
  parent___parent___internal___type = 'parent.parent.internal.type',
  parent___children = 'parent.children',
  parent___children___id = 'parent.children.id',
  parent___children___parent___id = 'parent.children.parent.id',
  parent___children___parent___children = 'parent.children.parent.children',
  parent___children___children = 'parent.children.children',
  parent___children___children___id = 'parent.children.children.id',
  parent___children___children___children = 'parent.children.children.children',
  parent___children___internal___content = 'parent.children.internal.content',
  parent___children___internal___contentDigest = 'parent.children.internal.contentDigest',
  parent___children___internal___description = 'parent.children.internal.description',
  parent___children___internal___fieldOwners = 'parent.children.internal.fieldOwners',
  parent___children___internal___ignoreType = 'parent.children.internal.ignoreType',
  parent___children___internal___mediaType = 'parent.children.internal.mediaType',
  parent___children___internal___owner = 'parent.children.internal.owner',
  parent___children___internal___type = 'parent.children.internal.type',
  parent___internal___content = 'parent.internal.content',
  parent___internal___contentDigest = 'parent.internal.contentDigest',
  parent___internal___description = 'parent.internal.description',
  parent___internal___fieldOwners = 'parent.internal.fieldOwners',
  parent___internal___ignoreType = 'parent.internal.ignoreType',
  parent___internal___mediaType = 'parent.internal.mediaType',
  parent___internal___owner = 'parent.internal.owner',
  parent___internal___type = 'parent.internal.type',
  children = 'children',
  children___id = 'children.id',
  children___parent___id = 'children.parent.id',
  children___parent___parent___id = 'children.parent.parent.id',
  children___parent___parent___children = 'children.parent.parent.children',
  children___parent___children = 'children.parent.children',
  children___parent___children___id = 'children.parent.children.id',
  children___parent___children___children = 'children.parent.children.children',
  children___parent___internal___content = 'children.parent.internal.content',
  children___parent___internal___contentDigest = 'children.parent.internal.contentDigest',
  children___parent___internal___description = 'children.parent.internal.description',
  children___parent___internal___fieldOwners = 'children.parent.internal.fieldOwners',
  children___parent___internal___ignoreType = 'children.parent.internal.ignoreType',
  children___parent___internal___mediaType = 'children.parent.internal.mediaType',
  children___parent___internal___owner = 'children.parent.internal.owner',
  children___parent___internal___type = 'children.parent.internal.type',
  children___children = 'children.children',
  children___children___id = 'children.children.id',
  children___children___parent___id = 'children.children.parent.id',
  children___children___parent___children = 'children.children.parent.children',
  children___children___children = 'children.children.children',
  children___children___children___id = 'children.children.children.id',
  children___children___children___children = 'children.children.children.children',
  children___children___internal___content = 'children.children.internal.content',
  children___children___internal___contentDigest = 'children.children.internal.contentDigest',
  children___children___internal___description = 'children.children.internal.description',
  children___children___internal___fieldOwners = 'children.children.internal.fieldOwners',
  children___children___internal___ignoreType = 'children.children.internal.ignoreType',
  children___children___internal___mediaType = 'children.children.internal.mediaType',
  children___children___internal___owner = 'children.children.internal.owner',
  children___children___internal___type = 'children.children.internal.type',
  children___internal___content = 'children.internal.content',
  children___internal___contentDigest = 'children.internal.contentDigest',
  children___internal___description = 'children.internal.description',
  children___internal___fieldOwners = 'children.internal.fieldOwners',
  children___internal___ignoreType = 'children.internal.ignoreType',
  children___internal___mediaType = 'children.internal.mediaType',
  children___internal___owner = 'children.internal.owner',
  children___internal___type = 'children.internal.type',
  internal___content = 'internal.content',
  internal___contentDigest = 'internal.contentDigest',
  internal___description = 'internal.description',
  internal___fieldOwners = 'internal.fieldOwners',
  internal___ignoreType = 'internal.ignoreType',
  internal___mediaType = 'internal.mediaType',
  internal___owner = 'internal.owner',
  internal___type = 'internal.type'
}

type SiteFilterInput = {
  readonly buildTime: Maybe<DateQueryOperatorInput>;
  readonly siteMetadata: Maybe<SiteSiteMetadataFilterInput>;
  readonly port: Maybe<DateQueryOperatorInput>;
  readonly host: Maybe<StringQueryOperatorInput>;
  readonly pathPrefix: Maybe<StringQueryOperatorInput>;
  readonly polyfill: Maybe<BooleanQueryOperatorInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
};

type SiteGroupConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<SiteEdge>;
  readonly nodes: ReadonlyArray<Site>;
  readonly pageInfo: PageInfo;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
};

type SitePage = Node & {
  readonly path: Scalars['String'];
  readonly component: Scalars['String'];
  readonly internalComponentName: Scalars['String'];
  readonly componentChunkName: Scalars['String'];
  readonly matchPath: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
  readonly isCreatedByStatefulCreatePages: Maybe<Scalars['Boolean']>;
  readonly context: Maybe<SitePageContext>;
  readonly pluginCreator: Maybe<SitePlugin>;
  readonly pluginCreatorId: Maybe<Scalars['String']>;
  readonly componentPath: Maybe<Scalars['String']>;
};

type SitePageConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<SitePageEdge>;
  readonly nodes: ReadonlyArray<SitePage>;
  readonly pageInfo: PageInfo;
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly group: ReadonlyArray<SitePageGroupConnection>;
};


type SitePageConnection_distinctArgs = {
  field: SitePageFieldsEnum;
};


type SitePageConnection_groupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: SitePageFieldsEnum;
};

type SitePageContext = {
  readonly id: Maybe<Scalars['String']>;
  readonly previous: Maybe<Scalars['String']>;
  readonly next: Maybe<Scalars['String']>;
};

type SitePageContextFilterInput = {
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly previous: Maybe<StringQueryOperatorInput>;
  readonly next: Maybe<StringQueryOperatorInput>;
};

type SitePageEdge = {
  readonly next: Maybe<SitePage>;
  readonly node: SitePage;
  readonly previous: Maybe<SitePage>;
};

enum SitePageFieldsEnum {
  path = 'path',
  component = 'component',
  internalComponentName = 'internalComponentName',
  componentChunkName = 'componentChunkName',
  matchPath = 'matchPath',
  id = 'id',
  parent___id = 'parent.id',
  parent___parent___id = 'parent.parent.id',
  parent___parent___parent___id = 'parent.parent.parent.id',
  parent___parent___parent___children = 'parent.parent.parent.children',
  parent___parent___children = 'parent.parent.children',
  parent___parent___children___id = 'parent.parent.children.id',
  parent___parent___children___children = 'parent.parent.children.children',
  parent___parent___internal___content = 'parent.parent.internal.content',
  parent___parent___internal___contentDigest = 'parent.parent.internal.contentDigest',
  parent___parent___internal___description = 'parent.parent.internal.description',
  parent___parent___internal___fieldOwners = 'parent.parent.internal.fieldOwners',
  parent___parent___internal___ignoreType = 'parent.parent.internal.ignoreType',
  parent___parent___internal___mediaType = 'parent.parent.internal.mediaType',
  parent___parent___internal___owner = 'parent.parent.internal.owner',
  parent___parent___internal___type = 'parent.parent.internal.type',
  parent___children = 'parent.children',
  parent___children___id = 'parent.children.id',
  parent___children___parent___id = 'parent.children.parent.id',
  parent___children___parent___children = 'parent.children.parent.children',
  parent___children___children = 'parent.children.children',
  parent___children___children___id = 'parent.children.children.id',
  parent___children___children___children = 'parent.children.children.children',
  parent___children___internal___content = 'parent.children.internal.content',
  parent___children___internal___contentDigest = 'parent.children.internal.contentDigest',
  parent___children___internal___description = 'parent.children.internal.description',
  parent___children___internal___fieldOwners = 'parent.children.internal.fieldOwners',
  parent___children___internal___ignoreType = 'parent.children.internal.ignoreType',
  parent___children___internal___mediaType = 'parent.children.internal.mediaType',
  parent___children___internal___owner = 'parent.children.internal.owner',
  parent___children___internal___type = 'parent.children.internal.type',
  parent___internal___content = 'parent.internal.content',
  parent___internal___contentDigest = 'parent.internal.contentDigest',
  parent___internal___description = 'parent.internal.description',
  parent___internal___fieldOwners = 'parent.internal.fieldOwners',
  parent___internal___ignoreType = 'parent.internal.ignoreType',
  parent___internal___mediaType = 'parent.internal.mediaType',
  parent___internal___owner = 'parent.internal.owner',
  parent___internal___type = 'parent.internal.type',
  children = 'children',
  children___id = 'children.id',
  children___parent___id = 'children.parent.id',
  children___parent___parent___id = 'children.parent.parent.id',
  children___parent___parent___children = 'children.parent.parent.children',
  children___parent___children = 'children.parent.children',
  children___parent___children___id = 'children.parent.children.id',
  children___parent___children___children = 'children.parent.children.children',
  children___parent___internal___content = 'children.parent.internal.content',
  children___parent___internal___contentDigest = 'children.parent.internal.contentDigest',
  children___parent___internal___description = 'children.parent.internal.description',
  children___parent___internal___fieldOwners = 'children.parent.internal.fieldOwners',
  children___parent___internal___ignoreType = 'children.parent.internal.ignoreType',
  children___parent___internal___mediaType = 'children.parent.internal.mediaType',
  children___parent___internal___owner = 'children.parent.internal.owner',
  children___parent___internal___type = 'children.parent.internal.type',
  children___children = 'children.children',
  children___children___id = 'children.children.id',
  children___children___parent___id = 'children.children.parent.id',
  children___children___parent___children = 'children.children.parent.children',
  children___children___children = 'children.children.children',
  children___children___children___id = 'children.children.children.id',
  children___children___children___children = 'children.children.children.children',
  children___children___internal___content = 'children.children.internal.content',
  children___children___internal___contentDigest = 'children.children.internal.contentDigest',
  children___children___internal___description = 'children.children.internal.description',
  children___children___internal___fieldOwners = 'children.children.internal.fieldOwners',
  children___children___internal___ignoreType = 'children.children.internal.ignoreType',
  children___children___internal___mediaType = 'children.children.internal.mediaType',
  children___children___internal___owner = 'children.children.internal.owner',
  children___children___internal___type = 'children.children.internal.type',
  children___internal___content = 'children.internal.content',
  children___internal___contentDigest = 'children.internal.contentDigest',
  children___internal___description = 'children.internal.description',
  children___internal___fieldOwners = 'children.internal.fieldOwners',
  children___internal___ignoreType = 'children.internal.ignoreType',
  children___internal___mediaType = 'children.internal.mediaType',
  children___internal___owner = 'children.internal.owner',
  children___internal___type = 'children.internal.type',
  internal___content = 'internal.content',
  internal___contentDigest = 'internal.contentDigest',
  internal___description = 'internal.description',
  internal___fieldOwners = 'internal.fieldOwners',
  internal___ignoreType = 'internal.ignoreType',
  internal___mediaType = 'internal.mediaType',
  internal___owner = 'internal.owner',
  internal___type = 'internal.type',
  isCreatedByStatefulCreatePages = 'isCreatedByStatefulCreatePages',
  context___id = 'context.id',
  context___previous = 'context.previous',
  context___next = 'context.next',
  pluginCreator___id = 'pluginCreator.id',
  pluginCreator___parent___id = 'pluginCreator.parent.id',
  pluginCreator___parent___parent___id = 'pluginCreator.parent.parent.id',
  pluginCreator___parent___parent___children = 'pluginCreator.parent.parent.children',
  pluginCreator___parent___children = 'pluginCreator.parent.children',
  pluginCreator___parent___children___id = 'pluginCreator.parent.children.id',
  pluginCreator___parent___children___children = 'pluginCreator.parent.children.children',
  pluginCreator___parent___internal___content = 'pluginCreator.parent.internal.content',
  pluginCreator___parent___internal___contentDigest = 'pluginCreator.parent.internal.contentDigest',
  pluginCreator___parent___internal___description = 'pluginCreator.parent.internal.description',
  pluginCreator___parent___internal___fieldOwners = 'pluginCreator.parent.internal.fieldOwners',
  pluginCreator___parent___internal___ignoreType = 'pluginCreator.parent.internal.ignoreType',
  pluginCreator___parent___internal___mediaType = 'pluginCreator.parent.internal.mediaType',
  pluginCreator___parent___internal___owner = 'pluginCreator.parent.internal.owner',
  pluginCreator___parent___internal___type = 'pluginCreator.parent.internal.type',
  pluginCreator___children = 'pluginCreator.children',
  pluginCreator___children___id = 'pluginCreator.children.id',
  pluginCreator___children___parent___id = 'pluginCreator.children.parent.id',
  pluginCreator___children___parent___children = 'pluginCreator.children.parent.children',
  pluginCreator___children___children = 'pluginCreator.children.children',
  pluginCreator___children___children___id = 'pluginCreator.children.children.id',
  pluginCreator___children___children___children = 'pluginCreator.children.children.children',
  pluginCreator___children___internal___content = 'pluginCreator.children.internal.content',
  pluginCreator___children___internal___contentDigest = 'pluginCreator.children.internal.contentDigest',
  pluginCreator___children___internal___description = 'pluginCreator.children.internal.description',
  pluginCreator___children___internal___fieldOwners = 'pluginCreator.children.internal.fieldOwners',
  pluginCreator___children___internal___ignoreType = 'pluginCreator.children.internal.ignoreType',
  pluginCreator___children___internal___mediaType = 'pluginCreator.children.internal.mediaType',
  pluginCreator___children___internal___owner = 'pluginCreator.children.internal.owner',
  pluginCreator___children___internal___type = 'pluginCreator.children.internal.type',
  pluginCreator___internal___content = 'pluginCreator.internal.content',
  pluginCreator___internal___contentDigest = 'pluginCreator.internal.contentDigest',
  pluginCreator___internal___description = 'pluginCreator.internal.description',
  pluginCreator___internal___fieldOwners = 'pluginCreator.internal.fieldOwners',
  pluginCreator___internal___ignoreType = 'pluginCreator.internal.ignoreType',
  pluginCreator___internal___mediaType = 'pluginCreator.internal.mediaType',
  pluginCreator___internal___owner = 'pluginCreator.internal.owner',
  pluginCreator___internal___type = 'pluginCreator.internal.type',
  pluginCreator___resolve = 'pluginCreator.resolve',
  pluginCreator___name = 'pluginCreator.name',
  pluginCreator___version = 'pluginCreator.version',
  pluginCreator___pluginOptions___alias____lib = 'pluginCreator.pluginOptions.alias._lib',
  pluginCreator___pluginOptions___alias____docs = 'pluginCreator.pluginOptions.alias._docs',
  pluginCreator___pluginOptions___alias____design = 'pluginCreator.pluginOptions.alias._design',
  pluginCreator___pluginOptions___extensions = 'pluginCreator.pluginOptions.extensions',
  pluginCreator___pluginOptions___outputPath = 'pluginCreator.pluginOptions.outputPath',
  pluginCreator___pluginOptions___emitSchema___src___generated___gatsby_introspection_json = 'pluginCreator.pluginOptions.emitSchema.src___generated___gatsby_introspection_json',
  pluginCreator___pluginOptions___emitSchema___src___generated___gatsby_schema_graphql = 'pluginCreator.pluginOptions.emitSchema.src___generated___gatsby_schema_graphql',
  pluginCreator___pluginOptions___emitPluginDocuments___src___generated___gatsby_plugin_documents_graphql = 'pluginCreator.pluginOptions.emitPluginDocuments.src___generated___gatsby_plugin_documents_graphql',
  pluginCreator___pluginOptions___name = 'pluginCreator.pluginOptions.name',
  pluginCreator___pluginOptions___short_name = 'pluginCreator.pluginOptions.short_name',
  pluginCreator___pluginOptions___description = 'pluginCreator.pluginOptions.description',
  pluginCreator___pluginOptions___homepage_url = 'pluginCreator.pluginOptions.homepage_url',
  pluginCreator___pluginOptions___start_url = 'pluginCreator.pluginOptions.start_url',
  pluginCreator___pluginOptions___background_color = 'pluginCreator.pluginOptions.background_color',
  pluginCreator___pluginOptions___theme_color = 'pluginCreator.pluginOptions.theme_color',
  pluginCreator___pluginOptions___display = 'pluginCreator.pluginOptions.display',
  pluginCreator___pluginOptions___icons = 'pluginCreator.pluginOptions.icons',
  pluginCreator___pluginOptions___icons___src = 'pluginCreator.pluginOptions.icons.src',
  pluginCreator___pluginOptions___icons___sizes = 'pluginCreator.pluginOptions.icons.sizes',
  pluginCreator___pluginOptions___icons___type = 'pluginCreator.pluginOptions.icons.type',
  pluginCreator___pluginOptions___cache_busting_mode = 'pluginCreator.pluginOptions.cache_busting_mode',
  pluginCreator___pluginOptions___include_favicon = 'pluginCreator.pluginOptions.include_favicon',
  pluginCreator___pluginOptions___legacy = 'pluginCreator.pluginOptions.legacy',
  pluginCreator___pluginOptions___theme_color_in_head = 'pluginCreator.pluginOptions.theme_color_in_head',
  pluginCreator___pluginOptions___path = 'pluginCreator.pluginOptions.path',
  pluginCreator___pluginOptions___typeName = 'pluginCreator.pluginOptions.typeName',
  pluginCreator___pluginOptions___fieldName = 'pluginCreator.pluginOptions.fieldName',
  pluginCreator___pluginOptions___url = 'pluginCreator.pluginOptions.url',
  pluginCreator___pluginOptions___headers___Authorization = 'pluginCreator.pluginOptions.headers.Authorization',
  pluginCreator___pluginOptions___pathCheck = 'pluginCreator.pluginOptions.pathCheck',
  pluginCreator___nodeAPIs = 'pluginCreator.nodeAPIs',
  pluginCreator___browserAPIs = 'pluginCreator.browserAPIs',
  pluginCreator___ssrAPIs = 'pluginCreator.ssrAPIs',
  pluginCreator___pluginFilepath = 'pluginCreator.pluginFilepath',
  pluginCreator___packageJson___name = 'pluginCreator.packageJson.name',
  pluginCreator___packageJson___description = 'pluginCreator.packageJson.description',
  pluginCreator___packageJson___version = 'pluginCreator.packageJson.version',
  pluginCreator___packageJson___main = 'pluginCreator.packageJson.main',
  pluginCreator___packageJson___license = 'pluginCreator.packageJson.license',
  pluginCreator___packageJson___dependencies = 'pluginCreator.packageJson.dependencies',
  pluginCreator___packageJson___dependencies___name = 'pluginCreator.packageJson.dependencies.name',
  pluginCreator___packageJson___dependencies___version = 'pluginCreator.packageJson.dependencies.version',
  pluginCreator___packageJson___devDependencies = 'pluginCreator.packageJson.devDependencies',
  pluginCreator___packageJson___devDependencies___name = 'pluginCreator.packageJson.devDependencies.name',
  pluginCreator___packageJson___devDependencies___version = 'pluginCreator.packageJson.devDependencies.version',
  pluginCreator___packageJson___peerDependencies = 'pluginCreator.packageJson.peerDependencies',
  pluginCreator___packageJson___peerDependencies___name = 'pluginCreator.packageJson.peerDependencies.name',
  pluginCreator___packageJson___peerDependencies___version = 'pluginCreator.packageJson.peerDependencies.version',
  pluginCreator___packageJson___keywords = 'pluginCreator.packageJson.keywords',
  pluginCreatorId = 'pluginCreatorId',
  componentPath = 'componentPath'
}

type SitePageFilterInput = {
  readonly path: Maybe<StringQueryOperatorInput>;
  readonly component: Maybe<StringQueryOperatorInput>;
  readonly internalComponentName: Maybe<StringQueryOperatorInput>;
  readonly componentChunkName: Maybe<StringQueryOperatorInput>;
  readonly matchPath: Maybe<StringQueryOperatorInput>;
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
  readonly isCreatedByStatefulCreatePages: Maybe<BooleanQueryOperatorInput>;
  readonly context: Maybe<SitePageContextFilterInput>;
  readonly pluginCreator: Maybe<SitePluginFilterInput>;
  readonly pluginCreatorId: Maybe<StringQueryOperatorInput>;
  readonly componentPath: Maybe<StringQueryOperatorInput>;
};

type SitePageGroupConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<SitePageEdge>;
  readonly nodes: ReadonlyArray<SitePage>;
  readonly pageInfo: PageInfo;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
};

type SitePageSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<SitePageFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

type SitePlugin = Node & {
  readonly id: Scalars['ID'];
  readonly parent: Maybe<Node>;
  readonly children: ReadonlyArray<Node>;
  readonly internal: Internal;
  readonly resolve: Maybe<Scalars['String']>;
  readonly name: Maybe<Scalars['String']>;
  readonly version: Maybe<Scalars['String']>;
  readonly pluginOptions: Maybe<SitePluginPluginOptions>;
  readonly nodeAPIs: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly browserAPIs: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly ssrAPIs: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly pluginFilepath: Maybe<Scalars['String']>;
  readonly packageJson: Maybe<SitePluginPackageJson>;
};

type SitePluginConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<SitePluginEdge>;
  readonly nodes: ReadonlyArray<SitePlugin>;
  readonly pageInfo: PageInfo;
  readonly distinct: ReadonlyArray<Scalars['String']>;
  readonly group: ReadonlyArray<SitePluginGroupConnection>;
};


type SitePluginConnection_distinctArgs = {
  field: SitePluginFieldsEnum;
};


type SitePluginConnection_groupArgs = {
  skip: Maybe<Scalars['Int']>;
  limit: Maybe<Scalars['Int']>;
  field: SitePluginFieldsEnum;
};

type SitePluginEdge = {
  readonly next: Maybe<SitePlugin>;
  readonly node: SitePlugin;
  readonly previous: Maybe<SitePlugin>;
};

enum SitePluginFieldsEnum {
  id = 'id',
  parent___id = 'parent.id',
  parent___parent___id = 'parent.parent.id',
  parent___parent___parent___id = 'parent.parent.parent.id',
  parent___parent___parent___children = 'parent.parent.parent.children',
  parent___parent___children = 'parent.parent.children',
  parent___parent___children___id = 'parent.parent.children.id',
  parent___parent___children___children = 'parent.parent.children.children',
  parent___parent___internal___content = 'parent.parent.internal.content',
  parent___parent___internal___contentDigest = 'parent.parent.internal.contentDigest',
  parent___parent___internal___description = 'parent.parent.internal.description',
  parent___parent___internal___fieldOwners = 'parent.parent.internal.fieldOwners',
  parent___parent___internal___ignoreType = 'parent.parent.internal.ignoreType',
  parent___parent___internal___mediaType = 'parent.parent.internal.mediaType',
  parent___parent___internal___owner = 'parent.parent.internal.owner',
  parent___parent___internal___type = 'parent.parent.internal.type',
  parent___children = 'parent.children',
  parent___children___id = 'parent.children.id',
  parent___children___parent___id = 'parent.children.parent.id',
  parent___children___parent___children = 'parent.children.parent.children',
  parent___children___children = 'parent.children.children',
  parent___children___children___id = 'parent.children.children.id',
  parent___children___children___children = 'parent.children.children.children',
  parent___children___internal___content = 'parent.children.internal.content',
  parent___children___internal___contentDigest = 'parent.children.internal.contentDigest',
  parent___children___internal___description = 'parent.children.internal.description',
  parent___children___internal___fieldOwners = 'parent.children.internal.fieldOwners',
  parent___children___internal___ignoreType = 'parent.children.internal.ignoreType',
  parent___children___internal___mediaType = 'parent.children.internal.mediaType',
  parent___children___internal___owner = 'parent.children.internal.owner',
  parent___children___internal___type = 'parent.children.internal.type',
  parent___internal___content = 'parent.internal.content',
  parent___internal___contentDigest = 'parent.internal.contentDigest',
  parent___internal___description = 'parent.internal.description',
  parent___internal___fieldOwners = 'parent.internal.fieldOwners',
  parent___internal___ignoreType = 'parent.internal.ignoreType',
  parent___internal___mediaType = 'parent.internal.mediaType',
  parent___internal___owner = 'parent.internal.owner',
  parent___internal___type = 'parent.internal.type',
  children = 'children',
  children___id = 'children.id',
  children___parent___id = 'children.parent.id',
  children___parent___parent___id = 'children.parent.parent.id',
  children___parent___parent___children = 'children.parent.parent.children',
  children___parent___children = 'children.parent.children',
  children___parent___children___id = 'children.parent.children.id',
  children___parent___children___children = 'children.parent.children.children',
  children___parent___internal___content = 'children.parent.internal.content',
  children___parent___internal___contentDigest = 'children.parent.internal.contentDigest',
  children___parent___internal___description = 'children.parent.internal.description',
  children___parent___internal___fieldOwners = 'children.parent.internal.fieldOwners',
  children___parent___internal___ignoreType = 'children.parent.internal.ignoreType',
  children___parent___internal___mediaType = 'children.parent.internal.mediaType',
  children___parent___internal___owner = 'children.parent.internal.owner',
  children___parent___internal___type = 'children.parent.internal.type',
  children___children = 'children.children',
  children___children___id = 'children.children.id',
  children___children___parent___id = 'children.children.parent.id',
  children___children___parent___children = 'children.children.parent.children',
  children___children___children = 'children.children.children',
  children___children___children___id = 'children.children.children.id',
  children___children___children___children = 'children.children.children.children',
  children___children___internal___content = 'children.children.internal.content',
  children___children___internal___contentDigest = 'children.children.internal.contentDigest',
  children___children___internal___description = 'children.children.internal.description',
  children___children___internal___fieldOwners = 'children.children.internal.fieldOwners',
  children___children___internal___ignoreType = 'children.children.internal.ignoreType',
  children___children___internal___mediaType = 'children.children.internal.mediaType',
  children___children___internal___owner = 'children.children.internal.owner',
  children___children___internal___type = 'children.children.internal.type',
  children___internal___content = 'children.internal.content',
  children___internal___contentDigest = 'children.internal.contentDigest',
  children___internal___description = 'children.internal.description',
  children___internal___fieldOwners = 'children.internal.fieldOwners',
  children___internal___ignoreType = 'children.internal.ignoreType',
  children___internal___mediaType = 'children.internal.mediaType',
  children___internal___owner = 'children.internal.owner',
  children___internal___type = 'children.internal.type',
  internal___content = 'internal.content',
  internal___contentDigest = 'internal.contentDigest',
  internal___description = 'internal.description',
  internal___fieldOwners = 'internal.fieldOwners',
  internal___ignoreType = 'internal.ignoreType',
  internal___mediaType = 'internal.mediaType',
  internal___owner = 'internal.owner',
  internal___type = 'internal.type',
  resolve = 'resolve',
  name = 'name',
  version = 'version',
  pluginOptions___alias____lib = 'pluginOptions.alias._lib',
  pluginOptions___alias____docs = 'pluginOptions.alias._docs',
  pluginOptions___alias____design = 'pluginOptions.alias._design',
  pluginOptions___extensions = 'pluginOptions.extensions',
  pluginOptions___outputPath = 'pluginOptions.outputPath',
  pluginOptions___emitSchema___src___generated___gatsby_introspection_json = 'pluginOptions.emitSchema.src___generated___gatsby_introspection_json',
  pluginOptions___emitSchema___src___generated___gatsby_schema_graphql = 'pluginOptions.emitSchema.src___generated___gatsby_schema_graphql',
  pluginOptions___emitPluginDocuments___src___generated___gatsby_plugin_documents_graphql = 'pluginOptions.emitPluginDocuments.src___generated___gatsby_plugin_documents_graphql',
  pluginOptions___name = 'pluginOptions.name',
  pluginOptions___short_name = 'pluginOptions.short_name',
  pluginOptions___description = 'pluginOptions.description',
  pluginOptions___homepage_url = 'pluginOptions.homepage_url',
  pluginOptions___start_url = 'pluginOptions.start_url',
  pluginOptions___background_color = 'pluginOptions.background_color',
  pluginOptions___theme_color = 'pluginOptions.theme_color',
  pluginOptions___display = 'pluginOptions.display',
  pluginOptions___icons = 'pluginOptions.icons',
  pluginOptions___icons___src = 'pluginOptions.icons.src',
  pluginOptions___icons___sizes = 'pluginOptions.icons.sizes',
  pluginOptions___icons___type = 'pluginOptions.icons.type',
  pluginOptions___cache_busting_mode = 'pluginOptions.cache_busting_mode',
  pluginOptions___include_favicon = 'pluginOptions.include_favicon',
  pluginOptions___legacy = 'pluginOptions.legacy',
  pluginOptions___theme_color_in_head = 'pluginOptions.theme_color_in_head',
  pluginOptions___path = 'pluginOptions.path',
  pluginOptions___typeName = 'pluginOptions.typeName',
  pluginOptions___fieldName = 'pluginOptions.fieldName',
  pluginOptions___url = 'pluginOptions.url',
  pluginOptions___headers___Authorization = 'pluginOptions.headers.Authorization',
  pluginOptions___pathCheck = 'pluginOptions.pathCheck',
  nodeAPIs = 'nodeAPIs',
  browserAPIs = 'browserAPIs',
  ssrAPIs = 'ssrAPIs',
  pluginFilepath = 'pluginFilepath',
  packageJson___name = 'packageJson.name',
  packageJson___description = 'packageJson.description',
  packageJson___version = 'packageJson.version',
  packageJson___main = 'packageJson.main',
  packageJson___license = 'packageJson.license',
  packageJson___dependencies = 'packageJson.dependencies',
  packageJson___dependencies___name = 'packageJson.dependencies.name',
  packageJson___dependencies___version = 'packageJson.dependencies.version',
  packageJson___devDependencies = 'packageJson.devDependencies',
  packageJson___devDependencies___name = 'packageJson.devDependencies.name',
  packageJson___devDependencies___version = 'packageJson.devDependencies.version',
  packageJson___peerDependencies = 'packageJson.peerDependencies',
  packageJson___peerDependencies___name = 'packageJson.peerDependencies.name',
  packageJson___peerDependencies___version = 'packageJson.peerDependencies.version',
  packageJson___keywords = 'packageJson.keywords'
}

type SitePluginFilterInput = {
  readonly id: Maybe<StringQueryOperatorInput>;
  readonly parent: Maybe<NodeFilterInput>;
  readonly children: Maybe<NodeFilterListInput>;
  readonly internal: Maybe<InternalFilterInput>;
  readonly resolve: Maybe<StringQueryOperatorInput>;
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly version: Maybe<StringQueryOperatorInput>;
  readonly pluginOptions: Maybe<SitePluginPluginOptionsFilterInput>;
  readonly nodeAPIs: Maybe<StringQueryOperatorInput>;
  readonly browserAPIs: Maybe<StringQueryOperatorInput>;
  readonly ssrAPIs: Maybe<StringQueryOperatorInput>;
  readonly pluginFilepath: Maybe<StringQueryOperatorInput>;
  readonly packageJson: Maybe<SitePluginPackageJsonFilterInput>;
};

type SitePluginGroupConnection = {
  readonly totalCount: Scalars['Int'];
  readonly edges: ReadonlyArray<SitePluginEdge>;
  readonly nodes: ReadonlyArray<SitePlugin>;
  readonly pageInfo: PageInfo;
  readonly field: Scalars['String'];
  readonly fieldValue: Maybe<Scalars['String']>;
};

type SitePluginPackageJson = {
  readonly name: Maybe<Scalars['String']>;
  readonly description: Maybe<Scalars['String']>;
  readonly version: Maybe<Scalars['String']>;
  readonly main: Maybe<Scalars['String']>;
  readonly license: Maybe<Scalars['String']>;
  readonly dependencies: Maybe<ReadonlyArray<Maybe<SitePluginPackageJsonDependencies>>>;
  readonly devDependencies: Maybe<ReadonlyArray<Maybe<SitePluginPackageJsonDevDependencies>>>;
  readonly peerDependencies: Maybe<ReadonlyArray<Maybe<SitePluginPackageJsonPeerDependencies>>>;
  readonly keywords: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};

type SitePluginPackageJsonDependencies = {
  readonly name: Maybe<Scalars['String']>;
  readonly version: Maybe<Scalars['String']>;
};

type SitePluginPackageJsonDependenciesFilterInput = {
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly version: Maybe<StringQueryOperatorInput>;
};

type SitePluginPackageJsonDependenciesFilterListInput = {
  readonly elemMatch: Maybe<SitePluginPackageJsonDependenciesFilterInput>;
};

type SitePluginPackageJsonDevDependencies = {
  readonly name: Maybe<Scalars['String']>;
  readonly version: Maybe<Scalars['String']>;
};

type SitePluginPackageJsonDevDependenciesFilterInput = {
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly version: Maybe<StringQueryOperatorInput>;
};

type SitePluginPackageJsonDevDependenciesFilterListInput = {
  readonly elemMatch: Maybe<SitePluginPackageJsonDevDependenciesFilterInput>;
};

type SitePluginPackageJsonFilterInput = {
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly description: Maybe<StringQueryOperatorInput>;
  readonly version: Maybe<StringQueryOperatorInput>;
  readonly main: Maybe<StringQueryOperatorInput>;
  readonly license: Maybe<StringQueryOperatorInput>;
  readonly dependencies: Maybe<SitePluginPackageJsonDependenciesFilterListInput>;
  readonly devDependencies: Maybe<SitePluginPackageJsonDevDependenciesFilterListInput>;
  readonly peerDependencies: Maybe<SitePluginPackageJsonPeerDependenciesFilterListInput>;
  readonly keywords: Maybe<StringQueryOperatorInput>;
};

type SitePluginPackageJsonPeerDependencies = {
  readonly name: Maybe<Scalars['String']>;
  readonly version: Maybe<Scalars['String']>;
};

type SitePluginPackageJsonPeerDependenciesFilterInput = {
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly version: Maybe<StringQueryOperatorInput>;
};

type SitePluginPackageJsonPeerDependenciesFilterListInput = {
  readonly elemMatch: Maybe<SitePluginPackageJsonPeerDependenciesFilterInput>;
};

type SitePluginPluginOptions = {
  readonly alias: Maybe<SitePluginPluginOptionsAlias>;
  readonly extensions: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly outputPath: Maybe<Scalars['String']>;
  readonly emitSchema: Maybe<SitePluginPluginOptionsEmitSchema>;
  readonly emitPluginDocuments: Maybe<SitePluginPluginOptionsEmitPluginDocuments>;
  readonly name: Maybe<Scalars['String']>;
  readonly short_name: Maybe<Scalars['String']>;
  readonly description: Maybe<Scalars['String']>;
  readonly homepage_url: Maybe<Scalars['String']>;
  readonly start_url: Maybe<Scalars['String']>;
  readonly background_color: Maybe<Scalars['String']>;
  readonly theme_color: Maybe<Scalars['String']>;
  readonly display: Maybe<Scalars['String']>;
  readonly icons: Maybe<ReadonlyArray<Maybe<SitePluginPluginOptionsIcons>>>;
  readonly cache_busting_mode: Maybe<Scalars['String']>;
  readonly include_favicon: Maybe<Scalars['Boolean']>;
  readonly legacy: Maybe<Scalars['Boolean']>;
  readonly theme_color_in_head: Maybe<Scalars['Boolean']>;
  readonly path: Maybe<Scalars['String']>;
  readonly typeName: Maybe<Scalars['String']>;
  readonly fieldName: Maybe<Scalars['String']>;
  readonly url: Maybe<Scalars['String']>;
  readonly headers: Maybe<SitePluginPluginOptionsHeaders>;
  readonly pathCheck: Maybe<Scalars['Boolean']>;
};

type SitePluginPluginOptionsAlias = {
  readonly _lib: Maybe<Scalars['String']>;
  readonly _docs: Maybe<Scalars['String']>;
  readonly _design: Maybe<Scalars['String']>;
};

type SitePluginPluginOptionsAliasFilterInput = {
  readonly _lib: Maybe<StringQueryOperatorInput>;
  readonly _docs: Maybe<StringQueryOperatorInput>;
  readonly _design: Maybe<StringQueryOperatorInput>;
};

type SitePluginPluginOptionsEmitPluginDocuments = {
  readonly src___generated___gatsby_plugin_documents_graphql: Maybe<Scalars['Boolean']>;
};

type SitePluginPluginOptionsEmitPluginDocumentsFilterInput = {
  readonly src___generated___gatsby_plugin_documents_graphql: Maybe<BooleanQueryOperatorInput>;
};

type SitePluginPluginOptionsEmitSchema = {
  readonly src___generated___gatsby_introspection_json: Maybe<Scalars['Boolean']>;
  readonly src___generated___gatsby_schema_graphql: Maybe<Scalars['Boolean']>;
};

type SitePluginPluginOptionsEmitSchemaFilterInput = {
  readonly src___generated___gatsby_introspection_json: Maybe<BooleanQueryOperatorInput>;
  readonly src___generated___gatsby_schema_graphql: Maybe<BooleanQueryOperatorInput>;
};

type SitePluginPluginOptionsFilterInput = {
  readonly alias: Maybe<SitePluginPluginOptionsAliasFilterInput>;
  readonly extensions: Maybe<StringQueryOperatorInput>;
  readonly outputPath: Maybe<StringQueryOperatorInput>;
  readonly emitSchema: Maybe<SitePluginPluginOptionsEmitSchemaFilterInput>;
  readonly emitPluginDocuments: Maybe<SitePluginPluginOptionsEmitPluginDocumentsFilterInput>;
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly short_name: Maybe<StringQueryOperatorInput>;
  readonly description: Maybe<StringQueryOperatorInput>;
  readonly homepage_url: Maybe<StringQueryOperatorInput>;
  readonly start_url: Maybe<StringQueryOperatorInput>;
  readonly background_color: Maybe<StringQueryOperatorInput>;
  readonly theme_color: Maybe<StringQueryOperatorInput>;
  readonly display: Maybe<StringQueryOperatorInput>;
  readonly icons: Maybe<SitePluginPluginOptionsIconsFilterListInput>;
  readonly cache_busting_mode: Maybe<StringQueryOperatorInput>;
  readonly include_favicon: Maybe<BooleanQueryOperatorInput>;
  readonly legacy: Maybe<BooleanQueryOperatorInput>;
  readonly theme_color_in_head: Maybe<BooleanQueryOperatorInput>;
  readonly path: Maybe<StringQueryOperatorInput>;
  readonly typeName: Maybe<StringQueryOperatorInput>;
  readonly fieldName: Maybe<StringQueryOperatorInput>;
  readonly url: Maybe<StringQueryOperatorInput>;
  readonly headers: Maybe<SitePluginPluginOptionsHeadersFilterInput>;
  readonly pathCheck: Maybe<BooleanQueryOperatorInput>;
};

type SitePluginPluginOptionsHeaders = {
  readonly Authorization: Maybe<Scalars['String']>;
};

type SitePluginPluginOptionsHeadersFilterInput = {
  readonly Authorization: Maybe<StringQueryOperatorInput>;
};

type SitePluginPluginOptionsIcons = {
  readonly src: Maybe<Scalars['String']>;
  readonly sizes: Maybe<Scalars['String']>;
  readonly type: Maybe<Scalars['String']>;
};

type SitePluginPluginOptionsIconsFilterInput = {
  readonly src: Maybe<StringQueryOperatorInput>;
  readonly sizes: Maybe<StringQueryOperatorInput>;
  readonly type: Maybe<StringQueryOperatorInput>;
};

type SitePluginPluginOptionsIconsFilterListInput = {
  readonly elemMatch: Maybe<SitePluginPluginOptionsIconsFilterInput>;
};

type SitePluginSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<SitePluginFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

type SiteSiteMetadata = {
  readonly title: Maybe<Scalars['String']>;
  readonly headerTitle: Maybe<Scalars['String']>;
  readonly version: Maybe<Scalars['String']>;
  readonly description: Maybe<Scalars['String']>;
  readonly author: Maybe<Scalars['String']>;
  readonly siteUrl: Maybe<Scalars['String']>;
  readonly themeColor: Maybe<Scalars['String']>;
  readonly msTileColor: Maybe<Scalars['String']>;
  readonly github: Maybe<SiteSiteMetadataGithub>;
  readonly socials: Maybe<SiteSiteMetadataSocials>;
};

type SiteSiteMetadataFilterInput = {
  readonly title: Maybe<StringQueryOperatorInput>;
  readonly headerTitle: Maybe<StringQueryOperatorInput>;
  readonly version: Maybe<StringQueryOperatorInput>;
  readonly description: Maybe<StringQueryOperatorInput>;
  readonly author: Maybe<StringQueryOperatorInput>;
  readonly siteUrl: Maybe<StringQueryOperatorInput>;
  readonly themeColor: Maybe<StringQueryOperatorInput>;
  readonly msTileColor: Maybe<StringQueryOperatorInput>;
  readonly github: Maybe<SiteSiteMetadataGithubFilterInput>;
  readonly socials: Maybe<SiteSiteMetadataSocialsFilterInput>;
};

type SiteSiteMetadataGithub = {
  readonly owner: Maybe<Scalars['String']>;
  readonly name: Maybe<Scalars['String']>;
  readonly docsRoot: Maybe<Scalars['String']>;
  readonly branch: Maybe<Scalars['String']>;
};

type SiteSiteMetadataGithubFilterInput = {
  readonly owner: Maybe<StringQueryOperatorInput>;
  readonly name: Maybe<StringQueryOperatorInput>;
  readonly docsRoot: Maybe<StringQueryOperatorInput>;
  readonly branch: Maybe<StringQueryOperatorInput>;
};

type SiteSiteMetadataSocials = {
  readonly github: Maybe<Scalars['String']>;
  readonly discord: Maybe<Scalars['String']>;
};

type SiteSiteMetadataSocialsFilterInput = {
  readonly github: Maybe<StringQueryOperatorInput>;
  readonly discord: Maybe<StringQueryOperatorInput>;
};

type SiteSortInput = {
  readonly fields: Maybe<ReadonlyArray<Maybe<SiteFieldsEnum>>>;
  readonly order: Maybe<ReadonlyArray<Maybe<SortOrderEnum>>>;
};

enum SortOrderEnum {
  ASC = 'ASC',
  DESC = 'DESC'
}

type StringQueryOperatorInput = {
  readonly eq: Maybe<Scalars['String']>;
  readonly ne: Maybe<Scalars['String']>;
  readonly in: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly nin: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly regex: Maybe<Scalars['String']>;
  readonly glob: Maybe<Scalars['String']>;
};

type BuildMetadataQueryQueryVariables = Exact<{ [key: string]: never; }>;


type BuildMetadataQueryQuery = { readonly buildMetadata: Maybe<(
    Pick<BuildMetadata, 'label' | 'icon'>
    & { readonly context: Pick<BuildMetadataContext, 'label' | 'message' | 'icon'>, readonly details: ReadonlyArray<Pick<BuildMetadataEntry, 'type' | 'label' | 'href' | 'text' | 'content'>> }
  )> };

type HeaderActionBarQueryQueryVariables = Exact<{ [key: string]: never; }>;


type HeaderActionBarQueryQuery = { readonly site: Maybe<{ readonly siteMetadata: Maybe<{ readonly socials: Maybe<Pick<SiteSiteMetadataSocials, 'github' | 'discord'>> }> }> };

type GitHubMetadataQueryQueryVariables = Exact<{ [key: string]: never; }>;


type GitHubMetadataQueryQuery = { readonly site: Maybe<{ readonly siteMetadata: Maybe<{ readonly github: Maybe<Pick<SiteSiteMetadataGithub, 'owner' | 'name' | 'docsRoot' | 'branch'>> }> }> };

type SEOQueryQueryVariables = Exact<{ [key: string]: never; }>;


type SEOQueryQuery = { readonly site: Maybe<(
    Pick<Site, 'pathPrefix'>
    & { readonly siteMetadata: Maybe<Pick<SiteSiteMetadata, 'title' | 'description' | 'author' | 'themeColor' | 'msTileColor'>> }
  )> };

type SiteTitleQueryQueryVariables = Exact<{ [key: string]: never; }>;


type SiteTitleQueryQuery = { readonly site: Maybe<{ readonly siteMetadata: Maybe<Pick<SiteSiteMetadata, 'headerTitle' | 'version'>> }> };

type DocsPageTemplateQueryQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
  next?: Maybe<Scalars['String']>;
}>;


type DocsPageTemplateQueryQuery = { readonly page: Maybe<(
    Pick<DocsPage, 'title' | 'shortTitle' | 'badge' | 'isOrphan' | 'noTOC' | 'noSequenceLinks' | 'originalPath' | 'lead'>
    & { readonly parent: Maybe<{ readonly __typename: 'File' } | (
      { readonly __typename: 'Mdx' }
      & Pick<Mdx, 'body' | 'tableOfContents'>
    ) | { readonly __typename: 'DocsPage' } | { readonly __typename: 'NavigationTree' } | { readonly __typename: 'Directory' } | { readonly __typename: 'SitePage' } | { readonly __typename: 'SitePlugin' } | { readonly __typename: 'Site' } | { readonly __typename: 'BuildMetadata' } | { readonly __typename: 'GraphQLSource' } | { readonly __typename: 'SiteBuildMetadata' }>, readonly sideNav: Pick<NavigationTree, 'id'>, readonly breadcrumb: Maybe<ReadonlyArray<Pick<BreadcrumbSegment, 'text' | 'path'>>>, readonly history: Maybe<(
      Pick<History, 'lastModified'>
      & { readonly authors: ReadonlyArray<Pick<GithubUser, 'url' | 'name' | 'login' | 'avatarUrl'>> }
    )>, readonly children: ReadonlyArray<{ readonly __typename: 'File' } | { readonly __typename: 'Mdx' } | (
      { readonly __typename: 'DocsPage' }
      & Pick<DocsPage, 'title' | 'path' | 'badge'>
    ) | { readonly __typename: 'NavigationTree' } | { readonly __typename: 'Directory' } | { readonly __typename: 'SitePage' } | { readonly __typename: 'SitePlugin' } | { readonly __typename: 'Site' } | { readonly __typename: 'BuildMetadata' } | { readonly __typename: 'GraphQLSource' } | { readonly __typename: 'SiteBuildMetadata' }> }
  )>, readonly next: Maybe<Pick<DocsPage, 'title' | 'badge' | 'path'>>, readonly previous: Maybe<Pick<DocsPage, 'title' | 'badge' | 'path'>> };

type UseNavigationQueryQueryVariables = Exact<{ [key: string]: never; }>;


type UseNavigationQueryQuery = { readonly allNavigationTree: { readonly edges: ReadonlyArray<{ readonly node: Pick<NavigationTree, 'id' | 'root'> }> } };

type PagesQueryQueryVariables = Exact<{ [key: string]: never; }>;


type PagesQueryQuery = { readonly allSitePage: { readonly nodes: ReadonlyArray<Pick<SitePage, 'path'>> } };

}