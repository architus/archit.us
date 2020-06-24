import marked from "marked";
import twemoji from "twemoji";
import { unemojify, hasEmoji, get } from "node-emoji";
import {
  replaceAll,
  escapeHtml,
  allMatches,
  splitFragments,
} from "../primitives";
import { isNil } from "../data";
import { MockUser } from "../types";
import aliases from "./discordAliases.json";

// ? ==================
// ? Markdown rendering
// ? ==================

const markdownRenderer = new marked.Renderer();
const markdownOverrides = {
  // Make all auto-links external
  link: (href: string, title: string, text: string): string =>
    `<a href="${href}" title="${title}" rel="noopener" target="_blank">${text}</a>`,
  // Disable rendering of following elements:
  heading: (_text: unknown, _level: unknown, raw: string): string => raw,
  hr: (): string => "",
  blockquote: (quote: string): string => quote,
  list: (body: string): string => body,
  listitem: (text: string): string => text,
  checkbox: (): string => "",
  codespan: (code: string): string => `\`${code}\``,
};
const markedOptions = {
  renderer: Object.assign(markdownRenderer, markdownOverrides),
  gfm: true, // needed for auto-linking
  tables: false, // disable tables
  breaks: true,
  sanitize: false, // content is sanitized manually in the pipeline
};
marked.setOptions(markedOptions);
const markdownLexer = new marked.Lexer(markedOptions);
const markdownParser = new marked.Parser(markedOptions);

/**
 * Transform markdown to html, applying rules/formatting specific to Discord Mocks
 * @param fragment - Original raw markdown text
 */
export function transformMarkdown(fragment: string): string {
  const tokens = markdownLexer.lex(fragment);
  const html = markdownParser.parse(tokens);
  // Clear tokens list (array is re-used between calls to `lex`)
  tokens.splice(0, tokens.length);
  return html;
}

// ? ======================
// ? Tagged fragment parser
// ? ======================

export type TaggedFragment = {
  content: string;
  tag: "code" | "text";
};

const codeRegex = /(?:```[^`]*```|`[^`]*`)+/;
const codeRegexGlobal = /(?:```[^`]*```|`[^`]*`)/g;
const blacklistedFragments = ["``"];

/**
 * Tokenizes code and text fragments, returning an array of tagged fragments
 * @param source - Original text
 */
export function tokenizeFragments(source: string): TaggedFragment[] {
  const fragments = splitFragments(source, codeRegexGlobal);
  const passingFragments = fragments.filter(
    (f: string): boolean => !blacklistedFragments.includes(f)
  );
  const tagged = tagFragments(passingFragments);
  return tagged;
}

/**
 * Tags each fragment according to whether it is an inline code block or not
 * @param sourceFragments - Split fragment strings
 */
function tagFragments(sourceFragments: string[]): TaggedFragment[] {
  return sourceFragments.map((content) => {
    const tag = codeRegex.test(content) ? "code" : "text";
    return {
      content,
      tag,
    };
  });
}

// ? ============================
// ? Discord mock transform steps
// ? ============================

const blockCodeRegex = /```([^`]*)```/;
const inlineCodeRegex = /`([^`]*)`/;
/**
 * Renders inline or block code nodes
 * @param fragment - Original text to process
 */
export function renderCode(fragment: string): string {
  return fragment
    .replace(
      blockCodeRegex,
      (_match, p1) => `<pre><code>${escapeHtml(p1)}</code></pre>`
    )
    .replace(inlineCodeRegex, (_match, p1) => `<code>${escapeHtml(p1)}</code>`);
}

const imageAltRegex = /alt="(.*?)"/g;
/**
 * Corrects twemoji-generated image tag alt's to allow for copying of shortcodes
 * @param fragment - Original text to process
 */
export function correctEmojiAlts(fragment: string): string {
  return fragment.replace(
    imageAltRegex,
    (_match, p1) => `alt="${unemojify(p1)}"`
  );
}

const underlineRegex = /__(.*?)__/gs;
/**
 * Applies Discord's custom underline markdown syntax to the given fragment
 * @param fragment - Original text to process
 */
export function convertUnderlines(fragment: string): string {
  return fragment.replace(underlineRegex, (_match, p1) => `<u>${p1}</u>`);
}

const relativeMentionRegex = /(?:[<]|(?:&lt;))@%_CLIENT_ID_%(?:[>]|(?:&gt;))/g;
/**
 * Finds every match of the relative mention special regex and converts it to a
 * mention that mentions the thisUser
 * @param fragment - Original text to process
 * @param context - Context object containing thisUserId, the id of the thisUser
 */
export function replaceRelativeMentions(
  fragment: string,
  context: { thisUserId: MockUser["id"] }
): string {
  return fragment.replace(relativeMentionRegex, `<@${context.thisUserId}>`);
}

const globalMentions = ["everyone", "here"];
/**
 * Finds every match of either of the global mentions and replaces it with an
 * actual mention
 * @param fragment - Original text to process
 */
export function convertGlobalMentions(fragment: string): string {
  let processed = fragment;
  for (const mentionTrigger of globalMentions) {
    const mention = `@${mentionTrigger}`;
    processed = processed.replace(
      mention,
      `<span class="mention">${mention}</span>`
    );
  }
  return processed;
}

/**
 * Gets every unique mentioned ID from the source text as an array
 * @param fragment - Original text to process
 * @param context - Context object containing user map and user id of thisUser
 */
export function allMentionedIds(
  fragment: string,
  context: {
    users: Record<MockUser["id"], MockUser>;
    thisUserId: MockUser["id"];
  }
): MockUser["id"][] {
  // First, try to find any global mentions. if found, then all ids are mentioned
  for (const mentionTrigger of globalMentions) {
    const mention = `@${mentionTrigger}`;
    if (fragment.indexOf(mention) !== -1) {
      return Object.keys(context.users);
    }
  }

  // Replace relative mentions to properly count them
  const withoutRelative = replaceRelativeMentions(fragment, context);
  const mentionIds: MockUser["id"][] = [];
  const allMentions = allMatches(withoutRelative, mentionRegex);
  allMentions.forEach((mentionText: string): void => {
    const id = mentionText.slice(2, -1);
    if (!mentionIds.includes(id)) mentionIds.push(id);
  });
  return mentionIds;
}

const mentionRegex = /(?:[<]|(?:&lt;))@!?([-0-9]+)(?:[>]|(?:&gt;))/g;
/**
 * Applies Discord's user mention syntax to the given fragment
 * @param fragment - Original text to process
 * @param context - Context object containing user map
 */
export function convertMentions(
  fragment: string,
  context: {
    users: Record<MockUser["id"], MockUser>;
    thisUserId: MockUser["id"];
  }
): string {
  return fragment.replace(mentionRegex, (_match, id) => {
    const content = isNil(context.users[id]) ? id : context.users[id].username;
    return `<span class="mention">@${content}</span>`;
  });
}

const discordEmojiRegex = /:([a-zA-Z0-9~_()-]+):/g;
/**
 * Converts Discord emojis (shortcode format) to twemoji images, optionally
 * using Discord's custom set of shortcode aliases if neccessary
 * @param fragment - Original text to process
 */
export function convertDiscordEmoji(fragment: string): string {
  return fragment.replace(discordEmojiRegex, (_match, p1) => {
    let shortcode = p1;
    let hasShortcode = hasEmoji(shortcode);
    const wrapped = `:${shortcode}:`;
    // Try to replace by Discord-specific aliases if not yet resolved
    if (!hasShortcode) {
      const potentialAlias = aliases[shortcode as keyof typeof aliases];
      if (!isNil(potentialAlias)) {
        shortcode = potentialAlias;
        hasShortcode = true;
      }
    }

    if (!hasShortcode) {
      return wrapped; // unchanged
    }
    return correctEmojiAlts(twemoji.parse(get(shortcode)));
  });
}

// Converts unicode emoji to image nodes with corrected alt tags
export function convertUnicodeEmoji(fragment: string): string {
  return correctEmojiAlts(twemoji.parse(fragment));
}

// Converts unicode emoji to their shortcode representations
export function emojiToShortcode(fragment: string): string {
  return unemojify(fragment);
}

// ? =============================
// ? Syntax highlighting rendering
// ? =============================

/**
 * Highlights token spans as they appear in a search string
 * @param string - original string to search
 * @param tokens - array of token config objects, which contain either a string (for a single
 * token), or a string array (for multiple tokens), along with a corresponding CSS class
 * @param firstOccurrence - Whether to stop after the first occurrence
 */
export function highlightTokens(
  string: string,
  tokens: Array<{ token: string | string[]; className: string }>,
  firstOccurrence = false
): string {
  let processed: string = string;
  tokens.forEach(({ token, className }) => {
    if (!Array.isArray(token)) {
      processed = replaceToken(processed, token, className, firstOccurrence);
    } else {
      token.forEach((t) => {
        processed = replaceToken(processed, t, className, firstOccurrence);
      });
    }
  });
  return processed;
}

/**
 * Constructs a highlighted token span raw HTML
 * @param content - Token content
 * @param className - Token CSS class
 */
function makeTokenSpan(content: string, className: string): string {
  return `<span class="${className}">${content}</span>`;
}

/**
 * Replaces a single token
 * @param string - original string to search
 * @param token - string or string array for token strings to match
 * @param className - CSS class for this token
 * @param firstOccurrence - Whether to stop after the first occurrence
 */
export function replaceToken(
  string: string,
  token: string | RegExp,
  className: string,
  firstOccurrence = false
): string {
  if (typeof token === "string") {
    return firstOccurrence
      ? string.replace(token, makeTokenSpan(token, className))
      : replaceAll(string, token, makeTokenSpan(token, className));
  }
  return firstOccurrence
    ? string.replace(new RegExp(token), (match) =>
        makeTokenSpan(match, className)
      )
    : string.replace(token, (match) => makeTokenSpan(match, className));
}
