import React from "react";
import styled, { BoxProps, Box } from "@xstyled/emotion";
import { renderResponsiveProp } from "Theme";
import CombinedSvg from "Assets/logo/logo.inline.svg";
import LogotypeSvg from "Assets/logo/logo-text.inline.svg";
import SymbolSvg from "Assets/logo/logo-symbol.inline.svg";

const Styled = {
  LogoBox: styled(Box, {
    // Stop `width` and `height` from being passed through to the component
    shouldForwardProp: (propName) =>
      propName !== "width" && propName !== "height",
  })`
    // Specify width and height on the inner svg element instead of the outer box
    & > svg {
      ${renderResponsiveProp("height", "height")};
      ${renderResponsiveProp("width", "width")};

      // Make the svg inherit the current foreground
      fill: currentColor;
    }
  `,
};

const defaultBoxProps = {
  height: "40px",
  width: "auto",
};

const Combined: React.FC<BoxProps> = (props) => (
  <Styled.LogoBox
    {...{ ...defaultBoxProps, ...props }}
    dangerouslySetInnerHTML={{ __html: CombinedSvg }}
  />
);

const Logotype: React.FC<BoxProps> = (props) => (
  <Styled.LogoBox
    {...{ ...defaultBoxProps, ...props }}
    dangerouslySetInnerHTML={{ __html: LogotypeSvg }}
  />
);

const Symbol: React.FC<BoxProps> = (props) => (
  <Styled.LogoBox
    {...{ ...defaultBoxProps, ...props }}
    dangerouslySetInnerHTML={{ __html: SymbolSvg }}
  />
);

export default { Combined, Logotype, Symbol };
