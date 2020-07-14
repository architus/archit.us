import { styled } from "linaria/react";
import React from "react";

import Article from "@design/components/Article";
import AutoLink from "@design/components/AutoLink";
import { color } from "@design/theme/color";
import { down } from "@design/theme/media";
import { gap } from "@design/theme/spacing";
import Layout from "@docs/components/Layout";
import { contentWidth } from "@docs/layout";

const Styled = {
  Outer: styled.div`
    padding-top: 3rem;
    padding-bottom: 4rem;
    margin: 0 auto;
    max-width: ${contentWidth};
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
  StatusCode: styled.h4`
    font-weight: 500;
    color: ${color("textFade")};
    opacity: 0.6;
    text-transform: uppercase;
    margin-top: -1rem;
  `,
};

const NotFoundPage: React.FC = () => (
  <Layout title="Not Found">
    <Styled.Outer>
      <Styled.Title>Page Not Found</Styled.Title>
      <Article>
        <Styled.StatusCode>Status code 404</Styled.StatusCode>
        <p>
          The page you&apos;re looking for doesn&apos;t exist or was removed.
        </p>
        <p>
          If you feel this is an error, please file a new issue{" "}
          <AutoLink href="https://github.com/architus/archit.us/issues/new">
            on GitHub
          </AutoLink>
        </p>
      </Article>
    </Styled.Outer>
  </Layout>
);

export default NotFoundPage;
