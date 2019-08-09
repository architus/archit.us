/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
import { isEmptyOrNil, isDefined } from "utility";

import { Form } from "react-bootstrap";
import NumericUpDown from "components/NumericUpDown";
import Switch from "components/Switch";

function clamp(value, min, max) {
  let newValue = value;
  if (isDefined(min)) newValue = Math.max(newValue, min);
  if (isDefined(max)) newValue = Math.min(newValue, max);
  return newValue;
}

function isLooselyNumeric(value, float = false) {
  return !isNaN(float ? parseFloat(value) : parseInt(value));
}

const inputControls = {
  // Basic string input
  string({ value, onChange, isInvalid, onTryCommit, name }) {
    const handleChange = useCallback(e => onChange(e.target.value), [onChange]);

    // Commit handling
    const handleKeyPressed = useCallback(e => {
      var code = e.keyCode || e.which;
      // Enter keycode
      if (code === 13) {
        onTryCommit();
      }
    });

    return (
      <Form.Control
        type="text"
        value={value}
        onChange={handleChange}
        isInvalid={isInvalid}
        placeholder={name}
        onBlur={onTryCommit}
        onKeyDown={handleKeyPressed}
      />
    );
  },

  numeric({
    value,
    onChange,
    isInvalid,
    onTryCommit,
    name,
    integer = false,
    min,
    max,
    step = 1
  }) {
    const handleChange = useCallback(e => onChange(e.target.value), [onChange]);
    const transform = (step, value, onChange) =>
      integer
        ? () => {
            onChange(
              clamp(
                isEmptyOrNil(value) || !isLooselyNumeric(value)
                  ? 0
                  : parseInt(value) + step,
                min,
                max
              ).toString()
            );
            onTryCommit();
          }
        : () => {
            onChange(
              clamp(
                isEmptyOrNil(value) || !isLooselyNumeric(value, true)
                  ? 0
                  : parseFloat(value) + step,
                min,
                max
              ).toString()
            );
            onTryCommit();
          };
    const handleDown = useCallback(transform(-step, value, onChange), [
      value,
      step,
      onChange,
      integer
    ]);
    const handleUp = useCallback(transform(step, value, onChange), [
      value,
      step,
      onChange,
      integer
    ]);

    // Commit handling
    const handleKeyPressed = useCallback(e => {
      var code = e.keyCode || e.which;
      // Enter keycode
      if (code === 13) {
        onTryCommit();
      }
    });

    return (
      <NumericUpDown
        value={value.toString()}
        onChange={handleChange}
        isInvalid={isInvalid}
        placeholder={name}
        onBlur={onTryCommit}
        onKeyDown={handleKeyPressed}
        onUp={handleUp}
        onDown={handleDown}
      />
    );
  },

  switch: function({ value, onChange, onTryCommit }) {
    return (
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
    );
  },

  "string_auto-complete": function() {
    return null;
  },

  string_highlighted: function() {
    return null;
  },

  "string-array_auto-complete": function() {
    return null;
  }
};

export default inputControls;
