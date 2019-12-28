import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { formatAmPm, getScrollDistance, scrollToBottom } from "Utility";

import MessageClump from "Components/DiscordMock/MessageClump";

import "./style.scss";

const scrollThreshold = 100;

class MessageView extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  componentDidUpdate(_prevProps, _prevState, snapshot) {
    const scrollDistance = getScrollDistance(this.listRef.current);
    const { prevScrollDistance } = snapshot;
    if (scrollDistance !== prevScrollDistance) {
      // Scroll height has changed
      if (prevScrollDistance <= scrollThreshold) {
        scrollToBottom(this.listRef.current);
      }
    }
  }

  getSnapshotBeforeUpdate(_prevProps, _prevState) {
    return {
      prevScrollDistance: getScrollDistance(this.listRef.current)
    };
  }

  render() {
    const { clumps, className, onReact, onUnreact, ...rest } = this.props;
    const makeKey = clump =>
      `${clump.sender.username}=>${formatAmPm(
        clump.timestamp
      )}.${clump.timestamp.getSeconds()}.${clump.timestamp.getMilliseconds()}`;
    return (
      <article
        className={classNames(className, "discord-messages")}
        {...rest}
        ref={this.listRef}
      >
        {clumps.map((clump, index) => (
          <MessageClump
            {...clump}
            first={index === 0}
            last={index === clumps.length - 1}
            key={makeKey(clump)}
            onReact={(messageId, reactionObj) =>
              onReact(index, messageId, reactionObj)
            }
            onUnreact={(messageId, reactionObj) =>
              onUnreact(index, messageId, reactionObj)
            }
          />
        ))}
      </article>
    );
  }
}

export default MessageView;

MessageView.propTypes = {
  clumps: PropTypes.arrayOf(PropTypes.object),
  onReact: PropTypes.func,
  onUnreact: PropTypes.func,
  className: PropTypes.string
};
