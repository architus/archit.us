import React, { useEffect, useMemo } from "react";
import { createSelectorCreator, defaultMemoize } from "reselect";

import StatisticsDashboard from "./StatisticsDashboard";
import { useDispatch, useSelector } from "@app/store/hooks";
import { fetchStats } from "@app/store/routes";
import { useCurrentUser } from "@app/store/slices/session";
import { TabProps } from "@app/tabs/types";
import { User } from "@app/utility/types";
import { Option } from "@architus/lib/option";
import { Statistics } from "src/store/slices/statistics";
import { styled } from "linaria/react";
import { color } from "@architus/facade/theme/color";
import { appVerticalPadding, appHorizontalPadding } from "@app/layout";
import Badge from "@architus/facade/components/Badge";

const Styled = {
  Layout: styled.div`
    padding: ${appVerticalPadding} ${appHorizontalPadding};
  `,
  Title: styled.h2`
    color: ${color("textStrong")};
    font-size: 1.9rem;
    font-weight: 300;
  `,
};

/**
 * Bootstrap StatisticsDashboard.
 * Does a bit of garbage to pull the statistics data and memoize it, etc.
 */
const StatisticsProvider: React.FC<TabProps> = (tabProps) => {
  const dispatch = useDispatch();
  const { guild } = tabProps;
  const currentUser: Option<User> = useCurrentUser();

  const createDeepEqualSelector = createSelectorCreator(
    defaultMemoize,
    (a, b) => {
      // eslint-disable-next-line eqeqeq
      return a == b;
    }
  );

  const coolSelecter = createDeepEqualSelector(
    (state: { statistics: Statistics }) => state.statistics,
    (statistics) =>
      statistics.statistics ? statistics.statistics[guild.id as string] : null
  );

  const storeStatistics = useSelector(coolSelecter);
  useEffect(() => {
    dispatch(fetchStats({ routeData: { guildId: guild.id } }));
  }, [dispatch, guild.id]);

  const guildStats = useMemo(() => {
    return Option.from(storeStatistics);
  }, [storeStatistics]);

  if (currentUser.isDefined())
    return (
      <Styled.Layout>
        <Styled.Title>
          Settings <Badge variant="primary">Coming (back) Soon</Badge>
        </Styled.Title>
      </Styled.Layout>
      /*       <StatisticsDashboard
        currentUser={currentUser.get}
        isArchitusAdmin={false}
        stats={guildStats}
        {...tabProps}
      /> */
    );

  return null;
};
export default React.memo(StatisticsProvider);
