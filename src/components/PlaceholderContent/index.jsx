import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { addMissingUnit } from "../../util";

import "./style.scss";

function PlaceholderContent({
  shape = "rect",
  inline = false,
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
        "placeholder-content",
        { inline, light },
        `shape-${shape}`,
        className
      )}
      style={{
        width: addMissingUnit(width),
        height:
          shape === "circle" ? addMissingUnit(width) : addMissingUnit(height),
        ...style
      }}
      {...rest}
    />
  );
}

export default PlaceholderContent;

PlaceholderContent.propTypes = {
  shape: PropTypes.string,
  inline: PropTypes.bool,
  light: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
