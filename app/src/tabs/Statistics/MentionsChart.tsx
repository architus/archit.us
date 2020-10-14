import React from "react";
import { styled } from "linaria/react";
import { Mention } from "@app/components/Mention";
import { Member } from "@app/utility/types";
import { GuildStatistics } from "@app/store/slices/statistics";


type MentionsChartProps = {
    members: Array<Member>;
};
export const MentionsChart = (props: MentionsChartProps) => {
  console.log(props);
  return (
  <>
    {
      props.members.slice(0, 4).map(member =>
        (<Mention member={member}/>)
      )
    }
  </>
  );
}
