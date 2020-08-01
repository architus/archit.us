import { styled } from "linaria/react";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

import GuildIcon, { bgColorVar, fgColorVar } from "@app/components/GuildIcon";
import { Snowflake, Nil } from "@app/utility/types";
import { color, mode, ColorMode } from "@architus/facade/theme/color";
import { up } from "@architus/facade/theme/media";
import { transition } from "@architus/facade/theme/motion";
import { gap } from "@architus/facade/theme/spacing";
import { isDefined } from "@architus/lib/utility";

const ChevronIcon = styled(FaChevronRight)`
  color: ${color("textFade")};
  font-size: 1.1rem;

  margin-left: auto;
  margin-right: ${gap.pico};

  opacity: 0;
  transform: translateX(-8px);
  ${transition(["opacity", "transform"])}

  ${up("md")} {
    margin-left: ${gap.nano};
  }
`;

const Thumbnail = styled.div<{ size: string }>`
  --thumbnail-size: ${(props): string => props.size};
  height: var(--thumbnail-size);
  width: var(--thumbnail-size);

  flex-grow: 0;
  flex-shrink: 0;
`;

const Styled = {
  Card: styled.a`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 0.7rem 1rem;
    position: relative;
    border-radius: 8px;
    text-decoration: none;
    color: ${color("textStrong")};

    &:hover,
    &:focus-within {
      background-color: ${color("hoverOverlay")};
      ${mode(ColorMode.Light)} {
        background-color: ${color("hoverOverlay")};
      }

      img {
        border-radius: 25%;
      }

      ${ChevronIcon} {
        opacity: 1;
        transform: translateX(0);
      }

      ${fgColorVar}: ${color("light")};
      ${bgColorVar}: ${color("primary")};

      ${Thumbnail} > * {
        border-radius: 25%;
      }
    }
  `,
  Thumbnail,
  Label: styled.div`
    padding: 1rem 1rem 1rem 1.5rem;
    flex-shrink: 1;
  `,
  Name: styled.h4`
    font-size: 1.1rem;
    font-weight: 400;
    color: ${color("text")};
  `,
  Members: styled.h5`
    margin-top: ${gap.pico};
    font-size: 0.95rem;
    font-weight: 400;
    color: ${color("textFade")};
  `,
  ChevronIcon,
};

export type GuildCardProps = {
  id: Snowflake;
  name: string;
  members?: number | Nil;
  icon?: string;
  href?: string;
  thumbnailSize?: string;
  className?: string;
  style?: React.CSSProperties;
} & Partial<React.HTMLAttributes<HTMLAnchorElement>>;

/**
 * Draws a clickable "card" for a single guild,
 * used in a list for the AddGuildModal
 */
const GuildCard: React.FC<GuildCardProps> = ({
  id,
  name,
  members,
  icon = null,
  href = undefined,
  thumbnailSize = "52px",
  className,
  style,
  ...rest
}) => (
  <Styled.Card className={className} style={style} href={href} {...rest}>
    <Styled.Thumbnail size={thumbnailSize}>
      <GuildIcon
        icon={icon}
        id={id}
        name={name}
        size={thumbnailSize}
        noTooltip
        backgroundColor={color("bg-10")}
      />
    </Styled.Thumbnail>
    <Styled.Label>
      <Styled.Name>{name}</Styled.Name>
      {isDefined(members) && <Styled.Members>{members} members</Styled.Members>}
    </Styled.Label>
    <Styled.ChevronIcon />
  </Styled.Card>
);

export default GuildCard;
