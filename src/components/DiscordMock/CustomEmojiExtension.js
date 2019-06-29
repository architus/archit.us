import { Extension, makeFakeWebhookUser } from "components/DiscordMock/util";
import { transformMessage } from "components/DiscordMock/transform";

const deleteDelay = 400;
export class CustomEmojiExtension extends Extension {
  constructor(emoji, context, commands) {
    super(context, commands);
    this.fakeWebhookUser = makeFakeWebhookUser(this.thisUser);
    this.emoji = emoji;
  }

  replaceEmoji(fragment) {
    const emojiMap = this.emoji;
    let accum = fragment;
    Object.keys(emojiMap).forEach(emoji => {
      const imgPath = emojiMap[emoji];
      accum = accum.replace(
        `:${emoji}:`,
        this.formatEmojiImage(emoji, imgPath)
      );
    });
    return accum;
  }

  formatEmojiImage(shortcode, imagePath) {
    return `<img class="emoji" draggable="false" alt=":${shortcode}:" src="${imagePath}">`;
  }

  destruct() {
    if (this.deleteTimer) clearInterval(this.deleteTimer);
  }

  formatListString() {
    const emoteList = Object.keys(this.emoji)
      .map(e => `:${e}:`)
      .join("\n");
    return `${"```"}Availible emotes\n=====================\n${emoteList}${"```"}`;
  }

  onSend({ message, messageId }) {
    if (message.trim() === "!help") {
      // Let help commands fall through
      return true;
    } else if (message.trim() === "!emotes") {
      // Display custom emotes in list command
      const message = {
        content: this.formatListString(),
        sender: this.autBotUser,
        messageId: this.provisionId()
      };
      this.sendMessage(message);
      return false;
    } else {
      // Determine if message has any of the emoji
      const context = { users: this.users, thisUser: this.thisUser };
      const original = transformMessage(message, context).result;
      const processed = transformMessage(
        message,
        context,
        this.replaceEmoji.bind(this)
      ).result;

      if (original !== processed) {
        // Emotes existed in original message
        this.deleteTimer = setTimeout(() => {
          this.deleteTimer = null;
          this.deleteMessage(messageId);
          this.sendMessage({
            content: message,
            customTransformer: this.replaceEmoji.bind(this),
            sender: this.fakeWebhookUser,
            messageId: this.provisionId()
          });
        }, deleteDelay);
      }
      return false;
    }
  }
}
