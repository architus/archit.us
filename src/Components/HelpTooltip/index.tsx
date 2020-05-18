import React from "react";
import styled, { BoxProps } from "@xstyled/emotion";
import Icon from "Components/Icon";
import Tooltip from "Components/Tooltip";
import { StyleObject } from "Utility/types";

const Styled = {
  HelpIcon: styled.spanBox`
    width: 1.5em;
    display: inline-block;
    position: relative;
    cursor: help;
    opacity: 0.55;
    font-size: 1.2em;
    transform: translateY(1px);
  `,
};

type HelpTooltipProps = {
  content: string;
  id: string;
  top?: boolean;
  right?: boolean;
  left?: boolean;
  className?: string;
  style?: StyleObject;
} & BoxProps;

const HelpTooltip: React.FC<HelpTooltipProps> = ({
  content,
  id,
  top = false,
  right = false,
  left = false,
  className = "",
  style = {},
  ...rest
}) => (
  <Tooltip
    id={id}
    text={content}
    top={top}
    left={left}
    bottom={!top && !right && !left}
  >
    <Styled.HelpIcon className={className} style={style} {...rest}>
      <Icon name="question-circle" />
    </Styled.HelpIcon>
  </Tooltip>
);

HelpTooltip.displayName = "HelpTooltip";

export default HelpTooltip;
