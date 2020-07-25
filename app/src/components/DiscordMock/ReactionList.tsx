import { styled } from "linaria/react";
import React from "react";

import Reaction from "@app/components/DiscordMock/Reaction";
import { MockReaction, StyleObject } from "@app/utility/types";

const Styled = {
  ReactionList: styled.div`
    display: flex;
    flex-direction: row;
  `,
};

export type ReactionListProps = {
  reactions: MockReaction[];
  onReact: (r: MockReaction) => void;
  onUnreact: (r: MockReaction) => void;
  style?: StyleObject;
  className?: string;
};

/**
 * Shows a horizontal list of reactions, used in a Discord mock
 */
const ReactionList: React.FC<ReactionListProps> = ({
  reactions,
  onReact,
  onUnreact,
  style,
  className,
}) => (
  <Styled.ReactionList className={className} style={style}>
    {reactions.map((reaction, index) => (
      <Reaction
        key={index}
        onReact={(): void => onReact(reaction)}
        onUnreact={(): void => onUnreact(reaction)}
        {...reaction}
      />
    ))}
  </Styled.ReactionList>
);

export default ReactionList;
