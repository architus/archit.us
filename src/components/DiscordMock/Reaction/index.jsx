import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./style.scss";

class Reaction extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    const { onReact, onUnreact, userHasReacted } = this.props;
    if (userHasReacted) onUnreact();
    else onReact();
  }

  render() {
    const { emoji, number = 1, userHasReacted = false } = this.props;
    return (
      <button
        className={classNames("reaction", { active: userHasReacted })}
        onClick={this.handleOnClick}
      >
        <span dangerouslySetInnerHTML={{ __html: emoji }} />
        <span>{number}</span>
      </button>
    );
  }
}

export default Reaction;

Reaction.propTypes = {
  emoji: PropTypes.string,
  onReact: PropTypes.func,
  onUnreact: PropTypes.func,
  number: PropTypes.number,
  userHasReacted: PropTypes.bool
};
