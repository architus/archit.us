import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";
import { Snowflake, Member } from "@app/utility/types";
import { isDefined } from "@architus/lib/utility";
import { CustomRechartsTooltip } from "./CustomRechartsTooltip";





type GrowthChartProps = {
  members: Map<Snowflake, Member>;
}

const tooltipRenderer = (payload: Array<any>, label: string): JSX.Element => {
  return (
    <>
      <p>{new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(new Date(label ?? 0))}</p>
      {!isDefined(payload) ? 0 : payload.map(entry => (entry.value))} members
    </>
  )
}

const dateFormatter = (tick: string): string => {
  const options = { month: 'short', day: 'numeric' };
  return (new Date(tick)).toLocaleDateString('en-US', options);
}

export const GrowthChart: React.FC<GrowthChartProps> = React.memo(({members}) => {
  const data: {count: number, date: number}[] = []
  let sum = 0
  const membersList = [ ...members.values() ]
  membersList.sort((a, b) => a.joined_at - b.joined_at)
  membersList.forEach((member) => {
    data.push({
      count: ++sum,
      date: member.joined_at,
    })
  })

  return (
  <ResponsiveContainer>
    <AreaChart data={data} >
      <XAxis dataKey="date" tickFormatter={dateFormatter} type={'number'} scale={'time'} domain={['dataMin', 'dataMax']} />
      <Area type="monotone" dataKey="count" stroke="#5850ba" fill="#5850ba" />
      <Tooltip content={<CustomRechartsTooltip renderer={tooltipRenderer} />} />
    </AreaChart>
  </ResponsiveContainer>
)})
