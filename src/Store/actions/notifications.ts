import {
  Notification,
  NotificationType,
  NotificationId,
  NotificationVariant
} from "Utility/types";
import { ActionBase, ActionFactory } from "Store/types";

// ? ====================
// ? Actions & Types
// ? ====================

export const NOTIFICATION_NAMESPACE = "notification";
export const NOTIFICATION_SHOW = "notification:show";
export const NOTIFICATION_HIDE = "notification:hide";

type NotificationBase<T> = ActionBase<T, typeof NOTIFICATION_NAMESPACE>;
export type NotificationAction =
  | NotificationShowAction
  | NotificationHideAction;

export interface NotificationShowAction
  extends NotificationBase<typeof NOTIFICATION_SHOW> {
  payload: { type: NotificationType, duration: number } & Notification;
}

export interface NotificationHideAction
  extends NotificationBase<typeof NOTIFICATION_HIDE> {
  payload: {
    type: NotificationType;
    id: NotificationId;
  };
}

// ? ====================
// ? Factories
// ? ====================

let globalIdCounter: NotificationId = 0;
export type NotificationMetadata = Readonly<{
  type: NotificationType;
  duration?: number;
}>;
export type NotificationProps = Readonly<
  NotificationMetadata & {
    variant?: NotificationVariant;
    message: React.ReactNode;
  }
>;
export type SpecificNotificationProps = Omit<NotificationProps, "type">;

export const displayNotification: ActionFactory<
  NotificationShowAction,
  [NotificationProps]
> = ({ type, message, variant = "info", duration = 3000 }) => {
  return showNotification(makeNotification({ message, variant }), {
    type,
    duration
  });
};

export const showToast: ActionFactory<
  NotificationShowAction,
  [SpecificNotificationProps]
> = ({ message, variant = "info", duration = 3000 }) => {
  return displayNotification({ message, type: "toast", variant, duration });
};

export const showAlert: ActionFactory<
  NotificationShowAction,
  [SpecificNotificationProps]
> = ({ message, variant = "info", duration = 3000 }) => {
  return displayNotification({ message, type: "alert", variant, duration });
};

export function makeNotification({
  message,
  variant = "info"
}: Partial<Notification>): Notification {
  const id: number = globalIdCounter++;
  return {
    message,
    variant,
    id
  };
}

export const showNotification: ActionFactory<
  NotificationShowAction,
  [Notification, NotificationMetadata]
> = (notification, { type, duration = 3000 }) => {
  return {
    namespace: NOTIFICATION_NAMESPACE,
    type: NOTIFICATION_SHOW,
    payload: {
      type,
      duration,
      ...notification
    }
  };
};

export const hideNotification: ActionFactory<
  NotificationHideAction,
  [{ type: NotificationType; id: NotificationId }]
> = ({ type, id }) => {
  return {
    namespace: NOTIFICATION_NAMESPACE,
    type: NOTIFICATION_HIDE,
    payload: {
      type,
      id
    }
  };
};
