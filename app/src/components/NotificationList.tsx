import { css } from "linaria";
import { styled } from "linaria/react";
import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Notification from "@app/components/Notification";
import {
  Notification as NotificationInterface,
  NotificationType,
} from "@app/store/actions";

const notificationClass = css``;
const Styled = {
  TransitionGroup: styled(TransitionGroup)`
    display: flex;
    flex-direction: column;

    .${notificationClass}-enter {
      opacity: 0 !important;
      max-height: 0 !important;
      margin-bottom: 0 !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }

    .${notificationClass}-enter-active {
      opacity: 1 !important;
      max-height: 120px !important;
      margin-bottom: 0.6rem !important;
      padding-top: 0.5rem !important;
      padding-bottom: 0.5rem !important;
    }

    .${notificationClass}-exit {
      transform: none;
      pointer-events: none;
      opacity: 1 !important;
      max-height: 120px !important;
      margin-bottom: 0.6rem !important;
      padding-top: 0.5rem !important;
      padding-bottom: 0.5rem !important;
    }

    .${notificationClass}-exit-active {
      transform: translateX(-64px);
      pointer-events: none;
      opacity: 0 !important;
      max-height: 0 !important;
      margin-bottom: 0 !important;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }
  `,
};

export type NotificationListProps = {
  items: NotificationInterface[];
  onDismiss: (id: number) => void;
  type: NotificationType;
  transitionLength?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Renders a list of notifications, with entrance/exit animations
 */
const NotificationList: React.FC<NotificationListProps> = ({
  items,
  onDismiss,
  type,
  transitionLength = 250,
  style,
  className,
}) => (
  <Styled.TransitionGroup className={className} style={style}>
    {items.map(({ id, message, variant }) => (
      <CSSTransition
        key={id}
        timeout={transitionLength}
        classNames={notificationClass}
      >
        <Notification
          id={id}
          type={type}
          message={message}
          variant={variant}
          onDismiss={onDismiss}
        />
      </CSSTransition>
    ))}
  </Styled.TransitionGroup>
);

export default NotificationList;
