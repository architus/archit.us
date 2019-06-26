import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { formatAMPM } from "../../../util";

import MessageClump from "../MessageClump";

import "./style.scss";

const scrollThreshold = 400;

class MessageView extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  scrollToBottom() {
    const listElement = this.listRef.current;
    const scrollHeight = listElement.scrollHeight;
    const height = listElement.clientHeight;
    const newScrollTop = scrollHeight - height;
    const difference = Math.abs(listElement.scrollTop - newScrollTop);
    if (difference > scrollThreshold) return;
    listElement.scrollTop = Math.max(newScrollTop, 0);
  }

  render() {
    const { clumps, className, onReact, onUnreact, ...rest } = this.props;
    const makeKey = clump =>
      `${clump.sender.username}=>${formatAMPM(
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
