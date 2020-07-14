import React from "react";
import { styled } from "linaria/react";
import { transparentize } from "polished";

import NavLabel from "@docs/components/NavLabel";
import Badge from "@design/components/Badge";
import { Link } from "@docs/components/Router";
import { useNavigationTree } from "@docs/data/nav";
import {
  transition,
  gap,
  color,
  staticColor,
  font,
  dynamicColor,
  ColorMode,
  mode,
  down,
} from "@design/theme";

const Styled = {
  Link: styled<React.ComponentProps<typeof Link>>(Link)`
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

    /* For some reason this is needed for typechecking */
    /* TODO see why this is needed */
    ${(Badge as unknown) as string} {
      background-color: ${color("light")};
      color: ${color("primary-20")};
      font-weight: 600;
      font-size: 80%;
      top: -0.1em;
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

    &.active {
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
    }
  `,
};

export type HeaderLinksProps = {
  activeNavRoot?: string;
};

/**
 * Shows each header link at the top of the page, which are active depending
 * on the matching URL (link to nav tree root nodes)
 */
const HeaderLinks: React.FC<HeaderLinksProps> = ({ activeNavRoot }) => (
  <>
    {[...useNavigationTree().entries()].map(([key, navRoot]) => (
      <React.Fragment key={navRoot.path}>
        <Styled.Link
          className={key === activeNavRoot ? "active" : undefined}
          to={navRoot.path}
          partiallyActive={false}
          activeClassName={""}
        >
          <NavLabel text={navRoot.label} badge={navRoot.badge} />
        </Styled.Link>
      </React.Fragment>
    ))}
  </>
);

export default HeaderLinks;
