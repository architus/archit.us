import React, { useCallback, Suspense, lazy, useState } from "react";
import { shallowEqual } from "react-redux";
import { hideNotification } from "Store/actions";
import { isDefined, withClientSide, useCallbackOnce, error } from "Utility";
import { Dispatch, useSelector, useDispatch } from "Store";
import {
  selectAllNotifications,
  NotificationType,
  Notification
} from "Store/slices/notifications";
import ErrorBoundary from "Components/ErrorBoundary";
import "./style.scss";

// Lazy-loading tree contains:
// - CSSTransition, TransitionGroup
// - Notification
// - NotificationList

function useHideNotification(
  dispatch: Dispatch,
  type: NotificationType
): (id: number) => void {
  return useCallback(id => dispatch(hideNotification({ type, id })), [
    dispatch,
    type
  ]);
}

function hasItems(array: unknown[]): boolean {
  return isDefined(array) && array.length !== 0;
}

const NotificationPane: React.FC = () => {
  // Connect to state
  const dispatch = useDispatch();
  const { toast, alert } = useSelector(selectAllNotifications, shallowEqual);

  const onDismissToast = useHideNotification(dispatch, "toast");
  const onDismissAlert = useHideNotification(dispatch, "alert");

  return (
    <div className="notification-pane">
      <ErrorBoundary onError={useCallbackOnce(e => error(e))}>
        <Suspense fallback={<div />}>
          <LazyLoadingWrapper
            toast={toast}
            alert={alert}
            onDismissToast={onDismissToast}
            onDismissAlert={onDismissAlert}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

NotificationPane.displayName = "NotificationPane";

// ? =================
// ? Helper components
// ? =================

// Split bundle
const NotificationList = lazy(() => import("Components/NotificationList"));

type LazyLoadingWrapperProps = {
  toast: Notification[];
  alert: Notification[];
  onDismissToast: (id: number) => void;
  onDismissAlert: (id: number) => void;
};

// Can't render lazy elements in SSR
const LazyLoadingWrapper = withClientSide(
  ({
    toast,
    alert,
    onDismissToast,
    onDismissAlert
  }: LazyLoadingWrapperProps) => {
    // Whether the are any active notifications
    const hasAnyItems = hasItems(toast) || hasItems(alert);

    // Wait until the lazy loaded components have been loaded once
    // (defer rendering until a notification appears, but don't unmount afterwards
    //  to allow CSS transitions to remain)
    const [hasRenderedOnce, setHasRenderedOnce] = useState(hasAnyItems);
    if (hasAnyItems && !hasRenderedOnce) setHasRenderedOnce(true);

    return hasAnyItems || hasRenderedOnce ? (
      <>
        <NotificationList
          className="notification-pane--toast"
          items={toast}
          type="toast"
          onDismiss={onDismissToast}
        />
        <NotificationList
          className="notification-pane--alert"
          items={alert}
          type="alert"
          onDismiss={onDismissAlert}
          container
        />
      </>
    ) : null;
  }
);

LazyLoadingWrapper.displayName = "LazyLoadingWrapper";

export default NotificationPane;
