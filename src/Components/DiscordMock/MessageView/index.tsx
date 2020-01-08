import React from "react";
import classNames from "classnames";
import {
  formatAmPm,
  getScrollDistance,
  scrollToBottom,
  isDefined
} from "Utility";
import { MockMessageClump, StyleObject, MockReaction } from "Utility/types";
import MessageClump from "Components/DiscordMock/MessageClump";
import "./style.scss";

const scrollThreshold = 100;

function makeKey(clump: MockMessageClump): string {
  const timestamp = formatAmPm(clump.timestamp);
  const seconds = clump.timestamp.getSeconds();
  const millis = clump.timestamp.getMilliseconds();
  return `${clump.sender.username}=>${timestamp}.${seconds}.${millis}`;
}

type MessageViewProps = {
  clumps: MockMessageClump[];
  onReact: (clumpIndex: number, id: number, reaction: MockReaction) => void;
  onUnreact: (clumpIndex: number, id: number, reaction: MockReaction) => void;
  className?: string;
  style?: StyleObject;
};

type MessageViewSnapshot = {
  prevScrollDistance: number;
};

type MessageViewState = {};

class MessageView extends React.Component<
  MessageViewProps,
  MessageViewState,
  MessageViewSnapshot
> {
  private list: React.RefObject<HTMLDivElement>;

  constructor(props: MessageViewProps) {
    super(props);
    this.list = React.createRef();
  }

  componentDidUpdate(
    _prevProps: MessageViewProps,
    _prevState: MessageViewState,
    snapshot: MessageViewSnapshot
  ) {
    if (isDefined(this.list.current)) {
      const scrollDistance = getScrollDistance(this.list.current);
      const { prevScrollDistance } = snapshot;
      if (scrollDistance !== prevScrollDistance) {
        // Scroll height has changed
        if (prevScrollDistance <= scrollThreshold) {
          scrollToBottom(this.list.current);
        }
      }
    }
  }

  getSnapshotBeforeUpdate(
    _prevProps: MessageViewProps,
    _prevState: MessageViewState
  ): MessageViewSnapshot {
    if (isDefined(this.list.current)) {
      return {
        prevScrollDistance: getScrollDistance(this.list.current)
      };
    }
    return {
      prevScrollDistance: 0
    };
  }

  render() {
    const { clumps, onReact, onUnreact, className, style } = this.props;
    return (
      <article
        className={classNames(className, "discord-messages")}
        ref={this.list}
        style={style}
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
