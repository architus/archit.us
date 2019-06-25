import marked from "marked";
import twemoji from "twemoji";
import aliases from "./aliases.json";
import { hasEmoji, get, unemojify } from "node-emoji";
import { escapeHtml, escapeMarkdown, isNil } from "../../util";
import { splitFragments, allMatches } from "../../util/string";
import { mapValues } from "lodash";

// ? ===================
// ? Markdown rendering
// ? ===================

const markdownRenderer = new marked.Renderer();
// Control element-specific rendering of markdown
const markdownOverrides = {
  // Make all auto-links external
  link: (href, title, text) =>
    `<a href="${href}" title="${title}" rel="noopener" target="_blank">${text}</a>`,
  // Disable rendering of following elements:
  heading: (_text, _level, raw) => raw,
  hr: () => "",
  blockquote: quote => quote,
  list: body => body,
  listitem: text => text,
  checkbox: () => ""
};
marked.setOptions({
  renderer: Object.assign(markdownRenderer, markdownOverrides),
  gfm: true, // needed for auto-linking
  tables: false, // disable tables
  breaks: false,
  sanitize: false // content is sanitized manually in the pipeline
});

// Invokes marked Markdown parser and renderer
function transformMarkdown(source) {
  return marked(source);
}

// ? ===================
// ? Pseudo-AST parser
// ? ===================

const inlineCodeRegex = /(?:`[^`\n\r]+`)+/g;
const blacklistedFragments = ["``"];

// Builds a pseudo AST by splicing the source string and separating code &
// non-code blocks
function buildPseudoAST(source) {
  const fragments = splitFragments(source, inlineCodeRegex);
  const passingFragments = fragments.filter(
    f => !blacklistedFragments.includes(f)
  );
  const tagged = tagFragments(passingFragments);
  return tagged;
}

// Tags each fragment according to whether it is an inline code block or not
function tagFragments(sourceFragments) {
  return sourceFragments.map(fragment => {
    const tag = inlineCodeRegex.test(fragment) ? "code" : "text";
    return {
      fragment,
      tag
    };
  });
}

// ? ===================
// ? Processing pipeline
// ? ===================

// Map of fragment tag to pipeline used. Pipelines can either be a function
// mapping <(string, context obj) => string> or an array of such functions
const fragmentTransformers = {
  code: fragment => `<code>${escapeHtml(fragment.slice(1, -1))}</code>`,
  text: [
    escapeHtml,
    escapeMarkdown,
    convertUnderlines,
    convertMentions,
    convertDiscordEmoji,
    convertUnicodeEmoji,
    transformMarkdown
  ]
};

const emojiTransformers = [convertUnicodeEmoji];

// Map of extension attribute to extension function. Used to add addition
// outgoing context to the transformed result
const attributeExtensions = {
  mentions: allMentionedIds
};

// Transforms the incoming message, applying the entire pipeline and adding
// extension attributes as neccessary. Can include an optional context for
// pipeline processors to use
export function transformMessage(source = "", context = {}) {
  const attributes = mapValues(attributeExtensions, func =>
    func(source, context)
  );
  const pseudoAST = buildPseudoAST(source);
  const transformedAST = transformPseudoAST(
    pseudoAST,
    context,
    fragmentTransformers
  );
  const joinedResult = transformedAST.map(frag => frag.fragment).join("");
  return {
    ...attributes,
    result: joinedResult
  };
}

// Transforms the incoming reaction using a simplified pipeline
export function transformReaction(emoji = "", context = {}) {
  return applyTransformers(emoji, context, emojiTransformers);
}

// Applies a transformation pipeline (types described above)
function applyFragmentTransformer(fragment, context, transformer) {
  if (typeof transformer === "function") {
    return transformer(fragment, context);
  } else {
    return applyTransformers(fragment, context, transformer);
  }
}

// Applies a multi-part transformation pipeline
function applyTransformers(fragment, context, transformers) {
  let currentFragmentValue = fragment;
  transformers.forEach(t => {
    currentFragmentValue = t(currentFragmentValue, context);
  });
  return currentFragmentValue;
}

// Transforms the given pseudo AST by applying the corresponding transformation
// pipeline for each tag encountered
function transformPseudoAST(ast, context, transformers) {
  return ast.map(frag => ({
    tag: frag.code,
    fragment: transformers[frag.tag]
      ? applyFragmentTransformer(frag.fragment, context, transformers[frag.tag])
      : frag.fragment
  }));
}

// ? ===================
// ? Processing steps
// ? ===================

const imageAltRegex = /alt="(.*?)"/g;
// Corrects twemoji-generated image tag alt's to allow for copying of shortcodes
function correctEmojiAlts(fragment) {
  return fragment.replace(
    imageAltRegex,
    (_match, p1) => `alt="${unemojify(p1)}"`
  );
}

// Gets every unique mentioned ID from the source text as an array
function allMentionedIds(source) {
  let mentionIds = [];
  const allMentions = allMatches(source, mentionRegex);
  allMentions.forEach(mentionText => {
    const id = parseInt(mentionText.slice(2, -1));
    if (!mentionIds.includes(id)) mentionIds.push(id);
  });
  return mentionIds;
}

const underlineRegex = /__(.*?)__/gs;
// Applies Discord's custom underline markdown syntax to the given fragment
function convertUnderlines(fragment) {
  return fragment.replace(underlineRegex, (_match, p1) => `<u>${p1}</u>`);
}

const mentionRegex = /(?:[<]|(?:&lt;))[@]([-0-9]+)(?:[>]|(?:&gt;))/g;
// Applies Discord's user mention syntax to the given fragment
function convertMentions(fragment, context) {
  const { users } = context;
  if (isNil(users)) return fragment;
  return fragment.replace(mentionRegex, (_match, p1) => {
    const id = parseInt(p1);
    const content = isNil(users[id]) ? id : users[id].username;
    return `<span class="mention">@${content}</span>`;
  });
}

const discordEmojiRegex = /:([a-zA-Z0-9_-]+):/g;
// Converts Discord emojis (shortcode format) to twemoji images, optionally
// using Discord's custom set of shortcode aliases if neccessary
function convertDiscordEmoji(fragment) {
  return fragment.replace(discordEmojiRegex, (_match, p1) => {
    let shortcode = p1;
    let hasShortcode = hasEmoji(shortcode);
    const wrapped = `:${shortcode}:`;
    // Try to replace by Discord-specific aliases if not yet resolved
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
      return correctEmojiAlts(twemoji.parse(get(shortcode)));
    }
  });
}

// Converts unicode emoji to image nodes with corrected alt tags
function convertUnicodeEmoji(fragment) {
  return correctEmojiAlts(twemoji.parse(fragment));
}
