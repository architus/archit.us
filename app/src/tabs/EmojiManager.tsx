import { styled } from "linaria/react";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";

import DataGrid from "@app/components/DataGrid";
import { appVerticalPadding, appHorizontalPadding } from "@app/layout";
import { Dispatch } from "@app/store";
import { cacheCustomEmoji, loadCustomEmoji } from "@app/store/routes";
import { TabProps } from "@app/tabs/types";
import { HoarFrost, Snowflake, CustomEmoji } from "@app/utility/types";
import Button from "@architus/facade/components/Button";
import { color } from "@architus/facade/theme/color";
import { AuthorData, Author } from "./AutoResponses/types";
import { getAvatarUrl } from "@app/components/UserDisplay";
import { usePool, usePoolEntities } from "@app/store/slices/pools";
import UserDisplay from "@app/components/UserDisplay";
import { gap } from "@architus/facade/theme/spacing";

const Styled = {
  Layout: styled.div`
    padding: ${appVerticalPadding} ${appHorizontalPadding};
  `,
  Title: styled.h2`
    color: ${color("textStrong")};
    font-size: 1.9rem;
    font-weight: 300;
  `,
  PageOuter: styled.div`
    position: relative;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    flex-direction: column;
    height: 100%;
  `,
  Header: styled.div`
    padding: 6 milli;
    padding-left: 0 milli;
  `,
  DataGridWrapper: styled.div`
    position: relative;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    flex-grow: 1;
  `,
    AuthorWrapper: styled.div`
    display: flex;
    align-items: center;
    height: 100%;
  `,
    Avatar: styled(UserDisplay.Avatar)`
    position: relative;
    display: flex;
    align-items: center;
    `,
    Name: styled.span`
    margin-left: ${gap.femto};
    color: text;
    font-weight: 600;
  `,
};

function creatBtn(
  x: boolean,
  dispatch: Dispatch,
  emojiID: HoarFrost,
  guildID: Snowflake
) {
  if (x == true) {
    return (
      <Button
        variant="primary"
        onClick={() =>
          dispatch(cacheCustomEmoji({ routeData: { guildID, emojiID } }))
        }
      >
        Cache
      </Button>
    );
  }
  return (
    <Button
      variant="primary"
      onClick={() =>
        dispatch(loadCustomEmoji({ routeData: { guildID, emojiID } }))
      }
    >
      Load
    </Button>
  );
}

function loadedYN(x: boolean) {
  if (x == true) {
    return "Loaded";
  }
  return "Cached";
}

const EmojiManager: React.FC<TabProps> = ({ guild }) => {
  const { all: commands, isLoaded: hasLoaded } = usePool({
    type: "customEmoji",
    guildId: guild.id,
  });

  // Load the authors from the commands (call the pool in a staggered manner)
  const allAuthorIds = useMemo(() => {
    const ids: Set<Snowflake> = new Set();
    for (const command of commands) {
      if (command.authorId.isDefined()) {
        ids.add(command.authorId.get);
      }
    }
    return Array.from(ids);
  }, [commands]);

  const authorEntries = usePoolEntities({
    type: "member",
    guildId: guild.id,
    ids: allAuthorIds,
  });

  const authorsMap = useMemo(() => {
    const authors: Map<Snowflake, Author> = new Map();
    for (const authorEntry of authorEntries) {
      if (authorEntry.isLoaded && authorEntry.entity.isDefined()) {
        authors.set(authorEntry.entity.get.id, authorEntry.entity.get);
      }
    }
    return authors;
  }, [authorEntries]);

  const columns = [
    { key: "id", name: "ID" },
    { key: "name", name: "NAME" },
    {
      key: "url",
      name: "IMAGE",
      formatter: ({ row }: { row: CustomEmoji }) => (
        <img src={row.url} width="32" />
      ),
    },
    {
      key: "authorId",
      name: "AUTHOR",
      formatter: ({ row }: { row: CustomEmoji }) => (
          <Styled.AuthorWrapper>
            <Styled.Avatar avatarUrl={foldAuthorData(row, authorsMap).avatarUrl} circle size={28} />
            <Styled.Name>{foldAuthorData(row, authorsMap).author}</Styled.Name>
          </Styled.AuthorWrapper>
      ),
    },
    {
      key: "loaded ",
      name: "LOADED",
      formatter: ({ row }: { row: CustomEmoji }) => (
        <> {loadedYN(row.discordId.isDefined())}</>
      ),
    },
    { key: "numUses", name: "USES" },
    {
      key: "btns",
      name: "CHANGE",
      formatter: ({ row }: { row: CustomEmoji }) => (
        <>
          {" "}
          {creatBtn(row.discordId.isDefined(), useDispatch(), row.id, guild.id)}
        </>
      ),
    },
  ];

  const { all: emojiList } = usePool({
    type: "customEmoji",
    guildId: guild.id,
  });

  return (
    <>
      <Styled.PageOuter>
        <Styled.Header>
          <h2>Emoji Manager</h2>
          <p className="hide-mobile">
            Manage the cached and loaded emojis on the server.
          </p>
        </Styled.Header>
        <Styled.DataGridWrapper>
          <DataGrid<CustomEmoji, "id", {}>
            rows={emojiList || []}
            columns={columns}
            rowKey="id"
          />
        </Styled.DataGridWrapper>
      </Styled.PageOuter>
    </>
  );
};

export default EmojiManager;



/**
 * Performs the row transformation operation, resolving auto responses to the necessary
 * fields for display
 * @param customEmoji - Current row auto response object
 * @param authors - Map of IDs to User objects to use for fast lookup
 */
 function foldAuthorData(
  customEmoji: CustomEmoji,
  authors: Map<Snowflake, Author>
): AuthorData {
  const id = customEmoji.authorId;
  const authorOption = id.flatMapNil((i) => authors.get(i));
  if (authorOption.isDefined()) {
    const { name, discriminator } = authorOption.get;
    return {
      author: `${name}#${discriminator}`,
      avatarUrl: getAvatarUrl({ user: authorOption.get }) ?? "",
      username: name,
      discriminator,
    };
  }

  return {
    author: "unknown",
    username: "unknown",
    discriminator: "0000",
    avatarUrl: "/img/unknown.png",
  };
}


