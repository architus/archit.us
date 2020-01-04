import React from "react";
import { Container, Badge } from "react-bootstrap";
import { AppPageProps } from "Dynamic/AppRoot/types";

type StatisticsProps = {} & AppPageProps;

const Statistics: React.FC<StatisticsProps> = () => (
  <Container className="py-5">
    <h2>
      Statistics <Badge variant="primary">Coming Soon</Badge>
    </h2>
  </Container>
);

export default Statistics;
