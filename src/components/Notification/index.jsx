import React, { useCallback } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { CloseButton } from "react-bootstrap";

import "./style.scss";

function Notification({ type, message, id, variant, onDismiss }) {
  const isToast = type === "toast";
  const className = classNames("notification", `notification-${type}`, variant);

  // Memoize targeted dismiss callback
  const dismissHandler = useCallback(() => onDismiss(id), [id]);
  const outerOnClick = isToast ? dismissHandler : undefined;

  return (
    <div onClick={outerOnClick} className={className}>
      <CloseButton onClick={dismissHandler} label="Close notification" />
      <div className="notification-content">{message}</div>
    </div>
  );
}

export default Notification;

Notification.propTypes = {
  id: PropTypes.number.isRequired,
  onDismiss: PropTypes.func,
  type: PropTypes.oneOf(["alert", "toast"]),
  variant: PropTypes.oneOf(["success", "info", "warning", "danger"]),
  message: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

Notification.defaultProps = {
  type: "toast",
  message: "",
  variant: "info",
  onDismiss() {}
};

Notification.displayName = "Notification";
