import React from "react";
import classNames from "classnames";
import { isDefined } from "Utility";
import ReactSwitch from "react-switch";
import { lightColor, primaryColor } from "global.json";
import "./style.scss";

type SwitchProps = {
  label?: React.ReactNode;
  className?: string;
  onChange: (checked: boolean) => void;
  checked: boolean;
} & Partial<React.ComponentProps<typeof ReactSwitch>>;

const Switch: React.FC<SwitchProps> = ({
  label,
  className,
  onChange,
  checked,
  ...rest
}) => (
  <span className={classNames("switch", className)}>
    <ReactSwitch
      className="react-switch"
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
    {isDefined(label) ? <span className="label">{label}</span> : null}
  </span>
);

Switch.displayName = "Switch";

export default Switch;
