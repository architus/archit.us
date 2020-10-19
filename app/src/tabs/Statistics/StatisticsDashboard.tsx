import { styled } from "linaria/react";
import { css } from "linaria";
import React, { useMemo } from "react";
import CountUp from "react-countup";
import { FaComments, FaUsers } from "react-icons/fa";
import { WordCloud, WordData, TimeAreaChart } from "./components";
import { ChannelGraph } from "./ChannelGraph";
import { MemberGraph } from "./MemberGraph";
import { MentionsChart } from "./MentionsChart";
import IntegrityAlert from "./IntegrityAlert";
import { Timeline, TimelineItem } from "@app/components/Timeline";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { usePool, usePoolEntities } from "@app/store/slices/pools";

import { appVerticalPadding, appHorizontalPadding } from "@app/layout";
import { GuildStatistics } from "@app/store/slices/statistics";
import { TabProps } from "@app/tabs/types";
import { Channel, CustomEmoji, Member, Snowflake, User, Guild, HoarFrost } from "@app/utility/types";
import { snowflakeToDate } from "@app/utility/discord";
import Card from "@architus/facade/components/Card";
import Logo from "@architus/facade/components/Logo";
import { color } from "@architus/facade/theme/color";
import { down } from "@architus/facade/theme/media";
import { gap } from "@architus/facade/theme/spacing";
import { Option } from "@architus/lib/option";
import { isDefined } from "@architus/lib/utility";
import ago from "s-ago";

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
  IntegrityAlert: styled(IntegrityAlert)`
    margin: ${gap.pico}
  `,
  Logo: styled(Logo.Symbol)`
    font-size: 2em;
    fill: ${color("light")};
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
    margin-bottom: ${gap.nano};
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

    & > h4 {
      margin: 0px;
    }
  `,
  BigCard: styled(Card)`
    margin: 5px;
    grid-column: span 2;
    grid-row: span 2;
  `,
  TallCard: styled(Card)`
    margin: 5px;
    grid-column: span 1;
    grid-row: span 2;
`,
  Image: styled.img``,
  CountUp: styled(CountUp)`
    font-size: 2.5em;
  `,
};

const iconClass = css`
  font-size: 2em;
  color: ${color("light")};
  margin: 0px 20px;
`;

type StatisticsDashboardProps = {
  //members: Map<Snowflake, Member>;
  //channels: Map<string, Channel>;
  //emojis: Map<string, CustomEmoji>;
  isArchitusAdmin: boolean;
  currentUser: User;
  stats: Option<GuildStatistics>;
  guild: Guild;
} & TabProps;


type PersonalMessageData = {
  name: string;
  value: number;
};

const StatisticsDashboard: React.FC<StatisticsDashboardProps> = ({
  stats,
  currentUser,
  //members,
  //channels,
  //emojis,
  guild,
}) => {

  // Load all the members into the pool
  const allMemberIds = useMemo(() => {
    const ids: Snowflake[] = [];
    if (stats.isDefined()) {
      Object.keys(stats.get.memberCounts).forEach((id) => {
        ids.push(id as Snowflake);
      });
    }
    return ids;
  }, [stats]);

  const memberEntries = usePoolEntities({
    type: "member",
    guildId: guild.id,
    ids: allMemberIds,
  });
  const members = useMemo(() => {
    const members: Map<Snowflake, Member> = new Map();
    for (const memberEntry of memberEntries) {
      if (memberEntry.isLoaded && memberEntry.entity.isDefined()) {
        members.set(memberEntry.entity.get.id, memberEntry.entity.get);
      }
    }
    return members;
  }, [memberEntries]);


  const { all: channelsPool } = usePool({
    type: "channel",
    guildId: guild.id,
  });


  const emojiEntries = usePoolEntities({
    type: "customEmoji",
    guildId: guild.id,
    ids: stats.isDefined() ? stats.get.popularEmojis : [],
  });
  const emojis = useMemo(() => {
    const emojis: Map<HoarFrost, CustomEmoji> = new Map();
    for (const emojiEntry of emojiEntries) {
      if (emojiEntry.isLoaded && emojiEntry.entity.isDefined()) {
        emojis.set(emojiEntry.entity.get.id, emojiEntry.entity.get);
      }
    }
    return emojis;
  }, [emojiEntries]);

  const channels = useMemo(() => {
    const map: Map<string, Channel> = new Map();
    for (const channel of channelsPool) {
      map.set(channel.id as string, channel);
    }
    return map;
  }, [channelsPool]);


  const getMemberCount = (): number => {
    return stats.isDefined() ? stats.get.memberCount : 0;
  };

  const getMessageCount = (): number => {
    return stats.isDefined() ? stats.get.messageCount : 0;
  };

  const getArchitusMessageCount = (): number => {
    return stats.isDefined() ? stats.get.architusCount : 0;
  };

  const getLastSeen = (): Date => {
    return new Date(stats.isDefined() ? stats.get.lastActivity : 1420070400000);
  };

  const getJoinDate = (): Date => {
    if (isDefined(currentUser) && isDefined(currentUser.id) && members.has(currentUser.id as Snowflake)) {
      return new Date(members.get(currentUser.id as Snowflake).joined_at);
    }
    return new Date(1420070400000)
  }

  const getBestEmoji = (): string => {
    if (stats.isDefined()) {
      const popularEmojis = stats.get.popularEmojis;
      if (popularEmojis.length > 0) {
        // console.log(emojis);
        const emoji = emojis.get(popularEmojis[0]);
        if (isDefined(emoji)) {
          return emoji.url;
        }
      }
    }
    return "";
  }

  const getPersonalMessageData = (): PersonalMessageData[] => {
    if (stats.isDefined()) {
      const total = stats.get.messageCount;
      const userCount = stats.get.memberCounts[currentUser.id as string];
      return [
        { name: "me", value: userCount },
        { name: "not me", value: total - userCount },
      ];
    }
    return [];
  };

  const getWords = (): Array<WordData> => {
    const words: Array<WordData> = [];
    if (stats.isDefined()) {
      const commonWords = stats.get.commonWords;
      commonWords.slice(0, 100).forEach((word) => {
        words.push({text: word[0], value: word[1]})
      })
    }
    return words;
  }

  const getTimeData = (): Array<any> => {
    const data: Array<any> = [];
    if (stats.isDefined()) {
      Object.entries(stats.get.timeMemberCounts).forEach(([date, rec]) => {
        let obj = {date: Date.parse(date)};
        if (obj.date < (new Date).getTime() - 90 * 86400000) {
          return;
        }
        members.forEach((member) => {
          obj[member.name] = isDefined(rec[member.id]) ? rec[member.id] : 0;
        })
        data.push(obj);
      })
    }
    data.sort((a, b) => a.date - b.date);
    return data;
  }

  //<Area type="monotone" dataKey="amt" stackId="1" stroke="#5850ba" fill="#5850ba" />
  //<Area type="monotone" dataKey="uv" stackId="1" stroke="#844ea3" fill="#844ea3" />
  //<Area type="monotone" dataKey="pv" stackId="1" stroke="#ba5095" fill="#ba5095" />

  const getMemberChart = () => {
    if (stats.isDefined()) {
      return (<MentionsChart mentionCounts={stats.get.mentionCounts} members={members} />);
    }
    return (<>no mentions</>);
  }


  return (
    <Styled.PageOuter>
      <Styled.Title>Statistics</Styled.Title>
      <Styled.IntegrityAlert
        sKey={`statsForbidden${guild.id}`}
        message="architus does not have permission to access complete data from this server; some statistics may be inaccurate."
        enabled={stats.isDefined() ? stats.get.forbidden : false}
      />
      <Styled.IntegrityAlert
        sKey={`statsCounting${guild.id}`}
        message="architus is still indexing this server; some statistics may be inaccurate."
        enabled={stats.isDefined() ? !stats.get.upToDate : false}
      />
      <Styled.HeaderCards>
        <Styled.MessageCard>
          <Styled.ContentContainer>
            <FaComments className={iconClass} />
            <Styled.LabelContainer>
              <Styled.CountUp end={getMessageCount()} duration={5} />
              <Styled.Description>Messages Sent</Styled.Description>
            </Styled.LabelContainer>
          </Styled.ContentContainer>
        </Styled.MessageCard>
        <Styled.MemberCard>
          <Styled.ContentContainer>
            <FaUsers className={iconClass} />
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
              <Styled.CountUp end={getArchitusMessageCount()} duration={5} />
              <Styled.Description>Commands Executed</Styled.Description>
            </Styled.LabelContainer>
          </Styled.ContentContainer>
        </Styled.ArchitusCard>
      </Styled.HeaderCards>
      <Styled.CardContainer>
        <Styled.Card>
          <h4>Your Messages</h4>
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
          <h4>Popular Emoji</h4>
          <div>
            <Styled.Image src={getBestEmoji()} />
          </div>
        </Styled.Card>
        <Styled.Card>
          <h4>Mentions</h4>
          {getMemberChart()}
        </Styled.Card>
        <Styled.TallCard>
          <h4>Timeline</h4>
          <Timeline>
            <TimelineItem date={snowflakeToDate(guild.id)}>
              {guild.name} was created
            </TimelineItem>
            <TimelineItem date={getJoinDate()}>
              You joined {guild.name}
            </TimelineItem>
            <TimelineItem date={new Date(getLastSeen().getTime() - 60 * 1000 * getLastSeen().getTimezoneOffset())} dateFormatter={ago}>
              Last activity
            </TimelineItem>
          </Timeline>
        </Styled.TallCard>
        <Styled.BigCard>
          <h3>Messages over Time</h3>
          <TimeAreaChart members={members} data={getTimeData()} />
        </Styled.BigCard>
        <Styled.BigCard>
          <h3>Messages by Member</h3>
          <MemberGraph
            memberCounts={stats.isDefined() ? stats.get.memberCounts : {}}
            members={members}
          />
        </Styled.BigCard>
        <Styled.BigCard>
          <h3>Messages by Channel</h3>
          <ChannelGraph
            channelCounts={stats.isDefined() ? stats.get.channelCounts : {}}
            channels={channels}
          />
        </Styled.BigCard>
        <Styled.BigCard>
          <h3>Popular Words</h3>
          <WordCloud words={getWords()} />
        </Styled.BigCard>
      </Styled.CardContainer>
    </Styled.PageOuter>
  );
};

export default StatisticsDashboard;
