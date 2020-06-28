import React from "react";
import { PageProps, graphql } from "gatsby";
import { styled } from "linaria/react";

import Layout from "@docs/components/Layout";
import Mdx from "@docs/components/Mdx";
import Article from "@docs/components/Article";
import { collapseBreakpoint } from "@docs/layout";
import { down, gap, color, ColorMode, mode, dynamicColor } from "@design/theme";
import {
  DocsContext,
  BreadcrumbSegment,
} from "@docs/templates/Docs/frontmatter";
import { transparentize } from "polished";

const Styled = {
  Outer: styled.div`
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
  Article: styled(Article)`
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

  let content: React.ReactNode = null;
  if (edges.length === 0) {
    content = (
      <>
        <Styled.Title>Failed During Build</Styled.Title>
        <Styled.Article>
          An error ocurred while constructing this page during the build
          process. No page with ID {id}
        </Styled.Article>
      </>
    );
  } else {
    const { node } = edges[0];
    const { title, parent } = node;
    content = (
      <>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Article>
          <Mdx content={parent.body} />
        </Styled.Article>
      </>
    );
  }

  return (
    <Layout>
      <Styled.Outer>{content}</Styled.Outer>
    </Layout>
  );
};

type TableOfContentsNode = {
  url: string;
  title: string;
  items?: TableOfContentsNode[];
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
        lead: string | null;
        parent: {
          tableOfContents: {
            items: TableOfContentsNode[];
          };
          body: string;
        };
        sideNav: {
          id: string;
        };
        breadcrumb: BreadcrumbSegment[] | null;
        history: History | null;
        children: Array<{
          title: string;
          path: string;
        }>;
      };
      previous: null | {
        title: string;
        badge: string | null;
        path: string;
        lead: string | null;
      };
      next: null | {
        title: string;
        badge: string | null;
        path: string;
        lead: string | null;
      };
    }>;
  };
};

export const query = graphql`
  query DocsPageTemplateQuery($id: String = "") {
    allDocsPage(filter: { id: { eq: $id } }) {
      edges {
        node {
          title
          shortTitle
          badge
          isOrphan
          noTOC
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
