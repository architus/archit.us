import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import Fuse from "fuse.js";
import classNames from "classnames";
import get from "lodash/get";
import { useCallbackOnce } from "utility";

import AutoSuggest from "react-autosuggest";

import "./style.scss";

const MAX_FUZZY_SEARCH_LENGTH = 32;

function naiveSearch(value, items, { fields, minLength, maxItems }) {
  const trimmed = value.trim().toLowerCase();
  const length = trimmed.length;
  if (length === 0 || length < minLength) return [];
  else {
    const matched = [];
    for (let i = 0; i < items.length; ++i) {
      const current = items[i];
      for (let j = 0; j < fields.length; ++j) {
        const field = fields[j];
        const currentValue =
          typeof field === "string"
            ? get(current, field)
            : get(current, field.name);
        if (currentValue.toLowerCase().slice(0, length) === trimmed) {
          matched.push(current);
          break;
        }
      }
      if (matched.length >= maxItems && maxItems > 0) break;
    }
    return matched;
  }
}

function AutoCompleteInput({
  renderSuggestion,
  getSuggestionValue,
  placeholder,
  items,
  onChange,
  triggerLength,
  value,
  fields,
  isInvalid,
  isValid,
  maxItems
}) {
  // Fuzzy search library object
  const fuse = useMemo(
    () =>
      new Fuse(items, {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        keys: fields,
        maxPatternLength: MAX_FUZZY_SEARCH_LENGTH,
        minMatchCharLength: triggerLength
      }),
    [items, fields, triggerLength]
  );

  // Collection of suggestions
  const [suggestions, setSuggestions] = useState([]);
  const calculateSuggestions = useCallback(
    search => {
      const trimmed = search.trim();
      if (trimmed.length > MAX_FUZZY_SEARCH_LENGTH) {
        return naiveSearch(trimmed, items, {
          fields,
          minLength: triggerLength,
          maxItems
        });
      } else {
        const result = fuse.search(trimmed);
        return maxItems > 0
          ? result.slice(0, Math.min(maxItems, result.length))
          : result;
      }
    },
    [items, fields, triggerLength, fuse, maxItems]
  );

  // Autosuggest callbacks
  const onSuggestionsFetchRequested = useCallbackOnce(({ value }) =>
    setSuggestions(calculateSuggestions(value))
  );
  const onSuggestionsClearRequested = useCallbackOnce(() => setSuggestions([]));

  // Input change callback
  const onInputChange = useCallback(
    (_event, { newValue }) => onChange(newValue),
    [onChange]
  );

  // Calculate validation status className
  const validationClass = classNames({
    "is-valid": isValid,
    "is-invalid": isInvalid
  });

  return (
    <div className={classNames("auto-complete-input", validationClass)}>
      <AutoSuggest
        suggestions={suggestions}
        renderSuggestion={renderSuggestion}
        inputProps={{
          value,
          placeholder,
          onChange: onInputChange,
          className: validationClass
        }}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
      />
    </div>
  );
}

export default AutoCompleteInput;

AutoCompleteInput.propTypes = {
  renderSuggestion: PropTypes.func.isRequired,
  getSuggestionValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  items: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ name: PropTypes.string, weight: PropTypes.number })
    ])
  ),
  isValid: PropTypes.bool,
  isInvalid: PropTypes.bool,
  triggerLength: PropTypes.number,
  maxItems: PropTypes.number
};

AutoCompleteInput.defaultProps = {
  placeholder: "",
  items: [],
  onChange() {},
  value: "",
  fields: [],
  isValid: false,
  isInvalid: false,
  triggerLength: 1,
  maxItems: 5
};

AutoCompleteInput.displayName = "AutoCompleteInput";
