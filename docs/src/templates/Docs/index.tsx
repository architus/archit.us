import React from "react";
import { PageProps, graphql } from "gatsby";
import { styled } from "linaria/react";
import { css, cx } from "linaria";
import { transparentize } from "polished";

import Layout from "@docs/components/Layout";
import Mdx from "@docs/components/Mdx";
import Article from "@design/components/Article";
import MdxArticle from "@docs/components/MdxArticle";
import Breadcrumb from "@docs/components/Breadcrumb";
import PageMetadata from "@docs/components/PageMetadata";
import Overview, { OverviewContext } from "@docs/components/Overview";
import ImageHandler from "@docs/components/ImageHandler";
import NavLabel from "@docs/components/NavLabel";
import TableOfContents from "@docs/components/TableOfContents";
import SequenceLinks from "@docs/components/SequenceLinks";
import { CollapseContent } from "@docs/components/Collapse";
import { DocsContext } from "@docs/templates/Docs/frontmatter";
import { minimizeBreakpoint, contentWidth } from "@docs/layout";
import { down, gap, color, ColorMode, mode, dynamicColor } from "@design/theme";
import { isDefined, isNil } from "@lib/utility";
import { MutableArray } from "@lib/types";
import "@docs/one-universal";

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

  ${MdxArticle} {
    max-width: 49rem;
    min-width: 0;
  }
`;

const Styled = {
  Breadcrumb: styled(Breadcrumb)`
    margin-bottom: ${gap.flow};
  `,
  PageMetadata: styled(PageMetadata)`
    margin-top: calc(${gap.flow} - 0.4rem);
  `,
  Article: styled(MdxArticle)`
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
  `,
  Outer: styled.div`
    max-width: ${contentWidth};
    margin: 0 auto;

    padding-top: 3rem;
    padding-bottom: 4rem;
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
  GatsbyTypes.DocsPageTemplateQuery,
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
        {isDefined(breadcrumb) && <Styled.Breadcrumb segments={breadcrumb} />}
        <Styled.Title>
          {<NavLabel text={title} badge={badge} gap="nano" />}
        </Styled.Title>
        <OverviewContext.Provider value={overviewChildren}>
          <Styled.Content className={cx(!noTOC && contentWithToc)}>
            <ImageHandler>
              <Styled.Article>
                {!isOrphan && <Mdx content={body ?? ""} />}
                {showOverview && <Overview />}
                <Styled.SequenceWrapper>
                  {!noSequenceLinks && (
                    <SequenceLinks previous={previous} next={next} />
                  )}
                </Styled.SequenceWrapper>
                <Styled.BottomDivider />
                <Styled.PageMetadata
                  originalPath={originalPath}
                  history={history}
                />
              </Styled.Article>
            </ImageHandler>
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

export const query = graphql`
  query DocsPageTemplate(
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
        __typename
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
        __typename
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
