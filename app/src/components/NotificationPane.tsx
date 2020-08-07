import { styled } from "linaria/react";
import React, { useCallback } from "react";
import { shallowEqual } from "react-redux";

import ErrorBoundary from "@app/components/ErrorBoundary";
import NotificationList from "@app/components/NotificationList";
import { headerHeight, container } from "@app/layout";
import { Dispatch, useSelector, useDispatch } from "@app/store";
import { hideNotification } from "@app/store/actions";
import {
  selectAllNotifications,
  NotificationType,
} from "@app/store/slices/notifications";
import { BreakpointKey, up, down } from "@architus/facade/theme/media";

const screenPadding = "12px";
const layoutBreakpoint: BreakpointKey = "sm";
const Styled = {
  NavigationPane: styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    z-index: 1000;
    pointer-events: none;
  `,
  Toasts: styled(NotificationList)`
    position: absolute;

    height: 400px;
    max-width: 300px;
    padding: ${screenPadding};

    ${up(layoutBreakpoint)} {
      right: 0;
      top: ${headerHeight};

      align-items: flex-end;
      justify-content: flex-start;
    }

    ${down(layoutBreakpoint)} {
      right: 0;
      bottom: 0;
      left: 0;

      max-width: none;
      align-items: stretch;
      justify-content: flex-end;
    }
  `,
  Alerts: styled(NotificationList)`
    ${container}
    position: absolute;
    top: calc(${screenPadding} + ${headerHeight});
    right: ${screenPadding};
    left: ${screenPadding};
    bottom: ${screenPadding};

    height: 400px;
    max-width: 800px;

    align-items: stretch;
  `,
};

export type NotificationPaneProps = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Shows containers for toasts and alerts, which are hooked up to the store
 */
const NotificationPane: React.FC<NotificationPaneProps> = ({
  className,
  style,
}) => {
  // Connect to state
  const dispatch = useDispatch();
  const { toast, alert } = useSelector(selectAllNotifications, shallowEqual);

  const onDismissToast = useHideNotification(dispatch, "toast");
  const onDismissAlert = useHideNotification(dispatch, "alert");

  return (
    <Styled.NavigationPane className={className} style={style}>
      <ErrorBoundary>
        <Styled.Toasts items={toast} type="toast" onDismiss={onDismissToast} />
        <Styled.Alerts items={alert} type="alert" onDismiss={onDismissAlert} />
      </ErrorBoundary>
    </Styled.NavigationPane>
  );
};

export default NotificationPane;

// ? ================
// ? Helper functions
// ? ================

function useHideNotification(
  dispatch: Dispatch,
  type: NotificationType
): (id: number) => void {
  return useCallback((id) => dispatch(hideNotification({ type, id })), [
    dispatch,
    type,
  ]);
}
