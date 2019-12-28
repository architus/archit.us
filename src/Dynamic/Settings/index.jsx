import React from "react";

import SettingsGallery from "Components/SettingsGallery";

import { cards } from "Components/SettingsCategory/story/example.json";
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
