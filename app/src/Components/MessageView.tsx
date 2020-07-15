import React from "react";
import MessageRenderer from "Components/MessageRenderer";
import { Snowflake } from "Utility/types";

type MessageViewProps = {
  content: string;
  guildId?: Snowflake;
};

/**
 * Renders a Discord message content, including Markdown transformation and intelligent
 * pool connection that automatically loads relevant entities in order to display
 * fully rendered roles, emojis, etc.
 */
const MessageView: React.FC<MessageViewProps> = ({ content }) => {
  // TODO hook up to store
  return <MessageRenderer content={content} />;
};

export default React.memo(MessageView);
