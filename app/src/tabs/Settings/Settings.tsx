import { styled } from "linaria/react";
import { transparentize } from "polished";
import React, { useState } from "react";

import BoolSetting from "./BoolSetting";
import GlassCard from "@app/components/GlassCard";
import HelpTooltip from "@app/components/HelpTooltip";
import AppNavigation from "@app/components/AppNavigation"
import Switch from "@app/components/Switch";
import { appVerticalPadding, appHorizontalPadding } from "@app/layout";
import { TabProps } from "@app/tabs/types";
import { color, ColorMode, dynamicColor } from "@architus/facade/theme/color";
import { gap } from "@architus/facade/theme/spacing";

const Styled = {
  Layout: styled.div`
    padding: ${appVerticalPadding} ${appHorizontalPadding};
  `,
  Title: styled.h2`
    color: ${color("textStrong")};
    font-size: 1.9rem;
    font-weight: 300;
  `,
  OuterContainer: styled.div`
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-columns: repeat(4, minmax(400px, 1fr));
    grid-template-rows: 1fr;
    grid-auto-flow: column;
    gap: ${gap.nano};
    justify-items: start;
    align-items: start;
    margin: ${gap.nano} 0 0;

    .rdg-filter-container {
      display: flex;
      flex-direction: row;
      align-items: stretch;

      input {
        flex-grow: 1;
        outline: none;
        padding: 6px 6px 6px 10px;
        border: 1px solid;
        border-radius: 8px;
        transition: box-shadow 0.25s ease;
        box-shadow: none;
        background-color: ${color("bg")};
        color: ${color("text")};
        border-color: ${color("contrastBorder")};
        width: 100%;
        font-weight: 400;

        &::placeholder {
          color: ${color("textFade")};
        }

        &:focus {
          border-color: ${color("inputFocusBorder")};
          box-shadow: 0 0 0 0.2rem
            ${transparentize(0.7, dynamicColor("primary", ColorMode.Dark))};
        }
      }
    }

    td,
    th {
      //border: 1px solid #999;
      padding: 0.5rem;
    }
  `,
  SettingsContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-items: stretch;
    width: 100%;
    height: 100%;
    gap: ${gap.nano}; // TODO not this

  `,
};

const Settings: React.FC<TabProps> = () => {
  const onAddGuild = () => true;
  const tabs = [];
  return (
    <AppNavigation tabs={tabs} prefix="/app" onOpenAddGuildModal={onAddGuild}>
      <Styled.Layout>
        <Styled.OuterContainer>
          <Styled.SettingsContainer>
            <Styled.Title>Personal</Styled.Title>
            <GlassCard>
              <div className="rdg-filter-container">
                <input placeholder="test" className="rdg-filter" />
              </div>
            </GlassCard>
            <GlassCard>
              <div className="rdg-filter-container">
                <input placeholder="test" className="rdg-filter" />
              </div>
            </GlassCard>
            <Styled.Title>Auto Responses</Styled.Title>
            <GlassCard>
              <BoolSetting name="Enable Music" />
            </GlassCard>
          </Styled.SettingsContainer>
          <Styled.SettingsContainer>
            <Styled.Title>General</Styled.Title>
            <GlassCard>
              <BoolSetting name="Enable Auto Responses" />
              <BoolSetting name="Allow Trigger Regexes" />
            </GlassCard>
            <GlassCard>
              <BoolSetting name="Enable Auto Responses" />
              <BoolSetting name="Allow Trigger Regexes" />
            </GlassCard>
            <GlassCard>
              <BoolSetting name="Enable Auto Responses" />
              <BoolSetting name="Allow Trigger Regexes" />
            </GlassCard>
            <Styled.Title>Role Management</Styled.Title>
            <GlassCard>
              <BoolSetting name="Enable Auto Responses" />
              <BoolSetting name="Allow Trigger Regexes" />
            </GlassCard>
          </Styled.SettingsContainer>
          <Styled.SettingsContainer>
            <Styled.Title>Gulag</Styled.Title>
            <GlassCard>
              <BoolSetting name="Allow Trigger Collisions" />
            </GlassCard>
            <Styled.Title>Twitch</Styled.Title>
            <GlassCard>
              <BoolSetting name="Allow Trigger Collisions" />
            </GlassCard>
            <Styled.Title>Emoji</Styled.Title>
            <GlassCard>
              <BoolSetting name="Allow Trigger Collisions" />
            </GlassCard>
          </Styled.SettingsContainer>
          <Styled.SettingsContainer>
            <Styled.Title>Pugs</Styled.Title>
            <GlassCard>
              <BoolSetting name="Expand Links" />
              <BoolSetting name="Allow Newlines" />
            </GlassCard>
            <Styled.Title>Music</Styled.Title>
            <GlassCard>
              <BoolSetting name="Expand Links" />
              <BoolSetting name="Allow Newlines" />
            </GlassCard>
          </Styled.SettingsContainer>
        </Styled.OuterContainer>
      </Styled.Layout>
    </AppNavigation>
  );
};

export default Settings;
