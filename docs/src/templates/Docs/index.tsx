import React from "react";
import { PageProps, graphql } from "gatsby";
import { styled } from "linaria/react";
import { css, cx } from "linaria";
import { transparentize } from "polished";
import Layout from "@docs/components/Layout";
import Mdx from "@docs/components/Mdx";
import Article from "@docs/components/Article";
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
import { History } from "@docs/build/github-types";
import { collapseBreakpoint, minimizeBreakpoint } from "@docs/layout";
import { down, gap, color, ColorMode, mode, dynamicColor } from "@design/theme";
import { isDefined } from "@lib/utility";
import { DocsContext, BreadcrumbSegment } from "./frontmatter";
import "@docs/one-universal";

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
`;

const TableOfContentsWrapper = styled.aside``;
const StyledTableOfContents = styled(TableOfContents)`
  position: sticky !important;
  top: 5.5rem;
  padding-left: 2.65em;
  padding-top: 0.35em !important;
  z-index: 10;
  max-height: calc(100vh - 11rem);
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
    max-width: 1080px;
    margin: 0 auto;

    padding-top: 3rem;
    padding-bottom: 4rem;
    padding-left: ${gap.nano};
    padding-right: var(--site-padding);
    ${down(collapseBreakpoint)} {
      padding-left: var(--site-padding);
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
  SequenceLinks: styled(SequenceLinks)``,
  PageMetadata: styled(PageMetadata)``,
  BottomDivider: styled.hr`
    margin-top: calc(2.5 * ${gap.flow});
    opacity: 0.25;
    ${mode(ColorMode.Dark)} {
      opacity: 0.1;
    }
  `,
};

/**
 * Gatsby page template for a documentation page
 */
const Docs: React.FC<PageProps<DocsData, DocsContext>> = ({
  data,
  pageContext,
}) => {
  const { id } = pageContext;
  const { edges } = data.allDocsPage;

  if (edges.length === 0) {
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

  const { node, previous, next } = edges[0];
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
  } = node;
  const showOverview = isOrphan && children.length > 0;
  return (
    <Layout
      activeNavRoot={sideNav.id}
      title={shortTitle}
      description={lead ?? undefined}
    >
      <Styled.Outer>
        {isDefined(breadcrumb) && <Breadcrumb segments={breadcrumb} />}
        <Styled.Title>
          {<NavLabel text={title} badge={badge} gap="nano" />}
        </Styled.Title>
        <OverviewContext.Provider value={children}>
          <Styled.Content className={cx(!noTOC && contentWithToc)}>
            <Styled.Article>
              {!isOrphan && <Mdx content={parent?.body ?? ""} />}
              {showOverview && <Overview />}
              {!noSequenceLinks && (
                <Styled.SequenceLinks previous={previous} next={next} />
              )}
              <Styled.BottomDivider />
              <Styled.PageMetadata
                history={history}
                originalPath={originalPath}
              />
            </Styled.Article>
            {!noTOC && (parent?.tableOfContents.items ?? []).length > 0 && (
              <Styled.TableOfContentsWrapper>
                <Styled.TableOfContents
                  items={parent?.tableOfContents.items ?? []}
                />
              </Styled.TableOfContentsWrapper>
            )}
          </Styled.Content>
        </OverviewContext.Provider>
      </Styled.Outer>
    </Layout>
  );
};

type DocsData = {
  allDocsPage: {
    edges: Array<{
      node: {
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
    }>;
  };
};

export const query = graphql`
  query DocsPageTemplateQuery($id: String = "") {
    allDocsPage(filter: { id: { eq: $id } }, sort: { fields: preorder }) {
      edges {
        node {
          title
          shortTitle
          badge
          isOrphan
          noTOC
          noSequenceLinks
          originalPath
          lead
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
        next {
          title
          badge
          path
          lead
        }
        previous {
          title
          badge
          path
          lead
        }
      }
    }
  }
`;

export default Docs;
