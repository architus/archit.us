import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faDiscord } from "@fortawesome/free-brands-svg-icons";
// import {
// } from '@fortawesome/free-solid-svg-icons'
library.add(faDiscord);
const typeResolutionMap = {
  fab: ["discord"]
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

const Icon = ({ className, name }) => {
  return (
    <span className={className} style={baseStyle}>
      <FontAwesomeIcon icon={resolveIcon(name)} />
    </span>
  );
};

export default Icon;
