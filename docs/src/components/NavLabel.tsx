import React from "react";
import { styled } from "linaria/react";

import Badge from "@docs/components/Badge";
import { isDefined } from "@lib/utility";

const Styled = {
  Badge: styled(Badge)`
    margin-left: 8px;
  `,
};

type NavLabelProps = {
  text: string;
  badge: string | null;
};

/**
 * Renders a nav label + badge together
 */
const NavLabel: React.FC<NavLabelProps> = ({ text, badge }) => {
  return (
    <>
      {text}
      {isDefined(badge) && <Badge>{badge}</Badge>}
    </>
  );
};

export default NavLabel;
