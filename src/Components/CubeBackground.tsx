import React, { useMemo } from "react";
import styled from "@xstyled/emotion";
import { useThemeColor, Color, ColorKey, ColorMode, color } from "Theme";
import { WithBoxProps } from "Utility/types";

const Styled = {
  CubeBackground: styled.divBox<{
    overlayBackground: ColorKey;
    resolvedForeground: string;
  }>`
    position: relative;
    background: ${(props): string => color(props.overlayBackground)} url("${(
    props
  ): string => cubeSvg(props.resolvedForeground)}") center/72px 125px repeat;
  `,
};

type CubeBackgroundProps = WithBoxProps<{
  background?: ColorKey;
  overlayOpacity?: number;
}>;

/**
 * Display component used to render a `divBox` with a tiling cube background, useful
 * for jumbotrons, one of the accent materials used
 */
const CubeBackground: React.FC<CubeBackgroundProps> = ({
  overlayOpacity = 0.05,
  background = "b_300",
  ...boxProps
}) => {
  const [textFade, colorMode] = useThemeColor("text_fade");
  const resolvedForeground = useMemo(
    () =>
      Color(textFade)
        .setAlpha(overlayOpacity * (colorMode === ColorMode.Light ? 1.25 : 1))
        .toString(),
    [textFade, colorMode, overlayOpacity]
  );
  return (
    <Styled.CubeBackground
      {...boxProps}
      overlayBackground={background}
      resolvedForeground={resolvedForeground}
    />
  );
};

export default CubeBackground;

// ? ================
// ? Helper functions
// ? ================

/**
 * Constructs the SVG data URI to use in `background-image` for the tiling cube background
 * @param foreground - Foreground CSS **resolved** color string
 */
function cubeSvg(foreground: string): string {
  const style = `%3Cstyle type='text/css'%3E .st0%7Bfill:${encodeURIComponent(
    foreground
  )};%7D%0A%3C/style%3E`;
  const data = `m142 38l-65.7-38h-8.7l-65.6 38v-38h-2v127l68.1 39.4-68.1 39.4v44.2h2v-1.1-1.1-38.6l68-39.4v78.8l-2.4 1.4h8.7l-2.4-1.4v-78.8l68.1 39.4v39.6 1.2h2v-44.2l-68.1-39.4 68.1-39.4v-127h-2v38zm-140 85.6v-78.8l68 39.4v78.8l-68-39.4zm1.9-82.2l68.1-39.4 68.1 39.4-68.1 39.4-68.1-39.4zm138.1 82.2l-68 39.4v-78.8l68-39.4v78.8z`;
  return `data:image/svg+xml,%3Csvg enable-background='new 0 0 144 250' version='1.1' viewBox='0 0 144 250' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E${style}%3Cpath class='st0' d='${data}'/%3E%3C/svg%3E%0A`;
}
