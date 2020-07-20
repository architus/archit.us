import { transformMockMessage } from "@app/components/DiscordMock/transform";
import {
  Extension,
  makeFakeWebhookUser,
} from "@app/components/DiscordMock/util";
import { TransformerStep, makeTransformer, isDefined } from "@app/utility";
import {
  DiscordMockContext,
  DiscordMockCommands,
  TransformMessage,
  MockMessage,
  MockUser,
} from "@app/utility/types";

const deleteDelay = 400;

function formatEmojiImage(shortcode: string, imagePath: string): string {
  return `<img class="emoji" draggable="false" alt=":${shortcode}:" src="${imagePath}">`;
}

export class CustomEmojiExtension extends Extension {
  // Map of shortcode => img url for all custom emoji
  private emojiMap: Record<string, string>;

  private deleteTimers: Set<number>;

  constructor(
    emoji: Record<string, string>,
    context: DiscordMockContext,
    commands: DiscordMockCommands
  ) {
    super(context, commands);
    this.emojiMap = emoji;
    this.deleteTimers = new Set<number>();
  }

  destruct(): void {
    this.deleteTimers.forEach((d) => window.clearTimeout(d));
    this.deleteTimers.clear();
  }

  onSend(message: string, id: number): boolean {
    if (message.trim() === "!help") {
      // Let help commands fall through
      return true;
    }

    if (message.trim() === "!emotes") {
      // Display custom emotes in list command
      this.commands.sendMessage(
        this.formatListString(),
        this.context.architusUser
      );
      return false;
    }

    // Determine if message has any of the emoji
    const messageObj: MockMessage = {
      content: message,
      id,
      edited: false,
      reactions: [],
    };
    const original = transformMockMessage(
      messageObj,
      this.context.thisUser,
      this.context
    ).result;
    const processed = transformMockMessage(
      messageObj,
      this.context.thisUser,
      this.context,
      this.replaceEmoji.bind(this)
    ).result;

    if (original !== processed) {
      // Emotes existed in original message
      const timeout = window.setTimeout(() => {
        this.deleteTimers.delete(id);
        this.commands.deleteMessage(id);
        this.commands.sendMessage(
          message,
          makeFakeWebhookUser(this.context.thisUser)
        );
      }, deleteDelay);
      this.deleteTimers.add(timeout);
    }
    return true;
  }

  replaceEmoji(fragment: string): string {
    const { emojiMap } = this;
    let accum = fragment;
    Object.keys(emojiMap).forEach((emoji) => {
      const imgPath = emojiMap[emoji];
      accum = accum.replace(`:${emoji}:`, formatEmojiImage(emoji, imgPath));
    });
    return accum;
  }

  formatListString(): string {
    const emoteList = Object.keys(this.emojiMap)
      .map((e) => `:${e}:`)
      .join("\n");
    return `\`\`\`Available emotes\n=====================\n${emoteList}\`\`\``;
  }

  // eslint-disable-next-line class-methods-use-this
  wrapTransform(transform: TransformMessage): TransformMessage {
    return (
      message: MockMessage,
      sender: MockUser,
      context: DiscordMockContext,
      customTransformer?: TransformerStep
    ): ReturnType<TransformMessage> => {
      // Is webhook user?
      if (sender.bot && sender.username === context.thisUser.username) {
        const replaceEmoji = this.replaceEmoji.bind(this);
        const transformer = isDefined(customTransformer)
          ? makeTransformer([customTransformer, replaceEmoji])
          : replaceEmoji;
        return transform(message, sender, context, transformer);
      }
      return transform(message, sender, context, customTransformer);
    };
  }
}
