import { styled } from "linaria/react";
import { lighten } from "polished";
import React from "react";
import { FaShieldAlt } from "react-icons/fa";

import Acronym from "@app/components/Acronym";
import { isDefined } from "@app/utility";
import { Snowflake } from "@app/utility/types";
import Tooltip from "@architus/facade/components/Tooltip";
import FilledShield from "@architus/facade/icons/filled-shield.svg";
import {
  color,
  mode,
  ColorMode,
  staticColor,
} from "@architus/facade/theme/color";
import { transition } from "@architus/facade/theme/motion";
import { shadow } from "@architus/facade/theme/shadow";
import { isNil } from "@architus/lib/utility";

export const bgColorVar = `--guild-icon-bg-color`;

export const textButton = `
  user-select: none;
  color: ${color("text")};
  box-shadow: ${shadow("z1")};
  ${mode(ColorMode.Light)} {
    background-color: ${color("bg+20")};
  }

  ${mode(ColorMode.Dark)} {
    background-color: ${color("bg+20")};
  }

  ${bgColorVar}: transparent;

  /* Use an inner shadow with no spread to mock a background color
     that doesn't transition when the page changes color scheme */
  box-shadow: ${shadow("z1")}, inset 0 0 0 100px var(${bgColorVar});

  &:hover {
    color: ${color("light")};
    ${bgColorVar}: ${color("primary")};
  }
`;

export const circleIconHover = `
  border-radius: 50%;
  &:hover {
      border-radius: 25%;
  }
`;

const Styled = {
  Tooltip: styled(Tooltip)`
    width: var(--size);
    height: var(--size);

    ${transition(["border-radius"])}
    ${circleIconHover}
    position: relative;
    box-shadow: ${shadow("z1")};

    &:focus {
      outline: none;
    }
    & > * {
      ${transition(["opacity"])}
      opacity: 1;
    }

    &:active {
      & > * {
        opacity: 0.9;
      }
    }

    &[data-text-button="true"] {
      ${textButton}
    }
  `,
  Image: styled.img`
    ${transition(["border-radius"])}
    ${circleIconHover}
    height: 100%;
    width: 100%;
    user-select: none;
  `,
  AcronymWrapper: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  ElevatedIndicator: styled.div`
    position: absolute;
    bottom: -8px;
    right: -8px;
    width: 32px;
    height: 32px;
    pointer-events: none;
  `,
  ShieldBackground: styled(FilledShield)`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    color: var(--cutout-color);
    transform: scale(1.4);
  `,
  ShieldForeground: styled(FaShieldAlt)`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;

    color: ${color("primary")};
    ${mode(ColorMode.Light)} {
      color: ${lighten(0.02, staticColor("dark"))};
    }
  `,
  TooltipName: styled.strong`
    display: block;
  `,
  TooltipElevated: styled.div`
    opacity: 0.7;
    font-size: 80%;
  `,
};

export const iconSource = (id: Snowflake, icon: string): string =>
  `https://cdn.discordapp.com/icons/${id}/${icon}.png`;

export type GuildIconProps = {
  id: Snowflake;
  name: string;
  icon?: string | null;
  noTooltip?: boolean;
  elevated?: boolean;
  backgroundColor: string;
  size: string;
  className?: string;
  style?: React.CSSProperties;
} & Partial<React.HTMLAttributes<HTMLDivElement>>;

const GuildIcon: React.FC<GuildIconProps> = ({
  id,
  name,
  icon = null,
  noTooltip = false,
  elevated = false,
  backgroundColor,
  size = "48px",
  style,
  className,
  ...rest
}) => (
  <Styled.Tooltip
    className={className}
    style={{ ...(style ?? {}), "--size": size } as React.CSSProperties}
    tooltip={
      noTooltip ? null : (
        <>
          <Styled.TooltipName>{name}</Styled.TooltipName>
          {elevated && (
            <Styled.TooltipElevated>Architus admin</Styled.TooltipElevated>
          )}
        </>
      )
    }
    innerProps={
      {
        ...rest,
        "data-text-button": isNil(icon) ? "true" : undefined,
      } as Partial<React.HTMLAttributes<HTMLDivElement>>
    }
  >
    {isDefined(icon) ? (
      <Styled.Image src={iconSource(id, icon)} alt={name} draggable="false" />
    ) : (
      <Styled.AcronymWrapper>
        <Acronym name={name} />
      </Styled.AcronymWrapper>
    )}
    {elevated && (
      <Styled.ElevatedIndicator
        style={{ "--cutout-color": backgroundColor } as React.CSSProperties}
      >
        <Styled.ShieldBackground />
        <Styled.ShieldForeground />
      </Styled.ElevatedIndicator>
    )}
  </Styled.Tooltip>
);

export default GuildIcon;
