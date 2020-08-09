import { styled } from "linaria/react";
import React, { useMemo } from "react";

import AutoResponsesGrid from "./AutoResponsesGrid";
import MigrationAlert from "./MigrationAlert";
import { AuthorData, Author } from "./types";
import PageTitle from "@app/components/PageTitle";
import { getAvatarUrl } from "@app/components/UserDisplay";
import { appHorizontalPadding, appVerticalPadding } from "@app/layout";
import { useDispatch } from "@app/store";
import { useCurrentUser } from "@app/store/actions";
import { usePool, usePoolEntities } from "@app/store/slices/pools";
import { TabProps } from "@app/tabs/types";
import { User, Snowflake, AutoResponse } from "@app/utility/types";
import { color } from "@architus/facade/theme/color";
import { up } from "@architus/facade/theme/media";
import { gap } from "@architus/facade/theme/spacing";
import { Option } from "@architus/lib/option";

const Styled = {
  PageOuter: styled.div`
    position: relative;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    flex-direction: column;
    height: 100%;

    padding-top: ${appVerticalPadding};
  `,
  Header: styled.div`
    padding: 0 ${appHorizontalPadding};

    p {
      margin-bottom: ${gap.micro};
    }
  `,
  MigrationAlert: styled(MigrationAlert)`
    margin-top: ${gap.micro};
    margin-bottom: ${gap.nano};
  `,
  Title: styled.h2`
    color: ${color("textStrong")};
    font-size: 1.9rem;
    font-weight: 300;
    margin-bottom: ${gap.nano};
  `,
  GridWrapper: styled.div`
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
};

/**
 * Displays the auto response page, connecting it to the store
 * passing props down to the AutoResponsesGrid component
 */
const AutoResponses: React.FC<TabProps> = (pageProps) => {
  const dispatch = useDispatch();
  const { guild } = pageProps;
  const currentUser: Option<User> = useCurrentUser();
  const { all: commands, isLoaded: hasLoaded } = usePool({
    type: "autoResponse",
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

  // Transform the commands to include the authors
  const formattedCommands = useMemo(
    () =>
      commands.map((c) => ({
        ...c,
        authorData: foldAuthorData(c, authorsMap),
      })),
    [commands, authorsMap]
  );

  if (currentUser.isDefined()) {
    // TODO implement
    const isArchitusAdmin = false;
    return (
      <Styled.PageOuter>
        <PageTitle title="Auto Responses" />
        <Styled.Header>
          <Styled.Title>Automatic Responses</Styled.Title>
          <Styled.MigrationAlert />
          <p>
            Manage the triggers and automatic responses for{" "}
            {isArchitusAdmin ? "all entries" : "self-authored entries"} on the
            current server.
          </p>
        </Styled.Header>
        <Styled.GridWrapper>
          <AutoResponsesGrid
            authors={authorsMap}
            commands={formattedCommands}
            hasLoaded={hasLoaded}
            currentUser={currentUser.get}
            isArchitusAdmin={isArchitusAdmin}
            dispatch={dispatch}
            {...pageProps}
          />
        </Styled.GridWrapper>
      </Styled.PageOuter>
    );
  }

  return null;
};

export default AutoResponses;

// ? ================
// ? Helper functions
// ? ================

/**
 * Performs the row transformation operation, resolving auto responses to the necessary
 * fields for display
 * @param autoResponse - Current row auto response object
 * @param authors - Map of IDs to User objects to use for fast lookup
 */
function foldAuthorData(
  autoResponse: AutoResponse,
  authors: Map<Snowflake, Author>
): AuthorData {
  const id = autoResponse.authorId;
  const authorOption = id.flatMapNil((i) => authors.get(i));
  if (authorOption.isDefined()) {
    const { name, discriminator } = authorOption.get;
    return {
      author: `${name}#${discriminator}|${id}`,
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
