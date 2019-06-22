import React from "react";

import { Jumbotron, Container } from "react-bootstrap";
import LoginButton from "../../components/LoginButton";

function Home() {
  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h1>Aut-bot Website</h1>
          <p>
            General purpose Discord bot supporting advanced customization,
            custom emotes for non-nitro users, and custom response commands
          </p>
        </Container>
      </Jumbotron>
      <Container className="py-3">
        <h2>Getting Started</h2>
        <LoginButton />
      </Container>
    </div>
  );
}

export default Home;
