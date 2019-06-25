import marked from "marked";
import twemoji from "twemoji";
import aliases from "./aliases.json";
import { hasEmoji, get, unemojify } from "node-emoji";
import {
  escapeHtml,
  escapeMarkdown,
  processIfNotEmptyOrNil,
  isNil
} from "../../util";

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

const convertUnicodeEmoji = text =>
  twemoji
    .parse(text)
    .replace(emojiHtmlRegex, (_match, p1) => `alt="${unemojify(p1)}"`);

const codeRegex = /`(.+)`/g;
const reverseEntities = {
  "&lsqb;": "[",
  "&rsqb;": "]",
  "&excl;": "!",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">"
};
const applyExemptions = text =>
  text.replace(codeRegex, (_match, p1) => {
    let intermediate = p1;
    Object.keys(reverseEntities).forEach(entity => {
      intermediate = intermediate.replace(entity, reverseEntities[entity]);
    });
    return `\`${intermediate}\``;
  });

const underlineRegex = /__(.*?)__/gs;
const mentionRegex = /(?:[<]|(?:&lt;))[@]([-0-9]+)(?:[>]|(?:&gt;))/g;
const emojiRegex = /:([a-zA-Z0-9_-]+):/g;
const emojiHtmlRegex = /alt="(.*?)"/g;
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
  const emojiTransformed = mentionTransformed.replace(
    emojiRegex,
    (_match, p1) => {
      let shortcode = p1;
      let hasShortcode = hasEmoji(shortcode);
      const wrapped = `:${shortcode}:`;
      // Try to replace by discord-specific aliases
      if (!hasShortcode) {
        const potentialAlias = aliases[shortcode];
        if (!isNil(potentialAlias)) {
          shortcode = potentialAlias;
          hasShortcode = true;
        }
      }

      if (!hasShortcode) {
        return wrapped; // unchanged
      } else {
        return twemoji
          .parse(get(shortcode))
          .replace(emojiHtmlRegex, `alt="${wrapped}"`);
      }
    }
  );
  const unicodeEmojiTransformed = convertUnicodeEmoji(emojiTransformed);
  return {
    transformed: unicodeEmojiTransformed,
    mentions
  };
};

export const transformMessage = (rawText, users = {}) => {
  const escaped = escapeMarkdown(escapeHtml(rawText));
  const processedEscaped = applyExemptions(escaped);
  const { transformed, mentions } = applyExtensions(processedEscaped, users);
  const markdown = marked(transformed);
  return { result: markdown, mentions };
};

export const transformReaction = emoji => convertUnicodeEmoji(emoji);
