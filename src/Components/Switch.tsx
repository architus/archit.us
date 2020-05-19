import React from "react";
import styled, { Box } from "@xstyled/emotion";
import { isDefined } from "Utility";
import ReactSwitch from "react-switch";
import { lightColor, primaryColor } from "global.json";
import { StyleObject } from "Utility/types";

const Styled = {
  Switch: styled(ReactSwitch)`
    // Needs nudge
    vertical-align: -6px;
    line-height: 24px;

    .icon {
      position: relative;
      color: white;

      // Nudges
      top: 2px;
      left: 6px;
    }
  `,
  SwitchLabel: styled.span`
    margin-left: nano;
  `,
};

type SwitchProps = {
  onChange: (checked: boolean) => void;
  checked: boolean;
  label?: React.ReactNode;
  // Common style props
  className?: string;
  style?: StyleObject;
} & Partial<React.ComponentProps<typeof ReactSwitch>>;

const Switch: React.FC<SwitchProps> = ({
  onChange,
  checked,
  label,
  className,
  style,
  ...rest
}) => (
  <Box className={className} style={style} lineHeight={0}>
    <Styled.Switch
      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      offHandleColor={lightColor}
      onHandleColor={lightColor}
      onColor={primaryColor}
      uncheckedIcon={false}
      checkedIcon={false}
      aria-label={isDefined(label) ? label.toString() : undefined}
      height={24}
      width={48}
      onChange={onChange}
      checked={checked}
      {...rest}
    />
    {isDefined(label) ? (
      <Styled.SwitchLabel className="label">{label}</Styled.SwitchLabel>
    ) : null}
  </Box>
);

export default Switch;
