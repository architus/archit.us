// From https://react-popper-tooltip.netlify.app/readme#quick-start
import React from "react";
import TooltipTrigger from "react-popper-tooltip";
import { css } from "linaria";

import {
  ZIndex,
  shadow,
  transition,
  color,
  gap,
  SpacingKey,
} from "@design/theme";

const tooltipContainerClass = css`
  --tooltip-color: ${color("tooltip")};
  --tooltip-arrow: ${color("tooltip")};
  --tooltip-border: transparent;

  background-color: var(--tooltip-color);
  border: 1px solid var(--tooltip-border);
  box-shadow: ${shadow("z3")};
  border-radius: 4px;
  display: flex;
  color: ${color("light")};
  flex-direction: column;
  ${transition(["opacity"])}
  font-size: 90%;
  z-index: ${ZIndex.Tooltip};

  margin: 0.4rem;
  padding: ${gap.femto} ${gap.pico};
  max-width: calc(100vw - 1rem);
`;

const placementFormatters = {
  top: {
    color: (c: string): string => `${c} transparent transparent transparent`,
    width: `0.4rem 0.5rem 0 0.5rem`,
    arrow: `
      margin-bottom: -1rem;
      bottom: 0;
      left: 0;
    `,
    arrowBefore: `
      position: absolute;
      top: 1px;
    `,
    arrowAfter: ``,
  },
  bottom: {
    color: (c: string): string => `transparent transparent ${c} transparent`,
    width: `0 0.5rem 0.4rem 0.5rem`,
    arrow: `
      margin-top: -0.4rem;
      left: 0;
      top: 0;
    `,
    arrowBefore: `
      position: absolute;
      top: -1px;
    `,
    arrowAfter: ``,
  },
  left: {
    color: (c: string): string => `transparent transparent transparent ${c}`,
    width: `0.5rem 0 0.5rem 0.4em`,
    arrow: `
      left: 3px;
      top: 0;
    `,
    arrowBefore: ``,
    arrowAfter: `
      left: 3px;
      top: 0;
    `,
  },
  right: {
    color: (c: string): string => `transparent ${c} transparent transparent`,
    width: `0.5rem 0.4rem 0.5rem 0`,
    arrow: `
      margin-left: -0.7rem;
      left: 0;
    `,
    arrowBefore: ``,
    arrowAfter: `
      left: 6px;
      top: 0;
    `,
  },
} as const;

const tooltipArrowClass = css`
  height: 1rem;
  width: 1rem;
  position: absolute;

  &::before {
    border-style: solid;
    content: "";
    display: block;
    height: 0;
    margin: auto;
    width: 0;
  }

  &::after {
    border-style: solid;
    content: "";
    display: block;
    height: 0;
    margin: auto;
    position: absolute;
    width: 0;
  }

  ${(["bottom", "top", "left", "right"] as const)
    .map(
      (placement): string => `
      &[data-placement*="${placement}"] {
        height: 1rem;
        width: 1rem;
        ${placementFormatters[placement].arrow}
      }

      &[data-placement*="${placement}"]::before {
        border-color: ${placementFormatters[placement].color(
          "var(--tooltip-arrow)"
        )};
        border-color: ${placementFormatters[placement].width};
        ${placementFormatters[placement].arrowBefore}
      }

      &[data-placement*="${placement}"]::after {
        border-color: ${placementFormatters[placement].color(
          "var(--tooltip-color)"
        )};
        border-color: ${placementFormatters[placement].width};
        ${placementFormatters[placement].arrowAfter}
      }
    `
    )
    .join("\n")}
`;

type BaseTooltipProps = {
  children: React.ReactNode;
  tooltip: React.ReactNode;
  hideArrow?: boolean;
  padding?: SpacingKey;
  maxWidth?: string | number;
  onContentClick?: (e: React.MouseEvent) => void;
};

export type TooltipProps = BaseTooltipProps &
  Omit<
    Partial<React.ComponentProps<typeof TooltipTrigger>>,
    keyof BaseTooltipProps
  >;

/**
 * Displays a tooltip that wraps its content.
 * See `react-popper-tooltip` for accepted options.
 * https://react-popper-tooltip.netlify.app/
 */
const Tooltip: React.FC<TooltipProps> = ({
  children,
  tooltip,
  hideArrow = false,
  padding = "atto",
  maxWidth = gap.giga,
  onContentClick,
  ...props
}) => (
  <TooltipTrigger
    {...props}
    tooltip={({
      arrowRef,
      tooltipRef,
      getArrowProps,
      getTooltipProps,
      placement,
    }): React.ReactNode => (
      <div
        {...getTooltipProps({
          ref: tooltipRef,
          className: tooltipContainerClass,
        })}
        onClick={onContentClick}
      >
        {!hideArrow && (
          <div
            {...getArrowProps({
              ref: arrowRef,
              className: tooltipArrowClass,
              "data-placement": placement,
            })}
          />
        )}
        <div style={{ padding: gap(padding), maxWidth }}>{tooltip}</div>
      </div>
    )}
  >
    {({ getTriggerProps, triggerRef }): React.ReactNode => (
      <span
        {...getTriggerProps({
          ref: triggerRef,
        })}
      >
        {children}
      </span>
    )}
  </TooltipTrigger>
);
export default Tooltip;
