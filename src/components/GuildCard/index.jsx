import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { iconSource } from "components/GuildIcon";

import GuildIcon from "components/GuildIcon";

import "./style.scss";

function GuildCard({ icon, id, name, className, onClick, ...rest }) {
  return (
    <div className={classNames("guild-card", className)}>
      <div className="guild-card--icon">
        <GuildIcon icon={icon} id={id} name={name} noTooltip />
      </div>
      <div className="guild-card--label">
        <h4>{name}</h4>
      </div>
    </div>
  );
}

export default GuildCard;

GuildCard.propTypes = {
  icon: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};
