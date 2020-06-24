import React from "react";
import classNames from "classnames";
import Icon from "Components/Icon";
import { StyleObject } from "Utility/types";
import {
  InputGroup,
  FormControl,
  Button,
  ButtonProps,
  FormControlProps,
} from "react-bootstrap";
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
  style?: StyleObject;
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
      <InputGroup
        className={classNames("numeric-up-down", className)}
        style={style}
      >
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
            <Icon name="minus" />
          </Button>
          <Button
            variant={"input-control" as ButtonProps["variant"]}
            onClick={onUp}
          >
            <Icon name="plus" />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
);

NumericUpDown.displayName = "NumericUpDown";

export default NumericUpDown;
