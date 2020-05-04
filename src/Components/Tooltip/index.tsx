import React from "react";
import { parseDimension, formatDimension, isNil } from "Utility";
import {
  OverlayTrigger,
  Tooltip as BootstrapTooltip,
  OverlayProps,
} from "react-bootstrap";
import { toModifierArray } from "react-overlays/esm/usePopper";
import { Placement } from "popper.js";
import "./style.scss";

function resolvePlacement({
  top,
  bottom,
  left,
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
  popperConfig?: OverlayProps["popperConfig"];
};

const Tooltip: React.FC<TooltipProps> = ({
  id,
  text,
  children,
  popperConfig,
  left,
  top,
  bottom,
  hide,
  padding = "0.35rem",
  toggle = "hover",
  delay = 0,
  ...rest
}) => {
  const baseModifiers = popperConfig?.modifiers;
  const modifiers = isNil(baseModifiers) ? [] : toModifierArray(baseModifiers);
  modifiers.push({
    name: "preventOverflow",
    options: {
      boundary: "window",
    },
  });

  return (
    <OverlayTrigger
      trigger={toggle === "click" ? "click" : undefined}
      placement={resolvePlacement({ top, bottom, left })}
      popperConfig={{
        ...popperConfig,
        modifiers,
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
                .getOrElse(undefined),
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
};

Tooltip.displayName = "Tooltip";

export default Tooltip;
