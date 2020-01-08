import React from "react";
import classNames from "classnames";
import { MockReaction } from "Utility/types";
import Reaction from "Components/DiscordMock/Reaction";
import { StyleObject } from "Utility/types";

type ReactionListProps = {
  reactions: MockReaction[];
  onReact: (r: MockReaction) => void;
  onUnreact: (r: MockReaction) => void;
  style?: StyleObject;
  className?: string;
};

const ReactionList: React.FC<ReactionListProps> = ({
  reactions,
  onReact,
  onUnreact,
  style,
  className
}) => (
  <div className={classNames("reaction-list", className)} style={style}>
    {reactions.map((reaction, index) => (
      <Reaction
        key={index}
        onReact={() => onReact(reaction)}
        onUnreact={() => onUnreact(reaction)}
        {...reaction}
      />
    ))}
  </div>
);

export default ReactionList;
