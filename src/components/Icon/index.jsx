import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { resolveIcon } from "./loader";

const baseStyle = { display: "inline-block", height: "1em", width: "1em" };
const Icon = ({ className, name, style, ...rest }) => {
  return (
    <span className={className} style={{ ...baseStyle, ...style }}>
      <FontAwesomeIcon icon={resolveIcon(name)} />
    </span>
  );
};

export default Icon;

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  style: PropTypes.object
};
