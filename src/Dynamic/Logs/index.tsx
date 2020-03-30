import React from "react";
import { Container, Badge } from "react-bootstrap";
import { AppPageProps } from "Dynamic/AppRoot/types";

const Logs: React.FC<AppPageProps> = () => (
  <Container className="py-5">
    <h2>
      Logs <Badge variant="primary">Coming Soon</Badge>
    </h2>
  </Container>
);

export default Logs;
