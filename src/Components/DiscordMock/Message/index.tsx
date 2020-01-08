import React from "react";
import classNames from "classnames";
import ReactionList from "Components/DiscordMock/ReactionList";
import Placeholder from "Components/Placeholder";
import { MockReaction, MockMessage, StyleObject } from "Utility/types";
import "./style.scss";

type MessageProps = {
  onReact: (r: MockReaction) => void;
  onUnreact: (r: MockReaction) => void;
  placeholderAmount?: number;
  className?: string;
  style?: StyleObject;
} & MockMessage;

const Message: React.FC<MessageProps> = ({
  content,
  mentionsUser,
  edited,
  reactions,
  onReact,
  onUnreact,
  placeholderAmount = 80,
  className,
  style
}) => (
  <div className={className} style={style}>
    <div
      className={classNames("message", {
        "mentions-user": mentionsUser
      })}
    >
      <Placeholder.Multiline
        text={content}
        displayBlank={true}
        amount={placeholderAmount}
        size="0.9em"
        light
      >
        <div
          dangerouslySetInnerHTML={{
            __html: content
          }}
        />
        {edited && <span className="edited">(edited)</span>}
      </Placeholder.Multiline>
    </div>
    <ReactionList
      reactions={reactions}
      onReact={onReact}
      onUnreact={onUnreact}
    />
  </div>
);

export default Message;
