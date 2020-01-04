import React from "react";
import { Container, Badge } from "react-bootstrap";
import { AppPageProps } from "Dynamic/AppRoot/types";

type MusicQueueProps = {} & AppPageProps;

const MusicQueue: React.FC<MusicQueueProps> = () => (
  <Container className="py-5">
    <h2>
      MusicQueue <Badge variant="primary">Coming Soon</Badge>
    </h2>
  </Container>
);

export default MusicQueue;
