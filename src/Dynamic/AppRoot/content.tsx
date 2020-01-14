import React from "react";
import { useSessionStatus } from "Store/slices/session";
import Login from "Pages/Login";
import Begin from "Dynamic/Begin";
import { Redirect, Router } from "@reach/router";
import {
  withClientSide,
  useLocation,
  splitPath,
  attach,
  useInitialRender,
  isNil,
  useMemoOnce
} from "Utility";
import { Snowflake, isSnowflake } from "Utility/types";
import { Option } from "Utility/option";
import classNames from "classnames";
import { usePool, usePoolEntity } from "Store/slices/pools";
import { APP_PATH_ROOT } from "Dynamic/AppRoot/config.json";
import { DEFAULT_TAB, tabs, tabPaths, TabPath } from "Dynamic/AppRoot/tabs";
import { NavigationContext } from "Dynamic/AppRoot/context";

interface AppLocation {
  currentTab: TabPath | null;
  currentGuild: Snowflake | null;
}

function isValidTab(tab: string): tab is TabPath {
  return tabPaths.includes(tab as TabPath);
}

export function useAppLocation(): AppLocation {
  const { all: guildList } = usePool("guilds", {
    filter: guild => guild.has_architus
  });

  const { location } = useLocation();
  const fragments = splitPath(location.pathname);
  const tabFragment = fragments.length >= 3 ? fragments[2] : "";
  const guildFragment = fragments.length >= 2 ? fragments[1] : "";

  const currentTab: TabPath | null = isValidTab(tabFragment)
    ? tabFragment
    : null;
  const currentGuild: Snowflake | null =
    isSnowflake(guildFragment) &&
    guildList.find(guild => guild.id === guildFragment)
      ? guildFragment
      : null;

  return { currentTab, currentGuild };
}

type AppContentProps = {
  currentTab: TabPath | null;
  currentGuild: Snowflake | null;
};

const AppContent: React.ComponentType<AppContentProps> = withClientSide(
  ({ currentTab, currentGuild }: AppContentProps) => {
    const { isSigningIn, isSignedIn } = useSessionStatus();
    const navigationCtx = useMemoOnce(() => ({ defaultPath: DEFAULT_TAB }));

    // Render restricted view if not logged in
    if (!isSigningIn) return <Login fromRestricted={true} />;
    // Render beginning screen if loading
    if (!isSignedIn) return <Begin />;

    // Load guild from store
    const { entity: guild } = usePoolEntity("guilds", { id: currentGuild });

    // TODO memoize inner app content so it doesn't re-render on outer changes
    return (
      <NavigationContext.Provider value={navigationCtx}>
        <Router>
          <Redirect
            from=":guildId"
            to={`${APP_PATH_ROOT}/:guildId/${DEFAULT_TAB}`}
            noThrow
          />
          {Option.merge(Option.from(currentTab), Option.from(currentGuild))
            .map(([tab, guild]) => {
              const Component = tabs[tab].component;
              return (
                // eslint-disable-next-line react/jsx-key
                <Component guild={guild} />
              );
            })
            .getOrElse(null)}
          <Begin default />
        </Router>
      </NavigationContext.Provider>
    );
  }
);

type WrapperProps = {};

const Wrapper: React.FC<WrapperProps> = () => {
  // App content class selection logic
  const { currentTab, currentGuild } = useAppLocation();
  const isInitial = useInitialRender();
  const contentClass =
    isInitial || isNil(currentTab) ? "" : tabs[currentTab].contentClass;

  return (
    <div className={classNames("app-content", contentClass)}>
      <React.Suspense fallback={<em>Loading...</em>}>
        <AppContent currentTab={currentTab} currentGuild={currentGuild} />
      </React.Suspense>
    </div>
  );
};

export default attach(AppContent, { Wrapper });
