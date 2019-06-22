import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./style.scss";

function Input({ className, channelName, ...rest }) {
  return (
    <div className={classNames(className, "discord-input")}>
      <input type="text" {...rest} placeholder={`Message #${channelName}`} />
    </div>
  );
}

export default Input;

Input.propTypes = {
  className: PropTypes.string,
  channelName: PropTypes.string
};
