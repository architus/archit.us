import { styled } from "linaria/react";
import React from "react";
import { useDispatch } from "react-redux";

import DataGrid from "@app/components/DataGrid";
import { appVerticalPadding, appHorizontalPadding } from "@app/layout";
import { Dispatch } from "@app/store";
import { cacheCustomEmoji, loadCustomEmoji } from "@app/store/routes";
import { usePool } from "@app/store/slices/pools";
import { TabProps } from "@app/tabs/types";
import { HoarFrost, Snowflake, CustomEmoji } from "@app/utility/types";
import Button from "@architus/facade/components/Button";
import { color } from "@architus/facade/theme/color";

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
        <>{row.authorId.getOrElse(" None ")}</>
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
