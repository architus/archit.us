import React from "react";
import { parseDimension, formatDimension } from "Utility";
import { OverlayTrigger, Tooltip as BootstrapTooltip } from "react-bootstrap";
import { Placement, PopperOptions, Modifiers } from "popper.js";
import "./style.scss";

function resolvePlacement({
  top,
  bottom,
  left
}: {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
}): Placement {
  if (top) return "top";
  if (bottom) return "bottom";
  if (left) return "left";
  return "right";
}

type TooltipMode = "hover" | "click";

type TooltipProps = {
  id: string;
  text: string;
  children: React.ReactNode;
  left?: boolean;
  bottom?: boolean;
  top?: boolean;
  hide?: boolean;
  padding?: string | number;
  delay?: number;
  toggle?: TooltipMode;
  modifiers?: Modifiers;
  popperConfig?: PopperOptions;
};

const Tooltip: React.FC<TooltipProps> = ({
  id,
  text,
  children,
  modifiers,
  popperConfig,
  left,
  top,
  bottom,
  hide,
  padding = "0.35rem",
  toggle = "hover",
  delay = 0,
  ...rest
}) => (
  <OverlayTrigger
    trigger={toggle === "click" ? "click" : undefined}
    placement={resolvePlacement({ top, bottom, left })}
    popperConfig={{
      modifiers: {
        preventOverflow: {
          enabled: true,
          boundariesElement: "window"
        },
        ...modifiers
      },
      ...popperConfig
    }}
    delay={delay}
    overlay={
      <BootstrapTooltip
        id={id}
        bsPrefix={hide ? "hide-tooltip" : undefined}
        {...rest}
      >
        <div
          style={{
            padding: parseDimension(padding)
              .map(formatDimension)
              .getOrElse(undefined)
          }}
        >
          {text}
        </div>
      </BootstrapTooltip>
    }
  >
    {children}
  </OverlayTrigger>
);

Tooltip.displayName = "Tooltip";

export default Tooltip;
