import { PageProps, graphql } from "gatsby";
import { css, cx } from "linaria";
import { styled } from "linaria/react";
import { transparentize } from "polished";
import React, { useRef } from "react";

import Article from "@architus/facade/components/Article";
import {
  color,
  mode,
  ColorMode,
  dynamicColor,
} from "@architus/facade/theme/color";
import { down } from "@architus/facade/theme/media";
import { gap } from "@architus/facade/theme/spacing";
import { MutableArray } from "@architus/lib/types";
import { isDefined, isNil } from "@architus/lib/utility";
import Breadcrumb from "@docs/components/Breadcrumb";
import ImageHandler from "@docs/components/ImageHandler";
import Layout from "@docs/components/Layout";
import Mdx from "@docs/components/Mdx";
import MdxArticle from "@docs/components/MdxArticle";
import NavLabel from "@docs/components/NavLabel";
import Overview, { OverviewContext } from "@docs/components/Overview";
import PageMetadata from "@docs/components/PageMetadata";
import SequenceLinks from "@docs/components/SequenceLinks";
import TableOfContents from "@docs/components/TableOfContents";
import {
  minimizeBreakpoint,
  contentWidth,
  contentWidthToc,
  headerHeight,
} from "@docs/layout";
import { DocsContext } from "@docs/templates/Docs/frontmatter";

import "@architus/facade/one-universal";

const contentWithToc = css`
  display: flex;
  flex-direction: row;

  ${MdxArticle} {
    max-width: ${contentWidthToc};
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
  TableOfContentsWrapper: styled.aside`
    position: sticky !important;
    top: calc(${headerHeight} + ${gap.milli} - 0.45rem);
    padding-left: 2.65em;
    padding-top: 0.35em !important;
    z-index: 10;
    max-height: calc(100vh - 11.5rem);

    flex-grow: 1;
    ${down(minimizeBreakpoint)} {
      display: none;
    }
  `,
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
  const contentRef = useRef<HTMLDivElement | null>(null);

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
    // eslint-disable-next-line no-underscore-dangle
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
          <div className={cx(!noTOC && contentWithToc)}>
            <ImageHandler forwardedRef={contentRef}>
              <Styled.Article ref={contentRef}>
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
                <TableOfContents items={tableOfContents} />
              </Styled.TableOfContentsWrapper>
            )}
          </div>
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
