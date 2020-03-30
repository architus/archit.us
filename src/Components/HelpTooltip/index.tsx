import React from "react";
import classNames from "classnames";
import Icon from "Components/Icon";
import Tooltip from "Components/Tooltip";
import "./style.scss";
import { StyleObject } from "Utility/types";

type HelpTooltipProps = {
  content: string;
  id: string;
  top?: boolean;
  right?: boolean;
  left?: boolean;
  className?: string;
  style?: StyleObject;
} & Omit<
  Partial<React.ComponentProps<typeof Tooltip>>,
  "text" | "top" | "left" | "bottom"
>;

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
    {...rest}
  >
    <span className={classNames("help-tooltip", className)} style={style}>
      <Icon name="question-circle" size="lg" />
    </span>
  </Tooltip>
);

HelpTooltip.displayName = "HelpTooltip";

export default HelpTooltip;
