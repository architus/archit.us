import React from "react";
import { parseDimension, formatDimension } from "Utility";
import {
  OverlayTrigger,
  Tooltip as BootstrapTooltip,
  OverlayProps,
} from "react-bootstrap";
import * as Popper from "@popperjs/core";
import { UsePopperOptions } from "react-overlays/esm/usePopper";
import "./style.scss";

function resolvePlacement({
  top,
  bottom,
  left,
}: {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
}): Popper.Placement {
  if (top) return "top";
  if (bottom) return "bottom";
  if (left) return "left";
  return "right";
}

type TooltipMode = "hover" | "click";

type TooltipProps = {
  id: string;
  text: React.ReactNode;
  children: React.ReactNode;
  left?: boolean;
  bottom?: boolean;
  top?: boolean;
  hide?: boolean;
  padding?: string | number;
  maxWidth?: string | number;
  delay?: number;
  toggle?: TooltipMode;
  popperConfig?: OverlayProps["popperConfig"];
};

function toModifierArray(
  map?: UsePopperOptions["modifiers"] | undefined
): Partial<Popper.Modifier<unknown, unknown>>[] {
  if (map == null) return [];
  if (Array.isArray(map)) return map;
  const result = Object.keys(map).map((k) => {
    const modObj = map[k];
    if (modObj == null)
      return (null as unknown) as Partial<Popper.Modifier<unknown, unknown>>;
    modObj.name = k;
    return modObj;
  });
  return result as Partial<Popper.Modifier<unknown, unknown>>[];
}

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
  maxWidth = "240px",
  ...rest
}) => {
  const baseModifiers = popperConfig?.modifiers;
  const modifiers = toModifierArray(baseModifiers);
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
          <div className="tooltip-content">
            <div
              style={{
                padding: parseDimension(padding)
                  .map(formatDimension)
                  .getOrElse(undefined),
                maxWidth: parseDimension(maxWidth)
                  .map(formatDimension)
                  .getOrElse(undefined),
              }}
            >
              {text}
            </div>
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
