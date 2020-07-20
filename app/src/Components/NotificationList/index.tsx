import React from "react";
import { Container } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Notification from "@app/components/Notification";
import {
  Notification as NotificationInterface,
  NotificationType,
} from "@app/store/actions";
import { StyleObject } from "@app/utility/types";
import "./style.scss";

type NotificationListProps = {
  items: NotificationInterface[];
  onDismiss: (id: number) => void;
  type: NotificationType;
  transitionLength?: number;
  container?: boolean;
  style?: StyleObject;
  className?: string;
};

const NotificationList: React.FC<NotificationListProps> = ({
  items,
  onDismiss,
  type,
  transitionLength = 250,
  container = false,
  style,
  className,
}) => (
  <div className={className} style={style}>
    <ConditionalContainer useContainer={container}>
      <TransitionGroup className="notification-list--transition-group">
        {items.map(({ id, message, variant }) => (
          <CSSTransition
            key={id}
            timeout={transitionLength}
            classNames="notification"
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
      </TransitionGroup>
    </ConditionalContainer>
  </div>
);

NotificationList.displayName = "NotificationList";

// ? =================
// ? Helper components
// ? =================

type ConditionalContainerProps = {
  useContainer: boolean;
  children: React.ReactNode;
};

const ConditionalContainer: React.FC<ConditionalContainerProps> = ({
  useContainer,
  children,
}) => (useContainer ? <Container>{children}</Container> : <>{children}</>);

ConditionalContainer.displayName = "ConditionalContainer";

export default NotificationList;
