import React, { useCallback } from "react";
import classNames from "classnames";
import { MockReaction } from "Utility/types";
import "./style.scss";

type ReactionProps = {
  onReact: () => void;
  onUnreact: () => void;
} & MockReaction;

const Reaction: React.FC<ReactionProps> = ({
  onReact,
  onUnreact,
  emoji,
  number,
  userHasReacted
}) => (
  <button
    className={classNames("reaction", { active: userHasReacted })}
    onClick={useCallback(() => {
      if (userHasReacted) onUnreact();
      else onReact();
    }, [userHasReacted, onUnreact, onReact])}
  >
    <span dangerouslySetInnerHTML={{ __html: emoji }} />
    <span>{number}</span>
  </button>
);

export default Reaction;
