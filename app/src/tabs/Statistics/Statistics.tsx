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


const StatisticsProvider: React.FC<TabProps> = (tabProps) => {
  const dispatch = useDispatch();
  const { guild } = tabProps;
  const currentUser: Option<User> = useCurrentUser();

  const { statistics: storeStatistics } = useSelector((state) => {
    return state.statistics;
  }, shallowEqual);

  useEffect(() => {
    dispatch(stats({ routeData: { guildId: guild.id } }));
  }, [dispatch, guild.id]);

  const guildStats = Option.from(
    isDefined(storeStatistics) ? storeStatistics[guild.id as string] : null
  );



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
export default StatisticsProvider;
