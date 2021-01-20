import { styled } from "linaria/react";
import { lighten } from "polished";
import React, { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Sector,
} from "recharts";

import { User } from "@app/utility/types";
import { mode, ColorMode } from "@architus/facade/theme/color";
import { formatNum } from "@architus/lib/utility";

const Styled = {
  OuterContainer: styled.div`
    max-width: 100%;
    height: 100%;
    display: flex;
  `,
  Label: styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    //display: inline-block;
    max-width: 75%;
  `,
  Tooltip: styled.text`
    font-weight: bold;
    font-size: 0.75em;
    ${mode(ColorMode.Dark)} {
      text-shadow: 0 0 2px rgba(0, 0, 50, 0.5);
    }
  `,
};

export type PersonalMessagesChartProps = {
  currentUser: User;
  totalMessages: number;
  memberCounts: Record<string, number>;
};

type renderActiveShapeProps = {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  value: number;
};

/**
 * Custom render component for the inside of recharts PieChart to display an absolute value in the center.
 */
const renderActiveShape = (props: renderActiveShapeProps): JSX.Element => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    value,
  } = props;
  return (
    <g>
      <Styled.Tooltip
        x={cx}
        y={cy}
        dy={4}
        textAnchor="middle"
        fill={lighten(0.05, fill)}
      >
        {formatNum(value)}
      </Styled.Tooltip>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

/**
 * Create a cute little pie chart to display the ratio of the user's messages to the guild's total
 * Displays the actual values in the middle on mouseover.
 */
export const PersonalMessagesChart: React.FC<PersonalMessagesChartProps> = React.memo(
  ({ currentUser, totalMessages, memberCounts }) => {
    const me = memberCounts[currentUser.id as string] ?? 0;
    const data = [
      { name: currentUser.username, value: me },
      { name: "other", value: totalMessages - me },
    ];
    const [state, setState] = useState({ activeIndex: -1 });

    const formatter = (value: string, _: unknown): JSX.Element => {
      return <Styled.Label>{value}</Styled.Label>;
    };

    const onPieEnter = (_: unknown, index: number): void => {
      setState((s) => ({
        ...s,
        activeIndex: index,
      }));
    };

    const onMouseLeave = (_: unknown): void => {
      setState((s) => ({
        ...s,
        activeIndex: -1,
      }));
    };
    const onMouseEnter = (o: { value: string }): void => {
      setState((s) => ({ ...s, activeIndex: o.value === "other" ? 1 : 0 }));
    };
    return (
      <ResponsiveContainer>
        <PieChart>
          <Pie
            activeShape={renderActiveShape}
            activeIndex={state.activeIndex}
            onMouseEnter={onPieEnter}
            onMouseLeave={onMouseLeave}
            data={data}
            innerRadius={"65%"}
            outerRadius={"90%"}
            fill="#844EA3"
            paddingAngle={5}
            dataKey="value"
          >
            <Cell
              key="me"
              fill="#ba5095"
              strokeWidth={0}
              opacity={state.activeIndex === 1 ? 0.5 : 1}
            />
            <Cell
              key="other"
              fill="#844EA3"
              strokeWidth={0}
              opacity={state.activeIndex === 0 ? 0.5 : 1}
            />
          </Pie>
          <Legend
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            layout="vertical"
            verticalAlign="middle"
            align="right"
            formatter={formatter}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
);
