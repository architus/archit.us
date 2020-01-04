import React from "react";
import { Container, Badge } from "react-bootstrap";
import { AppPageProps } from "Dynamic/AppRoot/types";

type EmojiManager = {} & AppPageProps;

const EmojiManager: React.FC<EmojiManager> = () => (
  <Container className="py-5">
    <h2>
      EmojiManager <Badge variant="primary">Coming Soon</Badge>
    </h2>
  </Container>
);

export default EmojiManager;
