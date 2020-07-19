import { styled } from "linaria/react";

import { color } from "../theme/color";
import { shadow } from "../theme/shadow";
import { gap } from "../theme/spacing";

/**
 * Display component used to render a plain raised Material-esque card component
 */
const Card = styled.aside`
  position: relative;
  color: ${color("text")};
  padding: ${gap.milli};
  box-shadow: ${shadow("z1")};
  border-radius: 6px;
  border: 1px solid ${color("contrastBorder")};
  background-color: ${color("bg+10")};
`;

export type CardProps = React.ComponentProps<typeof Card>;

export default Card;
