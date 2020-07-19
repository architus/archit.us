import React, { useCallback } from "react";
import classNames from "classnames";
import { MockReaction, StyleObject } from "Utility/types";
import "./style.scss";

type ReactionProps = {
  onReact: () => void;
  onUnreact: () => void;
  style?: StyleObject;
  className?: string;
} & MockReaction;

const Reaction: React.FC<ReactionProps> = ({
  onReact,
  onUnreact,
  emoji,
  number,
  userHasReacted,
  style,
  className,
}) => (
  <button
    className={classNames("reaction", { active: userHasReacted }, className)}
    style={style}
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
