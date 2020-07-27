import React from "react";

import { Container } from "@app/layout";
import { TabProps } from "@app/tabs/types";
import Badge from "@architus/facade/components/Badge";

const Logs: React.FC<TabProps> = () => (
  <Container className="py-5">
    <h2>
      Logs <Badge variant="primary">Coming Soon</Badge>
    </h2>
  </Container>
);

export default Logs;
