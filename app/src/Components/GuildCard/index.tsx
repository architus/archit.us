import React from "react";
import classNames from "classnames";
import { Snowflake } from "Utility/types";
import Icon from "Components/Icon";
import GuildIcon from "Components/GuildIcon";
import "./style.scss";

type GuildCard = {
  id: Snowflake;
  name: string;
  icon?: string;
  className?: string;
  href?: string;
} & Partial<React.HTMLAttributes<HTMLDivElement>>;

const GuildCard: React.FC<GuildCard> = ({
  id,
  name,
  icon = null,
  className = "",
  href = undefined,
  ...rest
}) => (
  <div className={classNames("guild-card", className)}>
    <div className="guild-card--icon">
      <GuildIcon icon={icon} id={id} name={name} noTooltip />
    </div>
    <div className="guild-card--label">
      <h4>{name}</h4>
    </div>
    <a href={href} className="stretched-link guild-card--button">
      <Icon name="chevron-right" />
    </a>
  </div>
);

export default GuildCard;
