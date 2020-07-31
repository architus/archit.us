import { styled } from "linaria/react";
import path from "path";
import React, {
  useContext,
  useCallback,
  useMemo,
  useState,
  useRef,
} from "react";
import { FaChevronRight } from "react-icons/fa";

import GuildNav from "@app/components/GuildNav";
import { navigate } from "@app/components/Router";
import SwipeHandler from "@app/components/SwipeHandler";
import TabNav from "@app/components/TabNav";
import { useAppLocation } from "@app/hooks";
import { headerHeight } from "@app/layout";
import { usePool } from "@app/store/slices/pools";
import { TabDefinition } from "@app/tabs/types";
import { useCallbackOnce, usePrevious } from "@app/utility";
import { Snowflake, Guild } from "@app/utility/types";
import { color } from "@architus/facade/theme/color";
import { hiddenScrollbar } from "@architus/facade/theme/mixins";
import { splitPath } from "@architus/lib/path";
import { trimPrefix } from "@architus/lib/utility";

/**
 * Context used to expose app navigation details to downstream consumers
 */
export type AppNavigationContext = {
  ignoreDrawerScroll: () => void;
};

/**
 * Context used to expose app navigation details to downstream consumers
 */
export const AppNavigationContext = React.createContext<AppNavigationContext>({
  ignoreDrawerScroll: () => null,
});

const Styled = {
  Outer: styled.div`
    position: relative;
    height: calc(100vh - ${headerHeight});
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
  `,
  Content: styled.div`
    flex-grow: 1;
    height: calc(100vh - ${headerHeight});
    overflow: auto;
  `,
  Drawer: styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
  `,
  GuildList: styled.div`
    background-color: ${color("bg-20")};
    overflow: auto;
    ${hiddenScrollbar()}
  `,
  TabList: styled.div`
    background-color: ${color("bg-10")};
    overflow: auto;
    ${hiddenScrollbar()}
  `,
  ExpandButton: styled.button`
    position: absolute;
    bottom: 0;
  `,
  ExpandIcon: styled(FaChevronRight)``,
  Overlay: styled.button`
    position: absolute;
    bottom: 0;
  `,
};

export type AppNavigationProps = {
  onOpenAddGuildModal: () => void;
  tabs: TabDefinition[];
  prefix: string;
};

/**
 * Handles both primary and secondary navigation for the dashboard,
 * including a mobile-ready side drawer with the ability to open via swiping
 */
const AppNavigation: React.FC<AppNavigationProps> = ({
  onOpenAddGuildModal,
  children,
  prefix,
  tabs,
}) => {
  // Nav drawer logic
  const [showAppNav, setShowAppNav] = useState(true);
  const expandClick = useCallback(() => setShowAppNav(!showAppNav), [
    showAppNav,
  ]);
  const closeAppNav = useCallbackOnce(() => setShowAppNav(false));
  const { tab, guild } = useAppLocation(prefix);
  usePrevious(
    tab.orNull(),
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
  const memoizedContext = useMemo(
    () => ({ ignoreDrawerScroll: handleAppScroll }),
    [handleAppScroll]
  );

  // Navigation logic
  const { isLoaded: guildsLoaded, all: guilds } = usePool({ type: "guild" });
  const tagNavigate = useCallback(
    (t: string) => {
      navigateToTab(t, prefix, guildsLoaded, guilds);
      if (guildsLoaded && guilds.length === 0) {
        onOpenAddGuildModal();
      }
    },
    [onOpenAddGuildModal, prefix, guildsLoaded, guilds]
  );
  const guildNavigate = useCallback(
    (id: Snowflake) => {
      const defaultTab = tabs.length > 0 ? tabs[0].path : "";
      navigateToGuild(id, prefix, defaultTab);
    },
    [prefix, tabs]
  );

  return (
    <AppNavigationContext.Provider value={memoizedContext}>
      <SwipeHandler
        onSwipeLeft={swipeLeft}
        onSwipeRight={swipeRight}
        onPostSwipeEnd={postSwipeEnd}
        tolerance={50}
        ref={swipeHandler}
      >
        <Styled.Outer>
          <Styled.Drawer>
            <Styled.GuildList>
              <GuildNav
                loaded={guildsLoaded}
                guilds={guilds}
                currentGuild={guild}
                onClickGuild={guildNavigate}
                onClickAdd={onOpenAddGuildModal}
                backgroundColor={color("bg-20")}
              />
            </Styled.GuildList>
            <Styled.TabList>
              <TabNav onClickTab={tagNavigate} tabs={tabs} currentTab={tab} />
            </Styled.TabList>
          </Styled.Drawer>
          <Styled.ExpandButton onClick={expandClick}>
            <Styled.ExpandIcon />
          </Styled.ExpandButton>
          <Styled.Overlay onClick={closeAppNav} />
          <Styled.Content>{children}</Styled.Content>
        </Styled.Outer>
      </SwipeHandler>
    </AppNavigationContext.Provider>
  );
};

export default AppNavigation;

// ? =================
// ? Utility functions
// ? =================

/**
 * Gets context used to expose app navigation details to downstream consumers
 */
export function useAppNavigationContext(): AppNavigationContext {
  return useContext(AppNavigationContext);
}

/**
 * Gets the fragments of the current location
 */
export function getFragments(prefix: string): string[] {
  return splitPath(trimPrefix(window.location.pathname, prefix)).filter(
    (fragment) => fragment.trim().length > 0
  );
}

/**
 * Navigates to the given guild, using the standard app-tab path model
 * @param id - Id of the guild to navigate to
 */
export function navigateToGuild(
  id: Snowflake,
  prefix: string,
  defaultTab: string
): void {
  const fragments = getFragments(prefix);
  if (fragments.length >= 2) {
    navigate(`${prefix}/${id}/${fragments[1]}`);
  } else {
    navigate(`${prefix}/${id}/${defaultTab}`);
  }
}

/**
 * Navigates to the given tab, using the standard app-tab path model
 * @param tab - Path of the tab to navigate to
 */
export function navigateToTab(
  tab: string,
  prefix: string,
  guildsLoaded: boolean,
  guilds: Guild[]
): void {
  const fragments = getFragments(prefix);
  if (fragments.length >= 1) {
    navigate(`${prefix}/${fragments[0]}/${tab}`);
  } else if (guildsLoaded && guilds.length > 0) {
    let defaultGuild = guilds[0];
    const adminGuilds = guilds.filter((g) => g.architus_admin);
    if (adminGuilds.length > 0) [defaultGuild] = adminGuilds;
    navigate(`${prefix}/${defaultGuild.id}/${path}`);
  }
}
