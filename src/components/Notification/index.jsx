import React, { useCallback } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import "./style.scss";
import { CloseButton } from "react-bootstrap";

function Notification({ type, message, id, variant, onDismiss }) {
  const isToast = type === "toast";
  const className = classNames("notification", `notification-${type}`, variant);

  // Memoize targeted dismiss callback
  const dismissHandler = useCallback(() => onDismiss(id), [id]);
  const outerOnClick = isToast ? dismissHandler : undefined;

  return (
    <div onClick={outerOnClick} className={className}>
      <CloseButton onClick={dismissHandler} label="Close notification" />
      <p className="notification-content">{message}</p>
    </div>
  );
}

export default Notification;

Notification.propTypes = {
  type: PropTypes.oneOf(["alert", "toast"]),
  message: PropTypes.string,
  id: PropTypes.number.isRequired,
  variant: PropTypes.string,
  onDismiss: PropTypes.func
};

Notification.defaultProps = {
  type: "toast",
  message: "",
  variant: "info",
  onDismiss() {}
};
