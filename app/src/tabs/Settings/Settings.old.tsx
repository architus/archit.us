import { styled } from "linaria/react";
import { transparentize } from "polished";
import React, { useState } from "react";

import BoolSetting from "./BoolSetting";
import GlassCard from "@app/components/GlassCard";
import HelpTooltip from "@app/components/HelpTooltip";
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
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-auto-rows: 260px;
    grid-auto-flow: dense;
    gap: ${gap.nano};
    justify-items: stretch;
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
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(${gap.mega}, 1fr));
    grid-auto-rows: 100px;
    grid-auto-flow: dense;
    gap: ${gap.pico};
    margin: ${gap.pico} 0;
  `,
};

const Settings: React.FC<TabProps> = () => {
  return (
    <Styled.Layout>
      <Styled.Title></Styled.Title>
      <Styled.OuterContainer>
        <GlassCard>
          General
          <div className="rdg-filter-container">
            <input placeholder="test" className="rdg-filter" />
          </div>
        </GlassCard>
        <GlassCard>
          Auto Responses
          <Styled.SettingsContainer>
            <BoolSetting name="Enable Auto Responses" />
            <BoolSetting name="Allow Trigger Regexes" />
            <BoolSetting name="Allow Trigger Collisions" />
            <BoolSetting name="Restrict Remove" />
            <BoolSetting name="Expand Links" />
            <BoolSetting name="Allow Newlines" />
          </Styled.SettingsContainer>
        </GlassCard>
      </Styled.OuterContainer>
    </Styled.Layout>
  );
};

export default Settings;
