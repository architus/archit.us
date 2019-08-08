import React, { useCallback, Suspense, lazy, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { hideNotification } from "store/actions";
import { isDefined, useClientSide } from "utility";

import ErrorBoundary from "components/ErrorBoundary";

import "./style.scss";

// Lazy-loading tree contains:
// - CSSTransition, TransitionGroup
// - Notification
// - NotificationList

function useHideNotification(dispatch, type) {
  return useCallback(id => dispatch(hideNotification(type, id)), [
    dispatch,
    type
  ]);
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
      <ErrorBoundary>
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
}

export default NotificationPane;

NotificationPane.displayName = "NotificationPane";

// ? =================
// ? Helper components
// ? =================

// Split bundle
const NotificationList = lazy(() => import("components/NotificationList"));

// Can't render lazy elements in SSR
const LazyLoadingWrapper = useClientSide(
  ({ toast, alert, onDismissToast, onDismissAlert }) => {
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

LazyLoadingWrapper.propTypes = {
  alert: PropTypes.arrayOf(PropTypes.object),
  toast: PropTypes.arrayOf(PropTypes.object),
  onDismissAlert: PropTypes.func,
  onDismissToast: PropTypes.func
};

LazyLoadingWrapper.displayName = "LazyLoadingWrapper";
