import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isDefined, escapeRegExp } from "utility";
import Prism from "prismjs";

import Editor from "react-simple-code-editor";

import "./style.scss";

// Number of unique token colors to cycle between
const TOKEN_COUNT = 6;

function SyntaxHighlightedInput({
  value,
  onChange,
  tokens,
  className,
  highlightFunc,
  isInvalid,
  isValid,
  prismLanguage,
  ...rest
}) {
  const languageDef = useMemo(() => {
    if (isDefined(prismLanguage)) return prismLanguage;

    // Assign tokens to token classes, placing in bins using round robin method
    let assignments = [];
    for (let i = 0; i < tokens.length; ++i) {
      const index = i % TOKEN_COUNT;
      const token = tokens[i];
      if (isDefined(assignments[index])) {
        assignments[index].token.push(token);
      } else {
        assignments[index] = { token: [token], className: `token-${index}` };
      }
    }

    // Convert token assignments to a prism language
    let language = {};
    for (const assignment of assignments) {
      language[assignment.className] = new RegExp(
        `(?:${escapeRegExp(assignment.token.join("|"))})`
      );
    }
    return language;
  }, [tokens, prismLanguage]);

  // Use token-based highlighting unless other function specified
  const highlight = useCallback(
    isDefined(highlightFunc)
      ? highlightFunc
      : code => Prism.highlight(code, languageDef),
    [highlightFunc, languageDef]
  );

  return (
    <div
      className={classNames("syntax-highlighted-input", className, {
        "is-invalid": isInvalid,
        "is-valid": isValid
      })}
    >
      <Editor
        value={value}
        onValueChange={onChange}
        highlight={highlight}
        {...rest}
      />
    </div>
  );
}

export default SyntaxHighlightedInput;

SyntaxHighlightedInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  tokens: PropTypes.arrayOf(PropTypes.string),
  highlightFunc: PropTypes.func,
  className: PropTypes.string,
  isInvalid: PropTypes.bool,
  isValid: PropTypes.bool,
  prismLanguage: PropTypes.object
};

SyntaxHighlightedInput.defaultProps = {
  value: "",
  onChange() {},
  tokens: [],
  className: "",
  isInvalid: false,
  isValid: false
};
