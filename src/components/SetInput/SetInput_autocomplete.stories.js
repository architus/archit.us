import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { text } from "@storybook/addon-knobs";
import { isDefined } from "Utility";

import SetInput from "./index";
import MaxWidthDecorator from "MaxWidthDecorator";
import AutoCompleteInput from "components/AutoCompleteInput";

import { data } from "components/AutoCompleteInput/story/sample.json";

export default {
  title: "Inputs|SetInput/Autocomplete",
  decorators: [MaxWidthDecorator],
  parameters: { component: SetInput }
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

export const Default = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([data[0], data[1], data[2]]);
  const onRemove = index => setItems(items.filter((_o, i) => i !== index));
  const onAdd = () => {
    if (value.trim() !== "") {
      const book = data.find(d => d.title === value);
      if (isDefined(book)) setItems([...items, book]);
      setValue("");
    }
  };

  return (
    <SetInput
      items={items}
      addItem={onAdd}
      removeItem={onRemove}
      renderItem={item => <div>{item.title}</div>}
    >
      <AutoCompleteInput
        value={value}
        onChange={setValue}
        onSubmit={onAdd}
        placeholder={text("placeholder", "basic")}
        items={data}
        fields={[
          { name: "title", weight: 0.7 },
          { name: "author.lastName", weight: 0.3 }
        ]}
        getSuggestionValue={item => item.title}
        renderSuggestion={SuggestionEntry}
      />
    </SetInput>
  );
};

export const IsValid = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([data[0], data[1], data[2]]);
  const onRemove = index => setItems(items.filter((_o, i) => i !== index));
  const onAdd = () => {
    if (value.trim() !== "") {
      const book = data.find(d => d.title === value);
      if (isDefined(book)) setItems([...items, book]);
      setValue("");
    }
  };

  return (
    <SetInput
      items={items}
      addItem={onAdd}
      removeItem={onRemove}
      renderItem={item => <div>{item.title}</div>}
    >
      <AutoCompleteInput
        value={value}
        onChange={setValue}
        onSubmit={onAdd}
        placeholder={text("placeholder", "basic")}
        items={data}
        fields={[
          { name: "title", weight: 0.7 },
          { name: "author.lastName", weight: 0.3 }
        ]}
        getSuggestionValue={item => item.title}
        renderSuggestion={SuggestionEntry}
        isValid
      />
    </SetInput>
  );
};

export const IsInvalid = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([data[0], data[1], data[2]]);
  const onRemove = index => setItems(items.filter((_o, i) => i !== index));
  const onAdd = () => {
    if (value.trim() !== "") {
      const book = data.find(d => d.title === value);
      if (isDefined(book)) setItems([...items, book]);
      setValue("");
    }
  };

  return (
    <SetInput
      items={items}
      addItem={onAdd}
      removeItem={onRemove}
      renderItem={item => <div>{item.title}</div>}
    >
      <AutoCompleteInput
        value={value}
        onChange={setValue}
        onSubmit={onAdd}
        placeholder={text("placeholder", "basic")}
        items={data}
        fields={[
          { name: "title", weight: 0.7 },
          { name: "author.lastName", weight: 0.3 }
        ]}
        getSuggestionValue={item => item.title}
        renderSuggestion={SuggestionEntry}
        isInvalid
      />
    </SetInput>
  );
};

export const Advanced = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([data[0], data[1], data[2]]);
  const [showValidation, setShowValidation] = useState(false);

  const onRemove = index => setItems(items.filter((_o, i) => i !== index));
  const onAdd = () => {
    const trimmed = value.trim();
    if (trimmed !== "") {
      const book = data.find(d => d.title === trimmed);
      if (isDefined(book)) {
        setItems([...items, book]);
        setValue("");
        setShowValidation(false);
      } else {
        setShowValidation(true);
      }
    }
  };

  const isValid = useMemo(() => {
    if (!showValidation) return true;
    else {
      const trimmed = value.trim();
      if (data.findIndex(d => d.title.trim() === trimmed) !== -1) return true;
      else return false;
    }
  }, [showValidation, value]);

  const onChange = v => {
    setValue(v);
    if (v.trim() === "") setShowValidation(false);
  };

  return (
    <SetInput
      items={items}
      addItem={onAdd}
      removeItem={onRemove}
      renderItem={item => <div>{item.title}</div>}
    >
      <AutoCompleteInput
        value={value}
        onChange={onChange}
        onSubmit={onAdd}
        placeholder={text("placeholder", "basic")}
        items={data}
        fields={[
          { name: "title", weight: 0.7 },
          { name: "author.lastName", weight: 0.3 }
        ]}
        getSuggestionValue={item => item.title}
        renderSuggestion={SuggestionEntry}
        isInvalid={showValidation && !isValid}
        isValid={showValidation && isValid}
      />
    </SetInput>
  );
};
