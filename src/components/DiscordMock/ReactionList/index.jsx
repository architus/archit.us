import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Reaction from "../Reaction";

function ReactionList({ reactions = [], className, ...rest }) {
  return (
    <div className={classNames("reaction-list", className)} {...rest}>
      {reactions.map((reaction, index) => (
        <Reaction key={index} {...reaction} />
      ))}
    </div>
  );
}

export default ReactionList;

ReactionList.propTypes = {
  reactions: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string
};
