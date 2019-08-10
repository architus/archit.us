import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isDefined } from "utility";
import inputControls from "./inputs";

import HelpTooltip from "components/HelpTooltip";

import "./style.scss";

function SettingsEntry({
  label,
  input_type,
  value,
  help_tooltip,
  properties,
  validation_steps,
  onCommit,
  settingKey,
  standalone
}) {
  // Resolve input control from map
  const InputControl = inputControls[input_type];

  // Controlled component
  const [buffer, setBuffer] = useState(value);
  const onChange = useCallback(value => setBuffer(value));

  // Validation
  const isInvalid = false;

  // Committing
  const onTryCommit = useCallback(() => null);

  // Standalone mode
  const Row = standalone ? "div" : "tr";
  const Cell = standalone ? "div" : "td";

  return (
    <Row className={classNames("settings-entry", { standalone })}>
      <Cell className="settings-entry--label">
        {label}
        {isDefined(help_tooltip) ? (
          <HelpTooltip content={help_tooltip} right />
        ) : null}
      </Cell>
      <Cell className="settings-entry--input">
        <InputControl
          value={buffer}
          onChange={onChange}
          isInvalid={isInvalid}
          onTryCommit={() => console.log("trying")}
          name={label}
          {...properties}
        />
      </Cell>
    </Row>
  );
}

export default SettingsEntry;
export const propShape = {
  label: PropTypes.string.isRequired,
  input_type: PropTypes.oneOf([
    "string",
    "numeric",
    "string_auto_complete",
    "string_highlighted",
    "switch",
    "string_array_auto_complete"
  ]).isRequired,
  default: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  help_tooltip: PropTypes.string,
  properties: PropTypes.object,
  validation_steps: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ key: PropTypes.string.isRequired })
    ])
  ),
  cli: PropTypes.exact({
    name: PropTypes.string,
    emoji: PropTypes.string,
    message: PropTypes.string,
    input_mode: PropTypes.oneOf(["replace", "array_toggle"])
  })
};

SettingsEntry.propTypes = {
  ...propShape,
  onCommit: PropTypes.func,
  settingKey: PropTypes.string.isRequired,
  standalone: PropTypes.bool
};

SettingsEntry.defaultProps = { width: 5, onCommit() {}, standalone: true };

SettingsEntry.displayName = "SettingsEntry";
