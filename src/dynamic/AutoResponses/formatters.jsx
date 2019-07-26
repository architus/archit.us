import React from "react";
import PropTypes from "prop-types";
import { isEmptyOrNil, replaceAll, escapeHtml } from "utility";
import {
  applyTransformers,
  convertMentions,
  convertUnicodeEmoji,
  convertDiscordEmoji
} from "components/DiscordMock/transform";

import UserDisplay from "components/UserDisplay";

// ? =====================
// ? Common
// ? =====================

const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b((?:[-a-zA-Z0-9()@:%_+.~#?&//=;]|(?:&amp;))*)/g;
const listRegex = /\[(?:(?:[^[\]]*)|(?:\[[^[\]]+\]))(?:,(?:[^[\]]*)|(?:\[[^[\]]+\]))+\]/g;
const reactionRegex = /\[(?:(?:<img.*?\/>)|(?::[a-zA-Z0-9-_~]{2,}:))\]/g;
const emojiRegex = /(?:<|(?:&lt;))(a?):([a-zA-Z0-9-_~]{2,}):([0-9]+)(?:>|(?:&gt;))/g;
const emojiStringRegex = /([0-9A-Za-z_~()-]{2,}?)([0-9]{7,20})/g;
const mentionStringRegex = /(?:^|[^:/0-9])([0-9]{7,20})/g;

function highlightTokens(string, tokens) {
  let processed = string;
  tokens.forEach(({ token, className }) => {
    if (!Array.isArray(token)) {
      processed = replaceToken(processed, token, className);
    } else {
      token.forEach(t => {
        processed = replaceToken(processed, t, className);
      });
    }
  });
  return processed;
}

function makeTokenSpan(content, className) {
  return `<span class="${className}">${content}</span>`;
}

function replaceToken(string, token, className) {
  if (typeof token === "string") {
    return replaceAll(string, token, makeTokenSpan(token, className));
  } else {
    return string.replace(token, match => makeTokenSpan(match, className));
  }
}

function makeEmojiImage(filename, alt) {
  return `<img class="emoji" draggable="false" alt="${alt}" src="https://cdn.discordapp.com/emojis/${filename}" />`;
}

function convertRawDiscordEmoji(string) {
  return string.replace(emojiRegex, (_match, g1, g2, g3) => {
    if (isEmptyOrNil(g1)) return makeEmojiImage(`${g3}.png`, g2);
    else return makeEmojiImage(`${g3}.gif`, g2);
  });
}

// ? =====================
// ? TriggerCellFormatter
// ? =====================

function mockEmoji(string) {
  return string.replace(emojiStringRegex, (_m, g1, g2) => `<:${g1}:${g2}>`);
}

function mockMentions(string) {
  return string.replace(mentionStringRegex, (_m, g1) => `<@${g1}>`);
}

const triggerTokens = [{ token: "*", className: "token-capture source" }];
const triggerPipeline = [
  escapeHtml,
  mockEmoji,
  convertRawDiscordEmoji,
  convertUnicodeEmoji,
  convertDiscordEmoji,
  mockMentions,
  convertMentions,
  s => highlightTokens(s, triggerTokens)
];

export function createTriggerCellFormatter(contextRef) {
  const formatter = ({ value }) => (
    <div
      className="response"
      dangerouslySetInnerHTML={{
        __html: applyTransformers(value, contextRef.current, triggerPipeline)
      }}
    />
  );

  formatter.propTypes = {
    value: PropTypes.string.isRequired
  };

  return formatter;
}

// ? =====================
// ? ResponseCellFormatter
// ? =====================

const responseTokens = [
  { token: "[capture]", className: "token-capture" },
  { token: "[@author]", className: "token-mention" },
  { token: "[count]", className: "token-meta" },
  {
    token: linkRegex,
    className: "token-link"
  },
  {
    token: ["[author]", "[noun]", "[adj]", "[adv]", "[member]", "[owl]"],
    className: "token-string"
  }
];
const responsePipeline = [
  escapeHtml,
  s => replaceToken(s, listRegex, "token-list"),
  convertMentions,
  s => highlightTokens(s, responseTokens),
  convertRawDiscordEmoji,
  convertUnicodeEmoji,
  convertDiscordEmoji,
  s => replaceToken(s, reactionRegex, "token-reaction")
];

export function createResponseCellFormatter(contextRef) {
  const formatter = ({ value }) => (
    <div
      className="response"
      dangerouslySetInnerHTML={{
        __html: applyTransformers(value, contextRef.current, responsePipeline)
      }}
    />
  );

  formatter.propTypes = {
    value: PropTypes.string.isRequired
  };

  return formatter;
}

// ? =====================
// ? AuthorCellFormatter
// ? =====================

export function AuthorCellFormatter({
  row: { name, discriminator, avatar, author_id }
}) {
  return (
    <div className="author-display">
      <UserDisplay.Avatar
        avatarHash={avatar}
        discriminator={discriminator}
        clientId={author_id}
        circle
        size={28}
      />
      <span className="name">{name}</span>
      {isEmptyOrNil(discriminator) ? null : (
        <span className="discriminator">{`#${discriminator}`}</span>
      )}
    </div>
  );
}

AuthorCellFormatter.propTypes = {
  row: PropTypes.object
};
