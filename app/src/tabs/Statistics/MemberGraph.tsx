import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Member, Snowflake } from "@app/utility/types";
import { isDefined } from "@architus/lib/utility";
import { CustomRechartsTooltip } from "./CustomRechartsTooltip";


type MemberData = {
  name: string;
  count: number;
};
type MemberGraphProps = {
  memberCounts: Record<string, number>;
  members: Map<Snowflake, Member>;
}

const getMemberData = (memberCounts: Record<string, number>, members: Map<Snowflake, Member>): MemberData[] => {
  const data: MemberData[] = [];
  Object.entries(memberCounts).forEach(([key, value]) => {
    const member = members.get(key as Snowflake);
    if (isDefined(member)) {
      data.push({ name: member.name, count: value });
    }
  });
  data.sort((a, b) => (a.count < b.count ? 1 : -1));
  return data.slice(0, 15);
};

const tooltipRenderer = (payload: Array<any>, label: string): JSX.Element => {
  return (
    <>
      <p>@{label}</p>
      {!isDefined(payload) ? 0 : payload.map(entry => (entry.value))} messages
    </>
  )
}

export const MemberGraph: React.FC<MemberGraphProps> = ({
  memberCounts,
  members,
}) => (
  <ResponsiveContainer>
  <BarChart
    data={getMemberData(memberCounts, members)}
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
    <Tooltip content={<CustomRechartsTooltip renderer={tooltipRenderer}/>}/>
    <Legend />
    <Bar dataKey="count" fill="#844ea3" />
  </BarChart>
</ResponsiveContainer>
)
