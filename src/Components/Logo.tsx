import React from "react";
import styled, { BoxProps, Box } from "@xstyled/emotion";
import { attach } from "Utility";
import { renderResponsiveProp } from "Theme/getters";
import LogoSvg from "Assets/logo.inline.svg";
import LogoTextSvg from "Assets/logo-text.inline.svg";

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

const Logo: React.FC<BoxProps> = (props) => (
  <Styled.LogoBox
    {...{ ...defaultBoxProps, ...props }}
    dangerouslySetInnerHTML={{ __html: LogoSvg }}
  />
);

const LogoType: React.FC<BoxProps> = (props) => (
  <Styled.LogoBox
    {...{ ...defaultBoxProps, ...props }}
    dangerouslySetInnerHTML={{ __html: LogoTextSvg }}
  />
);

export default attach(Logo, { LogoType });
