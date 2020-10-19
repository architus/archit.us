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
import { Channel } from "@app/utility/types";
import { isDefined } from "@architus/lib/utility";
import { CustomRechartsTooltip } from "./CustomRechartsTooltip";


type ChannelData = {
  name: string;
  count: number;
};
type ChannelGraphProps = {
  channelCounts: Record<string, number>;
  channels: Map<string, Channel>;
}

const getChannelData = (channelCounts: Record<string, number>, channels: Map<string, Channel>): ChannelData[] => {
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

const tooltipRenderer = (payload: Array<any>, label: string): JSX.Element => {
  return (
    <>
      <p>#{label}</p>
      {!isDefined(payload) ? 0 : payload.map(entry => (entry.value))} messages
    </>
  )
}

export const ChannelGraph: React.FC<ChannelGraphProps> = ({
  channelCounts,
  channels,
}) => (
  <ResponsiveContainer>
    <BarChart
      data={getChannelData(channelCounts, channels)}
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
      <Bar dataKey="count" fill="#ba5095" />
    </BarChart>
  </ResponsiveContainer>
)

