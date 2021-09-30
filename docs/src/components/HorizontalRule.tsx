import { styled } from "linaria/react";
import React from "react";

import { color } from "@architus/facade/theme/color";

export type HorizontalRuleProps = React.ComponentProps<typeof HorizontalRule>;

/**
 * Displays a styled variant of `<hr>`
 */
const HorizontalRule = styled.hr`
  border: none;
  border-top: 2px solid ${color("textLight")};
  --padding: 2.5rem;
  margin-top: var(--padding);
  margin-bottom: var(--padding);
`;

export default HorizontalRule;
