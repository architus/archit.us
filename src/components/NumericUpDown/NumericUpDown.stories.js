import React, { useState, useCallback } from "react";
import NumericUpDown from "./index";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { isDefined, isEmptyOrNil } from "utility";
import MaxWidthDecorator from "MaxWidthDecorator";

export default {
  title: "Components/NumericUpDown",
  decorators: [MaxWidthDecorator],
  parameters: { component: NumericUpDown }
};

export const Basic = () => (
  <NumericUpDown
    isValid={boolean("Is Valid", false)}
    isInvalid={boolean("Is Invalid", false)}
    onChange={action("input-change")}
    onUp={action("up-click")}
    onDown={action("down-click")}
    placeholder={text("Placeholder", "basic")}
  />
);

export const Controlled = () => {
  const [value, setValue] = useState("0");
  const onUp = useCallback(() => {
    setValue(isEmptyOrNil(value) ? 1 : (parseFloat(value) + 1).toString());
  }, [value]);
  const onDown = useCallback(() => {
    setValue(isEmptyOrNil(value) ? 0 : (parseFloat(value) - 1).toString());
  }, [value]);
  const numericRegex = new RegExp(text("Input filter", "[^0-9.-]*"), "g");
  const onChange = useCallback(event => {
    const newValue = isDefined(event.target) ? event.target.value : "";
    setValue(newValue.replace(numericRegex, ""));
  });
  return (
    <>
      <NumericUpDown
        isValid={boolean("Is Valid", false)}
        isInvalid={boolean("Is Invalid", false)}
        onChange={onChange}
        onUp={onUp}
        onDown={onDown}
        value={value}
        placeholder={text("Placeholder", "controlled")}
      />
      <p className="mt-2">
        Input restricted to numbers, decimal points, and hyphens
      </p>
      <h6 className="mt-2">Current value is: {value}</h6>
    </>
  );
};
