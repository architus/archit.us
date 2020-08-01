import { cx } from "linaria";
import Prism from "prismjs";
import PropTypes from "prop-types";
import React, { useMemo, useCallback } from "react";
import Editor from "react-simple-code-editor";

import { isDefined, escapeRegExp } from "@app/utility";

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
    const assignments = [];
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
    const language = {};
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
      : (code) => Prism.highlight(code, languageDef),
    [highlightFunc, languageDef]
  );

  return (
    <div
      className={cx(
        "syntax-highlighted-input",
        className,
        isInvalid && "is-invalid",
        isValid && "is-valid"
      )}
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
  prismLanguage: PropTypes.object,
};

SyntaxHighlightedInput.defaultProps = {
  value: "",
  onChange() {},
  tokens: [],
  className: "",
  isInvalid: false,
  isValid: false,
};
