import { styled } from "linaria/react";
import React from "react";
import { FaQuestionCircle } from "react-icons/fa";

import Tooltip, { TooltipProps } from "@architus/facade/components/Tooltip";

const Styled = {
  HelpIcon: styled(Tooltip)`
    width: 1.5em;
    display: inline-block;
    position: relative;
    cursor: help;
    opacity: 0.55;
    font-size: 1.2em;

    svg {
      vertical-align: middle;
    }
  `,
};

export type HelpTooltipProps = {
  className?: string;
  style?: React.CSSProperties;
} & Omit<TooltipProps, "children">;

/**
 * Displays a help icon with a tooltip,
 * used for providing additonal information to users in a compact way
 */
const HelpTooltip: React.FC<HelpTooltipProps> = ({
  className,
  style,
  ...rest
}) => (
  <Styled.HelpIcon {...rest} className={className} style={style}>
    <FaQuestionCircle />
  </Styled.HelpIcon>
);

export default HelpTooltip;
