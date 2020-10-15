import React from "react";
import { styled } from "linaria/react";
import { Mention } from "@app/components/Mention";
import { Member, Snowflake } from "@app/utility/types";
import { color } from "@architus/facade/theme/color";
import { GuildStatistics } from "@app/store/slices/statistics";
import ReactDataGrid from "react-data-grid";
import { isDefined } from "@architus/lib/utility";

const Styled = {
  Container: styled.div`
    display: flex;
    //justify-content: space-between;
  `,
  Mention: styled(Mention)`
    max-width: 100%;
  `,
  Dots: styled.div`
    flex: 1;
    //border-bottom: dotted 1px ${color("text")};
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
  const counts: Array<{member: Member, count: number}> = [];
  Object.entries(mentionCounts).forEach(([id, count]) => {
    if (isDefined(members.get(id as Snowflake))) {
      counts.push({member: members.get(id as Snowflake), count: count})
    }
  })
  counts.sort((a, b) => b.count - a.count);

  return (
    <>
      {counts.slice(0, 4).map(m => (
        <Styled.Container key={m.member.id}>
          <Mention member={m.member} />
          <Styled.Dots>{m.count}</Styled.Dots>
        </Styled.Container>
      ))}
    </>
  );
}
