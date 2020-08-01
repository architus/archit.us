import { cx } from "linaria";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

import {
  InputGroup,
  FormControl,
  Button,
  ButtonProps,
  FormControlProps,
} from "@app/react-bootstrap";

import "./style.scss";

type NumericUpDownProps = {
  onChange: FormControlProps["onChange"];
  value: string;
  onUp: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDown: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  placeholder?: string;
  isValid?: boolean;
  isInvalid?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const NumericUpDown: React.FC<NumericUpDownProps> = React.forwardRef(
  (
    {
      onChange,
      value,
      onUp,
      onDown,
      placeholder = "",
      isValid = false,
      isInvalid = false,
      className,
      style,
    },
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <InputGroup className={cx("numeric-up-down", className)} style={style}>
        <FormControl
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          isValid={isValid}
          isInvalid={isInvalid}
          ref={ref}
          type="text"
          as="input"
        />
        <InputGroup.Append>
          <Button
            variant={"input-control" as ButtonProps["variant"]}
            onClick={onDown}
          >
            <FaMinus />
          </Button>
          <Button
            variant={"input-control" as ButtonProps["variant"]}
            onClick={onUp}
          >
            <FaPlus />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
);

NumericUpDown.displayName = "NumericUpDown";

export default NumericUpDown;
