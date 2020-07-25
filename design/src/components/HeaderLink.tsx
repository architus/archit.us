import { css, cx } from "linaria";
import { transparentize } from "polished";
import React, { useContext } from "react";

import { AutoLinkContext } from "./AutoLink";
import {
  staticColor,
  color,
  dynamicColor,
  ColorMode,
  mode,
} from "@architus/facade/theme/color";
import { down } from "@architus/facade/theme/media";
import { transition } from "@architus/facade/theme/motion";
import { gap } from "@architus/facade/theme/spacing";
import { font } from "@architus/facade/theme/typography";

const headerLinkClass = css`
  color: ${transparentize(0.2, staticColor("light"))};
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: ${font("headings")};
  font-size: 1rem;
  z-index: 1;
  white-space: nowrap;

  ${transition(["background-color"])}
  background-color: transparent;

  padding: 0 ${gap.micro};
  ${down("lg")} {
    padding: 0 ${gap.nano};
  }

  /* Active/hover gradient overlay */
  &::before {
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    content: " ";
    z-index: -1;
    background-image: radial-gradient(
      ellipse at bottom center,
      ${transparentize(0.7, dynamicColor("primary+30", ColorMode.Dark))},
      transparent 80%
    );
    ${transition(["opacity"])}
    opacity: 0;
  }

  /* Bottom active highlight bar */
  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    content: " ";
    height: 4px;
    display: none;

    background-color: ${color("primary+30")};
    ${mode(ColorMode.Light)} {
      background-color: ${color("primary-20")};
    }
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
    &::before {
      opacity: 0.7;
    }
  }
`;

const activeClass = css`
  background-color: rgba(0, 0, 0, 0.13);
  color: ${color("light")};

  &::before {
    opacity: 1;
  }
  &::after {
    display: block;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.19);
  }
`;

type HeaderLinkProps = {
  children: React.ReactNode;
  path: string;
  active: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * In-app link used in the header that includes an underline and "lightbox" effect
 * when active
 */
const HeaderLink: React.FC<HeaderLinkProps> = ({
  children,
  active,
  path,
  className,
  style,
}) => {
  const { link: Link } = useContext(AutoLinkContext);
  return (
    <Link
      to={path}
      className={cx(headerLinkClass, active && activeClass, className)}
      style={style}
    >
      {children}
    </Link>
  );
};

export default HeaderLink;
