import React, { useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-python.js";
import { useCallbackOnce } from "Utility";

import SyntaxHighlightedInput from "./index";

import pythonExample from "./story/python.txt";
import { content, tokens } from "./story/custom.json";

export default {
  title: "Inputs|SyntaxHighlightedInput",
  parameters: {
    component: SyntaxHighlightedInput
  }
};

export const Basic = () => {
  const [value, setValue] = useState(content);
  return (
    <SyntaxHighlightedInput value={value} onChange={setValue} tokens={tokens} />
  );
};
Basic.story = {
  parameters: {
    notes:
      "`SyntaxHighlightedInput` uses [`react-simple-code-editor`](https://www.npmjs" +
      ".com/package/react-simple-code-editor) to display syntax-highlighted text. Languages " +
      "can be selected from [PrismJS](https://prismjs.com/index.html) or can be specified " +
      "as a list of string tokens.\n\n> **Note:** this is a controlled component"
  }
};

export const IsValid = () => {
  const [value, setValue] = useState(content);
  return (
    <SyntaxHighlightedInput
      value={value}
      onChange={setValue}
      tokens={tokens}
      isValid
    />
  );
};

export const IsInvalid = () => {
  const [value, setValue] = useState(content);
  return (
    <SyntaxHighlightedInput
      value={value}
      onChange={setValue}
      tokens={tokens}
      isInvalid
    />
  );
};

export const PrismJS = () => {
  const [value, setValue] = useState(pythonExample);
  return (
    <SyntaxHighlightedInput
      value={value}
      onChange={setValue}
      highlightFunc={useCallbackOnce(code =>
        Prism.highlight(code, Prism.languages.python)
      )}
    />
  );
};
