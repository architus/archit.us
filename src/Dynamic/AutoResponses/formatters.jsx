import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  isEmptyOrNil,
  replaceToken,
  highlightTokens,
  escapeHtml,
  convertMentions,
  convertUnicodeEmoji,
  convertDiscordEmoji,
  makeTransformer
} from "Utility";

import UserDisplay from "Components/UserDisplay";

// ? =====================
// ? Common
// ? =====================

const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b((?:[-a-zA-Z0-9()@:%_+.~#?&//=;]|(?:&amp;))*)/g;
const listRegex = /\[(?:(?:[^[\]]*)|(?:\[[^[\]]+\]))(?:,(?:[^[\]]*)|(?:\[[^[\]]+\]))+\]/g;
const reactionRegex = /\[(?:(?:<img.*?\/>)|(?::[a-zA-Z0-9-_~]{2,}:))\]/g;
const emojiRegex = /(?:<|(?:&lt;))(a?):([a-zA-Z0-9-_~]{2,}):([0-9]+)(?:>|(?:&gt;))/g;
const emojiStringRegex = /([A-Za-z_~()-][0-9A-Za-z_~()-]{2,}?)([0-9]{7,20})/g;
const mentionStringRegex = /(?:^|[^:/0-9])([0-9]{7,20})/g;

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
export const triggerPipeline = makeTransformer([
  escapeHtml,
  mockEmoji,
  convertRawDiscordEmoji,
  convertUnicodeEmoji,
  convertDiscordEmoji,
  mockMentions,
  convertMentions,
  s => highlightTokens(s, triggerTokens, true)
]);

export function createTriggerCellFormatter(contextRef) {
  const formatter = ({ value }) => (
    <div
      className="response"
      dangerouslySetInnerHTML={{
        __html: triggerPipeline(value, contextRef.current)
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
const responsePipeline = makeTransformer([
  escapeHtml,
  s => replaceToken(s, listRegex, "token-list"),
  convertMentions,
  s => highlightTokens(s, responseTokens),
  convertRawDiscordEmoji,
  convertUnicodeEmoji,
  convertDiscordEmoji,
  s => replaceToken(s, reactionRegex, "token-reaction")
]);

export function createResponseCellFormatter(contextRef) {
  const formatter = ({ value }) => (
    <div
      className="response"
      dangerouslySetInnerHTML={{
        __html: responsePipeline(value, contextRef.current)
      }}
    />
  );

  formatter.propTypes = {
    value: PropTypes.string.isRequired
  };

  return formatter;
}

// ? =====================
// ? CountCellFormatter
// ? =====================

const digitWidth = 9;
export function createCountCellFormatter(maxCountRef) {
  const formatter = ({ value }) => (
    <div
      className={classNames("count", {
        withSparkline: maxCountRef.current !== 0
      })}
    >
      {maxCountRef.current !== 0 ? (
        <>
          <span
            className="value"
            style={{
              width: `${maxCountRef.current.toString().length * digitWidth}px`
            }}
          >
            <span>{value}</span>
          </span>
          <span className="sparkline">
            <span
              style={{ width: `${(value / maxCountRef.current) * 100}%` }}
            />
          </span>
        </>
      ) : (
        <span className="value" children={value} />
      )}
    </div>
  );

  formatter.propTypes = {
    value: PropTypes.number.isRequired
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
