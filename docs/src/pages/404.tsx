import React from "react";
import { styled } from "linaria/react";

import Layout from "@docs/components/Layout";
import { gap, down, color } from "@design/theme";
import { collapseBreakpoint, sitePadding } from "@docs/layout";
import Article from "@design/components/Article";

const Styled = {
  Outer: styled.div`
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
};

const NotFoundPage: React.FC = () => (
  <Layout title="Not found">
    <Styled.Outer>
      <Styled.Title>Page Not Found</Styled.Title>
      <Article>
        Sorry, we can’t find that page. It might be an old link or maybe it
        moved.
      </Article>
    </Styled.Outer>
  </Layout>
);

export default NotFoundPage;
