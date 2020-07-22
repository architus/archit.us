import classNames from "classnames";
import React, { useCallback } from "react";

import Tooltip from "@app/components/Tooltip";
import { useAppLocation } from "@app/dynamic/AppRoot/content";
import { TabPath } from "@app/dynamic/AppRoot/tabs";
import { AppTab } from "@app/dynamic/AppRoot/types";
import { useInitialRender } from "@app/utility";
import "./style.scss";

type SideNavbarProps = {
  tabs: Record<TabPath, AppTab>;
  onClickTab: (path: TabPath) => void;
};

const SideNavbar: React.FC<SideNavbarProps> = ({ tabs, onClickTab }) => {
  // Ensure that the initial render after hydration renders the same until
  // after the first render
  const initialRender = useInitialRender();
  const { currentTab } = useAppLocation();
  const activeTab: TabPath | null = initialRender ? null : currentTab;

  return (
    <div className="side-navbar">
      {Object.keys(tabs).map((key: string) => (
        <NavbarIcon
          key={key}
          onClickTab={onClickTab}
          isActive={key === activeTab}
          path={key as TabPath}
          {...tabs[key as TabPath]}
        />
      ))}
    </div>
  );
};

// ? ==============
// ? Sub-components
// ? ==============

type NavbarIconProps = {
  onClickTab: (path: TabPath) => void;
  isActive: boolean;
  path: TabPath;
} & AppTab;

const NavbarIcon: React.FC<NavbarIconProps> = ({
  name,
  path,
  icon,
  onClickTab,
  isActive,
}) => (
  <Outer name={name} isActive={isActive} path={path}>
    <button
      className={classNames("side-navbar--button", { active: isActive })}
      onClick={useCallback((): void => onClickTab(path), [onClickTab, path])}
    >
      <span className="side-navbar--top-corner" />
      <div
        className="side-navbar--icon"
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      <p>{name}</p>
      <span className="side-navbar--bottom-corner" />
    </button>
  </Outer>
);

type OuterProps = {
  children: React.ReactNode;
  isActive: boolean;
  name: string;
  path: string;
};

const Outer: React.FC<OuterProps> = ({ children, isActive, name, path }) => (
  <Tooltip text={name} hide={isActive} id={`side-navbar-${path}`}>
    {children}
  </Tooltip>
);

export default SideNavbar;
