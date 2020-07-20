import classNames from "classnames";
import React from "react";

import Acronym from "@app/components/Acronym";
import Icon from "@app/components/Icon";
import Tooltip from "@app/components/Tooltip";
import { isDefined } from "@app/utility";
import { Snowflake } from "@app/utility/types";

export const iconSource = (id: Snowflake, icon: string): string =>
  `https://cdn.discordapp.com/icons/${id}/${icon}.png`;

type GuildIconProps = {
  id: Snowflake;
  name: string;
  icon?: string | null;
  className?: string;
  onClick?: () => void;
  noTooltip?: boolean;
  elevated?: boolean;
} & Partial<React.HTMLAttributes<HTMLDivElement>>;

const GuildIcon: React.FC<GuildIconProps> = ({
  id,
  name,
  icon = null,
  className = "",
  onClick = undefined,
  noTooltip = false,
  elevated = false,
  ...rest
}) => (
  <Outer noTooltip={noTooltip} tooltip={name} id={id}>
    <div
      className={classNames(
        isDefined(icon) ? "guild-icon" : "guild-text-icon",
        className
      )}
      onClick={onClick}
      {...rest}
    >
      {isDefined(icon) ? (
        <img src={iconSource(id, icon)} alt={name} draggable="false" />
      ) : (
        <div>
          <Acronym name={name} />
        </div>
      )}
      {elevated ? (
        <span className="guild-icon__elevated">
          <Icon className="bg-icon" name="shield" />
          <Icon className="fg-icon" name="shield-alt" />
        </span>
      ) : null}
    </div>
  </Outer>
);

// ? =================
// ? Helper components
// ? =================

type OuterProps = {
  children: React.ReactNode;
  noTooltip: boolean;
  tooltip: string;
  id: Snowflake;
};

const Outer: React.FC<OuterProps> = ({ children, noTooltip, tooltip, id }) =>
  noTooltip ? (
    <>{children}</>
  ) : (
    <Tooltip id={`guild-icon-tooltip-${id}`} text={tooltip}>
      {children}
    </Tooltip>
  );

export default GuildIcon;
