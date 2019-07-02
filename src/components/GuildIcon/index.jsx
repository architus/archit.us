import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Acronym from "components/Acronym";

function GuildIcon({ icon, id, name, className, onClick, ...rest }) {
  return (
    <OverlayTrigger
      placement="right"
      popperConfig={{
        modifiers: {
          preventOverflow: {
            enabled: true,
            boundariesElement: "window"
          }
        }
      }}
      overlay={<Tooltip>{name}</Tooltip>}
    >
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
    </OverlayTrigger>
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
