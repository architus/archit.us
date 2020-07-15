import React, { useState, createRef } from "react";
import styled, { Box, BoxProps } from "@xstyled/emotion";
import * as Popper from "@popperjs/core";
import {
  OverlayTrigger,
  Tooltip as BootstrapTooltip,
  OverlayProps,
  Overlay,
} from "react-bootstrap";
import { UsePopperOptions } from "react-overlays/esm/usePopper";
import { isDefined, isNil } from "Utility";
import { StyleObject } from "Utility/types";
import { Space } from "Theme";

const Styled = {
  Tooltip: styled<
    typeof BootstrapTooltip,
    { id: string; className?: string; style?: StyleObject }
  >(BootstrapTooltip)`
    z-index: 1090;

    .tooltip-inner {
      box-shadow: 3;
      padding: femto pico;
      max-width: calc(100vw - 1rem);
      background-color: tooltip;
      border-radius: 4px;
    }

    // Set the arrow colors
    ${["top", "bottom", "left", "right"]
      .map(
        (position) => `
          &[x-placement^="${position}"] .arrow::before {
            border-${position}-color: tooltip !important;
          }
        `
      )
      .join("\n")}
  `,
};

export type TooltipMode = "hover" | "click";

type TooltipControllerProps = {
  id: string;
  text: React.ReactNode;
  children: React.ReactNode;
  placement?: Popper.Placement;
  left?: boolean;
  bottom?: boolean;
  top?: boolean;
  hide?: boolean;
  padding?: Space;
  maxWidth?: Space;
  delay?: number | { show: number; hide: number };
  toggle?: TooltipMode;
  popperConfig?: OverlayProps["popperConfig"];
  // Common style Props
  className?: string;
  style?: StyleObject;
  boxProps?: BoxProps;
};

/**
 * Creates a tooltip controller in-line that can be configured to show a Popper-based
 * tooltip displayed either on hover or toggled by clicking/tapping.
 *
 * The tooltip itself is rendered at the root of the HTML body via a React Portal. The
 * `style` and `className` props are **passed in to the rendered overlay, not the in-flow
 * component**. That means that child selectors will not work as expected.
 */
const TooltipController: React.FC<TooltipControllerProps> = ({
  id,
  text,
  children,
  popperConfig,
  left,
  top,
  bottom,
  hide,
  placement,
  padding = "atto",
  toggle = "hover",
  delay = 0,
  maxWidth = "giga",
  className,
  style,
  boxProps,
}) => {
  // Normalize modifiers
  const baseModifiers = popperConfig?.modifiers;
  const modifiers = toModifierArray(baseModifiers);
  modifiers.push({
    name: "preventOverflow",
    options: {
      boundary: "window",
    },
  });

  // Inner tooltip display component (use hidden div if `hide` is true)
  const tooltip = (
    <Styled.Tooltip
      id={id}
      className={className}
      style={{ ...(style ?? {}), display: hide ? "none" : undefined }}
    >
      <Box padding={padding} maxWidth={maxWidth} {...boxProps}>
        {text}
      </Box>
    </Styled.Tooltip>
  );

  switch (toggle) {
    case "click":
      return (
        <ToggleOverlay
          placement={resolvePlacement({ top, bottom, left, placement })}
          overlay={tooltip}
          popperConfig={{
            ...popperConfig,
            modifiers,
          }}
        >
          {children}
        </ToggleOverlay>
      );
    case "hover":
      return (
        <OverlayTrigger
          placement={resolvePlacement({ top, bottom, left, placement })}
          overlay={tooltip}
          delay={delay}
          popperConfig={{
            ...popperConfig,
            modifiers,
          }}
        >
          {children}
        </OverlayTrigger>
      );
    default:
      return null;
  }
};

export default TooltipController;

// ? ================
// ? Helper functions
// ? ================

/**
 * Resolves the `Popper.Placement` prop from the passed in props to the tooltip component.
 * The boolean flags are designed for easier authoring, as they can be specified in the
 * shorthand notation. On the other hand, the `placement` pass-in prop can be used for
 * more dynamic content
 * @param options - popper props
 */
function resolvePlacement({
  top,
  bottom,
  left,
  placement,
}: {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  placement?: Popper.Placement;
}): Popper.Placement {
  if (isDefined(placement)) {
    return placement;
  }
  if (top) return "top";
  if (bottom) return "bottom";
  if (left) return "left";
  return "right";
}

/**
 * Normalizes the Popper modifiers to a modifier array
 * @param map - Modifiers map or array
 */
function toModifierArray(
  map?: UsePopperOptions["modifiers"] | undefined
): Partial<Popper.Modifier<unknown, unknown>>[] {
  if (isNil(map)) return [];
  if (Array.isArray(map)) return map;
  const result = Object.keys(map).map((k) => {
    const modObj = map[k];
    if (isNil(modObj))
      return (null as unknown) as Partial<Popper.Modifier<unknown, unknown>>;
    modObj.name = k;
    return modObj;
  });
  return result as Partial<Popper.Modifier<unknown, unknown>>[];
}

// ? ==============
// ? Sub-components
// ? ==============

type ToggleOverlayProps = {
  overlay: React.ComponentProps<typeof Overlay>["children"];
  placement: React.ComponentProps<typeof Overlay>["placement"];
  popperConfig: React.ComponentProps<typeof Overlay>["popperConfig"];
  children: React.ReactNode;
};

// Used for toggling the inner tooltip on click instead of hover (stateful)
const ToggleOverlay: React.FC<ToggleOverlayProps> = ({
  overlay,
  placement,
  popperConfig,
  children,
}) => {
  const targetRef = createRef<HTMLDivElement>();
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        ref={targetRef}
        onClick={(): void => {
          setShow(!show);
        }}
      >
        {children}
      </div>
      <Overlay
        show={show}
        target={targetRef}
        placement={placement}
        popperConfig={popperConfig}
        onHide={(): void => setShow(false)}
        rootClose
      >
        {overlay}
      </Overlay>
    </>
  );
};
