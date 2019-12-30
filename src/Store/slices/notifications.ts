import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "Store";

// ? ====================
// ? Types
// ? ====================

export type NotificationType = "alert" | "toast";
export type NotificationId = number;
export type NotificationVariant = "success" | "danger" | "warning" | "info";
export interface Notification {
  readonly id: NotificationId;
  readonly variant: NotificationVariant;
  readonly message: React.ReactNode;
}

/**
 * Contains lists of notification objects for both alert and toast-type notifications
 */
export type Notifications = { [key in NotificationType]: Notification[] };

interface ShowNotificationArgs extends Notification {
  type: NotificationType;
}

interface HideNotificationArgs {
  type: NotificationType;
  id: NotificationId;
}

// ? ====================
// ? Reducer exports
// ? ====================

const initialState: Notifications = { alert: [], toast: [] };
const slice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<ShowNotificationArgs>
    ): Notifications => {
      const { type, ...rest } = action.payload;
      return {
        ...state,
        [type]: [...state[type], rest]
      };
    },
    hideNotification: (
      state,
      action: PayloadAction<HideNotificationArgs>
    ): Notifications => {
      const { type, id } = action.payload;
      return {
        ...state,
        [type]: state[type].filter(notification => notification.id !== id)
      };
    }
  }
});

export const { showNotification, hideNotification } = slice.actions;
export default slice.reducer;

// ? ========================
// ? Utility action factories
// ? ========================

let globalIdCounter: NotificationId = 0;
// eslint-disable-next-line no-plusplus
const provisionId = (): number => globalIdCounter++;

type NotificationMetadata = Readonly<{
  type: NotificationType;
  duration?: number;
}>;
type NotificationProps = Readonly<
  NotificationMetadata & {
    variant?: NotificationVariant;
    message: React.ReactNode;
  }
>;

type ScopedNotificationArgs = Omit<NotificationProps, "type">;
type NotificationShowAction = ReturnType<typeof showNotification>;

const defaultDuration = 3000;
const defaultVariant: NotificationVariant = "info";

export function displayNotification({
  type,
  message,
  variant = defaultVariant,
  duration = defaultDuration
}: NotificationProps): NotificationShowAction {
  const notification = makeNotification({ message, variant });
  return showNotification({
    type,
    duration,
    ...notification
  });
}

export function showToast({
  message,
  variant = defaultVariant,
  duration = defaultDuration
}: ScopedNotificationArgs): NotificationShowAction {
  return displayNotification({ message, type: "toast", variant, duration });
}

export function showAlert({
  message,
  variant = defaultVariant,
  duration = defaultDuration
}: ScopedNotificationArgs): NotificationShowAction {
  return displayNotification({ message, type: "alert", variant, duration });
}

export function makeNotification({
  message,
  variant = defaultVariant,
  id = provisionId()
}: Partial<Notification>): Notification {
  return {
    message,
    variant,
    id
  };
}

// ? ==================
// ? Selector functions
// ? ==================

export function selectAllNotifications(store: Store) {
  return store.notifications;
}
