import { Extension, makeFakeWebhookUser } from "./util";

export class CustomEmojiExtension extends Extension {
  constructor(context, commands) {
    super(context, commands);
    this.fakeWebhookUser = makeFakeWebhookUser(this.thisUser);
  }

  onSend({ message }) {
    if (message.trim() === "!help") {
      // Let help commands fall through
      return true;
    } else if (message.trim() === "!emotes") {
      // Display custom emotes in list command
      const message = {
        content: "uwu",
        sender: this.autBotUser,
        messageId: this.provisionId()
      };
      this.sendMessage(message);
      return false;
    } else {
      // Determine if message has
      console.log(this.emoji);
      console.log("Processing normal message");
      return false;
    }
  }
}
