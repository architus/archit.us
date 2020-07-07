import React from "react";
import { styled } from "linaria/react";
import { mix, transparentize } from "polished";

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
import { headerHeight, sitePadding } from "@docs/layout";
import HeaderLinks from "@docs/components/HeaderLinks";
import HeaderActionBar, {
  actionBarSpacing,
} from "@docs/components/HeaderActionBar";
import { useColorMode } from "@docs/hooks";
import { useInitialRender } from "@lib/hooks";
import CompositeBrand from "@docs/components/CompositeBrand";
import { Link } from "@docs/components/Router";

const headerTransparency = 0.06;
const logoLeftSpace = gap.nano;

const Styled = {
  LogoLink: styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: center;

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
  `,
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
    top: 0;
    width: 100%;
    color: ${color("light")};
    height: ${headerHeight};
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
    z-index: ${ZIndex.Header};
    box-shadow: ${shadow("z1")};
    padding-left: calc(${sitePadding} - ${logoLeftSpace});

    /* This has to be a function
    to have linaria not eagerly evaluate 'actionBarSpacing' at build time */
    padding-right: calc(${sitePadding} - ${(): string => actionBarSpacing});

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
  const mode = useColorMode();
  const initialRender = useInitialRender();
  const ssr = typeof window === "undefined" || initialRender;
  return (
    <Styled.Header mode={mode} ssr={ssr} className={className} style={style}>
      <Styled.LogoLink to="/">
        <CompositeBrand buildTooltipPlacement="bottom" hideTagBreakpoint="vs" />
      </Styled.LogoLink>
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
