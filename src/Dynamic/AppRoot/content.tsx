import React, { lazy, Suspense } from "react";
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
  error,
} from "Utility";
import { Snowflake, isSnowflake, Guild } from "Utility/types";
import classNames from "classnames";
import { usePool } from "Store/slices/pools";
import { APP_PATH_ROOT } from "Dynamic/AppRoot/config.json";
import { DEFAULT_TAB, tabs, tabPaths, TabPath } from "Dynamic/AppRoot/tabs";
import { NavigationContext } from "Dynamic/AppRoot/context";
import ErrorBoundary from "Components/ErrorBoundary";
import Skeleton from "Components/Skeleton";
import Begin from "Dynamic/Begin";
import { Option, Some, None } from "Utility/option";

interface AppLocation {
  currentTab: TabPath | null;
  currentGuild: Snowflake | null;
}

function isValidTab(tab: string): tab is TabPath {
  return tabPaths.includes(tab as TabPath);
}

const hasArchitusFilter = (guild: Guild): boolean => guild.has_architus;

export function useAppLocation(): AppLocation {
  const { all: guildList } = usePool({
    type: "guild",
    filter: hasArchitusFilter,
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
    guildList.find((guild) => guild.id === guildFragment)
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
    // **Note**: even though we only want one entity, we still must retrieve
    // the entire pool since we're not able to reference by primary id
    const { all: guilds } = usePool({
      type: "guild",
      filter: (g) => isDefined(currentGuild) && g.id === currentGuild,
    });
    const guildOption = guilds.length > 0 ? Some(guilds[0]) : None;

    // Render app skeleton on server/first render
    if (isInitial) return <AppSkeleton />;
    // Render restricted view if not logged in
    if (!isSigningIn) return <Login fromRestricted={true} />;
    // Render skeleton screen if loading
    if (!isSignedIn) return <AppSkeleton />;

    return (
      <NavigationContext.Provider value={navigationCtx}>
        <Router>
          <Redirect
            path=":guildId"
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

const LazyPageRenderer = lazy(() => import("Dynamic/AppRoot/lazy"));

type PageRendererProps = {
  tabOption: Option<TabPath>;
  guildOption: Option<Guild>;
} & PageProps;

const PageRenderer: React.FC<PageRendererProps> = React.memo(
  ({ tabOption, guildOption }) => {
    return Option.merge(tabOption, guildOption)
      .map(([tab, guild]) => (
        // eslint-disable-next-line react/jsx-key
        <Suspense fallback={<AppSkeleton />}>
          <ErrorBoundary onError={(e: Error): void => error(e)}>
            <LazyPageRenderer tab={tab} guild={guild} />
          </ErrorBoundary>
        </Suspense>
      ))
      .getOrElse(<AppSkeleton />);
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

type AppSkeletonProps = {};

const AppSkeleton: React.FC<AppSkeletonProps> = () => (
  <div className="settings">
    <Skeleton.Auto
      block
      width={170}
      height={40}
      style={{ marginBottom: "1rem" }}
    />
    <Skeleton.Auto block width={300} height={20} />
  </div>
);

export default attach(AppContent, { Wrapper, Skeleton: AppSkeleton });
