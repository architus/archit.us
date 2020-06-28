import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { css } from "linaria";
import { styled } from "linaria/react";
import { mix, transparentize } from "polished";

import Logo from "@design/components/Logo";
import {
  color,
  gap,
  transition,
  ColorMode,
  dynamicColor,
  ZIndex,
  shadow,
  down,
  up,
  scrollBar,
} from "@design/theme";
import { headerHeight } from "@docs/layout";
import HeaderLinks from "@docs/components/HeaderLinks";
import HeaderActionBar, {
  actionBarSpacing,
} from "@docs/components/HeaderActionBar";
import { useColorMode } from "@docs/hooks";

const headerTransparency = 0.06;

const logoLeftSpace = gap.nano;
const logoLink = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${gap.atto} ${gap.nano} ${gap.femto} ${logoLeftSpace};
  background-color: transparent;
  text-decoration: none;
  color: ${color("light")};

  ${transition(["opacity"])}
  opacity: 1;

  &:hover {
    opacity: 0.8;
  }

  /* Increase gap between logo and links on very large screens */
  ${up("lg")} {
    margin-right: ${gap.nano};
  }
`;

const logo = css`
  fill: currentColor;
`;

const Styled = {
  HeaderLinksWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;

    flex-shrink: 1;
    min-width: 0;
    margin-right: ${gap.pico};

    /* Scroll horizontally when the screen isn't wide enough */
    overflow-x: overlay;
    ${scrollBar(ColorMode.Light)}

    /* Hide the header links on small screen sizes */
    ${down("md")} {
      display: none;
    }
  `,
  Header: styled.nav<{ mode: ColorMode; ssr: boolean }>`
    position: fixed;
    width: 100%;
    color: ${color("light")};
    height: ${headerHeight};
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
    z-index: ${ZIndex.Header};
    box-shadow: ${shadow("z1")};
    padding-left: calc(var(--site-padding) - ${logoLeftSpace});
    /* This has to be a function
    to have linaria not eagerly evaluate 'actionBarSpacing' at build time */
    padding-right: calc(
      var(--site-padding) - ${(): string => actionBarSpacing}
    );

    /* Set the background-color to be primary on SSR
    and try to reverse-blend it with the background while adding opacity,
    making the header slightly see-through while maintaining the same color
    on a plain background */
    background-color: ${({ mode, ssr }): string =>
      ssr
        ? color("primary")
        : transparentize(
            headerTransparency,
            mix(
              -headerTransparency,
              dynamicColor("bg", mode),
              dynamicColor("primary", mode)
            )
          )};
  `,
  SiteTitle: styled.h1`
    font-size: 1.24rem;
    margin-bottom: 0;
    margin-left: ${gap.pico};
    top: 2px;
    position: relative;

    /* The font size needs to be slightly smaller on very small devices */
    ${down("vs")} {
      font-size: 1.1rem;
    }
  `,
  RightComponents: styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    margin-left: auto;
  `,
};

type HeaderProps = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Site header, including navigation links and an action bar on the right side
 */
const Header: React.FC<HeaderProps> = ({ className, style }) => {
  type HeaderQueryResult = {
    site: {
      siteMetadata: {
        headerTitle: string;
      };
    };
  };

  const data = useStaticQuery<HeaderQueryResult>(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          headerTitle
        }
      }
    }
  `);

  const mode = useColorMode();
  const ssr = typeof window === "undefined";

  return (
    <Styled.Header mode={mode} ssr={ssr} className={className} style={style}>
      <Link to="/" className={logoLink}>
        <Logo.Symbol height={36} className={logo} />
        <Styled.SiteTitle>
          {data.site.siteMetadata.headerTitle}
        </Styled.SiteTitle>
      </Link>
      <Styled.HeaderLinksWrapper>
        <HeaderLinks />
      </Styled.HeaderLinksWrapper>
      <Styled.RightComponents>
        <HeaderActionBar />
      </Styled.RightComponents>
    </Styled.Header>
  );
};

export default Header;
