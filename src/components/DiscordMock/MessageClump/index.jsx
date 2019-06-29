import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { processIfNotEmptyOrNil, toHumanTime } from "utility";
import { Badge } from "react-bootstrap";

import UserDisplay from "components/UserDisplay";
import Placeholder from "components/Placeholder";
import Message from "components/DiscordMock/Message";

import "./style.scss";

// pseudorandom yet determinate placeholder amount
const placeholderMessageWidth = index => 100 - ((index * 37) % 10) * 6;

class MessageClump extends PureComponent {
  render() {
    const {
      sender = {},
      timestamp,
      className,
      first = false,
      last = false,
      forwardedRef,
      messages = [],
      onReact = () => null,
      onUnreact = () => null,
      ...rest
    } = this.props;
    const {
      avatarUrl,
      clientId,
      avatarHash,
      discriminator,
      username,
      nameColor = "white",
      bot = false
    } = sender;
    const avatarProps = { avatarUrl, clientId, avatarHash, discriminator };
    return (
      <div
        className={classNames(className, "message-clump", {
          "clump-first": first,
          "clump-last": last
        })}
        ref={forwardedRef}
        {...rest}
      >
        <div>
          <UserDisplay.Avatar {...avatarProps} circle size={44} />
        </div>
        <div>
          <div className="message-header">
            <Placeholder.Custom
              value={username}
              height="1.1em"
              width={100}
              light
              className="username"
              style={{ color: nameColor }}
            >
              {username}
              {bot ? <Badge variant="bot">bot</Badge> : null}
            </Placeholder.Custom>
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
              key={message.messageId}
              contentHtml={message.content}
              mentionsUser={message.mentionsUser}
              reactions={message.reactions}
              onReact={reaction => onReact(message.messageId, reaction)}
              onUnreact={reaction => onUnreact(message.messageId, reaction)}
              edited={message.edited}
              amount={placeholderMessageWidth(index)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default MessageClump;

MessageClump.propTypes = {
  sender: PropTypes.object,
  className: PropTypes.string,
  timestamp: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]),
  first: PropTypes.bool,
  last: PropTypes.bool,
  messages: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  ),
  forwardedRef: PropTypes.func,
  onReact: PropTypes.func,
  onUnreact: PropTypes.func
};
