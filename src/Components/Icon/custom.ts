import { IconDefinition as FaIconDefinition } from "@fortawesome/fontawesome-svg-core";

export type CustomIconDefinition<T extends string> = Omit<
  FaIconDefinition,
  "iconName"
> & {
  iconName: T;
};

type CustomIconMap = { [k in keyof typeof icons]: typeof icons[k]["iconName"] };
export type CustomIconName = CustomIconMap[keyof CustomIconMap];

/**
 * Type inference utility function
 */
function makeIcon<T extends string>(
  icon: CustomIconDefinition<T>
): CustomIconDefinition<T> {
  return icon;
}

export const icons = {
  shield: makeIcon({
    prefix: "fas",
    iconName: "shield",
    icon: [
      512,
      512,
      [],
      "f400",
      "M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3z"
    ]
  }),

  clearFilter: makeIcon({
    prefix: "fas",
    iconName: "clear-filter",
    icon: [
      512,
      512,
      [],
      "f401",
      "M488,0H24C2.7,0-8,25.9,7.1,41l184.9,185V432c0,7.8,3.8,15.2,10.2,19.7l80,56c15.8,11,37.8-0.1,37.8-19.7v-262L504.9,41 C520,25.9,509.3,0,488,0zM512,337.9 478.5,304.4 429.7,353.2 380.9,304.4 347.4,337.9 396.2,386.7 347.4,435.5 380.9,469 429.7,420.2 478.5,469 512,435.5 463.2,386.7z"
    ]
  }),

  compact: makeIcon({
    prefix: "fas",
    iconName: "compact",
    icon: [
      34,
      34,
      [],
      "f402",
      "M34,2H0V0h34V2z M34,4H0v2h34V4z M34,8H0v2h34V8z M34,12H0v2h34V12z M34,16H0v2h34V16z M34,20H0v2h34V20z M34,24H0v2h34V24 z M34,28H0v2h34V28z M34,32H0v2h34V32z"
    ]
  }),

  comfy: makeIcon({
    prefix: "fas",
    iconName: "comfy",
    icon: [
      34,
      34,
      [],
      "f403",
      "M34,4.5H0V0h34V4.5z M34,7.4H0v4.5h34V7.4z M0,19.3h34v-4.5H0V19.3z M0,26.6h34v-4.5H0V26.6z M34,29.5H0V34h34V29.5z"
    ]
  }),

  sparse: makeIcon({
    prefix: "fas",
    iconName: "sparse",
    icon: [
      34,
      34,
      [],
      "f404",
      "M34,8H0V0h34V8z M34,26H0v8h34V26z M34,13H0v8h34V13z"
    ]
  })
};
