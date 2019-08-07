import React, { useCallback, Suspense, lazy } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { hideNotification } from "store/actions";

import SilentErrorBoundary from "components/SilentErrorBoundary";

import "./style.scss";

// Lazy-loading tree contains:
// - CSSTransition, TransitionGroup
// - Notification
// - NotificationList

const NotificationList = lazy(() => import("components/NotificationList"));

function useHideNotification(dispatch, type) {
  return useCallback(id => dispatch(hideNotification(type, id)));
}

function NotificationPane() {
  // Connect to state
  const dispatch = useDispatch();
  const { toast, alert } = useSelector(
    state => ({
      toast: state.notifications.toast,
      alert: state.notifications.alert
    }),
    shallowEqual
  );

  const onDismissToast = useHideNotification(dispatch, "toast");
  const onDismissAlert = useHideNotification(dispatch, "alert");

  return (
    <div className="notification-pane">
      <SilentErrorBoundary>
        <Suspense fallback={<div />}>
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
          />
        </Suspense>
      </SilentErrorBoundary>
    </div>
  );
}

export default NotificationPane;
