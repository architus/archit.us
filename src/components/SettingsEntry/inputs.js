/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
import { isEmptyOrNil, isDefined } from "utility";

import { Form } from "react-bootstrap";
import NumericUpDown from "components/NumericUpDown";
import SyntaxHighlightedInput from "components/SyntaxHighlightedInput";
import Switch from "components/Switch";

const clamp = (value, min, max) => {
  let newValue = value;
  if (isDefined(min)) newValue = Math.max(newValue, min);
  if (isDefined(max)) newValue = Math.min(newValue, max);
  return newValue;
};

const isLooselyNumeric = (value, float = false) =>
  !isNaN(parseNumber(value, float));

const canTransform = (value, float = false) =>
  isEmptyOrNil(value) || !isLooselyNumeric(value, float);

const parseNumber = (value, float = false) =>
  float ? parseFloat(value) : parseInt(value);

const transform = (value, step, float = false) =>
  canTransform(value, float) ? 0 : parseNumber(value, float) + step;

const handleInputKeyPress = onEnter => e => {
  const code = e.keyCode || e.which;
  // Enter keycode
  if (code === 13) {
    onEnter();
    e.target.blur();
  }
};

const inputControls = {
  // Basic string input
  string: ({ value, onChange, isInvalid, onTryCommit, name }) => (
    <Form.Control
      type="text"
      value={value}
      isInvalid={isInvalid}
      placeholder={name}
      onBlur={onTryCommit}
      onChange={useCallback(e => onChange(e.target.value), [onChange])}
      onKeyDown={useCallback(handleInputKeyPress(onTryCommit))}
    />
  ),

  switch: ({ value, onChange, onTryCommit }) => (
    <Switch
      checked={value}
      onChange={useCallback(
        checked => {
          onChange(checked);
          onTryCommit();
        },
        [onChange, onTryCommit]
      )}
    />
  ),

  string_highlighted: ({
    value,
    onChange,
    isInvalid,
    onTryCommit,
    // string_highlighted-specific configuration properties
    tokens = []
  }) => (
    <SyntaxHighlightedInput
      tokens={tokens}
      value={value}
      onChange={onChange}
      onBlur={onTryCommit}
      onKeyDown={useCallback(handleInputKeyPress(onTryCommit))}
      isInvalid={isInvalid}
    />
  ),

  numeric: ({
    value,
    onChange,
    isInvalid,
    onTryCommit,
    name,
    // numeric-specific configuration properties
    integer = false,
    min,
    max,
    step = 1
  }) => {
    const transformDeps = [value, step, onChange, integer];
    const transformValue = (step, value, onChange) => () => {
      onChange(clamp(transform(value, step, !integer), min, max).toString());
      onTryCommit();
    };

    return (
      <NumericUpDown
        value={value.toString()}
        isInvalid={isInvalid}
        placeholder={name}
        onBlur={onTryCommit}
        onChange={useCallback(e => onChange(e.target.value), [onChange])}
        onKeyDown={useCallback(handleInputKeyPress(onTryCommit))}
        onUp={useCallback(transformValue(step, value, onChange), transformDeps)}
        onDown={useCallback(
          transformValue(-step, value, onChange),
          transformDeps
        )}
      />
    );
  },

  string_auto_complete: function() {
    return null;
  },

  string_array_auto_complete: function() {
    return null;
  }
};

export default inputControls;
