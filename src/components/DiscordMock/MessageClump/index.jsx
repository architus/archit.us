import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { processIfNotEmptyOrNil, toHumanTime } from "../../../util";

import UserDisplay from "../../UserDisplay";
import Placeholder from "../../Placeholder";
import Message from "../Message";

import "./style.scss";

function MessageClump({
  avatarUrl,
  clientId,
  avatarHash,
  username,
  timestamp,
  className,
  color = "white",
  last = false,
  messages = [],
  ...rest
}) {
  const avatarProps = { avatarUrl, clientId, avatarHash };
  return (
    <div
      className={classNames(className, "message-clump", { "clump-last": last })}
    >
      <div>
        <UserDisplay.Avatar {...avatarProps} circle size={44} />
      </div>
      <div>
        <div className="message-header">
          <Placeholder.Text
            text={username}
            size="1em"
            width={100}
            light
            inline
            className="username"
            style={{ color }}
          />
          <Placeholder.Text
            text={processIfNotEmptyOrNil(timestamp, t => toHumanTime(t))}
            size="0.7em"
            width={90}
            light
            inline
            className="timestamp"
          />
        </div>
        {messages.map((message, index) => (
          <Message
            key={`${index}-${message.substring(10)}`}
            content={message}
            amount={100 - ((index * 37) % 10) * 6}
          />
        ))}
      </div>
    </div>
  );
}

export default MessageClump;

MessageClump.propTypes = {
  avatarUrl: PropTypes.string,
  clientId: PropTypes.string,
  avatarHash: PropTypes.string,
  className: PropTypes.string,
  username: PropTypes.string,
  timestamp: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]),
  last: PropTypes.bool,
  messages: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.string
};
