import React from "react";
import PropTypes from "prop-types";
import { addMissingUnit, multiplyDimension } from "../../util";
import Placeholder from "../Placeholder";

function PlaceholderText({
  text,
  style,
  size = "1.2em",
  width = "5em",
  light = false,
  ...rest
}) {
  return text && text.toString().trim() ? (
    <p
      style={{
        fontSize: multiplyDimension(addMissingUnit(size), 0.85),
        ...style
      }}
      {...rest}
    >
      {text}
    </p>
  ) : (
    <Placeholder
      style={style}
      height={size}
      width={width}
      light={light}
      block
      {...rest}
    />
  );
}

export default PlaceholderText;

PlaceholderText.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  light: PropTypes.bool
};
