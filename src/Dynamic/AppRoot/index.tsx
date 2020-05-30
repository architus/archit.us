import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useReducer,
  useContext,
  useLayoutEffect,
} from "react";
import classNames from "classnames";
import { navigate } from "@reach/router";
import { useCallbackOnce, splitPath, isDefined, usePrevious } from "Utility";
import { AnyAction } from "redux";
import SwipeHandler from "Components/SwipeHandler";
import GuildList from "Components/GuildList";
import SideNavbar from "Components/SideNavbar";
import AddGuildModal from "Components/AddGuildModal";
import Icon from "Components/Icon";
import { PageProps } from "Components/Router";
import { Snowflake, Guild } from "Utility/types";
import { ScrollContext, AppContext } from "Dynamic/AppRoot/context";
import { tabs, TabPath, DEFAULT_TAB } from "Dynamic/AppRoot/tabs";
import AppContent, { useAppLocation } from "Dynamic/AppRoot/content";
import AppLayout from "Dynamic/AppRoot/layout";
import { APP_HTML_CLASS, APP_PATH_ROOT } from "Dynamic/AppRoot/config.json";
import { AppDispatch } from "Dynamic/AppRoot/types";
import {
  focusGuild,
  showGuildAddModal,
  hideGuildAddModal,
  focusTab,
} from "Dynamic/AppRoot/actions";
import "./style.scss";
import { usePool } from "Store/slices/pools";

type DrawerWrapperProps = {
  children: React.ReactNode;
};

const DrawerWrapper: React.FC<DrawerWrapperProps> = ({ children }) => {
  // Nav drawer logic
  const [showAppNav, setShowAppNav] = useState(true);
  const expandClick = useCallback(() => setShowAppNav(!showAppNav), [
    showAppNav,
  ]);
  const closeAppNav = useCallbackOnce(() => setShowAppNav(false));
  const { currentTab } = useAppLocation();
  usePrevious(
    currentTab,
    // Close the app nav if the current tab changes
    (prev, curr) => {
      if (prev !== curr) {
        closeAppNav();
      }
    },
    [closeAppNav]
  );

  // Swiping/scroll logic
  const wasSwipeScroll = useRef(false);
  const swipeHandler = useRef<SwipeHandler>(null);
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
    if (swipeHandler.current?.moving) {
      wasSwipeScroll.current = true;
    }
  }, [swipeHandler, wasSwipeScroll]);
  const memoizedContext = useMemo(() => ({ scrollHandler: handleAppScroll }), [
    handleAppScroll,
  ]);

  // Dispatch actions
  const { dispatch } = useContext(AppContext);
  const clickGuild = useCallback((id: Snowflake) => dispatch(focusGuild(id)), [
    dispatch,
  ]);
  const clickAdd = useCallback(() => dispatch(showGuildAddModal()), [dispatch]);
  const clickTab = useCallback((tab: TabPath) => dispatch(focusTab(tab)), [
    dispatch,
  ]);

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
            <GuildList onClickGuild={clickGuild} onClickAdd={clickAdd} />
          </div>
          <SideNavbar onClickTab={clickTab} tabs={tabs} />
        </div>
        <button className="app--expand-button" onClick={expandClick}>
          <Icon className="color" name="chevron-right" />
        </button>
        <button className="app--overlay-button" onClick={closeAppNav} />
        <ScrollContext.Provider value={memoizedContext}>
          {children}
        </ScrollContext.Provider>
      </AppLayout>
    </SwipeHandler>
  );
};

interface AppRootState {
  showAddGuildModal: boolean;
}

interface LocalGuildStore {
  guilds: Guild[];
  isLoaded: boolean;
}

type AppRootProps = {} & PageProps;

const architusGuildFilter = (guild: Guild): boolean => guild.has_architus;

const AppRoot: React.FC<AppRootProps> = () => {
  // Root class adding/removing
  useLayoutEffect(() => {
    document.documentElement.classList.add(APP_HTML_CLASS);
    return (): void => {
      document.documentElement.classList.remove(APP_HTML_CLASS);
    };
  }, []);

  // Connect to store
  const guildStore = useRef<LocalGuildStore>({
    guilds: [],
    isLoaded: false,
  });
  const { all: guildList, isLoaded: guildsLoaded } = usePool({
    type: "guild",
    filter: architusGuildFilter,
  });
  guildStore.current = { guilds: guildList, isLoaded: guildsLoaded };

  // TODO wrap the dispatch function with a side-effect inducing version
  // to avoid the "optimizations" around useReducer invoking its reducer
  // function side of component renders instead of upon dispatch invocations... :)
  const [state, dispatch] = useReducer(
    (prev: AppRootState, action: AnyAction) => {
      if (showGuildAddModal.match(action)) {
        return { ...prev, showAddGuildModal: true };
      }

      if (hideGuildAddModal.match(action)) {
        return { ...prev, showAddGuildModal: false };
      }

      if (focusTab.match(action)) {
        const path = action.payload;
        const fragments = splitPath(window.location.pathname);
        let navigateTo: string | null = null;

        if (fragments.length >= 2) {
          navigateTo = `${APP_PATH_ROOT}/${fragments[1]}/${path}`;
        } else {
          const { isLoaded, guilds } = guildStore.current;
          if (!isLoaded) return prev;
          if (guilds.length === 0) {
            return { ...prev, showAddGuildModal: true };
          }

          let defaultGuild = guilds[0];
          const adminGuilds = guilds.filter((g) => g.architus_admin);
          if (adminGuilds.length > 0) [defaultGuild] = adminGuilds;
          navigateTo = `${APP_PATH_ROOT}/${defaultGuild.id}/${path}`;
        }

        if (isDefined(navigateTo)) {
          // Navigation will also cause app nav to close
          navigate(navigateTo);
        }
      }

      if (focusGuild.match(action)) {
        const id = action.payload;
        const fragments = splitPath(window.location.pathname);
        if (fragments.length >= 3) {
          navigate(`${APP_PATH_ROOT}/${id}/${fragments[2]}`);
        } else {
          navigate(`${APP_PATH_ROOT}/${id}/${DEFAULT_TAB}`);
        }
      }

      return prev;
    },
    { showAddGuildModal: false }
  );
  const { showAddGuildModal } = state;
  const hideModal = useCallback((): void => dispatch(hideGuildAddModal()), [
    dispatch,
  ]);
  const memoizedContext = useMemo(
    () => ({ dispatch: dispatch as AppDispatch }),
    [dispatch]
  );

  return (
    <AppContext.Provider value={memoizedContext}>
      <DrawerWrapper>
        <AddGuildModal show={showAddGuildModal} onHide={hideModal} />
        <AppContent.Wrapper />
      </DrawerWrapper>
    </AppContext.Provider>
  );
};

export default AppRoot;

// ? ============
// ? Context
// ? ============

export const AppScrollContext = React.createContext(() => null);
