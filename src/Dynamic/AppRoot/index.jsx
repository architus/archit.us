import React, { useRef, useState, useCallback } from "react";
import classNames from "classnames";
import { useSelector, shallowEqual } from "react-redux";
import {
  splitPath,
  isNil,
  useEffectOnce,
  useLocation,
  useInitialRender,
  useCallbackOnce,
  usePool
} from "Utility";
import { navigate } from "@reach/router";

import SwipeHandler from "Components/SwipeHandler";
import GuildList from "Components/GuildList";
import SideNavbar from "Components/SideNavbar";
import AddGuildModal from "Components/AddGuildModal";
import Icon from "Components/Icon";
import AppContent from "./content";
import AppLayout from "./layout";

import "./style.scss";
import { tabs, DEFAULT_TAB } from "./tabs";
import { APP_HTML_CLASS, APP_PATH_ROOT } from "./config.json";

function AppRoot() {
  // Connect to store
  const { all: guildList, isLoaded: guildsLoaded } = usePool("guild", {
    filter: guild => guild.hasArchitus
  });

  // Nav drawer logic
  const [showAppNav, setShowAppNav] = useState(true);
  const expandClick = useCallback(() => setShowAppNav(!showAppNav), [
    showAppNav
  ]);
  const closeAppNav = useCallbackOnce(() => setShowAppNav(false));

  // Swiping/scroll logic
  const wasSwipeScroll = useRef(false);
  const swipeHandler = useRef(null);
  const swipeLeft = useCallbackOnce(() => {
    setShowAppNav(false);
  });
  const swipeRight = useCallback(() => {
    if (!wasSwipeScroll.current) setShowAppNav(true);
  }, [wasSwipeScroll]);
  const postSwipeEnd = useCallback(() => {
    wasSwipeScroll.current = false;
  }, [wasSwipeScroll]);
  const handleAppScroll = useCallback(() => {
    if (swipeHandler.current.moving) {
      wasSwipeScroll.current = true;
    }
  }, [swipeHandler, wasSwipeScroll]);

  // Guild list handling
  const guildClick = useCallbackOnce(id => {
    const fragments = splitPath(window.location.pathname);
    if (fragments.length >= 3) {
      navigate(`${APP_PATH_ROOT}/${id}/${fragments[2]}`);
    } else {
      navigate(`${APP_PATH_ROOT}/${id}/${DEFAULT_TAB}`);
    }
  });

  // Guild add modal
  const [showAddGuildModal, setShowAddGuildModal] = useState(false);
  const showModal = useCallbackOnce(() => {
    setShowAddGuildModal(true);
  });
  const hideModal = useCallbackOnce(() => {
    setShowAddGuildModal(false);
  });

  // Side navbar tabs
  const handleTabClick = useCallback(
    path => {
      const fragments = splitPath(window.location.pathname);
      let navigateTo = null;
      if (fragments.length >= 2) {
        navigateTo = `${APP_PATH_ROOT}/${fragments[1]}/${path}`;
      } else {
        if (!guildsLoaded) return;
        if (guildList.length === 0) {
          showModal();
          return;
        }
        let defaultGuild = guildList[0];
        const adminGuilds = guildList.filter(g => g.architus_admin);
        if (adminGuilds.length > 0) [defaultGuild] = adminGuilds;
        navigateTo = `${APP_PATH_ROOT}/${defaultGuild.id}/${path}`;
      }
      if (!isNil(navigateTo)) {
        navigate(navigateTo);
        if (showAppNav) closeAppNav();
      }
    },
    [guildsLoaded, guildList, closeAppNav, showModal, showAppNav]
  );

  // Root class adding/removing
  useEffectOnce(() => {
    document.documentElement.classList.add(APP_HTML_CLASS);
    return () => {
      document.documentElement.classList.remove(APP_HTML_CLASS);
    };
  });

  // App content class selection logic
  const { location } = useLocation();
  const fragments = splitPath(location.pathname);
  const currentTab = fragments.length >= 3 ? fragments[2] : "";
  const filtered = tabs.filter(t => t.path === currentTab);
  // Ensure the hydration matches the initial render
  const isInitial = useInitialRender();
  const contentClass =
    isInitial || filtered.length === 0 ? "" : filtered[0].contentClass;

  return (
    <SwipeHandler
      onSwipeLeft={swipeLeft}
      onSwipeRight={swipeRight}
      onPostSwipeEnd={postSwipeEnd}
      tolerance={50}
      ref={swipeHandler}
    >
      <AppLayout className={classNames({ show: showAppNav })}>
        <div className="app-nav">
          <div className="guild-sidebar">
            <GuildList onClickGuild={guildClick} onClickAdd={showModal} />
          </div>
          <SideNavbar onClickTab={handleTabClick} tabs={tabs} />
        </div>
        <button className="app--expand-button" onClick={expandClick}>
          <Icon className="color" name="chevron-right" />
        </button>
        <button className="app--overlay-button" onClick={closeAppNav} />
        <div className={classNames("app-content", contentClass)}>
          <AddGuildModal show={showAddGuildModal} onHide={hideModal} />
          <AppScrollContext.Provider value={handleAppScroll}>
            <React.Suspense fallback={<em>Loading...</em>}>
              <AppContent openAddGuild={showModal} />
            </React.Suspense>
          </AppScrollContext.Provider>
        </div>
      </AppLayout>
    </SwipeHandler>
  );
}

export default AppRoot;

// ? ============
// ? Context
// ? ============

export const AppScrollContext = React.createContext(() => null);
