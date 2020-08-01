import { styled } from "linaria/react";
import React from "react";
import ReactSwitch from "react-switch";

import { isDefined } from "@app/utility";
import { useColorMode } from "@architus/facade/hooks";
import { Color, hybridColor } from "@architus/facade/theme/color";
import { gap } from "@architus/facade/theme/spacing";

const Styled = {
  Wrapper: styled.div`
    line-height: 0;
  `,
  Switch: styled(ReactSwitch)`
    /* Needs nudge */
    vertical-align: -6px;
    line-height: 24px;

    svg {
      position: relative;

      /* Nudges */
      top: 4px;
      left: 6px;
    }
  `,
  SwitchLabel: styled.span`
    margin-left: ${gap.nano};
  `,
};

type SwitchProps = {
  onChange: (checked: boolean) => void;
  checked: boolean;
  label?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
} & Partial<React.ComponentProps<typeof ReactSwitch>>;

const Switch: React.FC<SwitchProps> = ({
  onChange,
  checked,
  label,
  className,
  style,
  ...rest
}) => {
  const colorMode = useColorMode();

  // react-switch expects colors to be hex strings
  const primaryColor = Color(hybridColor("primary", colorMode)).toString("hex");
  const lightColor = Color(hybridColor("light", colorMode)).toString("hex");

  return (
    <Styled.Wrapper className={className} style={style}>
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
    </Styled.Wrapper>
  );
};

export default Switch;
