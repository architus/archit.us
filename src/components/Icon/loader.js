import { invertMap } from "utility";
import { library } from "@fortawesome/fontawesome-svg-core";

import * as FontAwesomeIcons from "./fontawesome";
import * as CustomIcons from "./custom";

const allIcons = [
  ...Object.values(FontAwesomeIcons),
  ...Object.values(CustomIcons)
];
const nameToTypeMap = Object.assign(
  {},
  ...allIcons.map(i => ({ [i.iconName]: i.prefix }))
);
const typeResolutionMap = invertMap(nameToTypeMap);
library.add(...allIcons);

function resolveTypeClass(name) {
  let foundClass = "fas"; // default
  for (var typeClass in typeResolutionMap) {
    if (typeResolutionMap[typeClass].includes(name)) {
      foundClass = typeClass;
      break;
    }
  }
  return foundClass;
}

export function resolveIcon(name) {
  return [resolveTypeClass(name), name];
}
