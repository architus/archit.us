import React, { useContext, useMemo, useCallback } from "react";
import classNames from "classnames";
import { toHumanTime } from "Utility";
import {
  StyleObject,
  MockReaction,
  MockMessageClump,
  MockMessage,
  MockUser,
} from "Utility/types";
import { Badge, BadgeProps } from "react-bootstrap";
import UserDisplay from "Components/UserDisplay";
import Placeholder from "Components/Placeholder";
import Message from "Components/DiscordMock/Message";
import { TransformMessageContext } from "Components/DiscordMock/transform";
import "./style.scss";

// pseudorandom yet determinate placeholder amount
const placeholderMessageWidth = (index: number): number =>
  100 - ((index * 37) % 10) * 6;

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
    const { discriminator, avatarUrl, username, nameColor, bot } = sender;
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
            <Placeholder.Custom
              value={username}
              height="1.1em"
              width={100}
              light
              className="username"
              style={{ color: nameColor }}
            >
              {username}
              {bot && (
                <Badge variant={"bot" as BadgeProps["variant"]}>bot</Badge>
              )}
            </Placeholder.Custom>
            <Placeholder.Text
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
              placeholderAmount={placeholderMessageWidth(index)}
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
} & Pick<MessageProps, "placeholderAmount">;

/**
 * Memoized message which transforms its content via `useMemo`
 */
const RenderedMessage: React.FC<RenderedMessageProps> = React.memo(
  ({
    message,
    sender,
    genericOnReact,
    genericOnUnreact,
    placeholderAmount,
  }) => {
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
        placeholderAmount={placeholderAmount}
      />
    );
  }
);

export default MessageClump;
