import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Icon from "components/Icon";
import GuildIcon from "components/GuildIcon";

import "./style.scss";

function GuildCard({ icon, id, name, className, href, ...rest }) {
  return (
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
}

export default GuildCard;

GuildCard.propTypes = {
  icon: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string
};
