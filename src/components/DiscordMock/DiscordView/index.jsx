import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import MessageView from "../MessageView";
import Input from "../Input";

import "./style.scss";

function DiscordView({ clumps = [], channelName, className, onSend, ...rest }) {
  return (
    <div className={classNames("discord-view", className)} {...rest}>
      <MessageView clumps={clumps} style={{ flexGrow: 1 }} />
      <hr className="input-border" />
      <Input channelName={channelName} onSend={onSend} />
    </div>
  );
}

export default DiscordView;

DiscordView.propTypes = {
  clumps: PropTypes.arrayOf(PropTypes.object),
  channelName: PropTypes.string,
  onSend: PropTypes.func,
  className: PropTypes.string
};
