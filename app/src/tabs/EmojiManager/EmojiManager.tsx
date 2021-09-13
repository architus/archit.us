import { styled } from "linaria/react";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";

import DataGrid from "@app/components/DataGrid";
import { appVerticalPadding, appHorizontalPadding } from "@app/layout";
import { Dispatch } from "@app/store";
import { FaDownload, FaCheckCircle, FaUpload, FaTrash } from "react-icons/fa";
import AutoLink from "@architus/facade/components/AutoLink";
import { cacheCustomEmoji, loadCustomEmoji } from "@app/store/routes";
import { TabProps } from "@app/tabs/types";
import { HoarFrost, Snowflake, CustomEmoji } from "@app/utility/types";
import { color } from "@architus/facade/theme/color";
import { AuthorData, Author } from "../AutoResponses/types";
import { getAvatarUrl } from "@app/components/UserDisplay";
import { usePool, usePoolEntities } from "@app/store/slices/pools";
import UserDisplay from "@app/components/UserDisplay";
import { gap } from "@architus/facade/theme/spacing";
import { up } from "@architus/facade/theme/media";
import GridHeader from "./GridHeader";

const Styled = {
  Layout: styled.div`
    padding: ${appVerticalPadding} ${appHorizontalPadding};
  `,
  Title: styled.h2`
    color: ${color("textStrong")};
    font-size: 1.9rem;
    font-weight: 300;
    margin-bottom: ${gap.nano};
  `,
  PageOuter: styled.div`
    position: relative;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    flex-direction: column;
    height: 100%;

    padding-top: ${gap.milli};
  `,
  Header: styled.div`
    padding: 0 ${gap.milli};

    p {
      margin-bottom: ${gap.micro};
    }
  `,
  DataGridWrapper: styled.div`
    position: relative;
    flex-grow: 1;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    flex-direction: column;
    background-color: ${color("bg")};
    overflow: hidden;

    ${up("md")} {
      margin-left: ${gap.milli};
      border-top-left-radius: 1rem;
    }
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
  ButtonWrapper: styled.div`
    max-height: 50%;
    margin: 3px 0;
    font-size: 2em;
  `,
  IconWrapper: styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    color: ${color("success")};
    font-size: 1.5em;
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
      <Styled.ButtonWrapper>
      <FaUpload
        color={color('info')}
        onClick={() =>
          dispatch(cacheCustomEmoji({ routeData: { guildID, emojiID } }))
        }
      />
    </Styled.ButtonWrapper>
    );
  }
  return (
    <Styled.ButtonWrapper>
      <FaDownload
        color={color('success')}
        onClick={() =>
          dispatch(loadCustomEmoji({ routeData: { guildID, emojiID } }))
        }
      />
    </Styled.ButtonWrapper>
  );
}

function loadedYN(x: boolean) {
  if (x == true) {
    return <Styled.IconWrapper><FaCheckCircle/></Styled.IconWrapper>
  }
  return <></>;
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
    {
      key: "loaded ",
      name: "LOADED",
      width: 10,
      formatter: ({ row }: { row: CustomEmoji }) => (
        <> {loadedYN(row.discordId.isDefined())}</>
      ),
    },
    {
      key: "url",
      name: "IMAGE",
      formatter: ({ row }: { row: CustomEmoji }) => (
        <img src={row.url} width="60px" />
      ),
    },
    {
      key: "download",
      name: "DOWNLOAD",
      formatter: ({ row }: { row: CustomEmoji }) => (
        <>
          <AutoLink href={row.url} target="_blank">{row.name}</AutoLink>
        </>
      ),
    },
    { key: "numUses", name: "USES" },

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
      key: "btns",
      name: "MANAGE",
      formatter: ({ row }: { row: CustomEmoji }) => (
        <>
          {" "}
          {creatBtn(row.discordId.isDefined(), useDispatch(), row.id, guild.id)}
        </>
      ),
    },
    {
      key: "delete",
      name: "DELETE",
      formatter: ({ row }: { row: CustomEmoji }) => (
        <>
          <Styled.IconWrapper>
            <FaTrash color={color("danger")}/>
          </Styled.IconWrapper>
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
          <GridHeader
            viewMode={"Comfy"}
            setViewMode={(newMode: "Compact" | "Comfy" | "Sparse"): void => {}}
            filterSelfAuthored={false}
            onChangeFilterSelfAuthored={(newShow: boolean) => {}}
            addNewRowEnable={true}
          />
          <DataGrid<CustomEmoji, "id", {}>
            rowHeight={65}
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


