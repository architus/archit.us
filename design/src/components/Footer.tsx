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

export interface FooterLink {
  text: string;
  href: string;
  icon?: React.ReactNode;
}

type FooterProps = {
  brand: React.ReactNode;
  about: React.ReactNode;
  links: FooterLink[];
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Site footer displayed at the bottom of the page
 */
const Footer: React.FC<FooterProps> = ({
  brand,
  about,
  links,
  className,
  style,
}) => {
  // TODO implement
  return (
    <Styled.Footer className={className} style={style}>
      <Styled.FooterContent>{brand}</Styled.FooterContent>
    </Styled.Footer>
  );
};

export default Footer;
