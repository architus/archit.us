import React from "react";
import { styled } from "linaria/react";
import { color, Color } from "@architus/facade/theme/color";
import AutoSizer from "react-virtualized-auto-sizer";
import ReactWordcloud from "react-wordcloud";
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
import { Member, Snowflake } from "src/utility/types";
import { CustomRechartsTooltip } from "./CustomRechartsTooltip";

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
export const WordCloud = (props: WordCloudProps) => {

  const optionss = {
    rotations: 2,
    rotationAngles: [-90, 0],
    fontSizes: [5, 130],
    colors: [color("textStrong")],
  };
  return (
    <Styled.AutoSizer>
      {({height, width}) => (
        <ReactWordcloud options={optionss} size={[width, height]} words={props.words} />
      )}
    </Styled.AutoSizer>
  );
}

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

export const TimeAreaChart = (props: TimeAreaChartProps) => {
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
        <XAxis dataKey="date" tickFormatter={dateFormatter} type={'number'} scale={'time'} domain={['dataMin','dataMax']}/>
        <YAxis />
        <Tooltip content={<CustomRechartsTooltip />}/>
        {accum}
      </AreaChart>
    </ResponsiveContainer>
  )
}
