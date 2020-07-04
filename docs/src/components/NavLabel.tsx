import React from "react";
import { styled } from "linaria/react";

import Badge from "@docs/components/Badge";
import { isDefined } from "@lib/utility";
import { gap, SpacingKey } from "@design/theme";
import { Nil } from "@lib/types";

const Styled = {
  Badge: styled(
    ({
      gap: badgeGap,
      ...rest
    }: React.ComponentProps<typeof Badge> & { gap: SpacingKey }) => (
      <Badge {...rest} />
    )
  )`
    margin-left: ${(p): string => gap(p.gap)};
  `,
};

type NavLabelProps = {
  text: string;
  badge: string | Nil;
  gap?: SpacingKey;
};

/**
 * Renders a nav label + badge together
 */
const NavLabel: React.FC<NavLabelProps> = ({
  text,
  badge,
  gap: badgeGap = "pico",
}) => {
  return (
    <>
      {text}
      {isDefined(badge) && <Styled.Badge gap={badgeGap}>{badge}</Styled.Badge>}
    </>
  );
};

export default NavLabel;
