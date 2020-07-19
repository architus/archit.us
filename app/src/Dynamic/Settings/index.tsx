import React from "react";
import { AppPageProps } from "Dynamic/AppRoot/types";
import { Container, Badge } from "react-bootstrap";
import "./style.scss";

const Settings: React.FC<AppPageProps> = () => (
  <Container className="py-5">
    <h2>
      Settings <Badge variant="primary">Coming Soon</Badge>
    </h2>
  </Container>
  // <div className="settings">
  //   <h2>Settings</h2>
  //   <SettingsGallery categories={[{ cards }]} />
  // </div>
);

export default Settings;
