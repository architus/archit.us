import React, { useEffect, useMemo } from "react";
import styled, { css, down, up, Box } from "@xstyled/emotion";
import { ColorMode, opacity, color, mode, Breakpoint } from "Theme";
import { shallowEqual } from "react-redux";
import { Card, Icon } from "Components";
import { Badge, Image } from "react-bootstrap";
import { stats } from "Store/routes";
import { useDispatch, useSelector } from "Store/hooks";
import { Dispatch } from "Store";
import CountUp from "react-countup";
import { AppPageProps } from "Dynamic/AppRoot/types";
import { Option, None, Some, Unwrap } from "Utility/option";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { useEffectOnce, isDefined, useInitialRender, useLocation } from "Utility";
import { User, Snowflake, Member, Channel } from "Utility/types";
import { useCurrentUser } from "Store/actions";
import { usePoolEntities, usePool } from "Store/slices/pools";
import { GuildStatistics } from "Store/slices/statistics";

const olddata = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

const Styled = {
  PageOuter: styled.div`
    position: relative;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    flex-direction: column;
    height: 100%;

    padding-top: milli;
    ${up(
      Breakpoint.MD,
      css`
        padding-left: micro;
      `
    )}
  `,
  CircledIcon: styled(Icon)`
    background: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    vertical-align: middle;
    padding: 0px;
  `,
  Icon: styled(Icon)`
    font-size: 2em;
    color: light;
    padding: 0px 20px;
  `,
  HeaderCards: styled.div`
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    flex-direction: row;
    ${down(
      Breakpoint.MD,
      css`
        flex-wrap: wrap;
      `
    )}
  `,
  CardContainer: styled.div`
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: 200px;
    grid-auto-flow: dense;
    gap: pico;
    justify-items: stretch;
  `,
  ContentContainer: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row;
  `,
  LabelContainer: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: nano;
    color: light;
  `,
  Description: styled.p`
    margin-bottom: 0;
    font-size: 0.9em;
    margin-top: -pico;
    color: light !important;
  `,
  MessageCard: styled(Card.Plain)`
    margin: pico;
    width: 100%;
    border: none;
    flex: 1 1 0px;
    background-color: #5850ba;
    background-image: linear-gradient(62deg, #5850ba 0%, #844ea3 100%);
    padding: 16px;
  `,
  HeaderCard: styled(Card.Plain)`
    margin: pico;
    width: 100%;
    border: none;
    padding: 16px;
    flex: 1 1 0px;
    background-color: #ba5095;
    background-image: linear-gradient(62deg, #ba5095 0%, #ffbfa7 100%);
  `,
  MemberCard: styled(Card.Plain)`
    margin: pico;
    width: 100%;
    border: none;
    padding: 16px;
    flex: 1 1 0px;
    background-color: #844ea3;
    background-image: linear-gradient(62deg, #844ea3 0%, #ba5095 100%);
  `,
  Card: styled(Card.base)`
    margin: 5px;
    grid-column: span auto;
    grid-row: span auto;
  `,
  BigCard: styled(Card.base)`
    margin: 5px;
    grid-column: span 2;
    grid-row: span 2;
  `,
  Image: styled(Image)`
    max-height: 100%;
    max-width: 100%;
  `,
  CountUp: styled(CountUp)`
    font-size: 2.5em;
  `,
};

type StatisticsProps = {
  members: Map<Snowflake, Member>;
  channels: Map<string, Channel>;
  isArchitusAdmin: boolean;
  currentUser: User;
  dispatch: Dispatch;
  stats: Option<GuildStatistics>;
} & AppPageProps;

const StatisticsProvider: React.FC<AppPageProps> = (pageProps) => {
  const dispatch = useDispatch();
  const { guild } = pageProps;
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
      <Statistics
        members={membersMap}
        channels={channelsMap}
        currentUser={currentUser.get}
        isArchitusAdmin={false}
        dispatch={dispatch}
        stats={guildStats}
        {...pageProps}
      />
    );

  return null;
};

export default StatisticsProvider;

const Statistics: React.FC<StatisticsProps> = (props) => {
  const { guild, stats, currentUser, members, channels } = props;

  const getMemberCount = (): number => {
    return stats.isDefined() ? stats.get.members.count : 0;
  };

  const getMessageCount = (): number => {
    return stats.isDefined() ? stats.get.messages.count : 0;
  };

  const getChannelData = (): any[] => {
    const data: any[] = [];
    if (stats.isDefined()) {
      const channelIds = stats.get.messages.channels;
      Object.entries(channelIds).forEach(([key, value]) => {
        const channel = channels.get(key)
        if (isDefined(channel)) {
          data.push({ name: channel.name, count: value });
        }
      });
    }
    data.sort((a, b) => (a.count < b.count ? 1 : -1));
    return data;
  };

  const getMemberData = (): any[] => {
    const data: any[] = [];
    if (stats.isDefined()) {
      const memberIds = stats.get.messages.members;
      Object.entries(memberIds).forEach(([key, value]) => {
        const member = members.get(key as Snowflake);
        if (isDefined(member)) {
          data.push({ name: member.name, count: value });
        }
      });
    }
    data.sort((a, b) => (a.count < b.count ? 1 : -1));
    return data;
  };

  const getPersonalMessageData = (): any[] => {
    const total = getMessageCount();
    if (stats.isDefined()) {
      const userCount = stats.get.messages.members[currentUser.id as string];
      return [
        { name: "me", value: userCount },
        { name: "not me", value: total - userCount },
      ];
    }
    return [];
  };

  return (
    <Styled.PageOuter>
      <h2>Statistics</h2>
      <Styled.HeaderCards>
        <Styled.MessageCard>
          <Styled.ContentContainer>
            <Styled.Icon name="comments" noAutoWidth />
            <Styled.LabelContainer>
              <Styled.CountUp end={getMessageCount()} duration={5} />
              <Styled.Description>Messages Sent</Styled.Description>
            </Styled.LabelContainer>
          </Styled.ContentContainer>
        </Styled.MessageCard>
        <Styled.MemberCard>
          <Styled.ContentContainer>
            <Styled.Icon name="users" noAutoWidth />
            <Styled.LabelContainer>
              <Styled.CountUp end={getMemberCount()} duration={5} />
              <Styled.Description>Members</Styled.Description>
            </Styled.LabelContainer>
          </Styled.ContentContainer>
        </Styled.MemberCard>
        <Styled.HeaderCard>
          <Styled.ContentContainer>
            <Styled.Icon name="history" noAutoWidth />
            <Styled.LabelContainer>
              <div>
                <Styled.CountUp end={2} duration={5} /> <sub>min</sub>
              </div>
              <Styled.Description>Last Activity</Styled.Description>
            </Styled.LabelContainer>
          </Styled.ContentContainer>
        </Styled.HeaderCard>
      </Styled.HeaderCards>
      <Styled.CardContainer>
        <Styled.Card>
          <Image src="https://cdn.discordapp.com/emojis/482104551902806016.png?v=1" />
        </Styled.Card>
        <Styled.Card>
          <Image
            src="https://cdn.discordapp.com/emojis/671530198352789524.png"
            roundedCircle
          />
        </Styled.Card>
        <Styled.Card>
          <Styled.CountUp end={7} duration={5} />
        </Styled.Card>
        <Styled.Card>
          <h5>Your Messages</h5>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={getPersonalMessageData()}
                cx={"50%"}
                cy={"41%"}
                innerRadius={"70%"}
                outerRadius={"90%"}
                fill="#844EA3"
                paddingAngle={5}
                dataKey="value"
              >
                <Cell key="cell-0" fill="#ba5095" />
                <Cell key="cell-1" fill="#844EA3" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Styled.Card>
        <Styled.BigCard>
          <h4>Messages by Channel</h4>
          <ResponsiveContainer>
            <BarChart
              data={getChannelData()}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ba5095" />
            </BarChart>
          </ResponsiveContainer>
        </Styled.BigCard>
        <Styled.Card>
          <Image
            src="https://cdn.discordapp.com/emojis/671530198352789524.png"
            rounded
          />
        </Styled.Card>
        <Styled.Card>
          <Styled.CountUp end={206} duration={5} />
        </Styled.Card>
        <Styled.BigCard>
          <h4>Messages by Member</h4>
          <ResponsiveContainer>
            <BarChart
              data={getMemberData()}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#844ea3" />
            </BarChart>
          </ResponsiveContainer>
        </Styled.BigCard>
        <Styled.Card>
          <Styled.CountUp end={2} duration={5} />
        </Styled.Card>
      </Styled.CardContainer>
      <Styled.BigCard>
        <Styled.Image
          src="https://cdn.archit.us/assets/695011369632403465.png"
          rounded
        />
      </Styled.BigCard>
    </Styled.PageOuter>
  );
};
