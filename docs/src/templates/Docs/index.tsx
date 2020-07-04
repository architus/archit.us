import React from "react";
import { PageProps, graphql } from "gatsby";
import { styled } from "linaria/react";
import { css, cx } from "linaria";
import { transparentize } from "polished";

import Layout from "@docs/components/Layout";
import Mdx from "@docs/components/Mdx";
import Article from "@design/components/Article";
import Breadcrumb from "@docs/components/Breadcrumb";
import PageMetadata from "@docs/components/PageMetadata";
import Overview, { OverviewContext } from "@docs/components/Overview";
import NavLabel from "@docs/components/NavLabel";
import TableOfContents, {
  TableOfContentsNode,
} from "@docs/components/TableOfContents";
import SequenceLinks, {
  SequenceLinkData,
} from "@docs/components/SequenceLinks";
import { CollapseContent } from "@docs/components/Collapse";
import { History } from "@docs/build/github-types";
import {
  collapseBreakpoint,
  minimizeBreakpoint,
  sitePadding,
  contentWidth,
} from "@docs/layout";
import { down, gap, color, ColorMode, mode, dynamicColor } from "@design/theme";
import { isDefined, isNil } from "@lib/utility";
import { MutableArray } from "@lib/types";
import "@docs/one-universal";
import {
  DocsContext,
  BreadcrumbSegment,
} from "@docs/templates/Docs/frontmatter";

// ? Note: this is done because Breadcrumb can't be styled
// ?       due to a bug in gatsby-plugin-linaria
// ? See https://github.com/cometkim/gatsby-plugin-linaria/issues/19
const breadcrumbClass = css`
  margin-bottom: ${gap.flow};
`;

const pageMetadataClass = css`
  margin-top: calc(${gap.flow} - 0.4rem);
`;

const StyledArticle = styled(Article)`
  & > p:first-of-type {
    --lead-color: ${color("primary-30")};

    ${mode(ColorMode.Dark)} {
      --lead-color: ${color("primary+30")};
    }

    ${mode(ColorMode.Light)} {
      --link-color: ${color("primary-10")};
      --link-color-fade: ${transparentize(
        0.6,
        dynamicColor("primary-10", ColorMode.Light)
      )};
    }

    font-size: 20px;
    line-height: 28px;
    font-weight: 300;
    color: var(--lead-color);
    margin-bottom: 2rem;
    opacity: 0.95;
  }

  ${CollapseContent} .gatsby-highlight {
    margin-top: calc(${gap.flow} * -0.5);
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
`;

const TableOfContentsWrapper = styled.aside``;
const StyledTableOfContents = styled(TableOfContents)`
  position: sticky !important;
  top: 5.5rem;
  padding-left: 2.65em;
  padding-top: 0.35em !important;
  z-index: 10;
  max-height: calc(100vh - 11.5rem);
`;

const contentWithToc = css`
  display: flex;
  flex-direction: row;

  ${StyledArticle} {
    max-width: 49rem;
    min-width: 0;
  }
`;

const Styled = {
  Outer: styled.div`
    max-width: ${contentWidth};
    margin: 0 auto;

    padding-top: 3rem;
    padding-bottom: 4rem;
    padding-left: ${gap.nano};
    padding-right: ${sitePadding};
    ${down(collapseBreakpoint)} {
      padding-left: ${sitePadding};
    }
  `,
  Title: styled.h1`
    font-weight: 600;
    margin-bottom: ${gap.flow};
    font-size: 2.5rem;
    color: ${color("textStrong")};
    ${down("sm")} {
      font-size: 2.2rem;
    }
  `,
  Content: styled.div`
    ${TableOfContentsWrapper} {
      flex-grow: 1;
      ${down(minimizeBreakpoint)} {
        display: none;
      }
    }
  `,
  Article: StyledArticle,
  TableOfContentsWrapper,
  TableOfContents: StyledTableOfContents,
  SequenceWrapper: styled.div`
    margin-top: calc(2.5 * ${gap.flow});
  `,
  BottomDivider: styled.hr`
    margin-top: calc(1 * ${gap.flow});
    opacity: 0.25;
    ${mode(ColorMode.Dark)} {
      opacity: 0.1;
    }
  `,
};

/**
 * Gatsby page template for a documentation page
 */
const Docs: React.FC<PageProps<
  GatsbyTypes.DocsPageTemplateQueryQuery,
  DocsContext
>> = ({ data, pageContext }) => {
  const { id } = pageContext;
  const { page, previous, next } = data;

  if (isNil(page)) {
    const description =
      `An error ocurred while constructing this page during the build process. ` +
      `No page with ID ${id}`;
    return (
      <Layout title="Build Error" description={description}>
        <Styled.Outer>
          <Styled.Title>Failed During Build</Styled.Title>
          <Article>{description}</Article>
        </Styled.Outer>
      </Layout>
    );
  }

  const {
    title,
    shortTitle,
    badge,
    isOrphan,
    noTOC,
    noSequenceLinks,
    originalPath,
    lead,
    parent,
    sideNav,
    breadcrumb,
    history,
    children,
  } = page;
  const showOverview = isOrphan && children.length > 0;

  // Extract table of contents/body
  const { tableOfContents: rawTableOfContents, body } =
    parent?.__typename === "Mdx"
      ? parent
      : { tableOfContents: { items: [] }, body: "" };
  const tableOfContents = rawTableOfContents?.items ?? [];

  // Extract overview children
  const overviewChildren: MutableArray<OverviewContext> = [];
  children.forEach((child) => {
    if (child.__typename === "DocsPage") {
      overviewChildren.push(child);
    }
  });

  return (
    <Layout
      activeNavRoot={sideNav.id}
      title={shortTitle}
      description={lead ?? undefined}
    >
      <Styled.Outer>
        {isDefined(breadcrumb) && (
          <Breadcrumb segments={breadcrumb} className={breadcrumbClass} />
        )}
        <Styled.Title>
          {<NavLabel text={title} badge={badge} gap="nano" />}
        </Styled.Title>
        <OverviewContext.Provider value={overviewChildren}>
          <Styled.Content className={cx(!noTOC && contentWithToc)}>
            <Styled.Article>
              {!isOrphan && <Mdx content={body ?? ""} />}
              {showOverview && <Overview />}
              <Styled.SequenceWrapper>
                {!noSequenceLinks && (
                  <SequenceLinks previous={previous} next={next} />
                )}
              </Styled.SequenceWrapper>
              <Styled.BottomDivider />
              <PageMetadata
                className={pageMetadataClass}
                originalPath={originalPath}
                history={history}
              />
            </Styled.Article>
            {!noTOC && tableOfContents.length > 0 && (
              <Styled.TableOfContentsWrapper>
                <Styled.TableOfContents items={tableOfContents} />
              </Styled.TableOfContentsWrapper>
            )}
          </Styled.Content>
        </OverviewContext.Provider>
      </Styled.Outer>
    </Layout>
  );
};

type DocsData = {
  page: {
    title: string;
    shortTitle: string;
    badge: string | null;
    isOrphan: boolean;
    noTOC: boolean;
    noSequenceLinks: boolean;
    originalPath: string | null;
    lead: string | null;
    parent: null | {
      body: string;
      tableOfContents: {
        items: TableOfContentsNode[];
      };
    };
    sideNav: {
      id: string;
    };
    breadcrumb: BreadcrumbSegment[] | null;
    history: History | null;
    children: Array<{
      title: string;
      path: string;
      badge: string | null;
    }>;
  };
  previous: null | SequenceLinkData;
  next: null | SequenceLinkData;
};

export const query = graphql`
  query DocsPageTemplateQuery(
    $id: String = ""
    $previous: String = ""
    $next: String = ""
  ) {
    page: docsPage(id: { eq: $id }) {
      title
      shortTitle
      badge
      isOrphan
      noTOC
      noSequenceLinks
      originalPath
      lead(maxLength: 250)
      parent {
        ... on Mdx {
          body
          tableOfContents(maxDepth: 4)
        }
      }
      sideNav {
        id
      }
      breadcrumb {
        text
        path
      }
      history {
        lastModified
        authors {
          url
          name
          login
          avatarUrl
        }
      }
      children {
        ... on DocsPage {
          title
          path
          badge
        }
      }
    }
    next: docsPage(id: { eq: $next }) {
      title
      badge
      path
    }
    previous: docsPage(id: { eq: $previous }) {
      title
      badge
      path
    }
  }
`;

export default Docs;
