// From https://react-popper-tooltip.netlify.app/readme#quick-start
import { css } from "linaria";
import React from "react";
import TooltipTrigger from "react-popper-tooltip";

import { isDefined } from "@architus/lib/utility";
import { color } from "../theme/color";
import { transition } from "../theme/motion";
import { ZIndex } from "../theme/order";
import { shadow } from "../theme/shadow";
import { gap, SpacingKey } from "../theme/spacing";

const globalPadding = 18;

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
          "var(--tooltip-arrow)"
        )};
        border-width: ${placementFormatters[placement].width};
        ${placementFormatters[placement].arrowBefore}
      }

      &[data-placement*="${placement}"]::after {
        border-color: ${placementFormatters[placement].color(
          "var(--tooltip-color)"
        )};
        border-width: ${placementFormatters[placement].width};
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
  innerProps?: Partial<React.HTMLAttributes<HTMLSpanElement>>;
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
  hideArrow = false,
  padding = "atto",
  maxWidth = gap.giga,
  onContentClick,
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
          name: "preventOverflow",
          options: {
            padding: globalPadding,
          },
        },
        {
          name: "offset",
          options: {
            offset: [0, 8],
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
    <>{children}</>
  );
export default Tooltip;
