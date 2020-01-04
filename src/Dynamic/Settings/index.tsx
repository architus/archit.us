import React from "react";
import SettingsGallery from "Components/SettingsGallery";
import { AppPageProps } from "Dynamic/AppRoot/types";
import { cards } from "Components/SettingsCategory/story/example.json";
import "./style.scss";

type SettingsProps = {} & AppPageProps;

const Settings: React.FC<SettingsProps> = () => (
  <div className="settings">
    <h2>Settings</h2>
    <SettingsGallery categories={[{ cards }]} />
  </div>
);

export default Settings;
