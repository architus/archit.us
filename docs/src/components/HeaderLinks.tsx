import React from "react";
import { Link } from "gatsby";
import { css } from "linaria";

import NavLabel from "@docs/components/NavLabel";
import { useNavigationTree } from "@docs/data/nav";

const link = css`
  transition: background-color linear 0.2s;
  background-color: transparent;

  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }

  &.active {
    background-color: rgba(0, 0, 0, 0.075);
  }
`;

/**
 * Shows each header link at the top of the page, which are active depending
 * on the matching URL (link to nav tree root nodes)
 */
const HeaderLinks: React.FC = () => {
  const navTree = useNavigationTree();
  const links: React.ReactNodeArray = [];
  for (const navRoot of navTree.values()) {
    links.push(
      <Link
        key={navRoot.path}
        className={link}
        to={navRoot.path}
        partiallyActive={true}
        activeClassName="active"
      >
        <NavLabel text={navRoot.label} badge={navRoot.badge} />
      </Link>
    );
  }

  return <>{links}</>;
};

export default HeaderLinks;
