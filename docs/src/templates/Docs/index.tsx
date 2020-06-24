import React from "react";
import { PageProps } from "gatsby";
import { styled } from "linaria/react";

import { DocsContext } from "./frontmatter";
import Layout from "../../components/layout";
import SEO from "../../components/seo";

// Write your styles in `styled` tag
const Title = styled.h1`
  font-size: 2em;
`;

const Container = styled.div`
  font-size: 1.5em;
  color: #333333;
  border: 1px solid red;

  &:hover {
    border-color: blue;
  }

  ${Title} {
    margin-bottom: 24px;
  }
`;

const Docs: React.FC<PageProps<{}, DocsContext>> = (props) => (
  <Layout>
    <Container color="#333">
      <Title>real route</Title>
      <h4></h4>
    </Container>
    <SEO title="docs page" />
    <p>hello this is a docs page good job</p>
  </Layout>
);

export default Docs;
