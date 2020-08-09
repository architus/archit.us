import { styled } from "linaria/react";
import React from "react";

import { ColorKey, color } from "@architus/facade/theme/color";
import { shadow } from "@architus/facade/theme/shadow";
import { gap } from "@architus/facade/theme/spacing";

type GlassParameters = {
  glassOpacity?: number;
  glassBlur?: string | number;
  glassColor?: ColorKey;
};

export type GlassCardProps = React.ComponentProps<typeof GlassCard>;

/**
 * Display component used to render a Material card component with a "frosted glass"
 * backdrop effect controllable with `glassColor`, `glassOpacity`, and `glassBlur`
 */
const GlassCard = styled.aside<GlassParameters>`
  position: relative;
  color: text;
  padding: ${gap.milli};
  box-shadow: ${shadow("z1")};
  border-radius: 6px;
  border: 1px solid ${color("contrastBorder")};
  backdrop-filter: ${(props): string => `blur(${props.glassBlur ?? "2px"})`};

  &::before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props): string => color(props.glassColor ?? "bg+20")};
    opacity: ${(props): string => String(props.glassOpacity ?? 0.4)};
    border-radius: 6px;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

export default GlassCard;
