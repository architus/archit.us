import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Tooltip from "components/Tooltip";
import Acronym from "components/Acronym";
import Icon from "components/Icon";

export const iconSource = (id, icon) =>
  `https://cdn.discordapp.com/icons/${id}/${icon}.png`;
function GuildIcon({
  icon,
  id,
  name,
  className,
  onClick,
  noTooltip = false,
  elevated = false,
  ...rest
}) {
  const hasIcon = icon !== null;
  return (
    <Outer noTooltip={noTooltip} tooltip={name}>
      <div
        className={classNames(hasIcon ? "guild-icon" : "guild-text-icon")}
        onClick={onClick}
        {...rest}
      >
        {hasIcon ? (
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
}

export default GuildIcon;

GuildIcon.propTypes = {
  icon: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  noTooltip: PropTypes.bool,
  elevated: PropTypes.bool
};

// ? =================
// ? Helper components
// ? =================

function Outer({ children, noTooltip, tooltip }) {
  if (noTooltip) return <>{children}</>;
  else
    return (
      <Tooltip right text={tooltip}>
        {children}
      </Tooltip>
    );
}

Outer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  noTooltip: PropTypes.bool,
  tooltip: PropTypes.string
};
