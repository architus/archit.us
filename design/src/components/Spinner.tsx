import React from "react";
import { styled } from "linaria/react";

import { color, Variant } from "@design/theme/color";
import { animation } from "@design/theme/motion";

const Styled = {
  Spinner: styled.svg<{ variant: Variant; size: string }>`
    --size: ${(props): string => props.size};
    --stroke: calc(var(--size) / 12);
    --color: ${(props): string => color(props.variant)};

    ${animation("rotate")}
    animation: rotate 2s linear infinite;

    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: calc(var(--size) / -2) 0 0 calc(var(--size) / -2);
    width: var(--size);
    height: var(--size);
  `,
  Path: styled.circle`
    fill: none;
    stroke: var(--color);
    stroke-linecap: round;
    stroke-width: var(--stroke);

    ${animation("spinnerDash")}
    animation: spinnerDash 1.5s ease-in-out infinite;
  `,
};

type SpinnerProps = {
  variant?: Variant;
  size?: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Bootstrap-style spinner component
 */
const Spinner: React.FC<SpinnerProps> = ({
  variant = "primary",
  size = "64px",
  className,
  style,
}) => (
  <Styled.Spinner
    viewBox="0 0 50 50"
    variant={variant}
    size={size}
    className={className}
    style={style}
  >
    <Styled.Path cx="25" cy="25" r="20" />
  </Styled.Spinner>
);

export default Spinner;
