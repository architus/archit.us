import { cx } from "linaria";
import { styled } from "linaria/react";
import React from "react";

import { svgDataUrl } from "@architus/facade/svg";
import { dynamicColor, ColorMode, mode } from "@architus/facade/theme/color";
import { down, up } from "@architus/facade/theme/media";
import { transition } from "@architus/facade/theme/motion";
import { gap } from "@architus/facade/theme/spacing";
import { useInitialRender } from "@architus/lib/hooks";
import { isDefined } from "@architus/lib/utility";
import { useLocation } from "@docs/components/Router";
import { headerHeight } from "@docs/layout";

const rightLink = "right";
const rightMixin = `
  margin-left: 0.5em;
  display: inline-block;
`;
const leftMixin = `
  position: absolute;
  margin-left: -1em;
  padding-right: 0.5em;
  transform: translateX(-8px);

  span {
      vertical-align: -0.4em;
  }
`;
const rightActiveMixin = `transform: translateX(0.25em);`;
const leftActiveMixin = `margin-left: -1.125em !important;`;
const moveBreakpoint = "xxl";

const IconWrapper = styled.span`
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  font-stretch: normal;
  font-size: 1em;
  line-height: inherit;
  border: none !important;
  font-size: 70%;
  left: 0;
  transform: none;

  ${transition(["opacity", "transform"], { important: true })};
  opacity: 0;

  &:not(.${rightLink}) {
    ${down(moveBreakpoint)} {
      ${rightMixin}
    }
    ${up(moveBreakpoint)} {
      ${leftMixin}
    }
  }

  &.${rightLink} {
    ${rightMixin}
  }
`;

// Removes excess space from a multiline SVG source string
const trimSvg = (src: string): string =>
  src
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .join(" ");

const darkLinkColor = dynamicColor("primary+10", ColorMode.Dark);
const lightLinkColor = dynamicColor("primary+10", ColorMode.Dark);
const makeLinkIconSvg = (color: string): string =>
  svgDataUrl(
    trimSvg(
      `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
        focusable="false" data-prefix="fas" data-icon="link" role="img"
        viewBox="0 0 512 512">
        <path fill="${color}" d="M326.612 185.391c59.747 59.809 58.927
          155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699
          59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84
          -9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721
          1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026
          -28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2
          -67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564
          -10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348
          -21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584
          -1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261
          -59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566
          58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196
          c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094
          -19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005
          -6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2
          -67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934
          -1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864
          17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606
          l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"/>
      </svg>`
    )
  );

const activeClass = "active";
const Styled = {
  LinkIcon: styled.span`
    background-image: ${makeLinkIconSvg(darkLinkColor)};
    ${mode(ColorMode.Light)} {
      background-image: ${makeLinkIconSvg(lightLinkColor)};
    }

    height: 1em;
    width: 1em;
    display: inline-block;
    background-repeat: no-repeat;
  `,
  IconWrapper,
  AnchorWrapper: styled.a`
    display: block;
    position: relative;
    border-bottom: none !important;

    &:active,
    &.${activeClass} {
      & ${IconWrapper} {
        opacity: 0.9 !important;
      }
    }

    &:hover,
    &:focus,
    &.${activeClass} {
      & ${IconWrapper} {
        opacity: 0.5;

        &:not(.${rightLink}) {
          ${down(moveBreakpoint)} {
            ${rightActiveMixin}
          }
          ${up(moveBreakpoint)} {
            ${leftActiveMixin}
          }
        }

        &.${rightLink} {
          ${rightActiveMixin}
        }
      }
    }
  `,
  Anchor: styled.div`
    position: absolute;
    left: 0;
    top: calc(-1 * (${headerHeight} + (0.99 * ${gap.flow})));
  `,
};

export type HeadingType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type BaseComponent = React.ComponentType<HeadingProps> | HeadingType;
export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

/**
 * Component factory to create a Heading component, which shows a heading
 * with a clickable link and an anchor that properly adjusts based on the
 * height of the site header.
 */
export function createHeading({
  component: Component,
  right = false,
}: {
  component: BaseComponent;
  right?: boolean;
}): React.ComponentType<HeadingProps> {
  const heading: React.FC<HeadingProps> = ({
    children,
    id,
    className,
    style,
    ...rest
  }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const firstRender = useInitialRender();
    const active = !firstRender && location.hash === `#${id}`;

    return (
      <Styled.AnchorWrapper
        id={isDefined(id) ? makeWrapperId(id) : undefined}
        className={cx(
          className,
          active && activeClass,
          anchorClass(typeof Component === "string" ? Component : "custom")
        )}
        style={style}
        href={`#${id}`}
      >
        <Styled.Anchor id={id}> </Styled.Anchor>
        <Component {...rest}>
          {children}
          <Styled.IconWrapper className={right ? rightLink : undefined}>
            <Styled.LinkIcon />
          </Styled.IconWrapper>
        </Component>
      </Styled.AnchorWrapper>
    );
  };
  heading.displayName = `Heading-${Component}`;
  return heading;
}

// ? ================
// ? Helper functions
// ? ================

export function makeWrapperId(slug: string): string {
  return `__internal-${slug}`;
}

export function anchorClass(tag: HeadingType | "custom"): string {
  return `anchor--${tag}`;
}
