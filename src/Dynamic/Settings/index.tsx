import React from "react";
import SettingsGallery from "Components/SettingsGallery";
import { AppPageProps } from "Dynamic/AppRoot/types";
import { cards } from "Components/SettingsCategory/story/example.json";
import "./style.scss";

const Settings: React.FC<AppPageProps> = () => (
  <div className="settings">
    <h2>Settings</h2>
    <SettingsGallery categories={[{ cards }]} />
  </div>
);

export default Settings;
