import React from "react";
import { Container, Badge } from "react-bootstrap";

import { AppPageProps } from "@app/dynamic/AppRoot/types";

const MusicQueue: React.FC<AppPageProps> = () => (
  <Container className="py-5">
    <h2>
      MusicQueue <Badge variant="primary">Coming Soon</Badge>
    </h2>
  </Container>
);

export default MusicQueue;
