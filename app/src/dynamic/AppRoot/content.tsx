import { Box } from "@xstyled/emotion";
import classNames from "classnames";
import React, { lazy } from "react";

import { useFragments } from "./types";
import ErrorBoundary from "@app/components/ErrorBoundary";
import { Redirect, Router, PageProps } from "@app/components/Router";
import Skeleton from "@app/components/Skeleton";
import { APP_PATH_ROOT } from "@app/dynamic/AppRoot/config";
import { NavigationContext } from "@app/dynamic/AppRoot/context";
import {
  DEFAULT_TAB,
  tabs,
  tabPaths,
  TabPath,
} from "@app/dynamic/AppRoot/tabs";
import Begin from "@app/dynamic/Begin";
import Login from "@app/pages/login";
import { usePool } from "@app/store/slices/pools";
import { useSessionStatus } from "@app/store/slices/session";
import {
  withClientSide,
  attach,
  useInitialRender,
  isNil,
  useMemoOnce,
  isDefined,
  error,
} from "@app/utility";
import { Option, Some, None } from "@architus/lib/option";
import { Snowflake, isSnowflake, Guild } from "@app/utility/types";

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

  const fragments = useFragments();
  const tabFragment = fragments.length >= 2 ? fragments[1] : "";
  const guildFragment = fragments.length >= 1 ? fragments[0] : "";

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

const LazyPageRenderer = lazy(() => import("@app/dynamic/AppRoot/lazy"));

type PageRendererProps = {
  tabOption: Option<TabPath>;
  guildOption: Option<Guild>;
} & PageProps;

const PageRenderer: React.FC<PageRendererProps> = React.memo(
  ({ tabOption, guildOption }) => {
    return Option.merge(tabOption, guildOption)
      .map(([tab, guild]) => (
        // eslint-disable-next-line react/jsx-key
        // <Suspense fallback={<AppSkeleton />}>
        //   <ErrorBoundary onError={(e: Error): void => error(e)}>
        //     <LazyPageRenderer tab={tab} guild={guild} />
        //   </ErrorBoundary>
        // </Suspense>
        null
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
      {/* <React.Suspense fallback={<em>Loading...</em>}>
        <AppContent currentTab={currentTab} currentGuild={currentGuild} />
      </React.Suspense> */}
    </div>
  );
};

type AppSkeletonProps = {};

const AppSkeleton: React.FC<AppSkeletonProps> = () => (
  <Box padding="milli">
    <Skeleton.Auto
      block
      width={170}
      height={40}
      style={{ marginBottom: "1rem" }}
    />
    <Skeleton.Auto block width={300} height={20} />
  </Box>
);

export default attach(AppContent, { Wrapper, Skeleton: AppSkeleton });
