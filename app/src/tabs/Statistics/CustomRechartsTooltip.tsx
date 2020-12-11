import { styled } from "linaria/react";
import React from "react";

import { color } from "@architus/facade/theme/color";
import { transition } from "@architus/facade/theme/motion";
import { shadow } from "@architus/facade/theme/shadow";
import { isDefined } from "@architus/lib/utility";

const Styled = {
  Container: styled.div`
    background-color: ${color("tooltip")};
    border: 1px solid ${color("tooltip")};
    box-shadow: ${shadow("z3")};
    border-radius: 4px;
    display: flex;
    color: ${color("light")};
    flex-direction: column;
    ${transition(["opacity"])}
    font-size: 0.9rem;
    padding: 10px;
  `,
};

type CustomTooltipProps = {
  renderer: (payload: Array<any>, label: string) => JSX.Element;
  type?: string;
  payload?: Array<any>;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
};

export const CustomRechartsTooltip: React.FC<CustomTooltipProps> = ({
  renderer,
  payload,
  label,
  ...props
}) => {
  return (
    <Styled.Container>
      {isDefined(payload) && isDefined(label) ? renderer(payload, label) : null}
    </Styled.Container>
  );
};
