import React, { useEffect, useMemo } from "react";
import { shallowEqual } from "react-redux";

import StatisticsDashboard from "./StatisticsDashboard";
import { useDispatch, useSelector } from "@app/store/hooks";
import { stats } from "@app/store/routes";
import { usePool, usePoolEntities } from "@app/store/slices/pools";
import { useCurrentUser } from "@app/store/slices/session";
import { TabProps } from "@app/tabs/types";
import { Channel, Member, Snowflake, User, CustomEmoji, HoarFrost } from "@app/utility/types";
import { Option } from "@architus/lib/option";
import { isDefined } from "@architus/lib/utility";
import whyDidYouRender from "@welldone-software/why-did-you-render";
import { Statistics } from "src/store/slices/statistics";
import { shallowEqualArrays } from "shallow-equal";

import { createSelectorCreator, defaultMemoize } from "reselect";


const StatisticsProvider: React.FC<TabProps> = (tabProps) => {
  const dispatch = useDispatch();
  const { guild } = tabProps;
  const currentUser: Option<User> = useCurrentUser();

  const createDeepEqualSelector = createSelectorCreator(
    defaultMemoize,
    (a, b) => {
      return a == b;
    }
  )

  const coolSelecter = createDeepEqualSelector(
    state => state.statistics,
    statistics => statistics.statistics ? statistics.statistics[guild.id as string] : null,
  )

/*   const { statistics: storeStatistics } = useSelector((state) => {
    console.count("inside selector")
    return state.statistics;
  }); */

  //const { statistics: storeStatistics } = useSelector(coolSelecter);

  const storeStatistics = useSelector(coolSelecter);
  //console.log(storeStatistics)
  useEffect(() => {
    dispatch(stats({ routeData: { guildId: guild.id } }));
  }, [dispatch, guild.id]);

  const guildStats = useMemo(() =>
    Option.from(
    storeStatistics
    //isDefined(storeStatistics) ? storeStatistics[guild.id as string] : null
  ), [storeStatistics]);
  //console.count("stats provide");



  if (currentUser.isDefined())
    return (
      <StatisticsDashboard
        //members={membersMap}
        //channels={channelsMap}
        //emojis={emojisMap}
        currentUser={currentUser.get}
        isArchitusAdmin={false}
        stats={guildStats}
        {...tabProps}
      />
    );

  return null;
};
//StatisticsProvider.whyDidYouRender = true;
export default React.memo(StatisticsProvider);
