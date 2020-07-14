import { styled } from "linaria/react";
import { transparentize } from "polished";
import React from "react";

import BuildDetails, {
  BuildContext,
  BuildMetadataEntry,
} from "@design/components/BuildDetails";
import Tooltip, { TooltipProps } from "@design/components/Tooltip";
import { dynamicColor, ColorMode, color } from "@design/theme/color";
import { gap } from "@design/theme/spacing";
import { isDefined } from "@lib/utility";

const Styled = {
  Pill: styled.div<{ hasIcon: boolean }>`
    display: inline-block;
    padding: ${(props): string =>
      props.hasIcon ? `2px ${gap.pico} 3px` : `5px ${gap.pico} 4px`};
    border-radius: 4px;
    border: 2px solid ${color("secondary")};
    color: ${color("light")};
    background-color: ${transparentize(
      0.7,
      dynamicColor("secondary", ColorMode.Light)
    )};
    cursor: pointer;

    font-weight: 500;
    font-size: 13px;
    letter-spacing: 1px;
    line-height: 1;
    user-select: none;
  `,
  Icon: styled.span`
    margin-right: ${gap.pico};
    position: relative;
    top: 2px;
  `,
};

export interface BuildMetadata {
  label: string;
  icon?: React.ReactNode;
  context: BuildContext;
  details: BuildMetadataEntry[];
}

export type BuildTagProps = {
  metadata: BuildMetadata;
  tooltipPlacement?: TooltipProps["placement"];
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Build marker to use in non-production environments
 * to display the CI/local build status
 */
const BuildTag: React.FC<BuildTagProps> = ({
  metadata,
  className,
  style,
  tooltipPlacement = "top",
}) => (
  <Tooltip
    padding="pico"
    maxWidth={gap.tera}
    trigger="click"
    placement={tooltipPlacement}
    // Prevent the mouse event from bubbling up
    onContentClick={(e: React.MouseEvent): void => e.preventDefault()}
    tooltip={
      <BuildDetails context={metadata.context} entries={metadata.details} />
    }
  >
    <Styled.Pill
      className={className}
      style={style}
      hasIcon={isDefined(metadata.icon)}
    >
      {metadata.icon && <Styled.Icon>{metadata.icon}</Styled.Icon>}
      {metadata.label}
    </Styled.Pill>
  </Tooltip>
);

export default BuildTag;
