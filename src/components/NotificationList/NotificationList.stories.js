import React, { useState, useCallback } from "react";
import { select, boolean, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { useCallbackOnce } from "utility";

import NotificationList from "./index";
import { Form, Col, Button } from "react-bootstrap";

export default {
  title: "Components|NotificationList",
  parameters: { component: NotificationList }
};

export const Basic = () => (
  <NotificationList
    items={[
      { id: 0, message: "Notification 1", variant: "info" },
      { id: 1, message: "Notification 2", variant: "success" },
      { id: 2, message: "Notification 3", variant: "warning" },
      { id: 3, message: "Notification 4", variant: "danger" }
    ]}
    onDismiss={action("on-dismiss")}
    type={select("type", ["toast", "alert"])}
    container={boolean("container", false)}
  />
);

// Interactive notification form
const currentId = { current: 0 };
export const Interactive = () => {
  const addAction = action("notification-add");
  const dismissAction = action("notification-dismiss");

  const [newMessage, setNewMessage] = useState("");
  const onChangeNewMessage = useCallbackOnce(e =>
    setNewMessage(e.target.value)
  );

  const [variant, setVariant] = useState("info");
  const onChangeVariant = useCallbackOnce(e => setVariant(e.target.value));

  const [items, setItems] = useState([]);
  const onNewNotification = useCallback(
    () =>
      setItems(items => {
        const id = currentId.current++;
        addAction(`id: ${id}; message: ${newMessage}`);
        return [...items, { id, message: newMessage, variant }];
      }),
    [newMessage, variant, addAction]
  );
  const onDismiss = useCallbackOnce(id => {
    const { message } = items.find(item => item.id === id);
    dismissAction(`id: ${id}; message: ${message}`);
    setItems(items => items.filter(item => item.id !== id));
  });

  return (
    <div style={{ height: "100%" }}>
      <Form>
        <Form.Row>
          <FormGroup>
            <Form.Control
              type="text"
              placeholder="New message"
              value={newMessage}
              onChange={onChangeNewMessage}
            />
          </FormGroup>
          <FormGroup>
            <Form.Control
              as="select"
              value={variant}
              onChange={onChangeVariant}
            >
              <option>info</option>
              <option>success</option>
              <option>warning</option>
              <option>danger</option>
            </Form.Control>
          </FormGroup>
          <FormGroup>
            <Button
              variant="primary"
              onClick={onNewNotification}
              disabled={newMessage.length === 0}
            >
              Post Notification
            </Button>
          </FormGroup>
        </Form.Row>
      </Form>

      <NotificationList
        items={items}
        onDismiss={onDismiss}
        transitionLength={number("transitionLength", 250, { min: 0 })}
        type={select("type", ["toast", "alert"])}
        container={boolean("container", false)}
      />
    </div>
  );
};

function FormGroup(props) {
  return <Form.Group as={Col} {...props} />;
}
