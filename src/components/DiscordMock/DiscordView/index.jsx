import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import MessageView from "../MessageView";
import Input from "../Input";

import "./style.scss";

class DiscordView extends React.Component {
  constructor(props) {
    super(props);
    this.listView = React.createRef();
  }

  scrollToBottom() {
    this.listView.current.scrollToBottom();
  }

  render() {
    const { clumps = [], channelName, className, onSend, ...rest } = this.props;
    return (
      <div className={classNames("discord-view", className)} {...rest}>
        <MessageView
          clumps={clumps}
          style={{ flexGrow: 1 }}
          ref={this.listView}
        />
        <hr className="input-border" />
        <Input channelName={channelName} onSend={onSend} />
      </div>
    );
  }
}

export default DiscordView;

DiscordView.propTypes = {
  clumps: PropTypes.arrayOf(PropTypes.object),
  channelName: PropTypes.string,
  onSend: PropTypes.func,
  className: PropTypes.string
};
