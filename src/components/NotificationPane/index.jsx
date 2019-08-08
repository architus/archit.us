import React, { useCallback, Suspense, lazy, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { hideNotification } from "store/actions";
import { isDefined, useClientSide } from "utility";

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

function hasItems(array) {
  return isDefined(array) && array.length !== 0;
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
          <LazyLoadingWrapper
            toast={toast}
            alert={alert}
            onDismissToast={onDismissToast}
            onDismissAlert={onDismissAlert}
          />
        </Suspense>
      </SilentErrorBoundary>
    </div>
  );
}

export default NotificationPane;

// ? =================
// ? Helper components
// ? =================

function LazyLoadingWrapper({ toast, alert, onDismissToast, onDismissAlert }) {
  const [hasRenderedOnce, setHasRenderedOnce] = useState(false);
  if ((hasItems(toast) || hasItems(alert)) && !hasRenderedOnce)
    setHasRenderedOnce(true);
  return useClientSide(() =>
    hasItems(toast) || hasItems(alert) || hasRenderedOnce ? (
      <>
        <NotificationList
          className="notification-pane--toast"
          containerClass="notification-pane--toast-container"
          items={toast}
          type="toast"
          onDismiss={onDismissToast}
        />
        <NotificationList
          className="notification-pane--alert"
          containerClass="notification-pane--alert-container"
          items={alert}
          type="alert"
          onDismiss={onDismissAlert}
        />
      </>
    ) : null
  );
}

LazyLoadingWrapper.propTypes = {
  alert: PropTypes.arrayOf(PropTypes.object),
  toast: PropTypes.arrayOf(PropTypes.object),
  onDismissAlert: PropTypes.func,
  onDismissToast: PropTypes.func
};
