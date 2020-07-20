import classNames from "classnames";
import React from "react";

import Reaction from "@app/components/DiscordMock/Reaction";
import { MockReaction, StyleObject } from "@app/utility/types";

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
  className,
}) => (
  <div className={classNames("reaction-list", className)} style={style}>
    {reactions.map((reaction, index) => (
      <Reaction
        key={index}
        onReact={(): void => onReact(reaction)}
        onUnreact={(): void => onUnreact(reaction)}
        {...reaction}
      />
    ))}
  </div>
);

export default ReactionList;
