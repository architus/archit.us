import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Tooltip from "components/Tooltip";
import Acronym from "components/Acronym";

function GuildIcon({ icon, id, name, className, onClick, ...rest }) {
  return (
    <Tooltip right text={name}>
      {icon !== null ? (
        <img
          className={classNames("guild-icon", className)}
          src={`https://cdn.discordapp.com/icons/${id}/${icon}.png`}
          alt={name}
          draggable="false"
          onClick={onClick}
          {...rest}
        />
      ) : (
        <div className="guild-text-icon" onClick={onClick} {...rest}>
          <div>
            <Acronym name={name} />
          </div>
        </div>
      )}
    </Tooltip>
  );
}

export default GuildIcon;

GuildIcon.propTypes = {
  icon: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};
