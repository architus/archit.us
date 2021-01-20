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
      <StatisticsDashboard
        currentUser={currentUser.get}
        isArchitusAdmin={false}
        stats={guildStats}
        {...tabProps}
      />
    );

  return null;
};
export default React.memo(StatisticsProvider);
