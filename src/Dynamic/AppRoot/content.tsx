import React from "react";
import { useSessionStatus } from "Store/slices/session";
import Login from "Pages/Login";
import { Redirect, Router, PageProps } from "Components/Router";
import {
  withClientSide,
  useLocation,
  splitPath,
  attach,
  useInitialRender,
  isNil,
  useMemoOnce,
  isDefined,
  error
} from "Utility";
import { Snowflake, isSnowflake, Guild } from "Utility/types";
import { Option } from "Utility/option";
import classNames from "classnames";
import { usePool, usePoolEntity } from "Store/slices/pools";
import { APP_PATH_ROOT } from "Dynamic/AppRoot/config.json";
import { DEFAULT_TAB, tabs, tabPaths, TabPath } from "Dynamic/AppRoot/tabs";
import { NavigationContext } from "Dynamic/AppRoot/context";
import ErrorBoundary from "Components/ErrorBoundary";
import Placeholder from "Components/Placeholder";
import Begin from "Dynamic/Begin";

interface AppLocation {
  currentTab: TabPath | null;
  currentGuild: Snowflake | null;
}

function isValidTab(tab: string): tab is TabPath {
  return tabPaths.includes(tab as TabPath);
}

const hasArchitusFilter = (guild: Guild): boolean => guild.has_architus;

export function useAppLocation(): AppLocation {
  const { all: guildList } = usePool("guilds", {
    filter: hasArchitusFilter
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
    const isInitial = useInitialRender();

    // Load guild from store
    const { entity: guildOption } = usePoolEntity("guilds", {
      filter: g => isDefined(currentGuild) && g.id === currentGuild
    });

    // Render app placeholder on server/first render
    if (isInitial) return <AppPlaceholder />;
    // Render restricted view if not logged in
    if (!isSigningIn) return <Login fromRestricted={true} />;
    // Render placeholder screen if loading
    if (!isSignedIn) return <AppPlaceholder />;

    return (
      <NavigationContext.Provider value={navigationCtx}>
        <Router>
          <Redirect
            from=":guildId"
            to={`${APP_PATH_ROOT}/:guildId/${DEFAULT_TAB}`}
            noThrow
          />
          <Begin path="/" />
          <PageRenderer
            default
            guildOption={guildOption}
            tabOption={Option.from(currentTab)}
          />
        </Router>
      </NavigationContext.Provider>
    );
  }
);

type PageRendererProps = {
  tabOption: Option<TabPath>;
  guildOption: Option<Guild>;
} & PageProps;

const PageRenderer: React.FC<PageRendererProps> = React.memo(
  ({ tabOption, guildOption }) => {
    return Option.merge(tabOption, guildOption)
      .map(([tab, guild]) => {
        const Component = tabs[tab].component;
        return (
          // eslint-disable-next-line react/jsx-key
          <ErrorBoundary onError={(e: Error): void => error(e)}>
            <Component guild={guild} />
          </ErrorBoundary>
        );
      })
      .getOrElse(<AppPlaceholder />);
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

type AppPlaceholderProps = {};

const AppPlaceholder: React.FC<AppPlaceholderProps> = () => (
  <div className="settings">
    <Placeholder.Auto
      block
      width={170}
      height={40}
      style={{ marginBottom: "1rem" }}
    />
    <Placeholder.Auto block width={300} height={20} />
  </div>
);

export default attach(AppContent, { Wrapper, Placeholder: AppPlaceholder });
