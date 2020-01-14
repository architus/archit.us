import React, { useContext, useMemo } from "react";
import classNames from "classnames";
import { toHumanTime } from "Utility";
import {
  StyleObject,
  MockReaction,
  MockMessageClump,
  MockMessage,
  MockUser
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
      className
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
          "clump-last": last
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
              onReact={(r: MockReaction): void => onReact(message.id, r)}
              onUnreact={(r: MockReaction): void => onUnreact(message.id, r)}
              placeholderAmount={placeholderMessageWidth(index)}
              message={message}
            />
          ))}
        </div>
      </div>
    );
  }
);

type RenderedMessageProps = {
  message: MockMessage;
  sender: MockUser;
} & Pick<
  React.ComponentProps<typeof Message>,
  "onReact" | "onUnreact" | "placeholderAmount"
>;

/**
 * Memoized message which transforms its content via `useMemo`
 */
const RenderedMessage: React.FC<RenderedMessageProps> = ({
  message,
  sender,
  onReact,
  onUnreact,
  placeholderAmount
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
      onReact={onReact}
      onUnreact={onUnreact}
      placeholderAmount={placeholderAmount}
    />
  );
};

export default MessageClump;
