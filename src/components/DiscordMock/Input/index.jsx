import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./style.scss";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.props.onSend();
    }
  }

  render() {
    const { className, channelName, onSend, ...rest } = this.props;
    return (
      <div className={classNames(className, "discord-input")}>
        <input
          type="text"
          {...rest}
          placeholder={`Message #${channelName}`}
          onKeyDown={this.handleKeyPress}
        />
      </div>
    );
  }
}

export default Input;

Input.propTypes = {
  className: PropTypes.string,
  channelName: PropTypes.string,
  onSend: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string
};
