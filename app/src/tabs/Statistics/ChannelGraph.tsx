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
import { Channel } from "@app/utility/types";
import { isDefined, formatNum } from "@architus/lib/utility";

type ChannelData = {
  name: string;
  count: number;
};
type ChannelGraphProps = {
  channelCounts: Record<string, number>;
  channels: Map<string, Channel>;
};

const getChannelData = (
  channelCounts: Record<string, number>,
  channels: Map<string, Channel>
): ChannelData[] => {
  const data: ChannelData[] = [];
  Object.entries(channelCounts).forEach(([key, value]) => {
    const channel = channels.get(key);
    if (isDefined(channel)) {
      data.push({ name: channel.name, count: value });
    }
  });
  data.sort((a, b) => (a.count < b.count ? 1 : -1));
  return data.slice(0, 15);
};

const tooltipRenderer = (
  payload: Array<{ value: number }>,
  label: string
): JSX.Element => {
  return (
    <>
      <p>#{label}</p>
      {formatNum(payload.length > 0 ? payload[0].value : 0)} messages
    </>
  );
};

export const ChannelGraph: React.FC<ChannelGraphProps> = React.memo(
  ({ channelCounts, channels }) => (
    <CustomResponsiveContainer>
      <BarChart data={getChannelData(channelCounts, channels)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          content={<CustomRechartsTooltip renderer={tooltipRenderer} />}
        />
        <Legend />
        <Bar dataKey="count" fill="#ba5095" isAnimationActive={false} />
      </BarChart>
    </CustomResponsiveContainer>
  )
);
