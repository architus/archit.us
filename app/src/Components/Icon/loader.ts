import {
  library,
  IconDefinition,
  IconPack,
  IconName,
  IconPrefix,
} from "@fortawesome/fontawesome-svg-core";

import { icons, CustomIconDefinition, CustomIconName } from "./custom";
import * as FontAwesomeIcons from "./fontawesome";
import { invertMap, isDefined } from "@app/utility";

const faIcons: IconDefinition[] = Object.values(FontAwesomeIcons);

const customIcons: CustomIconDefinition<CustomIconName>[] = Object.values(
  icons
);

type AnyIconDefinition = IconDefinition | CustomIconDefinition<CustomIconName>;
export type AnyIconName = IconName | CustomIconName;

const allIcons: AnyIconDefinition[] = [...faIcons, ...customIcons];
const nameToTypeMap: Map<AnyIconName, IconPrefix> = new Map(
  allIcons.map((i) => [i.iconName, i.prefix])
);
export const allIconNames: AnyIconName[] = Array.from(nameToTypeMap.keys());

const typeResolutionMap = invertMap(nameToTypeMap);

// Cast to bypass library type checking
library.add(...((allIcons as unknown) as Array<IconDefinition | IconPack>));

function resolveIconPrefix(name: AnyIconName): IconPrefix {
  let prefix: IconPrefix = "fas"; // default
  for (const prefixClass of typeResolutionMap.keys()) {
    const nameArray = typeResolutionMap.get(prefixClass);
    if (isDefined(nameArray) && nameArray.includes(name)) {
      prefix = prefixClass;
      break;
    }
  }
  return prefix;
}

export function resolveIcon(
  name: AnyIconName,
  prefix?: IconPrefix
): [IconPrefix, AnyIconName] {
  return [isDefined(prefix) ? prefix : resolveIconPrefix(name), name];
}
