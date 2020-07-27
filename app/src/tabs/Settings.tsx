import React from "react";

import { Container } from "@app/layout";
import { TabProps } from "@app/tabs/types";
import Badge from "@architus/facade/components/Badge";

const Settings: React.FC<TabProps> = () => (
  <Container className="py-5">
    <h2>
      Settings <Badge variant="primary">Coming Soon</Badge>
    </h2>
  </Container>
);

export default Settings;
