import { styled } from "linaria/react";
import React, { useState } from "react";

import HelpTooltip from "@app/components/HelpTooltip";
import Switch from "@app/components/Switch";
import { gap } from "@architus/facade/theme/spacing";

type BoolSettingProps = {
  name: string;
};

const Styled = {
  Layout: styled.div`
    display: flex;
    flex-direction: column;
    width: ${gap.mega};
    h5 {
      text-align: center;
      text-overflow: wrap;
      margin-bottom: ${gap.femto};
    }

    .switch-container {
      display: flex;
      justify-content: space-evenly;
    }
  `,
  Switch: styled(Switch)`
    margin-top: 3px;
  `,
};

const BoolSetting: React.FC<BoolSettingProps> = ({ name }) => {
  const [checked, setChecked] = useState(false);
  return (
    <Styled.Layout>
      <h5>{name}</h5>
      <div className="switch-container">
        <HelpTooltip tooltip="Whether architus will respond to triggers or allow new auto responses." />
        <Styled.Switch onChange={setChecked} checked={checked} />
      </div>
    </Styled.Layout>
  );
};

export default BoolSetting;
