import { styled } from "linaria/react";
import React from "react";
import CountUp from "react-countup";
import { FaComments, FaUsers } from "react-icons/fa";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { appVerticalPadding, appHorizontalPadding } from "@app/layout";
import { TabProps } from "@app/tabs/types";
import Card from "@architus/facade/components/Card";
import { Option } from "@architus/lib/option";
import { Channel, Member, Snowflake, User } from "@app/utility/types";
import { isDefined } from "@architus/lib/utility";
import Logo from "@architus/facade/components/Logo";
import { down } from "@architus/facade/theme/media";
import { GuildStatistics } from "@app/store/slices/statistics";
import { Dispatch } from "@app/store";
import { gap } from "@architus/facade/theme/spacing";
import { color } from "@architus/facade/theme/color";

const oldData = [
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;

const Styled = {
  PageOuter: styled.div`
    position: relative;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    flex-direction: column;
    height: 100%;
    padding: ${appVerticalPadding} ${appHorizontalPadding};
  `,
  Title: styled.h2`
    color: ${color("textStrong")};
    font-size: 1.9rem;
    font-weight: 300;
  `,
  Logo: styled(Logo.Symbol)`
    font-size: 2em;
    color: light;
    padding: 0px 20px;
    display: flex;
    align-items: center;
  `,
  HeaderCards: styled.div`
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    flex-direction: row;

    ${down("md")} {
      flex-wrap: wrap;
    }
  `,
  CardContainer: styled.div`
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: 200px;
    grid-auto-flow: dense;
    gap: ${gap.pico};
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
    color: ${color("light")};
  `,
  Description: styled.p`
    margin-bottom: 0;
    font-size: 0.9em;
    margin-top: -${gap.pico};
    color: ${color("light")} !important;
  `,
  MessageCard: styled(Card)`
    margin: ${gap.pico};
    width: 100%;
    border: none;
    flex: 1 1 0px;
    background-color: #5850ba;
    background-image: linear-gradient(62deg, #5850ba 0%, #844ea3 100%);
    padding: 16px;
  `,
  ArchitusCard: styled(Card)`
    margin: ${gap.pico};
    width: 100%;
    border: none;
    padding: 16px;
    flex: 1 1 0px;
    background-color: #ba5095;
    background-image: linear-gradient(62deg, #ba5095 0%, #ffbfa7 100%);
  `,
  MemberCard: styled(Card)`
    margin: ${gap.pico};
    width: 100%;
    border: none;
    padding: 16px;
    flex: 1 1 0px;
    background-color: #844ea3;
    background-image: linear-gradient(62deg, #844ea3 0%, #ba5095 100%);
  `,
  Card: styled(Card)`
    margin: 5px;
    grid-column: span auto;
    grid-row: span auto;

    & > h5 {
      margin: 0px;
    }
  `,
  BigCard: styled(Card)`
    margin: 5px;
    grid-column: span 2;
    grid-row: span 2;
  `,
  Image: styled.img``,
  CountUp: styled(CountUp)`
    font-size: 2.5em;
  `,
};

type StatisticsDashboardProps = {
  members: Map<Snowflake, Member>;
  channels: Map<string, Channel>;
  isArchitusAdmin: boolean;
  currentUser: User;
  dispatch: Dispatch;
  stats: Option<GuildStatistics>;
} & TabProps;

const StatisticsDashboard: React.FC<StatisticsDashboardProps> = ({
  stats,
  currentUser,
  members,
  channels,
}) => {
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
        const channel = channels.get(key);
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
    if (stats.isDefined()) {
      const total = stats.get.messages.count;
      const userCount = stats.get.messages.members[currentUser.id as string];
      return [
        { name: "me", value: userCount },
        { name: "not me", value: total - userCount },
      ];
    }
    return [];
  };

  const getArchitusMessageCount = (): number => {
    if (stats.isDefined()) {
      return stats.get.messages.members["448940980218101795"];
    }
    return 0;
  };

  return (
    <Styled.PageOuter>
      <Styled.Title>
        Statistics
      </Styled.Title>
      <Styled.HeaderCards>
        <Styled.MessageCard>
          <Styled.ContentContainer>
            <FaComments />
            <Styled.LabelContainer>
              <Styled.CountUp end={getMessageCount()} duration={5} />
              <Styled.Description>Messages Sent</Styled.Description>
            </Styled.LabelContainer>
          </Styled.ContentContainer>
        </Styled.MessageCard>
        <Styled.MemberCard>
          <Styled.ContentContainer>
            <FaUsers />
            <Styled.LabelContainer>
              <Styled.CountUp end={getMemberCount()} duration={5} />
              <Styled.Description>Members</Styled.Description>
            </Styled.LabelContainer>
          </Styled.ContentContainer>
        </Styled.MemberCard>
        <Styled.ArchitusCard>
          <Styled.ContentContainer>
            <Styled.Logo />
            <Styled.LabelContainer>
              <div>
                <Styled.CountUp end={getArchitusMessageCount()} duration={5} />
              </div>
              <Styled.Description>Commands Executed</Styled.Description>
            </Styled.LabelContainer>
          </Styled.ContentContainer>
        </Styled.ArchitusCard>
      </Styled.HeaderCards>
      <Styled.CardContainer>
        <Styled.Card>
          <h5>Your Messages</h5>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={getPersonalMessageData()}
                cx={"50%"}
                cy={"50%"}
                innerRadius={"65%"}
                outerRadius={"90%"}
                fill="#844EA3"
                paddingAngle={5}
                dataKey="value"
              >
                <Cell key="cell-0" fill="#ba5095" strokeWidth={0} />
                <Cell key="cell-1" fill="#844EA3" strokeWidth={0} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Styled.Card>
        <Styled.Card>
          <h5>Popular Emoji</h5>
          <div>
            <Styled.Image src="https://cdn.discordapp.com/emojis/482104551902806016.png?v=1" />
          </div>
        </Styled.Card>
        <Styled.Card>
          <h5>Mentions</h5>
        </Styled.Card>
        <Styled.Card>
          <h5>Last Activity</h5>
        </Styled.Card>
        <Styled.BigCard>
          <h4>Messages over Time</h4>
        </Styled.BigCard>
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
          <h5>Member Since</h5>
        </Styled.Card>
        <Styled.BigCard>
          <h4>Popular Words</h4>
        </Styled.BigCard>
      </Styled.CardContainer>
    </Styled.PageOuter>
  );
};

export default StatisticsDashboard;
