import React from "react";
import { Link } from "gatsby";
import { css, cx } from "linaria";
import { transparentize } from "polished";
import { useLocation } from "@reach/router";

import NavLabel from "@docs/components/NavLabel";
import Badge from "@docs/components/Badge";
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
} from "@design/theme";
import { splitPath } from "@lib/utility";

const link = css`
  color: ${transparentize(0.3, staticColor("light"))};
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 ${gap.micro};
  position: relative;
  font-family: ${font("headings")};
  font-size: 1.1rem;
  z-index: 1;

  ${transition(["background-color"])}
  background-color: transparent;

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
    height: 3px;
    display: none;

    background-color: ${color("primary+30")};
    ${mode(ColorMode.Light, `background-color: ${color("primary-20")};`)}
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

  ${Badge} {
    background-color: ${color("light")};
    color: ${color("primary-20")};
    font-weight: 600;
    font-size: 70%;
  }
`;

/**
 * Shows each header link at the top of the page, which are active depending
 * on the matching URL (link to nav tree root nodes)
 */
const HeaderLinks: React.FC = () => {
  const navTree = useNavigationTree();
  const location = useLocation();

  // Determine the longest partially-matching path to set as
  // the active one
  let longestIndex = -1;
  let longestMatch = -1;
  const roots = [...navTree.values()];
  roots.forEach((navRoot, i) => {
    if (location.pathname.startsWith(navRoot.path)) {
      const fragments = splitPath(navRoot.path).filter((f) => f !== "");
      if (fragments.length > longestMatch) {
        longestMatch = fragments.length;
        longestIndex = i;
      }
    }
  });

  return (
    <>
      {roots.map((navRoot, i) => {
        return (
          <Link
            key={navRoot.path}
            className={cx(link, i === longestIndex ? "active" : undefined)}
            to={navRoot.path}
            partiallyActive={false}
            activeClassName={""}
          >
            <NavLabel text={navRoot.label} badge={navRoot.badge} />
          </Link>
        );
      })}
    </>
  );
};

export default HeaderLinks;