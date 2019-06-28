import React from "react";
import PropTypes from "prop-types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
library.add(faDiscord, faChevronRight, faGithub);
const typeResolutionMap = {
  fab: ["discord", "github"]
};

const baseStyle = { display: "inline-block", height: "1em", width: "1em" };
const resolveTypeClass = name => {
  let foundClass = "fas"; // default
  for (var typeClass in typeResolutionMap) {
    if (typeResolutionMap[typeClass].includes(name)) {
      foundClass = typeClass;
      break;
    }
  }
  return foundClass;
};
const resolveIcon = name => {
  return [resolveTypeClass(name), name];
};

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
