import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { shallowEqual, useSelector } from "react-redux";
import { getResponses } from "store/actions";
import {
  useAuthDispatch,
  isDefined,
  isNil,
  isEmptyOrNil,
  escapeHtml,
  replaceAll
} from "utility";
import {
  convertUnicodeEmoji,
  convertDiscordEmoji,
  convertMentions
} from "components/DiscordMock/transform";

import DataGrid from "components/DataGrid";
import UserDisplay from "components/UserDisplay";
import { Container } from "react-bootstrap";

import "./style.scss";

function AutoResponses({ guildId }) {
  // Connect to store
  const { commands, authors, authenticated, hasLoaded } = useSelector(state => {
    const id = guildId.toString();
    const hasLoaded = state.responses.commands.hasOwnProperty(id);
    return {
      commands: hasLoaded ? state.responses.commands[id] : [],
      authors: hasLoaded ? state.responses.authors[id] : [],
      authenticated: state.session.authenticated,
      hasLoaded
    };
  }, shallowEqual);

  // API fetch upon guildId/authentication updates
  const fetchResponses = useAuthDispatch(getResponses);
  useEffect(() => {
    if (authenticated) fetchResponses(guildId);
  }, [authenticated, guildId]);

  // Row updating
  const onRowUpdate = ({ idx, key, updatedCell }) => {
    console.log(`Updating`);
    console.log({ idx, key, updatedCell });
  };

  // Row deletion
  const onRowDelete = row => {
    console.log(`Deleting`);
    console.log(row);
  };

  // Transform author data
  const authorData = ({ author_id }) => {
    if (
      author_id <= 0 ||
      !authors.hasOwnProperty(author_id) ||
      isNil(authors[author_id])
    )
      return {
        author: "Unknown",
        avatar: null,
        name: "Unknown",
        discriminator: null
      };
    else {
      const { name, avatar, discriminator } = authors[author_id];
      return {
        author: `${name}#${discriminator}|${author_id}`,
        avatar,
        name,
        discriminator
      };
    }
  };
  const transformRow = row => {
    return isDefined(row) ? { ...row, ...authorData(row) } : row;
  };
  const transformedData = useMemo(() => commands.map(transformRow), [
    commands,
    authors
  ]);
  let authorsMap = {};
  for (var id in authors) {
    if (isDefined(authors[id])) {
      authorsMap[id] = { username: authors[id].name };
    }
  }
  console.log({ authorsMap });

  // eslint-disable-next-line react/prop-types
  const TriggerCellFormatter = ({ value }) => {
    console.log({ authorsMap });
    const mocked = mockEmoji(escapeHtml(value));
    const emoji = convertEmoji(mocked);
    const mockedMentions = mockMentions(emoji);
    const mentions = convertMentions(mockedMentions, { users: authorsMap });
    const tokenized = highlightTokens(mentions, triggerTokens);
    return (
      <div
        className="response"
        dangerouslySetInnerHTML={{ __html: tokenized }}
      />
    );
  };

  // eslint-disable-next-line react/prop-types
  const ResponseCellFormatter = ({ value }) => {
    console.log({ authorsMap });
    const list = replaceToken(escapeHtml(value), listRegex, "token-list");
    const mentions = convertMentions(list, { users: authorsMap });
    const tokenized = highlightTokens(mentions, responseTokens);
    const emoji = convertEmoji(tokenized);
    const reaction = replaceToken(emoji, reactionRegex, "token-reaction");
    return (
      <div
        className="response"
        dangerouslySetInnerHTML={{ __html: reaction }}
      />
    );
  };

  return (
    <Container className="py-5 auto-responses">
      <h2>Automatic Responses</h2>
      <p>
        Manage the triggers and automatic responses for all entries on the
        current server.
      </p>
      <DataGrid
        data={transformedData}
        columns={[
          {
            key: "trigger",
            name: "Trigger",
            editable: true,
            width: 240,
            formatter: TriggerCellFormatter
          },
          {
            key: "response",
            name: "Response",
            editable: true,
            formatter: ResponseCellFormatter
          },
          {
            key: "author",
            name: "Author",
            width: 200,
            formatter: AuthorCellFormatter
          }
        ]}
        baseColumnMeta={{
          sortable: true,
          filterable: true,
          resizable: true
        }}
        onRowUpdate={onRowUpdate}
        onRowDelete={onRowDelete}
        isLoading={!hasLoaded}
        emptyLabel="No responses to display"
      />
    </Container>
  );
}

export default AutoResponses;

AutoResponses.propTypes = {
  guildId: PropTypes.string
};

// ? ==============
// ? Sub components
// ? ==============

function mockEmoji(string) {
  return string.replace(
    /([0-9A-Za-z_~()-]{2,}?)([0-9]{18})/g,
    (_m, g1, g2) => `<:${g1}:${g2}>`
  );
}

function mockMentions(string) {
  return string.replace(
    /(?:^|[^:/0-9])([0-9]{17,18})/g,
    (_m, g1) => `<@${g1}>`
  );
}

const triggerTokens = [{ token: "*", className: "token-capture source" }];

const responseTokens = [
  { token: "[capture]", className: "token-capture" },
  { token: "[@author]", className: "token-mention" },
  { token: "[count]", className: "token-meta" },
  {
    token: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b((?:[-a-zA-Z0-9()@:%_+.~#?&//=;]|(?:&amp;))*)/g,
    className: "token-link"
  },
  {
    token: ["[author]", "[noun]", "[adj]", "[adv]", "[member]", "[owl]"],
    className: "token-string"
  }
];

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

function replaceToken(string, token, className) {
  if (typeof token === "string") {
    return replaceAll(
      string,
      token,
      `<span class="${className}">${token}</span>`
    );
  } else {
    return string.replace(
      token,
      match => `<span class="${className}">${match}</span>`
    );
  }
}

const emojiRegex = /(?:<|(?:&lt;))(a?):([a-zA-Z0-9-_~]{2,}):([0-9]+)(?:>|(?:&gt;))/g;
function convertRawDiscordEmoji(string) {
  return string.replace(emojiRegex, (_match, g1, g2, g3) => {
    if (isEmptyOrNil(g1)) {
      return `<img class="emoji" draggable="false" alt="${g2}" src="https://cdn.discordapp.com/emojis/${g3}.png" />`;
    } else {
      // animated
      return `<img class="emoji" draggable="false" alt="${g2}" src="https://cdn.discordapp.com/emojis/${g3}.gif" />`;
    }
  });
}

function convertEmoji(string) {
  return convertDiscordEmoji(
    convertUnicodeEmoji(convertRawDiscordEmoji(string))
  );
}

const listRegex = /\[(?:(?:[^[\]]*)|(?:\[[^[\]]+\]))(?:,(?:[^[\]]*)|(?:\[[^[\]]+\]))+\]/g;
const reactionRegex = /\[(?:(?:<img.*?\/>)|(?::[a-zA-Z0-9-_~]+:))\]/g;

function AuthorCellFormatter({
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
