import { styled } from "linaria/react";
import React from "react";

import { TabDefinition } from "@app/tabs/types";
import { useInitialRender } from "@app/utility";
import Tooltip from "@architus/facade/components/Tooltip";
import { Option, None, Some } from "@architus/lib/option";

const Styled = {
  TabButton: styled.button``,
  TabIcon: styled.div``,
  TabText: styled.p``,
  TabTopCorner: styled.span``,
  TabBottomCorner: styled.span``,
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
    <div className="side-navbar">
      {tabs.map(({ path, name, icon: Icon }) => {
        const isActive = activeTab.equals(Some(path));
        return (
          <Tooltip tooltip={isActive ? null : name} key={path}>
            <Styled.TabButton
              data-active={isActive ? "true" : undefined}
              onClick={(): void => onClickTab(path)}
            >
              <Styled.TabTopCorner />
              <Styled.TabIcon>
                <Icon />
              </Styled.TabIcon>
              <Styled.TabText>{name}</Styled.TabText>
              <Styled.TabBottomCorner />
            </Styled.TabButton>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default TabNav;
