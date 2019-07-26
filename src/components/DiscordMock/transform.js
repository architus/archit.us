import marked from "marked";
import twemoji from "twemoji";
import aliases from "components/DiscordMock/aliases.json";
import { hasEmoji, get, unemojify } from "node-emoji";
import { escapeHtml, escapeMarkdown, isNil } from "utility";
import { splitFragments, allMatches } from "utility/string";
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
  checkbox: () => "",
  codespan: code => `\`${code}\``
};
const markedOptions = {
  renderer: Object.assign(markdownRenderer, markdownOverrides),
  gfm: true, // needed for auto-linking
  tables: false, // disable tables
  breaks: true,
  sanitize: false // content is sanitized manually in the pipeline
};
marked.setOptions(markedOptions);
const markdownLexer = new marked.Lexer(markedOptions);
const markdownParser = new marked.Parser(markedOptions);

// Invokes marked Markdown parser and renderer
function transformMarkdown(source) {
  const tokens = markdownLexer.lex(source);
  const html = markdownParser.parse(tokens);
  return html;
}

// ? ===================
// ? Pseudo-AST parser
// ? ===================

const codeRegex = /(?:```[^`]*```|`[^`]*`)+/;
const codeRegexGlobal = /(?:```[^`]*```|`[^`]*`)/g;
const blacklistedFragments = ["``"];

// Builds a pseudo AST by splicing the source string and separating code &
// non-code blocks
function buildPseudoAST(source) {
  const fragments = splitFragments(source, codeRegexGlobal);
  const passingFragments = fragments.filter(
    f => !blacklistedFragments.includes(f)
  );
  const tagged = tagFragments(passingFragments);
  return tagged;
}

// Tags each fragment according to whether it is an inline code block or not
function tagFragments(sourceFragments) {
  return sourceFragments.map(fragment => {
    const tag = codeRegex.test(fragment) ? "code" : "text";
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
  code: renderCode,
  text: [
    escapeHtml,
    escapeMarkdown,
    convertUnderlines,
    replaceRelativeMentions,
    convertGlobalMentions,
    convertMentions,
    convertDiscordEmoji,
    convertUnicodeEmoji
  ]
};

const emojiTransformer = [convertUnicodeEmoji];

const outgoingMessageTransformer = [emojiToShortcode];

// Map of extension attribute to extension function. Used to add addition
// outgoing context to the transformed result
const attributeExtensions = {
  mentions: allMentionedIds
};

// Transforms the incoming message, applying the entire pipeline and adding
// extension attributes as neccessary. Can include an optional context for
// pipeline processors to use
export function transformMessage(
  source = "",
  context = {},
  customTransformer = fragment => fragment
) {
  const attributes = mapValues(attributeExtensions, func =>
    func(source, context)
  );
  const pseudoAST = buildPseudoAST(source);
  const transformedAST = transformPseudoAST(pseudoAST, context, {
    ...fragmentTransformers,
    text: [...fragmentTransformers["text"], customTransformer]
  });
  const joinedResult = transformedAST.map(frag => frag.fragment).join("");
  const markdownProcessed = transformMarkdown(joinedResult);
  return {
    ...attributes,
    result: markdownProcessed
  };
}

// Transforms the incoming reaction using a simplified pipeline
export function transformReaction(emoji = "", context = {}) {
  return applyFragmentTransformer(emoji, context, emojiTransformer);
}

// Transforms the outgoing raw message for being sent on the network
// (needed to ensure uniform representation of emoji across client/server)
export function transformOutgoingMessage(message = "", context = {}) {
  return applyFragmentTransformer(message, context, outgoingMessageTransformer);
}

// Applies a transformation pipeline (types described above)
export function applyFragmentTransformer(fragment, context, transformer) {
  if (typeof transformer === "function") {
    return transformer(fragment, context);
  } else {
    return applyTransformers(fragment, context, transformer);
  }
}

// Applies a multi-part transformation pipeline
export function applyTransformers(fragment, context, transformers) {
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

const blockCodeRegex = /```([^`]*)```/;
const inlineCodeRegex = /`([^`]*)`/;
// Renders inline or block code nodes
function renderCode(fragment) {
  return fragment
    .replace(
      blockCodeRegex,
      (_match, p1) => `<pre><code>${escapeHtml(p1)}</code></pre>`
    )
    .replace(inlineCodeRegex, (_match, p1) => `<code>${escapeHtml(p1)}</code>`);
}

const imageAltRegex = /alt="(.*?)"/g;
// Corrects twemoji-generated image tag alt's to allow for copying of shortcodes
function correctEmojiAlts(fragment) {
  return fragment.replace(
    imageAltRegex,
    (_match, p1) => `alt="${unemojify(p1)}"`
  );
}

const underlineRegex = /__(.*?)__/gs;
// Applies Discord's custom underline markdown syntax to the given fragment
function convertUnderlines(fragment) {
  return fragment.replace(underlineRegex, (_match, p1) => `<u>${p1}</u>`);
}

const relativeMentionRegex = /(?:[<]|(?:&lt;))@%_CLIENT_ID_%(?:[>]|(?:&gt;))/g;
// Finds every match of the relative mention regex and converts it to a mention
// that mentions the thisUser
function replaceRelativeMentions(fragment, context) {
  return fragment.replace(relativeMentionRegex, `<@${context.clientId}>`);
}

const globalMentions = ["everyone", "here"];
// Finds every match of either of the global mentions and replaces it with an
// actual mention
function convertGlobalMentions(fragment) {
  let processed = fragment;
  for (let i in globalMentions) {
    const mention = `@${globalMentions[i]}`;
    processed = processed.replace(
      mention,
      `<span class="mention">${mention}</span>`
    );
  }
  return processed;
}

// Gets every unique mentioned ID from the source text as an array
function allMentionedIds(source, context) {
  // first, try to find any global mentions
  for (let i in globalMentions) {
    const mention = `@${globalMentions[i]}`;
    if (source.indexOf(mention) !== -1) {
      return Object.keys(context.users).map(
        clientId => context.users[clientId]
      );
    }
  }

  // replace relative mentions to properly count them
  source = replaceRelativeMentions(source, context);
  let mentionIds = [];
  const allMentions = allMatches(source, mentionRegex);
  allMentions.forEach(mentionText => {
    const id = parseInt(mentionText.slice(2, -1));
    if (!mentionIds.includes(id)) mentionIds.push(id);
  });
  return mentionIds;
}

const mentionRegex = /(?:[<]|(?:&lt;))@!?([-0-9]+)(?:[>]|(?:&gt;))/g;
// Applies Discord's user mention syntax to the given fragment
export function convertMentions(fragment, context) {
  const { users } = context;
  if (isNil(users)) return fragment;
  return fragment.replace(mentionRegex, (_match, p1) => {
    const id = parseInt(p1);
    const content = isNil(users[id]) ? id : users[id].username;
    return `<span class="mention">@${content}</span>`;
  });
}

const discordEmojiRegex = /:([a-zA-Z0-9~_()-]+):/g;
// Converts Discord emojis (shortcode format) to twemoji images, optionally
// using Discord's custom set of shortcode aliases if neccessary
export function convertDiscordEmoji(fragment) {
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
export function convertUnicodeEmoji(fragment) {
  return correctEmojiAlts(twemoji.parse(fragment));
}

// Converts unicode emoji to their shortcode representations
function emojiToShortcode(fragment) {
  return unemojify(fragment);
}
