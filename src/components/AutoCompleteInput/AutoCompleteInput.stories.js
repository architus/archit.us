import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { text } from "@storybook/addon-knobs";

import AutoCompleteInput from "./index";
import MaxWidthDecorator from "MaxWidthDecorator";

import { data } from "./story/sample.json";

export default {
  title: "Components/AutoCompleteInput",
  decorators: [MaxWidthDecorator],
  parameters: { component: AutoCompleteInput }
};

function SuggestionEntry({ title, author }) {
  return (
    <div className="d-flex justify-content-between">
      <div>{title}</div>
      <div className="text-muted">
        by: {author.firstName} {author.lastName}
      </div>
    </div>
  );
}

SuggestionEntry.propTypes = {
  title: PropTypes.string,
  author: PropTypes.object
};

export const Basic = () => {
  const [value, setValue] = useState("");
  return (
    <AutoCompleteInput
      value={value}
      onChange={setValue}
      placeholder={text("placeholder", "basic")}
      items={data}
      fields={[
        { name: "title", weight: 0.7 },
        { name: "author.lastName", weight: 0.3 }
      ]}
      getSuggestionValue={useCallback(item => item.title)}
      renderSuggestion={SuggestionEntry}
    />
  );
};

export const IsValid = () => {
  const [value, setValue] = useState("");
  return (
    <AutoCompleteInput
      value={value}
      onChange={setValue}
      placeholder={text("placeholder", "basic")}
      items={data}
      fields={[
        { name: "title", weight: 0.7 },
        { name: "author.lastName", weight: 0.3 }
      ]}
      getSuggestionValue={useCallback(item => item.title)}
      renderSuggestion={SuggestionEntry}
      isValid
    />
  );
};

export const IsInvalid = () => {
  const [value, setValue] = useState("");
  return (
    <AutoCompleteInput
      value={value}
      onChange={setValue}
      placeholder={text("placeholder", "basic")}
      items={data}
      fields={[
        { name: "title", weight: 0.7 },
        { name: "author.lastName", weight: 0.3 }
      ]}
      getSuggestionValue={useCallback(item => item.title)}
      renderSuggestion={SuggestionEntry}
      isInvalid
    />
  );
};
