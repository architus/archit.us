import { styled } from "linaria/react";
import React from "react";

import { TabDefinition } from "@app/tabs/types";
import { useInitialRender } from "@app/utility";
import Tooltip from "@architus/facade/components/Tooltip";
import { color } from "@architus/facade/theme/color";
import { transition } from "@architus/facade/theme/motion";
import { gap } from "@architus/facade/theme/spacing";
import { Option, None, Some } from "@architus/lib/option";

const tabOuterCornerRadius = "6px";
const tabInnerCornerRadius = "6px";
const tabHorizontalPadding = gap.pico;
const tabVerticalPadding = gap.nano;
const tabListPadding = gap.pico;

const cornerMixin = `
  position: absolute;
  width: calc(2 * ${tabInnerCornerRadius});
  height: calc(2 * ${tabInnerCornerRadius});
  content: " ";
  right: -${tabListPadding};
  overflow: hidden;

  &:before {
    color: var(--tab-corner-bg);
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

    --tab-bg: transparent;
    --tab-fg: ${color("textFade")};
    --tab-icon-fg: ${color("textLight")};
    --tab-corner-bg: transparent;

    ${transition(["background-color", "color"])}
    color: var(--tab-fg);
    background-color: var(--tab-bg);

    &:hover {
      --tab-bg: ${color("hoverOverlay")};
    }

    &:hover,
    &:active,
    &[data-active="true"] {
      --tab-fg: ${color("text")};
      --tab-icon-fg: ${color("text")};
    }

    &[data-active="true"],
    &:active {
      --tab-fg: ${color("textStrong")};
      --tab-icon-fg: ${color("textStrong")};
    }

    &[data-active="true"] {
      --tab-bg: ${(props): string => props.activeBackground};
      --tab-corner-bg: ${(props): string => props.activeBackground};

      border-top-right-radius: 0;
      border-bottom-right-radius: 0;

      &::after {
        position: absolute;
        content: " ";
        top: 0;
        bottom: 0;
        right: -${tabListPadding};
        width: ${tabListPadding};
        display: block;

        ${transition(["background-color"])}
        background-color: var(--tab-bg);
      }
    }
  `,
  TabIcon: styled.div`
    height: auto;
    width: 70%;
    margin: 0 auto ${gap.femto};

    .str {
      stroke-width: 0.75;
      stroke-miterlimit: 10;
      fill: none;
      stroke: var(--tab-icon-fg);
    }

    .fil {
      fill: var(--tab-icon-fg);
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
      {tabs.map(({ path, name, icon: Icon }) => {
        const isActive = activeTab.equals(Some(path));
        return (
          <Styled.TabButtonOuter tooltip={isActive ? null : name} key={path}>
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
