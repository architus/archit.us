import { styled } from "linaria/react";
import React from "react";

import { Mention } from "@app/components/Mention";
import { Member, Snowflake } from "@app/utility/types";
import { isDefined, formatNum } from "@architus/lib/utility";

const Styled = {
  Container: styled.div`
    display: flex;
    font-size: 0.875rem;
  `,
  Mention: styled(Mention)`
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 85%;
    overflow: hidden;
  `,
  Dots: styled.div`
    flex: 1;
    text-align: right;
  `,
};

type MentionsChartProps = {
  mentionCounts: Record<string, number>;
  members: Map<Snowflake, Member>;
};

export const MentionsChart: React.FC<MentionsChartProps> = ({
  mentionCounts,
  members,
  ...props
}) => {
  const counts: Array<{ member: Member; count: number }> = [];
  Object.entries(mentionCounts).forEach(([id, count]) => {
    if (isDefined(members.get(id as Snowflake))) {
      counts.push({ member: members.get(id as Snowflake) as Member, count });
    }
  });
  counts.sort((a, b) => b.count - a.count);

  return (
    <>
      {counts.slice(0, 5).map((m) => (
        <Styled.Container key={m.member.id}>
          <div style={{ maxWidth: "85%" }}>
            <Styled.Mention member={m.member} />
          </div>
          <Styled.Dots>{formatNum(m.count)}</Styled.Dots>
        </Styled.Container>
      ))}
    </>
  );
};
