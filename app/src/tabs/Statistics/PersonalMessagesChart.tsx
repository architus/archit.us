import { styled } from "linaria/react";
import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip, LegendProps, Sector } from "recharts";

import { lighten } from "polished";

import { User } from "@app/utility/types";
import { isDefined } from "@architus/lib/utility";
import { CustomRechartsTooltip } from "./CustomRechartsTooltip";

const Styled = {
  OuterContainer: styled.div`
    max-width: 100%;
    height: 100%;
    display: flex;
  `,
  Label: styled.span`
    //margin: 30px 0;
    //padding: 30px 0;
  `,
  LabelContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    position: relative;
    max-width: 100%;
    margin: 15px;
    //height: 100%;
    //flex: 1 0 auto;

    & > * {
      max-width: 100%;
      //text-overflow: ellipsis;
      &::before {
        content: "";
        text-align: center;
        display: block;
        position: absolute;
        left: -15px;
        margin-top: 9.5px;
        width: 10px;
        height: 10px;
        z-index: 1;
        border-radius: 50%;
      }
    }

    & > :first-child::before {
      background-color: #ba5095;
    }
    & > :nth-child(2)::before {
      background-color: #844ea3;
    }
  `,
};

export type PersonalMessagesChartProps = {
  currentUser: User;
  totalMessages: number;
  memberCounts: Record<string, number>;
};

const renderLegend = (props: LegendProps): JSX.Element => {
  const { payload } = props;
  console.log(payload)
  return (
    <Styled.LabelContainer>
      {payload.map((entry, index) => (
        <p key={index}>{entry.value}</p>
      ))}
    </Styled.LabelContainer>
  );
};

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  return (
    <g>
      <text
        style={{ fontWeight: "bold", fontSize: "0.75em", textShadow: "0 0 2px rgba(0, 0, 30, 0.6)" }}
        x={cx}
        y={cy}
        dy={-4}
        textAnchor="middle"
        fill={lighten(0.05, "#ba5095")}
      >
        47,251
      </text>
      <text
        style={{ fontWeight: "bold", fontSize: "0.75em", textShadow: "0 0 2px rgba(0, 0, 30, 0.6)" }}
        x={cx}
        y={cy}
        dy={12}
        textAnchor="middle"
        fill={lighten(0.05, "#844EA3")}
      >
        750,020
      </text>
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

export const PersonalMessagesChart: React.FC<PersonalMessagesChartProps> = React.memo(
  ({ currentUser, totalMessages, memberCounts }) => {
    const me = memberCounts[currentUser.id as string];
    const data = [
      { name: currentUser.username, value: me },
      { name: "other", value: totalMessages - me },
    ];
    const [state, setState] = useState({ activeIndex: 0 });

    const formatter = (value, entry) => {
      return <Styled.Label>{value}</Styled.Label>;
    };

    const onPieEnter = (data, index) => {
      console.log(data);
      console.log(index);
      setState((s) => ({
        ...s,
        activeIndex: index,
      }));
    };

    const onMouseLeave = (o) => {
      setState((s) => ({
        ...s,
        activeIndex: 0,
      }));
    };
    const onMouseEnter = (o) => {
       setState((s) => ({ ...s, activeIndex: 0 }));
    };
    return (
      <ResponsiveContainer>
        <PieChart>
          <Pie
            activeShape={renderActiveShape}
            activeIndex={state.activeIndex}
            // label={true}
            // labelLine={true}
            onMouseEnter={onPieEnter}
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
              opacity={1}
            />
            <Cell
              key="other"
              fill="#844EA3"
              strokeWidth={0}
              opacity={1}
            />
          </Pie>
          <Legend
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            //content={renderLegend}
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
