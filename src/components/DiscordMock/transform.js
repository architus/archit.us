import marked from "marked";
import twemoji from "twemoji";
import emojiLibrary from "emoji-js";
import { escapeHtml, escapeMarkdown, processIfNotEmptyOrNil } from "../../util";

const emoji = new emojiLibrary.EmojiConvertor();

emoji.img_sets.apple.path = "https://twemoji.maxcdn.com/36x36/";

const markedRenderer = new marked.Renderer();
markedRenderer.link = function(href, title, text) {
  return `<a href="${href}" title="${title}" rel="noopener" target="_blank">${text}</a>`;
};

marked.setOptions({
  renderer: markedRenderer,
  gfm: true,
  tables: false,
  breaks: false,
  sanitize: false
});

const underlineRegex = /__(.*)__/gs;
const mentionRegex = /(?:[<]|(?:&lt;))[@]([-0-9]+)(?:[>]|(?:&gt;))/g;
const applyExtensions = (markdown, users) => {
  const underlineTransformed = markdown.replace(
    underlineRegex,
    (_match, p1) => `<u>${p1}</u>`
  );
  let mentions = [];
  const mentionTransformed = underlineTransformed.replace(
    mentionRegex,
    (_match, p1) => {
      const id = parseInt(p1);
      if (!mentions.includes(id)) mentions.push(id);
      return `<span class="mention">@${processIfNotEmptyOrNil(
        users[parseInt(p1)],
        user => user.username
      )}</span>`;
    }
  );
  return {
    transformed: mentionTransformed,
    mentions
  };
};

export const transformMessage = (rawText, users = {}) => {
  const escaped = escapeMarkdown(escapeHtml(rawText));
  const { transformed, mentions } = applyExtensions(escaped, users);
  const markdown = marked(transformed);
  // alert(emoji.replace_mode);
  var colonsReplaced = emoji.replace_colons(transformed);
  // TODO emoji
  return { result: colonsReplaced, mentions };
};
