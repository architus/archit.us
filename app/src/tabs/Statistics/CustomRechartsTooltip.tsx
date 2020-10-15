import React from "react";
import { styled } from "linaria/react";
import { css } from "linaria";
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
}

type CustomTooltipProps = {
  type: string,
  payload: Array<any>,
  label: string,
}



export const CustomRechartsTooltip: React.FC<CustomTooltipProps> = ({
  type,
  payload,
  label
}) => {
  //console.log(type);
  //console.log(payload);
  //console.log(new Date(label));
  let sum = 0;
  return (
    <Styled.Container>
      <p>{new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(new Date(label ?? 0))}</p>
      {!isDefined(payload) ? null : payload.map(entry => {
        if (entry.value === 0) {
          return null;
        }
        sum += entry.value;
        return (
        <>
          <p style={{color: entry.stroke}}>{entry.name} : {entry.value}</p>
        </>
      )})}
      <p>Total: {sum}</p>
    </Styled.Container>
  );
}
