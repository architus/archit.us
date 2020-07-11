import React from "react";
import { styled } from "linaria/react";

import Badge from "@docs/components/Badge";
import { isDefined } from "@lib/utility";
import { gap, SpacingKey } from "@design/theme";
import { Nil } from "@lib/types";

const Styled = {
  Gap: styled.span<{ gap: SpacingKey }>`
    margin-left: ${(p): string => gap(p.gap)};
  `,
};

export type NavLabelProps = {
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
      {isDefined(badge) && (
        <>
          <Styled.Gap gap={badgeGap} />
          <Badge>{badge}</Badge>
        </>
      )}
    </>
  );
};

export default NavLabel;
