import React from "react";
import { styled } from "linaria/react";

import Badge from "@docs/components/Badge";
import { isDefined } from "@lib/utility";
import { gap } from "@design/theme";

const Styled = {
  Badge: styled(Badge)`
    margin-left: ${gap.pico};
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
      {isDefined(badge) && <Styled.Badge>{badge}</Styled.Badge>}
    </>
  );
};

export default NavLabel;
