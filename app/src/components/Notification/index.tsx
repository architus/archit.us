import classNames from "classnames";
import React, { useCallback } from "react";

import { CloseButton } from "@app/react-bootstrap";
import { NotificationType, NotificationVariant } from "@app/store/actions";
import "./style.scss";

type NotificationProps = {
  type: NotificationType;
  variant: NotificationVariant;
  message: React.ReactNode;
  id: number;
  onDismiss: (id: number) => void;
  style?: React.CSSProperties;
  className?: string;
};

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  id,
  variant,
  onDismiss,
  style,
  className,
}) => {
  const isToast = type === "toast";

  // Memoize targeted dismiss callback
  const dismissHandler = useCallback(() => onDismiss(id), [id, onDismiss]);
  const outerOnClick = isToast ? dismissHandler : undefined;

  return (
    <div
      style={style}
      onClick={outerOnClick}
      className={classNames(
        "notification",
        `notification-${type}`,
        variant,
        className
      )}
    >
      <CloseButton onClick={dismissHandler} label="Close notification" />
      <div className="notification-content">{message}</div>
    </div>
  );
};

export default Notification;
