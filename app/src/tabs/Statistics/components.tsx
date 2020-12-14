import { styled } from "linaria/react";
import { mix } from "polished";
import React from "react";
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

import { CustomRechartsTooltip } from "./CustomRechartsTooltip";
import { useColorMode } from "@architus/facade/hooks";
import { ColorMode, color } from "@architus/facade/theme/color";
import { isDefined } from "@architus/lib/utility";
import { NormalizedUserLike } from "src/utility/types";

// import whyDidYouRender from "@welldone-software/why-did-you-render";

export type WordData = {
  text: string;
  value: number;
};

type WordCloudProps = {
  words: Array<WordData>;
};

type TimeAreaChartProps = {
  ids: Set<string>;
  data: Array<any>;
  members: (id: string) => NormalizedUserLike | undefined;
};

const Styled = {
  AutoSizer: styled(AutoSizer)`
    width: 100%;
  `,
};
export const WordCloud: React.FC<WordCloudProps> = React.memo(({ words }) => {
  const options: Partial<Options> = {
    rotations: 2,
    rotationAngles: [-90, 0],
    fontSizes: [5, 120],
    enableOptimizations: true,
    // enableTooltip: false,
    // fontFamily: "Renner*",
    // padding: 10,
    // transitionDuration: 0,
    colors: [color("textStrong")],
  };
  return (
    <Styled.AutoSizer>
      {({ height, width }): JSX.Element => (
        <ReactWordcloud
          options={options}
          size={[width, height]}
          words={words}
        />
      )}
    </Styled.AutoSizer>
  );
});

function gradArray(col1: string, col2: string, n: number): Array<string> {
  const grad = [];
  for (let i = 0; i < n; i++) {
    grad[i] = mix(i / n, col1, col2);
  }
  return grad;
}

const dateFormatter = (tick: string): string => {
  const options = { month: "short", day: "numeric" };
  return new Date(tick).toLocaleDateString("en-US", options);
};

export const TimeAreaChart: React.FC<TimeAreaChartProps> = React.memo(
  ({ ids, data, members }) => {
    const colors = gradArray("#ba5095", "#5850ba", ids.size);
    const accum: React.ReactNode[] = [];
    const lightMode = useColorMode() === ColorMode.Light;
    let i = 0;
    ids.forEach((member) => {
      accum.push(
        <Area
          type="monotone"
          dataKey={member}
          key={member}
          stackId="1"
          stroke={colors[i]}
          // eslint-disable-next-line no-plusplus
          fill={colors[i++]}
          isAnimationActive={false}
        />
      );
    });

    const tooltipRenderer = (
      payload: Array<{ value: number; stroke: string; name: string }>,
      label: string
    ): JSX.Element => {
      let sum = 0;
      const size = isDefined(payload) ? payload.length : 0;
      const names = [];
      const large = size > 10;
      if (large) {
        payload.sort((a, b) => a.value - b.value);
      }
      for (let j = size - 1; j > 0; j--) {
        const item = payload[j];
        const member = members(item.name);
        if (item.value === 0 || !isDefined(member)) {
          // eslint-disable-next-line no-continue
          continue;
        }
        sum += payload[j].value;
        names.push(
          <div key={sum}>
            <p
              style={
                large || lightMode ? { opacity: 0.6 } : { color: item.stroke }
              }
            >
              {member.username} : {item.value}
            </p>
          </div>
        );
        if (j < size - 11) {
          names.push(
            <div key="msg">
              <i
                style={{
                  color: large || lightMode ? "white" : payload[0].stroke,
                }}
              >
                {j} more not shown...
              </i>
            </div>
          );
          break;
        }
      }
      return (
        <>
          <p>
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(new Date(label ?? 0))}
          </p>
          {names}
          <p>Total: {sum}</p>
        </>
      );
    };

    return (
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={dateFormatter}
            type={"number"}
            scale={"time"}
            domain={["dataMin", "dataMax"]}
          />
          <YAxis scale="sqrt" />
          <Tooltip
            content={<CustomRechartsTooltip renderer={tooltipRenderer} />}
          />
          {accum}
        </AreaChart>
      </ResponsiveContainer>
    );
  }
);
