import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef
} from "react";
import PropTypes from "prop-types";
import { isDefined, identity, isNil } from "utility";

import { Modal, Button, Form } from "react-bootstrap";

import "./style.scss";

function AddRowModal({ show, columns, onHide, onAdd, title, ...rest }) {
  // Filter columns based on whether they should have a field
  const relevantColumns = useMemo(
    () => columns.filter(col => col.hasAddField),
    [columns]
  );
  const relevantColumnsMap = useMemo(
    () =>
      Object.assign(
        {},
        ...relevantColumns.map(({ key, ...rest }) => ({ [key]: rest }))
      ),
    [relevantColumns]
  );

  // Controlled input values
  const initialState = useCallback(columns =>
    Object.assign({}, ...columns.map(col => ({ [col.key]: "" })))
  );
  const [values, setValues] = useState(() => initialState(relevantColumns));
  useEffect(() => setValues(initialState(relevantColumns)), [relevantColumns]);
  const onChange = useCallback(
    (key, event) => {
      let processFunc = relevantColumnsMap[key].processValue;
      if (isNil(processFunc)) processFunc = identity;
      const newValue = isDefined(event.target) ? event.target.value : "";
      setValues({
        ...values,
        [key]: processFunc(newValue)
      });
    },
    [values, relevantColumnsMap]
  );

  // Auto-focus first input field
  const firstInput = useRef(null);
  useEffect(() => {
    if (show && isDefined(firstInput.current)) firstInput.current.focus();
  }, [show]);

  // Input validation
  const [validationStatus, isValid] = useMemo(() => {
    let validationStatus = {};
    let allPass = true;
    for (const i in relevantColumns) {
      const { key, required, name, validator } = relevantColumns[i];
      const value = values[key];
      if (required) {
        // Validate based on empty or not
        if (value.trim().length === 0) {
          validationStatus[key] = {
            result: false,
            message: `${name} is a required field`
          };
          allPass = false;
          continue;
        }
      }

      // Custom validator
      if (isDefined(validator)) {
        const result = validator(value);
        if (typeof result === "boolean") {
          allPass = allPass && result;
          validationStatus[key] = {
            result,
            message: ""
          };
        } else {
          allPass = allPass && result.result;
          validationStatus[key] = result;
        }
      }
    }
    return [validationStatus, allPass];
  }, [relevantColumns, values]);
  const tryAdd = useCallback(() => {
    if (isValid) {
      setValues(initialState(relevantColumns));
      setShowValidation(false);
      onAdd(values);
    } else {
      setShowValidation(true);
    }
  }, [isValid, values]);
  const close = useCallback(() => {
    setValues(initialState(relevantColumns));
    setShowValidation(false);
    onHide();
  });
  const [showValidation, setShowValidation] = useState(false);

  // Enter press handle
  const handleKeyPressed = useCallback(
    e => {
      var code = e.keyCode || e.which;
      // Enter keycode
      if (code === 13) {
        tryAdd();
      }
    },
    [values]
  );
  useEffect(() => {
    if (show) {
      document.addEventListener("keydown", handleKeyPressed, false);
      return () =>
        document.removeEventListener("keydown", handleKeyPressed, false);
    }
  }, [show, handleKeyPressed]);

  return (
    <Modal
      size="lg"
      aria-labelledby="add-row-header"
      centered
      onHide={close}
      className="add-row-modal"
      restoreFocus={false}
      scrollable
      show={show}
      {...rest}
    >
      <Modal.Header closeButton>
        <Modal.Title id="add-row-header">
          {isDefined(title) ? title : "Add a new row"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          {relevantColumns.map((col, i) => (
            <Form.Group controlId={`addRowForm-${col.key}`} key={col.key}>
              <Form.Label>{col.name}</Form.Label>
              <FormInput
                type="text"
                inputKey={col.key}
                placeholder={`Enter ${col.name.toLowerCase()}`}
                onChange={onChange}
                value={values[col.key]}
                isValid={showValidation && validationStatus[col.key].result}
                isInvalid={showValidation && !validationStatus[col.key].result}
                ref={i === 0 ? firstInput : undefined}
              />
              <Form.Control.Feedback type="invalid">
                {validationStatus[col.key].message}
              </Form.Control.Feedback>
              {isDefined(col.info) ? (
                <Form.Text className="text-muted">{col.info}</Form.Text>
              ) : (
                undefined
              )}
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close} variant="outline-primary" className="px-4 mr-3">
          Cancel
        </Button>
        <Button onClick={tryAdd} className="px-4" disabled={!isValid}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddRowModal;

AddRowModal.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  onHide: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  title: PropTypes.string,
  show: PropTypes.bool
};

AddRowModal.defaultProps = {
  columns: [],
  title: null,
  show: false
};

// ? ==============
// ? Sub-components
// ? ==============

const FormInput = React.forwardRef(({ onChange, inputKey, ...rest }, ref) => (
  <Form.Control
    onChange={useCallback(e => onChange(inputKey, e), [onChange, inputKey])}
    ref={ref}
    {...rest}
  />
));

FormInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  inputKey: PropTypes.string
};
