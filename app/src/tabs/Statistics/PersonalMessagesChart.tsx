import React from "react";
import { styled } from "linaria/react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Snowflake, Member, User } from "@app/utility/types";
import { isDefined } from "@architus/lib/utility";

const Styled = {
  OuterContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
  `,
  LabelContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    position: relative;

    & > * {
      &::before {
        content: "";
        text-align: center;
        display: block;
        position: absolute;
        left: -15px;
        //bottom: -3px;
        margin-top: 9.5px;
        width: 10px;
        height: 10px;
        z-index: 1;
        border-radius: 50%;
      }
    }

    & : first-child {
      &::before {
        background-color: #ba5095;
      }
    }

    & : nth-child(2) {
      &::before {
        background-color: #844EA3;
      }
    }

  `
}


export type PersonalMessagesChartProps = {
  currentUser: User;
  totalMessages: number;
  memberCounts: Record<string, number>;
}

export const PersonalMessagesChart: React.FC<PersonalMessagesChartProps> = React.memo(({
  currentUser,
  totalMessages,
  memberCounts,
}) => {
  const me = memberCounts[currentUser.id as string];
  console.log(me);
  console.log(totalMessages);
  const data = [
    { name: "me", value: me},
    { name: "not me", value: totalMessages - me}
  ];
  return (
    <Styled.OuterContainer>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx={"40%"}
            cy={"50%"}
            innerRadius={"65%"}
            outerRadius={"90%"}
            fill="#844EA3"
            paddingAngle={5}
            dataKey="value"
          >
            <Cell key="cell-0" fill="#ba5095" strokeWidth={0} />
            <Cell key="cell-1" fill="#844EA3" strokeWidth={0} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <Styled.LabelContainer>
        <p>{currentUser.username}</p>
        <p>other</p>
      </Styled.LabelContainer>
    </Styled.OuterContainer>
  )
})
