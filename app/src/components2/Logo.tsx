import styled, { BoxProps, Box } from "@xstyled/emotion";
import React from "react";

import SymbolSvg from "@app/assets/logo/logo-symbol.inline.svg";
import LogotypeSvg from "@app/assets/logo/logo-text.inline.svg";
import CombinedSvg from "@app/assets/logo/logo.inline.svg";
import { renderResponsiveProp } from "@app/theme";

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
