import { styled } from "linaria/react";
import React, { useMemo } from "react";
import { FaPlus } from "react-icons/fa";

import GuildIcon, {
  circleIconHover,
  textButton,
  bgColorVar,
} from "@app/components/GuildIcon";
import Skeleton from "@app/components/Skeleton";
import { Snowflake, Guild } from "@app/utility/types";
import Tooltip from "@architus/facade/components/Tooltip";
import { color, mode, ColorMode } from "@architus/facade/theme/color";
import { transition } from "@architus/facade/theme/motion";
import { gap } from "@architus/facade/theme/spacing";
import { Option } from "@architus/lib/option";

const skeletonCount = 5;
const iconWidth = 52;
const iconSpacing = gap.nano;

const Styled = {
  List: styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding: ${gap.nano};
  `,
  AddButton: styled.button`
    color: ${color("text")};
    width: ${iconWidth}px;
    height: ${iconWidth}px;
    border: none;
    outline: none !important;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    ${transition(["border-radius", "box-shadow"])}
    ${circleIconHover}

    ${textButton}
  `,
  GuildIcon: styled(GuildIcon)`
    color: ${color("text")};
    cursor: pointer;

    &::after {
      position: absolute;
      z-index: 10000;
      content: " ";
      top: 0;
      bottom: 0;
      left: -15px;
      margin-top: auto;
      margin-bottom: auto;
      pointer-events: none;

      width: 6px;

      border-radius: 0 4px 4px 0;
      border-right: 6px solid white;
      ${mode(ColorMode.Light)} {
        border-right-color: ${color("primary-10")};
      }

      ${transition(["height", "transform", "opacity"])}
      height: 0;
      opacity: 0.5;
      transform: translateX(-6px);
    }

    &:hover::after {
      height: 30%;
      transform: translateX(0);
    }

    &[data-active="true"] {
      &,
      img {
        border-radius: 25%;
      }

      ${bgColorVar}: ${color("primary")};
      color: ${color("light")};

      &::after {
        height: 80%;
        opacity: 1;
        transform: translateX(0);
      }
    }
  `,
  Section: styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    & > * {
      margin-bottom: ${iconSpacing};
    }
  `,
  SectionDivider: styled.hr`
    opacity: 0.55;
    width: 100%;
    border-top: 2px solid ${color("textLight")};
    margin-top: 0;
    margin-bottom: ${iconSpacing};
  `,
  GuildSkeleton: styled(Skeleton.Auto)`
    margin-bottom: ${iconSpacing};
  `,
};

export type GuildNavProps = {
  loaded: boolean;
  guilds: Guild[];
  currentGuild: Option<Snowflake>;
  backgroundColor: string;
  onClickGuild: (id: Snowflake) => void;
  onClickAdd: () => void;
  className?: string;
  style?: React.CSSProperties;
};

const architusAdminGuildsFilter = (guild: Guild): boolean =>
  guild.has_architus && guild.architus_admin;
const otherGuildsFilter = (guild: Guild): boolean =>
  guild.has_architus && !guild.architus_admin;

/**
 * Displays a vertical list of clickable guilds
 */
const GuildNav: React.FC<GuildNavProps> = ({
  loaded,
  guilds,
  currentGuild,
  backgroundColor,
  onClickGuild,
  onClickAdd,
}) => {
  const architusAdminGuilds = useMemo(
    () => guilds.filter(architusAdminGuildsFilter),
    [guilds]
  );
  const otherGuilds = useMemo(() => guilds.filter(otherGuildsFilter), [guilds]);
  const showGuilds =
    loaded || otherGuilds.length > 0 || architusAdminGuilds.length > 0;
  return (
    <Styled.List>
      {showGuilds ? (
        <>
          {architusAdminGuilds.length > 0 ? (
            <Section
              guilds={architusAdminGuilds}
              onClickGuild={onClickGuild}
              activeGuildId={currentGuild.orNull()}
              backgroundColor={backgroundColor}
              elevated
            />
          ) : null}
          {otherGuilds.length > 0 ? (
            <Section
              guilds={otherGuilds}
              onClickGuild={onClickGuild}
              activeGuildId={currentGuild.orNull()}
              backgroundColor={backgroundColor}
            />
          ) : null}
          <Tooltip tooltip="Add architus to a server...">
            <Styled.AddButton onClick={onClickAdd}>
              <FaPlus />
            </Styled.AddButton>
          </Tooltip>
        </>
      ) : (
        [...Array(skeletonCount)].map((_e, i) => (
          <Styled.GuildSkeleton circle width={`${iconWidth}px`} key={i} />
        ))
      )}
    </Styled.List>
  );
};

export default GuildNav;

// ? =================
// ? Helper components
// ? =================

type SectionProps = {
  guilds: Guild[];
  onClickGuild: (id: Snowflake) => void;
  activeGuildId: Snowflake | null;
  elevated?: boolean;
  backgroundColor: string;
};

/**
 * Displays group of guild icons with a separator at the bottom
 */
const Section: React.FC<SectionProps> = ({
  guilds,
  onClickGuild,
  activeGuildId,
  elevated = false,
  backgroundColor,
}) => (
  <Styled.Section>
    {guilds.map(({ icon, id, name }) => (
      <Styled.GuildIcon
        id={id}
        key={id}
        name={name}
        elevated={elevated}
        icon={icon.getOrElse(null)}
        data-active={id === activeGuildId ? "true" : undefined}
        onClick={(): void => onClickGuild(id)}
        tabIndex={0}
        backgroundColor={backgroundColor}
        size={`${iconWidth}px`}
      />
    ))}
    <Styled.SectionDivider />
  </Styled.Section>
);
