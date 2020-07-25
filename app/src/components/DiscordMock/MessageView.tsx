import { styled } from "linaria/react";
import React, { useCallback } from "react";
import { AnyAction } from "redux";

import {
  DiscordMockDispatchContext,
  react,
  unreact,
} from "@app/components/DiscordMock/actions";
import MessageClump from "@app/components/DiscordMock/MessageClump";
import {
  formatAmPm,
  getScrollDistance,
  scrollToBottom,
  isDefined,
} from "@app/utility";
import { MockMessageClump, StyleObject } from "@app/utility/types";
import { OtherColors } from "@app/theme/color";
import { discordScrollbar } from "@architus/facade/theme/mixins";

const scrollThreshold = 100;

const Styled = {
  List: styled.article`
    overflow-y: auto;
    overflow-x: hidden;
    color: inherit;
    margin-right: 12px;

    ${discordScrollbar({
      background: OtherColors.DiscordBg,
      thumb: OtherColors.DiscordScrollThumb,
      track: OtherColors.DiscordScrollTrack,
    })}
  `,
};

export type MessageViewProps = {
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
      <Styled.List ref={this.list} className={className} style={style}>
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
      </Styled.List>
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

// ? =================
// ? Utility functions
// ? =================

function makeKey(clump: MockMessageClump): string {
  const date = new Date(clump.timestamp);
  const timestamp = formatAmPm(date);
  const seconds = date.getSeconds();
  const millis = date.getMilliseconds();
  return `${clump.sender.username}=>${timestamp}.${seconds}.${millis}`;
}
