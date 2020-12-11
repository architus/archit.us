import { styled } from "linaria/react";
import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip, LegendProps } from "recharts";

import { User } from "@app/utility/types";
import { isDefined } from "@architus/lib/utility";
import { CustomRechartsTooltip } from "./CustomRechartsTooltip";

const Styled = {
  OuterContainer: styled.div`
    max-width: 100%;
    height: 100%;
    display: flex;
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

export const PersonalMessagesChart: React.FC<PersonalMessagesChartProps> = React.memo(
  ({ currentUser, totalMessages, memberCounts }) => {
    const me = memberCounts[currentUser.id as string];
    const data = [
      { name: currentUser.username, value: me },
      { name: "other", value: totalMessages - me },
    ];
    const [opacity, setState] = useState({ [currentUser.username]: 1, other: 1 });

    const onMouseLeave = (o) => {
      console.log(opacity)

      setState((opac) => ({
        ...opac,
        [o.value]: 1,
      }));
    };
    const onMouseEnter = (o) => {
      console.log(o)
      console.log(opacity)
      setState((opac) => ({
        ...opac,
        [o.value]: .5,
      }));
    };
    return (
      <ResponsiveContainer>
        <PieChart>
          <Pie
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
              opacity={opacity[currentUser.username]}
            />
            <Cell
              key="other"
              fill="#844EA3"
              strokeWidth={0}
              opacity={opacity.other}
            />
          </Pie>
          <Legend
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            //content={renderLegend}
            layout="vertical"
            verticalAlign="middle"
            align="right"
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
);
