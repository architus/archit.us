import { BreakpointKey } from "@design/theme/media";

export const headerHeight = "58px" as const;
export const collapseBreakpoint: BreakpointKey = "md";
export const minimizeBreakpoint: BreakpointKey = "xl";
export const sitePaddingVariable = `--site-padding`;
export const contentWidthVariable = `--content-width`;
export const sitePadding = `var(${sitePaddingVariable})`;
export const contentWidth = `var(${contentWidthVariable})`;
export const contentWidthToc = "49rem";

export const fullDrawerWidth = "325px";
export const minimizedDrawerWidth = "285px";
