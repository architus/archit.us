import { styled } from "linaria/react";
import React from "react";

import Badge from "@architus/facade/components/Badge";
import HeaderLink, {
  HeaderLinkProps,
} from "@architus/facade/components/HeaderLink";
import { color } from "@architus/facade/theme/color";
import NavLabel from "@docs/components/NavLabel";
import { useNavigationTree } from "@docs/data/navigation-tree";

const Styled = {
  HeaderLink: styled(HeaderLink)`
    ${Badge} {
      background-color: ${color("light")};
      color: ${color("primary-20")};
      font-weight: 600;
      font-size: 80%;
      top: -0.1em;
    }
    /* TODO remove cast once bug with TypeScript is fixed */
  ` as React.ComponentType<HeaderLinkProps>,
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
      <Styled.HeaderLink
        key={key}
        path={navRoot.path}
        active={activeNavRoot === key}
      >
        <NavLabel text={navRoot.label} badge={navRoot.badge} />
      </Styled.HeaderLink>
    ))}
  </>
);

export default HeaderLinks;
