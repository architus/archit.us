import React, { useEffect, useMemo } from "react";
import { shallowEqual } from "react-redux";

import StatisticsDashboard from "./StatisticsDashboard";
import { useDispatch, useSelector } from "@app/store/hooks";
import { stats } from "@app/store/routes";
import { usePool, usePoolEntities } from "@app/store/slices/pools";
import { useCurrentUser } from "@app/store/slices/session";
import { TabProps } from "@app/tabs/types";
import { Channel, Member, Snowflake, User } from "@app/utility/types";
import { Option } from "@architus/lib/option";
import { isDefined } from "@architus/lib/utility";

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

  const { all: channels } = usePool({
    type: "channel",
    guildId: guild.id,
  });

  // Load all the members into the pool
  const allMemberIds = useMemo(() => {
    const ids = [];
    if (guildStats.isDefined()) {
      for (const id in guildStats.get.messages.members) {
        ids.push(id as Snowflake);
      }
    }
    return ids;
  }, [guildStats]);

  const memberEntries = usePoolEntities({
    type: "member",
    guildId: guild.id,
    ids: allMemberIds,
  });
  const membersMap = useMemo(() => {
    const members: Map<Snowflake, Member> = new Map();
    for (const memberEntry of memberEntries) {
      if (memberEntry.isLoaded && memberEntry.entity.isDefined()) {
        members.set(memberEntry.entity.get.id, memberEntry.entity.get);
      }
    }
    return members;
  }, [memberEntries]);

  const channelsMap = useMemo(() => {
    const map: Map<string, Channel> = new Map();
    for (const channel of channels) {
      map.set(channel.id as string, channel);
    }
    return map;
  }, [channels]);

  if (currentUser.isDefined())
    return (
      <StatisticsDashboard
        members={membersMap}
        channels={channelsMap}
        currentUser={currentUser.get}
        isArchitusAdmin={false}
        dispatch={dispatch}
        stats={guildStats}
        {...tabProps}
      />
    );

  return null;
};

export default StatisticsProvider;
