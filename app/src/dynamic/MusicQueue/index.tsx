import React from "react";

import { AppPageProps } from "@app/dynamic/AppRoot/types";
import { Container } from "@app/layout";
import Badge from "@architus/facade/components/Badge";

const MusicQueue: React.FC<AppPageProps> = () => (
  <Container className="py-5">
    <h2>
      MusicQueue <Badge variant="primary">Coming Soon</Badge>
    </h2>
  </Container>
);

export default MusicQueue;
