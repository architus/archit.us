import { css, cx } from "linaria";
import { styled } from "linaria/react";
import { transparentize } from "polished";
import React from "react";

import { mode, ColorMode, staticColor } from "../theme/color";
import { animation } from "../theme/motion";
import { gap } from "../theme/spacing";
import {
  RawDimension,
  parseDimension,
  formatDimension,
} from "@architus/lib/dimension";

const baseSkeletonClass = css`
  --skeleton-dark-color: ${transparentize(0.9, staticColor("dark"))};
  --skeleton-dark-alt-color: ${transparentize(0.8, staticColor("dark"))};

  --skeleton-light-color: ${transparentize(0.85, staticColor("light"))};
  --skeleton-light-alt-color: ${transparentize(0.7, staticColor("light"))};

  position: relative;
  background-size: 1000px 100%;

  ${animation("shimmer")}
  animation: shimmer 3s linear infinite;

  &[data-variant="dark"] {
    background-image: linear-gradient(
      to right,
      var(--skeleton-dark-color) 4%,
      var(--skeleton-dark-alt-color) 25%,
      var(--skeleton-dark-color) 36%
    );
  }

  &[data-variant="light"],
  &[data-variant="auto"] {
    background-image: linear-gradient(
      to right,
      var(--skeleton-light-color) 4%,
      var(--skeleton-light-alt-color) 25%,
      var(--skeleton-light-color) 36%
    );
  }

  &[data-variant="auto"] {
    ${mode(ColorMode.Light)} {
      background-image: linear-gradient(
        to right,
        var(--skeleton-dark-color) 4%,
        var(--skeleton-dark-alt-color) 25%,
        var(--skeleton-dark-color) 36%
      );
    }
  }
`;

const Styled = {
  Skeleton: styled.span<{ w?: string; h: string }>`
    height: ${(props): string => props.h};

    &[data-width="block"] {
      display: block;
    }

    &[data-width="sized"] {
      display: inline-block;
      width: ${(props): string => props.w ?? "0"};
    }

    &[data-circle="true"] {
      border-radius: 200rem;
    }
  `,
  TextSkeleton: styled.span`
    display: inline;
    user-select: none !important;
    color: transparent !important;
  `,
};

type SkeletonVariant = "light" | "dark" | "auto";
type BoxSkeletonProps = {
  width?: "block" | RawDimension;
  height: RawDimension;
  circle?: boolean;
  variant?: SkeletonVariant;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Renders a shimmy background block
 */
const BoxSkeleton: React.FC<BoxSkeletonProps> = ({
  width = "block",
  height,
  circle = false,
  variant = "auto",
  className,
  style,
}) => {
  // Resolve props based on sizing mode
  const sizingProps =
    width === "block"
      ? {
          "data-width": "block",
          h: parseDimension(height).map(formatDimension).getOrElse(gap.pico),
        }
      : {
          "data-width": "sized",
          h: parseDimension(height).map(formatDimension).getOrElse(gap.nano),
          w: parseDimension(width).map(formatDimension).getOrElse(gap.nano),
        };

  return (
    <Styled.Skeleton
      {...sizingProps}
      data-variant={variant}
      data-circle={circle ? "true" : undefined}
      aria-hidden
      className={cx(baseSkeletonClass, className)}
      style={style}
    />
  );
};

type TextSkeletonProps = {
  placeholder: string;
  variant?: SkeletonVariant;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Renders a shimmery background block, sized according to the text it contains,
 * which is passed in but is hidden from sight & screen-readers
 */
const TextSkeleton: React.FC<TextSkeletonProps> = ({
  placeholder,
  variant = "auto",
  className,
  style,
}) => (
  <Styled.TextSkeleton
    data-variant={variant}
    aria-hidden
    className={cx(baseSkeletonClass, className)}
    style={style}
  >
    {placeholder}
  </Styled.TextSkeleton>
);

export default { Box: BoxSkeleton, Text: TextSkeleton };
