import React from "react";
import { Link } from "gatsby";
import { styled } from "linaria/react";

import Layout from "../components/layout";
import SEO from "../components/seo";

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

// Then use the resulting component
<Container color="#333">
  <Title>Hello world</Title>
</Container>;

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Container color="#333">
      <Title>Hello world</Title>
    </Container>;
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }} />
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
);

export default IndexPage;
