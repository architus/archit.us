import { styled } from "linaria/react";
import { lighten } from "polished";
import React from "react";
import { BsShieldFill, BsShieldShaded } from "react-icons/bs";

import Acronym from "@app/components/Acronym";
import Icon from "@app/components/Icon";
import { isDefined } from "@app/utility";
import { Snowflake } from "@app/utility/types";
import Tooltip from "@architus/facade/components/Tooltip";
import {
  color,
  mode,
  ColorMode,
  staticColor,
} from "@architus/facade/theme/color";
import { shadow } from "@architus/facade/theme/shadow";

const circleIconHover = `
  border-radius: 50%;
  &:hover,
  &:focus {
      border-radius: 25%;
  }
`;

const Styled = {
  Tooltip: styled(Tooltip)`
    width: var(--size);
    height: var(--size);

    ${circleIconHover}
    position: relative;
    box-shadow: ${shadow("z1")};

    &:focus {
      outline: none;
    }

    &:active {
      opacity: 0.8;
    }
  `,
  Image: styled.img`
    ${circleIconHover}
    height: 100%;
    width: 100%;
  `,
  AcronymWrapper: styled.div``,
  ElevatedIndicator: styled.div`
    position: absolute;
    bottom: -4px;
    right: -6px;
    width: 32px;
    height: 32px;
    pointer-events: none;
  `,
  ShieldBackground: styled(BsShieldFill)`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    color: var(--cutout-color);
  `,
  ShieldForeground: styled(BsShieldShaded)`
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
    tooltip={noTooltip ? null : name}
    innerProps={rest}
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
        <Icon className="bg-icon" name="shield" />
        <Icon className="fg-icon" name="shield-alt" />
      </Styled.ElevatedIndicator>
    )}
  </Styled.Tooltip>
);

export default GuildIcon;
