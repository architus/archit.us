import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Reaction from "components/DiscordMock/Reaction";

function ReactionList({
  reactions = [],
  className,
  onReact,
  onUnreact,
  ...rest
}) {
  return (
    <div className={classNames("reaction-list", className)} {...rest}>
      {reactions.map((reaction, index) => (
        <Reaction
          key={index}
          {...reaction}
          onReact={() => onReact(reaction)}
          onUnreact={() => onUnreact(reaction)}
        />
      ))}
    </div>
  );
}

export default ReactionList;

ReactionList.propTypes = {
  reactions: PropTypes.arrayOf(PropTypes.object),
  onReact: PropTypes.func,
  onUnreact: PropTypes.func,
  className: PropTypes.string
};
