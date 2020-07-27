import { styled } from "linaria/react";
import { transparentize, mix } from "polished";
import React from "react";

import CompositeBrand from "@app/components/CompositeBrand";
import HeaderLinks from "@app/components/HeaderLinks";
import SessionControl from "@app/components/SessionControl";
import { headerHeight, sitePadding, container } from "@app/layout";
import { color, ColorMode } from "@app/theme";
import { useInitialRender } from "@app/utility";
import AutoLink from "@architus/facade/components/AutoLink";
import { useColorMode } from "@architus/facade/hooks";
import { dynamicColor } from "@architus/facade/theme/color";
import { up, down } from "@architus/facade/theme/media";
import { scrollBar } from "@architus/facade/theme/mixins";
import { transition } from "@architus/facade/theme/motion";
import { ZIndex } from "@architus/facade/theme/order";
import { shadow } from "@architus/facade/theme/shadow";
import { gap } from "@architus/facade/theme/spacing";

const headerTransparency = 0.06;
const logoLeftSpace = gap.nano;

const Styled = {
  LogoLink: styled(AutoLink)`
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
    z-index: ${ZIndex.Header};
    box-shadow: ${shadow("z1")};

    ${down("md")} {
      /* Stop the header from sticking on small screens */
      position: absolute;
    }

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
  HeaderContent: styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;

    /* Display a conditional container around header content */
    &[data-container="true"] {
      ${container}
    }

    padding-left: calc(${sitePadding} - ${logoLeftSpace}) !important;
    padding-right: ${sitePadding};

    ${down("md")} {
      /* Scroll horizontally when the screen isn't wide enough */
      overflow-x: overlay;
      ${scrollBar(ColorMode.Light)}
    }
  `,
  RightComponents: styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    margin-left: auto;
  `,
};

export type HeaderProps = {
  children?: React.ReactNode;
  noContainer?: boolean;
  noLinks?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Primary header component, including links and the session control dropdown.
 * Additional children can be passed in via the `children` prop.
 */
const Header: React.FC<HeaderProps> = ({
  children,
  noContainer = false,
  noLinks = false,
  className,
  style,
}) => {
  const mode = useColorMode();
  const initialRender = useInitialRender();
  const ssr = typeof window === "undefined" || initialRender;
  return (
    <Styled.Header mode={mode} ssr={ssr} className={className} style={style}>
      <Styled.HeaderContent data-container={String(!noContainer)}>
        <Styled.LogoLink href="/">
          <CompositeBrand
            buildTooltipPlacement="bottom"
            hideTagBreakpoint="vs"
          />
        </Styled.LogoLink>
        {noLinks ? null : (
          <Styled.HeaderLinksWrapper>
            <HeaderLinks />
          </Styled.HeaderLinksWrapper>
        )}
        <Styled.RightComponents>
          {children}
          <SessionControl />
        </Styled.RightComponents>
      </Styled.HeaderContent>
    </Styled.Header>
  );
};

export default Header;
