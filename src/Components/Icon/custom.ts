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
      "M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3z",
    ],
  }),

  clearFilter: makeIcon({
    prefix: "fas",
    iconName: "clear-filter",
    icon: [
      512,
      512,
      [],
      "f401",
      "M488,0H24C2.7,0-8,25.9,7.1,41l184.9,185V432c0,7.8,3.8,15.2,10.2,19.7l80,56c15.8,11,37.8-0.1,37.8-19.7v-262L504.9,41 C520,25.9,509.3,0,488,0zM512,337.9 478.5,304.4 429.7,353.2 380.9,304.4 347.4,337.9 396.2,386.7 347.4,435.5 380.9,469 429.7,420.2 478.5,469 512,435.5 463.2,386.7z",
    ],
  }),

  compact: makeIcon({
    prefix: "fas",
    iconName: "compact",
    icon: [
      34,
      34,
      [],
      "f402",
      "M34,2H0V0h34V2z M34,4H0v2h34V4z M34,8H0v2h34V8z M34,12H0v2h34V12z M34,16H0v2h34V16z M34,20H0v2h34V20z M34,24H0v2h34V24 z M34,28H0v2h34V28z M34,32H0v2h34V32z",
    ],
  }),

  comfy: makeIcon({
    prefix: "fas",
    iconName: "comfy",
    icon: [
      34,
      34,
      [],
      "f403",
      "M34,4.5H0V0h34V4.5z M34,7.4H0v4.5h34V7.4z M0,19.3h34v-4.5H0V19.3z M0,26.6h34v-4.5H0V26.6z M34,29.5H0V34h34V29.5z",
    ],
  }),

  sparse: makeIcon({
    prefix: "fas",
    iconName: "sparse",
    icon: [
      34,
      34,
      [],
      "f404",
      "M34,8H0V0h34V8z M34,26H0v8h34V26z M34,13H0v8h34V13z",
    ],
  }),

  pullRequest: makeIcon({
    prefix: "fas",
    iconName: "pull-request",
    icon: [
      16,
      16,
      [],
      "f405",
      "M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z",
    ],
  }),

  branch: makeIcon({
    prefix: "fas",
    iconName: "branch",
    icon: [
      16,
      16,
      [],
      "f406",
      "M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z",
    ],
  }),

  commit: makeIcon({
    prefix: "fas",
    iconName: "commit",
    icon: [
      16,
      16,
      [],
      "f407",
      "M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.001 4.001 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z",
    ],
  }),
};
