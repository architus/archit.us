import { Notification, NotificationType } from "Utility/types";
import { StoreSlice, Reducer } from "Store/types";
import { scopeReducer } from "./base";

import {
  NOTIFICATION_NAMESPACE,
  NOTIFICATION_SHOW,
  NOTIFICATION_HIDE,
  NotificationAction
} from "Store/actions/notifications";

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
