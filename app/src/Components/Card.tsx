import React from "react";
import styled, { css } from "@xstyled/emotion";
import { ColorKey, color } from "Theme";
import { WithBoxProps } from "Utility/types";

const Styled = {
  Card: styled.asideBox<ResolvedCardProps>`
    position: relative;
    color: text;
    padding: milli;
    box-shadow: 1;
    border-radius: 6px;
    border: 1px solid ${color("contrast_border")};

    &::before {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      ${(props): string =>
        css`
          background-color: ${props.glassColor};
          opacity: ${props.glassOpacity};
        `};
      border-radius: 6px;
    }

    ${(props): string =>
      css`
        backdrop-filter: blur(${props.glassBlur});
      `};

    & > * {
      position: relative;
      z-index: 1;
    }
  `,
};

type BaseCardProps = {
  glassOpacity?: number;
  glassBlur?: string | number;
  glassColor?: ColorKey;
};
type CardProps = WithBoxProps<BaseCardProps>;
type ResolvedCardProps = WithBoxProps<Required<BaseCardProps>>;

/**
 * Display component used to render a Material card component with a "frosted glass"
 * backdrop effect controllable with `glassColor`, `glassOpacity`, and `glassBlur`
 */
const Card: React.FC<CardProps> = ({
  glassColor = "b_600",
  glassOpacity = 0.4,
  glassBlur = "2px",
  ...props
}) => (
  <Styled.Card
    glassColor={glassColor}
    glassOpacity={glassOpacity}
    glassBlur={glassBlur}
    {...props}
  />
);

export default Card;
