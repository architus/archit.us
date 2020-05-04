import React, { useCallback } from "react";
import classNames from "classnames";
import {
  formatAmPm,
  getScrollDistance,
  scrollToBottom,
  isDefined,
} from "Utility";
import { MockMessageClump, StyleObject } from "Utility/types";
import MessageClump from "Components/DiscordMock/MessageClump";
import {
  DiscordMockDispatchContext,
  react,
  unreact,
} from "Components/DiscordMock/actions";
import "./style.scss";
import { AnyAction } from "redux";

const scrollThreshold = 100;

function makeKey(clump: MockMessageClump): string {
  const date = new Date(clump.timestamp);
  const timestamp = formatAmPm(date);
  const seconds = date.getSeconds();
  const millis = date.getMilliseconds();
  return `${clump.sender.username}=>${timestamp}.${seconds}.${millis}`;
}

type MessageViewProps = {
  clumps: MockMessageClump[];
  style?: StyleObject;
  className?: string;
};

type MessageViewSnapshot = {
  prevScrollDistance: number;
};

type MessageViewState = {};

class MessageView extends React.PureComponent<
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
  ): void {
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
        prevScrollDistance: getScrollDistance(this.list.current),
      };
    }
    return {
      prevScrollDistance: 0,
    };
  }

  render(): React.ReactNode {
    const { clumps, style, className } = this.props;
    return (
      <article
        className={classNames(className, "discord-messages")}
        ref={this.list}
        style={style}
      >
        <DiscordMockDispatchContext.Consumer>
          {({ dispatch }): React.ReactNode =>
            clumps.map((clump, index) => (
              <RenderedMessageClump
                {...clump}
                first={index === 0}
                last={index === clumps.length - 1}
                key={makeKey(clump)}
                index={index}
                dispatch={dispatch}
              />
            ))
          }
        </DiscordMockDispatchContext.Consumer>
      </article>
    );
  }
}

type MessageClumpProps = React.ComponentProps<typeof MessageClump>;
type RenderedMessageClumpProps = {
  index: number;
  dispatch: React.Dispatch<AnyAction>;
} & Omit<MessageClumpProps, "onReact" | "onUnreact">;

/**
 * Id-aware component to stabilize onReact/onUnreact callbacks
 */
const RenderedMessageClump: React.FC<RenderedMessageClumpProps> = React.memo(
  ({ index, dispatch, ...rest }) => (
    <MessageClump
      {...rest}
      onReact={useCallback(
        (id, reaction): void =>
          dispatch(react({ clumpIndex: index, id, reaction })),
        [dispatch, index]
      )}
      onUnreact={useCallback(
        (id, reaction): void =>
          dispatch(unreact({ clumpIndex: index, id, reaction })),
        [dispatch, index]
      )}
    />
  )
);

export default MessageView;
