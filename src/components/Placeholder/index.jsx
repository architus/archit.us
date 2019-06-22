import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { addMissingUnit, multiplyDimension, isEmptyOrNil } from "../../util";

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

// ? ==============
// ? Sub-components
// ? ==============

// Single-line placeholder
function PlaceholderText({
  text,
  style,
  size = "1.2em",
  width = "5em",
  light = false,
  ...rest
}) {
  return isEmptyOrNil(text) ? (
    <Placeholder
      style={style}
      height={size}
      width={width}
      light={light}
      block
      {...rest}
    />
  ) : (
    <p
      style={{
        fontSize: multiplyDimension(addMissingUnit(size), 0.85),
        ...style
      }}
      {...rest}
    >
      {text}
    </p>
  );
}

PlaceholderText.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  light: PropTypes.bool
};

// Custom placeholder container controlled by the 'value' prop
function PlaceholderCustom({
  value,
  children,
  circle,
  block,
  light,
  width,
  height,
  ...rest
}) {
  return isEmptyOrNil(value) ? (
    <Placeholder
      circle={circle}
      block={block}
      light={light}
      width={width}
      height={height}
      {...rest}
    />
  ) : block ? (
    <div {...rest}>{children}</div>
  ) : (
    <span {...rest}>{children}</span>
  );
}

PlaceholderCustom.propTypes = {
  value: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  circle: PropTypes.bool,
  block: PropTypes.bool,
  light: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

// Link sub-components
Placeholder.Text = PlaceholderText;
Placeholder.Custom = PlaceholderCustom;
