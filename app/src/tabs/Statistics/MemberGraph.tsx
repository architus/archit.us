import React from "react";
import {
  BarChart,
  Bar,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { CustomRechartsTooltip } from "./CustomRechartsTooltip";
import CustomResponsiveContainer from "./CustomResponsiveContainer";
import { Member } from "@app/utility/types";
import { formatNum, isDefined } from "@architus/lib/utility";

type MemberData = {
  name: string;
  count: number;
};
type MemberGraphProps = {
  memberCounts: Record<string, number>;
  members: (id: string) => Member | undefined;
};

const getMemberData = (memberCounts: Record<string, number>): MemberData[] => {
  const data: MemberData[] = [];
  Object.entries(memberCounts).forEach(([key, value]) => {
    data.push({ name: key, count: value });
  });
  data.sort((a, b) => (a.count < b.count ? 1 : -1));
  return data.slice(0, 15);
};

export const MemberGraph: React.FC<MemberGraphProps> = React.memo(
  ({ memberCounts, members }) => {
    const tooltipRenderer = (
      payload: Array<any>,
      label: string
    ): JSX.Element => {
      return (
        <>
          <p>@{isDefined(members(label)) ? members(label)?.username : label}</p>
          {formatNum(
            !isDefined(payload) ? 0 : payload.map((entry) => entry.value)
          )}{" "}
          messages
        </>
      );
    };
    const tickFormatter = (tick: string): string => {
      return isDefined(members(tick)) ? members(tick).username : tick;
    };
    return (
      <CustomResponsiveContainer>
        <BarChart data={getMemberData(memberCounts)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tickFormatter={tickFormatter} />
          <YAxis />
          <Tooltip
            content={<CustomRechartsTooltip renderer={tooltipRenderer} />}
          />
          <Legend />
          <Bar dataKey="count" fill="#844ea3" isAnimationActive={false} />
        </BarChart>
      </CustomResponsiveContainer>
    );
  }
);
