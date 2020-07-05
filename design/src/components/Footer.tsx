import React from "react";
import { styled } from "linaria/react";
import { darken, lighten } from "polished";

import {
  gap,
  color,
  mode,
  ColorMode,
  dynamicColor,
  shadow,
  down,
  up,
} from "@design/theme";
import Card from "@design/components/Card";
import AutoLink from "@design/components/AutoLink";

const FooterDivider = styled.hr`
  margin: ${gap.pico} auto ${gap.pico} 0;
  max-width: 6rem;
  border: none;
  border-top: 2px solid ${dynamicColor("primary", ColorMode.Dark)};
`;

const FooterContent = styled.div`
  margin: 0 auto;
`;

const Styled = {
  FooterDivider,
  Footer: styled.footer`
    padding: ${gap.centi} 0;
    background-color: ${color("bg-10")};
    box-shadow: ${shadow("innerTop")};
    color: ${dynamicColor("text", ColorMode.Dark)};
    ${mode(ColorMode.Light)} {
      background-color: ${dynamicColor("bg+20", ColorMode.Dark)};
    }
  `,
  PrimaryContent: styled(FooterContent)`
    display: grid;
    grid-gap: ${gap.micro};
    grid: auto-flow / 1fr;

    ${down("lg")} {
      grid-gap: ${gap.milli};
    }

    ${up("lg")} {
      grid-template-columns: 2fr 1fr;
      & > *:nth-child(3n + 1) {
        grid-column: 1;
      }

      & > *:nth-child(3n + 2) {
        grid-column: 2;
      }

      & > *:nth-child(3n + 3) {
        grid-column: 1 / 3;
      }
    }

    ${up("xl")} {
      grid-template-columns: 5fr auto 4fr;
      grid-column-gap: ${gap.milli};

      & > *:nth-child(3n + 1) {
        grid-column: 1;
      }

      & > *:nth-child(3n + 2) {
        grid-column: 2;
      }

      & > *:nth-child(3n + 3) {
        grid-column: 3;
      }
    }

    ${up("xxl")} {
      & > *:nth-child(3n + 2) {
        padding-left: ${gap.micro};
      }
    }
  `,
  FooterHeader: styled.h3`
    font-weight: 500;
    font-size: 1.2rem;
    color: ${dynamicColor("textStrong", ColorMode.Dark)};
    opacity: 0.9;
    text-transform: uppercase;
    margin: 0;
  `,
  Brand: styled.div`
    opacity: 0.8;
  `,
  FooterLink: styled(AutoLink)`
    display: block;
    margin-bottom: ${gap.femto};
    color: ${color("light")};
    position: relative;

    &:hover {
      text-decoration: underline;
    }
  `,
  LinkText: styled.span`
    position: relative;
  `,
  LinkIcon: styled.span`
    position: absolute;
    font-size: 115%;
    top: -2px;
    opacity: 0.9;

    ${up("xxl")} {
      left: -30px;
    }

    ${down("xxl")} {
      right: -28px;
    }
  `,
  BrandCard: styled(Card)`
    border: none !important;
    color: ${color("light")};

    background-color: ${lighten(0.05, dynamicColor("bg+20", ColorMode.Dark))};
    ${mode(ColorMode.Dark)} {
      background-color: ${darken(0.01, dynamicColor("bg", ColorMode.Dark))};
    }

    ${down("md")} {
      padding: ${gap.micro};
    }
  `,
};

// Export for use in styling
export { FooterContent };

export interface FooterLink {
  text: string;
  href: string;
  icon?: React.ReactNode;
}

export type FooterProps = {
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
  return (
    <>
      <Styled.Footer className={className} style={style}>
        <Styled.PrimaryContent>
          <div>
            <Styled.FooterHeader>About</Styled.FooterHeader>
            <Styled.FooterDivider />
            {about}
          </div>
          <div>
            <Styled.FooterHeader>Links</Styled.FooterHeader>
            <Styled.FooterDivider />
            {links.map((link) => (
              <FooterLink data={link} key={link.href} />
            ))}
          </div>
          <div>
            <Styled.BrandCard>
              <Styled.Brand>{brand}</Styled.Brand>
            </Styled.BrandCard>
          </div>
        </Styled.PrimaryContent>
      </Styled.Footer>
    </>
  );
};

export default Footer;

// ? ==============
// ? Sub-components
// ? ==============

const FooterLink: React.FC<{ data: FooterLink }> = ({ data }) => (
  <Styled.FooterLink href={data.href} noIcon noUnderline>
    <Styled.LinkText>
      {data.text}
      {data.icon && <Styled.LinkIcon>{data.icon}</Styled.LinkIcon>}
    </Styled.LinkText>
  </Styled.FooterLink>
);
