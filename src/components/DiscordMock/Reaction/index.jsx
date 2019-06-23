import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./style.scss";

function Reaction({ emoji, number = 1, userHasReacted = false }) {
  return (
    <button className={classNames("reaction", { active: userHasReacted })}>
      <span dangerouslySetInnerHTML={{ __html: emoji }} />
      <span>{number}</span>
    </button>
  );
}

export default Reaction;

Reaction.propTypes = {
  emoji: PropTypes.string,
  number: PropTypes.number,
  userHasReacted: PropTypes.bool
};
