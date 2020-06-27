import React from "react";
import { PageProps } from "gatsby";
import { styled } from "linaria/react";

import Layout from "@docs/components/Layout";
import SEO from "@docs/components/seo";
import { DocsContext } from "./frontmatter";

// Write your styles in `styled` tag
const Title = styled.h1`
  font-size: 2em;
`;

const Container = styled.div`
  font-size: 1.5em;
  border: 1px solid red;

  &:hover {
    border-color: blue;
  }

  ${Title} {
    margin-bottom: 24px;
  }
`;

const Docs: React.FC<PageProps<{}, DocsContext>> = () => (
  <Layout>
    <Container color="#333">
      <Title>real route</Title>
      <h4>yep</h4>
    </Container>
    <SEO title="docs page" />
    <p>hello this is a docs page good job (smile)</p>
  </Layout>
);

export default Docs;
