import { styled } from "linaria/react";
import React from "react";

import { API_BASE } from "@app/api";
import GuildCard from "@app/components/GuildCard";
import PageTitle from "@app/components/PageTitle";
import { appHorizontalPadding, appVerticalPadding } from "@app/layout";
import { usePool } from "@app/store/slices/pools";
import { BaseAppProps } from "@app/tabs/types";
import {
  isDiscordAdminWithoutArchitus,
  useReturnQuery,
  processIfNotEmptyOrNil,
} from "@app/utility";
import { Snowflake } from "@app/utility/types";
import Spinner from "@architus/facade/components/Spinner";
import { color } from "@architus/facade/theme/color";
import { scrollBarAuto } from "@architus/facade/theme/mixins";
import { shadow } from "@architus/facade/theme/shadow";
import { gap } from "@architus/facade/theme/spacing";

const Styled = {
  Layout: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding-top: ${appVerticalPadding};
    padding-left: ${appHorizontalPadding};
  `,
  Header: styled.div`
    flex-grow: 0;
    padding-right: ${appHorizontalPadding};
    margin-bottom: ${gap.micro};
  `,
  Title: styled.h4`
    color: ${color("textStrong")};
    font-size: 1.9rem;
    font-weight: 300;
    margin-bottom: ${gap.atto};
  `,
  Subtitle: styled.h5`
    color: ${color("textFade")};
    font-weight: 300;
    margin-bottom: ${gap.nano};
  `,
  LoadingWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: ${gap.micro};
    padding-bottom: ${gap.micro};
  `,
  GuildList: styled.div`
    background-color: ${color("bg-10")};
    overflow-y: auto;
    overflow-x: hidden;
    ${scrollBarAuto()}
    border-top-left-radius: 12px;
    flex-grow: 1;
    min-height: 400px;
    box-shadow: ${shadow("inner")(color("shadowHeavy"))};
    padding: ${gap.pico};
  `,
};

type InviteScreenProps = BaseAppProps;

/**
 * Screen shown when users click the "Add architus to a server" button
 */
const InviteScreen: React.FC<InviteScreenProps> = () => {
  const returnQuery = useReturnQuery();
  const inviteUrl = (guildId: Snowflake): string =>
    `${API_BASE}/invite/${guildId}${processIfNotEmptyOrNil(
      returnQuery,
      (q) => `?${q}`
    )}`;

  // Load all guilds that the user has "Manage guilds" permission for
  // and Architus is not in them
  const { all: guilds, isLoaded: guildsLoaded } = usePool({
    type: "guild",
    filter: isDiscordAdminWithoutArchitus,
  });

  return (
    <Styled.Layout>
      <PageTitle title="Invite" />
      <Styled.Header>
        <Styled.Title>
          Add <strong>architus</strong> to a server
        </Styled.Title>
        <Styled.Subtitle>
          Select a server to be redirected to Discord.
        </Styled.Subtitle>
        <p>
          <em>
            Not seeing a server? Make sure you have the &quot;Manage guild&quot;
            permission.
          </em>
        </p>
      </Styled.Header>
      <Styled.GuildList>
        {(guildsLoaded || guilds.length > 0) &&
          guilds.map((guild) => (
            <GuildCard
              id={guild.id}
              name={guild.name}
              members={guild.member_count.orNull()}
              icon={guild.icon.orUndefined()}
              key={guild.id}
              thumbnailSize="52px"
              href={inviteUrl(guild.id)}
            />
          ))}
        {!guildsLoaded && (
          // Show a spinner if the pool hasn't been completely loaded
          <Styled.LoadingWrapper>
            <Spinner variant="primary" />
          </Styled.LoadingWrapper>
        )}
      </Styled.GuildList>
    </Styled.Layout>
  );
};

export default InviteScreen;
