import { BreakpointKey } from "@design/theme";

export const headerHeight = "58px" as const;
export const collapseBreakpoint: BreakpointKey = "md";
export const minimizeBreakpoint: BreakpointKey = "xl";
export const sitePaddingVariable = `--site-padding`;
export const contentWidthVariable = `--content-width`;
export const sitePadding = `var(${sitePaddingVariable})`;
export const contentWidth = `var(${contentWidthVariable})`;
