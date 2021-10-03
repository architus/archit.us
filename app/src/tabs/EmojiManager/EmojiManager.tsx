import { boolean } from "fp-ts";
import { styled } from "linaria/react";
import React, { MutableRefObject, useEffect, useMemo, useState } from "react";
import { FaDownload, FaCheckCircle, FaUpload, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { AuthorData, Author } from "../AutoResponses/types";
import GridHeader, { ViewMode, viewModes } from "./GridHeader";
import ManagerJumbotron from "./ManagerJumbotron";
import DataGrid from "@app/components/DataGrid";
import PageTitle from "@app/components/PageTitle";
import UserDisplay, { getAvatarUrl } from "@app/components/UserDisplay";
import { appVerticalPadding, appHorizontalPadding } from "@app/layout";
import { Dispatch } from "@app/store";
import { cacheCustomEmoji, loadCustomEmoji } from "@app/store/routes";
import { usePool, usePoolEntities } from "@app/store/slices/pools";
import { useCurrentUser } from "@app/store/slices/session";
import { TabProps } from "@app/tabs/types";
import { HoarFrost, Snowflake, CustomEmoji, User } from "@app/utility/types";
import AutoLink from "@architus/facade/components/AutoLink";
import Button from "@architus/facade/components/Button";
import { useColorMode } from "@architus/facade/hooks";
import { Color, color, hybridColor } from "@architus/facade/theme/color";
import { up } from "@architus/facade/theme/media";
import { gap } from "@architus/facade/theme/spacing";
import { None, Option, Some } from "@architus/lib/option";
import { isDefined } from "@architus/lib/utility";
import { Column, SortDirection } from "react-data-grid";
import { padding } from "polished";
import { API_BASE } from "@app/api";
import EmojiChart from "./EmojiChart2";
import Tooltip from "@architus/facade/components/Tooltip";
import { CustomEmojiIcon } from "@app/components/CustomEmoji";

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
  ImageWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    img {
      max-width: 48px;
      max-height: 48px;
      width: auto;
      height: auto;
    }
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
      margin-right: ${gap("femto")};
    }
  `,
  UsesWrapper: styled.div`
    display: flex;
    justify-content: right;
    height: 100%;
    padding-right: ${gap('femto')};
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

function centerHeader(item) {
  return (
    <div style={{
      textAlign: "center"
    }}
    >
      {item.column.name}
    </div>
  );
}

function rightHeader(item: MutableRefObject<CustomEmoji>) {
  return (
    <div style={{
      textAlign: "right",
      paddingRight: gap('femto'),
    }}
    >
      {item.column.name}
    </div>
  );
}

function creatBtn(
  x: boolean,
  author: boolean,
  admin: boolean,
  dispatch: Dispatch,
  emojiId: HoarFrost,
  guildId: Snowflake
) {
  const colorMode = useColorMode();
  if (x == true) {
    return (

      <Button
        type="solid"
        size="compact"
        disabled={!author && x && !admin}
        color={hybridColor("bg+10", colorMode)}
        onClick={() => {
          console.log("dispatch cache")
          dispatch(cacheCustomEmoji({ routeData: { guildId, emojiId } }))
        }
        }
      >
              <Tooltip maxWidth="auto" tooltip={<p>Cache Emoji</p>}>

        <Styled.IconWrapper>
          <FaUpload
            color={color("info")}

          />
        </Styled.IconWrapper>
        </Tooltip>

      </Button>
    );
  }
  return (
    <Button
        type="solid"
        size="compact"
        disabled={!author && x && !admin}
        color={hybridColor("bg+10", colorMode)}
        onClick={() => {
          console.log("dispatch load")
          dispatch(loadCustomEmoji({ routeData: { guildId, emojiId } }))
        }
        }
      >
            <Tooltip maxWidth="auto" tooltip={<p>Load Emoji</p>}>

        <Styled.IconWrapper>
          <FaDownload
            color={color("success")}
          />
        </Styled.IconWrapper>
        </Tooltip>

      </Button>
  );
}

function loadedYN(x: boolean) {
  if (x == true) {
    return (
      <Styled.IconWrapper>
        <FaCheckCircle />
      </Styled.IconWrapper>
    );
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

  const mayManageEmojis = !!(guild.permissions & 1073741824);
  const colorMode = useColorMode();

  const columns: Column<CustomEmoji>[] = [
    {
      key: "loaded",
      name: "LOADED",
      width: 10,
      sortable: true,
      headerRenderer: centerHeader,
      formatter: ({ row }: { row: CustomEmoji }) => (
        <> {loadedYN(row.discordId.isDefined())}</>
      ),
    },
    {
      key: "url",
      name: "IMAGE",
      width: 100,
      headerRenderer: centerHeader,
      formatter: ({ row }: { row: CustomEmoji }) => (
/*         <Styled.ImageWrapper>
          <img src={row.url} />
        </Styled.ImageWrapper> */
        <Styled.ImageWrapper>
                      <CustomEmojiIcon
                      emoji={row}
                      author={authorsMap.get(row.authorId.getOrElse('0' as Snowflake))}
                      key={row.id}
                    />
        </Styled.ImageWrapper>

      ),
    },
    {
      key: "download",
      name: "DOWNLOAD",
      sortable: true,
      formatter: ({ row }: { row: CustomEmoji }) => (
        <>
          <AutoLink href={row.url} target="_blank">
            {row.name}
          </AutoLink>
        </>
      ),
    },
    {
      key: "authorId",
      name: "AUTHOR",
      sortable: true,
      formatter: ({ row }: { row: CustomEmoji }) => (
        <Styled.AuthorWrapper>
          <Styled.Avatar
            avatarUrl={foldAuthorData(row, authorsMap).avatarUrl}
            circle
            size={28}
          />
          <Styled.Name>{foldAuthorData(row, authorsMap).author}</Styled.Name>
        </Styled.AuthorWrapper>
      ),
    },
    {
      key: "numUses",
      name: "USES",
      sortable: true,
      width: 10,
      headerRenderer: rightHeader,
      formatter: ({ row }: { row: CustomEmoji }) => (
        <>
          <Styled.UsesWrapper>
            <p>{row.numUses}</p>
          </Styled.UsesWrapper>
        </>
      ),
    },
  ];
  const dispatch = useDispatch();
  if (mayManageEmojis) {
    columns.push(
      {
        key: "btns",
        name: "MANAGE",
        width: 150,
        formatter: ({ row }: { row: CustomEmoji }) => (
          <>
            <Styled.ButtonWrapper>
              {creatBtn(
                row.discordId.isDefined(),
                isAuthor(currentUser, row),
                guild.architus_admin,
                dispatch,
                row.id,
                guild.id
              )}

              <Button
                disabled={!isAuthor(currentUser, row)}
                size="compact"
                type="solid"
                color={hybridColor("bg+10", colorMode)}
              >
                <Styled.IconWrapper>
                  <FaTrash color={color("danger")} />
                </Styled.IconWrapper>
              </Button>
            </Styled.ButtonWrapper>
          </>
        ),
      })
  }

  const { all: emojiList } = usePool({
    type: "customEmoji",
    guildId: guild.id,
  });

  const [filterSelfAuthored, setFilterSelfAuthored] = useState(false);

  const filteredList = useMemo(() => {
    return emojiList.filter((value: CustomEmoji, index: number) => {
      return !filterSelfAuthored || value.authorId.getOrElse(undefined) === currentUser.getOrElse(undefined)?.id;
    });
  }, [emojiList, filterSelfAuthored]);

  type ColumnKey = "loaded" | "download" | "authorId" | "numUses" | "priority";

  interface Sort {
    column: ColumnKey;
    direction: SortDirection;
  }
  const [sort, setSort] = useState<Option<Sort>>(Some({ column: "priority", direction: "ASC" }));
  const getSortedRows = useMemo(() => {
    if (sort.isDefined()) {
      let sortedRows: CustomEmoji[] = [...filteredList];
      const { column } = sort.get;
      switch (column) {
        case "download":
          sortedRows = sortedRows.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "loaded":
          sortedRows = sortedRows.sort((a, b) => a.discordId.isDefined() ? -1 : 1);
          break;
        case "authorId":
          sortedRows = sortedRows.sort((a, b) => {
            const name = (e: CustomEmoji) => (e.authorId.map(id => authorsMap.get(id)?.name ?? '').getOrElse(''));
            return name(a).localeCompare(name(b));
          });
          break;
        case "numUses":
          sortedRows = sortedRows.sort((a, b) => a.numUses - b.numUses);
          break;
        default:
          sortedRows = sortedRows.sort((a, b) => a.priority - b.priority)
      }
      return sort.get.direction === "DESC" ? sortedRows.reverse() : sortedRows;
    }
    return commands;
  }, [filteredList, sort]);


  const onSort = (column: string, direction: SortDirection): void => {
    setSort(
      direction !== "NONE"
        ? Some({ column: column as ColumnKey, direction })
        : None);
  };

  interface ConfData {
    enabled: boolean;
    architus_limit: number | "unlimited";
    discord_limit: number;
  };
  const [managerConf, onManagerConf] = useState<ConfData>({enabled: false, architus_limit: "unlimited", discord_limit: 50})
  useEffect(() => {
    fetch(`${API_BASE}/emojis/${guild.id}/conf`, { credentials: "include" })
        .then(response => response.json())
        .then(data => onManagerConf(data));
  }, [guild]);

  return (
    <>
      <Styled.PageOuter>
        <PageTitle title="Emoji Manager" />
        <Styled.Header>
          <h2>Emoji Manager</h2>
        </Styled.Header>
        <ManagerJumbotron
          enabled={managerConf.enabled}
          current={emojiList.length}
          loaded={emojiList.filter((e) => e.discordId.isDefined()).length}
          discordLimit={managerConf.discord_limit}
          architusLimit={managerConf.architus_limit}
          docsLink="https://docs.archit.us/features/emoji-manager/"
          onChangeEnabled={(): void => undefined}
        />
        <EmojiChart
          current={emojiList.length}
          loaded={emojiList.filter((e) => e.discordId.isDefined()).length}
          limit={200}
          discordLimit={managerConf.discord_limit}
        />
        <Styled.DataGridWrapper>
          <GridHeader
            filterSelfAuthored={filterSelfAuthored}
            onChangeFilterSelfAuthored={setFilterSelfAuthored}
            addNewRowEnable={false}
            onAddNewRow={() => { }}
          />
          <DataGrid<CustomEmoji, "id", {}>
            rowHeight={52}
            rows={getSortedRows || []}
            sortColumn={sort.getOrElse(undefined)?.column}
            sortDirection={sort.getOrElse(undefined)?.direction}
            onSort={onSort}
            columns={columns as readonly Column<CustomEmoji, {}>[]}
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
