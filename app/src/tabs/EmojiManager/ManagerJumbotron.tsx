import { styled } from "linaria/react";
import React from "react";

import HelpTooltip from "@app/components/HelpTooltip";
import Switch from "@app/components/Switch";
import { sitePadding } from "@app/layout";
import Button, { StylableButton } from "@architus/facade/components/Button";
import Tooltip from "@architus/facade/components/Tooltip";
import Comfy from "@architus/facade/icons/comfy.svg";
import Compact from "@architus/facade/icons/compact.svg";
import Sparse from "@architus/facade/icons/sparse.svg";
import { color } from "@architus/facade/theme/color";
import { up } from "@architus/facade/theme/media";
import { shadow } from "@architus/facade/theme/shadow";
import { gap } from "@architus/facade/theme/spacing";

const Styled = {
  Outer: styled.div`
    background-color: ${color('bg-10')};
    border-radius: ${gap.pico};
    margin: ${gap.milli} 0;
    display: flex;
    justify-content: space-evenly;
  
    ${up("md")} {
      margin: ${gap.milli} ${gap.milli};
      border-top-left-radius: 1rem;
    }
  `,
  Help: styled.div`
    display: flex;
    flex-direction: column;
    padding: ${gap.nano};
  `,
  Counter: styled.div`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: ${color("bg-20")};
  `,
  Control: styled.div`
    display: flex;
    flex-direction: column;
    padding: ${gap.nano};
  `,
  
};


export type GridHeaderProps = {

};

/**
 * Big banner thing at the top of the emoji manager page for extra info and controls.
 */
const ManagerJumbotron: React.FC<GridHeaderProps> = ({

}) => (
  <Styled.Outer>
    <Styled.Help>
      <h2>What's this?</h2>
      <Button><h4>docs.archit.us</h4></Button>
    </Styled.Help>
    <Styled.Counter>
      <sup>6</sup>/<sub>50</sub>
    </Styled.Counter>
    <Styled.Control>
      <h2>Enable Emoji Manager</h2>
      <Switch
        onChange={(checked: boolean) => {}}
        checked={true}
      />

    </Styled.Control>
  </Styled.Outer>
);

export default ManagerJumbotron;
