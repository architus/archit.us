import { styled } from "linaria/react";
import React from "react";

import { TabDefinition } from "@app/tabs/types";
import { useInitialRender } from "@app/utility";
import Tooltip from "@architus/facade/components/Tooltip";
import { color } from "@architus/facade/theme/color";
import { transition } from "@architus/facade/theme/motion";
import { gap } from "@architus/facade/theme/spacing";
import { Option, None, Some } from "@architus/lib/option";

const Styled = {
  Outer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    padding: ${gap.pico};
  `,
  TabButtonOuter: styled(Tooltip)`
    &:not(:last-child) {
      margin-bottom: ${gap.pico};
    }
  `,
  TabButton: styled.button`
    background-color: transparent;
    border: none;
    outline: none !important;
    padding: ${gap.nano} ${gap.pico};
    width: 80px;
    cursor: pointer;
    border-radius: 6px;

    --tab-fg: ${color("textFade")};
    color: var(--tab-fg);

    ${transition(["background-color"])}

    &:hover {
      background-color: ${color("hoverOverlay")};
    }

    &:hover,
    &:active,
    &[data-active="true"] {
      --tab-fg: ${color("text")};
    }

    &[data-active],
    &:active {
      --tab-fg: ${color("textStrong")};
      background-color: ${color("activeOverlay")};
    }

    &[data-active="true"] {
      padding-right: calc(${gap.pico} + ${gap.pico});
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  `,
  TabIcon: styled.div`
    height: auto;
    width: 80%;
    margin: 0 auto ${gap.femto};

    .str {
      stroke-width: 0.75;
      stroke-miterlimit: 10;
      fill: none;
      stroke: var(--tab-fg);
    }

    .fil {
      fill: var(--tab-fg);
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
  `,
};

export type TabNavProps = {
  tabs: TabDefinition[];
  currentTab: Option<string>;
  onClickTab: (path: string) => void;
};

const TabNav: React.FC<TabNavProps> = ({ tabs, currentTab, onClickTab }) => {
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
            >
              <Styled.TabIcon>
                <Icon />
              </Styled.TabIcon>
              <Styled.TabText>{name}</Styled.TabText>
            </Styled.TabButton>
          </Styled.TabButtonOuter>
        );
      })}
    </Styled.Outer>
  );
};

export default TabNav;
