import { Notification, NotificationType, NotificationId } from "Utility/types";
import { StoreSlice, Reducer, ActionBase } from "Store/types";
import { scopeReducer } from "./base";

// ? ====================
// ? Actions & Types
// ? ====================

export const NOTIFICATION_NAMESPACE = "notification";
export const NOTIFICATION_SHOW = "show";
export const NOTIFICATION_HIDE = "hide";

type NotificationBase<T> = ActionBase<T, typeof NOTIFICATION_NAMESPACE>;
export type NotificationAction =
  | NotificationShowAction
  | NotificationHideAction;

interface NotificationShowAction
  extends NotificationBase<typeof NOTIFICATION_SHOW> {
  readonly payload: { type: NotificationType } & Notification;
}

interface NotificationHideAction
  extends NotificationBase<typeof NOTIFICATION_HIDE> {
  readonly payload: {
    type: NotificationType;
    id: NotificationId;
  };
}

/**
 * Contains lists of notification objects for both alert and toast-type notifications
 */
export type Notifications = { [key in NotificationType]: Notification[] };

// ? ====================
// ? Reducer exports
// ? ====================

const initial: Notifications = { alert: [], toast: [] };

const reducer: Reducer<Notifications> = scopeReducer(
  NOTIFICATION_NAMESPACE,
  (state: Notifications, action: NotificationAction): Notifications => {
    switch (action.type) {
      case NOTIFICATION_SHOW: {
        const { type, ...rest } = action.payload;
        return {
          ...state,
          [type]: [...state[type], rest]
        };
      }

      case NOTIFICATION_HIDE: {
        const { type, id } = action.payload;
        return {
          ...state,
          [type]: state[type].filter(notification => notification.id !== id)
        };
      }
    }
  }
);

const slice: StoreSlice<Notifications> = { initial, reducer };
export default slice;
