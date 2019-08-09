import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import Icon from "components/Icon";
import { InputGroup, FormControl, Button } from "react-bootstrap";

import "./style.scss";

const NumericUpDown = forwardRef(
  (
    { isValid, isInvalid, onChange, onUp, onDown, value, placeholder, ...rest },
    ref
  ) => {
    return (
      <InputGroup>
        <FormControl
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type="text"
          ref={ref}
          {...rest}
        />
        <InputGroup.Append>
          <Button variant="input-control" onClick={onDown}>
            <Icon name="minus" />
          </Button>
          <Button variant="input-control" onClick={onUp}>
            <Icon name="plus" />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
);

export default NumericUpDown;

NumericUpDown.propTypes = {
  isValid: PropTypes.bool,
  isInvalid: PropTypes.bool,
  onChange: PropTypes.func,
  onUp: PropTypes.func,
  onDown: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string
};

NumericUpDown.defaultProps = {
  isValid: false,
  isInvalid: false,
  onChange() {},
  onUp() {},
  onDown() {},
  placeholder: ""
};

NumericUpDown.displayName = "NumericUpDown";
