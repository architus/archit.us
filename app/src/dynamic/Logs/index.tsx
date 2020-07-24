import React from "react";

import { AppPageProps } from "@app/dynamic/AppRoot/types";
import { Container } from "@app/layout";
import Badge from "@architus/facade/components/Badge";

const Logs: React.FC<AppPageProps> = () => (
  <Container className="py-5">
    <h2>
      Logs <Badge variant="primary">Coming Soon</Badge>
    </h2>
  </Container>
);

export default Logs;
