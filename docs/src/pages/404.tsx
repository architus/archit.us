import React from "react";
import { styled } from "linaria/react";

import Layout from "@docs/components/layout";
import SEO from "@docs/components/seo";

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

const NotFoundPage = () => (
  <Layout>
    <Container color="#333">
      <Title>Hello world</Title>
    </Container>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
