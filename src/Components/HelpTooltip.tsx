import React from "react";
import styled from "@xstyled/emotion";
import * as Popper from "@popperjs/core";
import { OverlayProps } from "react-overlays/esm/Overlay";
import Icon from "Components/Icon";
import Tooltip, { TooltipMode } from "Components/Tooltip";
import { StyleObject, WithBoxProps } from "Utility/types";
import { Space } from "Theme";

const Styled = {
  HelpIcon: styled.spanBox`
    width: 1.5em;
    display: inline-block;
    position: relative;
    cursor: help;
    opacity: 0.55;
    font-size: 1.2em;

    // Needs a slight nudge
    transform: translateY(1px);
  `,
};

type HelpTooltipProps = WithBoxProps<{
  text: string;
  id: string;
  placement?: Popper.Placement;
  left?: boolean;
  bottom?: boolean;
  top?: boolean;
  tooltipPadding?: Space;
  tooltipMaxWidth?: Space;
  delay?: number;
  toggle?: TooltipMode;
  popperConfig?: OverlayProps["popperConfig"];
  // Common style Props
  className?: string;
  style?: StyleObject;
}>;

/**
 * Displays a help icon with a tooltip, used for providing additonal information to users
 * in a compact way
 */
const HelpTooltip: React.FC<HelpTooltipProps> = ({
  text,
  id,
  placement,
  left = false,
  bottom = false,
  top = false,
  tooltipPadding,
  tooltipMaxWidth,
  delay,
  toggle,
  popperConfig,
  className,
  style,
  ...boxProps
}) => (
  <Tooltip
    id={id}
    text={text}
    placement={placement}
    left={left}
    bottom={bottom}
    top={top}
    padding={tooltipPadding}
    maxWidth={tooltipMaxWidth}
    delay={delay}
    toggle={toggle}
    popperConfig={popperConfig}
  >
    <Styled.HelpIcon className={className} style={style} {...boxProps}>
      <Icon name="question-circle" />
    </Styled.HelpIcon>
  </Tooltip>
);

export default HelpTooltip;
