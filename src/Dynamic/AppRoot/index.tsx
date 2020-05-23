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
import {
  useCallbackOnce,
  splitPath,
  isDefined,
  usePrevious,
  useRefWrapper,
} from "Utility";
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
import { APP_HTML_CLASS, APP_PATH_ROOT } from "Dynamic/AppRoot/config";
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

function getFragments(): string[] {
  const withoutPrefix = window.location.pathname.replace(APP_PATH_ROOT, "");
  return splitPath(withoutPrefix).filter(
    (fragment) => fragment.trim().length > 0
  );
}

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

  // App state dispatcher function
  // (Can only contain pure reducer cases: see note below)
  const [state, pureDispatch] = useReducer(
    (prev: AppRootState, action: AnyAction) => {
      if (showGuildAddModal.match(action)) {
        return { ...prev, showAddGuildModal: true };
      }

      if (hideGuildAddModal.match(action)) {
        return { ...prev, showAddGuildModal: false };
      }

      if (focusTab.match(action)) {
        const fragments = getFragments();
        if (fragments.length < 1) {
          const { isLoaded, guilds } = guildStore.current;
          if (!isLoaded) return prev;
          if (guilds.length === 0) {
            return { ...prev, showAddGuildModal: true };
          }
        }
      }

      return prev;
    },
    { showAddGuildModal: false }
  );

  // The following section of code wraps the above reducer in its own "reducer" wrapper
  // that also performs pure functions. This is necessary to still have the benefits of
  // a stable reducer function in passing callbacks deep down the state (namely, stability
  // and convenience), while also being able to perform side effects such as invoking
  // `navigate` that will cause state updates on other components.
  // In a recent update, React added a batching optimization to `dispatch` that invokes it
  // immediately during the render phase of this component to get the most up-to-date
  // state before rendering.
  // However, React will emit errors when this causes state updates on other components.
  // Because of this, we need separate action handlers that won't be subjected to these
  // optimization behaviors. These are handled by the inner function value of
  // `sideEffectHandlerRef`, which behaves functionally equivalent to the reducer used
  // in `useReducer`.

  // Use stable ref to the state
  const appStateRef = useRefWrapper(state);
  // Use a ref to the side effect handler (emulating dispatch, allowing the useCallback
  // result to be stable)
  type SideEffectReducer = (prev: AppRootState, action: AnyAction) => void;
  const sideEffectHandlerRef = useRef<SideEffectReducer | null>(null);
  // This is the primary dispatch function that also performs the side effect dispatch
  const dispatch: AppDispatch = useCallback(
    (action: AnyAction) => {
      pureDispatch(action);
      if (isDefined(sideEffectHandlerRef.current)) {
        sideEffectHandlerRef.current(appStateRef.current, action);
      }
    },
    [sideEffectHandlerRef, pureDispatch, appStateRef]
  );
  // Memoize the context creation so it is completely stable
  const memoizedContext = useMemo(() => ({ dispatch }), [dispatch]);

  // Set up the side effect handler with the current render function's closure available
  sideEffectHandlerRef.current = (
    prev: AppRootState,
    action: AnyAction
  ): void => {
    if (focusTab.match(action)) {
      const path = action.payload;
      let navigateTo: string | null = null;
      const fragments = getFragments();

      if (fragments.length >= 1) {
        navigateTo = `${APP_PATH_ROOT}/${fragments[0]}/${path}`;
      } else {
        const { isLoaded, guilds } = guildStore.current;
        if (!isLoaded || guilds.length === 0) return;
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
      const fragments = getFragments();
      if (fragments.length >= 2) {
        navigate(`${APP_PATH_ROOT}/${id}/${fragments[1]}`);
      } else {
        navigate(`${APP_PATH_ROOT}/${id}/${DEFAULT_TAB}`);
      }
    }
  };

  const { showAddGuildModal } = state;
  const hideModal = useCallback((): void => dispatch(hideGuildAddModal()), [
    dispatch,
  ]);

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
