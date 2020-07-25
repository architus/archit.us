import classNames from "classnames";
import { styled } from "linaria/react";
import React, { useContext, useMemo, useCallback } from "react";

import Message from "@app/components/DiscordMock/Message";
import { TransformMessageContext } from "@app/components/DiscordMock/transform";
import Icon from "@app/components/Icon";
import Skeleton from "@app/components/Skeleton";
import UserDisplay from "@app/components/UserDisplay";
import { OtherColors } from "@app/theme/color";
import { toHumanTime } from "@app/utility";
import {
  StyleObject,
  MockReaction,
  MockMessageClump,
  MockMessage,
  MockUser,
} from "@app/utility/types";
import Badge from "@architus/facade/components/Badge";
import { font } from "@architus/facade/theme/typography";
import "./style.scss";

// pseudorandom yet determinate skeleton amount
const skeletonMessageWidth = (index: number): number =>
  100 - ((index * 37) % 10) * 6;

const Styled = {
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
};

type MessageClumpProps = {
  first: boolean;
  last: boolean;
  onReact: (messageId: number, r: MockReaction) => void;
  onUnreact: (messageId: number, r: MockReaction) => void;
  style?: StyleObject;
  className?: string;
} & MockMessageClump;

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
      <div
        ref={ref}
        style={style}
        className={classNames(className, "message-clump", {
          "clump-first": first,
          "clump-last": last,
        })}
      >
        <div>
          <UserDisplay.Avatar
            avatarUrl={avatarUrl}
            discriminator={discriminator}
            circle
            size={44}
          />
        </div>
        <div>
          <div className="message-header">
            <Skeleton.Custom
              value={username}
              height="1.1em"
              width={100}
              light
              className="username"
              style={{ color: nameColor }}
            >
              {username}
              {bot && (
                <Styled.VerifiedBadge>
                  {verified && <Icon name="check" mr="femto" />}
                  bot
                </Styled.VerifiedBadge>
              )}
            </Skeleton.Custom>
            <Skeleton.Text
              text={toHumanTime(new Date(timestamp))}
              size="0.7em"
              width={90}
              light
              inline
              className="timestamp"
            />
          </div>
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
        </div>
      </div>
    );
  }
);

type MessageProps = React.ComponentProps<typeof Message>;
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
        content={result}
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

export default MessageClump;
