import React, { useCallback } from "react";
import { text, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Notification from "./index";
import Icon from "components/Icon";
import { Button } from "react-bootstrap";

export default {
  title: "Components|Notification",
  parameters: { component: Notification }
};

export const Alert = () => (
  <Notification
    type="alert"
    onDismiss={action("on-dismiss")}
    variant={select(
      "variant",
      ["info", "success", "warning", "danger"],
      "info"
    )}
    message={text(
      "Message",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a commodo libero. " +
        "Cras tortor orci, dictum vulputate magna a, hendrerit egestas erat."
    )}
  />
);
Alert.story = {
  parameters: {
    notes:
      "`Notification` displays a dismissible push notification sent to the user, with " +
      "built-in contextual variants. There are two types:\n\n- `toast`: Small, easily " +
      "dismissible notification meant to convey non-critical information\n- `alert`: " +
      "Larger, focus-drawing notification meant to convey critical information and force " +
      "dismissals to be deliberate"
  }
};

export const Toast = () => (
  <Notification
    type="toast"
    onDismiss={action("on-dismiss")}
    variant={select(
      "variant",
      ["info", "success", "warning", "danger"],
      "info"
    )}
    message={text(
      "Message",
      "Duis faucibus efficitur nisl, vitae ultrices ex pellentesque a. Nulla et nunc cursus, " +
        "aliquet diam et, finibus ex. Cras ac laoreet enim."
    )}
  />
);

export const AdvancedContent = () => {
  const innerButtonAction = action("inner-button-click");
  const onClick = useCallback(
    e => {
      e.stopPropagation();
      innerButtonAction();
    },
    [innerButtonAction]
  );
  return (
    <Notification
      onDismiss={action("on-dismiss")}
      type={select("type", ["toast", "alert"])}
      variant={select(
        "variant",
        ["info", "success", "warning", "danger"],
        "info"
      )}
      message={
        <>
          <h3>
            <Icon name="shield-alt" className="mr-2" />
            Notification Title
          </h3>
          <p>
            Sed id mollis nisi, eu rhoncus arcu. Curabitur ut molestie mi.
            Aliquam porttitor nibh ut accumsan iaculis. Nullam lacinia magna a
            efficitur lobortis. Curabitur mattis ante sit amet imperdiet
            euismod.
          </p>
          <Button variant="primary" className="mb-1" onClick={onClick}>
            Do Something
          </Button>
        </>
      }
    />
  );
};
