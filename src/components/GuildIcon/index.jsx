import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Tooltip from "components/Tooltip";
import Acronym from "components/Acronym";

export const iconSource = (id, icon) => `https://cdn.discordapp.com/icons/${id}/${icon}.png`
function GuildIcon({ icon, id, name, className, onClick, noTooltip, ...rest }) {
  // eslint-disable-next-line react/prop-types
  const Outer = ({ children }) =>
    noTooltip ? (
      <>{children}</>
    ) : (
      <Tooltip right text={name}>
        {children}
      </Tooltip>
    );
  return (
    <Outer>
      {icon !== null ? (
        <img
          className={classNames("guild-icon", className)}
          src={iconSource(id, icon)}
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
    </Outer>
  );
}

export default GuildIcon;

GuildIcon.propTypes = {
  icon: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  noTooltip: PropTypes.bool
};
