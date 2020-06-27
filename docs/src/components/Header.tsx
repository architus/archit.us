import { Link } from "gatsby";
import React from "react";
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
  Elevation,
  shadow,
} from "@design/theme";
import { headerHeight } from "@docs/layout";
import HeaderLinks from "@docs/components/HeaderLinks";
import HeaderActionBar from "@docs/components/HeaderActionBar";
import { useColorMode } from "@docs/hooks";

const HEADER_TRANSPARENCY = 0.06;

const logoLink = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${gap.atto} ${gap.micro} ${gap.femto};
  background-color: transparent;
  text-decoration: none;
  color: ${color("light")};

  ${transition(["opacity"])}
  opacity: 1;

  &:hover {
    opacity: 0.8;
  }
`;

const logo = css`
  fill: currentColor;
`;

const Styled = {
  Header: styled.nav<{ mode: ColorMode; ssr: boolean }>`
    color: ${color("light")};
    height: ${headerHeight};
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
    z-index: ${ZIndex.Header};
    box-shadow: ${shadow(Elevation.Z1)};
    /* There should be 'gap.milli' worth of padding on each side */
    padding: 0 calc(${gap.micro} + ${gap.femto}) 0 ${gap.nano};

    /* Set the background-color to be primary on SSR
    and try to reverse-blend it with the background while adding opacity,
    making the header slightly see-through while maintaining the same color
    on a plain background */
    background-color: ${({ mode, ssr }): string =>
      ssr
        ? color("primary")
        : transparentize(
            HEADER_TRANSPARENCY,
            mix(
              -HEADER_TRANSPARENCY,
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
  `,
  RightComponents: styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    margin-left: auto;
  `,
};

/**
 * Site header, including navigation links and an action bar on the right side
 */
const Header: React.FC<{ siteTitle: string }> = ({
  siteTitle = "Documentation",
}) => {
  const mode = useColorMode();
  const ssr = typeof window === "undefined";
  return (
    <Styled.Header mode={mode} ssr={ssr}>
      <Link to="/" className={logoLink}>
        <Logo.Symbol height={36} className={logo} />
        <Styled.SiteTitle>{siteTitle}</Styled.SiteTitle>
      </Link>
      <HeaderLinks />
      <Styled.RightComponents>
        <HeaderActionBar />
      </Styled.RightComponents>
    </Styled.Header>
  );
};

export default Header;
