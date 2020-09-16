// From https://react-popper-tooltip.netlify.app/readme#quick-start
import { css, cx } from "linaria";
import React from "react";
import TooltipTrigger from "react-popper-tooltip";

import { color } from "../theme/color";
import { transition } from "../theme/motion";
import { ZIndex } from "../theme/order";
import { shadow } from "../theme/shadow";
import { gap, SpacingKey } from "../theme/spacing";
import { isDefined } from "@architus/lib/utility";

const globalPadding = 18;

export const tooltipColorVar = `--tooltip-color`;
export const tooltipArrowColorVar = `--tooltip-arrow`;
export const tooltipBorderVar = `--tooltip-border`;
const styles = {
  tooltip: css`
    ${tooltipColorVar}: ${color("tooltip")};
    ${tooltipArrowColorVar}: ${color("tooltip")};
    ${tooltipBorderVar}: transparent;
  `,
};

const tooltipContainerClass = css`
  background-color: var(${tooltipColorVar});
  border: 1px solid var(${tooltipBorderVar});
  box-shadow: ${shadow("z3")};
  border-radius: 4px;
  display: flex;
  color: ${color("light")};
  flex-direction: column;
  ${transition(["opacity"])}
  font-size: 0.9rem;
  z-index: ${ZIndex.Tooltip};

  padding: ${gap.femto} ${gap.pico};
  max-width: calc(100vw - (2 * ${globalPadding}px));
  max-height: calc(100vh - (2 * ${globalPadding}px));
`;

const placementFormatters = {
  top: {
    color: (c: string): string => `${c} transparent transparent transparent`,
    width: `0.4rem 0.4rem 0 0.4rem`,
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
    width: `0 0.4rem 0.4rem 0.4rem`,
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
    width: `0.4rem 0 0.4rem 0.4em`,
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
    width: `0.4rem 0.4rem 0.4rem 0`,
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
          `var(${tooltipArrowColorVar})`
        )};
        border-width: ${placementFormatters[placement].width};
        ${placementFormatters[placement].arrowBefore}
      }

      &[data-placement*="${placement}"]::after {
        border-color: ${placementFormatters[placement].color(
          `var(${tooltipColorVar})`
        )};
        border-width: ${placementFormatters[placement].width};
        ${placementFormatters[placement].arrowAfter}
      }
    `
    )
    .join("\n")}
`;

export type TooltipVariant = "tooltip";
type BaseTooltipProps = {
  children: React.ReactNode;
  tooltip: React.ReactNode;
  variant?: TooltipVariant;
  hideArrow?: boolean;
  padding?: SpacingKey;
  maxWidth?: string | number;
  onContentClick?: (e: React.MouseEvent) => void;
  innerProps?: Partial<React.HTMLAttributes<HTMLSpanElement>>;
  tooltipClassName?: string;
  arrowClassName?: string;
  offset?: number;
  axisOffset?: number;
  screenPadding?: number;
  className?: string;
  style?: React.CSSProperties;
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
  variant = "tooltip",
  hideArrow = false,
  padding = "atto",
  maxWidth = gap.giga,
  offset = 8,
  axisOffset = 0,
  screenPadding = globalPadding,
  onContentClick,
  tooltipClassName,
  arrowClassName,
  className,
  style,
  innerProps = {},
  ...props
}) =>
  isDefined(tooltip) ? (
    <TooltipTrigger
      {...props}
      modifiers={[
        {
          name: "flip",
          options: {
            padding: screenPadding,
          },
        },
        {
          name: "preventOverflow",
          options: {
            padding: screenPadding,
            altAxis: true,
          },
        },
        {
          name: "offset",
          options: {
            offset: [0, offset],
          },
        },
      ]}
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
            className: cx(
              tooltipContainerClass,
              styles[variant],
              tooltipClassName
            ),
          })}
          onClick={onContentClick}
        >
          {!hideArrow && (
            <div
              {...getArrowProps({
                ref: arrowRef,
                className: cx(tooltipArrowClass, arrowClassName),
                "data-placement": placement,
              })}
            />
          )}
          <div style={{ padding: gap(padding), maxWidth, overflow: "auto" }}>
            {tooltip}
          </div>
        </div>
      )}
    >
      {({ getTriggerProps, triggerRef }): React.ReactNode => (
        <span
          {...getTriggerProps({
            ref: triggerRef,
          })}
          className={className}
          style={style}
          {...innerProps}
        >
          {children}
        </span>
      )}
    </TooltipTrigger>
  ) : (
    <span className={className} style={style} {...innerProps}>
      {children}
    </span>
  );
export default Tooltip;
