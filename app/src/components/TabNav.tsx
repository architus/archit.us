import { styled } from "linaria/react";
import React from "react";

import { TabDefinition } from "@app/tabs/types";
import { useInitialRender } from "@app/utility";
import Tooltip from "@architus/facade/components/Tooltip";
import { color, mode, ColorMode } from "@architus/facade/theme/color";
import { transition } from "@architus/facade/theme/motion";
import { gap } from "@architus/facade/theme/spacing";
import { Option, None, Some } from "@architus/lib/option";

const tabOuterCornerRadius = "6px";
const tabOverlayCornerRadius = "5px";
const tabInnerCornerRadius = "6px";
const tabHorizontalPadding = gap.pico;
const tabVerticalPadding = "16px";
const tabListPadding = gap.pico;

const cornerMixin = `
  position: absolute;
  width: calc(2 * ${tabInnerCornerRadius});
  height: calc(2 * ${tabInnerCornerRadius});
  content: " ";
  right: -${tabListPadding};
  overflow: hidden;

  &:before {
    color: var(--tab-bg);
    position: absolute;
    box-shadow: 0 0 0 300px;
    content: "";
    padding: ${tabInnerCornerRadius};
    margin-left: -${tabInnerCornerRadius};
  }
`;

const Styled = {
  Outer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    padding: ${tabListPadding};
  `,
  TabButtonOuter: styled(Tooltip)`
    &:not(:last-child) {
      margin-bottom: ${gap.pico};
    }
  `,
  TabButton: styled.button<{ activeBackground: string }>`
    background-color: transparent;
    border: none;
    outline: none !important;
    padding: ${tabVerticalPadding} ${tabHorizontalPadding};
    width: 80px;
    cursor: pointer;
    border-radius: ${tabOuterCornerRadius};
    position: relative;
    color: ${color("textStrong")};

    --tab-bg: transparent;
    --tab-overlay-bg: transparent;
    --tab-text-opacity: 0.4;
    --tab-icon-opacity: 0.24;

    /* Change the defaults on light mode slightly to be darker */
    ${mode(ColorMode.Light)} {
      --tab-text-opacity: 0.6;
      --tab-icon-opacity: 0.4;
    }

    background-color: var(--tab-bg);

    /* Overlay background */
    &::before {
      position: absolute;
      content: " ";
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: ${tabOverlayCornerRadius};

      ${transition(["background-color"])}
      background-color: var(--tab-overlay-bg);
    }

    /* Thin strip to connect tab to right content */
    &::after {
      position: absolute;
      content: " ";
      top: 0;
      bottom: 0;
      right: -${tabListPadding};
      width: ${tabListPadding};
      display: block;
      background-color: var(--tab-bg);
    }

    &:hover {
      --tab-overlay-bg: ${color("hoverOverlay")};
    }

    &:active {
      --tab-overlay-bg: ${color("activeOverlay")};
    }

    &[data-active="true"] {
      --tab-bg: ${(props): string => props.activeBackground};
      --tab-text-opacity: 1 !important;
      --tab-icon-opacity: 0.9 !important;

      border-top-right-radius: 0;
      border-bottom-right-radius: 0;

      &::before {
        display: none;
      }
    }

    &:hover,
    &:active {
      --tab-text-opacity: 0.8 !important;
      --tab-icon-opacity: 0.7 !important;
    }
  `,
  TabIcon: styled.div`
    height: auto;
    width: 70%;
    margin: 0 auto ${gap.femto};

    ${transition(["opacity"])}
    opacity: var(--tab-icon-opacity);

    .str {
      stroke-width: 0.75;
      stroke-miterlimit: 10;
      fill: none;
      stroke: currentColor;
    }

    .fil {
      fill: currentColor;
    }

    .op4 {
      opacity: 0.4;
    }

    .op6 {
      opacity: 0.6;
    }

    .op7 {
      opacity: 0.7;
    }

    .str_rou {
      stroke-linecap: round;
    }
  `,
  TabText: styled.p`
    font-size: 0.8rem;
    line-height: 1.03;
    opacity: 0.8;
    user-select: none;

    ${transition(["opacity"])}
    opacity: var(--tab-text-opacity);
  `,
  TabTopCorner: styled.span`
    ${cornerMixin}
    top: calc(-2 * ${tabInnerCornerRadius});
    &:before {
      border-bottom-right-radius: calc(2 * ${tabInnerCornerRadius});
    }
  `,
  TabBottomCorner: styled.span`
    ${cornerMixin}
    bottom: calc(-2 * ${tabInnerCornerRadius});
    &:before {
      border-top-right-radius: calc(2 * ${tabInnerCornerRadius});
    }
  `,
};

export type TabNavProps = {
  tabs: TabDefinition[];
  currentTab: Option<string>;
  activeBackground: string;
  onClickTab: (path: string) => void;
};

const TabNav: React.FC<TabNavProps> = ({
  tabs,
  currentTab,
  activeBackground,
  onClickTab,
}) => {
  // Ensure that the initial render after hydration renders the same
  // until it re-renders
  const initialRender = useInitialRender();
  const activeTab = currentTab.flatMap((t) => (initialRender ? None : Some(t)));

  return (
    <Styled.Outer>
      {tabs.map(({ path, name, tooltip, icon: Icon }) => {
        const isActive = activeTab.equals(Some(path));
        return (
          <Styled.TabButtonOuter
            tooltip={isActive ? null : tooltip ?? name}
            key={path}
          >
            <Styled.TabButton
              data-active={isActive ? "true" : undefined}
              onClick={(): void => onClickTab(path)}
              activeBackground={activeBackground}
            >
              <Styled.TabTopCorner />
              <Styled.TabIcon>
                <Icon />
              </Styled.TabIcon>
              <Styled.TabText>{name}</Styled.TabText>
              <Styled.TabBottomCorner />
            </Styled.TabButton>
          </Styled.TabButtonOuter>
        );
      })}
    </Styled.Outer>
  );
};

export default TabNav;
