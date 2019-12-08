import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import MessageView from "components/DiscordMock/MessageView";
import Input from "components/DiscordMock/Input";

import "./style.scss";

function DiscordView({
  clumps = [],
  channelName,
  className,
  onSend,
  onReact,
  onUnreact,
  onInputFocus,
  onInputChange,
  inputValue,
  displayError = false,
  ...rest
}) {
  return (
    <div className={classNames("discord-view", className)} {...rest}>
      <MessageView
        clumps={clumps}
        style={{ flexGrow: 1 }}
        onReact={onReact}
        onUnreact={onUnreact}
      />
      <hr className="input-border" />
      <Input
        channelName={channelName}
        onSend={onSend}
        onFocus={onInputFocus}
        onChange={onInputChange}
        value={inputValue}
      />
      <div
        className={classNames("error-overlay", {
          "show-error": displayError
        })}
      >
        <div className="error-inner">
          <span className="error-image" />
          <h4>Uh oh!</h4>
          <p>
            It looks like there’s been an error connecting to the architus API
          </p>
        </div>
      </div>
    </div>
  );
}

export default DiscordView;

DiscordView.propTypes = {
  clumps: PropTypes.arrayOf(PropTypes.object),
  channelName: PropTypes.string,
  onSend: PropTypes.func,
  onReact: PropTypes.func,
  onUnreact: PropTypes.func,
  className: PropTypes.string,
  onInputFocus: PropTypes.func,
  onInputChange: PropTypes.func,
  inputValue: PropTypes.string,
  displayError: PropTypes.bool
};
