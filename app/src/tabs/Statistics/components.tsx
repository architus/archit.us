import React from "react";
import { styled } from "linaria/react";
import { color, Color } from "@architus/facade/theme/color";
import AutoSizer from "react-virtualized-auto-sizer";
import ReactWordcloud, { Options } from "react-wordcloud";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { mix } from "polished";
import { Guild, Member, Snowflake } from "src/utility/types";
import { isDefined } from "@architus/lib/utility";
import { CustomRechartsTooltip } from "./CustomRechartsTooltip";
import whyDidYouRender from "@welldone-software/why-did-you-render";

export type WordData = {
  text: string;
  value: number;
}

type WordCloudProps = {
  words: Array<WordData>
};

type TimeAreaChartProps = {
  members: Map<Snowflake, Member>;
  data: Array<any>;
}

const Styled = {
  AutoSizer: styled(AutoSizer)`
    width: 100%;
  `,
}
export const WordCloud: React.FC<WordCloudProps> = React.memo(({ words }) => {
  const options: Partial<Options> = {
    rotations: 2,
    rotationAngles: [-90, 0],
    fontSizes: [5, 130],
    colors: [color("textStrong")],
  };
  return (
    <Styled.AutoSizer>
      {({ height, width }) => (
        <ReactWordcloud options={options} size={[width, height]} words={words} />
      )}
    </Styled.AutoSizer>
  );
})

function gradArray(col1: string, col2: string, n: number): Array<string> {
  const grad = [];
  for (let i = 0; i < n; i++) {
    grad[i] = mix(i / n, col1, col2);
  }
  return grad;
}

const dateFormatter = (tick: string): string => {
  const options = { month: 'short', day: 'numeric' };
  return (new Date(tick)).toLocaleDateString('en-US', options);
}

const tooltipRenderer = (payload: Array<any>, label: string): JSX.Element => {
  let sum = 0;
  return (
    <>
      <p>{new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(new Date(label ?? 0))}</p>
      {!isDefined(payload) ? null : payload.map(entry => {
        if (entry.value === 0) {
          return null;
        }
        sum += entry.value;
        return (
          <div key={sum}>
            <p style={{ color: entry.stroke }}>{entry.name} : {entry.value}</p>
          </div>
        )
      })}
      <p>Total: {sum}</p>
    </>
  )
}

export const TimeAreaChart = React.memo((props: TimeAreaChartProps) => {
  const colors = gradArray("#ba5095", "#5850ba", props.members.size)
  const accum: React.ReactNode[] = [];
  let i = 0;
  props.members.forEach((member) => {
    accum.push(<Area type="monotone" dataKey={member.name} key={member.id} stackId="1" stroke={colors[i]} fill={colors[i++]} />)
  })
  return (
    <ResponsiveContainer>
      <AreaChart
        data={props.data}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={dateFormatter} type={'number'} scale={'time'} domain={['dataMin', 'dataMax']} />
        <YAxis />
        <Tooltip content={<CustomRechartsTooltip renderer={tooltipRenderer} />} />
        {accum}
      </AreaChart>
    </ResponsiveContainer>
  )
})
