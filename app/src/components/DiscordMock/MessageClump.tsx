import { styled } from "linaria/react";
import { transparentize } from "polished";
import React, { useContext, useMemo, useCallback } from "react";
import { FaCheck } from "react-icons/fa";

import Message, { MessageProps } from "@app/components/DiscordMock/Message";
import { TransformMessageContext } from "@app/components/DiscordMock/transform";
import UserDisplay from "@app/components/UserDisplay";
import { OtherColors } from "@app/theme/color";
import { toHumanTime } from "@app/utility";
import {
  MockReaction,
  MockMessageClump,
  MockMessage,
  MockUser,
} from "@app/utility/types";
import Badge from "@architus/facade/components/Badge";
import { gap } from "@architus/facade/theme/spacing";
import { font } from "@architus/facade/theme/typography";

// pseudorandom yet determinate skeleton amount
const skeletonMessageWidth = (index: number): number =>
  100 - ((index * 37) % 10) * 6;

const Styled = {
  Clump: styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    border-bottom: 1px solid ${OtherColors.DiscordMessageDivider};
    padding-bottom: 1rem;
    padding-top: 0.8rem;

    &[data-first="true"] {
      padding-top: 1.35rem;
    }

    &[data-last="true"] {
      border-bottom: none;
    }
  `,
  Avatar: styled.div`
    flex-grow: 0;

    &:hover {
      opacity: 0.85;
    }
  `,
  Messages: styled.div`
    margin-left: 1.1rem;
    flex-grow: 1;
    margin-right: 1rem;
  `,
  MessageHeader: styled.div`
    margin-top: -0.25rem;
    margin-bottom: 0.125rem;

    .username {
      font-weight: 600;
      margin-right: 0.5rem;
      font-size: 1.05rem !important;

      &:hover {
        text-decoration: underline;
      }
    }

    .timestamp {
      color: ${transparentize(0.6, OtherColors.DiscordFg)};
      font-size: 0.8rem !important;
    }
  `,
  VerifiedBadge: styled(Badge)`
    background-color: ${OtherColors.Discord};
    color: white;
    text-transform: uppercase;
    margin-left: 0.5rem;
    border-radius: 4px;
    font-size: 68%;
    padding: 0.3em 0.45em 0.25em 0.4em;
    vertical-align: middle;
    position: relative;
    top: -2px;
    font-family: ${font("headings")};
    font-weight: 700;
  `,
  CheckIcon: styled(FaCheck)`
    margin-right: ${gap.femto};
  `,
};

export type MessageClumpProps = {
  first: boolean;
  last: boolean;
  onReact: (messageId: number, r: MockReaction) => void;
  onUnreact: (messageId: number, r: MockReaction) => void;
  style?: React.CSSProperties;
  className?: string;
} & MockMessageClump;

/**
 * Shows a grouped clump of messages with a common header (avatar/username/timestamp),
 * used in a Discord Mock
 */
const MessageClump: React.FC<MessageClumpProps> = React.forwardRef(
  (
    {
      sender,
      messages,
      timestamp,
      first,
      last,
      onReact,
      onUnreact,
      style,
      className,
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const {
      discriminator,
      avatarUrl,
      username,
      nameColor,
      verified,
      bot,
    } = sender;
    return (
      <Styled.Clump
        ref={ref}
        style={style}
        className={className}
        data-first={first ? "true" : undefined}
        data-last={last ? "true" : undefined}
      >
        <Styled.Avatar>
          <UserDisplay.Avatar
            avatarUrl={avatarUrl}
            discriminator={discriminator}
            circle
            size={44}
          />
        </Styled.Avatar>
        <Styled.Messages>
          <Styled.MessageHeader>
            <span className="username" style={{ color: nameColor }}>
              {username}
              {bot && (
                <Styled.VerifiedBadge>
                  {verified && <Styled.CheckIcon />}
                  bot
                </Styled.VerifiedBadge>
              )}
            </span>
            <span className="timestamp">
              {toHumanTime(new Date(timestamp))}
            </span>
          </Styled.MessageHeader>
          {messages.map((message, index) => (
            <RenderedMessage
              key={message.id}
              sender={sender}
              genericOnReact={onReact}
              genericOnUnreact={onUnreact}
              skeletonAmount={skeletonMessageWidth(index)}
              message={message}
            />
          ))}
        </Styled.Messages>
      </Styled.Clump>
    );
  }
);

export default MessageClump;

// ? ==============
// ? Sub-components
// ? ==============

type RenderedMessageProps = {
  message: MockMessage;
  sender: MockUser;
  genericOnReact: MessageClumpProps["onReact"];
  genericOnUnreact: MessageClumpProps["onUnreact"];
} & Pick<MessageProps, "skeletonAmount">;

/**
 * Memoized message which transforms its content via `useMemo`
 */
const RenderedMessage: React.FC<RenderedMessageProps> = React.memo(
  ({ message, sender, genericOnReact, genericOnUnreact, skeletonAmount }) => {
    const { transform, context } = useContext(TransformMessageContext);
    const { result, mentions } = useMemo(
      () => transform(message, sender, context),
      [transform, message, sender, context]
    );
    return (
      <Message
        html={result}
        edited={message.edited}
        reactions={message.reactions}
        mentionsUser={mentions.includes(context.thisUser.id)}
        key={message.id}
        onReact={useCallback(
          (r: MockReaction): void => genericOnReact(message.id, r),
          [genericOnReact, message.id]
        )}
        onUnreact={useCallback(
          (r: MockReaction): void => genericOnUnreact(message.id, r),
          [genericOnUnreact, message.id]
        )}
        skeletonAmount={skeletonAmount}
      />
    );
  }
);
