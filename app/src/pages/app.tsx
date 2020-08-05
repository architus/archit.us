import { css } from "linaria";
import { styled } from "linaria/react";
import React, { useMemo, useCallback } from "react";

import AppHomeScreen from "@app/components/AppHomeScreen";
import AppLogin from "@app/components/AppLogin";
import AppNavigation, {
  useAppNavigationContext,
} from "@app/components/AppNavigation";
import AppSkeleton from "@app/components/AppSkeleton";
import InviteScreen from "@app/components/InviteScreen";
import Layout from "@app/components/Layout";
import { Router, Redirect, PageProps, navigate } from "@app/components/Router";
import { usePathPrefix } from "@app/data/path-prefix";
import { sitePaddingVariable } from "@app/layout";
import { useSessionStatus } from "@app/store/actions";
import { usePoolEntity } from "@app/store/slices/pools";
import tabs from "@app/tabs/definitions";
import { TabDefinition, TabProps, BaseAppProps } from "@app/tabs/types";
import { useInitialRender } from "@app/utility";
import { Snowflake } from "@app/utility/types";
import { gap } from "@architus/facade/theme/spacing";

const headerClass = css`
  /* Use exact padding amount to visually left-align logo with guild nav */
  padding-left: 4px;
`;

const Styled = {
  Layout: styled(Layout)`
    /* Correct the global site padding */
    ${sitePaddingVariable}: ${gap.nano} !important;
  `,
};

const defaultTab = tabs.length > 0 ? tabs[0].path : "";

/**
 * Root of the /app dynamic client-only routes.
 * See https://www.gatsbyjs.org/docs/client-only-routes-and-user-authentication/
 */
const AppPage: React.FC<PageProps> = () => {
  const appPrefix = `${usePathPrefix().getOrElse("")}/app`;
  const onAddGuild = useCallback(() => navigate(`${appPrefix}/invite`), [
    appPrefix,
  ]);

  // Creates individual tab renderers for each tab definition
  const tabRoutes = useMemo(
    () =>
      tabs.map((tab) => (
        <TabRenderer
          path={`:guildId/${tab.path}`}
          key={tab.path}
          tab={tab}
          showGuildAddModal={onAddGuild}
        />
      )),
    [onAddGuild]
  );

  const { isSigningIn } = useSessionStatus();
  const isInitial = useInitialRender();

  let content: React.ReactNode;
  if (isInitial) {
    // Render app skeleton on server/first render
    content = <AppSkeleton />;
  } else if (!isSigningIn) {
    // Render restricted view if not logged in
    content = <AppLogin />;
  } else {
    content = (
      <Router basepath={appPrefix}>
        {tabRoutes}
        <Redirect
          from="/:guildId"
          to={`${appPrefix}/:guildId/${defaultTab}`}
          noThrow
        />
        <PageRenderer
          path="/invite"
          page={InviteScreen}
          showGuildAddModal={onAddGuild}
        />
        <PageRenderer
          path="/"
          page={AppHomeScreen}
          showGuildAddModal={onAddGuild}
        />
        <AppSkeleton default />
      </Router>
    );
  }

  return (
    <Styled.Layout
      seo={{ noTitle: true }}
      headerProps={{ noContainer: true, className: headerClass }}
    >
      <AppNavigation
        tabs={tabs}
        prefix={appPrefix}
        onOpenAddGuildModal={onAddGuild}
      >
        {content}
      </AppNavigation>
    </Styled.Layout>
  );
};
export default AppPage;

// ? =================
// ? Utility functions
// ? =================

function useAppProps(): Pick<BaseAppProps, "ignoreDrawerScroll"> {
  const { ignoreDrawerScroll } = useAppNavigationContext();
  return { ignoreDrawerScroll };
}

// ? ==============
// ? Sub-components
// ? ==============

type TabRendererProps = {
  tab: TabDefinition;
  path: string;
  // Passed in via router URL parameters
  guildId?: string;
} & Omit<TabProps, "guild" | "ignoreDrawerScroll">;

/**
 * Renders the current tab by showing the placeholder
 * until the guild has been loaded from the pool
 */
const TabRenderer: React.FC<TabRendererProps> = ({ tab, guildId, ...rest }) => {
  const id = (guildId ?? "0") as Snowflake;
  const { component: Component, placeholder } = tab;
  const { entity: guildOption } = usePoolEntity({ type: "guild", id });
  const appProps = useAppProps();
  return guildOption.match({
    Some: (guild) => <Component guild={guild} {...appProps} {...rest} />,
    None: () => {
      const Placeholder = placeholder ?? AppSkeleton;
      return <Placeholder {...appProps} {...rest} />;
    },
  });
};

type PageRendererProps = {
  page: React.ComponentType<BaseAppProps>;
  path: string;
} & Omit<BaseAppProps, "ignoreDrawerScroll">;

/**
 * Renders a page, injecting all other app props
 */
const PageRenderer: React.FC<PageRendererProps> = ({
  page: Page,
  path,
  ...rest
}) => <Page {...useAppProps()} {...rest} />;
