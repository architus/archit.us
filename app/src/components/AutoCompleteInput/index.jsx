import Fuse from "fuse.js";
import { cx } from "linaria";
import get from "lodash/get";
import PropTypes from "prop-types";
import React, { useState, useMemo, useRef } from "react";
import AutoSuggest from "react-autosuggest";

import "./style.scss";

const MAX_FUZZY_SEARCH_LENGTH = 32;

function naiveSearch(value, items, { fields, minLength, maxItems }) {
  const trimmed = value.trim().toLowerCase();
  const { length } = trimmed;
  if (length === 0 || length < minLength) return [];

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
  maxItems,
  onSubmit,
  ...rest
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
        minMatchCharLength: triggerLength,
      }),
    [items, fields, triggerLength]
  );

  // Collection of suggestions
  const [suggestions, setSuggestions] = useState([]);
  const calculateSuggestions = (search) => {
    const trimmed = search.trim();
    if (trimmed.length > MAX_FUZZY_SEARCH_LENGTH) {
      return naiveSearch(trimmed, items, {
        fields,
        minLength: triggerLength,
        maxItems,
      });
    }
    const result = fuse.search(trimmed);
    return maxItems > 0
      ? result.slice(0, Math.min(maxItems, result.length))
      : result;
  };

  // Calculate validation status className
  const validationClass = cx({
    "is-valid": isValid,
    "is-invalid": isInvalid,
  });

  const onKeyDown = (e) => {
    const code = e.keyCode || e.which;
    // Enter keycode
    if (code === 13) {
      if (
        suggestions.length === 0 ||
        // When pressing enter with no selection, the behavior is to clear the
        // suggestions; however, the suggestion clearing event isn't actually fired
        // or fired in time
        autoSuggestRef.current.getHighlightedSuggestion() == null
      )
        onSubmit();
    }
  };

  // Attain ref to component instance
  const autoSuggestRef = useRef(null);

  return (
    <div className={cx("auto-complete-input", validationClass)}>
      <AutoSuggest
        ref={autoSuggestRef}
        suggestions={suggestions}
        renderSuggestion={renderSuggestion}
        inputProps={{
          value,
          placeholder,
          onChange: (_event, { newValue }) => onChange(newValue),
          className: validationClass,
          onKeyDown,
          ...rest,
        }}
        getSuggestionValue={getSuggestionValue}
        onSuggestionsClearRequested={() => setSuggestions([])}
        onSuggestionsFetchRequested={({ value }) =>
          setSuggestions(calculateSuggestions(value))
        }
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
      PropTypes.shape({ name: PropTypes.string, weight: PropTypes.number }),
    ])
  ),
  isValid: PropTypes.bool,
  isInvalid: PropTypes.bool,
  triggerLength: PropTypes.number,
  maxItems: PropTypes.number,
  onSubmit: PropTypes.func,
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
  maxItems: 5,
  onSubmit() {},
};

AutoCompleteInput.displayName = "AutoCompleteInput";
