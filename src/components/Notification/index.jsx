import React, { useCallback } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import "./style.scss";

function Notification({ type, message, id, variant, onDismiss }) {
  const specificDismissHandler = useCallback(() => onDismiss(id), [id]);
  return (
    <div
      onClick={type === "toast" ? specificDismissHandler : undefined}
      className={classNames("notification", `notification-${type}`, variant)}
    >
      <button type="button" className="close" onClick={specificDismissHandler}>
        <span aria-hidden="true">×</span>
        <span className="sr-only">Close notification</span>
      </button>
      <p className="notification-content">{message}</p>
    </div>
  );
}

export default Notification;

Notification.propTypes = {
  type: PropTypes.string,
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
