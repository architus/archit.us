import { styled } from "linaria/react";
import React from "react";

import { SpacingKey, gap } from "@architus/facade/theme/spacing";

const Styled = {
  Gap: styled.div<{ amount: SpacingKey }>`
    display: block;
    position: relative;
    margin-bottom: ${(props): string => gap(props.amount)};
  `,
};

export type GapProps = {
  amount: SpacingKey;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Spacing utility component used when creating vertical layouts
 */
const Gap: React.FC<GapProps> = ({ amount, className, style }) => (
  <Styled.Gap amount={amount} className={className} style={style} />
);

export default Gap;
