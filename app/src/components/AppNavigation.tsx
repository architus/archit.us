import { styled } from "linaria/react";
import React, {
  useContext,
  useCallback,
  useMemo,
  useState,
  useRef,
} from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import GuildNav from "@app/components/GuildNav";
import { navigate } from "@app/components/Router";
import SwipeHandler from "@app/components/SwipeHandler";
import TabNav from "@app/components/TabNav";
import { useAppLocation, useLocationMatch } from "@app/hooks";
import { headerHeight, minimizeBreakpoint } from "@app/layout";
import { usePool } from "@app/store/slices/pools";
import { TabDefinition } from "@app/tabs/types";
import { useCallbackOnce, usePrevious } from "@app/utility";
import { Snowflake, Guild, isSnowflake } from "@app/utility/types";
import { color } from "@architus/facade/theme/color";
import { down, up } from "@architus/facade/theme/media";
import { hiddenScrollbar, blankButton } from "@architus/facade/theme/mixins";
import { transition } from "@architus/facade/theme/motion";
import { ZIndex } from "@architus/facade/theme/order";
import { shadow } from "@architus/facade/theme/shadow";
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

const Drawer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  z-index: ${ZIndex.Drawer};

  ${down(minimizeBreakpoint)} {
    box-shadow: ${shadow("contrast")};
    position: absolute;
    ${transition(["transform"])}
    transform: translateX(-120%);
    top: 0;
    left: 0;
    height: 100%;
  }
`;

const Overlay = styled.button`
  position: absolute;
  height: 100%;
  width: 100%;
  content: " ";
  z-index: ${ZIndex.ModalOverlay};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  cursor: default !important;
  background-color: ${color("modalOverlay")};
  outline: none !important;
  border: none;

  ${transition(["opacity"])};
  opacity: 0;
  pointer-events: none;
`;

const Styled = {
  Outer: styled.div`
    position: relative;
    height: calc(100vh - ${headerHeight});
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;

    ${down(minimizeBreakpoint)} {
      &[data-drawer-open="true"] {
        ${Overlay} {
          pointer-events: initial;
          opacity: 1;
        }

        ${Drawer} {
          transform: translateX(0);
        }
      }
    }
  `,
  Content: styled.div`
    flex-grow: 1;
    height: calc(100vh - ${headerHeight});
    overflow: auto;

    & > div {
      position: relative;
      height: 100%;
    }
  `,
  Drawer,
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
  DrawerExpander: styled.div`
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;

    ${up(minimizeBreakpoint)} {
      display: none;
    }

    ${down(minimizeBreakpoint)} {
      z-index: ${ZIndex.ModalDrawerButton};
    }
  `,
  ExpandButton: styled.button`
    --size: 48px;
    --offset: 24px;
    ${blankButton()}
    pointer-events: all;
    position: fixed;
    bottom: var(--offset);
    right: var(--offset);
    width: var(--size);
    height: var(--size);
    background-color: ${color("primary")};
    border-radius: 20rem;
    color: white;
    z-index: ${ZIndex.Modal};
    box-shadow: ${shadow("z2")};
    font-size: 1.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  Overlay,
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
  const [addGuildActive] = useLocationMatch(`${prefix}/invite`);
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
        <Styled.Outer data-drawer-open={showAppNav ? "true" : undefined}>
          <Styled.Drawer>
            <Styled.GuildList>
              <GuildNav
                loaded={guildsLoaded}
                guilds={guilds}
                currentGuild={guild}
                addActive={addGuildActive}
                onClickGuild={guildNavigate}
                onClickAdd={onOpenAddGuildModal}
                backgroundColor={color("bg-20")}
              />
            </Styled.GuildList>
            <Styled.TabList>
              <TabNav
                onClickTab={tagNavigate}
                tabs={tabs}
                currentTab={tab}
                activeBackground={color("bg")}
              />
            </Styled.TabList>
          </Styled.Drawer>
          <Styled.DrawerExpander>
            <Styled.ExpandButton onClick={expandClick}>
              {showAppNav ? <FaTimes /> : <FaBars />}
            </Styled.ExpandButton>
          </Styled.DrawerExpander>
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
    const id = fragments[0];
    if (isSnowflake(id)) {
      navigate(`${prefix}/${id}/${tab}`);
      return;
    }
  }

  if (guildsLoaded && guilds.length > 0) {
    let defaultGuild = guilds[0];
    const adminGuilds = guilds.filter((g) => g.architus_admin);
    if (adminGuilds.length > 0) [defaultGuild] = adminGuilds;
    navigate(`${prefix}/${defaultGuild.id}/${tab}`);
  }
}
