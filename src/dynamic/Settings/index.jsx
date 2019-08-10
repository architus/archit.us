import React from "react";

import SettingsGallery from "components/SettingsGallery";

import { cards } from "components/SettingsCategory/story/example.json";
import "./style.scss";

function Settings() {
  return (
    <div className="settings">
      <h2>Settings</h2>
      <SettingsGallery categories={[{ cards }]} />
    </div>
  );
}

export default Settings;
