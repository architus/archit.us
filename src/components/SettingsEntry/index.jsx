import React, { useCallback } from "react";
import PropTypes from "prop-types";

import "./style.scss";

function SettingsEntry({ onCommit }) {
  return null;
}

export default SettingsEntry;
export const propShape = {
  label: PropTypes.string.isRequired,
  input_type: PropTypes.oneOf([
    "string",
    "numeric",
    "string_auto-complete",
    "string_highlighted",
    "switch",
    "string-array_auto-complete"
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
  settingKey: PropTypes.string.isRequired
};

SettingsEntry.defaultProps = { width: 5, onCommit() {} };

SettingsEntry.displayName = "SettingsEntry";
