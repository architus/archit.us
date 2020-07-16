import { styled } from "linaria/react";

import { Variant, color } from "../theme/color";

/**
 * Pill-style inline badge that adopts the surrounding text's size
 */
const Badge = styled.span<{ variant?: Variant }>`
  background-color: ${(props): string => color(props.variant ?? "primary")};
  color: #fff;

  display: inline-block;
  position: relative;
  vertical-align: baseline;
  border-radius: 8px;
  padding: 0.45em 0.6em 0.35em;
  margin-top: 0.4em;
  top: -0.1em;

  font-size: 70%;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  font-weight: 400;
`;

export type BadgeProps = React.ComponentProps<typeof Badge>;

export default Badge;
