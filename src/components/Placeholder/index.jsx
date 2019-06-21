import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { addMissingUnit } from "../../util";

import "./style.scss";

function Placeholder({
  circle = false,
  block = false,
  light = false,
  width,
  style,
  className,
  height = "1.2em",
  ...rest
}) {
  return (
    <span
      className={classNames(
        "placeholder",
        { inline: !block, light, circle },
        className
      )}
      style={{
        width: addMissingUnit(width),
        height: circle ? addMissingUnit(width) : addMissingUnit(height),
        ...style
      }}
      {...rest}
    />
  );
}

export default Placeholder;

Placeholder.propTypes = {
  circle: PropTypes.bool,
  block: PropTypes.bool,
  light: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
