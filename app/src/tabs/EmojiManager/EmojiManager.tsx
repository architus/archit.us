import { styled } from "linaria/react";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import DataGrid from "@app/components/DataGrid";
import { appVerticalPadding, appHorizontalPadding } from "@app/layout";
import { Dispatch } from "@app/store";
import { FaDownload, FaCheckCircle, FaUpload, FaTrash } from "react-icons/fa";
import AutoLink from "@architus/facade/components/AutoLink";
import { cacheCustomEmoji, loadCustomEmoji } from "@app/store/routes";
import { TabProps } from "@app/tabs/types";
import { HoarFrost, Snowflake, CustomEmoji, User } from "@app/utility/types";
import { Color, color, hybridColor } from "@architus/facade/theme/color";
import { AuthorData, Author } from "../AutoResponses/types";
import { getAvatarUrl } from "@app/components/UserDisplay";
import { usePool, usePoolEntities } from "@app/store/slices/pools";
import UserDisplay from "@app/components/UserDisplay";
import { gap } from "@architus/facade/theme/spacing";
import { up } from "@architus/facade/theme/media";
import GridHeader, { ViewMode } from "./GridHeader";
import ManagerJumbotron from "./ManagerJumbotron";
import { Option } from "@architus/lib/option";
import { useCurrentUser } from "@app/store/slices/session";
import { isDefined } from "@architus/lib/utility";
import Button from "@architus/facade/components/Button";
import { viewModes } from "./GridHeader";
import PageTitle from "@app/components/PageTitle";
import { boolean } from "fp-ts";
import { useColorMode } from "@architus/facade/hooks";

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
    h2 {
      color: ${color("textStrong")};
      font-size: 1.9rem;
      font-weight: 300;
      margin-bottom: ${gap.nano};
    }

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
    flex-shrink: 0;
  `,
  Name: styled.span`
    margin-left: ${gap.femto};
    color: text;
    font-weight: 600;
  `,
  ButtonWrapper: styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    & > :not(:last-child) {
      margin-right: ${gap('femto')};
    }
  `,
  UsesWrapper: styled.div`
    display: flex;
    justify-content: right;
    height: 100%;
    p {
      font-size: 1.5em;
      font-style: bold;
      text-align: right;
    }
  `,
  IconWrapper: styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    color: ${color("success")};
    font-size: 1.2em;
    padding: 4px 0;
  `,
};

function creatBtn(
  x: boolean,
  author: boolean,
  dispatch: Dispatch,
  emojiID: HoarFrost,
  guildID: Snowflake
) {
  const colorMode = useColorMode();
  if (x == true) {
    return (
      <Button type="solid" size="compact" disabled={!author && x} color={hybridColor("bg", colorMode)}>
        <Styled.IconWrapper>
          <FaUpload
            color={color('info')}
            onClick={() =>
              dispatch(cacheCustomEmoji({ routeData: { guildID, emojiID } }))
            }
          />
        </Styled.IconWrapper>
      </Button>

    );
  }
  return (
    <Button type="solid" size="compact" disabled={!author && x} color={hybridColor("bg", colorMode)}>
      <Styled.IconWrapper>
        <FaDownload
          color={color('success')}
          onClick={() =>
            dispatch(loadCustomEmoji({ routeData: { guildID, emojiID } }))
          }
        />
      </Styled.IconWrapper>
    </Button>

  );
}

function loadedYN(x: boolean) {
  if (x == true) {
    return <Styled.IconWrapper><FaCheckCircle /></Styled.IconWrapper>
  }
  return <></>;
}

function isAuthor(currentUser: Option<User>, row: CustomEmoji): boolean {
  if (currentUser.isDefined()) {
    return currentUser.get.id === row.authorId.getOrElse(-1);
  }
  return false;
}

const EmojiManager: React.FC<TabProps> = ({ guild }) => {
  const { all: commands, isLoaded: hasLoaded } = usePool({
    type: "customEmoji",
    guildId: guild.id,
  });

  const currentUser: Option<User> = useCurrentUser();

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

  let mayManageEmojis = !!(guild.permissions & 1073741824);
  const colorMode = useColorMode();

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
      width: 100,
      formatter: ({ row }: { row: CustomEmoji }) => (
        <img src={row.url} width="60px" />
      ),
    },
    {
      key: "numUses",
      name: "USES",
      width: 100,
      formatter: ({ row }: { row: CustomEmoji }) => (
        <>
          <Styled.UsesWrapper>
            <p>{row.numUses}</p>

          </Styled.UsesWrapper>
        </>
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
      width: 150,
      formatter: ({ row }: { row: CustomEmoji }) => (
        <>
          <Styled.ButtonWrapper>
            {creatBtn(row.discordId.isDefined(), isAuthor(currentUser, row), useDispatch(), row.id, guild.id)}

            <Button disabled={!isAuthor(currentUser, row)} size="compact" type='solid' color={hybridColor("bg", colorMode)}>
              <Styled.IconWrapper>
                <FaTrash color={color("danger")} />
              </Styled.IconWrapper>
            </Button>
          </Styled.ButtonWrapper>
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
        <PageTitle title="Emoji Manager" />
        <Styled.Header>
          <h2>Emoji Manager</h2>
        </Styled.Header>
        <ManagerJumbotron />
        <Styled.DataGridWrapper>
          <GridHeader
            filterSelfAuthored={false}
            onChangeFilterSelfAuthored={(newShow: boolean) => { }}
            addNewRowEnable={false}
            onAddNewRow={() => { }}
          />
          <DataGrid<CustomEmoji, "id", {}>
            rowHeight={52}
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


