import React from "react";
import {
  MockMessage,
  TransformMessage,
  DiscordMockContext,
  MockUser,
} from "Utility/types";
import {
  makeTransformer,
  escapeHtml,
  escapeMarkdown,
  convertUnderlines,
  replaceRelativeMentions,
  convertGlobalMentions,
  convertMentions,
  convertDiscordEmoji,
  convertUnicodeEmoji,
  TransformerStep,
  renderCode,
  allMentionedIds,
  tokenizeFragments,
  TaggedFragment,
  transformMarkdown,
  emojiToShortcode,
  architusUser,
  isDefined,
} from "Utility";

export type TransformerContext = {
  users: Record<MockUser["id"], MockUser>;
  thisUserId: MockUser["id"];
};

const emojiTransformer: TransformerStep = convertUnicodeEmoji;
const outgoingMessageTransformer: TransformerStep = emojiToShortcode;
const transformMessageText = makeTransformer<TransformerContext>([
  escapeHtml,
  escapeMarkdown,
  convertUnderlines,
  replaceRelativeMentions,
  convertGlobalMentions,
  convertMentions,
  convertDiscordEmoji,
  convertUnicodeEmoji,
]);
const transformMessageCode: TransformerStep<TransformerContext> = renderCode;

/**
 * Transforms a mock discord message using the default transformation pipeline
 * @param message - Original message string
 * @param _ - Sender (unused)
 * @param context - Discord mock context object
 */
export function transformMockMessage(
  message: MockMessage,
  _: MockUser,
  context: DiscordMockContext,
  customTransformer?: TransformerStep
): ReturnType<TransformMessage> {
  const transformContext: TransformerContext = {
    thisUserId: context.thisUser.id,
    users: context.users,
  };
  const mentions = allMentionedIds(message.content, transformContext);
  const taggedFragments = tokenizeFragments(message.content);
  const mappedFragments: TaggedFragment[] = taggedFragments.map(
    ({ tag, content }): TaggedFragment => {
      if (tag === "text") {
        let result: string = transformMessageText(content, transformContext);
        if (isDefined(customTransformer)) {
          result = customTransformer(
            result,
            (transformContext as unknown) as void
          );
        }
        return {
          tag,
          content: result,
        };
      }

      return {
        tag,
        content: transformMessageCode(content, transformContext),
      };
    }
  );
  const joinedResult = mappedFragments
    .map((fragment) => fragment.content)
    .join("");
  const markdownProcessed = transformMarkdown(joinedResult);
  return {
    result: markdownProcessed,
    mentions,
  };
}

/**
 * Transforms the incoming reaction using a simplified pipeline
 * @param emoji - Server emoji representation
 */
export function transformReaction(emoji: string): string {
  return emojiTransformer(emoji);
}

/**
 * Transforms the outgoing raw message for being sent on the network
 * (needed to ensure uniform representation of emoji across client/server)
 * @param emoji - Local emoji representation
 */
export function transformOutgoingMessage(emoji: string): string {
  return outgoingMessageTransformer(emoji);
}

export const TransformMessageContext = React.createContext<{
  transform: TransformMessage;
  context: DiscordMockContext;
}>({
  context: {
    thisUser: architusUser,
    architusUser,
    users: { [architusUser.id]: architusUser },
    guildId: 0,
  },
  transform: transformMockMessage,
});
