import React from "react";
import { Container } from "react-bootstrap";
import TokenExchange from "functional/TokenExchange";

function Home() {
  return (
    <Container className="py-5">
      <TokenExchange />
      <h2>Home</h2>
    </Container>
  );
}

export default Home;
