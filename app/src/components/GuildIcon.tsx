import { styled } from "linaria/react";
import React from "react";
import { BsShieldFill, BsShieldShaded } from "react-icons/bs";

import Acronym from "@app/components/Acronym";
import Icon from "@app/components/Icon";
import { isDefined } from "@app/utility";
import { Snowflake } from "@app/utility/types";
import Tooltip from "@architus/facade/components/Tooltip";

const Styled = {
  GuildIcon: styled.div``,
  Image: styled.img``,
  AcronymWrapper: styled.div``,
  ElevatedIndicator: styled.div``,
  ShieldBackground: styled(BsShieldFill)``,
  ShieldForeground: styled(BsShieldShaded)``,
};

export const iconSource = (id: Snowflake, icon: string): string =>
  `https://cdn.discordapp.com/icons/${id}/${icon}.png`;

export type GuildIconProps = {
  id: Snowflake;
  name: string;
  icon?: string | null;
  noTooltip?: boolean;
  elevated?: boolean;
  className?: string;
  style?: React.CSSProperties;
} & Partial<React.HTMLAttributes<HTMLDivElement>>;

const GuildIcon: React.FC<GuildIconProps> = ({
  id,
  name,
  icon = null,
  noTooltip = false,
  elevated = false,
  style,
  className,
  ...rest
}) => (
  <Tooltip tooltip={noTooltip ? null : name}>
    <Styled.GuildIcon className={className} style={style} {...rest}>
      {isDefined(icon) ? (
        <Styled.Image src={iconSource(id, icon)} alt={name} draggable="false" />
      ) : (
        <Styled.AcronymWrapper>
          <Acronym name={name} />
        </Styled.AcronymWrapper>
      )}
      {elevated && (
        <Styled.ElevatedIndicator>
          <Styled.ShieldBackground />
          <Styled.ShieldForeground />
          <Icon className="bg-icon" name="shield" />
          <Icon className="fg-icon" name="shield-alt" />
        </Styled.ElevatedIndicator>
      )}
    </Styled.GuildIcon>
  </Tooltip>
);

export default GuildIcon;
