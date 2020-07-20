import React, { useMemo } from "react";

import {
  tokenizeFragments,
  TaggedFragment,
  makeTransformer,
  escapeHtml,
  escapeMarkdown,
  convertUnderlines,
} from "@app/utility";
import { UserLike, Role, Channel, Snowflake } from "@app/utility/types";

type MessageRendererProps = {
  content: string;
  authors?: Record<Snowflake, UserLike>;
  roles?: Record<Snowflake, Role>;
  channels?: Record<Snowflake, Channel>;
  emojiNames?: Record<Snowflake, string>;
  onLoadAuthor?: (id: Snowflake) => void;
  onLoadRole?: (id: Snowflake) => void;
  onLoadChannel?: (id: Snowflake) => void;
  onLoadEmoji?: (id: Snowflake) => void;
  customEmojiTooltips?: boolean;
};

const noop = (): null => null;
const emptyRecord: Record<string, unknown> = {};

/**
 * Renders a Discord chat message, along with Markdown rendering, custom emoji
 * rendering, mention rendering, channel mention rendering, and role mention
 * rendering.
 */
const MessageRenderer: React.FC<MessageRendererProps> = ({
  content,
  authors = emptyRecord,
  roles = emptyRecord,
  channels = emptyRecord,
  emojiNames = emptyRecord,
  onLoadAuthor = noop,
  onLoadRole = noop,
  onLoadChannel = noop,
  onLoadEmoji = noop,
  customEmojiTooltips = false,
}) => {
  // Memoize markdown to JSX transformation
  const jsx = useMemo(
    () =>
      transform(content, {
        authors,
        roles,
        channels,
        emojiNames,
        onLoadAuthor,
        onLoadChannel,
        onLoadEmoji,
        onLoadRole,
        customEmojiTooltips,
      }),
    [
      content,
      authors,
      roles,
      channels,
      emojiNames,
      onLoadAuthor,
      onLoadChannel,
      onLoadEmoji,
      onLoadRole,
      customEmojiTooltips,
    ]
  );

  return <>{jsx}</>;
};

export default MessageRenderer;

// ? ============
// ? Helper functions
// ? ================

export type TransformerContext = Required<
  Pick<
    MessageRendererProps,
    | "authors"
    | "roles"
    | "channels"
    | "emojiNames"
    | "onLoadAuthor"
    | "onLoadRole"
    | "onLoadChannel"
    | "onLoadEmoji"
    | "customEmojiTooltips"
  >
>;

// Markdown sanitization pipeline
const sanitizeContent = makeTransformer<TransformerContext>([
  escapeHtml,
  escapeMarkdown,
  convertUnderlines,
]);

/**
 * Sanitizes a single text fragment, escaping HTML/markdown
 * @param context - Transformer context instance
 */
function sanitizeFragment(
  { tag, content }: TaggedFragment,
  context: TransformerContext
): string {
  return tag === "text" ? sanitizeContent(content, context) : content;
}

/**
 * Renders a Discord message into the JSX representation
 * @param content - Raw Discord message markdown content
 * @param context - Transformer context
 */
function transform(
  content: string,
  context: TransformerContext
): React.ReactNode {
  const sanitizedMarkdown: string = tokenizeFragments(content)
    .map((f) => sanitizeFragment(f, context))
    .join("");
  // TODO add custom emojis, twemojis, user mentions, role mentions, and channel mentions
  return sanitizedMarkdown;
}
