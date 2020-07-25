import * as Popper from "@popperjs/core";
import { styled } from "linaria/react";
import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { OverlayProps } from "react-overlays/esm/Overlay";

import Tooltip, { TooltipMode } from "@app/components/Tooltip";
import { Space } from "@app/theme";

const Styled = {
  HelpIconWrapper: styled.span`
    width: 1.5em;
    display: inline-block;
    position: relative;
    cursor: help;
    opacity: 0.55;
    font-size: 1.2em;

    /* Needs a slight nudge */
    transform: translateY(1px);
  `,
};

export type HelpTooltipProps = {
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
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Displays a help icon with a tooltip,
 * used for providing additonal information to users in a compact way
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
    <Styled.HelpIconWrapper className={className} style={style}>
      <FaQuestionCircle />
    </Styled.HelpIconWrapper>
  </Tooltip>
);

export default HelpTooltip;
