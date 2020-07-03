import React from "react";
import { styled } from "linaria/react";

import {
  gap,
  color,
  mode,
  ColorMode,
  dynamicColor,
  shadow,
} from "@design/theme";

const Styled = {
  Footer: styled.footer`
    padding: ${gap.centi} 0;
    background-color: ${color("bg-10")};
    box-shadow: ${shadow("innerTop")};
    color: ${color("light")};
    ${mode(ColorMode.Light)} {
      background-color: ${dynamicColor("bg+20", ColorMode.Dark)};
    }
  `,
  FooterContent: styled.div`
    margin: 0 auto;
  `,
};

// Export for use in styling
export const { FooterContent } = Styled;

type FooterProps = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Site footer displayed at the bottom of the page
 */
const Footer: React.FC<FooterProps> = ({ className, style }) => {
  return (
    <Styled.Footer className={className} style={style}>
      <Styled.FooterContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt
        ipsum elit, nec consectetur erat mollis aliquet. Vivamus ut euismod
        nibh. Phasellus quis facilisis purus, quis efficitur leo. Proin sed nisi
        id sapien pulvinar bibendum. Aenean sed gravida justo. Nunc sem enim,
        faucibus et libero non, pharetra dignissim justo. Nullam eu pharetra
        libero. Etiam euismod ornare nunc in rhoncus. Integer porta bibendum
        libero, vel suscipit dolor convallis vel. Aliquam at malesuada ante.
        Quisque a egestas erat.
      </Styled.FooterContent>
    </Styled.Footer>
  );
};

export default Footer;
