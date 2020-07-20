import { text } from "@storybook/addon-knobs";
import MaxWidthDecorator from "MaxWidthDecorator";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

import SetInput from "./index";

export default {
  title: "Inputs|SetInput/Basic",
  decorators: [MaxWidthDecorator],
  parameters: { component: SetInput },
};

export const Default = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState(["Lorem", "ipsum", "dolor"]);
  const onRemove = (index) => setItems(items.filter((_o, i) => i !== index));
  const onAdd = () => {
    if (value.trim() === "") return;
    setItems([...items, value]);
    setValue("");
  };
  const onKeyPress = (e) => {
    const code = e.keyCode || e.which;
    // Enter keycode
    if (code === 13) {
      onAdd();
    }
  };

  return (
    <SetInput items={items} addItem={onAdd} removeItem={onRemove}>
      <Form.Control
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={text("placeholder", "basic")}
        type="text"
        onKeyDown={onKeyPress}
      />
    </SetInput>
  );
};

export const IsValid = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState(["Lorem", "ipsum", "dolor"]);
  const onRemove = (index) => setItems(items.filter((_o, i) => i !== index));
  const onAdd = () => {
    if (value.trim() === "") return;
    setItems([...items, value]);
    setValue("");
  };
  const onKeyPress = (e) => {
    const code = e.keyCode || e.which;
    // Enter keycode
    if (code === 13) {
      onAdd();
    }
  };

  return (
    <SetInput items={items} addItem={onAdd} removeItem={onRemove}>
      <Form.Control
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={text("placeholder", "basic")}
        type="text"
        onKeyDown={onKeyPress}
        isValid
      />
    </SetInput>
  );
};

export const IsInvalid = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState(["Lorem", "ipsum", "dolor"]);
  const onRemove = (index) => setItems(items.filter((_o, i) => i !== index));
  const onAdd = () => {
    if (value.trim() === "") return;
    setItems([...items, value]);
    setValue("");
  };
  const onKeyPress = (e) => {
    const code = e.keyCode || e.which;
    // Enter keycode
    if (code === 13) {
      onAdd();
    }
  };

  return (
    <SetInput items={items} addItem={onAdd} removeItem={onRemove}>
      <Form.Control
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={text("placeholder", "basic")}
        type="text"
        onKeyDown={onKeyPress}
        isInvalid
      />
    </SetInput>
  );
};
